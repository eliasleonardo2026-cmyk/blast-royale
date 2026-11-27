/* ========================================================================
   2ª PARTE DO JOGO — script2.js (carregar DEPOIS de script.js)
   Contém: Online Multiplayer, Chat de Voz, Chroma Drop, loop do jogo e boot.
   - Modos de Time (1v1, 2v2, 3v3)
   - Multiplayer (via WebSocket /ws)
   ======================================================================== */

/* ========================================================================
   17. ONLINE MULTIPLAYER (WebRTC)
   ======================================================================== */
const NET_ICE = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'turn:177.52.161.107:3478', username: 'blast', credential: 'BlastTurn2026' }, { urls: 'turn:177.52.161.107:3478?transport=tcp', username: 'blast', credential: 'BlastTurn2026' }] };

/* ---------- Servidor de salas (sinalização WebRTC) ---------- */
// Mesmo host por padrão; aceita ?server=https://... ou window.BLAST_SERVER.
const netServer = {
  base: (() => {
    try {
      // 1) ?server=... sobrescreve sempre (útil p/ apontar p/ outro servidor).
      const q = new URLSearchParams(location.search).get('server');
      if (q) return String(q).replace(/\/+$/, '');
      // 2) Quando a página veio do próprio servidor (localhost OU produção),
      //    usa a URL de onde ela veio — assim o "servidor local" de fato serve
      //    as salas, e a produção usa a produção.
      if (window.__BLAST_SERVER__) {
        const origin = String(location.origin || '').replace(/\/+$/, '');
        if (origin && /^https?:\/\//.test(origin)) return origin;
      }
      // 3) Fallback final: o relé público do jogo.
      return window.BLAST_SERVER || 'https://bastleroyale.duckdns.org';
    } catch (e) { return 'https://bastleroyale.duckdns.org'; }
  })(),
  available: false, checked: false, serverless: false, code: '', token: '', role: null,
  since: 0, polling: false, pollAbort: null, busy: false, roomToken: '',
  quick: false,
  bracketSlot: '', bracketRival: '',
  peers: { host: false, guest: false },
  // Modo da sala online escolhido ao criar (1v1 | 2v2 | 3v3). O servidor monta
  // a capacidade (2 | 4 | 6) e define papel, índice e time de cada membro.
  mode: '1v1', capacity: 2, playerIndex: 0, team: 1,
  ws: null, wsWanted: false, wsTries: 0, wsConnected: false,
  wsPingTimer: null, wsReconnectTimer: null,
  // Health-check: cache só é confiável quando deu certo. Falha não fica
  // gravada para sempre — tenta de novo com backoff (Render free dorme).
  checking: false, checkPromise: null, lastCheck: 0, failCount: 0, retryTimer: null
};
function capForMode(m) { return m === '2v2' ? 4 : m === '3v3' ? 6 : 2; }
function onlineModeId(cap) { return (cap || 2) >= 6 ? 'ONLINE3v3' : (cap || 2) >= 4 ? 'ONLINE2v2' : 'ONLINE'; }
function netApiUrl(p) { return netServer.base + p; }
function netServerLikely() {
  if (window.__BLAST_SERVER__ || netServer.base) return true;
  try {
    if (/\.vercel\.app$/i.test(location.hostname)) return true;
    return new URLSearchParams(location.search).has('room');
  } catch (e) { return false; }
}
async function netApi(p, body, method = 'POST', timeoutMs = 8000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(netApiUrl(p), {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      cache: 'no-store',
      signal: ctrl.signal
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(data.error || ('HTTP ' + res.status));
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  } finally {
    clearTimeout(timer);
  }
}

const NET_GRACE_MS = 12000;
const NET_REMATCH_WAIT_MS = 15000;

const net = {
  role: null, pc: null, dc: null, connected: false, started: false, preparing: false, hold: false,
  closing: false, sendAccum: 0, inputAccum: 0, pingAccum: 0, ping: 0, lastReceive: 0,
  gridSentRev: -1, feedSeq: 0, feedSentSeq: 0, seenExplosions: new Set(), pending: {},
  lastGridRev: -1,
  // Sincronização do efeito de coleta de power-up e estado de revanche.
  pickupSeq: 0, pickupQueue: [], pickupSentSeq: 0, lastPickupSeq: 0,
  graceDeadline: 0, rematchPending: false, rematchTimer: null,
  // Depois que a janela de reconexão expira, o canal não deve mais
  // ressuscitar a partida com snapshots atrasados.
  dropped: false,
  // Fallback de transporte: quando o P2P não abre (CGNAT, Wi-Fi
  // corporativo, firewall), a partida continua pelo servidor de salas.
  relay: false, relayOut: [], relayPosting: false, relayPump: null,
  relayFallbackTimer: null, relayWatch: 0, relayFails: 0
};

function netRelayStop() {
  if (!net.relay) return;
  net.relay = false;
  net.relayOut = [];
  net.relayPosting = false;
  net.relayFails = 0;
  clearInterval(net.relayPump); net.relayPump = null;
  clearTimeout(net.relayFallbackTimer); net.relayFallbackTimer = null;
  netServerSocketClose();
}

let netGraceInterval = null;

/* Transporte único: P2P quando o canal abriu, relay do servidor quando a
   rede bloqueou o WebRTC. Todo envio do jogo passa por aqui. */
function netCanSend() {
  if (net.relay) return !!(netServer.code && netServer.token);
  return !!(net.dc && net.dc.readyState === 'open');
}

function netSend(obj) {
  const raw = typeof obj === 'string' ? obj : JSON.stringify(obj);
  if (!net.relay && net.dc && net.dc.readyState === 'open') {
    try { net.dc.send(raw); return true; } catch (e) {}
  }
  if (net.relay && netServer.ws && netServer.ws.readyState === 1 && typeof obj !== 'string') {
    try { netServer.ws.send('{"m":' + raw + '}'); return true; } catch (e) {}
  }
  if (net.relay && netServer.code && netServer.token) {
    net.relayOut.push(raw);
    if (net.relayOut.length > 160) net.relayOut.splice(0, net.relayOut.length - 160);
    return true;
  }
  return false;
}

function netSetStatus(key, kind = 'idle') {
  const el = document.getElementById('netStatus');
  if (!el) return;
  const dict = I18N[currentLang];
  el.textContent = dict[key] || key;
  el.className = 'text-[10px] font-bold text-center rounded-xl px-2 py-1 border ' + (kind === 'ok' ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300' : kind === 'err' ? 'bg-rose-500/15 border-rose-500/50 text-rose-300' : 'bg-slate-800/70 border-slate-700 text-slate-400');
}

function netPickRole(role) {
  if (!hasCompetitiveNick()) { openNickGate(() => netPickRole(role)); return; }
  net.role = role;
  const hostBox = document.getElementById('netHostBox');
  const guestBox = document.getElementById('netGuestBox');
  if (hostBox) hostBox.style.display = role === 'host' ? 'flex' : 'none';
  if (guestBox) guestBox.style.display = role === 'guest' ? 'flex' : 'none';
  document.getElementById('btnHostRole').className = role === 'host' ? 'flex-1 py-2 rounded-xl bg-emerald-500/20 border-2 border-emerald-400 font-display font-bold text-xs text-emerald-300' : 'flex-1 py-2 rounded-xl bg-slate-800/70 border-2 border-slate-700 font-display font-bold text-xs text-slate-300';
  document.getElementById('btnGuestRole').className = role === 'guest' ? 'flex-1 py-2 rounded-xl bg-emerald-500/20 border-2 border-emerald-400 font-display font-bold text-xs text-emerald-300' : 'flex-1 py-2 rounded-xl bg-slate-800/70 border-2 border-slate-700 font-display font-bold text-xs text-slate-300';
  netSetStatus('netIdle', 'idle');
}

function b64FromBytes(bytes) {
  let out = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) out += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  return btoa(out);
}
function bytesFromB64(str) {
  const bin = atob(str);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function encodeSignal(obj) {
  const text = JSON.stringify(obj);
  if (typeof CompressionStream === 'function') {
    try {
      const stream = new Blob([text]).stream().pipeThrough(new CompressionStream('gzip'));
      const buf = await new Response(stream).arrayBuffer();
      return 'GZ:' + b64FromBytes(new Uint8Array(buf));
    } catch (e) {}
  }
  return 'B:' + btoa(text);
}

async function decodeSignal(raw) {
  let clean = String(raw || '').replace(/\s+/g, '');
  if (!clean) throw new Error('empty');
  const gzAt = clean.indexOf('GZ:');
  if (gzAt > 0) clean = clean.slice(gzAt);
  if (clean.startsWith('GZ:')) {
    if (typeof DecompressionStream !== 'function') throw new Error('no-decompress');
    const stream = new Blob([bytesFromB64(clean.slice(3))]).stream().pipeThrough(new DecompressionStream('gzip'));
    return JSON.parse(await new Response(stream).text());
  }
  const body = clean.startsWith('B:') ? clean.slice(2) : clean;
  const padded = body + '='.repeat((4 - (body.length % 4)) % 4);
  return JSON.parse(atob(padded));
}

function netShowReconnect(show) {
  const el = document.getElementById('netReconnect');
  if (!el) return;
  if (show) netRefreshReconnectUI();
  el.classList.toggle('hidden', !show);
}

function netReconnectRemaining() {
  return net.graceDeadline ? Math.max(0, Math.ceil((net.graceDeadline - performance.now()) / 1000)) : 0;
}

function netRefreshReconnectUI() {
  const dict = I18N[currentLang];
  const s = netReconnectRemaining();
  const title = document.getElementById('netReconnectTitle');
  const sub = document.getElementById('netReconnectSub');
  const cd = document.getElementById('netReconnectCountdown');
  if (title) title.textContent = dict.netReconnecting;
  if (sub) sub.textContent = (dict.netReconnectSubCount || dict.netReconnectSub).replace('{s}', s);
  if (cd) cd.textContent = `${s}s`;
}

function netEnterReconnectGrace() {
  if (!net.started || match.ended || net.closing) return;
  net.connected = false;
  net.ping = 0;
  // Renova a janela a cada oscilação para o jogador não perder a partida
  // por causa de um pico curto de rede.
  net.graceDeadline = performance.now() + NET_GRACE_MS;
  if (!net.hold) {
    net.hold = true;
    netShowReconnect(true);
    netSetStatus('netReconnecting', 'idle');
    resetJoystick();
  }
  netRefreshReconnectUI();
  clearInterval(netGraceInterval);
  netGraceInterval = setInterval(() => {
    if (!net.hold) { clearInterval(netGraceInterval); netGraceInterval = null; return; }
    if (netReconnectRemaining() <= 0) { clearInterval(netGraceInterval); netGraceInterval = null; netHandleDrop(); return; }
    netRefreshReconnectUI();
  }, 250);
  netUpdateBadge();
}

function netExitReconnectGrace() {
  clearInterval(netGraceInterval); netGraceInterval = null;
  net.graceDeadline = 0;
  net.connected = true;
  if (!net.hold) { netUpdateBadge(); return; }
  net.hold = false;
  net.dropped = false;
  net.lastReceive = performance.now();
  // Reenviar/aceitar o estado completo depois da queda, para os dois
  // lados voltarem exatamente ao mesmo ponto.
  net.gridSentRev = -1;
  net.lastGridRev = -1;
  net.pingAccum = 0;
  net.pending = {};
  netShowReconnect(false);
  netSetStatus('netConnected', 'ok');
  netUpdateBadge();
}

function netHandleDrop() {
  if (net.closing) return;
  netRelayStop();
  clearInterval(netGraceInterval); netGraceInterval = null;
  clearTimeout(netDropTimer); netDropTimer = null;
  clearTimeout(net.rematchTimer); net.rematchTimer = null;
  net.graceDeadline = 0;
  net.connected = false;
  net.hold = false;
  net.preparing = false;
  hideCountdownOverlay();
  net.ping = 0;
  net.pending = {};
  net.lastReceive = 0;
  net.dropped = true;
  net.rematchPending = false;
  netShowReconnect(false);
  resetJoystick();
  netSetStatus('netLost', 'err');
  if (!net.started) { netUpdateBadge(); return; }
  if (match.running && !match.ended) endMatch(false, false, { record: false });
  const dict = I18N[currentLang];
  UI.endTrophy.textContent = '📡';
  UI.endRank.textContent = 'ONLINE';
  UI.endRank.className = 'inline-block px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/50 text-rose-300 font-display font-extrabold text-sm mb-1';
  UI.endTitle.textContent = dict.netLostTitle;
  UI.endSub.textContent = dict.netLostSub;
  if (UI.btnPlayAgain) {
    const label = UI.btnPlayAgain.querySelector('span');
    if (label) label.textContent = dict.exitBtn;
  }
  UI.endModal.classList.remove('hidden');
  netUpdateBadge();
}

let netDropTimer = null;

function waitIceComplete(pc, ms = 6000) {
  if (pc.iceGatheringState === 'complete') return Promise.resolve();
  return new Promise(resolve => {
    let finished = false;
    const finish = () => { if (finished) return; finished = true; clearTimeout(timer); pc.removeEventListener('icegatheringstatechange', check); resolve(); };
    const check = () => { if (pc.iceGatheringState === 'complete') finish(); };
    const timer = setTimeout(finish, ms);
    pc.addEventListener('icegatheringstatechange', check);
    pc.addEventListener('icecandidate', e => { if (!e.candidate) finish(); });
  });
}

function netCreatePeer() {
  const pc = new RTCPeerConnection(NET_ICE);
  pc.addEventListener('connectionstatechange', () => {
    if (net.relay) return;
    const st = pc.connectionState;
    if (st === 'connected') {
      clearTimeout(netDropTimer); netDropTimer = null;
      netExitReconnectGrace();
      net.connected = true;
    } else if (st === 'failed') {
      netHandleDrop();
    } else if (st === 'disconnected') {
      // Oscilação de rede: pausa a partida e abre uma janela de 12s
      // (com contagem regressiva visível) para a conexão voltar.
      netEnterReconnectGrace();
    }
  });
  net.pc = pc;
  return pc;
}

function netWireChannel(dc) {
  net.dc = dc;
  dc.addEventListener('open', () => {
    // A partida já migrou para o relay: este canal chegou tarde e não pode
    // duplicar mensagens.
    if (net.relay) { try { dc.close(); } catch (e) {} return; }
    net.closing = false;
    net.connected = true;
    net.lastReceive = performance.now();
    clearTimeout(net.relayFallbackTimer); net.relayFallbackTimer = null;
    netServerStopPoll();
    netSetStatus('netConnected', 'ok');
    // Sinais de voz que chegaram antes do canal abrir saem agora.
    if (window.VoiceChat) window.VoiceChat.flushSignals();
    if (net.role === 'host') netStartHostMatch();
    else {
      netSetStatus('netWaitingHost', 'ok');
      const fallback = (I18N[currentLang] || {}).nickFallback || 'JOGADOR';
      const name = (GameState.state.profile.nick || UI.nameInput.value || fallback).trim().slice(0, 15) || fallback;
      try { dc.send(JSON.stringify({ t: 'hi', n: name, cs: GameState.state.skins.equipped, tr: GameState.state.cosmetics.trails.equipped, xs: GameState.state.cosmetics.explosions.equipped, av: GameState.state.profile.avatar })); } catch (e) {}
    }
  });
  dc.addEventListener('close', () => {
    if (net.closing || net.relay) return;
    // Um fechamento do canal normalmente é definitivo, mas ainda damos
    // uma janela curta caso seja só uma queda momentânea do transporte.
    if (net.started && !match.ended && net.pc && net.pc.connectionState !== 'closed' && net.pc.connectionState !== 'failed') {
      netEnterReconnectGrace();
      clearTimeout(netDropTimer);
      netDropTimer = setTimeout(() => { if (!net.connected) netHandleDrop(); }, NET_GRACE_MS);
    } else {
      netHandleDrop();
    }
  });
  dc.addEventListener('message', ev => {
    if (net.relay) return;
    let msg;
    try { msg = JSON.parse(ev.data); } catch (e) { return; }
    netHandleMessage(msg);
  });
}

/* Roteia uma mensagem da partida, venha ela do canal P2P ou do relay. */
function netHandleMessage(msg) {
  if (!msg || !msg.t) return;
  // Lote do relay HTTP. Quando um lado envia em lote e o outro está no
  // WebSocket, o servidor entrega o lote inteiro; sem desembrulhar aqui os
  // inputs/snapshots seriam descartados e a partida congelaria.
  if (msg.t === 'rb') {
    if (Array.isArray(msg.m)) for (const item of msg.m) netHandleMessage(item);
    else if (msg.m && typeof msg.m === 'object') netHandleMessage(msg.m);
    return;
  }
  net.lastReceive = performance.now();
  if (net.hold) netExitReconnectGrace();
  if (msg.t === 's') netApplySnapshot(msg);
  else if (msg.t === 'i') netOnRemoteInput(msg);
  else if (msg.t === 'hi') netOnHello(msg);
  else if (msg.t === 'p') netSend({ t: 'o', ts: msg.ts });
  else if (msg.t === 'o') {
    const rtt = Math.max(0, performance.now() - Number(msg.ts || 0));
    net.ping = net.ping ? Math.round(net.ping * 0.6 + rtt * 0.4) : Math.round(rtt);
    netUpdateBadge();
  }
  else if (msg.t === 'rm') netOnRematchRequest();
  else if (msg.t === 'vs') { if (window.VoiceChat) window.VoiceChat.onSignalReceived(msg.k, msg.d); }
  else if (msg.t === 'start') {
    // Convidado sincroniza o countdown 3,2,1 pelo timestamp que o host mandou.
    if (net.role === 'guest') showCountdownOverlay(Number(msg.at) || (Date.now() + 3000));
  }
}

function autoCopySignal(id) {
  const el = document.getElementById(id);
  if (!el || !el.value) return;
  if (!navigator.clipboard || !navigator.clipboard.writeText) return;
  navigator.clipboard.writeText(el.value).then(() => netSetStatus('netAutoCopied', 'ok')).catch(() => {});
}

async function netBuildOfferSignal() {
  net.role = 'host';
  netSetStatus('netCreating', 'idle');
  try { if (net.pc) net.pc.close(); } catch (e) {}
  net.pc = null;
  const pc = netCreatePeer();
  const dc = pc.createDataChannel('blast', { ordered: true });
  netWireChannel(dc);
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  await waitIceComplete(pc);
  if (!/a=candidate:/.test(pc.localDescription.sdp)) { netSetStatus('netNoIce', 'err'); return null; }
  const signal = await encodeSignal({ t: 'offer', sdp: pc.localDescription.sdp });
  const out = document.getElementById('netOfferOut');
  if (out) out.value = signal;
  netSetStatus('netInviteReady', 'ok');
  return signal;
}

async function netHostCreateOffer() {
  if (!hasCompetitiveNick()) { openNickGate(netHostCreateOffer); return; }
  try {
    const signal = await netBuildOfferSignal();
    if (signal) autoCopySignal('netOfferOut');
  } catch (err) { console.error(err); netSetStatus('netError', 'err'); }
}

async function netAcceptAnswerSignal(raw) {
  try {
    if (!net.pc) { netSetStatus('netError', 'err'); return false; }
    if (net.pc.remoteDescription) return true;
    const desc = await decodeSignal(raw);
    if (!desc || desc.t !== 'answer' || !desc.sdp) throw new Error('bad answer');
    net.role = 'host';
    await net.pc.setRemoteDescription({ type: 'answer', sdp: desc.sdp });
    netSetStatus('netConnecting', 'idle');
    return true;
  } catch (err) { console.error(err); netSetStatus('netError', 'err'); return false; }
}

async function netHostAcceptAnswer() {
  const el = document.getElementById('netAnswerIn');
  await netAcceptAnswerSignal(el ? el.value : '');
}

async function netBuildAnswerSignal(rawOffer) {
  if (net.connected) return null;
  const desc = await decodeSignal(rawOffer);
  if (!desc || desc.t !== 'offer' || !desc.sdp) throw new Error('bad offer');
  net.role = 'guest';
  netSetStatus('netCreating', 'idle');
  try { if (net.pc) net.pc.close(); } catch (e) {}
  net.pc = null;
  const pc = netCreatePeer();
  pc.addEventListener('datachannel', ev => netWireChannel(ev.channel));
  await pc.setRemoteDescription({ type: 'offer', sdp: desc.sdp });
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  await waitIceComplete(pc);
  if (!/a=candidate:/.test(pc.localDescription.sdp)) { netSetStatus('netNoIce', 'err'); return null; }
  const signal = await encodeSignal({ t: 'answer', sdp: pc.localDescription.sdp });
  const out = document.getElementById('netAnswerOut');
  if (out) out.value = signal;
  netSetStatus('netAnswerReady', 'ok');
  return signal;
}

async function netGuestMakeAnswer() {
  if (!hasCompetitiveNick()) { openNickGate(netGuestMakeAnswer); return; }
  try {
    const el = document.getElementById('netOfferIn');
    const signal = await netBuildAnswerSignal(el ? el.value : '');
    if (signal) autoCopySignal('netAnswerOut');
  } catch (err) { console.error(err); netSetStatus('netError', 'err'); }
}

let autoConnectTimer = null, autoAnswerTimer = null;

async function tryAutoConnect() {
  if (net.role !== 'host' || !net.pc || net.connected || net.pc.remoteDescription) return;
  const el = document.getElementById('netAnswerIn');
  const v = el && el.value.trim();
  if (!v || v.length < 40) return;
  try { await decodeSignal(v); } catch (e) { return; }
  netHostAcceptAnswer();
}

async function tryAutoAnswer() {
  if (net.pc || net.connected || net.role !== 'guest') return;
  const el = document.getElementById('netOfferIn');
  const v = el && el.value.trim();
  if (!v || v.length < 40) return;
  try { await decodeSignal(v); } catch (e) { return; }
  netGuestMakeAnswer();
}

function scheduleAutoConnect() { clearTimeout(autoConnectTimer); autoConnectTimer = setTimeout(tryAutoConnect, 500); }
function scheduleAutoAnswer() { clearTimeout(autoAnswerTimer); autoAnswerTimer = setTimeout(tryAutoAnswer, 600); }

/* ---------- Servidor de salas: criar/entrar sem copiar códigos ---------- */
function netServerDict() { return I18N[currentLang] || I18N.pt; }

function netServerState(text, kind = '') {
  const el = document.getElementById('netServerState');
  if (!el) return;
  el.textContent = text;
  el.classList.remove('ok', 'err');
  if (kind) el.classList.add(kind);
}

function netServerHint(key) {
  const el = document.getElementById('netServerHint');
  if (el) el.textContent = netServerDict()[key] || key;
}

function netServerUI() {
  const dict = netServerDict();
  const box = document.getElementById('netServerBox');
  const toggle = document.getElementById('netManualToggle');
  const manual = document.getElementById('netManualArea');
  const showServer = netServer.checked && netServer.available;
  if (box) box.classList.toggle('hidden', !showServer);
  if (toggle) {
    toggle.classList.toggle('hidden', !showServer);
    toggle.textContent = dict[netServer.manualOpen ? 'serverManualHide' : 'serverManual'] || '';
  }
  if (manual) manual.classList.toggle('hidden', showServer && !netServer.manualOpen);
  if (showServer) {
    netServerState(netServer.available ? dict.serverOnline : dict.serverOffline, 'ok');
    const hint = document.querySelector('#onlinePanel [data-i18n="onlineHint"]');
    if (hint) hint.textContent = dict.onlineHintServer || dict.onlineHint;
  }
  netServerModeUI();
  netServerMembersUI();
  const lobby = document.getElementById('netServerLobby');
  const room = document.getElementById('netServerRoom');
  if (lobby) lobby.classList.toggle('hidden', !!netServer.code);
  if (room) room.classList.toggle('hidden', !netServer.code);
  const codeOut = document.getElementById('netServerCodeOut');
  if (codeOut) codeOut.textContent = netServer.code || '----';
  if (netServer.code) netServerHint(netServer.role === 'guest' ? 'serverWaitOffer' : 'serverWaitGuest');
  quickMatchUI();
}

function netServerModeUI() {
  const row = document.getElementById('netModeRow');
  if (row) {
    row.querySelectorAll('.net-mode-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-online-mode') === netServer.mode);
    });
  }
  const createBtn = document.getElementById('btnServerCreate');
  if (createBtn && createBtn.firstChild) {
    const label = netServer.mode === '2v2' ? '➕ Criar sala 2v2' : netServer.mode === '3v3' ? '➕ Criar sala 3v3' : '➕ Criar sala 1v1';
    createBtn.firstChild.textContent = label;
  }
}

/* ---------- Painel da sala: membros + times ---------- */
function netServerPresent() {
  const p = netServer.peers;
  if (p && typeof p.count === 'number') return p.count;
  if (p && Array.isArray(p.members)) return p.members.filter(m => m.present).length;
  return 0;
}
function netServerRoomFull() {
  return netServerPresent() >= (netServer.capacity || 2);
}
function netServerMembersUI() {
  const el = document.getElementById('netServerMembers');
  const meta = document.getElementById('netServerMeta');
  if (!el) return;
  const cap = netServer.capacity || 2;
  const members = (netServer.peers && Array.isArray(netServer.peers.members)) ? netServer.peers.members : [];
  el.innerHTML = '';
  for (let i = 0; i < cap; i++) {
    const m = members.find(x => x.index === i);
    const present = !!(m && m.present);
    const chip = document.createElement('span');
    chip.className = 'net-member-chip ' + (present ? ('t' + ((m.team || 1))) : 'empty');
    // Personagem (avatar) de cada jogador no lugar da bolinha.
    const charSpan = document.createElement('span');
    charSpan.className = 'net-member-char';
    charSpan.textContent = present ? (m.av || '🐍') : '…';
    chip.appendChild(charSpan);
    const nameSpan = document.createElement('span');
    nameSpan.textContent = present
      ? ((m.name || ('Jogador ' + (i + 1))) + (m.team ? (' · T' + (m.team === 1 ? '1' : '2')) : ''))
      : 'Aguardando…';
    chip.appendChild(nameSpan);
    el.appendChild(chip);
  }
  if (meta) {
    const mode = String(netServer.mode || '1v1').toUpperCase();
    const pres = netServerPresent();
    const full = netServerRoomFull();
    meta.textContent = netServer.code
      ? `Sala ${mode} • ${pres}/${cap} jogadores` + (netServer.team ? ` • Time ${netServer.team}` : '') + (full ? ' • ✅ Pronto!' : '')
      : '';
  }
}

/* ---------- Countdown pré-partida (3, 2, 1 + placar dos times) ---------- */
let netCountdownTimer = null;

function countdownTeamList(teamNum) {
  const members = (netServer.peers && Array.isArray(netServer.peers.members)) ? netServer.peers.members : [];
  return members.filter(m => m.team === teamNum && m.present);
}

function showCountdownOverlay(at) {
  const ov = document.getElementById('countdownOverlay');
  const numEl = document.getElementById('countdownNumber');
  const teamsEl = document.getElementById('countdownTeams');
  if (!ov || !numEl) return;
  if (teamsEl) {
    teamsEl.innerHTML = '';
    for (const t of [1, 2]) {
      const col = document.createElement('div');
      col.className = 'countdown-team t' + t;
      const title = document.createElement('div');
      title.className = 'team-title';
      title.textContent = 'TIME ' + t;
      col.appendChild(title);
      const list = countdownTeamList(t);
      if (!list.length) {
        const row = document.createElement('div');
        row.className = 'team-row';
        row.textContent = '—';
        col.appendChild(row);
      } else {
        list.forEach(m => {
          const row = document.createElement('div');
          row.className = 'team-row';
          row.textContent = (m.av || '🐍') + '  ' + (m.name || ('Jogador ' + (m.index + 1)));
          col.appendChild(row);
        });
      }
      teamsEl.appendChild(col);
    }
  }
  ov.classList.remove('hidden');
  clearInterval(netCountdownTimer); netCountdownTimer = null;
  const tick = () => {
    const rem = Math.max(0, Math.ceil((at - Date.now()) / 1000));
    numEl.textContent = rem > 0 ? rem : '⚔️';
    if (rem <= 0) { clearInterval(netCountdownTimer); netCountdownTimer = null; }
  };
  tick();
  netCountdownTimer = setInterval(tick, 180);
}

function hideCountdownOverlay() {
  clearInterval(netCountdownTimer); netCountdownTimer = null;
  const ov = document.getElementById('countdownOverlay');
  if (ov) ov.classList.add('hidden');
}

/* O host só arma o countdown quando a sala está cheia; depois de 3 s inicia. */
function netStartCountdown() {
  if (net.preparing || net.started) return;
  net.preparing = true;
  const at = Date.now() + 3000;
  // Avissa os convidados (timestamp) para o countdown dos dois lados bater.
  try { netSend({ t: 'start', at }); } catch (e) {}
  showCountdownOverlay(at);
  setTimeout(() => {
    net.preparing = false;
    if (!net.closing && !net.dropped) netStartHostMatch();
  }, 3000);
}

const NET_CHECK_OK_MS = 60000;
const NET_CHECK_BACKOFF_MS = [15000, 30000, 60000];

async function netServerCheck(force = false) {
  const now = Date.now();
  // Uma única requisição por vez: cliques durante o check reaproveitam a
  // mesma promessa em vez de falhar por causa de uma corrida.
  if (netServer.checkPromise) return netServer.checkPromise;
  if (!force && netServer.checked) {
    const ttl = netServer.available
      ? NET_CHECK_OK_MS
      : NET_CHECK_BACKOFF_MS[Math.min(netServer.failCount, NET_CHECK_BACKOFF_MS.length - 1)];
    if (now - (netServer.lastCheck || 0) < ttl) return netServer.available;
  }
  netServer.lastCheck = now;
  netServer.checking = true;
  const run = (async () => {
    try {
      const data = await netApi('/api/health', null, 'GET', 3500);
      netServer.available = !!data.ok;
      // Serverless não tem long-poll: o laço precisa respirar um pouco mais.
      netServer.serverless = data.mode === 'serverless';
      if (Array.isArray(data.iceServers) && data.iceServers.length) NET_ICE.iceServers = data.iceServers;
      if (netServer.available) {
        netServer.failCount = 0;
        clearTimeout(netServer.retryTimer); netServer.retryTimer = null;
      }
    } catch (e) {
      netServer.available = false;
      netServer.failCount = Math.min((netServer.failCount || 0) + 1, NET_CHECK_BACKOFF_MS.length);
    }
    netServer.checking = false;
    netServer.checkPromise = null;
    netServer.checked = true;
    netServerUI();
    // Sem sucesso, agenda a próxima tentativa sozinho (15s → 30s → 60s).
    if (!netServer.available) {
      const delay = NET_CHECK_BACKOFF_MS[Math.min(Math.max(0, netServer.failCount - 1), NET_CHECK_BACKOFF_MS.length - 1)];
      clearTimeout(netServer.retryTimer);
      netServer.retryTimer = setTimeout(() => { netServer.retryTimer = null; netServerCheck(true); }, delay);
    }
    return netServer.available;
  })();
  netServer.checkPromise = run;
  return run;
}

