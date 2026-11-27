/* =========================================================================
   BLAST ROYALE — Ponte Firebase (Auth anônimo + Firestore + Realtime DB)
   - Perfil em Firestore: users/{uid}
   - Liga em Firestore: coleção users lida em tempo real (somente leitura)
   - Presença e denúncias no Realtime Database
   Sem internet (ou SDK indisponível) o jogo segue 100% local.
   ========================================================================= */
(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyCH9HIOfvcsL5eoCBt0BmscW-cBQwF_Q9Q",
    authDomain: "p-key-78esg6nhyfih.firebaseapp.com",
    databaseURL: "https://p-key-78esg6nhyfih-default-rtdb.firebaseio.com",
    projectId: "p-key-78esg6nhyfih",
    storageBucket: "p-key-78esg6nhyfih.firebasestorage.app",
    messagingSenderId: "790805495360",
    appId: "1:790805495360:web:b0975a4ad5860e7c1fa9a5",
    measurementId: "G-R0JTDHPEJH"
  };
  const SDK_BASE = 'https://www.gstatic.com/firebasejs/10.12.2/';
  const SDK_FILES = ['firebase-app-compat.js', 'firebase-auth-compat.js', 'firebase-firestore-compat.js', 'firebase-database-compat.js', 'firebase-storage-compat.js'];
  const LOCAL_ID_KEY = 'blast-fb-uid';
  // Nuvem sempre ligada quando há internet: perfil, liga, economia e
  // presença sincronizam sozinhos. Sem rede o jogo segue 100% local.
  const CLOUD_ENABLED = true;

  const state = {
    status: 'idle',       // idle | auth | online | local
    ready: false,
    uid: null,
    authError: null,
    listeners: [],
    saveTimer: null,
    lastComp: null,       // último progresso competitivo confirmado na nuvem
    compLocked: false,    // regra rejeitou: sincroniza o resto e tenta depois
    hasCloudDoc: false,   // documento já existe no Firestore (create vs update)
    catchUpTimer: null    // agenda o envio do excedente competitivo
  };
  let app = null, auth = null, db = null, rtdb = null;

  function dict() {
    try {
      const lang = (typeof currentLang !== 'undefined' && currentLang) || 'pt';
      return (typeof I18N !== 'undefined' && I18N[lang]) || {};
    } catch (e) { return {}; }
  }
  function profile() { return (window.GameState && GameState.state.profile) || { nick: '', avatar: '🐍' }; }

  function localId() {
    try {
      let id = localStorage.getItem(LOCAL_ID_KEY);
      if (!id) {
        const rnd = (window.crypto && crypto.randomUUID) ? crypto.randomUUID().replace(/-/g, '') : String(Date.now()) + Math.random().toString(36).slice(2);
        id = 'local_' + rnd.slice(0, 20);
        localStorage.setItem(LOCAL_ID_KEY, id);
      }
      return id;
    } catch (e) {
      return 'local_' + String(Date.now());
    }
  }

  function refreshText() {
    const el = document.getElementById('profileSync');
    if (!el) return;
    const d = dict();
    el.classList.toggle('online', state.status === 'online');
    el.textContent = state.status === 'online'
      ? (d.profileSyncOnline || '☁️ Sincronizado com a nuvem')
      : state.status === 'auth'
        ? (d.profileSyncAuth || '☁️ Conectando ao Firebase...')
        : (d.profileSyncLocal || '📴 Modo local — entre na internet para sincronizar');
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = false;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('sdk'));
      document.head.appendChild(s);
    });
  }

  async function loadSdk() {
    if (window.firebase && firebase.initializeApp) return;
    for (const f of SDK_FILES) await loadScript(SDK_BASE + f);
    if (!(window.firebase && firebase.initializeApp)) throw new Error('sdk');
  }

  function compOfRaw(c) {
    const x = c || {};
    return {
      leaguePoints: Math.max(0, Math.floor(Number(x.leaguePoints) || 0)),
      rankedWins: Math.max(0, Math.floor(Number(x.rankedWins) || 0)),
      rankedLosses: Math.max(0, Math.floor(Number(x.rankedLosses) || 0)),
      trophies: Math.max(0, Math.floor(Number(x.trophies) || 0))
    };
  }

  function competitiveOf(p) {
    return compOfRaw(p && p.competitive);
  }

  // A regra do Firestore aceita no máximo +3 pts, +1 vitória/derrota e
  // troféus entre -22 e +30 por gravação. O excedente fica para as próximas
  // janelas de 60 s; enviar o total de uma vez seria rejeitado para sempre.
  function clampToStep(target, base) {
    if (!base) return target;
    let wins = target.rankedWins, losses = target.rankedLosses;
    // A regra não aceita vitória e derrota no mesmo avanço.
    if (wins > base.rankedWins && losses > base.rankedLosses) losses = base.rankedLosses;
    return {
      leaguePoints: Math.max(base.leaguePoints, Math.min(target.leaguePoints, base.leaguePoints + 3)),
      rankedWins: Math.min(wins, base.rankedWins + 1),
      rankedLosses: Math.min(losses, base.rankedLosses + 1),
      trophies: Math.max(base.trophies - 22, Math.min(target.trophies, base.trophies + 30))
    };
  }

  function scheduleCompCatchUp() {
    if (state.catchUpTimer) return;
    state.catchUpTimer = setTimeout(() => {
      state.catchUpTimer = null;
      if (!state.ready || state.compLocked) return;
      if (JSON.stringify(competitiveOf(profile())) === JSON.stringify(state.lastComp)) return;
      saveProfileNow();
    }, 62000);
  }

  function saveProfileNow(retrying = false) {
    if (!state.ready) return;
    const p = profile();
    const nome = String(p.nick || '').trim();
    if (!nome) return; // sem nick não há documento público
    const targetComp = competitiveOf(p);
    let competitive = targetComp;
    let compChanged = false;
    if (!state.compLocked) {
      competitive = clampToStep(targetComp, state.lastComp);
      compChanged = JSON.stringify(competitive) !== JSON.stringify(state.lastComp);
    }
    const payload = {
      nick: nome,
      avatar: p.avatar || '🐍',
      updatedAt: Date.now()
    };
    // Progresso competitivo viaja com rankedAt para as regras validarem o
    // incremento e o intervalo mínimo. Se já houve rejeição, o campo fica de
    // fora até a nova tentativa para não bloquear a economia/cosméticos.
    if (compChanged) {
      payload.competitive = competitive;
      // A primeira gravação cria o documento: sem rankedAt aqui, o primeiro
      // avanço depois do cadastro não fica preso no cooldown de 60 s.
      if (state.hasCloudDoc) payload.rankedAt = firebase.firestore.FieldValue.serverTimestamp();
    }
    // Economia e cosméticos viajam junto: moedas, XP, skins, efeitos,
    // contadores diários e progresso do evento do ciclo atual.
    try {
      if (window.GameState && typeof window.GameState.cloudPayload === 'function') {
        Object.assign(payload, window.GameState.cloudPayload());
      }
    } catch (e) {}
    try {
      const ref = db.collection('users').doc(state.uid);
      Promise.resolve(ref.set(payload, { merge: true })).then(() => {
        state.hasCloudDoc = true;
        if (compChanged) {
          state.lastComp = competitive;
          state.compLocked = false;
          if (JSON.stringify(competitive) !== JSON.stringify(targetComp)) scheduleCompCatchUp();
        }
      }).catch(err => {
        const code = (err && err.code) || '';
        state.lastError = 'firestore:' + code;
        if (compChanged && code === 'permission-denied') {
          // Regra rejeitou o avanço: mantém a economia sincronizando e
          // tenta o competitivo mais tarde (respeitando o cooldown).
          state.compLocked = true;
          setTimeout(() => { if (state.ready) saveProfileNow(); }, 50);
          setTimeout(() => {
            if (!state.ready) return;
            state.compLocked = false;
            saveProfileNow();
          }, 65000);
        }
      });
    } catch (e) { state.lastError = 'firestore'; }
    try {
      rtdb.ref('presence/' + state.uid).update({ nick: nome, avatar: payload.avatar, at: Date.now() })
        .catch(err => { state.lastError = 'rtdb:' + (err && err.code || ''); });
    } catch (e) {}
  }

  function queueSave() {
    if (!state.ready) return;
    clearTimeout(state.saveTimer);
    state.saveTimer = setTimeout(saveProfileNow, 700);
  }

  function leagueRowsFromSnapshot(snap) {
    const rows = [];
    snap.forEach(doc => {
      if (doc.id === state.uid) return;
      const d = doc.data() || {};
      const c = d.competitive || {};
      const nome = String(d.nick || d.name || '').trim();
      if (!nome) return;
      rows.push({
        id: doc.id, name: nome, avatar: d.avatar || '🐍',
        points: Math.max(0, Math.floor(Number(c.leaguePoints) || 0)),
        wins: Math.max(0, Math.floor(Number(c.rankedWins) || 0)),
        losses: Math.max(0, Math.floor(Number(c.rankedLosses) || 0)),
        trophies: Math.max(0, Math.floor(Number(c.trophies) || 0)),
        cosmeticRank: typeof d.cosmeticRank === 'string' ? d.cosmeticRank : ''
      });
    });
    rows.sort((a, b) => b.points - a.points || b.wins - a.wins);
    return rows;
  }

  function watchLeague() {
    try {
      db.collection('users').limit(50).onSnapshot(
        snap => {
          try { window.GameState.setLeague(leagueRowsFromSnapshot(snap)); } catch (e) {}
        },
        err => { state.lastError = 'firestore-league:' + (err && err.code || ''); }
      );
    } catch (e) { state.lastError = 'firestore-league'; }
  }

  function publishPresence() {
    try {
      const ref = rtdb.ref('presence/' + state.uid);
      ref.onDisconnect().remove();
      const p = profile();
      ref.set({ nick: p.nick || '', avatar: p.avatar || '🐍', online: true, at: Date.now() })
        .catch(err => { state.lastError = 'rtdb-presence:' + (err && err.code || ''); });
    } catch (e) {}
  }

  async function init() {
    if (state.status !== 'idle') return;
    if (!navigator.onLine) { state.status = 'local'; refreshText(); return; }
    state.status = 'auth';
    refreshText();
    try {
      await loadSdk();
      app = firebase.initializeApp(firebaseConfig);
      auth = firebase.auth();
      db = firebase.firestore();
      rtdb = firebase.database();
      let user = null;
      try {
        const cred = await auth.signInAnonymously();
        user = cred && cred.user;
      } catch (err) {
        // Auth anônimo desabilitado ou domínio não autorizado: encerra em modo
        // local sem tentar Firestore/RTDB (evita erros de permissão em cascata).
        state.authError = (err && (err.code || err.message)) || 'auth';
        state.status = 'local';
        refreshText();
        return;
      }
      state.uid = user.uid;
      state.ready = true;
      state.status = 'online';
      // Perfil remoto (se existir) antes de gravar o local por cima.
      try {
        const doc = await db.collection('users').doc(state.uid).get();
        if (doc && doc.exists) {
          state.hasCloudDoc = true;
          state.lastComp = compOfRaw((doc.data() || {}).competitive);
          window.GameState.mergeRemoteProfile(doc.data());
        }
      } catch (err) { state.lastError = 'firestore-profile:' + (err && err.code || ''); }
      saveProfileNow();
      watchLeague();
      publishPresence();
      state.unsubscribe = window.GameState.subscribe(queueSave);
      refreshText();
    } catch (err) {
      state.status = 'local';
      state.lastError = (err && err.message) || 'sdk';
      refreshText();
    }
  }

  function reportPlayer(entry) {
    if (!state.ready || !rtdb) return false;
    try {
      const p = profile();
      rtdb.ref('reports').push({
        ts: Date.now(),
        opponent: String((entry && entry.opponent) || '').slice(0, 40),
        mode: String((entry && entry.mode) || '').slice(0, 16),
        role: String((entry && entry.role) || '').slice(0, 16),
        reporterUid: state.uid,
        reporterNick: String(p.nick || '').slice(0, 15)
      }).catch(err => { state.lastError = 'rtdb-report:' + (err && err.code || ''); });
      return true;
    } catch (e) { return false; }
  }

  /* ------------ LOGIN GOOGLE (vincula a conta anônima, mantém o uid) ------------ */
  async function loginWithGoogle() {
    if (!auth) return { ok: false, error: 'no-auth' };
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const cur = auth.currentUser;
      if (!cur) {
        await auth.signInWithPopup(provider);
      } else if (typeof cur.linkWithPopup === 'function' && cur.isAnonymous) {
        await cur.linkWithPopup(provider);
      } else {
        await cur.reload().catch(() => {});
      }
      state.uid = auth.currentUser.uid;
      state.status = 'online';
      return { ok: true, isGoogle: !auth.currentUser.isAnonymous };
    } catch (e) {
      const code = (e && e.code) || 'auth';
      // A conta Google já tem dados próprios: passa a usá-la (perde o anônimo).
      if (code === 'auth/account-exists-with-different-credential') {
        try {
          await auth.signInWithPopup(provider);
          state.uid = auth.currentUser.uid;
          return { ok: true, isGoogle: true, switched: true };
        } catch (e2) { return { ok: false, error: (e2 && e2.code) || 'auth' }; }
      }
      return { ok: false, error: code };
    }
  }

  async function signOutAccount() {
    if (!auth) return;
    try { await auth.signOut(); } catch (e) {}
    // Após signOut não há usuário anônimo: entra como anônimo de novo.
    try { await auth.signInAnonymously(); } catch (e) {}
    state.uid = auth.currentUser ? auth.currentUser.uid : null;
    socialRef = 0;
  }

  /* ------------ AMIGOS & CHAT DE TEXTO (Firestore) ------------ */
  let socialRef = 0;
  const socialSubs = [];
  function dmIdOf(a, b) { const s = [a, b].sort(); return s[0] + '__' + s[1]; }
  function myProfile() { return profile(); }

  async function findUserByNick(nick) {
    if (!db) return null;
    const n = String(nick || '').trim().slice(0, 24);
    if (!n) return null;
    const snap = await db.collection('users').where('nick', '==', n).limit(1).get();
    if (snap.empty) return null;
    return { uid: snap.docs[0].id, name: String((snap.docs[0].data() || {}).nick || n), avatar: (snap.docs[0].data() || {}).avatar || '🐍' };
  }

  async function sendFriendRequest(nick) {
    if (!state.ready || !db) return { ok: false, error: 'offline' };
    const target = await findUserByNick(nick);
    if (!target) return { ok: false, error: 'not-found' };
    if (target.uid === state.uid) return { ok: false, error: 'self' };
    const me = myProfile();
    const id = 'F_' + dmIdOf(state.uid, target.uid);
    try {
      await db.collection('friendRequests').doc(id).set({
        from: state.uid, to: target.uid,
        fromName: String(me.nick || '').slice(0, 24), fromAvatar: me.avatar || '🐍',
        status: 'pending', toName: target.name, at: Date.now()
      }, { merge: true });
      return { ok: true, toName: target.name };
    } catch (e) { return { ok: false, error: (e && e.code) || 'db' }; }
  }

  function listenFriends(cb) {
    if (!db || !state.uid) return function () {};
    const col = db.collection('users').doc(state.uid).collection('friends');
    const un = col.orderBy('since', 'desc').onSnapshot(sn => {
      cb && cb(sn.docs.map(d => ({ uid: d.id, name: d.data().name || '', avatar: d.data().avatar || '🐍', since: d.data().since || 0 })));
    }, () => {});
    socialSubs.push(un); return un;
  }

  function listenFriendRequests(cb) {
    if (!db || !state.uid) return function () {};
    const res = { in: [], out: [] };
    const emit = () => cb && cb(res);
    const u1 = db.collection('friendRequests').where('to', '==', state.uid).onSnapshot(sn => {
      res.in = sn.docs
        .filter(d => d.data().status === 'pending')
        .map(d => { const x = d.data(); return { id: d.id, from: x.from, fromName: x.fromName || '', fromAvatar: x.fromAvatar || '🐍', status: x.status }; });
      emit();
    }, () => {});
    const u2 = db.collection('friendRequests').where('from', '==', state.uid).onSnapshot(sn => {
      res.out = sn.docs
        .filter(d => d.data().status === 'pending')
        .map(d => { const x = d.data(); return { id: d.id, to: x.to, toName: x.toName || '', status: x.status }; });
      emit();
    }, () => {});
    socialSubs.push(u1, u2); return () => { u1(); u2(); };
  }

  async function acceptRequest(reqId, fromUid, fromName, fromAvatar) {
    if (!db) return;
    const me = myProfile();
    try { await db.collection('friendRequests').doc(reqId).update({ status: 'accepted', at: Date.now() }); } catch (e) {}
    const batch = db.batch();
    batch.set(db.collection('users').doc(state.uid).collection('friends').doc(fromUid), { name: fromName, avatar: fromAvatar || '🐍', since: Date.now() });
    batch.set(db.collection('users').doc(fromUid).collection('friends').doc(state.uid), { name: String(me.nick || '').slice(0, 24), avatar: me.avatar || '🐍', since: Date.now() });
    try { await batch.commit(); } catch (e) {}
  }

  async function declineRequest(reqId) {
    if (!db || !reqId) return;
    try { await db.collection('friendRequests').doc(reqId).delete(); } catch (e) {}
  }

  async function removeFriend(friendUid) {
    if (!db || !friendUid) return;
    const batch = db.batch();
    try {
      batch.delete(db.collection('users').doc(state.uid).collection('friends').doc(friendUid));
      batch.delete(db.collection('users').doc(friendUid).collection('friends').doc(state.uid));
      await batch.commit();
    } catch (e) {}
  }

  function listenMessages(friendUid, cb) {
    if (!db || !state.uid) return function () {};
    const col = db.collection('dms').doc(dmIdOf(state.uid, friendUid)).collection('messages');
    const un = col.orderBy('at').limitToLast(200).onSnapshot(sn => {
      cb && cb(sn.docs.map(d => { const x = d.data(); return { id: d.id, from: x.from, to: x.to, text: x.text || '', at: x.at || 0 }; }));
    }, () => {});
    socialSubs.push(un); return un;
  }

  async function sendMessage(friendUid, text) {
    if (!db || !state.uid) return false;
    const t = String(text || '').trim().slice(0, 500);
    if (!t) return false;
    try {
      await db.collection('dms').doc(dmIdOf(state.uid, friendUid)).collection('messages').add({ from: state.uid, to: friendUid, text: t, at: Date.now() });
      return true;
    } catch (e) { return false; }
  }

  /* ------------ Voz nas mensagens: sinalização via Realtime DB ------------ */
  function callIdOf(a, b) { const s = [a, b].sort(); return s[0] + '_' + s[1]; }
  function sendCallSignal(pairId, fromUid, obj) {
    if (!rtdb || !pairId || !fromUid) return;
    try { rtdb.ref('callSignals/' + pairId + '/' + fromUid).set(Object.assign({ at: Date.now() }, obj)); } catch (e) {}
  }
  function listenCallSignals(pairId, theirUid, cb) {
    if (!rtdb || !pairId || !theirUid || typeof cb !== 'function') return function () {};
    const ref = rtdb.ref('callSignals/' + pairId + '/' + theirUid);
    const on = ref.on('value', snap => { const v = snap.val(); if (v) cb(v); });
    return () => ref.off('value', on);
  }
  function setCallMeta(pairId, obj) {
    if (!rtdb || !pairId) return;
    try { rtdb.ref('calls/' + pairId).set(obj); } catch (e) {}
  }
  function listenCallMeta(pairId, cb) {
    if (!rtdb || !pairId || typeof cb !== 'function') return function () {};
    const ref = rtdb.ref('calls/' + pairId);
    const on = ref.on('value', snap => cb(snap.val()));
    return () => ref.off('value', on);
  }

  function listenPresence(friendUid, cb) {
    if (!rtdb || !friendUid || typeof cb !== 'function') return function () {};
    const ref = rtdb.ref('presence/' + friendUid);
    const on = ref.on('value', snap => cb(snap.val()));
    return () => ref.off('value', on);
  }

  /* ------------ Mensagem de voz (gravação → Firebase Storage) ------------ */
  async function uploadAudioMessage(friendUid, blob, durMs) {
    if (!state.ready || !db || !firebase.storage) return { ok: false, error: 'no-storage' };
    try {
      const dm = dmIdOf(state.uid, friendUid);
      const st = firebase.storage();
      const path = 'audio/' + dm + '/' + Date.now() + '.webm';
      await st.ref(path).put(blob);
      const audioUrl = await st.ref(path).getDownloadURL();
      await db.collection('dms').doc(dm).collection('messages').add({
        from: state.uid, to: friendUid, kind: 'audio', audioUrl, dur: Math.round(durMs || 0), at: Date.now()
      });
      return { ok: true, audioUrl };
    } catch (e) { return { ok: false, error: (e && e.code) || 'upload' }; }
  }

  window.FirebaseSync = {
    get ready() { return state.ready; },
    get uid() { return state.uid; },
    get status() { return state.status; },
    get authError() { return state.authError; },
    get lastError() { return state.lastError || null; },
    get compLocked() { return !!state.compLocked; },
    get lastComp() { return state.lastComp; },
    get leagueRows() { return window.GameState ? GameState.state.league.length : 0; },
    get isGoogle() { return !!(auth && auth.currentUser && !auth.currentUser.isAnonymous); },
    get linked() { return !!(auth && auth.currentUser); },
    saveProfileNow, reportPlayer, refreshText, init,
    loginWithGoogle, signOutAccount,
    findUserByNick, sendFriendRequest, acceptRequest, declineRequest, removeFriend,
    listenFriends, listenFriendRequests, listenMessages, sendMessage, dmIdOf,
    callIdOf, sendCallSignal, listenCallSignals, setCallMeta, listenCallMeta,
    listenPresence,
    uploadAudioMessage,
    get hasStorage() { return !!(state.ready && firebase && firebase.storage); },
    get socialVersion() { return socialRef; }
  };

  const start = () => {
    if (!CLOUD_ENABLED) { state.status = 'local'; refreshText(); return; }
    setTimeout(init, 60);
  };
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
})();
