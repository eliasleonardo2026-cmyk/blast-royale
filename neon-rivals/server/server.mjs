import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { WebSocket, WebSocketServer } from 'ws';
import {
  ARENA_HEIGHT, ARENA_WIDTH, BULLET_DAMAGE, BULLET_LIFETIME_MS, BULLET_SPEED,
  DASH_COOLDOWN_MS, DASH_INVULN_MS, DASH_MS, DASH_SPEED, FIRE_COOLDOWN_MS,
  MATCH_SECONDS, MAX_PLAYERS, MIN_PLAYERS, PLAYER_RADIUS, PLAYER_SPEED,
  RESPAWN_MS, ROUND_COUNTDOWN_MS, clamp, normalize, randomSpawn
} from '../src/game/simulation.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(HERE, '../dist');
const PORT = Number(process.env.PORT || 3001);
const TICK_MS = 1000 / 20;
const COLORS = ['#56f4dd', '#ff4f9a', '#ffc76b', '#9b83ff'];
const BOT_NAMES = ['BOT VEGA', 'BOT ORION', 'BOT LYRA'];
const SOLO_BOT_COUNT = 3;
const clients = new Map();
const queue = [];
const matches = new Map();
let queueTimer = null;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

function send(client, payload) {
  if (client?.ws?.readyState === WebSocket.OPEN) {
    client.ws.send(JSON.stringify(payload));
  }
}

