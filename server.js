'use strict';
/* =========================================================================
   BLAST ROYALE — servidor de jogo e sinalização WebRTC
   - Serve o jogo (arquivos estáticos) em http://localhost:8123
   - Cria salas com código curto e troca offer/answer entre os dois jogadores
   - Não guarda dados de partida: o gameplay continua P2P (WebRTC)
   - Relay com WebSocket (um socket por jogador) e fallback HTTP (signal+poll)
   - Dependência: ws (opcional — sem ela o relay funciona só por HTTP)
   ========================================================================= */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

let WebSocketServer = null;
try { ({ WebSocketServer } = require('ws')); }
catch (err) { console.warn('pacote ws ausente: relay usa apenas HTTP'); }

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 8123);
const HOST = process.env.HOST || '0.0.0.0';
const ROOM_TTL_MS = Number(process.env.ROOM_TTL_MINUTES || 120) * 60 * 1000;
const MAX_BODY = 256 * 1024;
// A fila guarda lotes de relay (~até 12 mensagens cada), então 240 cobre
// vários segundos de partida mesmo com o polling do outro lado oscilando.
const MAX_QUEUE = 240;
const POLL_TIMEOUT_MS = 12000;

/* ----------------------------- SEGURANÇA ------------------------------- */
/* Cabeçalhos aplicados a todo conteúdo servido. A CSP libera só o que o jogo
   realmente usa: o SDK do Firebase (www.gstatic.com) e as fontes do Google;
   permite estilos/handlers inline (há style= e um script inline de flag no
   index.html) e conexões https/wss (sinalização do próprio host, um servidor
   alternativo via ?server= e o Realtime Database do Firebase). */
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy':
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://www.gstatic.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' data: https://fonts.gstatic.com; " +
    "img-src 'self' data: blob:; " +
    "media-src 'self' data: blob:; " +
    "connect-src 'self' https: wss: ws: blob:; " +
    "worker-src 'self' blob:; " +
    "object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'"
};

/* Rate limit simples por IP, em janela fixa. Não é para punir jogo normal
   (o relay HTTP manda ~15 requisições por segundo por jogador): os limites
   amplos servem de trava contra flood, e os apertados protegem as rotas
   caras (criar sala, entrar na fila). */
const rateBuckets = new Map();

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd) return fwd.split(',')[0].trim();
  return (req.socket && req.socket.remoteAddress) || 'unknown';
}

function rateLimit(bucket, limit, windowMs) {
  const now = Date.now();
  let entry = rateBuckets.get(bucket);
  if (!entry || now >= entry.reset) {
    entry = { count: 0, reset: now + windowMs };
    rateBuckets.set(bucket, entry);
  }
  entry.count += 1;
  return entry.count <= limit;
}

setInterval(() => {
  const now = Date.now();
  rateBuckets.forEach((entry, key) => { if (now >= entry.reset) rateBuckets.delete(key); });
}, 60000).unref();

/* O nick chega do cliente e é repassado ao oponente (e aparece no painel do
   servidor): tira caracteres de controle e de marcação, colapsa espaços e
   limita o tamanho. */
function sanitizeName(raw, fallback) {
  const cleaned = String(raw == null ? '' : raw)
    .replace(/[\u0000-\u001f\u007f<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 24);
  return cleaned || fallback;
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.wav': 'audio/wav',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8'
};

/* ----------------------------- ICE / TURN ------------------------------ */
function iceServers() {
  // Formato aceito: ICE_SERVERS='[{"urls":"turn:host:3478","username":"u","credential":"p"}]'
  if (process.env.ICE_SERVERS) {
    try {
      const parsed = JSON.parse(process.env.ICE_SERVERS);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    } catch (err) {
      console.warn('ICE_SERVERS inválido:', err.message);
    }
  }
  const list = [
    { urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] },
    { urls: 'stun:stun.cloudflare.com:3478' }
  ];
  if (process.env.TURN_URL) {
    list.push({
      urls: process.env.TURN_URL,
      username: process.env.TURN_USERNAME || '',
      credential: process.env.TURN_CREDENTIAL || ''
    });
  }
  return list;
}

/* ------------------------------- SALAS -------------------------------- */
const rooms = new Map();

function roomCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  for (let tries = 0; tries < 50; tries++) {
    const bytes = crypto.randomBytes(4);
    let code = '';
    for (let i = 0; i < 4; i++) code += alphabet[bytes[i] % alphabet.length];
    if (!rooms.has(code)) return code;
  }
  return String(Date.now()).slice(-5);
}

function newRoom(name) {
  const code = roomCode();
  const room = {
    code,
    created: Date.now(),
    updated: Date.now(),
    seq: 0,
    peers: {
      host: { token: crypto.randomBytes(16).toString('hex'), name: sanitizeName(name, 'Host'), since: Date.now() },
      guest: null
    },
    messages: { host: [], guest: [] },
    polls: { host: new Set(), guest: new Set() },
    sockets: { host: new Set(), guest: new Set() },
    goneTimers: { host: null, guest: null },
    closed: false
  };
  rooms.set(code, room);
  return room;
}

function peerRole(room, token) {
  if (!room || !token) return null;
  if (room.peers.host && room.peers.host.token === token) return 'host';
  if (room.peers.guest && room.peers.guest.token === token) return 'guest';
  return null;
}

function peersInfo(room) {
  return { host: !!room.peers.host, guest: !!room.peers.guest };
}

