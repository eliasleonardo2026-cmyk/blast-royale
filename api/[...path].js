'use strict';
/* =========================================================================
   BLAST ROYALE — API serverless para Vercel
   - Mesmas rotas de /api do server.js
   - Estado compartilhado em Redis (Upstash) via REST, sem dependências
   - Sem Upstash configurado, usa memória (só para testes locais)
   ========================================================================= */

const crypto = require('crypto');

const ROOM_TTL = Number(process.env.ROOM_TTL_MINUTES || 120) * 60;
// A fila guarda lotes de relay (~até 24 mensagens cada).
const MAX_QUEUE = 240;
const MAX_BODY = 256 * 1024;
// Um jogador pode sumir sem mandar /leave (aba morta, crash, rede caindo).
// No serverless não existe WebSocket para avisar da queda, então a liveness
// vem das próprias requisições: cada /poll marca o papel como "visto" e, ao
// atender um papel, o outro é considerado saído se ficou sem dar sinal por
// PEER_GONE_MS. O valor fica acima da janela de reconexão do cliente
// (NET_GRACE_MS = 12s) para não encerrar partida que o jogo ainda tenta salvar.
const PEER_GONE_MS = 15000;
const PEER_SEEN_TTL = 60;

/* ------------------------------ armazenamento --------------------------- */
const UPSTASH_URL = (process.env.UPSTASH_REDIS_REST_URL || '').replace(/\/+$/, '');
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || '';
const USE_REDIS = !!(UPSTASH_URL && UPSTASH_TOKEN);

const mem = globalThis.__blastRoyaleMem || (globalThis.__blastRoyaleMem = new Map());

function memGet(key) {
  const item = mem.get(key);
  if (!item) return null;
  if (item.exp && item.exp < Date.now()) { mem.delete(key); return null; }
  return item.value;
}
function memSet(key, value, ttl, nx) {
  if (nx && memGet(key) !== null) return false;
  mem.set(key, { value, exp: ttl ? Date.now() + ttl * 1000 : 0 });
  return true;
}

async function redis(command) {
  const res = await fetch(UPSTASH_URL, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + UPSTASH_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(command)
  });
  if (!res.ok) throw new Error('redis-http-' + res.status);
  const data = await res.json();
  if (data && data.error) throw new Error(data.error);
  return data ? data.result : null;
}

async function getJson(key) {
  const raw = USE_REDIS ? await redis(['GET', key]) : memGet(key);
  if (raw == null || raw === '') return null;
  try { return JSON.parse(raw); } catch (err) { return null; }
}

async function setJson(key, value, ttl, nx) {
  const raw = JSON.stringify(value);
  if (USE_REDIS) {
    const command = ['SET', key, raw];
    if (ttl) command.push('EX', String(ttl));
    if (nx) command.push('NX');
    const result = await redis(command);
    return result === 'OK';
  }
  return memSet(key, raw, ttl, nx);
}

async function setRaw(key, value, ttl, nx) {
  if (USE_REDIS) {
    const command = ['SET', key, String(value)];
    if (ttl) command.push('EX', String(ttl));
    if (nx) command.push('NX');
    const result = await redis(command);
    return result === 'OK';
  }
  return memSet(key, String(value), ttl, nx);
}

async function delKeys(keys) {
  if (!keys.length) return;
  if (USE_REDIS) await redis(['DEL', ...keys]);
  else keys.forEach(key => mem.delete(key));
}

async function getRaw(key) {
  const raw = USE_REDIS ? await redis(['GET', key]) : memGet(key);
  if (raw == null || raw === '') return null;
  return String(raw);
}

async function nextSeq(code) {
  const key = 'br:s:' + code;
  if (USE_REDIS) {
    const value = await redis(['INCR', key]);
    await redis(['EXPIRE', key, String(ROOM_TTL)]);
    return Number(value);
  }
  const value = Number(memGet(key) || 0) + 1;
  memSet(key, String(value), ROOM_TTL);
  return value;
}