function cleanName(value) {
  const name = String(value || 'PILOTO')
    .replace(/[<>\u0000-\u001f\u007f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 16);
  return name || 'PILOTO';
}

function removeFromQueue(client) {
  const index = queue.indexOf(client);
  if (index !== -1) queue.splice(index, 1);
  client.queued = false;
}

function makePlayer(participant, index, total) {
  const spawn = randomSpawn(index, total);
  return {
    id: participant.id,
    name: participant.name,
    color: COLORS[index % COLORS.length],
    bot: participant.bot === true,
    x: spawn.x,
    y: spawn.y,
    hp: 100,
    kills: 0,
    deaths: 0,
    alive: true,
    respawnAt: 0,
    input: { moveX: 0, moveY: 0, aimX: ARENA_WIDTH / 2, aimY: ARENA_HEIGHT / 2, shoot: false, dash: false },
    dashPressed: false,
    dashUntil: 0,
    dashReadyAt: 0,
    invulnerableUntil: 0,
    fireReadyAt: 0,
    nextThinkAt: 0
  };
}

function broadcastMatch(match, payload) {
  for (const client of match.clients.values()) send(client, payload);
}

function makeSnapshot(match, now) {
  const players = [...match.players.values()];
  const ranked = [...players].sort((a, b) => b.kills - a.kills || a.deaths - b.deaths || a.name.localeCompare(b.name));
  return {
    type: 'state',
    matchId: match.id,
    phase: match.phase,
    now,
    startsAt: match.startsAt,
    endsAt: match.endsAt,
    winnerIds: match.winnerIds || [],
    players: players.map(player => ({
      id: player.id,
      name: player.name,
      color: player.color,
      x: Math.round(player.x * 10) / 10,
      y: Math.round(player.y * 10) / 10,
      hp: player.hp,
      kills: player.kills,
      deaths: player.deaths,
      aimX: player.input.aimX,
      aimY: player.input.aimY,
      alive: player.alive,
      invulnerable: player.invulnerableUntil > now,
      dashReadyAt: player.dashReadyAt
    })),
    bullets: match.bullets.map(bullet => ({
      id: bullet.id,
      ownerId: bullet.ownerId,
      x: Math.round(bullet.x * 10) / 10,
      y: Math.round(bullet.y * 10) / 10,
      color: bullet.color
    })),
    leaderboard: ranked.map((player, index) => ({
      id: player.id, name: player.name, kills: player.kills, deaths: player.deaths, place: index + 1
    }))
  };
}

function finishMatch(match, now) {
  if (match.phase === 'results') return;
  match.phase = 'results';
  const players = [...match.players.values()];
  const best = players.reduce((value, player) => Math.max(value, player.kills), 0);
  match.winnerIds = players.filter(player => player.kills === best).map(player => player.id);
  match.finishedAt = now;
  const state = makeSnapshot(match, now);
  broadcastMatch(match, { ...state, type: 'result' });
  setTimeout(() => {
    for (const client of match.clients.values()) {
      if (client.match === match) client.match = null;
      send(client, { type: 'match-ended' });
    }
    matches.delete(match.id);
  }, 12000).unref?.();
}

function startMatch(group) {
  const id = randomUUID();
  const now = Date.now();
  const match = {
    id,
    phase: 'countdown',
    clients: new Map(),
    players: new Map(),
    bullets: [],
    createdAt: now,
    startsAt: now + ROUND_COUNTDOWN_MS,
    endsAt: now + ROUND_COUNTDOWN_MS + MATCH_SECONDS * 1000,
    lastTick: now,
    winnerIds: []
  };
  group.forEach((client, index) => {
    client.queued = false;
    client.match = match;
    match.clients.set(client.id, client);
    match.players.set(client.id, makePlayer(client, index, group.length));
  });
  matches.set(id, match);
  const found = {
    type: 'match-found',
    matchId: id,
    startsAt: match.startsAt,
    endsAt: match.endsAt,
    playerCount: group.length,
    selfIds: group.map(client => client.id)
  };
  for (const client of group) send(client, { ...found, selfId: client.id });
  broadcastMatch(match, makeSnapshot(match, now));
}

function beginQueuedMatches() {
  if (queueTimer) clearTimeout(queueTimer);
  queueTimer = null;
  while (queue.length >= MAX_PLAYERS) startMatch(queue.splice(0, MAX_PLAYERS));
  if (queue.length >= MIN_PLAYERS) {
    startMatch(queue.splice(0, Math.min(MAX_PLAYERS, queue.length)));
  }
}

function scheduleQueue() {
  if (queue.length >= MAX_PLAYERS) {
    beginQueuedMatches();
    return;
  }
  if (queue.length >= MIN_PLAYERS && !queueTimer) {
    queueTimer = setTimeout(beginQueuedMatches, 2600);
    queueTimer.unref?.();
  }
}

function queueClient(client, requestedName) {
  if (client.match || client.queued) return;
  client.name = cleanName(requestedName || client.name);
  client.queued = true;
  queue.push(client);
  for (const queued of queue) {
    send(queued, { type: 'queue', count: queue.length, max: MAX_PLAYERS });
  }
  scheduleQueue();
}

function handleInput(client, payload) {
  const player = client.match?.players.get(client.id);
  if (!player || client.match.phase !== 'running') return;
  const input = payload.input || {};
  const moveX = clamp(Number(input.moveX) || 0, -1, 1);
  const moveY = clamp(Number(input.moveY) || 0, -1, 1);
  const movement = normalize(moveX, moveY);
  player.input = {
    moveX: movement.x,
    moveY: movement.y,
    aimX: clamp(Number(input.aimX) || player.x, 0, ARENA_WIDTH),
    aimY: clamp(Number(input.aimY) || player.y, 0, ARENA_HEIGHT),
    shoot: input.shoot === true,
    dash: input.dash === true
  };
}

function tickMatch(match, now) {
  if (match.phase === 'results') return;
  const dt = Math.min(0.1, Math.max(0, (now - match.lastTick) / 1000));
  match.lastTick = now;
  if (match.phase === 'countdown' && now >= match.startsAt) match.phase = 'running';
  if (match.phase !== 'running') {
    broadcastMatch(match, makeSnapshot(match, now));
    return;
  }

  for (const player of match.players.values()) {
    if (!player.alive) {
      if (now >= player.respawnAt) {
        const spawn = randomSpawn(Math.floor(Math.random() * MAX_PLAYERS), MAX_PLAYERS);
        player.x = spawn.x;
        player.y = spawn.y;
        player.hp = 100;
        player.alive = true;
        player.invulnerableUntil = now + 800;
      }
      continue;
    }

    const input = player.input;
    const wantsDash = input.dash && !player.dashPressed;
    player.dashPressed = input.dash;
    if (wantsDash && now >= player.dashReadyAt) {
      const aim = normalize(input.aimX - player.x, input.aimY - player.y);
      const direction = Math.hypot(input.moveX, input.moveY) > 0.1
        ? normalize(input.moveX, input.moveY)
        : aim;
      player.dashDir = direction;
      player.dashUntil = now + DASH_MS;
      player.dashReadyAt = now + DASH_COOLDOWN_MS;
      player.invulnerableUntil = now + DASH_INVULN_MS;
    }

    const dashing = now < player.dashUntil;
    const direction = dashing ? player.dashDir : { x: input.moveX, y: input.moveY };
    const speed = dashing ? DASH_SPEED : PLAYER_SPEED;
    player.x = clamp(player.x + direction.x * speed * dt, PLAYER_RADIUS, ARENA_WIDTH - PLAYER_RADIUS);
    player.y = clamp(player.y + direction.y * speed * dt, PLAYER_RADIUS, ARENA_HEIGHT - PLAYER_RADIUS);

    if (input.shoot && now >= player.fireReadyAt) {
      const aim = normalize(input.aimX - player.x, input.aimY - player.y);
      if (Math.hypot(aim.x, aim.y) > 0.1) {
        match.bullets.push({
          id: randomUUID(),
          ownerId: player.id,
          x: player.x + aim.x * (PLAYER_RADIUS + 5),
          y: player.y + aim.y * (PLAYER_RADIUS + 5),
          vx: aim.x * BULLET_SPEED,
          vy: aim.y * BULLET_SPEED,
          color: player.color,
          bornAt: now
        });
        player.fireReadyAt = now + FIRE_COOLDOWN_MS;
      }
    }
  }

  const survivors = [];
  for (const bullet of match.bullets) {
    bullet.x += bullet.vx * dt;
    bullet.y += bullet.vy * dt;
    if (now - bullet.bornAt > BULLET_LIFETIME_MS ||
        bullet.x < 0 || bullet.y < 0 || bullet.x > ARENA_WIDTH || bullet.y > ARENA_HEIGHT) continue;

    let hit = false;
    for (const target of match.players.values()) {
      if (!target.alive || target.id === bullet.ownerId || target.invulnerableUntil > now) continue;
      if (Math.hypot(target.x - bullet.x, target.y - bullet.y) <= PLAYER_RADIUS + 5) {
        target.hp -= BULLET_DAMAGE;
        if (target.hp <= 0) {
          target.hp = 0;
          target.alive = false;
          target.deaths += 1;
          target.respawnAt = now + RESPAWN_MS;
          const attacker = match.players.get(bullet.ownerId);
          if (attacker) attacker.kills += 1;
        }
        hit = true;
        break;
      }
    }
    if (!hit) survivors.push(bullet);
  }
  match.bullets = survivors;

  if (now >= match.endsAt) finishMatch(match, now);
  else broadcastMatch(match, makeSnapshot(match, now));
}

function removeClient(client) {
  removeFromQueue(client);
  const match = client.match;
  if (match) {
    match.clients.delete(client.id);
    match.players.delete(client.id);
    client.match = null;
    if (match.phase !== 'results') {
      broadcastMatch(match, { ...makeSnapshot(match, Date.now()), type: 'state', notice: `${client.name} saiu da partida` });
      if (match.players.size < MIN_PLAYERS) finishMatch(match, Date.now());
    }
  }
  clients.delete(client.id);
  if (queue.length >= MIN_PLAYERS) scheduleQueue();
}

async function serveHttp(request, response) {
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
  if (url.pathname === '/api/health') {
    response.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    });
    response.end(JSON.stringify({ ok: true, game: 'neon-rivals', version: '0.1.0', playersOnline: clients.size, matches: matches.size }));
    return;
  }

  let filePath = path.resolve(DIST, `.${decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname)}`);
  if (!filePath.startsWith(DIST + path.sep) && filePath !== path.join(DIST, 'index.html')) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }
  try {
    const info = await stat(filePath);
    if (info.isDirectory()) filePath = path.join(filePath, 'index.html');
    const body = await readFile(filePath);
    response.writeHead(200, {
      'Content-Type': mimeTypes[path.extname(filePath)] || 'application/octet-stream',
      'Cache-Control': path.basename(filePath) === 'index.html' ? 'no-cache' : 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    });
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found. Run the Vite dev server in development.');
  }
}