function sendJson(res, status, body) {
  const data = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(data),
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN'
  });
  res.end(data);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', chunk => {
      size += chunk.length;
      if (size > MAX_BODY) {
        reject(new Error('body-too-large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      if (!chunks.length) return resolve({});
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); }
      catch (err) { reject(new Error('invalid-json')); }
    });
    req.on('error', reject);
  });
}

function flushPolls(room, role) {
  const set = room.polls[role];
  if (!set || !set.size) return;
  const entries = Array.from(set);
  set.clear();
  entries.forEach(entry => respondPoll(room, role, entry));
}

function respondPoll(room, role, entry) {
  if (entry.done) return;
  entry.done = true;
  clearTimeout(entry.timer);
  const since = Number(entry.since) || 0;
  const list = (room.messages[role] || []).filter(m => m.seq > since);
  // Remove da fila o que já foi entregue para não crescer sem limite.
  const lastSeq = list.length ? list[list.length - 1].seq : since;
  room.messages[role] = (room.messages[role] || []).filter(m => m.seq > lastSeq);
  try {
    sendJson(entry.res, 200, {
      ok: true,
      seq: lastSeq,
      messages: list.map(m => ({ seq: m.seq, data: m.data })),
      peers: peersInfo(room),
      closed: !!room.closed,
      empty: list.length === 0
    });
  } catch (err) { /* cliente desconectou */ }
}

function closeRoom(room, reason) {
  if (!room) return;
  cancelPeerGone(room, 'host');
  cancelPeerGone(room, 'guest');
  room.closed = true;
  room.updated = Date.now();
  broadcastSockets(room, { closed: true, peers: peersInfo(room), reason: reason || 'left' });
  ['host', 'guest'].forEach(role => {
    room.sockets[role].forEach(ws => { try { ws.close(); } catch (err) {} });
    room.sockets[role].clear();
    const entries = Array.from(room.polls[role] || []);
    room.polls[role].clear();
    entries.forEach(entry => {
      if (entry.done) return;
      entry.done = true;
      clearTimeout(entry.timer);
      try {
        sendJson(entry.res, 200, {
          ok: true, seq: room.seq, messages: [], peers: peersInfo(room), closed: true, reason: reason || 'left'
        });
      } catch (err) { /* ignore */ }
    });
  });
  rooms.delete(room.code);
}

/* Um jogador pode sumir sem mandar /leave: aba morta, navegador travado,
   queda de rede. Sem isso o adversário ficaria preso para sempre — a sala
   não expira porque ele continua enviando snapshots e renovando o TTL.
   Aqui a ausência de transporte (socket E long-poll) por alguns segundos
   conta como saída, igual ao /leave. O valor fica acima da janela de
   reconexão do cliente (NET_GRACE_MS = 12s) para não encerrar uma partida
   que o próprio jogo ainda está tentando salvar. */
const PEER_GONE_MS = 15000;

function peerHasTransport(room, role) {
  if (room.sockets[role] && room.sockets[role].size) return true;
  if (room.polls[role] && room.polls[role].size) return true;
  return false;
}

function cancelPeerGone(room, role) {
  const timer = room && room.goneTimers && room.goneTimers[role];
  if (timer) { clearTimeout(timer); room.goneTimers[role] = null; }
}

function schedulePeerCheck(room, role) {
  if (!room || room.closed) return;
  cancelPeerGone(room, role);
  const timer = setTimeout(() => {
    room.goneTimers[role] = null;
    if (room.closed) return;
    if (!room.peers[role]) return;            // já saiu via /leave
    if (peerHasTransport(room, role)) return; // reconectou dentro da janela
    room.peers[role] = null;
    room.updated = Date.now();
    broadcastSockets(room, { peers: peersInfo(room) });
    if (role === 'host') closeRoom(room, 'host-gone');
    else { flushPolls(room, 'host'); if (!room.peers.host) closeRoom(room, 'empty'); }
  }, PEER_GONE_MS);
  if (timer.unref) timer.unref();
  room.goneTimers[role] = timer;
}

/* ------------------------------ WEBSOCKET ------------------------------- */
/* Cada jogador pode abrir um socket na sala. Com socket, as mensagens vão
   direto (sem requisição por lote); sem socket, a rota /signal + /poll
   continua funcionando como fallback. */
function sendToSockets(room, role, payload) {
  const set = room.sockets[role];
  if (!set || !set.size) return false;
  const data = JSON.stringify(payload);
  let sent = false;
  set.forEach(ws => {
    if (ws.readyState === 1) {
      try { ws.send(data); sent = true; } catch (err) { /* ignore */ }
    }
  });
  return sent;
}

function broadcastSockets(room, payload) {
  sendToSockets(room, 'host', payload);
  sendToSockets(room, 'guest', payload);
}

/* Entrega uma mensagem de jogo ao outro jogador: socket quando existe,
   senão fila do long-poll. Sempre com seq para nunca duplicar.
   `msg` pode ser null (sinal antigo em base64): aí vai como está. */
function relayMessage(room, fromRole, msg, raw) {
  if (msg && typeof msg === 'object') bracketObserveRelay(room, fromRole, msg);
  const target = fromRole === 'host' ? 'guest' : 'host';
  room.seq += 1;
  const seq = room.seq;
  room.updated = Date.now();
  if (msg && typeof msg === 'object' && sendToSockets(room, target, { m: msg, seq })) return seq;
  const data = typeof raw === 'string' ? raw : JSON.stringify(msg);
  room.messages[target].push({ seq, data, ts: Date.now() });
  if (room.messages[target].length > MAX_QUEUE) {
    room.messages[target].splice(0, room.messages[target].length - MAX_QUEUE);
  }
  flushPolls(room, target);
  return seq;
}

