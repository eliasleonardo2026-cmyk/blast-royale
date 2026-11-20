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
      host: { token: crypto.randomBytes(16).toString('hex'), name: String(name || 'Host').slice(0, 24), since: Date.now() },
      guest: null
    },
    messages: { host: [], guest: [] },
    polls: { host: new Set(), guest: new Set() },
    sockets: { host: new Set(), guest: new Set() },
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
    'Access-Control-Allow-Origin': '*'
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

/* --------------------- MATA-MATA SEMANAL (PvP ONLINE) ------------------ */
/* Cada confronto da chave tem um slot (qf1..f1). O pareamento só acontece
   com os dois nomes da chave: um ticket declara o rival e o outro precisa
   declarar o primeiro. O resultado só é oficial quando os dois lados
   reportam, e lados opostos confirmam o vencedor. */
const bracketQueue = new Map();   // ticket id -> entrada da fila do mata-mata
const bracketRooms = new Map();   // code -> { slot, tokens: {host, guest}, created }
const bracketResults = new Map(); // code -> { slot, reports, confirmed, winner, created }
const BRACKET_RESULT_TTL_MS = 60 * 60 * 1000;

function bracketPrune() {
  const now = Date.now();
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
    if (now - entry.created > BRACKET_RESULT_TTL_MS) bracketResults.delete(code);
  });
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
  if (!entry) return { ok: true, confirmed: false, winner: null, reports: { host: null, guest: null } };
  return {
    ok: true,
    confirmed: !!entry.confirmed,
    winner: entry.winner || null,
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
    queuePrune();
    const body = await readBody(req);
    const name = String(body.name || 'Jogador').trim().slice(0, 24) || 'Jogador';
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

  if (parts[1] === 'bracket' && parts[2] === 'join' && req.method === 'POST') {
    bracketPrune();
    const body = await readBody(req);
    const slot = String(body.slot || '').trim().toLowerCase().slice(0, 8);
    if (!/^[a-z0-9]{2,8}$/.test(slot)) return sendJson(res, 400, { ok: false, error: 'bad-slot' });
    const name = String(body.name || '').trim().slice(0, 24) || 'Jogador';
    const opponent = String(body.opponent || '').trim().slice(0, 24);
    if (!opponent) return sendJson(res, 400, { ok: false, error: 'missing-opponent' });
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

  if (parts[1] === 'bracket' && parts[2] === 'report' && req.method === 'POST') {
    bracketPrune();
    const body = await readBody(req);
    const code = String(body.code || '').toUpperCase();
    const role = bracketRoleOf(code, String(body.token || ''));
    if (!role) return sendJson(res, 404, { ok: false, error: 'match-not-found' });
    let entry = bracketResults.get(code);
    if (!entry) {
      entry = { slot: bracketRooms.get(code).slot, reports: {}, confirmed: false, winner: null, created: Date.now() };
      bracketResults.set(code, entry);
    }
    entry.reports[role] = { won: !!body.won, ts: Date.now() };
    if (!entry.confirmed && entry.reports.host && entry.reports.guest) {
      const h = !!entry.reports.host.won;
      const g = !!entry.reports.guest.won;
      entry.confirmed = true;
      // Resultados iguais (os dois dizem que venceram) anulam o confronto.
      entry.winner = h === g ? null : (h ? 'host' : 'guest');
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
      name: String(body.name || 'Guest').slice(0, 24),
      since: Date.now()
    };
    room.updated = Date.now();
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
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
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

server.listen(PORT, HOST, () => {
  const shown = HOST === '0.0.0.0' ? 'localhost' : HOST;
  console.log(`\n  Blast Royale server`);
  console.log(`  ➜  http://${shown}:${PORT}`);
  console.log(`  ➜  Salas WebRTC: /api/health`);
  console.log(`  ➜  TURN: ${process.env.TURN_URL ? 'configurado' : 'não configurado (use STUN ou configure TURN_URL)'}\n`);
});

process.on('SIGINT', () => {
  rooms.forEach(room => closeRoom(room, 'shutdown'));
  server.close(() => process.exit(0));
});