function netServerStopPoll() {
  netServer.polling = false;
  if (netServer.pollAbort) {
    try { netServer.pollAbort.abort(); } catch (e) {}
    netServer.pollAbort = null;
  }
}

async function netServerHandleSignal(data) {
  // O relay manda JSON puro ({t:'rb', m:[...]}); oferta/resposta seguem
  // compactadas (GZ:) como no fluxo P2P.
  if (typeof data === 'string' && data.charAt(0) === '{') {
    let raw = null;
    try { raw = JSON.parse(data); } catch (e) { return; }
    if (!raw || !raw.t) return;
    if (raw.t === 'offer' || raw.t === 'answer') { /* fluxo antigo em JSON puro */ }
    else {
      // JSON puro só chega pelo relay: promove os dois lados juntos.
      if (!net.relay) netEnterRelay({ quiet: true });
      if (raw.t === 'rb') {
        if (Array.isArray(raw.m)) raw.m.forEach(m => { if (m && m.t) netHandleMessage(m); });
      } else {
        netHandleMessage(raw);
      }
      return;
    }
  }
  if (net.relay) return;
  let msg = null;
  try { msg = await decodeSignal(data); } catch (e) { return; }
  if (!msg) return;
  if (msg.t === 'offer' && netServer.role === 'guest') {
    const answer = await netBuildAnswerSignal(data);
    if (answer) await netApi(`/api/rooms/${netServer.code}/signal`, { token: netServer.token, data: answer });
    netServerHint(answer ? 'serverGuestReady' : 'serverNoIce');
  } else if (msg.t === 'answer' && netServer.role === 'host') {
    if (await netAcceptAnswerSignal(data)) netServerHint('serverHostReady');
  }
}

/* ---------- Relay do servidor: WebSocket puro em /ws ---------- */
const NET_RELAY_DELAY_MS = 8000;

/* URL do WebSocket único do jogo: o mesmo host, caminho /ws. O cliente manda o
   join no primeiro frame (roomId/playerId/isHost) e o servidor retransmite
   todas as mensagens de jogo para o adversário da mesma sala. */
function netWsUrl() {
  const base = netServer.base || 'https://bastleroyale.duckdns.org';
  // wss para servidor https (produção); ws p/ http local (localhost sem TLS).
  const scheme = /^https/i.test(base) ? 'wss' : 'ws';
  return scheme + base.replace(/^[a-z][a-z0-9+.-]*:\/\//i, '://') + '/ws';
}

function netServerPlayerId() {
  try {
    const fb = window.FirebaseSync && window.FirebaseSync.uid;
    if (fb) return fb;
  } catch (e) {}
  try {
    if (window.GameState && GameState.state.profile && GameState.state.profile.nick) {
      return 'nick:' + String(GameState.state.profile.nick).slice(0, 24);
    }
  } catch (e) {}
  return 'anon:' + String(Math.random().toString(36).slice(2, 10) + Date.now().toString(36)).slice(0, 20);
}

function netServerPingStart() {
  netServerPingStop();
  const send = () => {
    const ws = netServer.ws;
    if (ws && ws.readyState === 1) {
      try { ws.send(JSON.stringify({ type: 'ping', ts: performance.now() })); } catch (e) {}
    }
  };
  send();
  netServer.wsPingTimer = setInterval(send, 2000);
  if (netServer.wsPingTimer && netServer.wsPingTimer.unref) netServer.wsPingTimer.unref();
}

function netServerPingStop() {
  if (netServer.wsPingTimer) { clearInterval(netServer.wsPingTimer); netServer.wsPingTimer = null; }
}

function netServerSocketFrame(data) {
  let frame = null;
  try { frame = JSON.parse(data); } catch (e) { return; }
  if (!frame || typeof frame !== 'object') return;
  if (frame.type === 'pong') {
    // Ping real medido pelo WebSocket (ida e volta), a cada 2 s.
    const rtt = Math.max(0, performance.now() - Number(frame.ts || 0));
    if (rtt > 0) net.ping = net.ping ? Math.round(net.ping * 0.6 + rtt * 0.4) : Math.round(rtt);
    netUpdateBadge();
    return;
  }
  if (frame.peers) {
    netServer.peers = frame.peers;
    netServerMembersUI();
    const ready = netServerRoomFull();
    // Host só inicia a simulação quando TODOS os jogadores estão na sala
    // (cheia) — em 2v2/3v3 nada de começar sem o time completo.
    if (net.role === 'host' && !net.started && !net.closing && ready) netStartCountdown();
    // Durante a partida, se a sala deixa de estar cheia (alguém caiu), encerra.
    if (net.relay && net.started && !ready && netServer.role === 'host' && !net.closing) netHandleDrop();
    if (netServer.role === 'host') {
      const cap = netServer.capacity || 2;
      netServerHint(ready ? `✅ Sala cheia (${netServerPresent()}/${cap}) — iniciando…` : `Aguardando jogadores (${netServerPresent()}/${cap})…`);
    }
  }
  if (frame.closed) {
    netServerHint('serverRoomClosed');
    netSetStatus('netLost', 'err');
    if (net.relay && net.started && !net.closing) netHandleDrop();
    return;
  }
  if (frame.m && typeof frame.m === 'object') {
    // O hello do convidado também dispara a partida do host, caso o aviso de
    // peers tenha chegado antes — só quando a sala estiver cheia.
    if (frame.m.t === 'hi' && net.role === 'host' && !net.started && !net.closing && netServerRoomFull()) netStartCountdown();
    if (Number(frame.seq)) netServer.since = Number(frame.seq);
    netHandleMessage(frame.m);
  }
}

function netServerSocketOpen() {
  if (netServer.ws || !netServer.wsWanted) return;
  if (typeof WebSocket === 'undefined') return;
  if (!netServer.code) return;
  const url = netWsUrl();
  if (!url) return;
  let ws = null;
  try { ws = new WebSocket(url); } catch (e) { return; }
  ws.onopen = () => {
    if (!netServer.wsWanted || !netServer.code) { try { ws.close(); } catch (e) {} return; }
    netServer.ws = ws;
    netServer.wsTries = 0;
    netServer.wsConnected = true;
    // Com o socket aberto, o transporte HTTP lento de reserva não roda mais.
    netServerStopPoll();
    // Join do protocolo novo: /ws com roomId/playerId/isHost.
    try {
      ws.send(JSON.stringify({
        type: 'join',
        roomId: netServer.code,
        playerId: netServerPlayerId(),
        isHost: netServer.role === 'host',
        token: netServer.token
      }));
    } catch (e) {}
    netServerPingStart();
  };
  ws.onmessage = ev => netServerSocketFrame(ev.data);
  ws.onclose = ev => {
    if (netServer.ws !== ws) return;
    netServer.ws = null;
    netServer.wsConnected = false;
    netServerPingStop();
    clearTimeout(netServer.wsReconnectTimer); netServer.wsReconnectTimer = null;
    if (!netServer.wsWanted || net.closing || net.dropped) return;
    // Sala encerrada/inválida no servidor: não faz sentido reconectar.
    if (ev && typeof ev.code === 'number' && ev.code >= 4000 && ev.code < 4200) {
      if (net.relay && net.started && !net.closing) netHandleDrop();
      return;
    }
    // Oscilação de rede: reconecta sozinho com backoff até a sala expirar.
    netServer.wsTries = (netServer.wsTries || 0) + 1;
    const delay = Math.min(1000 * Math.pow(1.5, netServer.wsTries - 1), 8000);
    netServer.wsReconnectTimer = setTimeout(() => { netServer.wsReconnectTimer = null; netServerSocketOpen(); }, delay);
  };
  ws.onerror = () => { try { ws.close(); } catch (e) {} };
}

function netServerSocketClose() {
  netServer.wsWanted = false;
  netServer.wsTries = 0;
  netServer.wsConnected = false;
  netServerPingStop();
  clearTimeout(netServer.wsReconnectTimer); netServer.wsReconnectTimer = null;
  if (netServer.ws) {
    const ws = netServer.ws;
    netServer.ws = null;
    try { ws.close(); } catch (e) {}
  }
}

/* Migra a partida para o relay do servidor de salas. É o caminho que
   garante partida quando o WebRTC é bloqueado (4G, CGNAT, Wi-Fi
   corporativo). Quando o P2P abre, ele continua sendo o transporte rápido. */
function netEnterRelay(opts = {}) {
  if (net.relay || !netServer.code || !netServer.token) return false;
  if (!net.role) net.role = netServer.role || null;
  if (!net.role) return false;
  net.relay = true;
  net.relayFails = 0;
  net.closing = false;
  net.dropped = false;
  net.connected = true;
  net.hold = false;
  net.graceDeadline = 0;
  net.lastReceive = performance.now();
  net.ping = 0;
  clearInterval(netGraceInterval); netGraceInterval = null;
  clearTimeout(net.relayFallbackTimer); net.relayFallbackTimer = null;
  clearTimeout(netDropTimer); netDropTimer = null;
  // O canal P2P (se ainda estava negociando) não pode mais entregar nada.
  try { if (net.dc) net.dc.close(); } catch (e) {}
  try { if (net.pc) net.pc.close(); } catch (e) {}
  net.dc = null; net.pc = null;
  if (window.VoiceChat) window.VoiceChat.setVisible(false);
  clearInterval(net.relayPump);
  net.relayPump = setInterval(netServerRelayPump, 20);
  netServer.wsTries = 0;
  netServer.wsWanted = true;
  netServerSocketOpen();
  netShowReconnect(false);
  netSetStatus('netConnected', 'ok');
  netUpdateBadge();
  if (net.role === 'host') {
    // O host usa o WebSocket como transporte único. Ele inicia a simulação
    // quando o convidado aparece na sala (aviso de peers/hello via /ws), a
    // menos que o caso de uso já garanta os dois jogadores (ex.: mata-mata).
    if (!opts.deferHostStart && !net.started) netStartHostMatch();
  } else {
    netSetStatus('netWaitingHost', 'ok');
    const fallback = (I18N[currentLang] || {}).nickFallback || 'JOGADOR';
    const name = (GameState.state.profile.nick || UI.nameInput.value || fallback).trim().slice(0, 15) || fallback;
    netSend({ t: 'hi', si: netServer.playerIndex || Math.max(0, (netServer.capacity || 2) > 2 ? 1 : 1), n: name, cs: GameState.state.skins.equipped, tr: GameState.state.cosmetics.trails.equipped, xs: GameState.state.cosmetics.explosions.equipped, av: GameState.state.profile.avatar });
  }
  return true;
}

/* Um envio por mensagem via WebSocket (sem requisição HTTP por lote):
   snapshots e inputs saem na ordem pela conexão persistente de /ws, com o
   HTTP de fallback eliminado. A fila só existe enquanto o socket ainda está
   reconectando e é drenada assim que ele volta a abrir. */
function netServerRelayPump() {
  if (!net.relay || !net.relayOut.length) return;
  const ws = netServer.ws;
  if (ws && ws.readyState === 1) {
    const raw = net.relayOut.splice(0, 64);
    raw.forEach(s => {
      try { ws.send('{"m":' + s + '}'); } catch (e) { net.relayOut.unshift(s); }
    });
  }
}

function netScheduleRelayFallback(delay = NET_RELAY_DELAY_MS) {
  if (!netServer.code || !netServer.token) return;
  clearTimeout(net.relayFallbackTimer);
  net.relayFallbackTimer = setTimeout(netRelayFallbackCheck, delay);
}

function netRelayFallbackCheck() {
  net.relayFallbackTimer = null;
  if (net.relay || net.connected) return;
  if (net.dc && net.dc.readyState === 'open') return;
  if (!netServer.code || !netServer.token) return;
  const peer = netServer.role === 'host' ? !!(netServer.peers && netServer.peers.guest) : true;
  if (!peer) {
    // Sala ainda vazia: continua vigiando sem atrasar a entrada do amigo.
    net.relayFallbackTimer = setTimeout(netRelayFallbackCheck, 2000);
    return;
  }
  netEnterRelay();
}

async function netServerPollLoop() {
  while (netServer.polling) {
    const ctrl = new AbortController();
    netServer.pollAbort = ctrl;
    const timer = setTimeout(() => ctrl.abort(), 32000);
    let data = null;
    try {
      const res = await fetch(
        netApiUrl(`/api/rooms/${netServer.code}/poll?token=${encodeURIComponent(netServer.token)}&since=${netServer.since}`),
        { cache: 'no-store', signal: ctrl.signal }
      );
      data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 404) {
          clearTimeout(timer);
          netServer.pollAbort = null;
          netServerStopPoll();
          netServerHint('serverRoomClosed');
          netSetStatus('netLost', 'err');
          showToast(netServerDict().serverRoomClosed);
          if (net.relay && net.started && !net.closing) netHandleDrop();
          break;
        }
        throw new Error(data.error || ('HTTP ' + res.status));
      }
    } catch (err) {
      clearTimeout(timer);
      netServer.pollAbort = null;
      if (!netServer.polling || err.name === 'AbortError') break;
      netServerHint('serverErrorMsg');
      await new Promise(r => setTimeout(r, 1500));
      continue;
    }
    clearTimeout(timer);
    netServer.pollAbort = null;
    if (!netServer.polling) break;
    netServer.since = Number(data.seq) || netServer.since;
    for (const msg of data.messages || []) {
      try { await netServerHandleSignal(msg.data); } catch (e) { console.warn('sinal', e); }
    }
    if (data.peers) {
      netServer.peers = data.peers;
      // O amigo entrou: vigia o P2P e cai no relay se ele não abrir.
      if (data.peers.guest && !net.relay && !net.connected && netServer.role === 'host' && !net.relayFallbackTimer) {
        netScheduleRelayFallback();
      }
      // No relay o convidado pode fechar a aba sem fechar canal algum:
      // a ausência dele na sala encerra a partida.
      if (net.relay && net.started && !data.peers.guest && netServer.role === 'host' && !net.closing) {
        netHandleDrop();
      }
    }
    if (netServer.role === 'host' && data.peers) {
      netServerHint(data.peers.guest ? 'serverHostReady' : 'serverWaitGuest');
    }
    if (data.closed) {
      netServerStopPoll();
      netServerHint('serverRoomClosed');
      netSetStatus('netLost', 'err');
      showToast(netServerDict().serverRoomClosed);
      if (net.relay && net.started && !net.closing) netHandleDrop();
      break;
    }
    // Servidor serverless responde na hora com a fila vazia: sem esta
    // pausa o laço martelaria a API sem necessidade.
    if (data.empty && !(data.messages || []).length) {
      await new Promise(r => setTimeout(r, netServer.serverless ? 480 : 320));
      if (!netServer.polling) break;
    } else if (netServer.serverless) {
      await new Promise(r => setTimeout(r, 120));
      if (!netServer.polling) break;
    }
  }
}

function netServerStartPoll() {
  netServerStopPoll();
  netServer.polling = true;
  netServerPollLoop();
}

async function netServerCreateRoom() {
  const dict = netServerDict();
  if (!hasCompetitiveNick()) { openNickGate(netServerCreateRoom); return; }
  if (netServer.busy) return;
  if (!(await netServerCheck(!netServer.available))) { showToast(dict.serverErrorMsg); return; }
  netServer.busy = true;
  netServer.manualOpen = false;
  try {
    netServerStopPoll();
    net.role = 'host';
    const room = await netApi('/api/rooms', { name: (GameState.state.profile.nick || 'Host').slice(0, 24), mode: netServer.mode, avatar: GameState.state.profile.avatar || '🐍' });
    netServer.code = room.code;
    netServer.token = room.token;
    netServer.role = 'host';
    netServer.mode = room.mode || netServer.mode;
    // Servidor novo informa capacity; servidor antigo (pré-2v2/3v3) não:
    // nesse caso deriva do modo escolhido para a sala não "voltar pra 1v1".
    netServer.capacity = room.capacity || capForMode(netServer.mode);
    netServer.playerIndex = typeof room.index === 'number' ? room.index : 0;
    netServer.team = typeof room.team === 'number' ? room.team : 1;
    netServer.since = 0;
    netServerUI();
    netServerHint(net.role === 'host' ? 'serverWaitGuest' : 'serverRelayWait');
    // Transporte único: WebSocket persistente em /ws. O host inicia a
    // simulação quando o convidado aparece na sala (sem WebRTC/STUN/TURN).
    netEnterRelay({ quiet: true, deferHostStart: true });
  } catch (err) {
    console.error(err);
    showToast(dict.serverErrorMsg);
    await netServerLeave(true);
  } finally {
    netServer.busy = false;
  }
}

async function netServerJoinRoom(rawCode) {
  const dict = netServerDict();
  const code = String(rawCode || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4);
  if (code.length !== 4) { showToast(dict.serverBadCode); return; }
  if (!hasCompetitiveNick()) { openNickGate(() => netServerJoinRoom(code)); return; }
  if (netServer.busy) return;
  if (!(await netServerCheck(!netServer.available))) { showToast(dict.serverErrorMsg); return; }
  netServer.busy = true;
  netServer.manualOpen = false;
  try {
    netServerStopPoll();
    const joined = await netApi(`/api/rooms/${code}/join`, { name: (GameState.state.profile.nick || 'Guest').slice(0, 24), avatar: GameState.state.profile.avatar || '🐍' });
    netServer.code = joined.code;
    netServer.token = joined.token;
    netServer.role = 'guest';
    // Modo/capacidade vêm do servidor da sala (novos); se o servidor antigo
    // não os informar, mantém o laço atual e deriva a capacidade.
    if (joined.mode || joined.capacity) {
      netServer.mode = joined.mode || netServer.mode;
      netServer.capacity = joined.capacity || capForMode(netServer.mode);
    } else {
      netServer.capacity = capForMode(netServer.mode);
    }
    netServer.playerIndex = typeof joined.index === 'number' ? joined.index : 1;
    netServer.team = typeof joined.team === 'number' ? joined.team : 2;
    netServer.since = 0;
    netServer.peers = joined.peers || { host: true, guest: true };
    net.role = 'guest';
    netServerUI();
    netServerHint('serverWaitOffer');
    // Transporte único: WebSocket persistente em /ws (guest envia o hello e
    // espera o snapshot do host).
    netEnterRelay({ quiet: true });
  } catch (err) {
    console.error(err);
    if (err.status === 404) showToast(dict.serverNoRoom);
    else if (err.status === 409) showToast(dict.serverFull);
    else showToast(dict.serverErrorMsg);
  } finally {
    netServer.busy = false;
  }
}

async function netServerLeave(silent = false) {
  const code = netServer.code;
  const token = netServer.token;
  netRelayStop();
  netServerStopPoll();
  netServer.code = '';
  netServer.token = '';
  netServer.role = null;
  netServer.since = 0;
  netServer.busy = false;
  netServer.quick = false;
  netServer.bracketSlot = '';
  netServer.bracketRival = '';
  netServer.mode = '1v1'; netServer.capacity = 2;
  netServer.playerIndex = 0; netServer.team = 1;
  quickMatchStatus('');
  if (code && token) {
    try {
      await fetch(netApiUrl(`/api/rooms/${code}/leave`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
        cache: 'no-store',
        keepalive: true
      });
    } catch (e) { /* sala expira sozinha */ }
  }
  if (!net.started) {
    try { if (net.pc) net.pc.close(); } catch (e) {}
    net.pc = null;
    net.dc = null;
    net.connected = false;
    net.role = null;
  }
  netServerUI();
  if (!silent) netSetStatus('netIdle', 'idle');
}

async function netServerCopyLink() {
  if (!netServer.code) return;
  const dict = netServerDict();
  const url = `${location.origin}${location.pathname}?room=${netServer.code}`;
  try {
    await navigator.clipboard.writeText(url);
    showToast(dict.serverCopied);
  } catch (e) {
    const el = document.getElementById('netServerCodeOut');
    if (el) el.textContent = netServer.code;
    showToast(url);
  }
}

function netServerToggleManual() {
  netServer.manualOpen = !netServer.manualOpen;
  netServerUI();
}

/* ---------- Busca rápida 1v1 (fila pública do servidor) ---------- */
const matchmaking = { ticket: '', polling: false, startedAt: 0, tick: null };

function quickMatchUI() {
  const idle = document.querySelector('#btnQuickMatch .qm-idle');
  const busy = document.querySelector('#btnQuickMatch .qm-busy');
  const btn = document.getElementById('btnQuickMatch');
  if (!btn) return;
  // Fila em memória não existe no modo serverless (Vercel).
  btn.classList.toggle('hidden', netServer.serverless);
  const quick = document.querySelector('.net-quick');
  if (quick) quick.dataset.searching = matchmaking.polling ? '1' : '';
  if (idle) idle.classList.toggle('hidden', matchmaking.polling);
  if (busy) busy.classList.toggle('hidden', !matchmaking.polling);
  const el = document.getElementById('quickMatchStatus');
  if (!el) return;
  if (matchmaking.polling) el.classList.remove('hidden');
  else if (!el.dataset.keep) { el.classList.add('hidden'); el.textContent = ''; }
}

function quickMatchStatus(text, keep = false) {
  const el = document.getElementById('quickMatchStatus');
  if (!el) return;
  if (!text) { el.classList.add('hidden'); el.textContent = ''; el.removeAttribute('data-keep'); return; }
  el.classList.remove('hidden');
  el.textContent = text;
  if (keep) el.dataset.keep = '1';
}

function quickMatchStop(statusText) {
  matchmaking.polling = false;
  matchmaking.ticket = '';
  clearInterval(matchmaking.tick); matchmaking.tick = null;
  quickMatchStatus(statusText || '', !!statusText);
  quickMatchUI();
}

async function quickMatchCancel(silent = false) {
  const ticket = matchmaking.ticket;
  const dict = netServerDict();
  if (!ticket && !matchmaking.polling) return;
  quickMatchStop('');
  if (ticket) {
    try {
      await fetch(netApiUrl('/api/matchmaking/leave'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticket }),
        cache: 'no-store',
        keepalive: true
      });
    } catch (e) { /* o servidor descarta o ticket ocioso */ }
  }
  if (!silent) showToast(dict.quickMatchCancelled || 'Busca cancelada.');
}

function quickMatchEnter(room, meta = {}) {
  const dict = netServerDict();
  quickMatchStop(meta.foundText || (dict.quickMatchFound || 'Partida encontrada! Conectando…'));
  netServerStopPoll();
  netServer.code = room.code;
  netServer.token = room.token;
  netServer.role = room.role === 'guest' ? 'guest' : 'host';
  netServer.since = 0;
  netServer.peers = room.peers || { host: true, guest: true };
  netServer.quick = !meta.slot;
  netServer.bracketSlot = meta.slot || '';
  netServer.bracketRival = meta.rival || '';
  net.role = netServer.role;
  netServerUI();
  netServerHint(netServer.role === 'guest' ? 'serverWaitOffer' : 'serverWaitGuest');
  if (netServer.bracketSlot) {
    // Confronto do mata-mata: a partida inteira passa pelo servidor (relay).
    // Assim o servidor vê o estado final e decide o vencedor sozinho — o
    // jogador não declara vitória/derrota.
    netEnterRelay({ quiet: true, deferHostStart: true });
    return;
  }
  if (netServer.role === 'host') {
    // Transporte único: WebSocket em /ws. Host inicia quando o convidado
    // aparece (o ack de join do /ws traz peers com guest presente).
    netEnterRelay({ quiet: true, deferHostStart: true });
  } else {
    netEnterRelay({ quiet: true });
  }
}

async function quickMatchPollLoop() {
  const dict = netServerDict();
  while (matchmaking.polling && matchmaking.ticket) {
    const ticket = matchmaking.ticket;
    let data = null;
    try {
      data = await netApi('/api/matchmaking/poll', { ticket }, 'POST', 14000);
    } catch (err) {
      if (!matchmaking.polling || matchmaking.ticket !== ticket) return;
      if (err.status === 410) {
        quickMatchStop('');
        showToast(dict.quickMatchExpired || 'A busca expirou. Tente de novo.');
        return;
      }
      // Token inválido (sala/busca recriada ou limpa): insistir só martela a API.
      if (err.status === 403 || err.status === 401) {
        quickMatchStop('');
        showToast(dict.serverErrorMsg || 'Sessão expirada. Tente de novo.');
        return;
      }
      await new Promise(r => setTimeout(r, 1500));
      continue;
    }
    if (!matchmaking.polling || matchmaking.ticket !== ticket) return;
    if (data.state === 'matched' && data.room) { quickMatchEnter(data.room); return; }
  }
}

async function quickMatchSearch() {
  const dict = netServerDict();
  if (matchmaking.polling) { quickMatchCancel(); return; }
  if (!hasCompetitiveNick()) { openNickGate(quickMatchSearch); return; }
  if (bracketDuel.polling) { showToast(dict.quickMatchInBracket || 'Você está na busca da chave. Cancele antes de buscar partida.'); return; }
  if (netServer.code) { showToast(dict.quickMatchLeaveRoom || ''); return; }
  if (!(await netServerCheck(!netServer.available))) { showToast(dict.serverErrorMsg || ''); return; }
  if (netServer.serverless) { showToast(dict.quickMatchUnavailable || ''); return; }
  const name = String(GameState.state.profile.nick || '').trim().slice(0, 24);
  if (!name) return;
  matchmaking.polling = true;
  matchmaking.startedAt = Date.now();
  const tickText = () => {
    const secs = Math.round((Date.now() - matchmaking.startedAt) / 1000);
    quickMatchStatus((dict.quickMatchSearching || 'Procurando jogador… {t}s').replace('{t}', secs));
  };
  tickText();
  clearInterval(matchmaking.tick);
  matchmaking.tick = setInterval(tickText, 1000);
  quickMatchUI();
  try {
    const data = await netApi('/api/matchmaking/join', { name });
    if (!matchmaking.polling) return;
    matchmaking.ticket = data.ticket || '';
    if (data.state === 'matched' && data.room) { quickMatchEnter(data.room); return; }
    quickMatchPollLoop();
  } catch (err) {
    quickMatchStop('');
    showToast(dict.serverErrorMsg || '');
  }
}

/* ---------- Mata-mata do mês: PvP online com resultado confirmado ---------- */
/* O pareamento acontece por confronto da chave (qf1..f1) e o servidor só
   junta os dois jogadores se cada um declarar o outro como adversário.
   O confronto só avança quando OS DOIS lados reportam o resultado. */
const bracketDuel = { ticket: '', polling: false, slot: '', rival: '', startedAt: 0, tick: null };

function bracketDuelTick() {
  const el = document.getElementById('bracketDuelStatus');
  if (!el || !bracketDuel.polling) return;
  const dict = netServerDict();
  const secs = Math.round((Date.now() - bracketDuel.startedAt) / 1000);
  el.textContent = (dict.bracketSearching || '🔎 Procurando {rival}… {t}s')
    .replace('{rival}', bracketDuel.rival || '?').replace('{t}', secs);
}

function bracketDuelStop() {
  bracketDuel.polling = false;
  bracketDuel.ticket = '';
  bracketDuel.slot = '';
  bracketDuel.rival = '';
  clearInterval(bracketDuel.tick);
  bracketDuel.tick = null;
}

async function bracketDuelCancel(silent = false) {
  const ticket = bracketDuel.ticket;
  const dict = netServerDict();
  if (!ticket && !bracketDuel.polling) return;
  bracketDuelStop();
  renderBracket();
  if (ticket) {
    try {
      await fetch(netApiUrl('/api/bracket/leave'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticket }),
        cache: 'no-store',
        keepalive: true
      });
    } catch (e) { /* o servidor descarta o ticket ocioso */ }
  }
  if (!silent) showToast(dict.bracketCancelled || 'Busca da chave cancelada.');
}

function bracketDuelEnter(room) {
  const dict = netServerDict();
  const slot = bracketDuel.slot;
  const rival = bracketDuel.rival;
  bracketDuelStop();
  renderBracket();
  quickMatchEnter(room, { slot, rival, foundText: dict.bracketFound || '⚔️ Adversário da chave encontrado! Conectando…' });
}

async function bracketDuelPollLoop() {
  const dict = netServerDict();
  while (bracketDuel.polling && bracketDuel.ticket) {
    const ticket = bracketDuel.ticket;
    let data = null;
    try {
      data = await netApi('/api/bracket/poll', { ticket }, 'POST', 14000);
    } catch (err) {
      if (!bracketDuel.polling || bracketDuel.ticket !== ticket) return;
      if (err.status === 410) {
        bracketDuelStop();
        renderBracket();
        showToast(dict.bracketExpired || 'A busca da chave expirou. Tente de novo.');
        return;
      }
      // Ticket inválido: encerra o laço em vez de repetir a cada 1,5s.
      if (err.status === 403 || err.status === 401) {
        bracketDuelStop();
        renderBracket();
        showToast(dict.serverErrorMsg || 'Sessão expirada. Tente de novo.');
        return;
      }
      await new Promise(r => setTimeout(r, 1500));
      continue;
    }
    if (!bracketDuel.polling || bracketDuel.ticket !== ticket) return;
    if (data.state === 'matched' && data.room) { bracketDuelEnter(data.room); return; }
  }
}

async function bracketDuelSearch(slot, rival) {
  const dict = netServerDict();
  const name = String(GameState.state.profile.nick || '').trim().slice(0, 24);
  bracketDuel.polling = true;
  bracketDuel.slot = slot;
  bracketDuel.rival = rival;
  bracketDuel.startedAt = Date.now();
  clearInterval(bracketDuel.tick);
  bracketDuel.tick = setInterval(bracketDuelTick, 1000);
  renderBracket();
  bracketDuelTick();
  showToast((dict.bracketWaitRival || '⏳ {rival} também precisa tocar em Jogar a Chave.').replace('{rival}', rival));
  try {
    const join = () => netApi('/api/bracket/join', { slot, name, opponent: rival });
    let data;
    try {
      data = await join();
    } catch (err) {
      // Top 8 ainda não chegou ao servidor (ex.: primeiro boot do mês):
      // publica a lista congelada deste aparelho e tenta mais uma vez.
      if (err.status !== 409) throw err;
      showToast(dict.bracketSeedsPending || '⏳ A chave está fechando o Top 8. Tente de novo em instantes.');
      bracketLockSeeds();
      await new Promise(r => setTimeout(r, 1200));
      data = await join();
    }
    if (!bracketDuel.polling || bracketDuel.slot !== slot) return;
    bracketDuel.ticket = data.ticket || '';
    if (data.state === 'matched' && data.room) { bracketDuelEnter(data.room); return; }
    bracketDuelPollLoop();
  } catch (err) {
    bracketDuelStop();
    renderBracket();
    if (err.status === 403) showToast(dict.bracketNotQualified || '🔒 Só o Top 8 congelado do mês pode jogar o mata-mata.');
    else if (err.status === 409) showToast(dict.bracketNeedEight || '🔒 O mata-mata fecha quando a Liga tiver 8 jogadores ranqueados no mês.');
    else showToast(dict.serverErrorMsg || 'Falha no servidor. Tente novamente.');
  }
}