/* ---------------------------- FILA PÚBLICA ---------------------------- */
/* Busca rápida 1v1: dois jogadores esperando viram uma sala normal, com
   host/convite já definidos. A partida em si segue P2P/relay como sempre. */
const queue = new Map();
const QUEUE_STALE_MS = 12000;
const MATCH_TTL_MS = 60000;

function queuePrune() {
  const now = Date.now();
  queue.forEach((entry, id) => {
    if (entry.matched) {
      if (now - entry.matchedAt > MATCH_TTL_MS) queue.delete(id);
    } else if (now - entry.lastSeen > QUEUE_STALE_MS) {
      queue.delete(id);
    }
  });
}

function queueWaiting() {
  let n = 0;
  queue.forEach(e => { if (!e.matched) n++; });
  return n;
}

function queuePayload(entry) {
  if (entry.matched) return { ok: true, state: 'matched', room: entry.matched };
  return {
    ok: true,
    state: 'waiting',
    waited: Math.round((Date.now() - entry.since) / 1000),
    queued: queueWaiting()
  };
}

function queueFlush(entry) {
  if (!entry || !entry.waiters) return;
  const list = Array.from(entry.waiters);
  entry.waiters.clear();
  list.forEach(w => {
    if (w.done) return;
    w.done = true;
    clearTimeout(w.timer);
    try { sendJson(w.res, 200, queuePayload(entry)); } catch (err) { /* cliente saiu */ }
  });
}

/* O primeiro da fila vira host; um jogador nunca pareia consigo mesmo
   (mesmo nick em duas abas) nem com um ticket morto. */
function matchmake(ticket) {
  const now = Date.now();
  const other = Array.from(queue.values()).find(e =>
    e !== ticket && !e.matched && now - e.lastSeen < QUEUE_STALE_MS && e.name !== ticket.name
  );
  if (!other) return false;
  const room = newRoom(other.name);
  room.peers.guest = {
    token: crypto.randomBytes(16).toString('hex'),
    name: ticket.name,
    since: now
  };
  ticket.matched = { code: room.code, role: 'guest', token: room.peers.guest.token, peers: peersInfo(room) };
  other.matched = { code: room.code, role: 'host', token: room.peers.host.token, peers: peersInfo(room) };
  ticket.matchedAt = other.matchedAt = now;
  queueFlush(other);
  queueFlush(ticket);
  return true;
}

/* --------------------- MATA-MATA DO MÊS (PvP ONLINE) ------------------- */
/* Cada confronto da chave tem um slot (qf1..f1). O pareamento só acontece
   com os dois nomes da chave: um ticket declara o rival e o outro precisa
   declarar o primeiro. O resultado só é oficial quando os dois lados
   reportam, e lados opostos confirmam o vencedor. */
const bracketQueue = new Map();   // ticket id -> entrada da fila do mata-mata
const bracketRooms = new Map();   // code -> { slot, tokens, names, period, created }
const bracketResults = new Map(); // code -> { slot, reports, confirmed, winner, created }
const bracketPeriods = new Map(); // mês "YYYY-MM" -> { created, seeds, frozenAt, winners }
const BRACKET_RESULT_TTL_MS = 60 * 60 * 1000;
const BRACKET_PERIOD_TTL_MS = 60 * 24 * 60 * 60 * 1000;

/* Estado da chave em disco: seeds congeladas e vencedores sobrevivem a um
   restart do processo. O disco do Render é efêmero (some a cada deploy),
   mas o placar do mês não se perde num crash ou reinício simples. */
const BRACKET_DISK_FILE = path.join(ROOT, 'data', 'bracket-state.json');
let bracketSaveTimer = null;

function bracketDiskLoad() {
  try {
    const data = JSON.parse(fs.readFileSync(BRACKET_DISK_FILE, 'utf8'));
    (Array.isArray(data.periods) ? data.periods : []).forEach(pair => {
      const period = String((pair && pair[0]) || '');
      const st = pair && pair[1];
      if (!period || !st) return;
      bracketPeriods.set(period, {
        created: Number(st.created) || Date.now(),
        seeds: Array.isArray(st.seeds) ? st.seeds.map(String).slice(0, 8) : null,
        frozenAt: Number(st.frozenAt) || 0,
        winners: st.winners && typeof st.winners === 'object' ? st.winners : {}
      });
    });
    (Array.isArray(data.results) ? data.results : []).forEach(pair => {
      const code = String((pair && pair[0]) || '');
      const entry = pair && pair[1];
      if (!code || !entry) return;
      bracketResults.set(code, {
        slot: String(entry.slot || ''),
        reports: {},
        confirmed: !!entry.confirmed,
        winner: entry.winner || null,
        source: String(entry.source || ''),
        created: Number(entry.created) || Date.now()
      });
    });
  } catch (err) {
    // Primeiro boot ou arquivo corrompido: começa vazio.
  }
}

function bracketDiskWrite() {
  try {
    fs.mkdirSync(path.dirname(BRACKET_DISK_FILE), { recursive: true });
    const tmp = BRACKET_DISK_FILE + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify({
      periods: Array.from(bracketPeriods.entries()),
      results: Array.from(bracketResults.entries())
    }));
    fs.renameSync(tmp, BRACKET_DISK_FILE);
  } catch (err) {
    console.warn('mata-mata: falha ao gravar estado em disco:', err.message);
  }
}