const server = createServer((request, response) => {
  serveHttp(request, response).catch(() => {
    if (!response.headersSent) response.writeHead(500);
    response.end('Internal server error');
  });
});
const wss = new WebSocketServer({ noServer: true, maxPayload: 4096 });

server.on('upgrade', (request, socket, head) => {
  if (new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`).pathname !== '/ws') {
    socket.destroy();
    return;
  }
  wss.handleUpgrade(request, socket, head, ws => wss.emit('connection', ws, request));
});

wss.on('connection', ws => {
  const client = {
    id: randomUUID(),
    name: 'PILOTO',
    ws,
    queued: false,
    match: null,
    rateStart: Date.now(),
    rateCount: 0
  };
  clients.set(client.id, client);
  send(client, { type: 'welcome', id: client.id, playersOnline: clients.size });

  ws.on('message', raw => {
    const now = Date.now();
    if (now - client.rateStart >= 1000) {
      client.rateStart = now;
      client.rateCount = 0;
    }
    client.rateCount += 1;
    if (client.rateCount > 90) {
      ws.close(1008, 'rate limit');
      return;
    }
    let message;
    try { message = JSON.parse(raw.toString()); } catch { return; }
    if (!message || typeof message.type !== 'string') return;
    if (message.type === 'quickplay') queueClient(client, message.name);
    else if (message.type === 'cancel-queue') {
      removeFromQueue(client);
      send(client, { type: 'queue-cancelled' });
    } else if (message.type === 'input') handleInput(client, message);
    else if (message.type === 'leave') removeClient(client);
  });
  ws.on('close', () => removeClient(client));
  ws.on('error', () => removeClient(client));
});

setInterval(() => {
  const now = Date.now();
  for (const match of matches.values()) tickMatch(match, now);
}, TICK_MS).unref();

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Neon Rivals server listening on :${PORT}`);
  console.log(`Health: http://localhost:${PORT}/api/health`);
});