/* Publica o resultado da partida e espera a confirmação do adversário.
   Só grava a vitória/derrota da chave quando o servidor confirma. */
async function bracketReportResult(slot) {
  const dict = netServerDict();
  const note = document.getElementById('endBracketLine');
  const mark = (text, tone) => {
    if (!note) return;
    note.textContent = text;
    note.className = `end-bracket ${tone || ''}`.trim();
    note.classList.remove('hidden');
  };
  const code = netServer.code;
  const token = netServer.token;
  const role = netServer.role || net.role;
  if (!code || !token || !role) {
    mark(dict.bracketNoConfirm || '⚠️ Resultado não registrado pelo servidor.', 'warn');
    return;
  }
  // O jogador não declara nada: a chave inteira passa pelo servidor, que lê
  // o estado final transmitido pela partida e decide o vencedor sozinho.
  // Aqui só esperamos essa decisão aparecer.
  mark(dict.bracketWaitConfirm || '⏳ Registrando o resultado no servidor…', 'wait');
  for (let i = 0; i < 12; i++) {
    let data = null;
    try { data = await netApi('/api/bracket/result', { code, token }, 'POST', 8000); } catch (err) { data = null; }
    if (data && data.confirmed) {
      if (!data.winner) { mark(dict.bracketVoid || '⚠️ Resultado inconclusivo. O confronto não avançou.', 'warn'); return; }
      const advanced = data.winner === role;
      GameState.setBracketResult(slot, advanced ? 'won' : 'lost');
      mark(advanced
        ? (dict.bracketConfirmedWin || '✅ Resultado oficial: você avançou na chave!')
        : (dict.bracketConfirmedLoss || '❌ Resultado oficial: você foi eliminado.'),
        advanced ? 'win' : 'loss');
      renderBracket();
      refreshBracketServerState(true);
      return;
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  mark(dict.bracketNoConfirm || '⚠️ Resultado não registrado pelo servidor.', 'warn');
  refreshBracketServerState(true);
}

// Fecha a sala no servidor se o jogador fechar/recarregar a aba antes da partida.
window.addEventListener('pagehide', (event) => {
  // bfcache: o navegador guarda a página e pode voltar pelo botão "voltar".
  // Nesse caso a sala NÃO deve ser encerrada.
  if (event && event.persisted) return;
  if (matchmaking.ticket) {
    try {
      const body = new Blob([JSON.stringify({ ticket: matchmaking.ticket })], { type: 'application/json' });
      navigator.sendBeacon(netApiUrl('/api/matchmaking/leave'), body);
    } catch (e) { /* o TTL do servidor limpa depois */ }
  }
  if (bracketDuel.ticket) {
    try {
      const body = new Blob([JSON.stringify({ ticket: bracketDuel.ticket })], { type: 'application/json' });
      navigator.sendBeacon(netApiUrl('/api/bracket/leave'), body);
    } catch (e) { /* o TTL do servidor limpa depois */ }
  }
  if (!netServer.code || !netServer.token) return;
  try {
    const body = new Blob([JSON.stringify({ token: netServer.token })], { type: 'application/json' });
    navigator.sendBeacon(netApiUrl(`/api/rooms/${netServer.code}/leave`), body);
  } catch (e) { /* o TTL do servidor limpa depois */ }
});


/* ========================================================================
   13.5 CHAT DE VOZ OPCIONAL (WebRTC — sempre desligado ao entrar)
   ======================================================================== */
const VOICE_ICE = {
  iceServers: NET_ICE.iceServers
};
const VOICE_REPORT_KEY = 'blastVoiceReports';

const VoiceChat = (() => {
  const state = {
    micOn: false, oppMuted: false, visible: false,
    stream: null, pc: null, remoteAudio: null,
    makingOffer: false, ignoreOffer: false, polite: false,
    pendingSignals: [],
    // O transporte dos sinais SDP/ICE é o datachannel do jogo até o Firebase
    // entrar. Para migrar: VoiceChat.transport = (kind, data) => db.ref(...).
    transport: null
  };

  function dict() { return I18N[currentLang] || {}; }

  function remoteAudioEl() {
    if (!state.remoteAudio) state.remoteAudio = document.getElementById('voiceRemoteAudio');
    return state.remoteAudio;
  }

  function opponentName() {
    if (net.role) {
      const other = fighters.find(f => f.device === (net.role === 'host' ? 'p2' : 'p1'));
      if (other && other.name) return other.name;
      return net.role === 'host' ? 'Jogador 2' : 'Host';
    }
    if (match.mode === 'DUEL' && duel.botFighter) return duel.botFighter.name;
    return duel.opponent || 'Rival';
  }

  function sendSignal(kind, payload) {
    const msg = { t: 'vs', k: kind, d: payload };
    // Nunca envia sinal do jogo sozinho fora do canal aberto: fica na fila.
    if (typeof VoiceChat.transport === 'function') {
      try { VoiceChat.transport(kind, payload); return; } catch (e) {}
    }
    // No relay a mídia P2P da voz também não abriria: o chat fica oculto.
    if (net.relay) return;
    if (netSend(msg)) { flushSignals(); return; }
    if (state.pendingSignals.length < 40) state.pendingSignals.push(msg);
  }

  function flushSignals() {
    if (!netCanSend() || !state.pendingSignals.length) return;
    const queue = state.pendingSignals.splice(0);
    queue.forEach(msg => { if (!netSend(msg)) state.pendingSignals.push(msg); });
  }

  function ensurePeer() {
    if (state.pc) return state.pc;
    const pc = new RTCPeerConnection(VOICE_ICE);
    state.polite = net.role === 'guest';
    pc.addEventListener('track', ev => {
      const audio = remoteAudioEl();
      if (!audio) return;
      audio.srcObject = ev.streams[0] || new MediaStream([ev.track]);
      audio.muted = state.oppMuted;
      const p = audio.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    });
    pc.addEventListener('icecandidate', ev => {
      if (ev.candidate) sendSignal('ice', ev.candidate.toJSON());
    });
    // Negociação perfeita (padrão W3C): se os dois ligarem o mic quase juntos,
    // o host (impolite) ignora a oferta concorrente e o convidado dá rollback.
    pc.addEventListener('negotiationneeded', async () => {
      try {
        state.makingOffer = true;
        await pc.setLocalDescription(await pc.createOffer());
        sendSignal('description', pc.localDescription.toJSON());
      } catch (err) {
      } finally {
        state.makingOffer = false;
      }
    });
    state.pc = pc;
    return pc;
  }

  async function onSignalReceived(kind, payload) {
    if (!payload || (kind !== 'description' && kind !== 'ice')) return;
    const pc = ensurePeer();
    try {
      if (kind === 'description') {
        const desc = payload;
        const collision = desc.type === 'offer' && (state.makingOffer || pc.signalingState !== 'stable');
        state.ignoreOffer = !state.polite && collision;
        if (state.ignoreOffer) return;
        if (collision && state.polite) {
          await Promise.all([
            pc.setLocalDescription({ type: 'rollback' }).catch(() => {}),
            pc.setRemoteDescription(desc)
          ]);
        } else {
          await pc.setRemoteDescription(desc);
        }
        if (desc.type === 'offer') {
          await pc.setLocalDescription(await pc.createAnswer());
          sendSignal('description', pc.localDescription.toJSON());
        }
      } else {
        try { await pc.addIceCandidate(payload); } catch (err) { if (!state.ignoreOffer) throw err; }
      }
    } catch (err) {}
  }

  async function toggleMic() {
    const d = dict();
    if (state.micOn) {
      state.micOn = false;
      if (state.stream) state.stream.getAudioTracks().forEach(t => { t.enabled = false; });
      updateUI();
      return;
    }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      showToast(d.voiceMicUnavailable || 'Microfone indisponível neste dispositivo.');
      updateUI();
      return;
    }
    try {
      // Permissão só é pedida aqui, no toque do jogador — nunca ao abrir o jogo.
      if (!state.stream) {
        state.stream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
        });
      }
      const pc = ensurePeer();
      const track = state.stream.getAudioTracks()[0];
      if (track) {
        track.enabled = true;
        if (!pc.getSenders().some(s => s.track === track)) pc.addTrack(track, state.stream);
      }
      state.micOn = true;
    } catch (err) {
      state.micOn = false;
      showToast(d.voiceMicDenied || 'Permissão de microfone negada. Voz desligada.');
    }
    updateUI();
  }

  function toggleMuteOpponent() {
    state.oppMuted = !state.oppMuted;
    const audio = remoteAudioEl();
    if (audio) audio.muted = state.oppMuted;
    updateUI();
  }

  function updateUI() {
    const d = dict();
    const mic = document.getElementById('btnVoiceMic');
    const opp = document.getElementById('btnVoiceMuteOpp');
    const rep = document.getElementById('btnVoiceReport');
    const panel = document.getElementById('voicePanel');
    if (panel) panel.title = d.voicePanel || 'Chat de voz';
    if (mic) {
      mic.textContent = state.micOn ? '🎙️' : '🎤';
      mic.classList.toggle('on', state.micOn);
      mic.setAttribute('aria-pressed', state.micOn ? 'true' : 'false');
      mic.title = state.micOn ? (d.voiceMicOff || 'Desligar microfone') : (d.voiceMicOn || 'Ativar microfone');
    }
    if (opp) {
      opp.textContent = state.oppMuted ? '🔇' : '🔊';
      opp.classList.toggle('muted', state.oppMuted);
      opp.setAttribute('aria-pressed', state.oppMuted ? 'true' : 'false');
      opp.title = state.oppMuted ? (d.voiceUnmuteOpp || 'Ouvir adversário') : (d.voiceMuteOpp || 'Mutar adversário');
    }
    if (rep) rep.title = d.voiceReport || 'Denunciar adversário';
  }

  function openReport() {
    const modal = document.getElementById('voiceReportModal');
    const sub = document.getElementById('voiceReportSub');
    if (sub) {
      const tpl = dict().voiceReportSub || 'Denunciar {name} por voz imprópria ou comportamento abusivo?';
      sub.textContent = tpl.replace('{name}', opponentName());
    }
    if (modal) modal.classList.remove('hidden');
  }

  function closeReport() {
    const modal = document.getElementById('voiceReportModal');
    if (modal) modal.classList.add('hidden');
  }

  function confirmReport() {
    // Registro local + fila da nuvem (Realtime Database) quando conectada.
    const entry = { ts: Date.now(), opponent: opponentName(), mode: match.mode, role: net.role || 'local' };
    try {
      const raw = JSON.parse(localStorage.getItem(VOICE_REPORT_KEY) || '[]');
      raw.push(entry);
      localStorage.setItem(VOICE_REPORT_KEY, JSON.stringify(raw.slice(-50)));
    } catch (e) {}
    if (window.FirebaseSync && window.FirebaseSync.reportPlayer) {
      try { window.FirebaseSync.reportPlayer(entry); } catch (e) {}
    }
    closeReport();
    showToast(dict().voiceReportSent || 'Denúncia enviada para análise.');
  }

  function destroy() {
    state.micOn = false;
    state.oppMuted = false;
    state.makingOffer = false;
    state.ignoreOffer = false;
    state.pendingSignals = [];
    if (state.stream) {
      state.stream.getTracks().forEach(t => { try { t.stop(); } catch (e) {} });
      state.stream = null;
    }
    if (state.pc) {
      try { state.pc.close(); } catch (e) {}
      state.pc = null;
    }
    const audio = remoteAudioEl();
    if (audio) {
      try { audio.pause(); } catch (e) {}
      audio.srcObject = null;
      audio.muted = false;
    }
    updateUI();
  }

  function setVisible(show) {
    state.visible = !!show;
    const panel = document.getElementById('voicePanel');
    if (panel) panel.classList.toggle('hidden', !state.visible);
    if (!state.visible) destroy();
    else updateUI();
  }

  return {
    toggleMic, toggleMuteOpponent, sendSignal, onSignalReceived, destroy,
    flushSignals, setVisible, openReport, closeReport, confirmReport, updateUI,
    get micOn() { return state.micOn; },
    get oppMuted() { return state.oppMuted; },
    get visible() { return state.visible; },
    get signalQueue() { return state.pendingSignals.length; },
    get transport() { return state.transport; },
    set transport(fn) { state.transport = typeof fn === 'function' ? fn : null; }
  };
})();
window.VoiceChat = VoiceChat;

async function pasteInto(id, after) {
  try {
    const text = await navigator.clipboard.readText();
    const el = document.getElementById(id);
    if (el && text) el.value = text.trim();
  } catch (e) {
    const el = document.getElementById(id);
    if (el) el.focus();
  }
  if (after) after();
}

async function shareSignal(id) {
  const el = document.getElementById(id);
  if (!el || !el.value) return;
  const text = `Blast Royale\n${el.value}`;
  if (navigator.share) {
    try { await navigator.share({ title: 'Blast Royale', text }); return; }
    catch (e) { if (e && e.name === 'AbortError') return; }
  }
  copyFrom(id);
}

function netStartHostMatch() {
  if (net.started) return;
  hideCountdownOverlay();
  net.started = true; net.role = 'host'; match.netRole = 'host';
  match.myControl = 'p1'; match.localControls = ['p1'];
  UI.startScreen.classList.add('hidden'); UI.hud.classList.remove('hidden');
  netResetRoundState();
  net.lastReceive = performance.now();
  initArena(false, onlineModeId(netServer.capacity), selectedMap);
  match.netRole = 'host'; match.myControl = 'p1'; match.localControls = ['p1'];
  match.bracketSlot = netServer.bracketSlot || '';
  match.bracketRival = netServer.bracketRival || '';
  netUpdateBadge();
}

function netStartGuestMatch() {
  if (net.started) return;
  hideCountdownOverlay();
  net.started = true; net.role = 'guest'; match.netRole = 'guest';
  match.myControl = 'p1'; match.localControls = ['p1'];
  UI.startScreen.classList.add('hidden'); UI.hud.classList.remove('hidden');
  netResetRoundState();
  net.lastReceive = performance.now();
  initArena(false, onlineModeId(netServer.capacity), selectedMap);
  match.netRole = 'guest'; match.myControl = 'p1'; match.localControls = ['p1'];
  match.bracketSlot = netServer.bracketSlot || '';
  match.bracketRival = netServer.bracketRival || '';
  netUpdateBadge();
}

// Zera tudo que é específico de uma partida (menos a conexão em si),
// para a revanche começar limpa dos dois lados.
function netResetRoundState() {
  net.sendAccum = 0; net.inputAccum = 0; net.pingAccum = 0; net.ping = 0;
  net.seenExplosions.clear();
  net.gridSentRev = -1; net.lastGridRev = -1;
  net.feed = []; net.feedSeq = 0; net.feedSentSeq = 0;
  net.pickupSeq = 0; net.pickupQueue = []; net.pickupSentSeq = 0; net.lastPickupSeq = 0;
  net.pending = {};
  net.rematchPending = false;
  net.hold = false;
  net.dropped = false;
  clearTimeout(net.rematchTimer); net.rematchTimer = null;
  clearInterval(netGraceInterval); netGraceInterval = null;
  net.graceDeadline = 0;
  netShowReconnect(false);
  const label = UI.btnPlayAgain && UI.btnPlayAgain.querySelector('span');
  if (label) label.textContent = I18N[currentLang].rematchBtn;
}

function netUpdateBadge() {
  const el = document.getElementById('netBadge');
  if (el) {
    const online = !!match.netRole && !match.demoMode;
    const sig = online ? (net.hold ? 'hold' : (!net.connected ? 'offline' : (net.relay ? 'relay' : (match.netRole || 'host')))) : 'lobby';
    if (net.badgeSig !== sig) {
      net.badgeSig = sig;
      el.style.display = online ? 'block' : 'none';
      if (online) {
        if (net.hold) {
          el.textContent = '🌐 ⏳';
          el.className = 'text-[9px] font-display font-bold text-amber-300 bg-slate-950/85 border border-amber-500/50 px-2 py-0.5 rounded-lg text-center';
        } else if (!net.connected) {
          el.textContent = '🌐 OFFLINE';
          el.className = 'text-[9px] font-display font-bold bg-slate-950/85 border px-2 py-0.5 rounded-lg text-center text-rose-300 border-rose-500/50';
        } else if (net.relay) {
          el.textContent = `📡 ${match.netRole === 'host' ? 'HOST' : 'GUEST'}`;
          el.title = (I18N[currentLang] || {}).netRelay || 'relay';
          el.className = 'text-[9px] font-display font-bold bg-slate-950/85 border px-2 py-0.5 rounded-lg text-center text-amber-300 border-amber-500/50';
        } else {
          el.textContent = `🌐 ${match.netRole === 'host' ? 'HOST' : 'GUEST'}`;
          el.className = 'text-[9px] font-display font-bold bg-slate-950/85 border px-2 py-0.5 rounded-lg text-center text-cyan-300 border-cyan-500/40';
        }
      }
    }
  }
  netUpdatePing();
}

function netUpdatePing() {
  const el = document.getElementById('netPing');
  if (!el) return;
  const show = !!match.netRole && !match.demoMode && net.started && net.connected;
  const ms = net.ping ? Math.min(999, Math.round(net.ping)) : 0;
  // netUpdateBadge roda a 30 Hz: só toca no DOM quando o valor muda.
  const sig = `${show ? 1 : 0}:${ms}`;
  if (net.pingSig === sig) return;
  net.pingSig = sig;
  el.classList.toggle('hidden', !show);
  if (!show) return;
  const base = 'text-[9px] font-display font-bold bg-slate-950/85 border px-2 py-0.5 rounded-lg text-center ';
  if (!ms) {
    el.textContent = '📶 -- ms';
    el.className = base + 'text-slate-400 border-slate-700/60';
    return;
  }
  const tone = ms < 70 ? 'text-emerald-300 border-emerald-500/40' : ms < 150 ? 'text-cyan-300 border-cyan-500/40' : 'text-amber-300 border-amber-500/40';
  el.textContent = `📶 ${ms} ms`;
  el.className = base + tone;
}

function netStartRematch() {
  if (net.role !== 'host') return;
  // Sem conexão não há revanche possível: volta ao lobby em vez de
  // deixar o botão "morto" sem feedback.
  if (!net.connected) { netLeaveRoom(); return; }
  netResetRoundState();
  UI.endModal.classList.add('hidden');
  match.ended = false; match.paused = false;
  initArena(false, onlineModeId(netServer.capacity), match.mapId);
  netUpdateBadge();
}

function netGuestRematch() {
  netResetRoundState();
  UI.endModal.classList.add('hidden');
  netShowReconnect(false);
  net.hold = false; net.connected = true;
  match.ended = false; match.paused = false; match.running = true;
  match.humanRank = 12; match.lastDeath = null; match.hitFlash = 0;
  match.humanSurvived = null; match.elapsedTime = 0;
  bombs = []; explosions = []; powerups = []; particles = []; floatingLabels = [];
  cryoTiles = new Map(); activeAirdrop = null;
  if (UI.killFeed) UI.killFeed.innerHTML = '';
  if (UI.stormBanner) UI.stormBanner.classList.add('hidden');
  if (UI.airdropBanner) UI.airdropBanner.classList.add('hidden');
  netUpdateBadge();
}

function netOnRematchRequest() {
  if (net.role !== 'host' || !net.started) return;
  if (!net.connected || net.hold) return;
  if (match.ended) netStartRematch();
}

function netQueuePickup(fighter, type) {
  if (net.role !== 'host' || !fighter || !POWERUP_TYPES[type]) return;
  net.pickupSeq++;
  net.pickupQueue.push({
    sq: net.pickupSeq, ty: type,
    x: Math.round(fighter.x * 10) / 10,
    y: Math.round(fighter.y * 10) / 10,
    d: fighter.device
  });
  if (net.pickupQueue.length > 60) net.pickupQueue.shift();
}

function netQueueAction(action) { net.pending[action] = true; }

function netOnRemoteInput(msg) {
  if (match.netRole !== 'host' || match.demoMode) return;
  // Cada convidado envia o próprio slot (si); aplica no dispositivo correspondente.
  const si = (msg.si != null) ? msg.si : 1;
  const f = fighters.find(x => x.device === deviceOfIndex(si));
  if (!f) return;
  f.netInX = clamp(Number(msg.x) || 0, -1, 1);
  f.netInY = clamp(Number(msg.y) || 0, -1, 1);
  f.netInTime = nowT;
  if (msg.b) performAction(f, 'bomb');
  if (msg.d) performAction(f, 'dash');
  if (msg.q) performAction(f, 'tactical');
  if (msg.c) performAction(f, 'cycle');
}

function netOnHello(msg) {
  if (match.netRole !== 'host' || !msg.n) return;
  const si = (msg.si != null) ? msg.si : 1;
  const f = fighters.find(x => x.device === deviceOfIndex(si));
  if (!f) return;
  f.name = String(msg.n).slice(0, 14);
  // Cosméticos do convidado: a aura/rastro dele é desenhada no host e
  // chega de volta pelo snapshot para os dois lados verem igual.
  if (msg.cs && cosmeticCatalog('skins').some(s => s.id === msg.cs)) f.cosmeticSkin = msg.cs;
  if (msg.tr && cosmeticCatalog('trails').some(t => t.id === msg.tr)) f.trailId = msg.tr;
  if (msg.xs && cosmeticCatalog('explosions').some(x => x.id === msg.xs)) f.explosionSkin = msg.xs;
  if (msg.av) f.avatar = String(msg.av).slice(0, 8);
}

function netFeedEvent(killer, victim, mode) {
  if (net.role !== 'host') return;
  net.feedSeq++;
  net.feed = net.feed || [];
  net.feed.push({ sq: net.feedSeq, k: killer ? killer.name : '', kc: killer ? killer.color : '', v: victim ? victim.name : '', vc: victim ? victim.color : '', m: mode });
  if (net.feed.length > 40) net.feed.shift();
}

function netBuildSnapshot() {
  const alive = fighters.filter(f => f.alive);
  const winner = alive.length === 1 ? alive[0] : null;
  const snap = {
    t: 's', tm: Math.round(match.elapsedTime * 100) / 100,
    run: match.running ? 1 : 0, e: match.ended ? 1 : 0, mp: match.mapId, mm: match.mode,
    w: winner ? (winner.team || 1) : 0,
    sr: match.safeRing, st: Math.round(match.stormTimer * 10) / 10,
    sw: match.stormWarning ? 1 : 0,
    ad: activeAirdrop ? { c: activeAirdrop.c, r: activeAirdrop.r, timer: Math.round(activeAirdrop.timer * 10) / 10, landed: !!activeAirdrop.landed } : null,
    f: fighters.map(f => ({ i: f.id, d: f.device, n: f.name, c: f.color, v: f.visor, tm: f.team, x: Math.round(f.x * 10) / 10, y: Math.round(f.y * 10) / 10, a: Math.round(f.facingAngle * 100) / 100, hp: f.hp, mhp: f.maxHp, sh: f.shield ? 1 : 0, ck: f.canKick ? 1 : 0, ib: f.inBush ? 1 : 0, al: f.alive ? 1 : 0, k: f.kills, tt: f.tacticalType, ta: [f.tacticalAmmo.SHOCK, f.tacticalAmmo.CRYO, f.tacticalAmmo.C4], mb: f.maxBombs, br: f.bombRange, sl: f.speedLevel, dc: Math.round(f.dashCooldown * 100) / 100, it: Math.round(f.invulnTimer * 100) / 100, cs: f.cosmeticSkin || '', tr: f.trailId || 'none', xs: f.explosionSkin || 'classic', av: f.avatar || '', rk: f.cosmeticSkin ? rarityTier(cosmeticRarity('skins', f.cosmeticSkin)) : 0 })),
    b: bombs.filter(b => !b.exploded).map(b => ({ i: b.id, t: b.type, x: Math.round(b.x * 10) / 10, y: Math.round(b.y * 10) / 10, c: b.c, r: b.r, s: Math.round(b.seed * 100) / 100, f: Math.round(b.fuse * 100) / 100, sk: b.skinId || 'classic' })),
    x: explosions.map(ex => ({ i: ex.id, t: ex.type, x: Math.round(ex.x * 10) / 10, y: Math.round(ex.y * 10) / 10, cells: ex.cells, rad: ex.radius || 0, col: ex.color, ct: ex.center, rt: ex.tier || 0, tm: Math.round(ex.timer * 100) / 100, mt: ex.maxTimer })),
    p: powerups.map(pu => ({ t: pu.type, x: Math.round(pu.x * 10) / 10, y: Math.round(pu.y * 10) / 10, b: Math.round(pu.bobPhase * 100) / 100 })),
    // Efeito visual do gelo também precisa chegar ao convidado.
    cy: Array.from(cryoTiles.entries()).map(([k, v]) => [k, Math.round(v * 10) / 10])
  };
  if (gridRev !== net.gridSentRev) { snap.g = grid; snap.gv = gridRev; net.gridSentRev = gridRev; }
  if (net.feed && net.feed.length) {
    const fresh = net.feed.filter(ev => ev.sq > net.feedSentSeq);
    if (fresh.length) { snap.kf = fresh; net.feedSentSeq = fresh[fresh.length - 1].sq; }
  }
  if (net.pickupQueue.length) {
    const fresh = net.pickupQueue.filter(ev => ev.sq > net.pickupSentSeq);
    if (fresh.length) { snap.pk = fresh; net.pickupSentSeq = fresh[fresh.length - 1].sq; }
  }
  return snap;
}

function netHostSend(dt) {
  if (net.role !== 'host' || !net.started || !netCanSend()) return;
  if (net.hold || net.dropped) return;
  // O host também mede o ping (antes só o convidado tinha essa leitura).
  net.pingAccum += dt;
  if (net.pingAccum > 2) {
    net.pingAccum = 0;
    netSend({ t: 'p', ts: performance.now() });
  }
  net.sendAccum += dt;
  // Depois do fim da partida o placar não muda: 1 snapshot por segundo
  // mantém a revanche/estado vivo sem continuar transmitindo 30 Hz à toa.
  if (net.sendAccum < (match.ended ? 1 : 0.033)) return;
  net.sendAccum = 0;
  // Evita acumular snapshots na fila quando a conexão está lenta.
  if (!net.relay && net.dc && net.dc.bufferedAmount > 96 * 1024) return;
  netSend(netBuildSnapshot());
}

function netApplySnapshot(s) {
  if (net.role !== 'guest') return;
  if (net.dropped) return;
  if (!net.started) netStartGuestMatch();
  // Adota o modo de time online (1v1/2v2/3v3) que o host está simulando.
  if (s.mm && MODE_CONFIG[s.mm]) match.mode = s.mm;
  if (s.e && !match.ended) { endMatch(netServer.team === s.w, isOnlineMode(match.mode)); return; }
  if (!s.e && match.ended) netGuestRematch();
  if (s.mp && s.mp !== match.mapId && MAPS.some(m => m.id === s.mp)) {
    // O convidado precisa usar o mesmo mapa/tema escolhido pelo host.
    match.mapId = s.mp;
    match.theme = getMap(s.mp);
    markGridDirty();
  }
  match.elapsedTime = s.tm || 0;
  match.safeRing = typeof s.sr === 'number' ? s.sr : match.safeRing;
  match.stormTimer = typeof s.st === 'number' ? s.st : match.stormTimer;
  match.stormWarning = !!s.sw;
  activeAirdrop = s.ad || null;
  if (match.stormWarning) UI.stormBanner.classList.remove('hidden'); else UI.stormBanner.classList.add('hidden');
  if (activeAirdrop && !activeAirdrop.landed) UI.airdropBanner.classList.remove('hidden'); else UI.airdropBanner.classList.add('hidden');
  if (s.g && s.gv !== net.lastGridRev) { grid = s.g; net.lastGridRev = s.gv; }
  if (Array.isArray(s.cy)) cryoTiles = new Map(s.cy.map(([k, v]) => [k, v]));
  const humanRef = getHuman();
  const prevHp = humanRef ? humanRef.hp : null;
  const prev = new Map(fighters.map(f => [f.id, f]));
  fighters = (s.f || []).map(d => {
    let f = prev.get(d.i);
    if (!f) { f = makeFighter(0, { c: 1, r: 1 }, d.n, d.c, d.v, d.d, d.tm); f.id = d.i; f.x = d.x; f.y = d.y; }
    f.device = d.d; f.isHuman = isHumanDevice(d.d);
    f.name = d.n; f.color = d.c; f.visor = d.v; f.team = d.tm || 0;
    f.netX = d.x; f.netY = d.y; f.facingAngle = d.a;
    f.hp = d.hp; f.maxHp = d.mhp; f.shield = !!d.sh; f.inBush = !!d.ib; f.alive = !!d.al;
    f.kills = d.k; f.tacticalType = d.tt;
    f.tacticalAmmo = { SHOCK: d.ta[0], CRYO: d.ta[1], C4: d.ta[2] };
    f.maxBombs = d.mb; f.bombRange = d.br; f.speedLevel = d.sl;
    f.dashCooldown = d.dc; f.invulnTimer = d.it;
    f.canKick = !!d.ck;
    f.cosmeticSkin = d.cs || null;
    f.trailId = d.tr || 'none';
    f.explosionSkin = d.xs || 'classic';
    if (d.av) f.avatar = String(d.av).slice(0, 8);
    f.cosmeticRank = d.rk || 0;
    return f;
  });
  if (humanRef && prevHp != null && humanRef.alive && humanRef.hp < prevHp) match.hitFlash = 0.45;
  bombs = (s.b || []).map(d => ({ id: d.i, type: d.t, x: d.x, y: d.y, c: d.c, r: d.r, ownerId: '', range: 1, fuse: d.f, vx: 0, vy: 0, passThroughPlayers: new Set(), exploded: false, seed: d.s, skinId: d.sk || 'classic' }));
  explosions = (s.x || []).map(d => {
    if (!net.seenExplosions.has(d.i)) {
      net.seenExplosions.add(d.i);
      if (d.t === 'cross') SFX.playExplosion(audibilityAt(d.x, d.y));
      else if (d.t === 'shock') SFX.playShockwave();
      else if (d.t === 'cryo') SFX.playCryo();
      if (d.t === 'cross') triggerShake(5, d.x, d.y);
    }
    return { id: d.i, type: d.t, x: d.x, y: d.y, cells: d.cells || [], radius: d.rad, color: d.col, center: d.ct, tier: d.rt || 0, timer: d.tm, maxTimer: d.mt };
  });
  if (net.seenExplosions.size > 300) net.seenExplosions.clear();
  powerups = (s.p || []).map(d => ({ type: d.t, x: d.x, y: d.y, bobPhase: d.b }));
  if (s.kf && s.kf.length) s.kf.forEach(ev => renderKillFeedRow(ev.k, ev.kc, ev.v, ev.vc, ev.m));
  // Feedback de coleta de power-up vindo do host: som, partículas e
  // etiqueta flutuante para o convidado ver o que acabou de pegar.
  if (Array.isArray(s.pk)) {
    s.pk.forEach(ev => {
      if (!ev || !(ev.sq > net.lastPickupSeq)) return;
      net.lastPickupSeq = ev.sq;
      const meta = POWERUP_TYPES[ev.ty];
      if (!meta) return;
      spawnParticles(ev.x, ev.y, meta.color, 10, 120, 0.35);
      if (ev.d === (match.netRole === 'guest' ? myOnlineDevice() : 'p1')) {
        SFX.playPickup();
        addFloatingLabel(meta.label, ev.x, ev.y - 26, meta.color);
        haptic(18);
        padRumble(90, 0.3, 0.45, 'p1');
      }
    });
  }
  // HUD de times no convidado: o checkMatchEnd retorna cedo para guest, então
  // os contadores vêm do snapshot (cada lutador tem time e vivo/morto).
  const cfgT = MODE_CONFIG[match.mode];
  if (cfgT && cfgT.teamMode) {
    updateTeamsHUD(
      fighters.filter(x => x.team === 1 && x.alive).length,
      fighters.filter(x => x.team === 2 && x.alive).length
    );
  }
  netUpdateBadge();
}