function bracketDiskSave() {
  if (bracketSaveTimer) return;
  bracketSaveTimer = setTimeout(() => {
    bracketSaveTimer = null;
    bracketDiskWrite();
  }, 300);
  if (bracketSaveTimer.unref) bracketSaveTimer.unref();
}

function bracketDiskFlush() {
  if (bracketSaveTimer) {
    clearTimeout(bracketSaveTimer);
    bracketSaveTimer = null;
  }
  bracketDiskWrite();
}

/* Mês da chave no horário de Brasília (UTC-3). É o servidor que manda:
   o cliente adota o mês devolvido em vez de calcular o seu. */
function bracketPeriodKey(d = new Date()) {
  const brt = new Date(d.getTime() - 3 * 60 * 60 * 1000);
  const mm = String(brt.getUTCMonth() + 1).padStart(2, '0');
  return `${brt.getUTCFullYear()}-${mm}`;
}

function bracketPeriodStore(period) {
  let st = bracketPeriods.get(period);
  if (!st) {
    st = { created: Date.now(), seeds: null, frozenAt: 0, winners: {} };
    bracketPeriods.set(period, st);
  }
  return st;
}

function bracketPeriodPrune() {
  const now = Date.now();
  let removed = false;
  bracketPeriods.forEach((st, period) => {
    if (now - st.created > BRACKET_PERIOD_TTL_MS) { bracketPeriods.delete(period); removed = true; }
  });
  return removed;
}

function bracketPrune() {
  const now = Date.now();
  let persisted = false;
  bracketQueue.forEach((entry, id) => {
    if (entry.matched) {
      if (now - entry.matchedAt > MATCH_TTL_MS) bracketQueue.delete(id);
    } else if (now - entry.lastSeen > QUEUE_STALE_MS) {
      bracketQueue.delete(id);
    }
  });
  bracketRooms.forEach((entry, code) => {
    if (now - entry.created > BRACKET_RESULT_TTL_MS) bracketRooms.delete(code);
  });
  bracketResults.forEach((entry, code) => {
    if (now - entry.created > BRACKET_RESULT_TTL_MS) { bracketResults.delete(code); persisted = true; }
  });
  if (bracketPeriodPrune()) persisted = true;
  if (persisted) bracketDiskSave();
}

function bracketPayload(entry) {
  if (entry.matched) return { ok: true, state: 'matched', room: entry.matched };
  return {
    ok: true,
    state: 'waiting',
    slot: entry.slot,
    waited: Math.round((Date.now() - entry.since) / 1000)
  };
}

function bracketFlush(entry) {
  if (!entry || !entry.waiters) return;
  const list = Array.from(entry.waiters);
  entry.waiters.clear();
  list.forEach(w => {
    if (w.done) return;
    w.done = true;
    clearTimeout(w.timer);
    try { sendJson(w.res, 200, bracketPayload(entry)); } catch (err) { /* cliente saiu */ }
  });
}

function bracketMatchmake(ticket) {
  const now = Date.now();
  const mine = ticket.name.toLowerCase();
  const rival = String(ticket.opponent || '').toLowerCase();
  if (!rival || rival === mine) return false;
  const other = Array.from(bracketQueue.values()).find(e =>
    e !== ticket && !e.matched && e.slot === ticket.slot &&
    now - e.lastSeen < QUEUE_STALE_MS &&
    e.name.toLowerCase() === rival &&
    String(e.opponent || '').toLowerCase() === mine
  );
  if (!other) return false;
  const room = newRoom(other.name);
  room.bracketSlot = ticket.slot;
  room.peers.guest = {
    token: crypto.randomBytes(16).toString('hex'),
    name: ticket.name,
    since: now
  };
  bracketRooms.set(room.code, {
    slot: ticket.slot,
    tokens: { host: room.peers.host.token, guest: room.peers.guest.token },
    names: { host: room.peers.host.name, guest: room.peers.guest.name },
    period: bracketPeriodKey(),
    created: now
  });
  ticket.matched = { code: room.code, role: 'guest', token: room.peers.guest.token, peers: peersInfo(room), slot: ticket.slot };
  other.matched = { code: room.code, role: 'host', token: room.peers.host.token, peers: peersInfo(room), slot: ticket.slot };
  ticket.matchedAt = other.matchedAt = now;
  bracketFlush(other);
  bracketFlush(ticket);
  return true;
}

function bracketResultPayload(code) {
  const entry = bracketResults.get(code);
  if (!entry) return { ok: true, confirmed: false, winner: null, source: '', reports: { host: null, guest: null } };
  return {
    ok: true,
    confirmed: !!entry.confirmed,
    winner: entry.winner || null,
    source: entry.source || '',
    slot: entry.slot,
    reports: {
      host: entry.reports.host ? !!entry.reports.host.won : null,
      guest: entry.reports.guest ? !!entry.reports.guest.won : null
    }
  };
}

/* Devolve o papel (host/guest) de quem está chamando, mesmo que a sala já
   tenha sido fechada (o resultado não pode se perder por causa disso). */
function bracketRoleOf(code, token) {
  const info = bracketRooms.get(code);
  if (!info || !token) return null;
  if (info.tokens.host === token) return 'host';
  if (info.tokens.guest === token) return 'guest';
  return null;
}

/* Resultado automático do mata-mata: ninguém declara vitória/derrota.
   A partida da chave passa toda pelo servidor (relay), e o servidor lê o
   estado final autoritativo (snapshot do host) para saber quem sobrou vivo.
   Só o host simula a partida, então snapshots do convidado são ignorados. */
