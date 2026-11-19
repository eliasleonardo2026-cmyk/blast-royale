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
  const SDK_FILES = ['firebase-app-compat.js', 'firebase-auth-compat.js', 'firebase-firestore-compat.js', 'firebase-database-compat.js'];
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

  window.FirebaseSync = {
    get ready() { return state.ready; },
    get uid() { return state.uid; },
    get status() { return state.status; },
    get authError() { return state.authError; },
    get lastError() { return state.lastError || null; },
    get compLocked() { return !!state.compLocked; },
    get lastComp() { return state.lastComp; },
    get leagueRows() { return window.GameState ? GameState.state.league.length : 0; },
    saveProfileNow, reportPlayer, refreshText,
    init
  };

  const start = () => {
    if (!CLOUD_ENABLED) { state.status = 'local'; refreshText(); return; }
    setTimeout(init, 60);
  };
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
})();