async function pushMessage(code, role, message) {
  const key = 'br:q:' + code + ':' + role;
  if (USE_REDIS) {
    await redis(['RPUSH', key, JSON.stringify(message)]);
    await redis(['LTRIM', key, String(-MAX_QUEUE), '-1']);
    await redis(['EXPIRE', key, String(ROOM_TTL)]);
    return;
  }
  let list = [];
  const raw = memGet(key);
  if (raw) { try { list = JSON.parse(raw); } catch (err) { list = []; } }
  list.push(message);
  if (list.length > MAX_QUEUE) list = list.slice(-MAX_QUEUE);
  memSet(key, JSON.stringify(list), ROOM_TTL);
}

async function listMessages(code, role) {
  const key = 'br:q:' + code + ':' + role;
  if (USE_REDIS) {
    // Só as últimas 40 entradas: o relay manda lotes a cada ~50 ms e o
    // cliente só precisa do presente. Evita baixar a fila inteira em cada
    // poll (que nunca é apagada no Redis).
    const list = await redis(['LRANGE', key, '-40', '-1']);
    return (list || []).map(item => {
      try { return JSON.parse(item); } catch (err) { return null; }
    }).filter(Boolean);
  }
  const raw = memGet(key);
  if (!raw) return [];
  try { return JSON.parse(raw); } catch (err) { return []; }
}

/* --------------------------------- salas -------------------------------- */
function metaKey(code) { return 'br:m:' + code; }
function guestLockKey(code) { return 'br:g:' + code; }
function seenKey(code, role) { return 'br:p:' + code + ':' + role; }

async function touchSeen(code, role) {
  try { await setRaw(seenKey(code, role), Date.now(), PEER_SEEN_TTL); }
  catch (err) { /* liveness é best-effort: nunca derruba a requisição */ }
}

/* Dá por saído o outro papel se ele parou de dar sinal. Devolve true quando
   houve mudança, para a resposta já refletir o novo estado. */
async function reapStalePeer(code, room, selfRole) {
  const other = selfRole === 'host' ? 'guest' : 'host';
  if (!room.peers[other]) return false;
  let seen = null;
  try { seen = await getRaw(seenKey(code, other)); }
  catch (err) { return false; }
  const age = Date.now() - Number(seen);
  if (Number.isFinite(age) && age < PEER_GONE_MS) return false;
  room.peers[other] = null;
  room.updated = Date.now();
  if (other === 'host') {
    room.closed = true;
    await delKeys([
      'br:q:' + code + ':host', 'br:q:' + code + ':guest',
      guestLockKey(code), seenKey(code, 'host'), seenKey(code, 'guest')
    ]);
    await setJson(metaKey(code), room, 300);
  } else {
    await delKeys([guestLockKey(code), seenKey(code, 'guest')]);
    await setJson(metaKey(code), room, ROOM_TTL);
  }
  return true;
}

function roomCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  for (let tries = 0; tries < 50; tries++) {
    const bytes = crypto.randomBytes(4);
    let code = '';
    for (let i = 0; i < 4; i++) code += alphabet[bytes[i] % alphabet.length];
    if (!(memGet(metaKey(code)))) return code;
  }
  return String(Date.now()).slice(-5);
}

function peersInfo(room) {
  return { host: !!room.peers.host, guest: !!room.peers.guest };
}

function peerRole(room, token) {
  if (!room || !token) return null;
  if (room.peers.host && room.peers.host.token === token) return 'host';
  if (room.peers.guest && room.peers.guest.token === token) return 'guest';
  return null;
}