function bracketObserveRelay(room, fromRole, msg) {
  if (!room || fromRole !== 'host' || !msg || typeof msg !== 'object') return;
  const info = bracketRooms.get(room.code);
  if (!info) return;
  const batch = msg.t === 'rb' && Array.isArray(msg.m) ? msg.m : [msg];
  for (const m of batch) {
    if (!m || typeof m !== 'object' || m.t !== 's' || !m.e) continue;
    const list = Array.isArray(m.f) ? m.f : [];
    const alive = list.filter(f => f && f.al);
    // Exatamente um de pé = vencedor. Empate (dois ou nenhum) não avança.
    if (alive.length !== 1) continue;
    const dev = alive[0].d;
    const winner = dev === 'p1' ? 'host' : dev === 'p2' ? 'guest' : null;
    if (!winner) continue;
    let entry = bracketResults.get(room.code);
    if (!entry) {
      entry = { slot: info.slot, reports: {}, confirmed: false, winner: null, source: '', created: Date.now() };
      bracketResults.set(room.code, entry);
    }
    if (entry.confirmed) return;
    entry.confirmed = true;
    entry.winner = winner;
    entry.source = 'match';
    const st = bracketPeriodStore(info.period || bracketPeriodKey());
    const name = info.names && info.names[winner];
    if (name && !st.winners[info.slot]) st.winners[info.slot] = String(name);
    bracketDiskSave();
    return;
  }
}

