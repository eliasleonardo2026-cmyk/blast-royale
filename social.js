/* =========================================================================
   BLAST ROYALE — Mensagens & Amigos (e login Google)
   UI de chat de texto com amigos + solicitações de amizade.
   Depende de FirebaseSync (firebase-sync.js) e do modal em index.html.
   ========================================================================= */
(function () {
  const state = {
    open: false,
    friends: [],
    requests: { in: [], out: [] },
    presence: {},
    unread: {},
    active: null, // { uid, name, avatar }
    unsubs: []
  };
  function loadLastRead() { try { return JSON.parse(localStorage.getItem('blast-lastread') || '{}') || {}; } catch (e) { return {}; } }
  const lastRead = loadLastRead();
  function saveLastRead() { try { localStorage.setItem('blast-lastread', JSON.stringify(lastRead)); } catch (e) {} }

  function el(id) { return document.getElementById(id); }
  function dict() { try { return (typeof I18N !== 'undefined' && I18N[(typeof currentLang !== 'undefined' && currentLang) || 'pt']) || {}; } catch (e) { return {}; } }
  function fb() { return window.FirebaseSync || null; }
  function ready() { return !!(fb() && fb().ready && fb().uid); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  function toast(m) { if (typeof showToast === 'function') showToast(m); }

  function clearSubs() { state.unsubs.forEach(u => { try { u(); } catch (e) {} }); state.unsubs = []; }

  function attachFriendFns(uid) {
    const F = fb();
    if (!F) return;
    state.unsubs.push(F.listenPresence(uid, p => { state.presence[uid] = p || null; renderFriends(); }));
    state.unsubs.push(F.listenMessages(uid, snapshot => {
      const last = lastRead[uid] || 0;
      const unseen = snapshot.filter(m => m.from === uid && m.at > last).length;
      state.unread[uid] = unseen;
      updateBadge();
      renderFriends();
    }));
  }

  function resubscribe() {
    clearSubs();
    renderProfileGoogle();
    if (!ready()) { renderLogged(); renderFriends(); renderRequests(); renderChat(); updateBadge(); return; }
    const F = fb();
    state.unsubs.push(F.listenFriends(list => {
      state.friends = list;
      list.forEach(f => attachFriendFns(f.uid));
      renderFriends();
    }));
    state.unsubs.push(F.listenFriendRequests(req => { state.requests = req; renderRequests(); }));
    if (state.active) {
      state.unsubs.push(F.listenMessages(state.active.uid, msgs => { renderChat(msgs); markRead(state.active.uid); }));
    }
    renderLogged();
    renderChat();
  }

  function renderLogged() {
    const logged = el('socialLogged');
    const btn = el('btnGoogleSignin');
    if (!logged || !btn) return;
    if (ready() && fb() && fb().isGoogle) {
      logged.textContent = '✓ Google';
      btn.classList.add('hidden');
    } else if (ready() && fb() && fb().linked) {
      logged.textContent = '👤 Convidado';
      btn.classList.remove('hidden');
    } else {
      logged.textContent = '📴 offline';
      btn.classList.remove('hidden');
    }
  }

  function renderFriends() {
    const box = el('socialFriendsList');
    if (!box) return;
    if (!ready()) { box.innerHTML = '<div class="social-empty">Sincronizando…</div>'; return; }
    if (!state.friends.length) { box.innerHTML = '<div class="social-empty">Nenhum amigo ainda. Adicione pelo nick.</div>'; return; }
    const now = Date.now();
    box.innerHTML = state.friends.map(f => {
      const p = state.presence[f.uid];
      const online = !!(p && p.online && (now - (p.at || 0)) < 120000);
      const un = state.unread[f.uid] || 0;
      return '<div class="social-friend" data-uid="' + esc(f.uid) + '">' +
        '<span class="online-dot ' + (online ? 'dot-on' : 'dot-off') + '" title="' + (online ? 'online' : 'offline') + '"></span>' +
        '<span class="social-av">' + esc(f.avatar || '🐍') + '</span>' +
        '<span class="social-name-main">' + esc(f.name || 'Amigo') + '</span>' +
        (un ? '<span class="social-ubadge">' + (un > 9 ? '9+' : un) + '</span>' : '') +
        '<button class="social-act" data-act="chat" title="Conversar">💬</button>' +
        '<button class="social-act" data-act="trash" title="Remover amigo">🗑</button>' +
        '</div>';
    }).join('');
  }

  function updateBadge() {
    const b = el('socialBadge');
    if (!b) return;
    let total = 0;
    Object.keys(state.unread).forEach(k => { total += state.unread[k] || 0; });
    if (total > 0) { b.textContent = total > 9 ? '9+' : String(total); b.classList.remove('hidden'); }
    else b.classList.add('hidden');
  }

  function markRead(uid) {
    if (!uid) return;
    lastRead[uid] = Date.now();
    state.unread[uid] = 0;
    saveLastRead();
    updateBadge();
    renderFriends();
  }

  function renderProfileGoogle() {
    const b = el('btnProfileGoogle');
    if (!b) return;
    b.classList.toggle('hidden', !(ready() && fb() && fb().linked && !fb().isGoogle));
  }

  function renderRequests() {
    const box = el('socialRequests');
    if (!box) return;
    const inc = (state.requests && state.requests.in) || [];
    if (!ready()) { box.innerHTML = '<div class="social-empty">—</div>'; return; }
    if (!inc.length) { box.innerHTML = '<div class="social-empty">Nenhum pedido.</div>'; return; }
    box.innerHTML = inc.map(r =>
      '<div class="social-friend" data-req="' + esc(r.id) + '" data-uid="' + esc(r.from) + '" data-name="' + esc(r.fromName) + '" data-av="' + esc(r.fromAvatar) + '">' +
      '<span class="social-av">' + esc(r.fromAvatar || '🐍') + '</span>' +
      '<span class="social-name-main">' + esc(r.fromName || 'Jogador') + '</span>' +
      '<button class="social-act ok" data-act="accept" title="Aceitar">✓</button>' +
      '<button class="social-act" data-act="decline" title="Recusar">✕</button>' +
      '</div>'
    ).join('');
  }

  function renderChat(msgs) {
    const head = el('socialChatHead');
    const headText = el('socialChatHeadText');
    const box = el('socialChatMsgs');
    const input = el('socialChatText');
    if (!box || (!head && !headText)) return;
    if (!state.active) {
      if (headText) headText.textContent = 'Escolha um amigo para conversar';
      if (box) box.innerHTML = '';
      if (input) input.disabled = true;
      updateCallBtn();
      return;
    }
    if (headText) headText.textContent = (state.active.avatar || '🐍') + '  ' + (state.active.name || 'Amigo');
    updateCallBtn();
    if (input) input.disabled = false;
    const list = msgs || [];
    if (!list.length) { box.innerHTML = '<div class="social-empty">Sem mensagens ainda. Mande um oi!</div>'; return; }
    const myUid = fb() ? fb().uid : '';
    box.innerHTML = list.map(m => {
      const mine = m.from === myUid;
      const name = mine ? 'Você' : (state.active.name || 'Amigo');
      const body = (m.kind === 'audio')
        ? '<audio class="voice-msg" controls preload="metadata" playsinline src="' + esc(m.audio || m.audioUrl || '') + '"></audio>' +
          (m.dur ? '<div class="chat-dur">' + Math.max(1, Math.round(m.dur / 1000)) + 's</div>' : '')
        : '<div class="chat-text">' + esc(m.text) + '</div>';
      return '<div class="chat-bubble ' + (mine ? 'mine' : 'theirs') + '">' +
        '<div class="chat-name">' + esc(name) + '</div>' + body + '</div>';
    }).join('');
    box.scrollTop = box.scrollHeight;
  }

  function updateCallBtn() {
    const b = el('btnCallVoz');
    if (!b) return;
    if (!state.active) { b.classList.add('hidden'); return; }
    b.classList.remove('hidden');
    b.textContent = DMVoice.state === 'in-call' ? '🔊' : DMVoice.state === 'ringing' ? '⏳' : '📞';
    b.title = DMVoice.state === 'in-call' ? 'Encerrar chamada' : 'Chamada de voz';
  }

  function openChat(uid, name, avatar) {
    state.active = { uid, name, avatar };
    markRead(uid);
    renderChat();
    resubscribe();
  }

  function open() {
    const modal = el('socialModal');
    if (modal) modal.classList.remove('hidden');
    if (!state.open) { state.open = true; resubscribe(); }
  }

  function close() {
    state.open = false;
    clearSubs();
    const modal = el('socialModal');
    if (modal) modal.classList.add('hidden');
  }

  async function googleLogin() {
    const b = el('btnGoogleSignin');
    const prev = b ? b.textContent : '';
    if (b) b.textContent = 'Aguarde…';
    const F = fb();
    if (!F || !F.loginWithGoogle) { toast('Firebase indisponível.'); if (b) b.textContent = prev; return; }
    const r = await F.loginWithGoogle();
    if (b) b.textContent = prev;
    if (r && r.ok) {
      toast(r.switched ? 'Entrou com Google (conta vinculada ao Google).' : 'Conta vinculada ao Google! Seu progresso está salvo.');
      renderLogged();
      resubscribe();
    } else {
      toast('Não foi possível entrar com Google (' + (r && r.error || 'erro') + ').');
    }
  }

  async function addFriend() {
    const input = el('socialAddNick');
    const nick = input ? input.value.trim() : '';
    if (!nick) return;
    const F = fb();
    if (!F || !F.sendFriendRequest) { toast('Firebase indisponível.'); return; }
    const r = await F.sendFriendRequest(nick);
    if (r && r.ok) toast('Pedido enviado para ' + r.toName + '.');
    else if (r && r.error === 'not-found') toast('Nenhum jogador com esse nick.');
    else if (r && r.error === 'self') toast('Esse é o seu próprio nick.');
    else toast('Não foi possível enviar o pedido.');
    if (input) input.value = '';
  }

  function bind(elId, ev, fn) {
    const node = document.getElementById(elId);
    if (node) node.addEventListener(ev, fn);
  }

  function init() {
    renderProfileGoogle();
    bind('btnOpenSocial', 'click', e => { if (e && e.stopPropagation) e.stopPropagation(); open(); });
    bind('btnOpenSocialLeft', 'click', e => { if (e && e.stopPropagation) e.stopPropagation(); open(); });
    bind('btnOpenSocialSection', 'click', e => { if (e && e.stopPropagation) e.stopPropagation(); open(); });
    bind('btnSocialClose', 'click', close);
    bind('btnGoogleSignin', 'click', googleLogin);
    bind('btnProfileGoogle', 'click', googleLogin);
    bind('btnSocialAdd', 'click', addFriend);
    bind('btnSocialSend', 'click', () => sendText());
    bind('socialChatText', 'keydown', e => { if (e.key === 'Enter') { e.preventDefault(); sendText(); } });
    bind('socialAddNick', 'keydown', e => { if (e.key === 'Enter') { e.preventDefault(); addFriend(); } });
    bind('btnAudioRec', 'click', () => AudioRec.toggle());

    const friendsBox = el('socialFriendsList');
    if (friendsBox) friendsBox.addEventListener('click', e => {
      const row = e.target.closest('[data-uid]');
      if (!row) return;
      const act = e.target.getAttribute('data-act');
      const uid = row.getAttribute('data-uid');
      const name = row.querySelector('.social-name-main') ? row.querySelector('.social-name-main').textContent : '';
      const av = row.querySelector('.social-av') ? row.querySelector('.social-av').textContent : '🐍';
      if (act === 'trash') { fb() && fb().removeFriend(uid).then(() => resubscribe()); }
      else openChat(uid, name, av);
    });

    const reqBox = el('socialRequests');
    if (reqBox) reqBox.addEventListener('click', e => {
      const row = e.target.closest('[data-req]');
      if (!row) return;
      const act = e.target.getAttribute('data-act');
      const reqId = row.getAttribute('data-req');
      const uid = row.getAttribute('data-uid');
      const name = row.getAttribute('data-name');
      const av = row.getAttribute('data-av');
      if (act === 'accept') { fb() && fb().acceptRequest(reqId, uid, name, av).then(() => resubscribe()); }
      else if (act === 'decline') { fb() && fb().declineRequest(reqId).then(() => resubscribe()); }
    });
  }

  async function sendText() {
    const input = el('socialChatText');
    const text = input ? input.value : '';
    if (!text.trim() || !state.active) return;
    const F = fb();
    const ok = F && F.sendMessage ? await F.sendMessage(state.active.uid, text) : false;
    if (ok && input) input.value = '';
  }

  /* ------------ Voz nas mensagens (DMVoice) ------------ */
  function hideIncoming() {
    const o = el('callIncoming');
    if (o) o.classList.add('hidden');
  }
  function showIncoming(name) {
    const o = el('callIncoming');
    const n = el('callIncomingName');
    if (n) n.textContent = String(name || 'Amigo');
    if (o) o.classList.remove('hidden');
  }

  const DMVoice = {
    pc: null, stream: null, remoteAudio: null, micOn: false,
    state: 'idle', pairId: null, theirUid: null, unsub: null,
    reset() {
      if (this.pc) { try { this.pc.close(); } catch (e) {} }
      this.pc = null;
      if (this.stream) { try { this.stream.getTracks().forEach(t => t.stop()); } catch (e) {} }
      this.stream = null; this.remoteAudio = null; this.micOn = false;
      if (this.unsub) { try { this.unsub(); } catch (e) {} this.unsub = null; }
      this.pairId = null; this.theirUid = null; this.state = 'idle';
      hideIncoming(); updateCallBtn();
    },
    audioEl() {
      if (!this.remoteAudio) { this.remoteAudio = document.createElement('audio'); this.remoteAudio.autoplay = true; this.remoteAudio.playsInline = true; document.body.appendChild(this.remoteAudio); }
      return this.remoteAudio;
    },
    async _media() {
      if (this.stream) return this.stream;
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      this.micOn = true;
      return this.stream;
    },
    _makePC() {
      const ice = (typeof NET_ICE !== 'undefined' && NET_ICE) || { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
      const pc = new RTCPeerConnection(ice);
      pc.addEventListener('icecandidate', e => { if (e.candidate) this._send({ kind: 'ice', payload: e.candidate.toJSON() }); });
      pc.addEventListener('track', ev => {
        try {
          const a = this.audioEl();
          a.srcObject = ev.streams[0] || new MediaStream([ev.track]);
          a.muted = false; const p = a.play(); if (p && p.catch) p.catch(() => {});
        } catch (e) {}
      });
      pc.addEventListener('connectionstatechange', () => {
        if (pc.connectionState === 'failed' || pc.connectionState === 'closed') { if (this.pc === pc) this.end(true); }
      });
      return pc;
    },
    _send(obj) {
      const F = fb();
      if (!F || !this.pairId) return;
      F.sendCallSignal(this.pairId, F.uid, obj);
    },
    async start() {
      if (!state.active) return;
      const F = fb();
      if (!F || !ready()) { if (typeof toast === 'function') toast('Conecte-se (Google) para fazer chamada.'); return; }
      const theirUid = state.active.uid;
      this.theirUid = theirUid;
      this.pairId = F.callIdOf(F.uid, theirUid);
      this.reset();
      this.state = 'ringing';
      try {
        const stream = await this._media();
        this.pc = this._makePC();
        stream.getTracks().forEach(t => this.pc.addTrack(t, stream));
        F.setCallMeta(this.pairId, { state: 'ringing', caller: F.uid, callee: theirUid, at: Date.now() });
        this.unsub = F.listenCallSignals(this.pairId, theirUid, v => this._onSignal(v));
        const offer = await this.pc.createOffer();
        await this.pc.setLocalDescription(offer);
        this._send({ kind: 'description', payload: this.pc.localDescription.toJSON() });
      } catch (e) {
        if (typeof toast === 'function') toast('Não foi possível iniciar a chamada.');
        this.reset();
      }
      updateCallBtn();
    },
    _onSignal(v) {
      if (!this.pc || !v || (v.kind !== 'description' && v.kind !== 'ice')) return;
      const self = this;
      if (v.kind === 'description') {
        this.pc.setRemoteDescription(new RTCSessionDescription(v.payload)).then(async () => {
          if (v.payload.type === 'offer') {
            const answer = await self.pc.createAnswer();
            await self.pc.setLocalDescription(answer);
            self._send({ kind: 'description', payload: self.pc.localDescription.toJSON() });
          }
        }).catch(() => {});
      } else if (v.kind === 'ice' && v.payload) {
        this.pc.addIceCandidate(new RTCIceCandidate(v.payload)).catch(() => {});
      }
    },
    async accept() {
      const F = fb();
      if (!F || !state.active) return;
      this.theirUid = state.active.uid;
      this.pairId = F.callIdOf(F.uid, this.theirUid);
      this.state = 'in-call';
      hideIncoming();
      try {
        const stream = await this._media();
        this.pc = this._makePC();
        stream.getTracks().forEach(t => this.pc.addTrack(t, stream));
        this.unsub = F.listenCallSignals(this.pairId, this.theirUid, v => this._onSignal(v));
        F.setCallMeta(this.pairId, { state: 'in-call', caller: this.theirUid, callee: F.uid, at: Date.now() });
      } catch (e) {
        if (typeof toast === 'function') toast('Não foi possível aceitar a chamada.');
        this.end(true);
      }
      updateCallBtn();
    },
    toggleMic() {
      if (this.stream) this.stream.getAudioTracks().forEach(t => { t.enabled = !this.micOn; this.micOn = !this.micOn; });
    },
    end(silent) {
      const pair = this.pairId;
      this.reset();
      const F = fb();
      if (F && pair) F.setCallMeta(pair, { state: 'ended', at: Date.now() });
      if (!silent && typeof toast === 'function') toast('Chamada encerrada.');
    }
  };

  /* Fica de ouvido em chamadas recebidas de cada amigo (overlay). */
  function listenIncomingCalls() {
    const F = fb();
    if (!F || !state.friends || !state.friends.length) return;
    state.friends.forEach(f => {
      const pair = F.callIdOf(F.uid, f.uid);
      const un = F.listenCallMeta(pair, meta => {
        if (!meta || !F.uid) return;
        if (meta.state === 'ringing' && meta.callee === F.uid) {
          state.pendingCaller = f.uid;
          showIncoming(f.avatar + '  ' + f.name);
        } else if (meta.state === 'ended') {
          hideIncoming();
        }
      });
      state.unsubs.push(un);
    });
  }

  const AudioRec = {
    media: null, rec: null, chunks: [], timer: null, start: 0, state: 'idle',
    toggle() {
      if (this.state === 'recording') { this.stop(); return; }
      if (!state.active) return;
      const F = fb();
      if (!F || !F.canAudio) { if (typeof toast === 'function') toast('Áudio indisponível — sincronização em espera.'); return; }
      if (!navigator.mediaDevices || !window.MediaRecorder) { if (typeof toast === 'function') toast('Gravação não suportada neste navegador.'); return; }
      this._begin();
    },
    async _begin() {
      try { this.media = await navigator.mediaDevices.getUserMedia({ audio: true }); }
      catch (e) { if (typeof toast === 'function') toast('Não foi possível acessar o microfone.'); return; }
      const mime = (window.MediaRecorder && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported('audio/webm')) ? 'audio/webm' : 'audio/ogg';
      this.rec = new MediaRecorder(this.media, { mimeType: mime });
      this.chunks = []; this.start = Date.now();
      this.rec.ondataavailable = e => { if (e.data && e.data.size) this.chunks.push(e.data); };
      this.rec.start();
      this.state = 'recording';
      const btn = el('btnAudioRec'); const tEl = el('audioRecTimer');
      if (btn) btn.textContent = '⏹️';
      if (tEl) { tEl.classList.remove('hidden'); tEl.textContent = '0s'; }
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        const s = Math.floor((Date.now() - this.start) / 1000);
        if (tEl) tEl.textContent = s + 's';
        if (s >= 15) this.stop();
      }, 1000);
    },
    stop() {
      clearInterval(this.timer);
      const tEl = el('audioRecTimer'); if (tEl) tEl.classList.add('hidden');
      const btn = el('btnAudioRec'); if (btn) btn.textContent = '🎤';
      const rec = this.rec;
      if (!rec || this.state !== 'recording') { this._cleanup(); return; }
      this.state = 'stopped';
      rec.onstop = () => this._deliver(rec);
      try { rec.stop(); } catch (e) { this._deliver(rec); }
    },
    async _deliver(rec) {
      const blob = new Blob(this.chunks, { type: (rec && rec.mimeType) || 'audio/webm' });
      const dur = Date.now() - this.start;
      this._cleanup();
      const F = fb();
      const r = F ? await F.uploadAudioMessage(state.active.uid, blob, dur) : { ok: false };
      if (!(r && r.ok)) if (typeof toast === 'function') toast('Não foi possível enviar o áudio.');
    },
    _cleanup() {
      if (this.media) { try { this.media.getTracks().forEach(t => t.stop()); } catch (e) {} }
      this.media = null; this.rec = null; this.chunks = []; this.state = 'idle';
      clearInterval(this.timer);
    }
  };

  if (document.readyState === 'complete') init();
  else window.addEventListener('load', init, { once: true });

  window.SocialUI = { open, close, googleLogin, resubscribe };
})();