function updateNetGuest(dt) {
  // Se o host parar de enviar snapshots (rede caiu ou aba em segundo
  // plano), pausa a partida e mostra a tela de reconexão com contagem.
  if (net.started && !match.ended && net.connected && net.lastReceive &&
      performance.now() - net.lastReceive > 3000) {
    netEnterReconnectGrace();
  }
  const k = 1 - Math.exp(-16 * dt);
  for (const f of fighters) { if (!f.alive) continue; f.x += (f.netX - f.x) * k; f.y += (f.netY - f.y) * k; }
  for (let i = explosions.length - 1; i >= 0; i--) { explosions[i].timer -= dt; if (explosions[i].timer <= 0) explosions.splice(i, 1); }
  netSendInput(dt);
  hudAccum += dt;
  if (hudAccum >= 0.1) { hudAccum = 0; updateHUD(); }
  updateCamera(dt);
  updateTrails(dt);
}

function netSendInput(dt) {
  if (net.role !== 'guest' || !netCanSend()) return;
  if (net.hold || net.dropped) return;
  if (!net.relay && net.dc && net.dc.bufferedAmount > 48 * 1024) return;
  net.inputAccum += dt; net.pingAccum += dt;
  if (net.pingAccum > 2) { net.pingAccum = 0; netSend({ t: 'p', ts: performance.now() }); }
  if (net.inputAccum < 1 / 60) return;
  net.inputAccum = 0;
  const f = getHuman();
  let x = 0, y = 0;
  if (f && f.alive) { const mv = readMoveVector('p1'); x = mv.x; y = mv.y; }
  const pending = net.pending; net.pending = {};
  const pkt = { t: 'i', si: netServer.playerIndex || 1, x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 };
  if (pending.bomb) pkt.b = 1;
  if (pending.dash) pkt.d = 1;
  if (pending.tactical) pkt.q = 1;
  if (pending.cycle) pkt.c = 1;
  netSend(pkt);
}

function netTick(dt) { if (net.role === 'host') netHostSend(dt); }

function netLeaveRoom() {
  netRelayStop();
  if (netServer.code) netServerLeave(true);
  net.closing = true;
  if (window.VoiceChat) window.VoiceChat.setVisible(false);
  try { if (net.dc) net.dc.close(); } catch (e) {}
  try { if (net.pc) net.pc.close(); } catch (e) {}
  clearTimeout(netDropTimer); netDropTimer = null;
  clearTimeout(net.rematchTimer); net.rematchTimer = null;
  clearInterval(netGraceInterval); netGraceInterval = null;
  net.dc = null; net.pc = null;
  net.connected = false; net.role = null; net.started = false; net.hold = false;
  net.preparing = false;
  hideCountdownOverlay();
  net.ping = 0; net.pending = {}; net.seenExplosions.clear();
  net.gridSentRev = -1; net.lastGridRev = -1;
  net.feed = []; net.feedSeq = 0; net.feedSentSeq = 0;
  net.pickupSeq = 0; net.pickupQueue = []; net.pickupSentSeq = 0; net.lastPickupSeq = 0;
  net.graceDeadline = 0; net.rematchPending = false; net.lastReceive = 0;
  net.dropped = false;
  setTimeout(() => { net.closing = false; }, 900);
  match.netRole = null;
  match.ended = false; match.running = false; match.paused = false;
  netShowReconnect(false);
  netSetStatus('netIdle', 'idle');
  UI.endModal.classList.add('hidden');
  UI.hud.classList.add('hidden');
  UI.startScreen.classList.remove('hidden');
  renderProgress();
  renderSkins();
  resetJoystick();
  const hudTeams = document.getElementById('hudTeams');
  if (hudTeams) hudTeams.classList.add('hidden');
  initArena(true, selectedMode, selectedMap);
  netUpdateBadge();
}

/* ========================================================================
   18. 🎨 CHROMA DROP - MINI-JOGO DAS CORES
   ======================================================================== */
const CHROMA_COLORS = [
  { id: 'RED',    hex: '#ef4444', name: 'VERMELHO' },
  { id: 'BLUE',   hex: '#3b82f6', name: 'AZUL' },
  { id: 'GREEN',  hex: '#10b981', name: 'VERDE' },
  { id: 'YELLOW', hex: '#eab308', name: 'AMARELO' },
  { id: 'PURPLE', hex: '#a855f7', name: 'ROXO' },
  { id: 'CYAN',   hex: '#06b6d4', name: 'CIANO' }
];

const CHROMA_GRID = 7;
const CHROMA_TILE_MAX = 96;
const CHROMA_TILE_MIN = 26;
const CHROMA_ROUND_TIME = 4.5;
const CHROMA_WAIT_TIME = 2.0;
const CHROMA_FALL_TIME = 1.2;
const CHROMA_BOT_COUNT = 5;

const chroma = {
  active: false,
  paused: false,
  canvas: null,
  ctx: null,
  viewW: 0,
  viewH: 0,
  tile: 90,
  offsetX: 0,
  offsetY: 0,
  platforms: [],
  players: [],
  currentColor: null,
  roundTimer: 0,
  waitTimer: 0,
  fallTimer: 0,
  roundNumber: 0,
  phase: 'idle',
  highScore: 0,
  particles: [],
  stars: [],
  shakeTimer: 0,
  shakeIntensity: 0,
  gameOverTimer: null
};

const chromaTouch = { active: false, id: null, ox: 0, oy: 0, dx: 0, dy: 0, max: 46 };

function chromaMetrics() {
  const compact = chroma.viewH < 520;
  const top = compact ? 52 : 150;
  const bottom = compact ? 56 : 84;
  const availW = Math.max(160, chroma.viewW - 20);
  const availH = Math.max(160, chroma.viewH - top - bottom);
  const tile = clamp(Math.floor(Math.min(availW, availH) / CHROMA_GRID), CHROMA_TILE_MIN, CHROMA_TILE_MAX);
  const size = tile * CHROMA_GRID;
  const centered = Math.round((chroma.viewH - size) / 2);
  const maxY = chroma.viewH - bottom - size;
  return {
    tile,
    offsetX: Math.round((chroma.viewW - size) / 2),
    offsetY: clamp(centered, top, Math.max(top, maxY))
  };
}

function layoutChroma(adjustPlayers = false) {
  if (!chroma.canvas) return;
  const metrics = chromaMetrics();
  const prevX = chroma.offsetX, prevY = chroma.offsetY, prevTile = chroma.tile;
  chroma.tile = metrics.tile;
  chroma.offsetX = metrics.offsetX;
  chroma.offsetY = metrics.offsetY;
  chroma.platforms.forEach(p => {
    p.x = metrics.offsetX + p.c * metrics.tile;
    p.y = metrics.offsetY + p.r * metrics.tile;
  });
  if (adjustPlayers && prevTile > 0) {
    const scale = metrics.tile / prevTile;
    chroma.players.forEach(p => {
      p.x = metrics.offsetX + (p.x - prevX) * scale;
      p.y = metrics.offsetY + (p.y - prevY) * scale;
    });
  }
}

function resetChromaTouch() {
  chromaTouch.active = false;
  chromaTouch.id = null;
  chromaTouch.dx = 0;
  chromaTouch.dy = 0;
}

function initChromaDrop() {
  chroma.canvas = document.getElementById('chromaCanvas');
  chroma.ctx = chroma.canvas.getContext('2d');
  clearTimeout(chroma.gameOverTimer);
  chroma.gameOverTimer = null;
  document.getElementById('chromaGameOver').classList.add('hidden');
  MUSIC.play('battle');
  chroma.active = true;
  chroma.paused = false;
  chroma.roundNumber = 0;
  chroma.particles = [];
  chroma.shakeTimer = 0;
  resetChromaTouch();
  
  try {
    chroma.highScore = parseInt(localStorage.getItem('chroma-highscore') || '0');
  } catch (e) { chroma.highScore = 0; }
  
  resizeChromaCanvas();
  
  chroma.stars = [];
  for (let i = 0; i < 100; i++) {
    chroma.stars.push({
      x: Math.random() * chroma.viewW,
      y: Math.random() * chroma.viewH,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.3 + 0.1
    });
  }
  
  const metrics = chromaMetrics();
  chroma.tile = metrics.tile;
  chroma.offsetX = metrics.offsetX;
  chroma.offsetY = metrics.offsetY;

  chroma.platforms = [];
  for (let r = 0; r < CHROMA_GRID; r++) {
    for (let c = 0; c < CHROMA_GRID; c++) {
      const colorIdx = Math.floor(Math.random() * CHROMA_COLORS.length);
      chroma.platforms.push({
        c, r,
        x: metrics.offsetX + c * metrics.tile,
        y: metrics.offsetY + r * metrics.tile,
        color: CHROMA_COLORS[colorIdx].id,
        alive: true,
        falling: false,
        fallY: 0,
        fallVel: 0,
        fallRot: 0,
        spawnT: 0,
        bobPhase: Math.random() * Math.PI * 2
      });
    }
  }
  
  chroma.players = [];
  const centerX = metrics.offsetX + (CHROMA_GRID / 2) * metrics.tile;
  const centerY = metrics.offsetY + (CHROMA_GRID / 2) * metrics.tile;
  const humanRadius = clamp(metrics.tile * 0.2, 11, 18);
  const botRadius = clamp(metrics.tile * 0.18, 10, 16);
  
  chroma.players.push({
    x: centerX, y: centerY,
    vx: 0, vy: 0,
    radius: humanRadius,
    color: '#34d399',
    visor: '#ecfdf5',
    name: (GameState.state.profile.nick || UI.nameInput.value || 'JOGADOR').slice(0, 15),
    isBot: false,
    alive: true,
    falling: false,
    fallY: 0,
    fallVel: 0,
    targetPlatform: null,
    aiTimer: 0
  });
  
  const botColors = ['#f472b6', '#60a5fa', '#fbbf24', '#a78bfa', '#fb923c'];
  const botNames = ['Nova', 'Rook', 'Vex', 'Kilo', 'Zane'];
  for (let i = 0; i < CHROMA_BOT_COUNT; i++) {
    const angle = (i / CHROMA_BOT_COUNT) * Math.PI * 2;
    const dist = metrics.tile * 1.5;
    chroma.players.push({
      x: centerX + Math.cos(angle) * dist,
      y: centerY + Math.sin(angle) * dist,
      vx: 0, vy: 0,
      radius: botRadius,
      color: botColors[i % botColors.length],
      visor: '#ffffff',
      name: botNames[i % botNames.length],
      isBot: true,
      alive: true,
      falling: false,
      fallY: 0,
      fallVel: 0,
      targetPlatform: null,
      aiTimer: 0
    });
  }
  
  startChromaRound();
  
  document.getElementById('chromaModal').classList.remove('hidden');
  document.getElementById('chromaGameOver').classList.add('hidden');
  updateChromaHUD();
}

