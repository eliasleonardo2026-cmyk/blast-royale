'use strict';
/* =========================================================================
   BLAST ROYALE — servidor de jogo e sinalização WebRTC
   - Serve o jogo (arquivos estáticos) em http://localhost:8123
   - Cria salas com código curto e troca offer/answer entre os dois jogadores
   - Não guarda dados de partida: o gameplay continua P2P (WebRTC)
   - Zero dependências: rode `node server.js` (Node 18+)
   ========================================================================= */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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
  ['host', 'guest'].forEach(role => {
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
      uptime: Math.round(process.uptime()),
      iceServers: iceServers()
    });
  }

  if (parts[1] === 'ice' && req.method === 'GET') {
    return sendJson(res, 200, { iceServers: iceServers() });
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
    const target = role === 'host' ? 'guest' : 'host';
    const waiting = room.polls[target].size > 0;
    room.seq += 1;
    room.messages[target].push({ seq: room.seq, data: body.data, ts: Date.now() });
    if (room.messages[target].length > MAX_QUEUE) room.messages[target].splice(0, room.messages[target].length - MAX_QUEUE);
    room.updated = Date.now();
    flushPolls(room, target);
    return sendJson(res, 200, { ok: true, seq: room.seq, delivered: waiting });
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

setInterval(() => {
  const now = Date.now();
  rooms.forEach(room => {
    if (now - room.updated > ROOM_TTL_MS) closeRoom(room, 'expired');
  });
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