/* ------------------------------- ROTAS -------------------------------- */
async function handleApi(req, res, url) {
  const parts = url.pathname.split('/').filter(Boolean); // api, rooms, CODE, action

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  // Trava global por IP contra flood. O limite é folgado de propósito: o
  // relay HTTP pode mandar ~15 requisições por segundo por jogador. As rotas
  // caras (criar sala, entrar na fila) têm limites apertados próprios.
  const ip = clientIp(req);
  if (!rateLimit('api:' + ip, 3000, 60000)) {
    return sendJson(res, 429, { ok: false, error: 'rate-limited' });
  }

  if (parts[1] === 'health' && req.method === 'GET') {
    return sendJson(res, 200, {
      ok: true,
      name: 'blast-royale-server',
      version: 1,
      rooms: rooms.size,
      queue: queueWaiting(),
      uptime: Math.round(process.uptime()),
      iceServers: iceServers()
    });
  }

  if (parts[1] === 'ice' && req.method === 'GET') {
    return sendJson(res, 200, { iceServers: iceServers() });
  }

  if (parts[1] === 'matchmaking' && parts[2] === 'join' && req.method === 'POST') {
    if (!rateLimit('queue:' + ip, 20, 60000)) return sendJson(res, 429, { ok: false, error: 'rate-limited' });
    queuePrune();
    const body = await readBody(req);
    const name = sanitizeName(body.name, 'Jogador');
    const ticket = {
      id: crypto.randomBytes(12).toString('hex'),
      name,
      since: Date.now(),
      lastSeen: Date.now(),
      matched: null,
      matchedAt: 0,
      waiters: new Set()
    };
    queue.set(ticket.id, ticket);
    matchmake(ticket);
    return sendJson(res, 200, Object.assign({ ticket: ticket.id }, queuePayload(ticket)));
  }

  if (parts[1] === 'matchmaking' && parts[2] === 'poll' && req.method === 'POST') {
    queuePrune();
    const body = await readBody(req);
    const entry = queue.get(String(body.ticket || ''));
    if (!entry) return sendJson(res, 410, { ok: false, error: 'ticket-expired' });
    entry.lastSeen = Date.now();
    if (entry.matched) return sendJson(res, 200, queuePayload(entry));
    const waiter = { res, done: false, timer: null };
    entry.waiters.add(waiter);
    waiter.timer = setTimeout(() => {
      entry.waiters.delete(waiter);
      if (waiter.done) return;
      waiter.done = true;
      try { sendJson(res, 200, queuePayload(entry)); } catch (err) { /* cliente saiu */ }
    }, POLL_TIMEOUT_MS);
    req.on('close', () => {
      waiter.done = true;
      clearTimeout(waiter.timer);
      entry.waiters.delete(waiter);
    });
    return;
  }

  if (parts[1] === 'matchmaking' && parts[2] === 'leave' && req.method === 'POST') {
    const body = await readBody(req);
    const entry = queue.get(String(body.ticket || ''));
    if (entry) {
      // Se a pessoa cancelou já pareada, a sala não pode ficar esperando
      // um convidado que nunca vai chegar (o host começaria sozinho).
      if (entry.matched) {
        const room = rooms.get(entry.matched.code);
        const role = peerRole(room, entry.matched.token);
        if (room && !room.closed && role) {
          cancelPeerGone(room, role);
          room.peers[role] = null;
          room.updated = Date.now();
          broadcastSockets(room, { peers: peersInfo(room) });
          if (role === 'host') closeRoom(room, 'host-left');
          else { flushPolls(room, 'host'); if (!room.peers.host) closeRoom(room, 'empty'); }
        }
      }
      entry.waiters.forEach(waiter => {
        if (waiter.done) return;
        waiter.done = true;
        clearTimeout(waiter.timer);
        try { sendJson(waiter.res, 200, { ok: true, state: 'left' }); } catch (err) { /* ignore */ }
      });
      queue.delete(entry.id);
    }
    return sendJson(res, 200, { ok: true });
  }

  if (parts[1] === 'bracket' && parts[2] === 'state' && req.method === 'POST') {
    bracketPrune();
    const body = await readBody(req);
    const period = bracketPeriodKey();
    const st = bracketPeriodStore(period);
    // O Top 8 do mês é congelado pelo PRIMEIRO envio; envios seguintes
    // recebem a lista já congelada e não podem alterá-la.
    if (!st.seeds && Array.isArray(body.seeds)) {
      const seen = new Set();
      const list = [];
      body.seeds.forEach(raw => {
        const name = String(raw || '').trim().slice(0, 24);
        const key = name.toLowerCase();
        if (!name || seen.has(key)) return;
        seen.add(key);
        list.push(name);
      });
      if (list.length >= 2) {
        st.seeds = list.slice(0, 8);
        st.frozenAt = Date.now();
        bracketDiskSave();
      }
    }
    return sendJson(res, 200, {
      ok: true,
      period,
      seeds: st.seeds,
      frozenAt: st.frozenAt,
      winners: st.winners
    });
  }

  if (parts[1] === 'bracket' && parts[2] === 'join' && req.method === 'POST') {
    if (!rateLimit('bracket:' + ip, 20, 60000)) return sendJson(res, 429, { ok: false, error: 'rate-limited' });
    bracketPrune();
    const body = await readBody(req);
    const slot = String(body.slot || '').trim().toLowerCase().slice(0, 8);
    if (!/^[a-z0-9]{2,8}$/.test(slot)) return sendJson(res, 400, { ok: false, error: 'bad-slot' });
    const name = String(body.name || '').trim().slice(0, 24) || 'Jogador';
    const opponent = String(body.opponent || '').trim().slice(0, 24);
    if (!opponent) return sendJson(res, 400, { ok: false, error: 'missing-opponent' });
    // Só quem está no Top 8 congelado deste mês entra no mata-mata. O
    // servidor não confia na checagem do cliente: sem seeds congeladas ou
    // com o nome fora delas, o ticket não abre.
    const periodSt = bracketPeriods.get(bracketPeriodKey());
    const seeds = periodSt && Array.isArray(periodSt.seeds) ? periodSt.seeds : null;
    if (!seeds || seeds.length < 2) return sendJson(res, 409, { ok: false, error: 'seeds-not-frozen' });
    if (!seeds.some(s => String(s).trim().toLowerCase() === name.trim().toLowerCase())) {
      return sendJson(res, 403, { ok: false, error: 'not-qualified' });
    }
    const ticket = {
      id: crypto.randomBytes(12).toString('hex'),
      slot,
      name,
      opponent,
      since: Date.now(),
      lastSeen: Date.now(),
      matched: null,
      matchedAt: 0,
      waiters: new Set()
    };
    bracketQueue.set(ticket.id, ticket);
    bracketMatchmake(ticket);
    return sendJson(res, 200, Object.assign({ ticket: ticket.id }, bracketPayload(ticket)));
  }

  if (parts[1] === 'bracket' && parts[2] === 'poll' && req.method === 'POST') {
    bracketPrune();
    const body = await readBody(req);
    const entry = bracketQueue.get(String(body.ticket || ''));
    if (!entry) return sendJson(res, 410, { ok: false, error: 'ticket-expired' });
    entry.lastSeen = Date.now();
    if (entry.matched) return sendJson(res, 200, bracketPayload(entry));
    const waiter = { res, done: false, timer: null };
    entry.waiters.add(waiter);
    waiter.timer = setTimeout(() => {
      entry.waiters.delete(waiter);
      if (waiter.done) return;
      waiter.done = true;
      try { sendJson(res, 200, bracketPayload(entry)); } catch (err) { /* cliente saiu */ }
    }, POLL_TIMEOUT_MS);
    req.on('close', () => {
      waiter.done = true;
      clearTimeout(waiter.timer);
      entry.waiters.delete(waiter);
    });
    return;
  }

  if (parts[1] === 'bracket' && parts[2] === 'leave' && req.method === 'POST') {
    const body = await readBody(req);
    const entry = bracketQueue.get(String(body.ticket || ''));
    if (entry) {
      if (entry.matched) {
        const room = rooms.get(entry.matched.code);
        const role = peerRole(room, entry.matched.token);
        if (room && !room.closed && role) {
          cancelPeerGone(room, role);
          room.peers[role] = null;
          room.updated = Date.now();
          broadcastSockets(room, { peers: peersInfo(room) });
          if (role === 'host') closeRoom(room, 'host-left');
          else { flushPolls(room, 'host'); if (!room.peers.host) closeRoom(room, 'empty'); }
        }
      }
      entry.waiters.forEach(waiter => {
        if (waiter.done) return;
        waiter.done = true;
        clearTimeout(waiter.timer);
        try { sendJson(waiter.res, 200, { ok: true, state: 'left' }); } catch (err) { /* ignore */ }
      });
      bracketQueue.delete(entry.id);
    }
    return sendJson(res, 200, { ok: true });
  }

  // O resultado NÃO vem do jogador. Esta rota existe só para clientes antigos:
  // ela devolve o que o servidor já deduziu do estado final da partida.
  if (parts[1] === 'bracket' && parts[2] === 'report' && req.method === 'POST') {
    bracketPrune();
    const body = await readBody(req);
    const code = String(body.code || '').toUpperCase();
    if (!bracketRoleOf(code, String(body.token || ''))) {
      return sendJson(res, 404, { ok: false, error: 'match-not-found' });
    }
    return sendJson(res, 200, bracketResultPayload(code));
  }

  if (parts[1] === 'bracket' && parts[2] === 'result' && req.method === 'POST') {
    bracketPrune();
    const body = await readBody(req);
    const code = String(body.code || '').toUpperCase();
    if (!bracketRoleOf(code, String(body.token || ''))) {
      return sendJson(res, 404, { ok: false, error: 'match-not-found' });
    }
    return sendJson(res, 200, bracketResultPayload(code));
  }

  if (parts[1] === 'rooms' && parts.length === 2 && req.method === 'POST') {
    if (!rateLimit('rooms:' + ip, 12, 60000)) return sendJson(res, 429, { ok: false, error: 'rate-limited' });
    const body = await readBody(req);
    const room = newRoom(body.name);
    return sendJson(res, 201, {
      ok: true,
      code: room.code,
      role: 'host',
      token: room.peers.host.token,
      peers: peersInfo(room)
    });
  }

  if (parts[1] === 'rooms' && parts[3] === 'join' && req.method === 'POST') {
    const room = rooms.get(String(parts[2] || '').toUpperCase());
    if (!room || room.closed) return sendJson(res, 404, { ok: false, error: 'room-not-found' });
    if (room.peers.guest) return sendJson(res, 409, { ok: false, error: 'room-full' });
    const body = await readBody(req);
    room.peers.guest = {
      token: crypto.randomBytes(16).toString('hex'),
      name: sanitizeName(body.name, 'Guest'),
      since: Date.now()
    };
    room.updated = Date.now();
    cancelPeerGone(room, 'guest');
    flushPolls(room, 'host');
    broadcastSockets(room, { peers: peersInfo(room) });
    return sendJson(res, 200, {
      ok: true, code: room.code, role: 'guest', token: room.peers.guest.token, peers: peersInfo(room)
    });
  }

  if (parts[1] === 'rooms' && parts[3] === 'signal' && req.method === 'POST') {
    const room = rooms.get(String(parts[2] || '').toUpperCase());
    if (!room || room.closed) return sendJson(res, 404, { ok: false, error: 'room-not-found' });
    const body = await readBody(req);
    const role = peerRole(room, body.token);
    if (!role) return sendJson(res, 403, { ok: false, error: 'invalid-token' });
    cancelPeerGone(room, role);
    if (typeof body.data !== 'string' || !body.data) return sendJson(res, 400, { ok: false, error: 'missing-data' });
    // Oferta/resposta antigas viajam em base64 puro; o relay usa JSON.
    let msg = null;
    try { msg = JSON.parse(body.data); } catch (err) { msg = null; }
    const seq = relayMessage(room, role, msg, body.data);
    return sendJson(res, 200, { ok: true, seq });
  }

  if (parts[1] === 'rooms' && parts[3] === 'poll' && req.method === 'GET') {
    const room = rooms.get(String(parts[2] || '').toUpperCase());
    if (!room || room.closed) return sendJson(res, 404, { ok: false, error: 'room-not-found' });
    const token = url.searchParams.get('token') || '';
    const role = peerRole(room, token);
    if (!role) return sendJson(res, 403, { ok: false, error: 'invalid-token' });
    cancelPeerGone(room, role);
    const since = Number(url.searchParams.get('since') || 0) || 0;
    const entry = { res, role, since, done: false, timer: null };
    const pending = (room.messages[role] || []).some(m => m.seq > since);
    if (pending) return respondPoll(room, role, entry);
    room.polls[role].add(entry);
    entry.timer = setTimeout(() => {
      room.polls[role].delete(entry);
      respondPoll(room, role, entry);
    }, POLL_TIMEOUT_MS);
    req.on('close', () => {
      entry.done = true;
      clearTimeout(entry.timer);
      room.polls[role].delete(entry);
    });
    return;
  }

  if (parts[1] === 'rooms' && parts[3] === 'leave' && req.method === 'POST') {
    const room = rooms.get(String(parts[2] || '').toUpperCase());
    if (!room) return sendJson(res, 200, { ok: true });
    const body = await readBody(req);
    const role = peerRole(room, body.token);
    if (!role) return sendJson(res, 403, { ok: false, error: 'invalid-token' });
    cancelPeerGone(room, role);
    room.peers[role] = null;
    room.updated = Date.now();
    broadcastSockets(room, { peers: peersInfo(room) });
    const other = role === 'host' ? 'guest' : 'host';
    if (role === 'host') {
      closeRoom(room, 'host-left');
    } else {
      flushPolls(room, 'host');
      if (!room.peers.host) closeRoom(room, 'empty');
    }
    return sendJson(res, 200, { ok: true, other });
  }

  if (parts[1] === 'rooms' && parts.length === 3 && req.method === 'GET') {
    const room = rooms.get(String(parts[2] || '').toUpperCase());
    if (!room || room.closed) return sendJson(res, 404, { ok: true, exists: false });
    return sendJson(res, 200, { ok: true, exists: true, peers: peersInfo(room) });
  }

  return sendJson(res, 404, { ok: false, error: 'not-found' });
}