/* ---------------------------------- ICE --------------------------------- */
function iceServers() {
  if (process.env.ICE_SERVERS) {
    try {
      const parsed = JSON.parse(process.env.ICE_SERVERS);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    } catch (err) { /* usa o padrão */ }
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

/* --------------------------------- HTTP --------------------------------- */
function sendJson(res, status, body) {
  const data = JSON.stringify(body);
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Content-Length', Buffer.byteLength(data));
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(data);
}

function readBody(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return Promise.resolve(req.body);
  }
  if (typeof req.body === 'string' && req.body) {
    try { return Promise.resolve(JSON.parse(req.body)); }
    catch (err) { return Promise.reject(new Error('invalid-json')); }
  }
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', chunk => {
      size += chunk.length;
      if (size > MAX_BODY) { reject(new Error('body-too-large')); req.destroy(); return; }
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

async function handle(req, res, url) {
  const parts = url.pathname.split('/').filter(Boolean);

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.end();
  }

  if (parts[1] === 'health' && req.method === 'GET') {
    return sendJson(res, 200, {
      ok: true,
      name: 'blast-royale-server',
      mode: 'serverless',
      store: USE_REDIS ? 'redis' : 'memory',
      uptime: Math.round(process.uptime()),
      iceServers: iceServers()
    });
  }

  if (parts[1] === 'ice' && req.method === 'GET') {
    return sendJson(res, 200, { iceServers: iceServers() });
  }

  // A fila pública vive na memória de um processo único; no modo serverless
  // cada requisição pode cair em uma instância diferente.
  if (parts[1] === 'matchmaking' || parts[1] === 'bracket') {
    // Fila e resultado da chave vivem em memória: sem estado compartilhado
    // entre invocações serverless não há como parear/confirmar.
    return sendJson(res, 501, { ok: false, error: 'matchmaking-unavailable' });
  }

  if (parts[1] === 'rooms' && parts.length === 2 && req.method === 'POST') {
    const body = await readBody(req);
    let created = null;
    for (let tries = 0; tries < 20 && !created; tries++) {
      const code = roomCode();
      const room = {
        code,
        created: Date.now(),
        updated: Date.now(),
        peers: {
          host: {
            token: crypto.randomBytes(16).toString('hex'),
            name: String(body.name || 'Host').slice(0, 24),
            since: Date.now()
          },
          guest: null
        },
        closed: false
      };
      if (await setJson(metaKey(code), room, ROOM_TTL, true)) {
        await setRaw('br:s:' + code, 0, ROOM_TTL);
        await touchSeen(code, 'host');
        created = room;
      }
    }
    if (!created) return sendJson(res, 503, { ok: false, error: 'no-room-code' });
    return sendJson(res, 201, {
      ok: true,
      code: created.code,
      role: 'host',
      token: created.peers.host.token,
      peers: peersInfo(created)
    });
  }

  if (parts[1] === 'rooms' && parts[3] === 'join' && req.method === 'POST') {
    const code = String(parts[2] || '').toUpperCase();
    const room = await getJson(metaKey(code));
    if (!room || room.closed) return sendJson(res, 404, { ok: false, error: 'room-not-found' });
    if (room.peers.guest) return sendJson(res, 409, { ok: false, error: 'room-full' });
    const body = await readBody(req);
    const token = crypto.randomBytes(16).toString('hex');
    if (!(await setRaw(guestLockKey(code), token, ROOM_TTL, true))) {
      return sendJson(res, 409, { ok: false, error: 'room-full' });
    }
    room.peers.guest = { token, name: String(body.name || 'Guest').slice(0, 24), since: Date.now() };
    room.updated = Date.now();
    await setJson(metaKey(code), room, ROOM_TTL);
    await touchSeen(code, 'guest');
    return sendJson(res, 200, {
      ok: true, code, role: 'guest', token, peers: peersInfo(room)
    });
  }

  if (parts[1] === 'rooms' && parts[3] === 'signal' && req.method === 'POST') {
    const code = String(parts[2] || '').toUpperCase();
    const room = await getJson(metaKey(code));
    if (!room || room.closed) return sendJson(res, 404, { ok: false, error: 'room-not-found' });
    const body = await readBody(req);
    const role = peerRole(room, body.token);
    if (!role) return sendJson(res, 403, { ok: false, error: 'invalid-token' });
    if (typeof body.data !== 'string' || !body.data) {
      return sendJson(res, 400, { ok: false, error: 'missing-data' });
    }
    const target = role === 'host' ? 'guest' : 'host';
    const seq = await nextSeq(code);
    await pushMessage(code, target, { seq, data: body.data, ts: Date.now() });
    return sendJson(res, 200, { ok: true, seq });
  }

  if (parts[1] === 'rooms' && parts[3] === 'poll' && req.method === 'GET') {
    const code = String(parts[2] || '').toUpperCase();
    const room = await getJson(metaKey(code));
    if (!room) return sendJson(res, 404, { ok: false, error: 'room-not-found' });
    const token = url.searchParams.get('token') || '';
    const role = peerRole(room, token);
    if (!role) return sendJson(res, 403, { ok: false, error: 'invalid-token' });
    await touchSeen(code, role);
    // Se o outro lado sumiu sem /leave, a partida encerra aqui em vez de
    // ficar travada para sempre esperando alguém que não volta.
    await reapStalePeer(code, room, role);
    const since = Number(url.searchParams.get('since') || 0) || 0;
    const messages = (await listMessages(code, role)).filter(item => item.seq > since);
    const lastSeq = messages.length ? messages[messages.length - 1].seq : since;
    return sendJson(res, 200, {
      ok: true,
      seq: lastSeq,
      messages: messages.map(item => ({ seq: item.seq, data: item.data })),
      peers: peersInfo(room),
      closed: !!room.closed,
      empty: messages.length === 0
    });
  }

  if (parts[1] === 'rooms' && parts[3] === 'leave' && req.method === 'POST') {
    const code = String(parts[2] || '').toUpperCase();
    const room = await getJson(metaKey(code));
    if (!room) return sendJson(res, 200, { ok: true });
    const body = await readBody(req);
    const role = peerRole(room, body.token);
    if (!role) return sendJson(res, 403, { ok: false, error: 'invalid-token' });
    room.updated = Date.now();
    if (role === 'host') {
      room.closed = true;
      room.peers.host = null;
      await delKeys(['br:q:' + code + ':host', 'br:q:' + code + ':guest', guestLockKey(code), seenKey(code, 'host'), seenKey(code, 'guest')]);
      await setJson(metaKey(code), room, 300);
    } else {
      room.peers.guest = null;
      await delKeys([guestLockKey(code), seenKey(code, 'guest')]);
      await setJson(metaKey(code), room, ROOM_TTL);
    }
    return sendJson(res, 200, { ok: true, other: role === 'host' ? 'guest' : 'host' });
  }

  if (parts[1] === 'rooms' && parts.length === 3 && req.method === 'GET') {
    const code = String(parts[2] || '').toUpperCase();
    const room = await getJson(metaKey(code));
    if (!room) return sendJson(res, 404, { ok: true, exists: false });
    return sendJson(res, 200, { ok: true, exists: !room.closed, peers: peersInfo(room) });
  }

  return sendJson(res, 404, { ok: false, error: 'not-found' });
}

module.exports = async function handler(req, res) {
  let url;
  try { url = new URL(req.url || '/', 'http://localhost'); }
  catch (err) { return sendJson(res, 400, { ok: false, error: 'bad-request' }); }
  if (!url.pathname.startsWith('/api/')) {
    return sendJson(res, 404, { ok: false, error: 'not-found' });
  }
  try {
    await handle(req, res, url);
  } catch (err) {
    const status = err.message === 'body-too-large' ? 413 : err.message === 'invalid-json' ? 400 : 500;
    if (!res.headersSent) sendJson(res, status, { ok: false, error: err.message || 'server-error' });
  }
};