function resizeChromaCanvas() {
  if (!chroma.canvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  chroma.viewW = window.innerWidth;
  chroma.viewH = window.innerHeight;
  chroma.canvas.width = Math.round(chroma.viewW * dpr);
  chroma.canvas.height = Math.round(chroma.viewH * dpr);
  chroma.canvas.style.width = `${chroma.viewW}px`;
  chroma.canvas.style.height = `${chroma.viewH}px`;
  chroma.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (chroma.active && chroma.platforms.length) layoutChroma(true);
}

function startChromaRound() {
  chroma.roundNumber++;
  
  let availableColors = CHROMA_COLORS.filter(c => c.id !== (chroma.currentColor?.id));
  if (availableColors.length === 0) availableColors = CHROMA_COLORS;
  
  chroma.currentColor = availableColors[Math.floor(Math.random() * availableColors.length)];

  // Floor rebuilds between rounds: every broken tile comes back, with a new color mix
  chroma.platforms.forEach(p => {
    p.alive = true;
    p.falling = false;
    p.fallY = 0;
    p.fallVel = 0;
    p.fallRot = 0;
    p.spawnT = 0;
    p.color = CHROMA_COLORS[Math.floor(Math.random() * CHROMA_COLORS.length)].id;
  });
  let safeCount = chroma.platforms.filter(p => p.color === chroma.currentColor.id).length;
  const minSafe = Math.max(6, Math.round(chroma.platforms.length * 0.16));
  while (safeCount < minSafe) {
    const candidates = chroma.platforms.filter(p => p.color !== chroma.currentColor.id);
    if (!candidates.length) break;
    candidates[Math.floor(Math.random() * candidates.length)].color = chroma.currentColor.id;
    safeCount++;
  }

  chroma.phase = 'waiting';
  chroma.waitTimer = CHROMA_WAIT_TIME;

  // Bots respawn every round so the arena stays populated
  chroma.players.forEach(p => {
    if (!p.isBot) return;
    if (p.alive && !p.falling) {
      p.aiTimer = 0.3 + Math.random() * 0.5;
      p.targetPlatform = null;
    } else {
      const tile = chroma.platforms[Math.floor(Math.random() * chroma.platforms.length)];
      p.alive = true;
      p.falling = false;
      p.fallY = 0;
      p.fallVel = 0;
      p.vx = 0;
      p.vy = 0;
      p.x = tile.x + chroma.tile / 2;
      p.y = tile.y + chroma.tile / 2;
      p.aiTimer = 0.3 + Math.random() * 0.5;
      p.targetPlatform = null;
    }
  });
  
  SFX.playChromaRound();
  updateChromaHUD();
}

function updateChromaHUD() {
  const roundEl = document.getElementById('chromaRoundNum');
  const colorEl = document.getElementById('chromaCurrentColor');
  const nameEl = document.getElementById('chromaColorName');
  const timerEl = document.getElementById('chromaTimerFill');
  
  if (roundEl) roundEl.textContent = chroma.roundNumber;
  if (colorEl && chroma.currentColor) colorEl.style.background = chroma.currentColor.hex;
  if (nameEl && chroma.currentColor) nameEl.textContent = chroma.currentColor.name;
  
  if (timerEl) {
    let pct = 100;
    if (chroma.phase === 'waiting') pct = (chroma.waitTimer / CHROMA_WAIT_TIME) * 100;
    else if (chroma.phase === 'running') pct = (chroma.roundTimer / CHROMA_ROUND_TIME) * 100;
    timerEl.style.width = `${Math.max(0, pct)}%`;
    
    if (pct < 30) timerEl.className = 'h-full bg-gradient-to-r from-rose-500 to-orange-500 transition-all';
    else if (pct < 60) timerEl.className = 'h-full bg-gradient-to-r from-amber-400 to-yellow-400 transition-all';
    else timerEl.className = 'h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all';
  }
}

function updateChromaDrop(dt) {
  if (!chroma.active) return;
  
  if (chroma.shakeTimer > 0) chroma.shakeTimer -= dt;

  chroma.platforms.forEach(p => {
    if (p.spawnT < 1) p.spawnT = Math.min(1, p.spawnT + dt * 4.5);
  });
  
  chroma.stars.forEach(s => {
    s.y += s.speed;
    if (s.y > chroma.viewH) { s.y = 0; s.x = Math.random() * chroma.viewW; }
  });
  
  for (let i = chroma.particles.length - 1; i >= 0; i--) {
    const p = chroma.particles[i];
    p.life -= dt;
    if (p.life <= 0) { chroma.particles.splice(i, 1); continue; }
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 400 * dt;
  }
  
  if (chroma.phase === 'waiting') {
    chroma.waitTimer -= dt;
    if (chroma.waitTimer <= 0) {
      chroma.phase = 'running';
      chroma.roundTimer = CHROMA_ROUND_TIME;
    }
  } else if (chroma.phase === 'running') {
    chroma.roundTimer -= dt;
    updateChromaPlayers(dt);
    if (chroma.roundTimer <= 0) startChromaFall();
  } else if (chroma.phase === 'falling') {
    chroma.fallTimer -= dt;
    
    chroma.platforms.forEach(p => {
      if (p.falling) {
        p.fallVel += 1200 * dt;
        p.fallY += p.fallVel * dt;
        p.fallRot += 3 * dt;
      }
    });
    
    chroma.players.forEach(pl => {
      if (pl.falling) {
        pl.fallVel += 1200 * dt;
        pl.fallY += pl.fallVel * dt;
      }
    });
    
    if (chroma.fallTimer <= 0) {
      const human = chroma.players[0];
      if (!human.alive || human.falling) {
        endChromaDrop();
      } else {
        startChromaRound();
      }
    }
  }
  
  updateChromaHUD();
}

function updateChromaPlayers(dt) {
  const human = chroma.players[0];
  if (human.alive && !human.falling) {
    const mv = chromaTouch.active ? { x: chromaTouch.dx, y: chromaTouch.dy } : readMoveVector('p1');
    const speed = 280;
    human.vx = mv.x * speed;
    human.vy = mv.y * speed;
    
    human.x += human.vx * dt;
    human.y += human.vy * dt;
    
    const minX = chroma.offsetX;
    const maxX = chroma.offsetX + CHROMA_GRID * chroma.tile;
    const minY = chroma.offsetY;
    const maxY = chroma.offsetY + CHROMA_GRID * chroma.tile;
    human.x = clamp(human.x, minX + human.radius, maxX - human.radius);
    human.y = clamp(human.y, minY + human.radius, maxY - human.radius);
  }
  
  chroma.players.forEach(p => {
    if (!p.isBot || !p.alive || p.falling) return;
    
    p.aiTimer -= dt;
    if (p.aiTimer <= 0 && !p.targetPlatform) {
      const target = findNearestPlatformOfColor(p.x, p.y, chroma.currentColor.id);
      if (target) p.targetPlatform = target;
    }
    
    if (p.targetPlatform) {
      const tx = p.targetPlatform.x + chroma.tile / 2;
      const ty = p.targetPlatform.y + chroma.tile / 2;
      const dx = tx - p.x;
      const dy = ty - p.y;
      const d = Math.hypot(dx, dy);
      
      if (d > 5) {
        const speed = 200;
        p.vx = (dx / d) * speed;
        p.vy = (dy / d) * speed;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
      }
    }
  });
}

function getPlatformAt(x, y) {
  for (const p of chroma.platforms) {
    if (!p.alive) continue;
    if (x >= p.x && x < p.x + chroma.tile && y >= p.y && y < p.y + chroma.tile) return p;
  }
  return null;
}

function findNearestPlatformOfColor(x, y, colorId) {
  let best = null;
  let bestDist = Infinity;
  for (const p of chroma.platforms) {
    if (!p.alive || p.color !== colorId) continue;
    const cx = p.x + chroma.tile / 2;
    const cy = p.y + chroma.tile / 2;
    const d = Math.hypot(cx - x, cy - y);
    if (d < bestDist) { bestDist = d; best = p; }
  }
  return best;
}

function startChromaFall() {
  chroma.phase = 'falling';
  chroma.fallTimer = CHROMA_FALL_TIME;
  chroma.shakeTimer = 0.5;
  chroma.shakeIntensity = 8;
  
  chroma.platforms.forEach(p => {
    if (p.alive && p.color !== chroma.currentColor.id) {
      p.falling = true;
      p.fallVel = 0;
      
      for (let i = 0; i < 8; i++) {
        chroma.particles.push({
          x: p.x + chroma.tile / 2,
          y: p.y + chroma.tile / 2,
          vx: (Math.random() - 0.5) * 300,
          vy: (Math.random() - 0.5) * 300 - 100,
          color: CHROMA_COLORS.find(c => c.id === p.color).hex,
          life: 0.8, maxLife: 0.8,
          size: 3 + Math.random() * 3
        });
      }
    }
  });
  
  chroma.players.forEach(pl => {
    if (!pl.alive || pl.falling) return;
    const plat = getPlatformAt(pl.x, pl.y);
    if (!plat || plat.color !== chroma.currentColor.id) {
      pl.falling = true;
      pl.fallVel = 0;
      pl.alive = false;
      
      for (let i = 0; i < 12; i++) {
        chroma.particles.push({
          x: pl.x, y: pl.y,
          vx: (Math.random() - 0.5) * 200,
          vy: (Math.random() - 0.5) * 200 - 50,
          color: pl.color,
          life: 1, maxLife: 1,
          size: 2 + Math.random() * 3
        });
      }
    }
  });
  
  SFX.playBeep();
}

function endChromaDrop() {
  chroma.phase = 'gameover';
  
  const rounds = chroma.roundNumber - 1;
  if (rounds > 0) missionProgress('chroma', rounds);
  let newRecord = false;
  if (rounds > chroma.highScore) {
    chroma.highScore = rounds;
    newRecord = true;
    try { localStorage.setItem('chroma-highscore', String(chroma.highScore)); } catch (e) {}
  }
  
  SFX.playChromaWrong();
  
  clearTimeout(chroma.gameOverTimer);
  chroma.gameOverTimer = setTimeout(() => {
    chroma.gameOverTimer = null;
    // Segurança extra: se o jogador saiu ou reiniciou antes do timeout,
    // o overlay não deve reaparecer por cima do lobby/da nova partida.
    if (!chroma.active || chroma.phase !== 'gameover') return;
    document.getElementById('chromaFinalRounds').textContent = rounds;
    document.getElementById('chromaHighScore').textContent = chroma.highScore;
    const newRecordEl = document.getElementById('chromaNewRecord');
    if (newRecordEl) newRecordEl.classList.toggle('hidden', !newRecord);
    document.getElementById('chromaGameOver').classList.remove('hidden');
  }, 800);
}

function drawChromaDrop() {
  if (!chroma.active || !chroma.ctx) return;
  
  const ctx = chroma.ctx;
  const W = chroma.viewW;
  const H = chroma.viewH;
  
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, '#0f0524');
  bgGrad.addColorStop(0.5, '#1a0b2e');
  bgGrad.addColorStop(1, '#0a0514');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);
  
  let shakeX = 0, shakeY = 0;
  if (chroma.shakeTimer > 0) {
    shakeX = (Math.random() - 0.5) * chroma.shakeIntensity;
    shakeY = (Math.random() - 0.5) * chroma.shakeIntensity;
  }
  
  ctx.save();
  ctx.translate(shakeX, shakeY);
  
  chroma.stars.forEach(s => {
    ctx.globalAlpha = s.alpha;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
  
  chroma.platforms.forEach(p => {
    if (!p.alive && !p.falling) return;
    
    const colorData = CHROMA_COLORS.find(c => c.id === p.color);
    const bob = Math.sin(nowT * 2 + p.bobPhase) * 3;
    const px = p.x;
    const py = p.y + bob + (p.falling ? p.fallY : 0);
    
    ctx.save();
    if (p.falling) {
      ctx.translate(px + chroma.tile / 2, py + chroma.tile / 2);
      ctx.rotate(p.fallRot);
      ctx.translate(-(px + chroma.tile / 2), -(py + chroma.tile / 2));
      ctx.globalAlpha = Math.max(0, 1 - p.fallY / 400);
    } else if (p.spawnT < 1) {
      const grow = 0.55 + 0.45 * (1 - Math.pow(1 - p.spawnT, 3));
      ctx.translate(px + chroma.tile / 2, py + chroma.tile / 2);
      ctx.scale(grow, grow);
      ctx.translate(-(px + chroma.tile / 2), -(py + chroma.tile / 2));
      ctx.globalAlpha = Math.min(1, 0.35 + p.spawnT);
    }
    
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.beginPath();
    ctx.ellipse(px + chroma.tile / 2, py + chroma.tile - 5, chroma.tile * 0.4, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    const grad = ctx.createLinearGradient(px, py, px, py + chroma.tile);
    grad.addColorStop(0, colorData.hex);
    grad.addColorStop(1, shadeColor(colorData.hex, -40));
    ctx.fillStyle = grad;
    chromaRoundRect(ctx, px + 4, py + 4, chroma.tile - 8, chroma.tile - 8, Math.max(6, chroma.tile * 0.14));
    ctx.fill();
    
    ctx.strokeStyle = shadeColor(colorData.hex, 30);
    ctx.lineWidth = 3;
    chromaRoundRect(ctx, px + 4, py + 4, chroma.tile - 8, chroma.tile - 8, Math.max(6, chroma.tile * 0.14));
    ctx.stroke();
    
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    chromaRoundRect(ctx, px + 10, py + 10, chroma.tile - 20, (chroma.tile - 20) / 2, Math.max(4, chroma.tile * 0.09));
    ctx.fill();
    
    if (chroma.currentColor && p.color === chroma.currentColor.id && chroma.phase === 'running') {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 4]);
      chromaRoundRect(ctx, px + 2, py + 2, chroma.tile - 4, chroma.tile - 4, Math.max(7, chroma.tile * 0.16));
      ctx.stroke();
      ctx.setLineDash([]);
    }
    
    ctx.restore();
  });
  
  chroma.players.forEach(pl => {
    if (!pl.alive && !pl.falling) return;
    
    const px = pl.x;
    const py = pl.y + (pl.falling ? pl.fallY : 0);
    
    ctx.save();
    if (pl.falling) ctx.globalAlpha = Math.max(0, 1 - pl.fallY / 400);
    
    if (!pl.falling) {
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.beginPath();
      ctx.ellipse(px, py + pl.radius + 3, pl.radius * 0.8, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const grad = ctx.createRadialGradient(px - 4, py - 4, 2, px, py, pl.radius);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.3, pl.color);
    grad.addColorStop(1, shadeColor(pl.color, -50));
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(px, py, pl.radius, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.fillStyle = pl.visor;
    ctx.beginPath();
    ctx.arc(px, py - 2, Math.max(3, pl.radius * 0.35), 0, Math.PI * 2);
    ctx.fill();
    
    if (!pl.falling && chroma.tile >= 44) {
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const label = pl.name;
      const w = ctx.measureText(label).width + 10;
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      chromaRoundRect(ctx, px - w / 2, py - pl.radius - 18, w, 14, 7);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText(label, px, py - pl.radius - 11);
    }
    
    ctx.restore();
  });
  
  chroma.particles.forEach(p => {
    const a = p.life / p.maxLife;
    ctx.globalAlpha = a;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * a, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
  
  ctx.restore();

  drawChromaTouch();
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches && chroma.roundNumber <= 2) {
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    const hintY = chroma.viewH < 520 ? H - 22 : H - 76;
    ctx.fillText('ARRASTE PARA SE MOVER', W / 2, hintY);
  }
}

function drawChromaTouch() {
  if (!chromaTouch.active) return;
  const ctx = chroma.ctx;
  const R = chromaTouch.max;
  ctx.save();
  ctx.fillStyle = 'rgba(2,6,23,0.35)';
  ctx.strokeStyle = 'rgba(255,255,255,0.28)';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(chromaTouch.ox, chromaTouch.oy, R, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  const kx = chromaTouch.ox + chromaTouch.dx * R;
  const ky = chromaTouch.oy + chromaTouch.dy * R;
  ctx.fillStyle = 'rgba(168,85,247,0.9)';
  ctx.beginPath(); ctx.arc(kx, ky, 20, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.85)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}

function chromaRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function hexA(color, alpha) {
  const h = String(color || '#ffffff').replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const n = parseInt(full, 16);
  if (!Number.isFinite(n)) return `rgba(255,255,255,${alpha})`;
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}
function shadeColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

function exitChromaDrop() {
  clearTimeout(chroma.gameOverTimer);
  chroma.gameOverTimer = null;
  chroma.active = false;
  chroma.paused = false;
  chroma.phase = 'idle';
  MUSIC.play('menu');
  resetChromaTouch();
  document.getElementById('chromaModal').classList.add('hidden');
  document.getElementById('chromaGameOver').classList.add('hidden');
}

function bindChromaTouch() {
  window.addEventListener('pointerdown', e => {
    if (!chroma.active || chroma.paused || chroma.phase === 'gameover') return;
    if (e.pointerType === 'mouse') return;
    if (e.target && e.target.closest && e.target.closest('button, input, textarea, a')) return;
    chromaTouch.active = true;
    chromaTouch.id = e.pointerId;
    chromaTouch.ox = e.clientX;
    chromaTouch.oy = e.clientY;
    chromaTouch.dx = 0;
    chromaTouch.dy = 0;
  }, { passive: true });
  window.addEventListener('pointermove', e => {
    if (!chromaTouch.active || e.pointerId !== chromaTouch.id) return;
    const dx = e.clientX - chromaTouch.ox;
    const dy = e.clientY - chromaTouch.oy;
    const len = Math.hypot(dx, dy);
    const max = chromaTouch.max;
    if (len < 6) { chromaTouch.dx = 0; chromaTouch.dy = 0; return; }
    const clamped = Math.min(len, max);
    chromaTouch.dx = (dx / len) * (clamped / max);
    chromaTouch.dy = (dy / len) * (clamped / max);
  }, { passive: true });
  const end = e => {
    if (chromaTouch.active && e.pointerId === chromaTouch.id) resetChromaTouch();
  };
  window.addEventListener('pointerup', end);
  window.addEventListener('pointercancel', end);
}

function bindChromaUI() {
  bindChromaTouch();
  const btnChroma = document.getElementById('btnChromaDrop');
  if (btnChroma) {
    btnChroma.addEventListener('click', () => {
      SFX.init();
      UI.startScreen.classList.add('hidden');
      initChromaDrop();
    });
  }
  
  const btnChromaQuit = document.getElementById('btnChromaQuit');
  if (btnChromaQuit) {
    btnChromaQuit.addEventListener('click', () => {
      exitChromaDrop();
      UI.startScreen.classList.remove('hidden');
    });
  }
  
  const btnChromaMute = document.getElementById('btnChromaMute');
  if (btnChromaMute) {
    btnChromaMute.addEventListener('click', () => {
      SFX.init();
      const m = SFX.toggleMute();
      MUSIC.setMuted(m);
      btnChromaMute.textContent = m ? '🔇' : '🔊';
    });
  }
  
  const btnChromaPlayAgain = document.getElementById('btnChromaPlayAgain');
  if (btnChromaPlayAgain) {
    btnChromaPlayAgain.addEventListener('click', () => {
      document.getElementById('chromaGameOver').classList.add('hidden');
      initChromaDrop();
    });
  }
  
  const btnChromaBackMenu = document.getElementById('btnChromaBackMenu');
  if (btnChromaBackMenu) {
    btnChromaBackMenu.addEventListener('click', () => {
      exitChromaDrop();
      UI.startScreen.classList.remove('hidden');
    });
  }
}

/* ========================================================================
   18.1 ARQUIBANCADA AO VIVO (ESPECTADOR)
   ======================================================================== */
const spectate = { active: false, cam: 'total', cooldownUntil: 0, ticker: null };

function setSpectateCam(cam) {
  spectate.cam = ['total', 'p1', 'p2'].includes(cam) ? cam : 'total';
  document.querySelectorAll('[data-cam]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cam === spectate.cam);
  });
}

function updateCheerCooldown() {
  const el = document.getElementById('cheerCooldown');
  if (!el) return;
  const left = Math.max(0, spectate.cooldownUntil - performance.now());
  el.textContent = left > 0 ? `${(left / 1000).toFixed(1)}s` : '';
  document.querySelectorAll('.cheer-btn').forEach(btn => {
    btn.classList.toggle('cooling', left > 0);
    btn.disabled = left > 0;
  });
}

function spawnCheerEmoji(emoji) {
  const layer = document.getElementById('cheerFloatLayer');
  if (!layer) return;
  const span = document.createElement('span');
  span.className = 'cheer-float';
  span.textContent = emoji;
  const side = Math.random();
  if (side < 0.5) {
    span.style.left = `${8 + Math.random() * 84}%`;
    span.style.bottom = `${6 + Math.random() * 8}%`;
  } else {
    span.style.left = side < 0.75 ? '6%' : '92%';
    span.style.bottom = `${18 + Math.random() * 55}%`;
  }
  span.style.setProperty('--dx', `${(Math.random() * 80 - 40).toFixed(0)}px`);
  span.style.setProperty('--rot', `${(Math.random() * 36 - 18).toFixed(0)}deg`);
  layer.appendChild(span);
  setTimeout(() => span.remove(), 2800);
}

function cheer(emoji) {
  if (!spectate.active) return;
  if (performance.now() < spectate.cooldownUntil) return;
  spectate.cooldownUntil = performance.now() + 3000;
  SFX.playPickup();
  spawnCheerEmoji(emoji);
  updateCheerCooldown();
}

function startSpectate(pair = null) {
  if (spectate.active) return;
  SFX.init();
  spectate.active = true;
  spectate.cooldownUntil = 0;
  setSpectateCam('total');
  // A arquibancada é sempre entre terceiros: o nick local nunca entra na
  // transmissão, nem como padrão nem vindo de um par malformado.
  const me = String(GameState.state.profile.nick || '').trim().toLowerCase();
  const rivals = GameState.leagueTable().filter(r => !r.me).map(r => r.name);
  const pickRival = (i) => rivals.length ? rivals[i % rivals.length] : `Bot ${i + 1}`;
  const sanitize = (name, i) => {
    const n = String(name || '').trim();
    return (!n || n.toLowerCase() === me) ? pickRival(i) : n;
  };
  spectatePair = Array.isArray(pair) && pair[0] && pair[1]
    ? [sanitize(pair[0], 0), sanitize(pair[1], 1)]
    : [pickRival(0), pickRival(1)];
  const label = document.getElementById('spectateMatchLabel');
  if (label) {
    const tpl = I18N[currentLang].spectateVs || '{a} × {b}';
    const link = (n) => `<span role="button" tabindex="0" class="live-player-link" data-player="${escapeHtml(n)}">${escapeHtml(n)}</span>`;
    label.innerHTML = tpl.split('{a}').join(link(spectatePair[0])).split('{b}').join(link(spectatePair[1]));
  }
  UI.endModal.classList.add('hidden');
  UI.startScreen.classList.add('hidden');
  UI.hud.classList.add('hidden');
  document.body.classList.add('spectating');
  const layer = document.getElementById('spectateLayer');
  if (layer) layer.classList.remove('hidden');
  initArena(true, 'DUEL', duel.biomeCycle[Math.floor(Math.random() * duel.biomeCycle.length)]);
  match.stormTimer = match.stormInterval = 999;
  match.airdropTimer = 999;
  clearInterval(spectate.ticker);
  spectate.ticker = setInterval(updateCheerCooldown, 120);
  updateCheerCooldown();
}

function stopSpectate() {
  if (!spectate.active) return;
  spectate.active = false;
  clearInterval(spectate.ticker);
  spectate.ticker = null;
  document.body.classList.remove('spectating');
  const layer = document.getElementById('spectateLayer');
  if (layer) layer.classList.add('hidden');
  const floatLayer = document.getElementById('cheerFloatLayer');
  if (floatLayer) floatLayer.innerHTML = '';
  UI.endModal.classList.add('hidden');
  UI.hud.classList.add('hidden');
  UI.startScreen.classList.remove('hidden');
  match.running = false; match.ended = false; match.paused = false; match.pausedByRotate = false;
  initArena(true, selectedMode, selectedMap);
}

/* ========================================================================
   19. RENDERING
   ======================================================================== */
function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, QUALITY.dprCap) * Math.min(renderScale, QUALITY.scaleCap);
  viewW = window.innerWidth; viewH = window.innerHeight;
  canvas.width = Math.round(viewW * dpr); canvas.height = Math.round(viewH * dpr);
  canvas.style.width = `${viewW}px`; canvas.style.height = `${viewH}px`;
  cam.zoom = clamp(Math.max(viewW, viewH) / (17 * TILE_SIZE), 0.72, 2.1);
  if (match.mode === 'LOCAL') cam.zoom *= 0.84;
  if (Math.min(viewW, viewH) < 430) cam.zoom *= 0.94;
  resizeRadar(); setupRadar();
  if (chroma.active) resizeChromaCanvas();
}

function radarSize() { return viewW <= 430 ? 66 : (viewW <= 620 ? 78 : 88); }

function resizeRadar() {
  const el = document.getElementById('radarCanvas');
  if (!el) return;
  const s = radarSize();
  el.style.width = `${s}px`; el.style.height = `${s}px`;
}

function setupRadar() {
  const size = 88;
  const rDpr = Math.min(window.devicePixelRatio || 1, 2);
  radarCanvas.width = Math.round(size * rDpr);
  radarCanvas.height = Math.round(size * rDpr);
  rctx.setTransform(rDpr, 0, 0, rDpr, 0, 0);
}

function rr(x, y, w, h, r) {
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.arcTo(x + w, y, x + w, y + h, rad);
  ctx.arcTo(x + w, y + h, x, y + h, rad);
  ctx.arcTo(x, y + h, x, y, rad);
  ctx.arcTo(x, y, x + w, y, rad);
  ctx.closePath();
}

function render() {
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = '#070a11';
  ctx.fillRect(0, 0, viewW, viewH);
  let shakeX = 0, shakeY = 0;
  if (match.shake > 0.05 && match.shakeEnabled) { shakeX = (Math.random() - 0.5) * match.shake * 2; shakeY = (Math.random() - 0.5) * match.shake * 2; }
  const zoom = cam.zoom;
  const halfW = viewW / (2 * zoom), halfH = viewH / (2 * zoom);
  const minC = Math.max(0, Math.floor((cam.x - halfW) / TILE_SIZE));
  const maxC = Math.min(GRID_SIZE - 1, Math.floor((cam.x + halfW) / TILE_SIZE));
  const minR = Math.max(0, Math.floor((cam.y - halfH) / TILE_SIZE));
  const maxR = Math.min(GRID_SIZE - 1, Math.floor((cam.y + halfH) / TILE_SIZE));
  ctx.save();
  ctx.translate(viewW / 2 + shakeX, viewH / 2 + shakeY);
  ctx.scale(zoom, zoom);
  ctx.translate(-cam.x, -cam.y);
  drawTiles(minC, maxC, minR, maxR);
  drawAmbience(minC, maxC, minR, maxR, match.theme || MAPS[0]);
  drawStormRingWarning();
  drawPortals();
  drawAirdropBeacon();
  drawPowerups();
  drawBlastTelegraphs();
  drawTrails();
  drawBombs();
  drawFighters();
  drawExplosions();
  drawParticles();
  drawLabels();
  ctx.restore();
  drawStormVignette();
  drawHitVignette();
  drawEventTint();
  renderRadar();
}

/* ---- Fundo do lobby ----
   A partida-demo serve para prévias e arquibancada, mas não pode aparecer
   atrás do menu. O lobby desenha um cenário estático do bioma escolhido no
   lugar da arena, então nenhum lutador, bomba ou explosão fica visível. */
const lobbyBackdrop = { key: '', canvas: null };

function drawLobbyBackdrop() {
  const w = canvas.width, h = canvas.height;
  if (!w || !h) return;
  const theme = match.theme || MAPS[0];
  const key = `${theme.id}:${w}x${h}`;
  if (key !== lobbyBackdrop.key || !lobbyBackdrop.canvas) {
    const off = document.createElement('canvas');
    off.width = w; off.height = h;
    paintLobbyBackdrop(off.getContext('2d'), w, h, theme);
    lobbyBackdrop.canvas = off;
    lobbyBackdrop.key = key;
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.drawImage(lobbyBackdrop.canvas, 0, 0);
}

function paintLobbyBackdrop(g, w, h, theme) {
  const base = g.createLinearGradient(0, 0, w * 0.3, h);
  base.addColorStop(0, '#05070d');
  base.addColorStop(0.55, theme.floor[0]);
  base.addColorStop(1, '#04060b');
  g.fillStyle = base;
  g.fillRect(0, 0, w, h);

  const glowAt = (x, y, r, alpha) => {
    const gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, theme.accent);
    gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.save();
    g.globalAlpha = alpha;
    g.fillStyle = gr;
    g.fillRect(x - r, y - r, r * 2, r * 2);
    g.restore();
  };
  glowAt(w * 0.8, h * 0.14, Math.max(w, h) * 0.5, 0.2);
  glowAt(w * 0.1, h * 0.92, Math.max(w, h) * 0.42, 0.1);

  // Anéis de radar atrás do painel, na cor do bioma
  g.save();
  g.strokeStyle = theme.accent;
  g.lineWidth = 1.5;
  for (let i = 1; i <= 5; i++) {
    g.globalAlpha = 0.04 + i * 0.008;
    g.beginPath();
    g.arc(w * 0.5, h * 0.42, Math.min(w, h) * 0.12 * i, 0, Math.PI * 2);
    g.stroke();
  }
  g.restore();

  // Faixas diagonais de velocidade
  g.save();
  g.strokeStyle = theme.glow;
  g.lineWidth = 2;
  const span = Math.max(w, h);
  for (let i = -6; i <= 6; i++) {
    const off = i * span * 0.11;
    g.globalAlpha = i % 2 ? 0.5 : 0.8;
    g.beginPath();
    g.moveTo(-w * 0.2 + off, h);
    g.lineTo(w * 0.5 + off, -h * 0.2);
    g.stroke();
  }
  g.restore();

  // Pontos de luz determinísticos
  g.save();
  g.fillStyle = theme.accent;
  for (let i = 0; i < 80; i++) {
    const x = (((i * 733) % 1000) / 1000) * w;
    const y = (((i * 397) % 1000) / 1000) * h;
    g.globalAlpha = 0.04 + ((i * 53) % 20) / 260;
    g.beginPath();
    g.arc(x, y, 1 + (i % 3) * 0.6, 0, Math.PI * 2);
    g.fill();
  }
  g.restore();

  const vig = g.createRadialGradient(w * 0.5, h * 0.45, Math.min(w, h) * 0.25, w * 0.5, h * 0.45, Math.max(w, h) * 0.75);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(2,4,9,0.82)');
  g.fillStyle = vig;
  g.fillRect(0, 0, w, h);
}

function drawStormRingWarning() {
  if (match.demoMode || match.mode === 'TUTORIAL' || !match.running || match.paused || match.safeRing < 0 || match.safeRing >= MAX_RING) return;
  const ring = match.safeRing;
  const lo = ring * TILE_SIZE, hi = (GRID_SIZE - ring) * TILE_SIZE;
  const warn = match.stormWarning;
  const t = performance.now() / 1000;
  ctx.save();
  ctx.fillStyle = warn ? `rgba(120,20,45,${0.22 + 0.08 * Math.sin(t * 9)})` : 'rgba(120,20,45,0.12)';
  ctx.fillRect(0, 0, WORLD_PX, lo);
  ctx.fillRect(0, hi, WORLD_PX, WORLD_PX - hi);
  ctx.fillRect(0, lo, lo, hi - lo);
  ctx.fillRect(hi, lo, WORLD_PX - hi, hi - lo);
  const band = TILE_SIZE;
  ctx.fillStyle = warn ? `rgba(244,63,94,${0.30 + 0.15 * Math.sin(t * 9)})` : 'rgba(244,63,94,0.16)';
  ctx.fillRect(lo, lo, hi - lo, band);
  ctx.fillRect(lo, hi - band, hi - lo, band);
  ctx.fillRect(lo, lo + band, band, hi - lo - band * 2);
  ctx.fillRect(hi - band, lo + band, band, hi - lo - band * 2);
  ctx.strokeStyle = warn ? 'rgba(255,228,230,0.95)' : 'rgba(251,113,133,0.65)';
  ctx.lineWidth = warn ? 3 : 2;
  ctx.setLineDash(warn ? [16, 10] : [6, 12]);
  ctx.lineDashOffset = -t * (warn ? 60 : 20);
  ctx.strokeRect(lo + band + 2, lo + band + 2, hi - lo - band * 2 - 4, hi - lo - band * 2 - 4);
  ctx.restore();
}

function drawHitVignette() {
  if (!(match.hitFlash > 0)) return;
  const a = Math.min(1, match.hitFlash / 0.45);
  const grad = ctx.createRadialGradient(viewW / 2, viewH / 2, Math.min(viewW, viewH) * 0.28, viewW / 2, viewH / 2, Math.max(viewW, viewH) * 0.72);
  grad.addColorStop(0, 'rgba(244,63,94,0)');
  grad.addColorStop(1, `rgba(225,29,72,${0.55 * a})`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, viewW, viewH);
}

function tileHash(c, r) {
  let h = (c * 374761393 + r * 668265263) ^ 0x5bf03635;
  h = (h ^ (h >> 13)) * 1274126177;
  return ((h ^ (h >> 16)) >>> 0) / 4294967295;
}

/* ---- Cenário por bioma: cada mapa tem piso, props, obstáculos, vegetação,
   borda e partículas próprios (não é só troca de cor). Tudo é decorativo e
   determinístico (hash por célula), então não interfere na colisão. ---- */

function drawGround(x, y, c, r, theme) {
  const h = tileHash(c, r);
  const ground = theme.ground || theme.deco || 'circuit';
  ctx.save();
  if (ground === 'sand') drawSandGround(x, y, h);
  else if (ground === 'ice') drawIceGround(x, y, h);
  else if (ground === 'lava') drawLavaGround(x, y, c, r, h);
  else if (ground === 'leaf') drawLeafGround(x, y, h);
  else if (ground === 'petal') drawPetalGround(x, y, c, r, h);
  else if (ground === 'asphalt') drawAsphaltGround(x, y, r, h);
  else if (ground === 'plank') drawPlankGround(x, y, c, r, h);
  else if (ground === 'panel') drawPanelGround(x, y, c, r, h, theme);
  else drawCircuitGround(x, y, c, h, theme);
  ctx.restore();
  if (h > 0.9) drawGroundProp(x, y, c, r, h, theme);
}

function drawCircuitGround(x, y, c, h, theme) {
  ctx.strokeStyle = theme.glow; ctx.lineWidth = 1.5;
  const ox = 8 + (h * 30), oy = 10 + ((h * 7919) % 28);
  ctx.beginPath();
  ctx.moveTo(x + ox, y + oy);
  ctx.lineTo(x + ox + 14, y + oy);
  ctx.lineTo(x + ox + 14, y + oy + 10);
  ctx.stroke();
  if (h > 0.72) {
    ctx.fillStyle = theme.accent; ctx.globalAlpha = 0.32;
    ctx.beginPath(); ctx.arc(x + ox + 14, y + oy + 10, 2, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
  }
  if (h > 0.86) {
    // pequena placa hexagonal de piso tecnológico
    ctx.strokeStyle = 'rgba(148,163,184,0.10)'; ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = Math.PI / 3 * i + Math.PI / 6;
      const px = x + 24 + Math.cos(a) * 9, py = y + 24 + Math.sin(a) * 9;
      i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
    }
    ctx.closePath(); ctx.stroke();
  }
}

function drawSandGround(x, y, h) {
  ctx.strokeStyle = 'rgba(251,191,36,0.10)'; ctx.lineWidth = 1.4;
  for (let i = 0; i < 2; i++) {
    const oy = 13 + i * 17 + h * 6;
    ctx.beginPath();
    ctx.moveTo(x + 3, y + oy);
    ctx.quadraticCurveTo(x + TILE_SIZE * 0.5, y + oy - 5 - h * 4, x + TILE_SIZE - 3, y + oy + 2);
    ctx.stroke();
  }
  ctx.fillStyle = 'rgba(251,191,36,0.18)';
  ctx.beginPath(); ctx.arc(x + 12 + h * 22, y + 32 - h * 16, 1.6, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(x + 34 - h * 12, y + 12 + h * 10, 1.2, 0, Math.PI * 2); ctx.fill();
  if (h > 0.74) {
    ctx.strokeStyle = 'rgba(148,163,184,0.14)'; ctx.lineWidth = 1;
    ctx.strokeRect(x + 6, y + 6, TILE_SIZE - 12, TILE_SIZE - 12);
  }
}

function drawIceGround(x, y, h) {
  const flip = h > 0.5;
  ctx.strokeStyle = 'rgba(224,242,254,0.09)'; ctx.lineWidth = 6;
  ctx.beginPath();
  if (flip) { ctx.moveTo(x + 6, y + TILE_SIZE - 8); ctx.lineTo(x + TILE_SIZE - 8, y + 8); }
  else { ctx.moveTo(x + 8, y + 8); ctx.lineTo(x + TILE_SIZE - 6, y + TILE_SIZE - 8); }
  ctx.stroke();
  ctx.strokeStyle = 'rgba(165,243,252,0.16)'; ctx.lineWidth = 1.2;
  const ox = 8 + h * 26;
  ctx.beginPath();
  ctx.moveTo(x + ox, y + 40);
  ctx.lineTo(x + ox + 5, y + 27);
  ctx.lineTo(x + ox - 2, y + 16);
  ctx.stroke();
  if (h > 0.68) {
    ctx.fillStyle = 'rgba(224,242,254,0.09)';
    ctx.beginPath(); ctx.ellipse(x + 24, y + 20, 13, 6, h * 3, 0, Math.PI * 2); ctx.fill();
  }
  ctx.fillStyle = 'rgba(255,255,255,0.22)';
  ctx.beginPath(); ctx.arc(x + 10 + h * 24, y + 12 + h * 20, 1, 0, Math.PI * 2); ctx.fill();
}

function drawLavaGround(x, y, c, r, h) {
  ctx.strokeStyle = 'rgba(0,0,0,0.34)'; ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y + (h > 0.5 ? 22 : 30));
  ctx.lineTo(x + TILE_SIZE, y + (h > 0.5 ? 28 : 19));
  ctx.stroke();
  if (h > 0.62) {
    const t = 0.16 + 0.05 * Math.sin(nowT * 2 + c * 0.8 + r * 1.3);
    ctx.strokeStyle = `rgba(251,113,133,${t})`; ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(x + 6 + h * 10, y + 4);
    ctx.lineTo(x + 14 + h * 8, y + 20);
    ctx.lineTo(x + 10 + h * 12, y + 32);
    ctx.lineTo(x + 20 + h * 6, y + 44);
    ctx.stroke();
    ctx.strokeStyle = `rgba(254,205,211,${t * 0.7})`; ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.fillStyle = 'rgba(120,113,108,0.16)';
  ctx.beginPath(); ctx.arc(x + 14 + h * 20, y + 10 + h * 24, 1.6, 0, Math.PI * 2); ctx.fill();
}

function drawLeafGround(x, y, h) {
  ctx.strokeStyle = 'rgba(74,222,128,0.15)'; ctx.lineWidth = 1.2;
  for (let i = 0; i < 3; i++) {
    const ox = 8 + ((h * 977 + i * 137) % (TILE_SIZE - 16));
    const oy = 30 + ((h * 613 + i * 191) % 14);
    ctx.beginPath(); ctx.moveTo(x + ox, y + oy); ctx.lineTo(x + ox - 2, y + oy - 7); ctx.stroke();
  }
  ctx.fillStyle = 'rgba(52,211,153,0.13)';
  const ox = 10 + h * 26, oy = 12 + ((h * 401) % 24);
  ctx.beginPath(); ctx.ellipse(x + ox, y + oy, 5.5, 2.6, h * 6, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(x + ox + 9, y + oy + 7, 4, 2, h * 6 + 1, 0, Math.PI * 2); ctx.fill();
  if (h > 0.82) {
    ctx.fillStyle = 'rgba(250,204,21,0.35)';
    ctx.beginPath(); ctx.arc(x + 24 + h * 8, y + 30 - h * 10, 1.6, 0, Math.PI * 2); ctx.fill();
  }
}

function drawPetalGround(x, y, c, r, h) {
  ctx.strokeStyle = 'rgba(148,163,184,0.07)'; ctx.lineWidth = 1;
  for (let i = 1; i < 3; i++) {
    const oy = y + i * 16;
    ctx.beginPath(); ctx.moveTo(x, oy); ctx.lineTo(x + TILE_SIZE, oy); ctx.stroke();
  }
  ctx.fillStyle = 'rgba(249,168,212,0.16)';
  const ox = 8 + h * 30, oy = 8 + ((h * 881) % 30);
  ctx.beginPath(); ctx.ellipse(x + ox, y + oy, 4.4, 2.2, h * 7, 0, Math.PI * 2); ctx.fill();
  ctx.globalAlpha = 0.7;
  ctx.beginPath(); ctx.ellipse(x + ox + 11, y + oy + 9, 3.2, 1.8, h * 5 + 2, 0, Math.PI * 2); ctx.fill();
  ctx.globalAlpha = 1;
}

function drawAsphaltGround(x, y, r, h) {
  ctx.strokeStyle = 'rgba(148,163,184,0.08)'; ctx.lineWidth = 1;
  ctx.strokeRect(x + 1.5, y + 1.5, TILE_SIZE - 3, TILE_SIZE - 3);
  ctx.fillStyle = 'rgba(148,163,184,0.12)';
  ctx.beginPath(); ctx.arc(x + 10 + h * 26, y + 10 + h * 24, 1, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(x + 32 - h * 14, y + 34 - h * 18, 0.9, 0, Math.PI * 2); ctx.fill();
  if (r % 6 === 2) {
    ctx.fillStyle = 'rgba(226,232,240,0.10)';
    ctx.fillRect(x + 8, y + TILE_SIZE / 2 - 1.5, 20, 3);
  }
  if (h > 0.8) {
    ctx.strokeStyle = 'rgba(0,0,0,0.35)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(x + 8, y + 38); ctx.lineTo(x + 18, y + 30); ctx.lineTo(x + 26, y + 40); ctx.stroke();
  }
}

function drawPlankGround(x, y, c, r, h) {
  ctx.strokeStyle = 'rgba(0,0,0,0.30)'; ctx.lineWidth = 1.5;
  for (let i = 1; i < 3; i++) {
    const oy = y + i * 16;
    ctx.beginPath(); ctx.moveTo(x, oy); ctx.lineTo(x + TILE_SIZE, oy); ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(94,234,212,0.05)'; ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x + 4, y + 9 + h * 4);
  ctx.lineTo(x + TILE_SIZE - 5, y + 10 + h * 3);
  ctx.stroke();
  ctx.fillStyle = 'rgba(15,23,42,0.5)';
  [[6, 8], [TILE_SIZE - 7, 8], [6, 40], [TILE_SIZE - 7, 40]].forEach(([ox, oy]) => {
    ctx.beginPath(); ctx.arc(x + ox, y + oy, 1.3, 0, Math.PI * 2); ctx.fill();
  });
  if (h > 0.78) {
    ctx.fillStyle = 'rgba(45,212,191,0.10)';
    ctx.beginPath(); ctx.ellipse(x + 24, y + 24, 12, 5, h * 2, 0, Math.PI * 2); ctx.fill();
  }
}

function drawPanelGround(x, y, c, r, h, theme) {
  ctx.strokeStyle = 'rgba(148,163,184,0.10)'; ctx.lineWidth = 1;
  ctx.strokeRect(x + 5, y + 5, TILE_SIZE - 10, TILE_SIZE - 10);
  ctx.fillStyle = 'rgba(148,163,184,0.16)';
  [[8, 8], [TILE_SIZE - 8, 8], [8, TILE_SIZE - 8], [TILE_SIZE - 8, TILE_SIZE - 8]].forEach(([ox, oy]) => {
    ctx.beginPath(); ctx.arc(x + ox, y + oy, 1.2, 0, Math.PI * 2); ctx.fill();
  });
  if (h > 0.72) {
    ctx.fillStyle = theme.accent; ctx.globalAlpha = 0.10;
    ctx.fillRect(x + 12, y + 22, TILE_SIZE - 24, 4);
    ctx.globalAlpha = 1;
  }
  if (h > 0.88) {
    ctx.strokeStyle = 'rgba(192,132,252,0.16)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(x + 8, y + TILE_SIZE - 12); ctx.lineTo(x + TILE_SIZE - 8, y + TILE_SIZE - 12); ctx.stroke();
  }
}

function drawGroundProp(x, y, c, r, h, theme) {
  const kind = theme.props || 'conduit';
  const ox = 6 + h * (TILE_SIZE - 24);
  const oy = 5 + ((h * 7919) % (TILE_SIZE - 22));
  ctx.save();
  if (kind === 'desert') {
    ctx.fillStyle = 'rgba(120,113,108,0.30)';
    ctx.beginPath(); ctx.moveTo(x + ox, y + oy + 14); ctx.lineTo(x + ox + 6, y + oy + 4); ctx.lineTo(x + ox + 13, y + oy + 14); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(168,162,158,0.22)';
    ctx.beginPath(); ctx.arc(x + ox + 18, y + oy + 15, 2.2, 0, Math.PI * 2); ctx.fill();
    if (h > 0.965) {
      ctx.fillStyle = 'rgba(226,232,240,0.22)';
      ctx.beginPath(); ctx.arc(x + ox + 4, y + oy + 4, 4.2, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(15,23,42,0.5)';
      ctx.beginPath(); ctx.arc(x + ox + 2.4, y + oy + 3, 0.9, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x + ox + 5.8, y + oy + 3, 0.9, 0, Math.PI * 2); ctx.fill();
    }
  } else if (kind === 'forest') {
    ctx.fillStyle = 'rgba(52,211,153,0.22)';
    ctx.beginPath(); ctx.ellipse(x + ox + 4, y + oy + 4, 5, 2.4, -0.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(163,230,53,0.20)';
    ctx.beginPath(); ctx.ellipse(x + ox + 11, y + oy + 8, 4.2, 2, 0.6, 0, Math.PI * 2); ctx.fill();
    if (h > 0.95) {
      ctx.fillStyle = 'rgba(244,114,182,0.26)';
      ctx.beginPath(); ctx.arc(x + ox + 7, y + oy + 12, 2.2, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(148,163,184,0.28)'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(x + ox + 7, y + oy + 14); ctx.lineTo(x + ox + 7, y + oy + 19); ctx.stroke();
    }
  } else if (kind === 'ice') {
    ctx.fillStyle = 'rgba(165,243,252,0.28)';
    ctx.beginPath(); ctx.moveTo(x + ox + 6, y + oy + 16); ctx.lineTo(x + ox + 9, y + oy + 2); ctx.lineTo(x + ox + 13, y + oy + 16); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x + ox + 1, y + oy + 16); ctx.lineTo(x + ox + 4, y + oy + 7); ctx.lineTo(x + ox + 7, y + oy + 16); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(224,242,254,0.35)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x + ox + 9, y + oy + 3); ctx.lineTo(x + ox + 10, y + oy + 14); ctx.stroke();
  } else if (kind === 'volcano') {
    ctx.fillStyle = 'rgba(24,12,16,0.55)';
    ctx.beginPath(); ctx.moveTo(x + ox, y + oy + 16); ctx.lineTo(x + ox + 7, y + oy + 1); ctx.lineTo(x + ox + 15, y + oy + 16); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = `rgba(251,113,133,${0.22 + 0.08 * Math.sin(nowT * 2.4 + c)})`; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(x + ox + 8, y + oy + 5); ctx.lineTo(x + ox + 5, y + oy + 12); ctx.lineTo(x + ox + 9, y + oy + 15); ctx.stroke();
  } else if (kind === 'shrine') {
    ctx.fillStyle = 'rgba(148,163,184,0.22)';
    ctx.fillRect(x + ox + 4, y + oy + 8, 10, 8);
    ctx.fillStyle = 'rgba(251,191,36,0.35)';
    ctx.fillRect(x + ox + 6, y + oy + 10, 6, 4);
    ctx.fillStyle = 'rgba(148,163,184,0.30)';
    ctx.beginPath(); ctx.moveTo(x + ox + 2, y + oy + 8); ctx.lineTo(x + ox + 16, y + oy + 8); ctx.lineTo(x + ox + 13, y + oy + 5); ctx.lineTo(x + ox + 5, y + oy + 5); ctx.closePath(); ctx.fill();
  } else if (kind === 'city') {
    ctx.strokeStyle = 'rgba(148,163,184,0.26)'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.arc(x + ox + 8, y + oy + 8, 6, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + ox + 3, y + oy + 8); ctx.lineTo(x + ox + 13, y + oy + 8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + ox + 8, y + oy + 3); ctx.lineTo(x + ox + 8, y + oy + 13); ctx.stroke();
  } else if (kind === 'harbor') {
    ctx.strokeStyle = 'rgba(45,212,191,0.22)'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.ellipse(x + ox + 8, y + oy + 8, 7, 4.5, h * 2, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(x + ox + 8, y + oy + 8, 4, 2.4, h * 2, 0, Math.PI * 2); ctx.stroke();
    if (h > 0.96) {
      ctx.fillStyle = 'rgba(45,212,191,0.12)';
      ctx.beginPath(); ctx.ellipse(x + ox + 2, y + oy + 2, 9, 3.4, 0.3, 0, Math.PI * 2); ctx.fill();
    }
  } else if (kind === 'orbit') {
    ctx.strokeStyle = 'rgba(192,132,252,0.18)'; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(x + ox, y + oy + 6); ctx.lineTo(x + ox + 13, y + oy + 6); ctx.stroke();
    ctx.fillStyle = 'rgba(192,132,252,0.22)';
    ctx.beginPath(); ctx.arc(x + ox + 13, y + oy + 6, 2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + ox, y + oy + 6, 1.6, 0, Math.PI * 2); ctx.fill();
  } else {
    ctx.strokeStyle = 'rgba(56,189,248,0.16)'; ctx.lineWidth = 1.2;
    ctx.strokeRect(x + ox, y + oy + 4, 12, 8);
    ctx.beginPath(); ctx.moveTo(x + ox + 3, y + oy + 7); ctx.lineTo(x + ox + 9, y + oy + 7); ctx.stroke();
    ctx.fillStyle = 'rgba(56,189,248,0.30)';
    ctx.beginPath(); ctx.arc(x + ox + 10, y + oy + 10, 1.2, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}

function drawTiles(minC, maxC, minR, maxR) {
  const theme = match.theme || MAPS[0];
  const x0 = minC * TILE_SIZE, y0 = minR * TILE_SIZE;
  const w = (maxC - minC + 1) * TILE_SIZE, h = (maxR - minR + 1) * TILE_SIZE;
  ctx.drawImage(ensureGroundLayer(), x0, y0, w, h, x0, y0, w, h);
  for (let r = minR; r <= maxR; r++) {
    for (let c = minC; c <= maxC; c++) {
      const x = c * TILE_SIZE, y = r * TILE_SIZE;
      const t = grid[r][c];
      const borderCell = c === 0 || r === 0 || c === GRID_SIZE - 1 || r === GRID_SIZE - 1;
      if (!borderCell && (t === CELL.FLOOR || t === CELL.BUSH)) drawHazardFloor(x, y, c, r);
      if (t === CELL.PILLAR) drawPillar(x, y, c, r, theme);
      else if (t === CELL.CRATE) drawCrate(x, y, c, r, theme);
      else if (t === CELL.BUSH) drawBush(x, y, c, r, theme);
      else if (t === CELL.CRUSHED) {
        if (borderCell) drawBorderTile(x, y, c, r, theme);
        else drawCrushed(x, y);
      }
      else if (t === CELL.AIRDROP_CRATE) drawAirdropCrate(x, y);
      if (cryoTiles.has(`${c},${r}`)) drawCryoTile(x, y);
    }
  }
}

/* Piso, textura e grade são estáticos: desenhar tudo de novo a cada frame
   custava ~14 ms no celular. Ficam num canvas offscreen e são reutilizados
   até a grade/mapa mudar; só o que anima (props, lava, água, cryo) fica
   no desenho ao vivo. */
let groundLayer = null;
let groundLayerKey = '';
function ensureGroundLayer() {
  const theme = match.theme || MAPS[0];
  const tex = biomeImageFor(theme.id);
  const key = `${theme.id}|${GRID_SIZE}|${gridRev}|${tex ? 1 : 0}`;
  if (groundLayer && groundLayerKey === key) return groundLayer;
  if (!groundLayer) groundLayer = document.createElement('canvas');
  if (groundLayer.width !== WORLD_PX) { groundLayer.width = WORLD_PX; groundLayer.height = WORLD_PX; }
  const layerCtx = groundLayer.getContext('2d');
  const prevCtx = ctx;
  ctx = layerCtx;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, WORLD_PX, WORLD_PX);
  const floorA = theme.floor[0], floorB = theme.floor[1];
  const srcW = tex ? tex.width / GRID_SIZE : 0;
  const srcH = tex ? tex.height / GRID_SIZE : 0;
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const x = c * TILE_SIZE, y = r * TILE_SIZE;
      const t = grid[r][c];
      const borderCell = c === 0 || r === 0 || c === GRID_SIZE - 1 || r === GRID_SIZE - 1;
      ctx.fillStyle = (c + r) % 2 === 0 ? floorA : floorB;
      ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
      if (!borderCell && (t === CELL.FLOOR || t === CELL.BUSH)) {
        if (tex) {
          ctx.save();
          ctx.globalAlpha = 0.62;
          ctx.drawImage(tex, c * srcW, r * srcH, srcW, srcH, x, y, TILE_SIZE, TILE_SIZE);
          ctx.globalAlpha = 1;
          ctx.fillStyle = 'rgba(2,6,23,0.28)';
          ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
          ctx.restore();
        } else {
          drawGround(x, y, c, r, theme);
        }
      }
      ctx.strokeStyle = theme.glow;
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 0.5, y + 0.5, TILE_SIZE - 1, TILE_SIZE - 1);
    }
  }
  ctx = prevCtx;
  groundLayerKey = key;
  return groundLayer;
}

function drawHazardFloor(x, y, c, r) {
  const hz = hazardCellType(c, r);
  if (!hz) return;
  const h = tileHash(c + 5, r + 11);
  if (hz === 'lava') {
    const pulse = 0.55 + 0.18 * Math.sin(nowT * 2.2 + h * 9);
    ctx.save();
    const g = ctx.createRadialGradient(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 3, x + TILE_SIZE / 2, y + TILE_SIZE / 2, TILE_SIZE * 0.55);
    g.addColorStop(0, `rgba(254,240,138,${0.55 + pulse * 0.3})`);
    g.addColorStop(0.45, `rgba(251,146,60,${0.5 + pulse * 0.2})`);
    g.addColorStop(1, 'rgba(225,29,72,0.08)');
    ctx.fillStyle = g;
    rr(x + 3, y + 3, TILE_SIZE - 6, TILE_SIZE - 6, 11); ctx.fill();
    ctx.strokeStyle = 'rgba(251,113,133,0.8)'; ctx.lineWidth = 1.4;
    rr(x + 3, y + 3, TILE_SIZE - 6, TILE_SIZE - 6, 11); ctx.stroke();
    ctx.fillStyle = `rgba(254,249,195,${0.45 + 0.3 * Math.sin(nowT * 3 + h * 12)})`;
    [[16, 30, 3], [32, 18, 2.2], [26, 36, 1.8]].forEach(([ox, oy, rad], i) => {
      const bob = Math.sin(nowT * 2.4 + h * 7 + i) * 1.5;
      ctx.beginPath(); ctx.arc(x + ox, y + oy + bob, rad, 0, Math.PI * 2); ctx.fill();
    });
    ctx.restore();
  } else if (hz === 'water') {
    const ph = nowT * 1.6 + h * 8;
    ctx.save();
    ctx.fillStyle = 'rgba(3,32,44,0.78)';
    rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 12); ctx.fill();
    ctx.fillStyle = 'rgba(13,148,136,0.35)';
    rr(x + 5, y + 5, TILE_SIZE - 10, TILE_SIZE - 10, 10); ctx.fill();
    ctx.strokeStyle = 'rgba(94,234,212,0.85)'; ctx.lineWidth = 1.8;
    rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 12); ctx.stroke();
    ctx.strokeStyle = 'rgba(165,243,252,0.7)'; ctx.lineWidth = 1.4;
    for (let i = 0; i < 3; i++) {
      const oy = y + 15 + i * 11 + Math.sin(ph + i * 1.6) * 2;
      ctx.beginPath();
      ctx.moveTo(x + 8, oy);
      ctx.quadraticCurveTo(x + 24, oy - 4, x + TILE_SIZE - 8, oy);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.beginPath(); ctx.arc(x + 18 + Math.sin(ph) * 8, y + 21, 1.8, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }
}

function drawPillar(x, y, c, r, theme = MAPS[0]) {
  const pal = theme.pillar || ['#1e293b', '#334155', '#475569'];
  const style = theme.pillarStyle || 'tech';
  const h = tileHash(c, r);
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.35)'; rr(x + 4, y + 6, TILE_SIZE - 6, TILE_SIZE - 6, 9); ctx.fill();
  if (style === 'tech') {
    ctx.fillStyle = pal[0]; rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 9); ctx.fill();
    ctx.strokeStyle = pal[1]; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = pal[2]; rr(x + 8, y + 8, TILE_SIZE - 16, 10, 4); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.22)';
    [[12, 34], [TILE_SIZE - 12, 34], [12, TILE_SIZE - 12], [TILE_SIZE - 12, TILE_SIZE - 12]].forEach(([ox, oy]) => {
      ctx.beginPath(); ctx.arc(x + ox, y + oy, 2, 0, Math.PI * 2); ctx.fill();
    });
    ctx.fillStyle = theme.accent; ctx.globalAlpha = 0.55 + 0.15 * Math.sin(nowT * 2.2 + c);
    ctx.fillRect(x + 6, y + 6, 4, 4); ctx.fillRect(x + TILE_SIZE - 10, y + 6, 4, 4);
    ctx.globalAlpha = 1;
  } else if (style === 'sandstone') {
    ctx.fillStyle = pal[0]; rr(x + 3, y + 4, TILE_SIZE - 6, TILE_SIZE - 8, 12); ctx.fill();
    ctx.fillStyle = pal[1]; rr(x + 8, y + 9, TILE_SIZE - 18, TILE_SIZE - 20, 10); ctx.fill();
    ctx.fillStyle = pal[2]; ctx.globalAlpha = 0.45;
    rr(x + 10, y + 8, TILE_SIZE - 26, 6, 3); ctx.fill(); ctx.globalAlpha = 1;
    ctx.strokeStyle = 'rgba(0,0,0,0.28)'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(x + 14, y + 16); ctx.lineTo(x + 20, y + 24); ctx.lineTo(x + 16, y + 33); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + 31, y + 13); ctx.lineTo(x + 35, y + 21); ctx.stroke();
    if (h > 0.6) {
      ctx.fillStyle = 'rgba(120,113,108,0.35)';
      ctx.beginPath(); ctx.arc(x + 12, y + 38, 2.4, 0, Math.PI * 2); ctx.fill();
    }
  } else if (style === 'ice') {
    const cx = x + TILE_SIZE / 2, cy = y + TILE_SIZE / 2;
    ctx.fillStyle = pal[0];
    ctx.beginPath();
    ctx.moveTo(cx - 16, cy + 16); ctx.lineTo(cx - 17, cy - 4); ctx.lineTo(cx - 5, cy - 18);
    ctx.lineTo(cx + 12, cy - 15); ctx.lineTo(cx + 17, cy + 6); ctx.lineTo(cx + 4, cy + 18);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = pal[1];
    ctx.beginPath();
    ctx.moveTo(cx - 10, cy + 12); ctx.lineTo(cx - 11, cy - 2); ctx.lineTo(cx - 2, cy - 12);
    ctx.lineTo(cx + 7, cy - 10); ctx.lineTo(cx + 10, cy + 4); ctx.lineTo(cx + 1, cy + 13);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(224,242,254,0.45)'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(cx - 5, cy - 17); ctx.lineTo(cx - 3, cy - 4); ctx.lineTo(cx + 6, cy + 10); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.beginPath(); ctx.arc(cx + 7, cy - 8, 1.6, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'obsidian') {
    ctx.fillStyle = pal[0];
    ctx.beginPath();
    ctx.moveTo(x + 8, y + 40); ctx.lineTo(x + 5, y + 20); ctx.lineTo(x + 14, y + 5);
    ctx.lineTo(x + 28, y + 3); ctx.lineTo(x + 42, y + 16); ctx.lineTo(x + 40, y + 38);
    ctx.lineTo(x + 28, y + 44); ctx.lineTo(x + 14, y + 44); ctx.closePath(); ctx.fill();
    ctx.fillStyle = pal[1];
    ctx.beginPath();
    ctx.moveTo(x + 12, y + 36); ctx.lineTo(x + 11, y + 21); ctx.lineTo(x + 19, y + 9);
    ctx.lineTo(x + 30, y + 8); ctx.lineTo(x + 38, y + 18); ctx.lineTo(x + 36, y + 34);
    ctx.lineTo(x + 26, y + 40); ctx.lineTo(x + 16, y + 39); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = `rgba(251,113,133,${0.35 + 0.1 * Math.sin(nowT * 2 + c)})`; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(x + 18, y + 10); ctx.lineTo(x + 24, y + 22); ctx.lineTo(x + 20, y + 36); ctx.stroke();
    ctx.strokeStyle = 'rgba(0,0,0,0.4)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(x + 30, y + 9); ctx.lineTo(x + 34, y + 20); ctx.stroke();
  } else if (style === 'tree') {
    const sway = Math.sin(nowT * 1.1 + c * 0.8 + r * 1.4) * 2.2;
    ctx.fillStyle = '#31241a'; rr(x + 18, y + 18, 12, 26, 4); ctx.fill();
    ctx.fillStyle = '#241a12'; rr(x + 14, y + 40, 20, 5, 3); ctx.fill();
    ctx.fillStyle = pal[0];
    ctx.beginPath(); ctx.arc(x + 15 + sway, y + 22, 12, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = pal[1];
    ctx.beginPath(); ctx.arc(x + 33 + sway, y + 20, 11, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + 24 + sway * 1.2, y + 10, 13, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = pal[2]; ctx.globalAlpha = 0.22;
    ctx.beginPath(); ctx.arc(x + 24 + sway * 1.2, y + 6, 7, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
  } else if (style === 'lantern') {
    ctx.fillStyle = pal[0]; rr(x + 10, y + 32, 28, 12, 4); ctx.fill();
    ctx.fillStyle = pal[1]; rr(x + 20, y + 20, 8, 14, 3); ctx.fill();
    const glow = 0.16 + 0.05 * Math.sin(nowT * 2.4 + c);
    ctx.fillStyle = `rgba(251,191,36,${glow})`;
    ctx.beginPath(); ctx.arc(x + 24, y + 16, 15, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fde68a'; ctx.globalAlpha = 0.85;
    rr(x + 15, y + 9, 18, 12, 3); ctx.fill(); ctx.globalAlpha = 1;
    ctx.fillStyle = pal[2]; rr(x + 12, y + 5, 24, 6, 3); ctx.fill();
  } else if (style === 'building') {
    ctx.fillStyle = pal[0]; rr(x + 3, y + 2, TILE_SIZE - 6, TILE_SIZE - 5, 5); ctx.fill();
    ctx.fillStyle = pal[1]; rr(x + 6, y + 5, TILE_SIZE - 20, TILE_SIZE - 11, 3); ctx.fill();
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 3; j++) {
        const lit = tileHash(c + j * 7, r + i * 5) > 0.55;
        ctx.fillStyle = lit ? 'rgba(251,191,36,0.55)' : 'rgba(15,23,42,0.65)';
        ctx.fillRect(x + 9 + j * 8, y + 9 + i * 14, 5, 7);
      }
    }
    ctx.fillStyle = theme.accent; ctx.globalAlpha = 0.7;
    ctx.fillRect(x + TILE_SIZE - 12, y + 8, 3, 3); ctx.globalAlpha = 1;
    ctx.strokeStyle = 'rgba(0,0,0,0.4)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x + TILE_SIZE - 11, y + 6); ctx.lineTo(x + TILE_SIZE - 11, y + 2); ctx.stroke();
  } else if (style === 'container') {
    ctx.fillStyle = pal[0]; rr(x + 2, y + 9, TILE_SIZE - 4, TILE_SIZE - 17, 4); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.28)'; ctx.lineWidth = 1;
    for (let i = 1; i < 6; i++) {
      const px = x + 6 + i * 6;
      ctx.beginPath(); ctx.moveTo(px, y + 11); ctx.lineTo(px, y + TILE_SIZE - 10); ctx.stroke();
    }
    ctx.fillStyle = pal[1]; ctx.globalAlpha = 0.55;
    ctx.fillRect(x + 3, y + 10, TILE_SIZE - 6, 4); ctx.globalAlpha = 1;
    ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(x + 24, y + 11); ctx.lineTo(x + 24, y + TILE_SIZE - 10); ctx.stroke();
    ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(x + 4, y + 14, 2, 14);
    ctx.fillStyle = theme.accent; ctx.globalAlpha = 0.5;
    ctx.fillRect(x + 10, y + 24, 12, 3); ctx.globalAlpha = 1;
  } else {
    ctx.fillStyle = pal[0]; rr(x + 3, y + 3, TILE_SIZE - 6, TILE_SIZE - 6, 6); ctx.fill();
    ctx.fillStyle = pal[1]; rr(x + 8, y + 8, TILE_SIZE - 16, TILE_SIZE - 16, 4); ctx.fill();
    ctx.fillStyle = 'rgba(226,232,240,0.35)';
    [[10, 10], [TILE_SIZE - 10, 10], [10, TILE_SIZE - 10], [TILE_SIZE - 10, TILE_SIZE - 10]].forEach(([ox, oy]) => {
      ctx.beginPath(); ctx.arc(x + ox, y + oy, 1.7, 0, Math.PI * 2); ctx.fill();
    });
    ctx.save();
    ctx.beginPath(); ctx.rect(x + 11, y + TILE_SIZE - 17, TILE_SIZE - 22, 6); ctx.clip();
    for (let i = -1; i < 6; i++) {
      ctx.fillStyle = i % 2 ? 'rgba(251,191,36,0.55)' : 'rgba(15,23,42,0.55)';
      ctx.beginPath();
      ctx.moveTo(x + 11 + i * 8, y + TILE_SIZE - 17);
      ctx.lineTo(x + 15 + i * 8, y + TILE_SIZE - 17);
      ctx.lineTo(x + 11 + i * 8, y + TILE_SIZE - 11);
      ctx.lineTo(x + 7 + i * 8, y + TILE_SIZE - 11);
      ctx.closePath(); ctx.fill();
    }
    ctx.restore();
    ctx.fillStyle = theme.accent; ctx.globalAlpha = 0.6;
    ctx.fillRect(x + 16, y + 12, TILE_SIZE - 32, 2); ctx.globalAlpha = 1;
  }
  ctx.restore();
}

function drawCrate(x, y, c, r, theme = MAPS[0]) {
  const accent = theme.accent;
  const style = theme.crateStyle || 'wood';
  const h = tileHash(c, r);
  const body = (fill, inset, rad) => {
    ctx.fillStyle = fill;
    rr(x + inset, y + inset, TILE_SIZE - inset * 2, TILE_SIZE - inset * 2, rad);
    ctx.fill();
  };
  const drawX = (color, w) => {
    ctx.strokeStyle = color; ctx.lineWidth = w;
    ctx.beginPath();
    ctx.moveTo(x + 10, y + 10); ctx.lineTo(x + TILE_SIZE - 10, y + TILE_SIZE - 10);
    ctx.moveTo(x + TILE_SIZE - 10, y + 10); ctx.lineTo(x + 10, y + TILE_SIZE - 10);
    ctx.stroke();
  };
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.35)'; rr(x + 4, y + 5, TILE_SIZE - 6, TILE_SIZE - 6, 8); ctx.fill();
  if (style === 'wood') {
    body('#5b2c10', 3, 8);
    body('#8a4a16', 7, 5);
    drawX('#d97706', 2);
    ctx.globalAlpha = 0.8; ctx.fillStyle = accent;
    ctx.fillRect(x + TILE_SIZE / 2 - 2, y + 4, 4, TILE_SIZE - 8);
    ctx.globalAlpha = 1;
  } else if (style === 'neon') {
    body('#141d2e', 3, 8);
    body('#1e2b42', 7, 5);
    ctx.strokeStyle = 'rgba(56,189,248,0.35)'; ctx.lineWidth = 1;
    rr(x + 3, y + 3, TILE_SIZE - 6, TILE_SIZE - 6, 8); ctx.stroke();
    drawX(accent, 2.2);
    ctx.fillStyle = 'rgba(255,255,255,0.28)';
    [[8, 8], [TILE_SIZE - 8, 8], [8, TILE_SIZE - 8], [TILE_SIZE - 8, TILE_SIZE - 8]].forEach(([ox, oy]) => {
      ctx.beginPath(); ctx.arc(x + ox, y + oy, 1.5, 0, Math.PI * 2); ctx.fill();
    });
  } else if (style === 'metal') {
    body('#3f4652', 3, 7);
    body('#59616f', 7, 4);
    drawX('#fbbf24', 2.2);
    ctx.fillStyle = 'rgba(15,23,42,0.55)';
    ctx.fillRect(x + 4, y + 8, TILE_SIZE - 8, 3);
    ctx.fillStyle = 'rgba(251,191,36,0.5)';
    for (let i = 0; i < 4; i++) ctx.fillRect(x + 8 + i * 9, y + 9, 4, 2);
    ctx.fillStyle = 'rgba(255,255,255,0.22)';
    [[7, 20], [TILE_SIZE - 7, 20], [7, TILE_SIZE - 7], [TILE_SIZE - 7, TILE_SIZE - 7]].forEach(([ox, oy]) => {
      ctx.beginPath(); ctx.arc(x + ox, y + oy, 1.3, 0, Math.PI * 2); ctx.fill();
    });
  } else if (style === 'ice') {
    body('rgba(125,211,252,0.32)', 3, 8);
    body('rgba(224,242,254,0.22)', 7, 5);
    ctx.strokeStyle = 'rgba(224,242,254,0.55)'; ctx.lineWidth = 1.4;
    rr(x + 3, y + 3, TILE_SIZE - 6, TILE_SIZE - 6, 8); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 1.1;
    ctx.beginPath(); ctx.moveTo(x + 12, y + 30 + h * 4); ctx.lineTo(x + 20, y + 20); ctx.lineTo(x + 33, y + 25); ctx.stroke();
    drawX('rgba(240,249,255,0.85)', 2);
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.beginPath(); ctx.arc(x + 14, y + 12, 1.4, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'obsidian') {
    body('#1a1014', 3, 8);
    body('#2a161d', 7, 5);
    drawX(`rgba(251,113,133,${0.7 + 0.15 * Math.sin(nowT * 2 + c)})`, 2.4);
    ctx.strokeStyle = 'rgba(251,113,133,0.35)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x + 8, y + 34); ctx.lineTo(x + 18, y + 40); ctx.stroke();
    ctx.fillStyle = 'rgba(254,205,211,0.35)';
    ctx.beginPath(); ctx.arc(x + TILE_SIZE / 2 - 2, y + 4, 2.4, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'bamboo') {
    body('#4d5f2a', 3, 7);
    body('#6b7f3d', 7, 4);
    ctx.strokeStyle = 'rgba(34,48,14,0.65)'; ctx.lineWidth = 1.4;
    for (let i = 0; i < 3; i++) {
      const oy = y + 14 + i * 9;
      ctx.beginPath(); ctx.moveTo(x + 8, oy); ctx.lineTo(x + TILE_SIZE - 8, oy); ctx.stroke();
    }
    drawX('#22300f', 2);
    ctx.fillStyle = 'rgba(22,101,52,0.55)';
    ctx.fillRect(x + 4, y + 18, 3, TILE_SIZE - 36);
    ctx.fillRect(x + TILE_SIZE - 7, y + 18, 3, TILE_SIZE - 36);
  } else if (style === 'dock') {
    body('#5b3a1c', 3, 7);
    body('#7a5227', 7, 4);
    ctx.strokeStyle = 'rgba(45,212,191,0.35)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(x + 8, y + 12); ctx.lineTo(x + TILE_SIZE - 8, y + 12); ctx.stroke();
    drawX('#3b2512', 2);
    ctx.strokeStyle = 'rgba(214,177,106,0.5)'; ctx.lineWidth = 2.4;
    ctx.beginPath(); ctx.moveTo(x + 9, y + TILE_SIZE - 9); ctx.lineTo(x + TILE_SIZE - 9, y + 20); ctx.stroke();
  } else {
    body('#b6c2d1', 3, 7);
    body('#e2e8f0', 7, 4);
    ctx.fillStyle = 'rgba(249,115,22,0.75)';
    ctx.fillRect(x + 4, y + 8, TILE_SIZE - 8, 3);
    ctx.fillRect(x + 4, y + TILE_SIZE - 11, TILE_SIZE - 8, 3);
    for (let i = 0; i < 4; i++) ctx.fillRect(x + 7 + i * 9, y + 9, 4, 2);
    drawX('#ea580c', 2.2);
    ctx.fillStyle = 'rgba(15,23,42,0.35)';
    ctx.beginPath(); ctx.arc(x + TILE_SIZE - 12, y + TILE_SIZE - 12, 2.2, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}

function drawBush(x, y, c, r, theme = MAPS[0]) {
  const style = theme.bushStyle || 'leaf';
  const sway = Math.sin(nowT * 1.6 + c * 0.7 + r * 1.1) * 3;
  ctx.save();
  if (style === 'leaf' || style === 'jungle') {
    ctx.fillStyle = '#0d3d24'; rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 12); ctx.fill();
    ctx.fillStyle = style === 'jungle' ? 'rgba(34,197,94,0.62)' : 'rgba(34,197,94,0.55)';
    [[14, 30], [26, 20], [34, 32], [22, 38]].forEach(([ox, oy], i) => {
      ctx.beginPath(); ctx.arc(x + ox + sway * (i % 2 ? 1 : -1), y + oy, 9 - i, 0, Math.PI * 2); ctx.fill();
    });
    ctx.fillStyle = theme.glow;
    ctx.beginPath(); ctx.arc(x + 20 + sway, y + 18, 5, 0, Math.PI * 2); ctx.fill();
    if (style === 'jungle') {
      ctx.fillStyle = 'rgba(250,204,21,0.55)';
      ctx.beginPath(); ctx.arc(x + 30 + sway * 0.4, y + 14, 1.8, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(244,114,182,0.5)';
      ctx.beginPath(); ctx.arc(x + 12 + sway * 0.6, y + 24, 1.6, 0, Math.PI * 2); ctx.fill();
    }
    ctx.strokeStyle = 'rgba(134,239,172,0.35)'; ctx.lineWidth = 1.5;
    rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 12); ctx.stroke();
  } else if (style === 'dry') {
    ctx.fillStyle = '#3a3020'; rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 10); ctx.fill();
    ctx.strokeStyle = 'rgba(212,168,106,0.6)'; ctx.lineWidth = 1.6;
    for (let i = 0; i < 7; i++) {
      const ox = 8 + i * 5.2;
      const oy = 38 - ((c * 13 + r * 7 + i * 11) % 10);
      ctx.beginPath();
      ctx.moveTo(x + ox, y + oy);
      ctx.quadraticCurveTo(x + ox + sway * 0.5, y + oy - 8, x + ox + 2 + sway * 0.7, y + oy - 14);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(251,191,36,0.22)';
    ctx.beginPath(); ctx.arc(x + 12, y + 12, 2.6, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'snow') {
    ctx.fillStyle = '#1a3a3e'; rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 12); ctx.fill();
    ctx.fillStyle = 'rgba(56,118,108,0.9)';
    [[14, 30], [26, 20], [34, 32], [22, 38]].forEach(([ox, oy], i) => {
      ctx.beginPath(); ctx.arc(x + ox + sway * (i % 2 ? 1 : -1), y + oy, 9 - i, 0, Math.PI * 2); ctx.fill();
    });
    ctx.fillStyle = 'rgba(240,249,255,0.82)';
    [[14, 26], [27, 16], [34, 28]].forEach(([ox, oy], i) => {
      ctx.beginPath(); ctx.arc(x + ox + sway * (i % 2 ? 1 : -1), y + oy, 6 - i, 0, Math.PI * 2); ctx.fill();
    });
    ctx.fillStyle = 'rgba(224,242,254,0.5)';
    ctx.beginPath(); ctx.arc(x + 38, y + 36, 1.4, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'charred') {
    ctx.fillStyle = '#1a1014'; rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 10); ctx.fill();
    ctx.strokeStyle = 'rgba(87,45,54,0.8)'; ctx.lineWidth = 1.6;
    [[14, 36, 12, 18], [24, 38, 27, 14], [34, 36, 31, 20]].forEach(([x1, y1, x2, y2]) => {
      ctx.beginPath(); ctx.moveTo(x + x1, y + y1); ctx.lineTo(x + x2 + sway * 0.3, y + y2); ctx.stroke();
    });
    ctx.fillStyle = `rgba(251,146,60,${0.4 + 0.2 * Math.sin(nowT * 3 + c)})`;
    ctx.beginPath(); ctx.arc(x + 20 + sway, y + 24, 1.7, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + 33, y + 30, 1.3, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'blossom') {
    ctx.fillStyle = '#123321'; rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 12); ctx.fill();
    ctx.fillStyle = 'rgba(34,197,94,0.45)';
    [[14, 30], [26, 20], [34, 32], [22, 38]].forEach(([ox, oy], i) => {
      ctx.beginPath(); ctx.arc(x + ox + sway * (i % 2 ? 1 : -1), y + oy, 9 - i, 0, Math.PI * 2); ctx.fill();
    });
    ctx.fillStyle = 'rgba(249,168,212,0.75)';
    [[14, 22], [28, 16], [35, 26], [20, 34]].forEach(([ox, oy], i) => {
      ctx.beginPath(); ctx.arc(x + ox + sway * (i % 2 ? 1 : -1), y + oy, 4 - (i % 2), 0, Math.PI * 2); ctx.fill();
    });
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.beginPath(); ctx.arc(x + 14 + sway, y + 22, 1.2, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'citybush') {
    ctx.fillStyle = '#16351f'; rr(x + 3, y + 3, TILE_SIZE - 6, TILE_SIZE - 6, 7); ctx.fill();
    ctx.fillStyle = 'rgba(34,197,94,0.5)';
    rr(x + 6, y + 6, TILE_SIZE - 12, TILE_SIZE - 12, 5); ctx.fill();
    ctx.fillStyle = 'rgba(20,83,45,0.55)';
    for (let i = 0; i < 3; i++) ctx.fillRect(x + 7 + i * 11, y + 10, 2, TILE_SIZE - 20);
    ctx.fillStyle = theme.accent; ctx.globalAlpha = 0.35;
    ctx.fillRect(x + 6, y + TILE_SIZE - 10, TILE_SIZE - 12, 2); ctx.globalAlpha = 1;
  } else if (style === 'reed') {
    ctx.fillStyle = '#123a35'; rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 10); ctx.fill();
    ctx.strokeStyle = 'rgba(163,196,102,0.55)'; ctx.lineWidth = 1.4;
    for (let i = 0; i < 6; i++) {
      const ox = 8 + i * 6;
      const tip = y + 10 + ((c * 7 + r * 11 + i * 5) % 8);
      ctx.beginPath();
      ctx.moveTo(x + ox, y + TILE_SIZE - 6);
      ctx.quadraticCurveTo(x + ox + sway * 0.6, y + 28, x + ox + 2 + sway, tip);
      ctx.stroke();
      ctx.fillStyle = 'rgba(132,204,22,0.35)';
      ctx.beginPath(); ctx.ellipse(x + ox + 2 + sway, tip + 2, 1.8, 4, 0, 0, Math.PI * 2); ctx.fill();
    }
  } else {
    ctx.fillStyle = '#1c2430'; rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 10); ctx.fill();
    ctx.strokeStyle = 'rgba(148,163,184,0.35)'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.arc(x + 24, y + 26, 12, 0, Math.PI * 2); ctx.stroke();
    for (let i = 0; i < 4; i++) {
      ctx.beginPath(); ctx.moveTo(x + 14, y + 20 + i * 4); ctx.lineTo(x + 34, y + 20 + i * 4); ctx.stroke();
    }
    ctx.fillStyle = 'rgba(226,232,240,0.12)';
    for (let i = 0; i < 3; i++) {
      const px = x + 18 + Math.sin(nowT * 1.4 + i * 2 + c) * 8;
      const py = y + 10 - ((nowT * 14 + i * 9 + c * 3) % 18);
      ctx.beginPath(); ctx.arc(px, py, 4 + i, 0, Math.PI * 2); ctx.fill();
    }
  }
  ctx.restore();
}

function drawCrushed(x, y) {
  ctx.fillStyle = '#0a0d14'; ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  ctx.strokeStyle = 'rgba(127,29,29,0.55)'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(x + 4, y + TILE_SIZE - 6); ctx.lineTo(x + TILE_SIZE - 6, y + 4); ctx.stroke();
  ctx.strokeStyle = 'rgba(248,113,113,0.18)'; ctx.lineWidth = 1;
  ctx.strokeRect(x + 1.5, y + 1.5, TILE_SIZE - 3, TILE_SIZE - 3);
}

/* Moldura externa da arena: cada bioma tem uma "borda" com identidade própria
   (mar no Porto, vazio estelar na Estação, lava no Vulcão etc.). Só decorativa. */
function drawBorderTile(x, y, c, r, theme) {
  const style = theme.border || 'tech';
  const h = tileHash(c + 1, r + 3);
  let base = '#0b1220';
  if (style === 'sand') base = '#2a1f15';
  else if (style === 'ice') base = '#102b33';
  else if (style === 'lava') base = '#1a0d12';
  else if (style === 'jungle') base = '#0b1a12';
  else if (style === 'shrine') base = '#221626';
  else if (style === 'concrete') base = '#1a1b24';
  else if (style === 'water') base = '#0a2530';
  else if (style === 'space') base = '#05060d';
  ctx.save();
  ctx.fillStyle = base; ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  if (style === 'sand') {
    ctx.strokeStyle = 'rgba(251,191,36,0.14)'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(x + 2, y + 16); ctx.quadraticCurveTo(x + 24, y + 11, x + 46, y + 18); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + 2, y + 34); ctx.quadraticCurveTo(x + 24, y + 30, x + 46, y + 37); ctx.stroke();
    ctx.fillStyle = 'rgba(120,113,108,0.35)';
    ctx.beginPath(); ctx.arc(x + 10 + h * 24, y + 24, 2.4, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'ice') {
    ctx.strokeStyle = 'rgba(224,242,254,0.30)'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(x + 4, y + 40); ctx.lineTo(x + 20, y + 24); ctx.lineTo(x + 30, y + 30); ctx.stroke();
    ctx.fillStyle = 'rgba(224,242,254,0.5)';
    ctx.beginPath(); ctx.arc(x + 12 + h * 22, y + 12, 1.4, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'lava') {
    const glow = 0.28 + 0.08 * Math.sin(nowT * 2 + c * 0.7);
    ctx.strokeStyle = `rgba(251,113,133,${glow})`; ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.moveTo(x + 2, y + 26 + h * 8); ctx.lineTo(x + 18, y + 22); ctx.lineTo(x + 34, y + 34); ctx.lineTo(x + 46, y + 28); ctx.stroke();
    ctx.fillStyle = `rgba(251,146,60,${glow * 0.9})`;
    ctx.beginPath(); ctx.arc(x + 14 + h * 18, y + 14, 1.6, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'jungle') {
    ctx.fillStyle = 'rgba(34,197,94,0.22)';
    [[10, 26, 11], [24, 16, 13], [37, 30, 10]].forEach(([ox, oy, rad]) => {
      ctx.beginPath(); ctx.arc(x + ox, y + oy, rad, 0, Math.PI * 2); ctx.fill();
    });
    ctx.strokeStyle = 'rgba(74,222,128,0.25)'; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(x + 6, y + 2); ctx.quadraticCurveTo(x + 14, y + 18, x + 8, y + 40); ctx.stroke();
    ctx.fillStyle = 'rgba(250,204,21,0.35)';
    ctx.beginPath(); ctx.arc(x + 30, y + 22, 1.5, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'shrine') {
    ctx.strokeStyle = 'rgba(148,163,184,0.16)'; ctx.lineWidth = 1.2;
    ctx.strokeRect(x + 4, y + 6, 40, 16);
    ctx.strokeRect(x + 4, y + 24, 40, 16);
    ctx.fillStyle = 'rgba(249,168,212,0.28)';
    ctx.beginPath(); ctx.ellipse(x + 12 + h * 22, y + 36, 3, 1.5, h * 4, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'concrete') {
    ctx.strokeStyle = 'rgba(148,163,184,0.14)'; ctx.lineWidth = 1;
    ctx.strokeRect(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4);
    ctx.strokeStyle = 'rgba(0,0,0,0.45)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(x + 10, y + 8); ctx.lineTo(x + 22, y + 20); ctx.lineTo(x + 16, y + 34); ctx.stroke();
  } else if (style === 'water') {
    ctx.strokeStyle = 'rgba(94,234,212,0.20)'; ctx.lineWidth = 1.4;
    for (let i = 0; i < 3; i++) {
      const oy = y + 10 + i * 13;
      const ph = nowT * 1.4 + i * 1.7 + c * 0.5;
      ctx.beginPath();
      ctx.moveTo(x + 2, oy + Math.sin(ph) * 2);
      ctx.quadraticCurveTo(x + 24, oy - 4 + Math.sin(ph + 1) * 3, x + 46, oy + Math.sin(ph + 2) * 2);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(204,251,241,0.28)';
    ctx.beginPath(); ctx.arc(x + 12 + h * 24, y + 14 + h * 18, 1.4, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'space') {
    ctx.fillStyle = 'rgba(226,232,240,0.6)';
    [[10, 12], [32, 22], [20, 36], [38, 8]].forEach(([ox, oy], i) => {
      const tw = 0.35 + 0.35 * Math.sin(nowT * 1.6 + i * 2 + c);
      ctx.globalAlpha = tw;
      ctx.fillRect(x + ox + (h * 4 | 0), y + oy, 1.4, 1.4);
    });
    ctx.globalAlpha = 0.35; ctx.strokeStyle = 'rgba(192,132,252,0.5)'; ctx.lineWidth = 1;
    ctx.setLineDash([6, 6]);
    ctx.beginPath(); ctx.moveTo(x + 2, y + 24); ctx.lineTo(x + 46, y + 24); ctx.stroke();
    ctx.setLineDash([]);
  } else {
    ctx.strokeStyle = 'rgba(56,189,248,0.22)'; ctx.lineWidth = 1.4;
    const ox = 6 + h * 24;
    ctx.beginPath(); ctx.moveTo(x + ox, y + 6); ctx.lineTo(x + ox + 12, y + 6); ctx.lineTo(x + ox + 12, y + 18); ctx.stroke();
    ctx.fillStyle = 'rgba(56,189,248,0.35)';
    ctx.beginPath(); ctx.arc(x + ox + 12, y + 18, 1.6, 0, Math.PI * 2); ctx.fill();
  }
  // Linha interna marcando o limite jogável
  const edgeColor = {
    tech: 'rgba(56,189,248,0.35)', sand: 'rgba(251,191,36,0.22)', ice: 'rgba(165,243,252,0.35)',
    lava: 'rgba(251,113,133,0.35)', jungle: 'rgba(52,211,153,0.25)', shrine: 'rgba(249,168,212,0.28)',
    concrete: 'rgba(167,139,250,0.28)', water: 'rgba(94,234,212,0.4)', space: 'rgba(192,132,252,0.4)'
  }[style] || 'rgba(148,163,184,0.25)';
  ctx.strokeStyle = edgeColor; ctx.lineWidth = 3;
  ctx.beginPath();
  if (c === 0) { ctx.moveTo(x + TILE_SIZE - 1.5, y); ctx.lineTo(x + TILE_SIZE - 1.5, y + TILE_SIZE); }
  if (c === GRID_SIZE - 1) { ctx.moveTo(x + 1.5, y); ctx.lineTo(x + 1.5, y + TILE_SIZE); }
  if (r === 0) { ctx.moveTo(x, y + TILE_SIZE - 1.5); ctx.lineTo(x + TILE_SIZE, y + TILE_SIZE - 1.5); }
  if (r === GRID_SIZE - 1) { ctx.moveTo(x, y + 1.5); ctx.lineTo(x + TILE_SIZE, y + 1.5); }
  ctx.stroke();
  ctx.restore();
}

/* Partículas ambientais por bioma (neve, brasas, pétalas, chuva, vagalumes...).
   Determinísticas por célula: não acumulam estado nem atrapalham a leitura. */
function drawAmbience(minC, maxC, minR, maxR, theme) {
  if (!QUALITY.ambience) return;
  const kind = theme.ambience || 'spark';
  const thresh = viewW < 520 ? 0.94 : 0.9;
  ctx.save();
  for (let r = minR; r <= maxR; r++) {
    for (let c = minC; c <= maxC; c++) {
      const t = grid[r][c];
      if (t !== CELL.FLOOR && t !== CELL.BUSH) continue;
      const h = tileHash(c, r);
      if (h < thresh) continue;
      const x = c * TILE_SIZE, y = r * TILE_SIZE;
      const px = x + 8 + ((h * 677) % (TILE_SIZE - 16));
      if (kind === 'snow') {
        const yy = y + ((nowT * 26 + h * 500) % TILE_SIZE);
        ctx.fillStyle = 'rgba(224,242,254,0.55)';
        ctx.beginPath(); ctx.arc(px + Math.sin(nowT * 0.8 + h * 12) * 6, yy, 1.7, 0, Math.PI * 2); ctx.fill();
      } else if (kind === 'ember') {
        const yy = y + TILE_SIZE - ((nowT * 34 + h * 400) % (TILE_SIZE + 10));
        ctx.fillStyle = `rgba(251,146,60,${0.28 + 0.18 * Math.sin(nowT * 4 + h * 9)})`;
        ctx.beginPath(); ctx.arc(px + Math.sin(nowT + h * 20) * 3, yy, 1.6, 0, Math.PI * 2); ctx.fill();
      } else if (kind === 'firefly') {
        const xx = px + Math.sin(nowT * 0.9 + h * 17) * 9;
        const yy = y + 14 + ((h * 503) % 24) + Math.cos(nowT * 0.7 + h * 11) * 6;
        ctx.fillStyle = `rgba(190,242,100,${0.25 + 0.25 * Math.sin(nowT * 2.6 + h * 30)})`;
        ctx.beginPath(); ctx.arc(xx, yy, 1.8, 0, Math.PI * 2); ctx.fill();
      } else if (kind === 'petal') {
        const yy = y + ((nowT * 20 + h * 480) % TILE_SIZE);
        const xx = px + Math.sin(nowT * 0.6 + h * 8) * 8;
        ctx.fillStyle = 'rgba(249,168,212,0.42)';
        ctx.beginPath(); ctx.ellipse(xx, yy, 3, 1.6, nowT * 1.4 + h * 7, 0, Math.PI * 2); ctx.fill();
      } else if (kind === 'sand') {
        const xx = x + TILE_SIZE - ((nowT * 36 + h * 600) % (TILE_SIZE * 2));
        ctx.strokeStyle = 'rgba(251,191,36,0.16)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(xx, y + 16 + h * 18); ctx.lineTo(xx + 10, y + 15 + h * 18); ctx.stroke();
      } else if (kind === 'rain') {
        const yy = y + ((nowT * 120 + h * 600) % TILE_SIZE);
        ctx.strokeStyle = 'rgba(148,163,184,0.22)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(px, yy); ctx.lineTo(px - 4, yy + 7); ctx.stroke();
      } else if (kind === 'spray') {
        const yy = y + 10 + ((h * 401) % 26) + Math.sin(nowT * 1.2 + h * 9) * 5;
        ctx.fillStyle = 'rgba(204,251,241,0.28)';
        ctx.beginPath(); ctx.arc(px + Math.sin(nowT * 0.8 + h * 14) * 5, yy, 1.4, 0, Math.PI * 2); ctx.fill();
      } else if (kind === 'dust') {
        const yy = y + 8 + ((h * 509) % 30) + Math.cos(nowT * 0.6 + h * 13) * 5;
        ctx.fillStyle = 'rgba(192,132,252,0.26)';
        ctx.beginPath(); ctx.arc(px + Math.sin(nowT * 0.5 + h * 21) * 7, yy, 1.5, 0, Math.PI * 2); ctx.fill();
      } else {
        ctx.fillStyle = `rgba(56,189,248,${0.18 + 0.12 * Math.sin(nowT * 3 + h * 25)})`;
        ctx.beginPath(); ctx.arc(px, y + 12 + ((h * 307) % 24), 1.4, 0, Math.PI * 2); ctx.fill();
      }
    }
  }
  ctx.restore();
}

function drawAirdropCrate(x, y) {
  ctx.fillStyle = '#78350f'; rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 8); ctx.fill();
  ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 3; ctx.stroke();
  ctx.font = '24px "Segoe UI Emoji", sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('📦', x + TILE_SIZE / 2, y + TILE_SIZE / 2 + 1);
}

function drawCryoTile(x, y) {
  ctx.fillStyle = 'rgba(103,232,249,0.22)'; rr(x + 3, y + 3, TILE_SIZE - 6, TILE_SIZE - 6, 10); ctx.fill();
  ctx.strokeStyle = 'rgba(165,243,252,0.65)'; ctx.lineWidth = 1.5; ctx.stroke();
}

function drawPortals() {
  portals.forEach(p => {
    const { x, y } = tileCenter(p.c, p.r);
    const pulse = 0.72 + Math.sin(nowT * 3 + p.c) * 0.12;
    ctx.save(); ctx.globalAlpha = 0.85;
    const grad = ctx.createRadialGradient(x, y, 2, x, y, TILE_SIZE * 0.55);
    grad.addColorStop(0, p.color); grad.addColorStop(1, 'rgba(15,23,42,0)');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(x, y, TILE_SIZE * 0.55, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = p.color; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(x, y, TILE_SIZE * 0.34 * pulse, nowT * 2, nowT * 2 + Math.PI * 1.5); ctx.stroke();
    ctx.beginPath(); ctx.arc(x, y, TILE_SIZE * 0.22, -nowT * 2.5, -nowT * 2.5 + Math.PI * 1.2); ctx.stroke();
    ctx.restore();
  });
}

function drawPowerups() {
  powerups.forEach(pu => {
    const meta = POWERUP_TYPES[pu.type];
    const bob = Math.sin(nowT * 3 + pu.bobPhase) * 3;
    ctx.save(); ctx.globalAlpha = 0.9;
    const glow = ctx.createRadialGradient(pu.x, pu.y + bob, 2, pu.x, pu.y + bob, 20);
    glow.addColorStop(0, meta.color); glow.addColorStop(1, 'rgba(15,23,42,0)');
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(pu.x, pu.y + bob, 20, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = meta.color; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(pu.x, pu.y + bob, 12, 0, Math.PI * 2); ctx.stroke();
    ctx.font = '17px "Segoe UI Emoji", sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(meta.icon, pu.x, pu.y + bob + 1);
    ctx.restore();
  });
}

function drawBlastTelegraphs() {
  if (!bombs.length) return;
  const time = performance.now() / 1000;
  for (const b of bombs) {
    if (b.exploded || b.fuse > 0.8) continue;
    const p = 1 - clamp(b.fuse / 0.8, 0, 1);
    const alpha = clamp(0.16 + p * 0.24 + Math.sin(time * 20) * 0.06, 0.08, 0.5);
    if (b.type === 'SHOCK') {
      const radius = (1.4 + b.range * 0.55) * TILE_SIZE;
      ctx.save();
      ctx.fillStyle = `rgba(244,63,94,${alpha * 0.55})`;
      ctx.beginPath(); ctx.arc(b.x, b.y, radius * (0.92 + Math.sin(time * 18) * 0.03), 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = `rgba(254,205,211,${Math.min(0.85, alpha + 0.25)})`;
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(b.x, b.y, radius, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
      continue;
    }
    const cells = bombBlastPreview(b);
    ctx.save();
    for (const cell of cells) {
      const x = cell.c * TILE_SIZE, y = cell.r * TILE_SIZE;
      ctx.fillStyle = `rgba(244,63,94,${alpha})`;
      rr(x + 3, y + 3, TILE_SIZE - 6, TILE_SIZE - 6, 8); ctx.fill();
      ctx.strokeStyle = `rgba(254,205,211,${Math.min(0.9, alpha + 0.22)})`;
      ctx.lineWidth = 1.5 + p * 1.2;
      rr(x + 3, y + 3, TILE_SIZE - 6, TILE_SIZE - 6, 8); ctx.stroke();
    }
    ctx.restore();
  }
}

/* Espelha exatamente a área que a explosão atingirá (paredes bloqueiam). */
function bombBlastPreview(b) {
  const bc = Math.floor(b.x / TILE_SIZE), br = Math.floor(b.y / TILE_SIZE);
  const cells = [{ c: bc, r: br }];
  const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
  const cryo = b.type === 'CRYO';
  for (const [dx, dy] of dirs) {
    for (let i = 1; i <= b.range; i++) {
      const c = bc + dx * i, r = br + dy * i;
      if (!inBounds(c, r)) break;
      const t = grid[r][c];
      if (t === CELL.CRUSHED || t === CELL.PILLAR) break;
      if (cryo) {
        if (t === CELL.CRATE || t === CELL.AIRDROP_CRATE) break;
        cells.push({ c, r });
      } else {
        cells.push({ c, r });
        if (t === CELL.CRATE || t === CELL.AIRDROP_CRATE) break;
      }
    }
  }
  return cells;
}

function drawBombSkinBody(b, skin, pulse) {
  const x = b.x, y = b.y;
  if (skin.id === 'dynamite') {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-0.12);
    for (let i = -1; i <= 1; i++) {
      const ox = i * 8;
      ctx.fillStyle = i === 0 ? '#dc2626' : '#b91c1c';
      rr(ox - 4, -14 * pulse, 8, 28 * pulse, 4); ctx.fill();
      ctx.strokeStyle = 'rgba(254,202,202,0.55)'; ctx.lineWidth = 1;
      rr(ox - 4, -14 * pulse, 8, 28 * pulse, 4); ctx.stroke();
    }
    ctx.fillStyle = '#facc15';
    ctx.fillRect(-14, -3, 28, 6);
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(2, -14); ctx.quadraticCurveTo(9, -20, 12, -25); ctx.stroke();
    ctx.restore();
    return;
  }
  if (skin.id === 'plasma') {
    const glow = ctx.createRadialGradient(x, y, 1, x, y, 19 * pulse);
    glow.addColorStop(0, '#e0f2fe');
    glow.addColorStop(0.35, '#22d3ee');
    glow.addColorStop(1, 'rgba(14,165,233,0)');
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(x, y, 19 * pulse, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0e2a3a';
    ctx.beginPath(); ctx.arc(x, y, 12 * pulse, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#67e8f9'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(x, y, 12 * pulse, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = 'rgba(224,242,254,0.85)'; ctx.lineWidth = 1.5;
    const orbit = nowT * 4 + b.seed;
    ctx.beginPath(); ctx.arc(x + Math.cos(orbit) * 16, y + Math.sin(orbit) * 16, 2.6, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#e0f2fe';
    ctx.beginPath(); ctx.arc(x, y, 4.5 + Math.sin(nowT * 12) * 0.8, 0, Math.PI * 2); ctx.fill();
    return;
  }
  if (skin.id === 'crystal') {
    ctx.save();
    ctx.translate(x, y);
    const gem = ctx.createLinearGradient(-10, -13, 12, 14);
    gem.addColorStop(0, '#c4b5fd');
    gem.addColorStop(0.5, '#8b5cf6');
    gem.addColorStop(1, '#38bdf8');
    ctx.fillStyle = gem;
    ctx.beginPath();
    ctx.moveTo(0, -15 * pulse); ctx.lineTo(12 * pulse, -4); ctx.lineTo(8, 13 * pulse);
    ctx.lineTo(-8, 13 * pulse); ctx.lineTo(-12 * pulse, -4); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(245,243,255,0.8)'; ctx.lineWidth = 1.6; ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, -15); ctx.lineTo(0, 13); ctx.moveTo(-12, -4); ctx.lineTo(12, -4); ctx.stroke();
    ctx.restore();
    return;
  }
  if (skin.id === 'blackhole') {
    const hole = ctx.createRadialGradient(x, y, 1, x, y, 20 * pulse);
    hole.addColorStop(0, '#000000');
    hole.addColorStop(0.55, '#111827');
    hole.addColorStop(0.8, 'rgba(124,58,237,0.55)');
    hole.addColorStop(1, 'rgba(124,58,237,0)');
    ctx.fillStyle = hole;
    ctx.beginPath(); ctx.arc(x, y, 20 * pulse, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(196,181,253,0.85)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(x, y, 17 * pulse, 6 * pulse, nowT * 2 + b.seed, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.arc(x, y, 9 * pulse, 0, Math.PI * 2); ctx.fill();
    return;
  }
  if (skin.id === 'deathstar') {
    const hull = ctx.createRadialGradient(x - 5, y - 6, 2, x, y, 16 * pulse);
    hull.addColorStop(0, '#e2e8f0');
    hull.addColorStop(0.6, '#64748b');
    hull.addColorStop(1, '#1e293b');
    ctx.fillStyle = hull;
    ctx.beginPath(); ctx.arc(x, y, 15 * pulse, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(163,230,53,0.85)'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.ellipse(x, y, 15 * pulse, 4.5 * pulse, -0.35, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#a3e635';
    ctx.beginPath(); ctx.arc(x - 4, y, 3.4, 0, Math.PI * 2); ctx.fill();
    return;
  }
  // Clássica: esfera metálica com pavio
  const metal = ctx.createRadialGradient(x - 5, y - 6, 2, x, y, 16 * pulse);
  metal.addColorStop(0, '#64748b');
  metal.addColorStop(0.5, '#1f2937');
  metal.addColorStop(1, '#0b1220');
  ctx.fillStyle = metal;
  ctx.beginPath(); ctx.arc(x, y, 15 * pulse, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = skin.color; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.arc(x, y, 15 * pulse, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(x - 3, y - 3, 9, -2.4, -0.6); ctx.stroke();
  ctx.strokeStyle = '#d97706'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(x + 3, y - 13); ctx.quadraticCurveTo(x + 9, y - 20, x + 13, y - 22); ctx.stroke();
  const spark = 0.6 + Math.abs(Math.sin(nowT * 18)) * 0.4;
  ctx.fillStyle = `rgba(254,240,138,${spark})`;
  ctx.beginPath(); ctx.arc(x + 13, y - 22, 2.6, 0, Math.PI * 2); ctx.fill();
}

function drawBombs() {
  bombs.forEach(b => {
    if (b.exploded) return;
    const isNormal = b.type === 'NORMAL';
    const meta = isNormal
      ? { color: getBombSkin(b.skinId).color }
      : b.type === 'C4' ? { color: '#f43f5e', icon: '📡' } : b.type === 'SHOCK' ? { color: '#fbbf24', icon: '🌀' } : { color: '#67e8f9', icon: '❄️' };
    const blink = b.fuse < 0.9 ? 0.55 + Math.abs(Math.sin(nowT * 16)) * 0.45 : 1;
    const pulse = 1 + Math.sin(nowT * 10 + b.seed) * 0.07;
    ctx.save(); ctx.globalAlpha = blink;
    const glow = ctx.createRadialGradient(b.x, b.y, 2, b.x, b.y, 26);
    glow.addColorStop(0, meta.color); glow.addColorStop(1, 'rgba(15,23,42,0)');
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(b.x, b.y, 26, 0, Math.PI * 2); ctx.fill();
    if (isNormal) {
      const bombCosmetic = getBombSkin(b.skinId);
      drawBombSkinBody(b, bombCosmetic, pulse);
      // Bombas lendárias/míticas ganham anéis girando ao redor.
      const bombRank = rarityTier(bombCosmetic.rarity);
      if (bombRank >= 4) {
        const meta = rarityMeta(bombCosmetic.rarity);
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(nowT * (bombRank >= 5 ? 2.2 : 1.3) + b.seed);
        ctx.strokeStyle = hexA(meta.color, 0.6);
        ctx.lineWidth = 1.6;
        ctx.setLineDash([7, 8]);
        ctx.beginPath(); ctx.arc(0, 0, 22 * pulse, 0, Math.PI * 2); ctx.stroke();
        ctx.rotate(-nowT * (bombRank >= 5 ? 3.4 : 2.1));
        ctx.setLineDash([3, 9]);
        ctx.beginPath(); ctx.arc(0, 0, 26 * pulse, 0, Math.PI * 2); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = hexA(meta.color, 0.8);
        for (let i = 0; i < (bombRank >= 5 ? 4 : 3); i++) {
          const a = (i / (bombRank >= 5 ? 4 : 3)) * Math.PI * 2 + b.seed;
          ctx.beginPath(); ctx.arc(Math.cos(a) * 24, Math.sin(a) * 24, 1.8, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
      }
    } else {
      ctx.fillStyle = '#111827';
      ctx.beginPath(); ctx.arc(b.x, b.y, 15 * pulse, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = meta.color; ctx.lineWidth = 2.5; ctx.stroke();
      ctx.font = '16px "Segoe UI Emoji", sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(meta.icon, b.x, b.y + 1);
    }
    ctx.restore();
  });
}

function drawAirdropBeacon() {
  if (!activeAirdrop || activeAirdrop.landed) return;
  const { x, y } = tileCenter(activeAirdrop.c, activeAirdrop.r);
  const t = 1 - clamp(activeAirdrop.timer / 7, 0, 1);
  const fall = (1 - t) * 320;
  const bob = Math.sin(nowT * 6) * 4;
  ctx.save();
  ctx.strokeStyle = 'rgba(251,191,36,0.75)'; ctx.lineWidth = 3;
  ctx.setLineDash([8, 8]);
  ctx.beginPath(); ctx.arc(x, y, 20 + Math.sin(nowT * 4) * 4, 0, Math.PI * 2); ctx.stroke();
  ctx.setLineDash([]);
  ctx.font = '26px "Segoe UI Emoji", sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.globalAlpha = 0.95;
  ctx.fillText('📦', x, y - fall + bob);
  ctx.restore();
}

function deviceAccent(f) {
  if (f.device === 'p1') return { solid: '#34d399', light: '#a7f3d0' };
  if (f.device === 'p2') return { solid: '#38bdf8', light: '#bae6fd' };
  const p = humanAccentByDevice(f.device);
  if (p) return p;
  return null;
}
function humanAccentByDevice(device) {
  // Paleta por slot humano (p3..p6) para 2v2/3v3 diferenciar cada jogador.
  const map = {
    p3: { solid: '#f59e0b', light: '#fed7aa' },
    p4: { solid: '#a78bfa', light: '#ddd6fe' },
    p5: { solid: '#f472b6', light: '#fbcfe8' },
    p6: { solid: '#22d3ee', light: '#a5f3fc' }
  };
  return map[device] || null;
}

function drawFighters() {
  for (const f of fighters) {
    if (!f.alive) continue;
    const accent = deviceAccent(f);
    let alpha = 1;
    if (f.inBush && !f.isHuman) alpha = 0.6;
    if (f.invulnTimer > 0 && Math.floor(nowT * 16) % 2 === 0) alpha *= 0.55;
    ctx.save(); ctx.globalAlpha = alpha;
    const isLocal = f.isHuman && !match.demoMode && controlOf(f.device) !== null;
    const look = isLocal ? resolvePlayerLook() : null;
    const profileLook = PROFILE_DEFS[f.name] || null;
    const bodyColor = look ? look.body : (profileLook ? profileLook.body : f.color);
    const visorColor = look ? look.visor : (profileLook ? profileLook.visor : f.visor);
    const skin = f.skin ? getSkin(f.skin) : null;
    const accentCol = look ? look.accent : (skin ? skin.accent : (accent ? accent.solid : '#0f172a'));
    const moving = Math.hypot(f.vx, f.vy) > 20;
    const step = moving ? Math.sin(nowT * 16 + f.name.length) * 3 : 0;

    ctx.beginPath();
    ctx.ellipse(f.x, f.y + 11, PLAYER_RADIUS * 1.02, PLAYER_RADIUS * 0.46, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.38)'; ctx.fill();

    // Botas com passada animada
    ctx.fillStyle = shadeColor(accentCol, -55);
    ctx.beginPath(); ctx.ellipse(f.x - 6.5, f.y + PLAYER_RADIUS * 0.72 + step, 4.6, 3.4, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(f.x + 6.5, f.y + PLAYER_RADIUS * 0.72 - step, 4.6, 3.4, 0, 0, Math.PI * 2); ctx.fill();

    // Mochila de bombas
    const bx = f.x + Math.cos(f.facingAngle + Math.PI) * (PLAYER_RADIUS * 0.62);
    const by = f.y + Math.sin(f.facingAngle + Math.PI) * (PLAYER_RADIUS * 0.62);
    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate(f.facingAngle);
    ctx.fillStyle = '#0f172a'; rr(-5, -7, 10, 14, 4); ctx.fill();
    ctx.strokeStyle = accentCol; ctx.lineWidth = 1.6; rr(-5, -7, 10, 14, 4); ctx.stroke();
    ctx.fillStyle = '#f97316';
    ctx.beginPath(); ctx.arc(0, 1, 2.6, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // Corpo
    const grad = ctx.createRadialGradient(f.x - 5, f.y - 7, 2, f.x, f.y, PLAYER_RADIUS * 1.1);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.28, bodyColor);
    grad.addColorStop(0.86, shadeColor(bodyColor, -42));
    grad.addColorStop(1, '#0b1220');
    ctx.beginPath(); ctx.arc(f.x, f.y, PLAYER_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = grad; ctx.fill();

    ctx.beginPath();
    ctx.arc(f.x, f.y, PLAYER_RADIUS - 4.5, -2.5, -0.4);
    ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 1.6; ctx.stroke();

    // Aro de time/skin
    ctx.lineWidth = f.isHuman ? 3 : 2;
    if (f.team === 1) ctx.strokeStyle = '#34d399';
    else if (f.team === 2) ctx.strokeStyle = '#f87171';
    else ctx.strokeStyle = accentCol;
    ctx.beginPath(); ctx.arc(f.x, f.y, PLAYER_RADIUS, 0, Math.PI * 2); ctx.stroke();

    // Visor com brilho
    const ang = f.facingAngle;
    ctx.save();
    if (QUALITY.glow) { ctx.shadowColor = visorColor; ctx.shadowBlur = 7; }
    ctx.beginPath();
    ctx.arc(f.x + Math.cos(ang) * 4, f.y + Math.sin(ang) * 4, 6.2, ang - 0.95, ang + 0.95);
    ctx.strokeStyle = visorColor; ctx.lineWidth = 3.2; ctx.stroke();
    ctx.restore();
    // Detalhes exclusivos das skins equipadas
    if (look && look.skinId === 'guardian') {
      ctx.strokeStyle = 'rgba(254,243,199,0.85)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(f.x, f.y - 2, PLAYER_RADIUS + 4, Math.PI * 1.12, Math.PI * 1.88); ctx.stroke();
    } else if (look && look.skinId === 'cyber') {
      ctx.strokeStyle = 'rgba(207,250,254,0.7)'; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.arc(f.x, f.y, PLAYER_RADIUS - 5, ang + 1.1, ang + 2.2); ctx.stroke();
      ctx.beginPath(); ctx.arc(f.x, f.y, PLAYER_RADIUS - 5, ang - 2.2, ang - 1.1); ctx.stroke();
    } else if (look && look.skinId === 'pyro') {
      const ember = 0.5 + Math.abs(Math.sin(nowT * 5 + f.name.length)) * 0.5;
      ctx.fillStyle = `rgba(249,115,22,${0.35 + ember * 0.3})`;
      ctx.beginPath(); ctx.arc(f.x, f.y, PLAYER_RADIUS + 2, 0, Math.PI * 2); ctx.fill();
    }
    // Skins lendárias/míticas: aura pulsante + partículas orbitando
    // dentro do raio de 1 tile (32px).
    const cosmeticSkinId = f.cosmeticSkin || (look ? look.skinId : null);
    const skinRank = cosmeticSkinId ? rarityTier(cosmeticRarity('skins', cosmeticSkinId)) : 0;
    if (skinRank >= 4) {
      const meta = rarityMeta(cosmeticRarity('skins', cosmeticSkinId));
      const pulse = 0.6 + Math.sin(nowT * 3 + f.name.length) * 0.25;
      const auraR = TILE_SIZE * (0.82 + pulse * 0.12);
      const aura = ctx.createRadialGradient(f.x, f.y, PLAYER_RADIUS * 0.5, f.x, f.y, auraR);
      aura.addColorStop(0, hexA(meta.color, 0.02));
      aura.addColorStop(0.7, hexA(meta.color, 0.10 + pulse * 0.06));
      aura.addColorStop(1, hexA(meta.color, 0));
      ctx.fillStyle = aura;
      ctx.beginPath(); ctx.arc(f.x, f.y, auraR, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = hexA(meta.color, 0.35 + pulse * 0.2);
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 7]);
      ctx.lineDashOffset = -nowT * 26;
      ctx.beginPath(); ctx.arc(f.x, f.y, PLAYER_RADIUS + 7, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]);
      const orbitCount = QUALITY.glow ? (skinRank >= 5 ? 6 : 4) : 0;
      for (let i = 0; i < orbitCount; i++) {
        const a = nowT * (skinRank >= 5 ? 1.6 : 1.1) + (i / orbitCount) * Math.PI * 2;
        const r = PLAYER_RADIUS + 9 + Math.sin(nowT * 2 + i) * 3;
        ctx.fillStyle = hexA(meta.color, 0.75);
        ctx.beginPath(); ctx.arc(f.x + Math.cos(a) * r, f.y + Math.sin(a) * r * 0.9, skinRank >= 5 ? 2.4 : 1.9, 0, Math.PI * 2); ctx.fill();
      }
    }
    if (f.shield) {
      ctx.beginPath(); ctx.arc(f.x, f.y, PLAYER_RADIUS + 5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(34,211,238,0.9)'; ctx.lineWidth = 2; ctx.stroke();
    }
    if (f.isHuman) {
      ctx.beginPath();
      ctx.moveTo(f.x, f.y - PLAYER_RADIUS - 5);
      ctx.lineTo(f.x - 5, f.y - PLAYER_RADIUS - 13);
      ctx.lineTo(f.x + 5, f.y - PLAYER_RADIUS - 13);
      ctx.closePath();
      ctx.fillStyle = accent ? accent.solid : '#34d399'; ctx.fill();
    }
    
    // 🆕 Estrela verde em bots aliados
    if (f.team === 1 && !f.isHuman) {
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#34d399';
      ctx.fillText('★', f.x, f.y - PLAYER_RADIUS - 10);
    }
    
    const near = f.isHuman || f.team === 1 || Math.hypot(f.x - cam.x, f.y - cam.y) < 430;
    if (near) {
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const label = f.name;
      const w = ctx.measureText(label).width + 12;
      ctx.fillStyle = 'rgba(2,6,23,0.72)';
      rr(f.x - w / 2, f.y - PLAYER_RADIUS - 16, w, 14, 7); ctx.fill();
      if (f.team === 1) ctx.fillStyle = '#a7f3d0';
      else if (f.team === 2) ctx.fillStyle = '#fecaca';
      else ctx.fillStyle = accent ? accent.light : '#e2e8f0';
      ctx.fillText(label, f.x, f.y - PLAYER_RADIUS - 8);
    }
    ctx.restore();
  }
}

function drawExplosions() {
  for (const ex of explosions) {
    const p = clamp(ex.timer / ex.maxTimer, 0, 1);
    if (ex.type === 'cross') {
      ex.cells.forEach(cell => {
        const x = cell.c * TILE_SIZE, y = cell.r * TILE_SIZE;
        const pad = 3 + (1 - p) * 7;
        ctx.save(); ctx.globalAlpha = p;
        ctx.fillStyle = ex.color;
        rr(x + pad, y + pad, TILE_SIZE - pad * 2, TILE_SIZE - pad * 2, 10); ctx.fill();
        ctx.globalAlpha = p * 0.85;
        ctx.fillStyle = ex.center || '#fef3c7';
        rr(x + pad + 8, y + pad + 8, TILE_SIZE - (pad + 8) * 2, TILE_SIZE - (pad + 8) * 2, 7); ctx.fill();
        ctx.restore();
      });
      // Explosões lendárias/míticas: anel girando + onda colorida.
      if (ex.tier >= 4) {
        const meta = rarityMeta(ex.tier >= 5 ? 'mythic' : 'legendary');
        const t = 1 - p;
        ctx.save();
        ctx.globalAlpha = p * 0.85;
        ctx.strokeStyle = hexA(meta.color, 0.9);
        ctx.lineWidth = 2 + p * 4;
        ctx.beginPath(); ctx.arc(ex.x, ex.y, TILE_SIZE * (0.8 + t * 1.7), 0, Math.PI * 2); ctx.stroke();
        ctx.strokeStyle = hexA(meta.color, 0.35);
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(ex.x, ex.y, TILE_SIZE * (0.45 + t * 1.05), 0, Math.PI * 2); ctx.stroke();
        ctx.translate(ex.x, ex.y);
        ctx.rotate(nowT * 5.5);
        ctx.setLineDash([10, 13]);
        ctx.beginPath(); ctx.arc(0, 0, TILE_SIZE * 1.15, 0, Math.PI * 2); ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }
    } else if (ex.type === 'shock') {
      const t = 1 - p;
      const radius = ex.radius * (0.35 + t * 0.85);
      ctx.save(); ctx.globalAlpha = p;
      ctx.strokeStyle = ex.color; ctx.lineWidth = 2 + p * 6;
      ctx.beginPath(); ctx.arc(ex.x, ex.y, radius, 0, Math.PI * 2); ctx.stroke();
      ctx.globalAlpha = p * 0.5;
      ctx.beginPath(); ctx.arc(ex.x, ex.y, radius * 0.7, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
    } else if (ex.type === 'cryo') {
      ex.cells.forEach(cell => {
        const x = cell.c * TILE_SIZE, y = cell.r * TILE_SIZE;
        ctx.save(); ctx.globalAlpha = p * 0.8;
        ctx.fillStyle = '#67e8f9';
        ctx.beginPath(); ctx.arc(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 10 + (1 - p) * 12, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      });
    }
  }
}

function updateTrails(dt) {
  for (let i = trails.length - 1; i >= 0; i--) {
    const p = trails[i]; p.life -= dt;
    if (p.life <= 0) { trails.splice(i, 1); continue; }
    p.x += p.vx * dt; p.y += p.vy * dt;
    p.vx *= Math.exp(-3 * dt); p.vy *= Math.exp(-3 * dt);
  }
  if (match.demoMode || !match.running) return;
  for (const f of fighters) {
    if (!f.alive || !f.trailId || f.trailId === 'none') continue;
    const skin = TRAIL_SKINS.find(t => t.id === f.trailId);
    if (!skin) continue;
    if (f._trailX == null) { f._trailX = f.x; f._trailY = f.y; f._trailAccum = 0; }
    const moved = Math.hypot(f.x - f._trailX, f.y - f._trailY);
    f._trailX = f.x; f._trailY = f.y;
    if (moved < dt * 36) { f._trailAccum = 0; continue; }
    f._trailAccum = (f._trailAccum || 0) + dt;
    const tier = rarityTier(skin.rarity);
    if (f._trailAccum < (tier >= 4 ? 0.05 : 0.085)) continue;
    f._trailAccum = 0;
    const count = tier >= 4 ? 2 : 1;
    for (let i = 0; i < count; i++) {
      trails.push({
        x: f.x + (Math.random() - 0.5) * 10,
        y: f.y + PLAYER_RADIUS * 0.45 + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 14, vy: (Math.random() - 0.5) * 14,
        color: skin.color, glow: skin.glow,
        size: (tier >= 4 ? 3.2 : 2.3) + Math.random() * 1.4,
        life: TRAIL_LIFE, maxLife: TRAIL_LIFE
      });
    }
  }
  const cap = QUALITY.trailCap || 220;
  if (trails.length > cap) trails.splice(0, trails.length - cap);
}

function drawTrails() {
  for (const p of trails) {
    const a = clamp(p.life / p.maxLife, 0, 1);
    ctx.save(); ctx.globalAlpha = a * 0.9;
    ctx.fillStyle = p.color;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.size * a + 0.7, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = a * 0.28;
    ctx.fillStyle = p.glow || p.color;
    ctx.beginPath(); ctx.arc(p.x, p.y, (p.size + 2.2) * a + 0.5, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }
}

function drawParticles() {
  particles.forEach(p => {
    const a = clamp(p.life / p.maxLife, 0, 1);
    ctx.save(); ctx.globalAlpha = a;
    ctx.fillStyle = p.color;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.size * a, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  });
}

function drawLabels() {
  floatingLabels.forEach(l => {
    const a = clamp(l.life / l.maxLife, 0, 1);
    ctx.save(); ctx.globalAlpha = a;
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(2,6,23,0.8)';
    ctx.strokeText(l.text, l.x, l.y);
    ctx.fillStyle = l.color;
    ctx.fillText(l.text, l.x, l.y);
    ctx.restore();
  });
}

function drawStormVignette() {
  const h = getHuman();
  let outside = false;
  if (h && h.alive && match.safeRing > 0 && !match.demoMode) {
    const { c, r } = worldToGrid(h.x, h.y);
    const lo = match.safeRing, hi = GRID_SIZE - 1 - match.safeRing;
    outside = c < lo || c > hi || r < lo || r > hi;
  }
  if (!match.stormWarning && !outside) return;
  const pulse = outside ? 0.48 + Math.sin(nowT * 6) * 0.12 : 0.35 + Math.sin(nowT * 4) * 0.12;
  const grad = ctx.createRadialGradient(viewW / 2, viewH / 2, Math.min(viewW, viewH) * 0.32, viewW / 2, viewH / 2, Math.max(viewW, viewH) * 0.75);
  grad.addColorStop(0, 'rgba(244,63,94,0)');
  grad.addColorStop(1, `rgba(190,18,60,${pulse})`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, viewW, viewH);
}

function drawMapPreview() {
  const cv = document.getElementById('mapPreview');
  const nameEl = document.getElementById('mapPreviewName');
  const theme = match.theme || MAPS[0];
  if (nameEl) nameEl.textContent = theme.name;
  if (!cv) return;
  const size = 64;
  const dpr2 = Math.min(window.devicePixelRatio || 1, 2);
  cv.width = size * dpr2; cv.height = size * dpr2;
  const c2 = cv.getContext('2d');
  c2.setTransform(dpr2, 0, 0, dpr2, 0, 0);
  c2.clearRect(0, 0, size, size);
  const cell = size / GRID_SIZE;
  c2.fillStyle = theme.floor[0]; c2.fillRect(0, 0, size, size);
  c2.fillStyle = theme.floor[1];
  for (let r = 0; r < GRID_SIZE; r++) for (let c = 0; c < GRID_SIZE; c++) if ((c + r) % 2 === 0) c2.fillRect(c * cell, r * cell, cell, cell);
  // Marca do piso de cada bioma, para a miniatura não ser só cor
  const ground = theme.ground || theme.deco || 'circuit';
  c2.save();
  c2.strokeStyle = theme.accent; c2.globalAlpha = 0.32; c2.lineWidth = 1;
  if (ground === 'sand') {
    for (let i = 0; i < 3; i++) {
      const oy = 14 + i * 18;
      c2.beginPath(); c2.moveTo(2, oy); c2.quadraticCurveTo(size / 2, oy - 5, size - 2, oy + 2); c2.stroke();
    }
  } else if (ground === 'ice') {
    c2.beginPath(); c2.moveTo(4, size - 6); c2.lineTo(size - 6, 6); c2.stroke();
    c2.beginPath(); c2.moveTo(6, 10); c2.lineTo(size - 10, size - 8); c2.stroke();
  } else if (ground === 'lava') {
    c2.beginPath(); c2.moveTo(6, 4); c2.lineTo(20, 26); c2.lineTo(14, 42); c2.lineTo(30, size - 2); c2.stroke();
    c2.beginPath(); c2.moveTo(size - 8, 8); c2.lineTo(size - 22, 30); c2.stroke();
  } else if (ground === 'leaf' || ground === 'petal') {
    c2.fillStyle = theme.accent;
    for (let i = 0; i < 9; i++) {
      const ox = 5 + ((i * 37) % (size - 10));
      const oy = 5 + ((i * 53) % (size - 10));
      c2.beginPath(); c2.ellipse(ox, oy, 2, 1.1, i, 0, Math.PI * 2); c2.fill();
    }
  } else if (ground === 'asphalt' || ground === 'plank') {
    for (let i = 1; i < 4; i++) {
      const oy = (size / 4) * i;
      c2.beginPath(); c2.moveTo(0, oy); c2.lineTo(size, oy); c2.stroke();
    }
  } else if (ground === 'panel' || ground === 'circuit') {
    c2.strokeRect(6, 6, size - 12, size - 12);
    c2.beginPath(); c2.moveTo(6, size / 2); c2.lineTo(size / 2, size / 2); c2.lineTo(size / 2, size - 6); c2.stroke();
  }
  c2.globalAlpha = 0.55;
  c2.strokeStyle = theme.accent;
  c2.strokeRect(0.5, 0.5, size - 1, size - 1);
  c2.restore();
  const w = Math.ceil(cell);
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const t = grid[r][c];
      if (t === CELL.FLOOR) continue;
      if (t === CELL.CRATE) c2.fillStyle = 'rgba(180,83,9,0.95)';
      else if (t === CELL.BUSH) c2.fillStyle = 'rgba(22,163,74,0.95)';
      else if (t === CELL.AIRDROP_CRATE) c2.fillStyle = '#fbbf24';
      else if (t === CELL.PILLAR) c2.fillStyle = 'rgba(100,116,139,0.9)';
      else c2.fillStyle = 'rgba(71,85,105,0.85)';
      c2.fillRect(c * cell, r * cell, w, w);
    }
  }
  c2.fillStyle = '#34d399'; c2.fillRect(SPAWN_P1.c * cell, SPAWN_P1.r * cell, Math.max(2, cell), Math.max(2, cell));
  c2.fillStyle = '#38bdf8'; c2.fillRect(SPAWN_P2.c * cell, SPAWN_P2.r * cell, Math.max(2, cell), Math.max(2, cell));
}

let radarBase = null;
let radarBaseRev = -1;
function renderRadar() {
  const S = 88;
  const scale = S / WORLD_PX;
  if (!radarBase) { radarBase = document.createElement('canvas'); radarBase.width = S; radarBase.height = S; }
  // Paredes do radar são estáticas: redesenha só quando a grade muda.
  if (radarBaseRev !== gridRev) {
    const b = radarBase.getContext('2d');
    b.setTransform(1, 0, 0, 1, 0, 0);
    b.clearRect(0, 0, S, S);
    b.save();
    b.beginPath(); b.arc(S / 2, S / 2, S / 2, 0, Math.PI * 2); b.clip();
    b.fillStyle = 'rgba(8,12,20,0.94)'; b.fillRect(0, 0, S, S);
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const t = grid[r] ? grid[r][c] : CELL.FLOOR;
        if (t === CELL.FLOOR || t === CELL.BUSH || t === CELL.CRATE || t === CELL.AIRDROP_CRATE) continue;
        b.fillStyle = 'rgba(100,116,139,0.55)';
        b.fillRect(c * TILE_SIZE * scale, r * TILE_SIZE * scale, Math.max(1, TILE_SIZE * scale), Math.max(1, TILE_SIZE * scale));
      }
    }
    b.restore();
    radarBaseRev = gridRev;
  }
  rctx.clearRect(0, 0, S, S);
  rctx.save();
  rctx.beginPath(); rctx.arc(S / 2, S / 2, S / 2, 0, Math.PI * 2); rctx.clip();
  rctx.drawImage(radarBase, 0, 0);
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const t = grid[r] ? grid[r][c] : CELL.FLOOR;
      if (t === CELL.CRATE) rctx.fillStyle = 'rgba(180,83,9,0.7)';
      else if (t === CELL.AIRDROP_CRATE) rctx.fillStyle = '#fbbf24';
      else continue;
      rctx.fillRect(c * TILE_SIZE * scale, r * TILE_SIZE * scale, Math.max(1, TILE_SIZE * scale), Math.max(1, TILE_SIZE * scale));
    }
  }
  const ring = clamp(match.safeRing, 0, MAX_RING + 2);
  const minT = ring, maxT = GRID_SIZE - 1 - ring;
  rctx.strokeStyle = 'rgba(244,63,94,0.7)'; rctx.lineWidth = 1;
  rctx.strokeRect(minT * TILE_SIZE * scale, minT * TILE_SIZE * scale, (maxT - minT) * TILE_SIZE * scale, (maxT - minT) * TILE_SIZE * scale);
  powerups.forEach(pu => { rctx.fillStyle = POWERUP_TYPES[pu.type].color; rctx.fillRect(pu.x * scale - 1, pu.y * scale - 1, 2, 2); });
  if (activeAirdrop) {
    rctx.fillStyle = '#fbbf24';
    rctx.beginPath();
    rctx.arc((activeAirdrop.c + 0.5) * TILE_SIZE * scale, (activeAirdrop.r + 0.5) * TILE_SIZE * scale, 2.6, 0, Math.PI * 2);
    rctx.fill();
  }
  fighters.forEach(f => {
    if (!f.alive) return;
    if (f.team === 1) rctx.fillStyle = '#34d399';
    else if (f.team === 2) rctx.fillStyle = '#f87171';
    else {
      const accent = deviceAccent(f);
      rctx.fillStyle = accent ? accent.solid : '#f87171';
    }
    rctx.beginPath();
    rctx.arc(f.x * scale, f.y * scale, f.isHuman ? 3 : 2.2, 0, Math.PI * 2);
    rctx.fill();
  });
  const halfW = viewW / (2 * cam.zoom), halfH = viewH / (2 * cam.zoom);
  rctx.strokeStyle = 'rgba(148,163,184,0.35)';
  rctx.strokeRect((cam.x - halfW) * scale, (cam.y - halfH) * scale, halfW * 2 * scale, halfH * 2 * scale);
  rctx.restore();
}

/* ========================================================================
   20. GAME LOOP & BOOTSTRAP
   ======================================================================== */
let lastTime = 0;
// Em celulares fracos a resolução do canvas cai sozinha até o jogo voltar
// a rodar liso; volta a subir quando há folga de desempenho.
let renderScale = 1;
let perfAccum = 0, perfFrames = 0, perfCooldown = 0;
function adaptRenderScale(rawDt) {
  if (!IS_TOUCH || chroma.active) return;
  if (rawDt <= 0 || rawDt > 0.4) return;
  perfAccum += rawDt; perfFrames++;
  perfCooldown = Math.max(0, perfCooldown - rawDt);
  if (perfAccum < 2) return;
  const avgMs = (perfAccum / perfFrames) * 1000;
  perfAccum = 0; perfFrames = 0;
  if (perfCooldown > 0) return;
  if (avgMs > 26 && renderScale > QUALITY.scaleMin) {
    renderScale = Math.max(QUALITY.scaleMin, renderScale - 0.15);
    resize(); perfCooldown = 2.5;
  } else if (avgMs < 16.5 && renderScale < QUALITY.scaleCap) {
    renderScale = Math.min(QUALITY.scaleCap, renderScale + 0.1);
    resize(); perfCooldown = 4;
  }
}

let loopLastErrorAt = -Infinity;

function loop(ts) {
  // Um erro em um único frame não pode matar o requestAnimationFrame. Sem esta
  // proteção, qualquer exceção em update()/render()/netTick() interrompia a
  // função antes do reagendamento e congelava o jogo até recarregar a página.
  try {
    const seconds = ts / 1000;
    if (!lastTime) lastTime = seconds;
    const rawDt = Math.max(0, seconds - lastTime);
    const dt = Math.min(0.05, rawDt);
    lastTime = seconds;
    nowT = seconds;
    adaptRenderScale(rawDt);
    if (match.hitFlash > 0) match.hitFlash = Math.max(0, match.hitFlash - dt);
    pollGamepads();

    fpsAccum += dt; fpsFrames++;
    if (fpsAccum >= 0.5) {
      const fpsEl = document.getElementById('fpsCounter');
      const visible = settings.showFps && !chroma.active && match.running && !match.paused && UI.startScreen.classList.contains('hidden');
      if (fpsEl) {
        fpsEl.classList.toggle('hidden', !visible);
        if (visible) fpsEl.textContent = `${Math.round(fpsFrames / fpsAccum)} FPS`;
      }
      fpsAccum = 0; fpsFrames = 0;
    }
    
    // 🎨 Chroma Drop OU jogo principal
    if (chroma.active) {
      if (!chroma.paused) updateChromaDrop(dt);
      drawChromaDrop();
    } else {
      // No lobby a partida-demo fica congelada: nada de bombas, som ou ação
      // atrás do painel. O fundo do menu é um cenário próprio, sem gameplay.
      const lobbyOpen = !UI.startScreen.classList.contains('hidden');
      if (lobbyOpen && match.demoMode) {
        drawLobbyBackdrop();
      } else {
        if (match.running && !match.paused && !net.hold) update(dt);
        render();
      }
      if (!match.paused && !net.hold) netTick(dt);
      if (tutorial.active) updateTutorialUI();
    }
  } catch (err) {
    // Loga no máximo uma vez a cada 5 s para não inundar o console.
    if (nowT - loopLastErrorAt > 5) {
      loopLastErrorAt = nowT;
      console.error('Erro no loop do jogo (frame ignorado, loop mantido):', err);
    }
  }
  
  requestAnimationFrame(loop);
}

window.onload = function () {
  try {
    loadPrefs();
    loadSettings();
    GameState.load();
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints || 0) > 0;
    if (isTouch) {
      document.body.classList.add('is-touch');
      // No celular, o primeiro toque já deixa tudo em tela cheia.
      document.addEventListener('pointerdown', (e) => {
        if (e.target && e.target.closest && e.target.closest('#btnFullscreen')) return;
        requestGameFullscreen();
      }, { once: true });
    }
    resize();
    updateRotateGate();
    bindUI();
    bindChromaUI(); // 🎨 Chroma Drop
    applySettings();
    syncSettingsUI();
    
    if (UI.nameInput && prefs.name) UI.nameInput.value = prefs.name;
    const p2El = document.getElementById('player2NameInput');
    if (p2El && prefs.name2) p2El.value = prefs.name2;
    if (prefs.tactical && TACTICAL_ORDER.includes(prefs.tactical)) {
      selectedStarterTactical = prefs.tactical;
      document.querySelectorAll('.tactical-choice').forEach(b => {
        const on = b.getAttribute('data-tactical') === prefs.tactical;
        b.classList.toggle('active', on);
        b.classList.toggle('bg-amber-500/20', on);
        b.classList.toggle('border-amber-400', on);
        b.classList.toggle('bg-slate-800/70', !on);
        b.classList.toggle('border-slate-700', !on);
      });
    }
    applyLanguage(prefs.lang === 'en' ? 'en' : 'pt');
    const bootMode = MODE_CONFIG[prefs.mode] ? prefs.mode : 'SOLO';
    // Sem nick, o boot não pode abrir o modal do competitivo sozinho.
    setSelectedMode(bootMode === 'ONLINE' && !hasCompetitiveNick() ? 'SOLO' : bootMode);
    setSelectedMap(getMap(prefs.map).id);
    // Abre "JOGAR" por padrão para o CTA "ENTRAR NA ARENA" já ficar visível.
    setLobbySection(selectedMode === 'ONLINE' ? 'online' : 'play');
    updatePadStatus();
    updateTutorialButton();
    updateCareerUI();
    if (UI.nameInput) UI.nameInput.value = GameState.state.profile.nick;
    const profileNick = document.getElementById('profileNickInput');
    if (profileNick) profileNick.value = GameState.state.profile.nick;
    syncDuelBestUI();
    rollMissions();
    renderProgress();
    renderSkins();
    refreshLobbyScreens();
    GameState.subscribe(onGameStateChanged);
    loadBiomeTextures();
    setInterval(bracketTick, 1000);
    // Liga vem da nuvem depois do boot: com a fase 2 aberta, espera a tabela
    // encher antes de congelar o Top 8 e depois alinha com o servidor.
    setTimeout(() => {
      if (champPhase() !== 'knockout') return;
      bracketLockSeeds();
      refreshBracketServerState(true);
    }, 8000);
    initArena(true, selectedMode, selectedMap);
    updateHUD();
    MUSIC.play('menu');
    const unlockAudio = () => MUSIC.unlock();
    document.addEventListener('pointerdown', unlockAudio, { once: true });
    document.addEventListener('keydown', unlockAudio, { once: true });
    requestAnimationFrame(loop);
    if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
      navigator.serviceWorker.register('sw.js').then(reg => {
        // Só avisa atualização quando a página já era controlada por um SW.
        // Na primeira instalação não existe versão antiga para substituir.
        const hadController = !!navigator.serviceWorker.controller;
        let notified = false;
        const notifyUpdate = () => {
          if (notified || !hadController || !navigator.serviceWorker.controller) return;
          notified = true;
          const dict = I18N[currentLang] || I18N.pt;
          showToast(dict.pwaUpdated || 'Nova versão instalada. Recarregue para atualizar.');
        };
        reg.addEventListener('updatefound', () => {
          const worker = reg.installing;
          if (!worker) return;
          worker.addEventListener('statechange', () => {
            if (worker.state === 'installed') notifyUpdate();
          });
        });
        if (reg.waiting) notifyUpdate();
        navigator.serviceWorker.addEventListener('controllerchange', notifyUpdate);
      }).catch(() => {});
    }
    // Servidor de salas opcional: se este host tiver o servidor, habilita
    // criar/entrar por código curto. Sem ele, o fluxo manual continua igual.
    if (netServerLikely()) netServerCheck().then(ok => {
      if (!ok) return;
      let room = '';
      try { room = new URLSearchParams(location.search).get('room') || ''; } catch (e) {}
      room = String(room).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4);
      if (!room) return;
      setLobbySection('online');
      const input = document.getElementById('netServerCode');
      if (input) input.value = room;
      setTimeout(() => netServerJoinRoom(room), 200);
    });
  } catch (err) {
    console.error('❌ Erro ao iniciar o jogo:', err);
    document.body.innerHTML = `<div style="color:red;padding:20px;font-family:monospace"><h2>❌ Erro ao iniciar</h2><pre>${err.stack || err.message}</pre></div>`;
  }
};