/* ---------------------------- ESTÁTICOS ------------------------------- */
function serveStatic(req, res, url) {
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); }
  catch (err) { return sendText(res, 400, 'Bad request'); }

  if (pathname === '/' || pathname === '') pathname = '/index.html';
  const target = path.resolve(ROOT, '.' + pathname);
  if (target !== ROOT && !target.startsWith(ROOT + path.sep)) {
    return sendText(res, 403, 'Forbidden');
  }

  fs.stat(target, (err, stat) => {
    if (err || !stat.isFile()) return sendText(res, 404, 'Not found');
    const ext = path.extname(target).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';
    const noCache = /\.(html|js|css|webmanifest)$/i.test(target) || path.basename(target) === 'sw.js';
    const cacheControl = noCache ? 'no-cache' : 'public, max-age=86400';
    const headers = {
      'Content-Type': type,
      'Cache-Control': cacheControl,
      ...SECURITY_HEADERS
    };
    // Marca no HTML que este host tem o servidor de salas. Em hospedagem
    // estática o cliente não tenta /api e cai direto nos códigos manuais.
    if (path.basename(target) === 'index.html') {
      return fs.readFile(target, 'utf8', (readErr, html) => {
        if (readErr) return sendText(res, 500, 'Read error');
        const flag = '<script>window.__BLAST_SERVER__=true;</script>';
        const out = html.includes('</head>') ? html.replace('</head>', flag + '</head>') : flag + html;
        res.writeHead(200, { ...headers, 'Content-Length': Buffer.byteLength(out) });
        if (req.method === 'HEAD') return res.end();
        res.end(out);
      });
    }
    res.writeHead(200, { ...headers, 'Content-Length': stat.size });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(target).pipe(res);
  });
}

