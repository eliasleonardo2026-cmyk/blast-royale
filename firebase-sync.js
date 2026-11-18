/* =========================================================================
   BLAST ROYALE — Ponte Firebase (Auth anônimo + Firestore + Realtime DB)
   - Perfil em Firestore: users/{uid}
   - Liga em Firestore: coleção users lida em tempo real (somente leitura)
   - Presença e denúncias no Realtime Database
   Sem internet (ou SDK indisponível) o jogo segue 100% local.
   ========================================================================= */
(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyCH9HIO0fvcsL5eoCBt0BBscW-cbQwF_Q9Q",
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
  // O backend ainda não está configurado (auth anônimo desabilitado no projeto).
  // Sem esta trava, cada boot dispara um signUp que retorna 400 no console.
  // Para testar a nuvem, abra a página com ?cloud=1.
  const CLOUD_ENABLED = (() => {
    try { return new URLSearchParams(location.search).has('cloud'); } catch (e) { return false; }
  })();

  const state = {
    status: 'idle',       // idle | auth | online | local
    ready: false,
    uid: null,
    authError: null,
    listeners: [],
    saveTimer: null
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

  function competitiveOf(p) {
    const c = (p && p.competitive) || {};
    return {
      leaguePoints: Math.max(0, Math.floor(Number(c.leaguePoints) || 0)),
      rankedWins: Math.max(0, Math.floor(Number(c.rankedWins) || 0)),
      rankedLosses: Math.max(0, Math.floor(Number(c.rankedLosses) || 0)),
      trophies: Math.max(0, Math.floor(Number(c.trophies) || 0))
    };
  }

  function saveProfileNow() {
    if (!state.ready) return;
    const p = profile();
    const nome = String(p.nick || '').trim();
    if (!nome) return; // sem nick não há documento público
    const payload = {
      nick: nome,
      avatar: p.avatar || '🐍',
      competitive: competitiveOf(p),
      updatedAt: Date.now()
    };
    // Economia e cosméticos viajam junto: moedas, XP, skins, efeitos,
    // contadores diários e progresso do evento do ciclo atual.
    try {
      if (window.GameState && typeof window.GameState.cloudPayload === 'function') {
        Object.assign(payload, window.GameState.cloudPayload());
      }
    } catch (e) {}
    try {
      const ref = db.collection('users').doc(state.uid);
      Promise.resolve(ref.set(payload, { merge: true })).catch(err => { state.lastError = 'firestore:' + (err && err.code || ''); });
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
        if (doc && doc.exists) window.GameState.mergeRemoteProfile(doc.data());
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