function sendText(res, status, text) {
  res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(text);
}

/* ------------------------------- SERVIDOR ----------------------------- */
const server = http.createServer((req, res) => {
  let url;
  try { url = new URL(req.url, `http://${req.headers.host || 'localhost'}`); }
  catch (err) { return sendText(res, 400, 'Bad request'); }

  if (url.pathname.startsWith('/api/')) {
    handleApi(req, res, url).catch(err => {
      const status = err.message === 'body-too-large' ? 413 : err.message === 'invalid-json' ? 400 : 500;
      sendJson(res, status, { ok: false, error: err.message || 'server-error' });
    });
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') return sendText(res, 405, 'Method not allowed');
  serveStatic(req, res, url);
});

/* --------------------------- WEBSOCKET: UPGRADE ------------------------- */
function drainQueue(room, role, ws) {
  const pending = (room.messages[role] || []).splice(0);
  pending.forEach(item => {
    let msg = null;
    try { msg = JSON.parse(item.data); } catch (err) { return; }
    try { ws.send(JSON.stringify({ m: msg, seq: item.seq })); } catch (err) { /* ignore */ }
  });
}

if (WebSocketServer) {
  const wss = new WebSocketServer({ noServer: true });

  server.on('upgrade', (req, socket, head) => {
    let url = null;
    try { url = new URL(req.url || '/', 'http://localhost'); }
    catch (err) { socket.destroy(); return; }
    const parts = url.pathname.split('/').filter(Boolean); // api rooms CODE ws
    if (parts[0] !== 'api' || parts[1] !== 'rooms' || parts[3] !== 'ws') { socket.destroy(); return; }
    const room = rooms.get(String(parts[2] || '').toUpperCase());
    const role = peerRole(room, url.searchParams.get('token') || '');
    if (!room || !role) {
      socket.write('HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n');
      socket.destroy();
      return;
    }
    wss.handleUpgrade(req, socket, head, ws => {
      room.sockets[role].add(ws);
      room.updated = Date.now();
      cancelPeerGone(room, role);
      ws.isAlive = true;
      try { ws.send(JSON.stringify({ peers: peersInfo(room), role })); } catch (err) { /* ignore */ }
      drainQueue(room, role, ws);
      ws.on('pong', () => { ws.isAlive = true; });
      ws.on('message', raw => {
        let frame = null;
        try { frame = JSON.parse(String(raw)); } catch (err) { return; }
        if (!frame || typeof frame !== 'object' || !frame.m || room.closed) return;
        relayMessage(room, role, frame.m);
      });
      ws.on('close', () => {
        room.sockets[role].delete(ws);
        room.updated = Date.now();
        // Socket caiu: se o long-poll também não voltar, o jogador saiu.
        schedulePeerCheck(room, role);
      });
      ws.on('error', () => {
        room.sockets[role].delete(ws);
      });
    });
  });

  setInterval(() => {
    wss.clients.forEach(ws => {
      if (!ws.isAlive) return ws.terminate();
      ws.isAlive = false;
      try { ws.ping(); } catch (err) { /* ignore */ }
    });
  }, 30000).unref();
}

setInterval(() => {
  const now = Date.now();
  rooms.forEach(room => {
    if (now - room.updated > ROOM_TTL_MS) closeRoom(room, 'expired');
  });
  queuePrune();
  bracketPrune();
}, 60 * 1000).unref();

bracketDiskLoad();
bracketPrune();

server.listen(PORT, HOST, () => {
  const shown = HOST === '0.0.0.0' ? 'localhost' : HOST;
  console.log(`\n  Blast Royale server`);
  console.log(`  ➜  http://${shown}:${PORT}`);
  console.log(`  ➜  Salas WebRTC: /api/health`);
  console.log(`  ➜  TURN: ${process.env.TURN_URL ? 'configurado' : 'não configurado (use STUN ou configure TURN_URL)'}\n`);
});

process.on('SIGINT', () => {
  rooms.forEach(room => closeRoom(room, 'shutdown'));
  bracketDiskFlush();
  server.close(() => process.exit(0));
});

process.on('SIGTERM', () => {
  bracketDiskFlush();
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 1500).unref();
});
