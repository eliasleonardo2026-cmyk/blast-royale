/* ========================================================================
   BLAST ROYALE v6.0 - COMPLETE GAME ENGINE
   - Modos de Time (1v1, 2v2, 3v3)
   - Conquistas
   - Chroma Drop (mini-jogo das cores)
   - Multiplayer WebRTC
   ======================================================================== */

/* ========================================================================
   1. LOCALIZATION
   ======================================================================== */
const I18N = {
  pt: {
    subtitle: "Sobreviva à arena, chute bombas com ondas de choque e seja o último de pé!",
    nicknameLabel: "Seu Codinome", loadoutLabel: "Bomba Tática Inicial",
    tactShockName: "Choque", tactShockDesc: "Empurra rivais e bombas",
    tactCryoName: "Criogênica", tactCryoDesc: "Congela o chão e lentidão",
    tactC4Name: "C4 Remoto", tactC4Desc: "Detone quando quiser",
    featBush: "Arbustos Furtivos", featPortal: "Portais Quânticos", featDash: "Esquiva Dash",
    playBtn: "ENTRAR NA ARENA",
    stealthActive: "OCULTO NO ARBUSTO", zoneShrinking: "ZONA FECHANDO!",
    airdropIncoming: "AIRDROP A CAMINHO!",
    winTitle: "CAMPEÃO BLAST ROYALE!", winSub: "Você sobreviveu e venceu a partida!",
    loseTitle: "ELIMINADO!", loseSub: "Continue treinando seus combos e esquivas!",
    statKillsLabel: "Eliminações", statTimeLabel: "Sobrevivência",
    playAgainBtn: "JOGAR NOVAMENTE",
    eliminatedBy: "eliminou", stormEliminated: "foi esmagado pela Zona",
    selfEliminated: "explodiu a si mesmo",
    modeLabel: "Modo de Jogo", modeSoloDesc: "1 jogador + 11 bots",
    modeDuelDesc: "Duelo 1 contra 1", modeLocalDesc: "2 jogadores no mesmo PC",
    modeLocalDuelDesc: "Duelo 2 jogadores, sem bots, no mesmo PC",
    modeOnlineDesc: "2 jogadores pela internet", mapLabel: "Mapa",
    p2NameLabel: "Codinome do Jogador 2",
    tagSolo: "BATTLE ROYALE • 12 LUTADORES", tagDuel: "DUELO • 1 CONTRA 1",
    tagLocal: "MULTIPLAYER LOCAL • 2 JOGADORES", tagLocalDuel: "DUELO LOCAL • 1 V 1",
    tagOnline: "MULTIPLAYER ONLINE • 1 CONTRA 1",
    tagTeam1v1: "🥊 DUELO 1 v 1", tagTeam2v2: "⚔️ EQUIPE 2 v 2", tagTeam3v3: "🛡️ GUERRA 3 v 3",
    hintSolo: "WASD • ESPAÇO • E • Q • SHIFT",
    hintLocal: "P1: WASD / ESPAÇO / E / Q / SHIFT ESQ.  ·  P2: SETAS / ENTER / . / , / SHIFT DIR.",
    padOne: "1 controle conectado", padTwo: "2 controles conectados",
    p2Wins: "O Jogador 2 venceu a partida!", p2WinTitle: "JOGADOR 2 VENCEU!",
    careerWins: "vitórias", careerKills: "eliminações",
    duelWinSub: "Você venceu o duelo!", onlineWinSub: "Você venceu online. GG!",
    teamWinSub: "Seu time dominou a arena!", teamLoseSub: "Seu time foi eliminado!",
    exitBtn: "SAIR DA SALA", backToMenu: "Voltar ao lobby",
    onlineLabel: "Multiplayer a Distância",
    onlineHint: "Sem servidor: troque os códigos abaixo com seu amigo.",
    hostRole: "Criar sala", guestRole: "Entrar na sala",
    createInvite: "1. Gerar convite", connectAnswer: "2. Conectar",
    genAnswer: "Gerar resposta", copyCode: "Copiar", copied: "Copiado!",
    inviteLabel: "Envie este convite para o outro jogador",
    answerLabel: "Cole aqui a resposta que ele enviou",
    offerInLabel: "Cole aqui o convite recebido",
    responseLabel: "Envie esta resposta de volta para o host",
    netIdle: "Escolha criar ou entrar em uma sala.",
    netCreating: "Gerando código...",
    netInviteReady: "Convite pronto!",
    netAnswerReady: "Resposta pronta!",
    netConnecting: "Conectando...", netConnected: "Conectado!",
    netWaitingHost: "Aguardando o host iniciar...",
    netLost: "Conexão perdida.", netError: "Código inválido.",
    netNoIce: "Sua rede bloqueou WebRTC.", netReconnecting: "Reconectando..."
  },
  en: {
    subtitle: "Survive the shrinking arena, kick bombs and be the last standing!",
    nicknameLabel: "Your Callsign", loadoutLabel: "Starter Tactical Bomb",
    tactShockName: "Shockwave", tactShockDesc: "Pushes rivals & bombs",
    tactCryoName: "Cryo Blast", tactCryoDesc: "Freezes ground & slows",
    tactC4Name: "Remote C4", tactC4Desc: "Detonate on command",
    featBush: "Stealth Bushes", featPortal: "Quantum Portals", featDash: "Kinetic Dash",
    playBtn: "ENTER ARENA",
    stealthActive: "HIDDEN IN BUSH", zoneShrinking: "ZONE SHRINKING!",
    airdropIncoming: "AIRDROP INCOMING!",
    winTitle: "BLAST ROYALE CHAMPION!", winSub: "You survived and claimed #1!",
    loseTitle: "ELIMINATED!", loseSub: "Master combos and dashes to win!",
    statKillsLabel: "Eliminations", statTimeLabel: "Survival Time",
    playAgainBtn: "PLAY AGAIN",
    eliminatedBy: "eliminated", stormEliminated: "was crushed by the Zone",
    selfEliminated: "blew themselves up",
    modeLabel: "Game Mode", modeSoloDesc: "1 player + 11 bots",
    modeDuelDesc: "1 versus 1 duel", modeLocalDesc: "2 players on one PC",
    modeLocalDuelDesc: "2-player duel, no bots, same PC",
    modeOnlineDesc: "2 players over the internet", mapLabel: "Map",
    p2NameLabel: "Player 2 Callsign",
    tagSolo: "BATTLE ROYALE • 12 FIGHTERS", tagDuel: "DUEL • 1 VERSUS 1",
    tagLocal: "LOCAL MULTIPLAYER • 2 PLAYERS", tagLocalDuel: "LOCAL DUEL • 1 V 1",
    tagOnline: "ONLINE MULTIPLAYER • 1 VERSUS 1",
    tagTeam1v1: "🥊 DUEL 1 v 1", tagTeam2v2: "⚔️ TEAM 2 v 2", tagTeam3v3: "🛡️ WAR 3 v 3",
    hintSolo: "WASD • SPACE • E • Q • SHIFT",
    hintLocal: "P1: WASD / SPACE / E / Q / L-SHIFT  ·  P2: ARROWS / ENTER / . / , / R-SHIFT",
    padOne: "1 gamepad connected", padTwo: "2 gamepads connected",
    p2Wins: "Player 2 won the match!", p2WinTitle: "PLAYER 2 WINS!",
    careerWins: "wins", careerKills: "kills",
    duelWinSub: "You won the duel!", onlineWinSub: "You won online. GG!",
    teamWinSub: "Your team dominated the arena!", teamLoseSub: "Your team was eliminated!",
    exitBtn: "LEAVE ROOM", backToMenu: "Back to lobby",
    onlineLabel: "Online Multiplayer",
    onlineHint: "Serverless: swap codes with your friend.",
    hostRole: "Create room", guestRole: "Join room",
    createInvite: "1. Create invite", connectAnswer: "2. Connect",
    genAnswer: "Create answer", copyCode: "Copy", copied: "Copied!",
    inviteLabel: "Send this invite to the other player",
    answerLabel: "Paste the answer they sent back",
    offerInLabel: "Paste the invite you received",
    responseLabel: "Send this answer back to the host",
    netIdle: "Choose create or join a room.",
    netCreating: "Generating code...",
    netInviteReady: "Invite ready!",
    netAnswerReady: "Answer ready!",
    netConnecting: "Connecting...", netConnected: "Connected!",
    netWaitingHost: "Waiting for host...",
    netLost: "Connection lost.", netError: "Invalid code.",
    netNoIce: "WebRTC blocked.", netReconnecting: "Reconnecting..."
  }
};

/* ========================================================================
   2. ACHIEVEMENTS
   ======================================================================== */
const ACHIEVEMENTS = {
  first_blood: { icon: '🩸', title: 'Primeiro Sangue', desc: 'Elimine seu primeiro oponente', check: s => s.kills >= 1 },
  killer: { icon: '💀', title: 'Assassino', desc: 'Elimine 5 em uma partida', check: s => s.maxKillsInMatch >= 5 },
  survivor: { icon: '🛡️', title: 'Sobrevivente', desc: 'Sobreviva por 3 minutos', check: s => s.maxSurvivalTime >= 180 },
  champion: { icon: '🏆', title: 'Campeão', desc: 'Vença sua primeira partida', check: s => s.wins >= 1 },
  collector: { icon: '📦', title: 'Colecionador', desc: 'Vença 5 partidas', check: s => s.wins >= 5 },
  master: { icon: '👑', title: 'Mestre da Arena', desc: 'Vença 10 partidas', check: s => s.wins >= 10 },
  veteran: { icon: '🎖️', title: 'Veterano', desc: 'Jogue 20 partidas', check: s => s.matches >= 20 },
  godlike: { icon: '🌟', title: 'Divino', desc: '10 kills em uma partida', check: s => s.maxKillsInMatch >= 10 },
  marathon: { icon: '⏱️', title: 'Maratonista', desc: 'Sobreviva 5 minutos', check: s => s.maxSurvivalTime >= 300 },
  warrior: { icon: '⚔️', title: 'Guerreiro', desc: '50 eliminações no total', check: s => s.kills >= 50 }
};

/* ========================================================================
   3. SOUND EFFECTS
   ======================================================================== */
class SoundFX {
  constructor() { this.ctx = null; this.muted = false; }
  init() {
    if (!this.ctx) {
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) this.ctx = new AC();
      } catch (e) {}
    }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
  }
  toggleMute() { this.muted = !this.muted; return this.muted; }
  _tone(type, freq, dur, vol, ramp) {
    if (this.muted || !this.ctx) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (ramp) o.frequency.exponentialRampToValueAtTime(ramp, t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g); g.connect(this.ctx.destination);
    o.start(t); o.stop(t + dur + 0.02);
  }
  playPlaceBomb() { this._tone('sine', 220, 0.1, 0.14, 90); }
  playExplosion(df = 1.0) {
    if (this.muted || !this.ctx || df <= 0.05) return;
    const t = this.ctx.currentTime;
    const vol = Math.min(0.28, 0.25 * df);
    const dur = 0.42;
    const sz = Math.floor(this.ctx.sampleRate * dur);
    const buf = this.ctx.createBuffer(1, sz, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < sz; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (sz * 0.35));
    const n = this.ctx.createBufferSource(); n.buffer = buf;
    const f = this.ctx.createBiquadFilter(); f.type = 'lowpass';
    f.frequency.setValueAtTime(520, t); f.frequency.exponentialRampToValueAtTime(95, t + dur);
    const g = this.ctx.createGain(); g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    n.connect(f); f.connect(g); g.connect(this.ctx.destination); n.start(t);
    this._tone('triangle', 110, 0.35, vol * 1.1, 32);
  }
  playShockwave() { this._tone('sawtooth', 320, 0.34, 0.18, 55); }
  playCryo() {
    if (this.muted || !this.ctx) return;
    [1200, 1650, 2100].forEach((fr) => this._tone('sine', fr, 0.26, 0.07, fr * 0.65));
  }
  playDash() { this._tone('sine', 280, 0.16, 0.1, 640); }
  playPortal() { this._tone('triangle', 380, 0.24, 0.12, 920); }
  playPickup() {
    if (this.muted || !this.ctx) return;
    [587.33, 880].forEach((f) => this._tone('sine', f, 0.17, 0.1));
  }
  playHit() { this._tone('sawtooth', 160, 0.24, 0.18, 55); }
  playWarning() {
    if (this.muted || !this.ctx) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'square';
    o.frequency.setValueAtTime(440, t);
    o.frequency.setValueAtTime(554.37, t + 0.12);
    g.gain.setValueAtTime(0.05, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.26);
    o.connect(g); g.connect(this.ctx.destination);
    o.start(t); o.stop(t + 0.28);
  }
  playVictory() {
    if (this.muted || !this.ctx) return;
    [523.25, 659.25, 783.99, 1046.5].forEach((f) => this._tone('triangle', f, 0.47, 0.14));
  }
  playChromaCorrect() {
    if (this.muted || !this.ctx) return;
    [880, 1100].forEach((f, i) => setTimeout(() => this._tone('sine', f, 0.15, 0.12), i * 60));
  }
  playChromaWrong() {
    if (this.muted || !this.ctx) return;
    this._tone('sawtooth', 200, 0.4, 0.15, 80);
  }
  playChromaRound() {
    if (this.muted || !this.ctx) return;
    [660, 880, 1100].forEach((f, i) => setTimeout(() => this._tone('triangle', f, 0.12, 0.1), i * 50));
  }
}

const SFX = new SoundFX();

/* ========================================================================
   4. GAME CONSTANTS
   ======================================================================== */
const GRID_SIZE = 27;
const TILE_SIZE = 48;
const PLAYER_RADIUS = 14.5;
const WORLD_PX = GRID_SIZE * TILE_SIZE;
const MAX_SHAKE = 6;
const DASH_COOLDOWN = 2.4;
const DASH_DURATION = 0.16;

const CELL = { FLOOR: 0, CRUSHED: 1, PILLAR: 2, CRATE: 3, BUSH: 4, AIRDROP_CRATE: 5 };

const POWERUP_TYPES = {
  BOMB: { icon: '💣', color: '#38bdf8', label: '+1 BOMB' },
  RANGE: { icon: '🔥', color: '#fb923c', label: '+1 RANGE' },
  SPEED: { icon: '👟', color: '#a3e635', label: '+SPEED' },
  KICK: { icon: '🥾', color: '#34d399', label: '+KICK' },
  SHIELD: { icon: '🛡️', color: '#22d3ee', label: 'SHIELD' },
  SHOCK: { icon: '🌀', color: '#fbbf24', label: '+2 SHOCK' },
  CRYO: { icon: '❄️', color: '#67e8f9', label: '+2 CRYO' },
  C4: { icon: '📡', color: '#f43f5e', label: '+2 C4' }
};

const TACTICAL_META = {
  SHOCK: { icon: '🌀', label: 'SHOCK', color: '#fbbf24' },
  CRYO: { icon: '❄️', label: 'CRYO', color: '#67e8f9' },
  C4: { icon: '📡', label: 'C4', color: '#f43f5e' }
};

const TACTICAL_ORDER = ['SHOCK', 'CRYO', 'C4'];

/* 🆕 MODOS DE TIME */
const MODE_CONFIG = {
  SOLO:      { id: 'SOLO',      humans: 1, bots: 11, stormInterval: 25, startRing: 0, airdropTimer: 18, teamMode: false },
  TEAM1v1:   { id: 'TEAM1v1',   humans: 1, bots: 1,  stormInterval: 10, startRing: 3, airdropTimer: 9,  teamMode: true, teamSize: 1 },
  TEAM2v2:   { id: 'TEAM2v2',   humans: 1, bots: 3,  stormInterval: 15, startRing: 2, airdropTimer: 12, teamMode: true, teamSize: 2 },
  TEAM3v3:   { id: 'TEAM3v3',   humans: 1, bots: 5,  stormInterval: 20, startRing: 1, airdropTimer: 15, teamMode: true, teamSize: 3 },
  LOCAL:     { id: 'LOCAL',     humans: 2, bots: 10, stormInterval: 25, startRing: 0, airdropTimer: 18, teamMode: false },
  ONLINE:    { id: 'ONLINE',    humans: 2, bots: 0,  stormInterval: 10, startRing: 3, airdropTimer: 9,  teamMode: false }
};

const BOT_PROFILES = [
  { name: 'Nova', color: '#f472b6', visor: '#fdf2f8' },
  { name: 'Rook', color: '#60a5fa', visor: '#e0f2fe' },
  { name: 'Vex', color: '#a78bfa', visor: '#ede9fe' },
  { name: 'Kilo', color: '#fb923c', visor: '#ffedd5' },
  { name: 'Zane', color: '#22d3ee', visor: '#cffafe' },
  { name: 'Mira', color: '#f87171', visor: '#fee2e2' },
  { name: 'Ash', color: '#94a3b8', visor: '#f1f5f9' },
  { name: 'Juno', color: '#34d399', visor: '#d1fae5' },
  { name: 'Pyro', color: '#fbbf24', visor: '#fef3c7' },
  { name: 'Echo', color: '#c084fc', visor: '#f3e8ff' },
  { name: 'Bolt', color: '#38bdf8', visor: '#e0f2fe' },
  { name: 'Sly', color: '#fda4af', visor: '#fff1f2' }
];

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const now = () => performance.now() / 1000;
function worldToGrid(x, y) { return { c: Math.floor(x / TILE_SIZE), r: Math.floor(y / TILE_SIZE) }; }
function tileCenter(c, r) { return { x: (c + 0.5) * TILE_SIZE, y: (r + 0.5) * TILE_SIZE }; }
function inBounds(c, r) { return c >= 0 && r >= 0 && c < GRID_SIZE && r < GRID_SIZE; }
function formatTime(s) {
  const m = Math.floor(s / 60); const sec = Math.floor(s % 60);
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ========================================================================
   5. PREFERENCES & CAREER
   ======================================================================== */
let currentLang = 'pt';
let selectedStarterTactical = 'SHOCK';

const PREFS_KEY = 'blast-royale-prefs-v6';
const prefs = {
  name: 'Viper-01', name2: 'Viper-02', lang: 'pt', tactical: 'SHOCK', mode: 'SOLO', map: 'NEON',
  wins: 0, kills: 0, matches: 0, maxKillsInMatch: 0, maxSurvivalTime: 0,
  achievements: {}
};

function loadPrefs() {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (raw) Object.assign(prefs, JSON.parse(raw) || {});
    if (!prefs.achievements) prefs.achievements = {};
  } catch (e) {}
  return prefs;
}

function savePrefs(patch) {
  Object.assign(prefs, patch || {});
  try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); } catch (e) {}
}

function checkAchievements() {
  const newlyUnlocked = [];
  for (const [id, ach] of Object.entries(ACHIEVEMENTS)) {
    if (!prefs.achievements[id] && ach.check(prefs)) {
      prefs.achievements[id] = true;
      newlyUnlocked.push(ach);
    }
  }
  if (newlyUnlocked.length > 0) {
    savePrefs({ achievements: prefs.achievements });
    newlyUnlocked.forEach(ach => showAchievementPopup(ach));
  }
}

function showAchievementPopup(ach) {
  const popup = document.getElementById('achievementPopup');
  if (!popup) return;
  document.getElementById('achieveIcon').textContent = ach.icon;
  document.getElementById('achieveTitle').textContent = ach.title;
  document.getElementById('achieveDesc').textContent = ach.desc;
  popup.classList.remove('hidden');
  SFX.playVictory();
  setTimeout(() => popup.classList.add('hidden'), 4000);
}

function renderAchievementsModal() {
  const list = document.getElementById('achievementsList');
  if (!list) return;
  list.innerHTML = '';
  for (const [id, ach] of Object.entries(ACHIEVEMENTS)) {
    const unlocked = !!(prefs.achievements && prefs.achievements[id]);
    const item = document.createElement('div');
    item.className = `flex items-center gap-3 p-3 rounded-xl border-2 ${
      unlocked ? 'bg-amber-500/10 border-amber-400/50' : 'bg-slate-800/50 border-slate-700 opacity-60'
    }`;
    item.innerHTML = `
      <div class="text-3xl">${ach.icon}</div>
      <div class="flex-1">
        <div class="font-display font-extrabold text-white text-sm">${ach.title}</div>
        <div class="text-[11px] text-slate-300 mt-0.5">${ach.desc}</div>
      </div>
      ${unlocked ? '<div class="text-emerald-400 text-xl">✓</div>' : '<div class="text-slate-500 text-xl">🔒</div>'}
    `;
    list.appendChild(item);
  }
}

function recordCareer(result) {
  savePrefs({
    wins: (prefs.wins || 0) + (result.win ? 1 : 0),
    kills: (prefs.kills || 0) + (result.kills || 0),
    matches: (prefs.matches || 0) + 1,
    maxKillsInMatch: Math.max(prefs.maxKillsInMatch || 0, result.kills || 0),
    maxSurvivalTime: Math.max(prefs.maxSurvivalTime || 0, result.time || 0)
  });
  checkAchievements();
  updateCareerUI();
}

function updateCareerUI() {
  const el = document.getElementById('careerStats');
  if (!el) return;
  if (!prefs.matches) { el.style.display = 'none'; return; }
  const dict = I18N[currentLang] || {};
  el.style.display = 'block';
  el.textContent = `🏆 ${prefs.wins || 0} ${dict.careerWins || 'vitórias'}  ·  💀 ${prefs.kills || 0} ${dict.careerKills || 'eliminações'}`;
}

function applyLanguage(lang) {
  currentLang = lang;
  const dict = I18N[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n');
    if (dict[k]) el.textContent = dict[k];
  });
  const btnPT = document.getElementById('langPT');
  const btnEN = document.getElementById('langEN');
  if (lang === 'pt') {
    btnPT.className = 'px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500 text-slate-950 transition';
    btnEN.className = 'px-2.5 py-1 rounded-lg text-xs font-bold text-slate-300 hover:text-white transition';
  } else {
    btnEN.className = 'px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500 text-slate-950 transition';
    btnPT.className = 'px-2.5 py-1 rounded-lg text-xs font-bold text-slate-300 hover:text-white transition';
  }
}

/* ========================================================================
   6. DOM REFERENCES & GAME STATE
   ======================================================================== */
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const radarCanvas = document.getElementById('radarCanvas');
const rctx = radarCanvas.getContext('2d');

const UI = {
  hud: document.getElementById('hudLayer'),
  startScreen: document.getElementById('startScreen'),
  endModal: document.getElementById('endModal'),
  hearts: document.getElementById('hudHearts'),
  alive: document.getElementById('hudAlive'),
  stormTimer: document.getElementById('hudStormTimer'),
  kills: document.getElementById('hudKills'),
  statBombs: document.getElementById('statBombs'),
  statRange: document.getElementById('statRange'),
  statSpeed: document.getElementById('statSpeed'),
  shieldPill: document.getElementById('statShieldPill'),
  stealthBadge: document.getElementById('stealthBadge'),
  stormBanner: document.getElementById('stormBanner'),
  airdropBanner: document.getElementById('airdropBanner'),
  killFeed: document.getElementById('killFeed'),
  dashFill: document.getElementById('dashCooldownFill'),
  tacticalIcon: document.getElementById('tacticalIcon'),
  tacticalLabel: document.getElementById('tacticalLabel'),
  tacticalAmmo: document.getElementById('tacticalAmmoBadge'),
  btnTactical: document.getElementById('btnTactical'),
  btnPlayAgain: document.getElementById('btnPlayAgain'),
  hudP2: document.getElementById('hudP2'),
  hudP2Hearts: document.getElementById('hudP2Hearts'),
  hudP2Bombs: document.getElementById('hudP2Bombs'),
  hudP2Range: document.getElementById('hudP2Range'),
  hudP2Tactical: document.getElementById('hudP2Tactical'),
  hintText: document.getElementById('hintText'),
  nameInput: document.getElementById('playerNameInput'),
  joyContainer: document.getElementById('floatingJoystickContainer'),
  joyBase: document.getElementById('joystickBase'),
  joyKnob: document.getElementById('joystickKnob'),
  endTrophy: document.getElementById('endTrophy'),
  endRank: document.getElementById('endRankBadge'),
  endTitle: document.getElementById('endTitle'),
  endSub: document.getElementById('endSubtitle'),
  endKills: document.getElementById('endKillsVal'),
  endTime: document.getElementById('endTimeVal')
};

let grid = [];
let fighters = [];
let bombs = [];
let explosions = [];
let powerups = [];
let particles = [];
let floatingLabels = [];
let portals = [];
let safeSpawnSet = new Set();
let activeAirdrop = null;
let cryoTiles = new Map();
let bombSeq = 0;
let explosionSeq = 0;
let gridRev = 0;
let nowT = 0;

function markGridDirty() { gridRev++; }

const match = {
  running: false, demoMode: true, ended: false,
  mode: 'SOLO', mapId: 'NEON', theme: null,
  netRole: null, myControl: 'p1', localControls: ['p1'],
  elapsedTime: 0, safeRing: 1, stormInterval: 25, stormTimer: 25,
  stormWarning: false, warningDuration: 4.5, airdropTimer: 20,
  shake: 0, shakeEnabled: true, humanRank: 12, demoRestart: 0
};

const cam = { x: WORLD_PX / 2, y: WORLD_PX / 2, zoom: 1 };
let viewW = window.innerWidth;
let viewH = window.innerHeight;
let dpr = 1;

function getHuman() { return fighterForControl('p1') || fighters.find(f => f.isHuman) || null; }
function getHumans() { return fighters.filter(f => f.isHuman); }
function controlOf(device) {
  if (device === 'p1') return match.netRole === 'guest' ? null : 'p1';
  if (device === 'p2') {
    if (match.netRole === 'host') return null;
    if (match.netRole === 'guest') return 'p1';
    return 'p2';
  }
  return null;
}
function isLocalControl(slot) { return match.localControls.includes(slot); }
function fighterForControl(slot) { return fighters.find(f => controlOf(f.device) === slot) || null; }
function isMyFighter(f) { return !!f && f === getHuman(); }
function aliveCount() { return fighters.reduce((n, f) => n + (f.alive ? 1 : 0), 0); }

/* ========================================================================
   7. MAPS & ARENA GENERATION
   ======================================================================== */
const MAPS = [
  { id: 'NEON', name: 'Neon Grid', emoji: '🌐', accent: '#38bdf8', floor: ['#101a2c', '#0d1524'], layout: 'pillars', crate: 0.5, bush: 0.55, bushBand: true },
  { id: 'DUNES', name: 'Dunas', emoji: '🏜️', accent: '#fbbf24', floor: ['#241a12', '#1d150f'], layout: 'open', crate: 0.4, bush: 0.7, bushBand: true },
  { id: 'FROST', name: 'Geleira', emoji: '❄️', accent: '#67e8f9', floor: ['#0f2027', '#0b1a20'], layout: 'maze', crate: 0.48, bush: 0.4, bushBand: false },
  { id: 'EMBER', name: 'Vulcão', emoji: '🌋', accent: '#fb7185', floor: ['#201016', '#180b10'], layout: 'blocks', crate: 0.55, bush: 0.3, bushBand: false }
];

function getMap(id) { return MAPS.find(m => m.id === id) || MAPS[0]; }

const SPAWN_COORDS = [
  { c: 3, r: 3 }, { c: 13, r: 3 }, { c: 23, r: 3 },
  { c: 3, r: 9 }, { c: 23, r: 9 },
  { c: 7, r: 13 }, { c: 19, r: 13 },
  { c: 3, r: 17 }, { c: 23, r: 17 },
  { c: 3, r: 23 }, { c: 13, r: 23 }, { c: 23, r: 23 }
];
const SPAWN_P1 = { c: 7, r: 13 };
const SPAWN_P2 = { c: 19, r: 13 };
const BFS_DIRS_4 = [[0, -1], [0, 1], [-1, 0], [1, 0]];

function floodFillFrom(start) {
  const seen = new Set([`${start.c},${start.r}`]);
  const stack = [start];
  while (stack.length) {
    const n = stack.pop();
    for (const [dc, dr] of BFS_DIRS_4) {
      const c = n.c + dc, r = n.r + dr;
      if (!inBounds(c, r)) continue;
      const k = `${c},${r}`;
      if (seen.has(k)) continue;
      const t = grid[r][c];
      if (t === CELL.CRUSHED || t === CELL.PILLAR) continue;
      seen.add(k);
      stack.push({ c, r });
    }
  }
  return seen;
}

function carveCorridor(a, b) {
  let c = a.c, r = a.r;
  while (c !== b.c) { c += Math.sign(b.c - c); if (inBounds(c, r)) grid[r][c] = CELL.FLOOR; }
  while (r !== b.r) { r += Math.sign(b.r - r); if (inBounds(c, r)) grid[r][c] = CELL.FLOOR; }
}

function buildArenaLayout(mapDef, portalSet) {
  grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(CELL.FLOOR));
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (r === 0 || c === 0 || r === GRID_SIZE - 1 || c === GRID_SIZE - 1) { grid[r][c] = CELL.CRUSHED; continue; }
      if (Math.abs(r - 13) <= 1 && Math.abs(c - 13) <= 1) continue;
      if (mapDef.layout === 'pillars') { if (r % 2 === 0 && c % 2 === 0) grid[r][c] = CELL.PILLAR; }
      else if (mapDef.layout === 'open') { if (r % 4 === 0 && c % 4 === 0) grid[r][c] = CELL.PILLAR; }
      else if (mapDef.layout === 'blocks') {
        if (r % 3 === 0 && c % 3 === 0) {
          grid[r][c] = CELL.PILLAR;
          if (c + 1 < GRID_SIZE - 1) grid[r][c + 1] = CELL.PILLAR;
          if (r + 1 < GRID_SIZE - 1) { grid[r + 1][c] = CELL.PILLAR; grid[r + 1][c + 1] = CELL.PILLAR; }
        }
      } else if (mapDef.layout === 'maze') { if (r % 2 === 0 && c % 2 === 0) grid[r][c] = CELL.BUSH; }
    }
  }
  if (mapDef.layout === 'maze') {
    for (let r = 3; r < GRID_SIZE - 2; r += 6) {
      for (let c = 1; c < GRID_SIZE - 1; c++) {
        if (c % 6 === 0 || c % 6 === 1) continue;
        grid[r][c] = CELL.CRUSHED;
      }
    }
  }
  for (const key of [...safeSpawnSet, ...portalSet]) {
    const [c, r] = key.split(',').map(Number);
    if (!inBounds(c, r)) continue;
    if (grid[r][c] === CELL.CRUSHED || grid[r][c] === CELL.PILLAR) grid[r][c] = CELL.FLOOR;
  }
  const reach = floodFillFrom(SPAWN_P1);
  SPAWN_COORDS.forEach(sp => { if (!reach.has(`${sp.c},${sp.r}`)) carveCorridor(SPAWN_P1, sp); });
  for (let r = 1; r < GRID_SIZE - 1; r++) {
    for (let c = 1; c < GRID_SIZE - 1; c++) {
      if (grid[r][c] !== CELL.FLOOR) continue;
      const key = `${c},${r}`;
      if (safeSpawnSet.has(key) || portalSet.has(key)) continue;
      const distCenter = Math.hypot(c - 13, r - 13);
      if (distCenter < 2.5) continue;
      const inBand = distCenter >= 3.5 && distCenter <= 7.0;
      const bushChance = mapDef.bushBand ? (inBand ? mapDef.bush : mapDef.bush * 0.18) : (inBand ? mapDef.bush * 0.5 : mapDef.bush * 0.12);
      if (Math.random() < bushChance) grid[r][c] = CELL.BUSH;
      else if (Math.random() < mapDef.crate) grid[r][c] = CELL.CRATE;
    }
  }
}

function initArena(isDemo = false, modeId = null, mapId = null) {
  const cfg = MODE_CONFIG[modeId || match.mode] || MODE_CONFIG.SOLO;
  const mapDef = getMap(mapId || match.mapId || 'NEON');
  match.mode = cfg.id; match.mapId = mapDef.id; match.theme = mapDef;
  match.demoMode = isDemo; match.running = true; match.ended = false;
  match.demoRestart = 0; match.elapsedTime = 0;
  match.safeRing = isDemo ? 0 : cfg.startRing;
  match.stormInterval = cfg.stormInterval; match.stormTimer = cfg.stormInterval;
  match.stormWarning = false; match.airdropTimer = cfg.airdropTimer;
  match.shake = 0;
  match.localControls = (cfg.humans >= 2 && cfg.id !== 'ONLINE') ? ['p1', 'p2'] : ['p1'];
  match.myControl = 'p1';
  if (cfg.id !== 'ONLINE') match.netRole = null;
  
  bombs = []; explosions = []; powerups = []; particles = []; floatingLabels = [];
  cryoTiles = new Map(); activeAirdrop = null;
  bombSeq = 0; explosionSeq = 0;
  UI.killFeed.innerHTML = '';
  UI.stormBanner.classList.add('hidden');
  UI.airdropBanner.classList.add('hidden');
  
  // 🆕 HUD de times
  const hudTeams = document.getElementById('hudTeams');
  if (hudTeams) {
    if (cfg.teamMode && !isDemo) hudTeams.classList.remove('hidden');
    else hudTeams.classList.add('hidden');
  }
  
  portals = [
    { id: 'P1A', pairId: 'P1B', c: 5, r: 5, color: '#22d3ee' },
    { id: 'P1B', pairId: 'P1A', c: 21, r: 21, color: '#22d3ee' },
    { id: 'P2A', pairId: 'P2B', c: 21, r: 5, color: '#e879f9' },
    { id: 'P2B', pairId: 'P2A', c: 5, r: 21, color: '#e879f9' }
  ];
  const portalSet = new Set(portals.map(p => `${p.c},${p.r}`));
  safeSpawnSet = new Set();
  SPAWN_COORDS.forEach(sp => {
    for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) safeSpawnSet.add(`${sp.c + dc},${sp.r + dr}`);
  });
  buildArenaLayout(mapDef, portalSet);
  markGridDirty();
  
  // 🆕 Criação de fighters COM TIMES
  fighters = [];
  const humans = [];
  const isTeamMode = cfg.teamMode;
  
  if (!isDemo) {
    const n1 = ((UI.nameInput.value || 'Viper-01').trim() || 'Viper-01').slice(0, 14);
    humans.push({ sp: SPAWN_P1, name: n1, color: '#34d399', visor: '#ecfdf5', device: 'p1', team: 1 });
    if (cfg.humans >= 2) {
      const p2El = document.getElementById('player2NameInput');
      const n2 = (((p2El && p2El.value) || 'Viper-02').trim() || 'Viper-02').slice(0, 14);
      const p2Team = isTeamMode ? 1 : 2;
      humans.push({ sp: SPAWN_P2, name: n2, color: '#38bdf8', visor: '#e0f2fe', device: 'p2', team: p2Team });
    }
  }
  humans.forEach(h => fighters.push(makeFighter(fighters.length, h.sp, h.name, h.color, h.visor, h.device, h.team)));
  
  const used = new Set(humans.map(h => `${h.sp.c},${h.sp.r}`));
  const botSpawns = shuffle(SPAWN_COORDS.filter(sp => isDemo || !used.has(`${sp.c},${sp.r}`)));
  const botCount = isDemo ? 12 : cfg.bots;
  
  for (let i = 0; i < botCount; i++) {
    const profile = BOT_PROFILES[i % BOT_PROFILES.length];
    const sp = botSpawns[i] || { c: 3 + (i % 9) * 2, r: 3 + (i % 7) * 3 };
    
    let botTeam = 0;
    if (isTeamMode) {
      const teamSize = cfg.teamSize;
      const team1Count = fighters.filter(f => f.team === 1).length;
      const team2Count = fighters.filter(f => f.team === 2).length;
      
      if (team2Count < teamSize) botTeam = 2;
      else if (team1Count < teamSize) botTeam = 1;
      else botTeam = 2;
    }
    
    fighters.push(makeFighter(fighters.length, sp, profile.name, profile.color, profile.visor, 'bot', botTeam));
  }
  
  match.humanRank = fighters.length;
  cam.x = WORLD_PX / 2; cam.y = WORLD_PX / 2;
  resetJoystick();
  updateHUD();
}

function makeFighter(idx, sp, name, color, visor, device = 'bot', team = 0) {
  const isHuman = device === 'p1' || device === 'p2';
  const tactical = isHuman ? selectedStarterTactical : TACTICAL_ORDER[idx % 3];
  const f = {
    id: `F_${idx}`, name, isHuman, device, team,
    alive: true, hp: 2, maxHp: 2,
    x: (sp.c + 0.5) * TILE_SIZE, y: (sp.r + 0.5) * TILE_SIZE,
    netX: 0, netY: 0, vx: 0, vy: 0, kbX: 0, kbY: 0,
    netInX: 0, netInY: 0, netInTime: 0,
    facingAngle: Math.atan2(13 - sp.r, 13 - sp.c),
    color, visor, kills: 0,
    maxBombs: 1, activeBombs: 0, bombRange: 2, speedLevel: 1,
    canKick: false, shield: false,
    tacticalType: tactical, tacticalAmmo: { SHOCK: 0, CRYO: 0, C4: 0 },
    invulnTimer: 0, dashTimer: 0, dashCooldown: 0, dashDirX: 0, dashDirY: 1,
    portalCooldown: 0.8, inBush: false,
    ai: { timer: 0, targetX: null, targetY: null, stuckTimer: 0, lastX: 0, lastY: 0, pathTimer: 0, stepX: 0, stepY: 0 }
  };
  f.tacticalAmmo[tactical] = 3;
  f.netX = f.x; f.netY = f.y;
  f.ai.lastX = f.x; f.ai.lastY = f.y;
  f.ai.stepX = f.x; f.ai.stepY = f.y;
  return f;
}

/* ========================================================================
   8. COLLISION, FX & COMBAT
   ======================================================================== */
function isTileWalkable(c, r, fighter) {
  if (!inBounds(c, r)) return false;
  const t = grid[r][c];
  if (t !== CELL.FLOOR && t !== CELL.BUSH) return false;
  for (const b of bombs) {
    if (b.exploded) continue;
    if (b.c === c && b.r === r) {
      if (fighter && b.passThroughPlayers.has(fighter.id)) continue;
      return false;
    }
  }
  return true;
}

function canOccupyPosition(px, py, radius, fighter) {
  const minC = Math.floor((px - radius) / TILE_SIZE);
  const maxC = Math.floor((px + radius) / TILE_SIZE);
  const minR = Math.floor((py - radius) / TILE_SIZE);
  const maxR = Math.floor((py + radius) / TILE_SIZE);
  for (let r = minR; r <= maxR; r++) for (let c = minC; c <= maxC; c++) if (!isTileWalkable(c, r, fighter)) return false;
  return true;
}

function triggerShake(raw, wx = null, wy = null) {
  if (!match.shakeEnabled) return;
  let amt = raw;
  if (wx !== null && wy !== null) {
    const h = getHuman();
    if (!h || !h.alive) return;
    const d = Math.hypot(wx - h.x, wy - h.y);
    if (d >= 450) return;
    amt = raw * Math.max(0, 1 - d / 450);
  }
  match.shake = Math.max(match.shake, Math.min(MAX_SHAKE, amt));
}

function addFloatingLabel(text, x, y, color = '#ffffff') {
  floatingLabels.push({ text, x, y, color, life: 1.1, maxLife: 1.1 });
}

function spawnParticles(x, y, color, count = 10, speed = 140, life = 0.5) {
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = speed * (0.3 + Math.random() * 0.7);
    particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, color, life, maxLife: life, size: 2 + Math.random() * 3 });
  }
}

function addKillFeed(killer, victim, mode) {
  if (typeof netFeedEvent === 'function') netFeedEvent(killer, victim, mode);
  renderKillFeedRow(killer ? killer.name : '', killer ? killer.color : '', victim.name, victim.color, mode);
}

function renderKillFeedRow(kN, kC, vN, vC, mode) {
  const dict = I18N[currentLang];
  const row = document.createElement('div');
  row.className = 'kill-feed-item bg-slate-950/85 border border-slate-700/70 px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-200 shadow';
  const vTag = `<span style="color:${vC}">${escapeHtml(vN)}</span>`;
  if (mode === 'storm') row.innerHTML = `☢️ ${vTag} ${dict.stormEliminated}`;
  else if (mode === 'self') row.innerHTML = `💥 ${vTag} ${dict.selfEliminated}`;
  else {
    const kTag = `<span style="color:${kC}">${escapeHtml(kN)}</span>`;
    row.innerHTML = `${kTag} ${dict.eliminatedBy} ${vTag}`;
  }
  UI.killFeed.appendChild(row);
  setTimeout(() => row.remove(), 3400);
  while (UI.killFeed.children.length > 4) UI.killFeed.firstChild.remove();
}

function applyPowerup(fighter, type) {
  if (type === 'BOMB') fighter.maxBombs = Math.min(6, fighter.maxBombs + 1);
  else if (type === 'RANGE') fighter.bombRange = Math.min(7, fighter.bombRange + 1);
  else if (type === 'SPEED') fighter.speedLevel = Math.min(5, fighter.speedLevel + 1);
  else if (type === 'KICK') fighter.canKick = true;
  else if (type === 'SHIELD') fighter.shield = true;
  else if (type === 'SHOCK' || type === 'CRYO' || type === 'C4') {
    fighter.tacticalAmmo[type] = Math.min(9, fighter.tacticalAmmo[type] + 2);
  }
  if (isMyFighter(fighter)) {
    SFX.playPickup();
    addFloatingLabel(POWERUP_TYPES[type].label, fighter.x, fighter.y - 26, POWERUP_TYPES[type].color);
    updateHUD();
  }
}

function damageFighter(f, amount, killer) {
  if (!f.alive || f.invulnTimer > 0) return;
  
  // 🆕 Friendly fire desligado em modos de time
  if (killer && f.team !== 0 && killer.team === f.team && killer !== f) {
    return;
  }
  
  f.hp -= amount;
  spawnParticles(f.x, f.y, '#f43f5e', 16, 150, 0.45);
  if (f.hp > 0) {
    f.invulnTimer = 1.5;
    addFloatingLabel('-1 ❤️', f.x, f.y - 24, '#fb7185');
    if (isMyFighter(f)) {
      SFX.playHit(); triggerShake(6); updateHUD();
      if (navigator.vibrate) navigator.vibrate(28);
    }
    return;
  }
  f.hp = 0;
  eliminateFighter(f, killer, false);
}

function eliminateFighter(victim, killer, isStorm = false) {
  if (!victim.alive) return;
  victim.alive = false; victim.hp = 0; victim.vx = 0; victim.vy = 0;
  spawnParticles(victim.x, victim.y, victim.color, 28, 210, 0.7);
  triggerShake(6, victim.x, victim.y);
  const drops = [];
  for (let i = 1; i < victim.maxBombs; i++) drops.push('BOMB');
  for (let i = 2; i < victim.bombRange; i++) drops.push('RANGE');
  for (let i = 1; i < victim.speedLevel; i++) drops.push('SPEED');
  if (victim.canKick) drops.push('KICK');
  if (victim.shield) drops.push('SHIELD');
  TACTICAL_ORDER.forEach(t => { for (let i = 0; i < Math.min(2, victim.tacticalAmmo[t]); i++) drops.push(t); });
  shuffle(drops).slice(0, 6).forEach(type => {
    const ang = Math.random() * Math.PI * 2;
    const d = 10 + Math.random() * 18;
    powerups.push({ type, x: clamp(victim.x + Math.cos(ang) * d, TILE_SIZE, WORLD_PX - TILE_SIZE), y: clamp(victim.y + Math.sin(ang) * d, TILE_SIZE, WORLD_PX - TILE_SIZE), bobPhase: Math.random() * 6 });
  });
  if (!isStorm && killer && killer !== victim) { killer.kills++; addKillFeed(killer, victim, 'pvp'); }
  else if (!isStorm && killer === victim) addKillFeed(null, victim, 'self');
  else addKillFeed(null, victim, 'storm');
  if (killer && isMyFighter(killer)) updateHUD();
  if (victim.isHuman) {
    match.humanRank = fighters.filter(f => f.alive).length + 1;
  }
}

function destroyCrate(c, r, isAirdrop) {
  grid[r][c] = CELL.FLOOR; markGridDirty();
  const wx = (c + 0.5) * TILE_SIZE, wy = (r + 0.5) * TILE_SIZE;
  spawnParticles(wx, wy, isAirdrop ? '#fbbf24' : '#d97706', 14, 140, 0.45);
  if (isAirdrop) {
    const pool = ['SHIELD', 'RANGE', 'BOMB', 'KICK', 'SHOCK', 'CRYO', 'C4'];
    for (let i = 0; i < 3; i++) {
      const type = pool[(i + Math.floor(Math.random() * pool.length)) % pool.length];
      const ang = (i / 3) * Math.PI * 2;
      powerups.push({ type, x: wx + Math.cos(ang) * 18, y: wy + Math.sin(ang) * 18, bobPhase: Math.random() * 6 });
    }
    return;
  }
  if (Math.random() < 0.55) {
    const roll = Math.random();
    let type = 'BOMB';
    if (roll < 0.22) type = 'BOMB';
    else if (roll < 0.42) type = 'RANGE';
    else if (roll < 0.58) type = 'SPEED';
    else if (roll < 0.68) type = 'KICK';
    else if (roll < 0.78) type = 'SHIELD';
    else if (roll < 0.86) type = 'SHOCK';
    else if (roll < 0.93) type = 'CRYO';
    else type = 'C4';
    powerups.push({ type, x: wx, y: wy, bobPhase: Math.random() * 6 });
  }
}

/* ========================================================================
   9. BOMBS, TACTICALS & EXPLOSIONS
   ======================================================================== */
function circleOverlapsTile(x, y, c, r, radius) {
  const minX = c * TILE_SIZE, minY = r * TILE_SIZE;
  const nx = clamp(x, minX, minX + TILE_SIZE);
  const ny = clamp(y, minY, minY + TILE_SIZE);
  const dx = x - nx, dy = y - ny;
  return dx * dx + dy * dy < radius * radius;
}

function updateBombPassThrough(b) {
  if (b.exploded) return;
  const allowed = new Set();
  for (const f of fighters) {
    if (!f.alive) continue;
    const fc = Math.floor(f.x / TILE_SIZE), fr = Math.floor(f.y / TILE_SIZE);
    if ((fc === b.c && fr === b.r) || circleOverlapsTile(f.x, f.y, b.c, b.r, PLAYER_RADIUS + 1.5)) allowed.add(f.id);
  }
  b.passThroughPlayers = allowed;
}

function audibilityAt(x, y) {
  const h = getHuman();
  if (!h) return 0.55;
  return clamp(1 - Math.hypot(x - h.x, y - h.y) / 900, 0, 1);
}

function placeBomb(f, type = 'NORMAL') {
  if (!f.alive || bombs.length > 70) return null;
  const { c, r } = worldToGrid(f.x, f.y);
  if (!inBounds(c, r)) return null;
  const tile = grid[r][c];
  if (tile !== CELL.FLOOR && tile !== CELL.BUSH) return null;
  if (bombs.some(b => !b.exploded && b.c === c && b.r === r)) return null;
  if (type === 'NORMAL' && f.activeBombs >= f.maxBombs) return null;
  const bomb = {
    id: `B_${++bombSeq}`, type,
    x: (c + 0.5) * TILE_SIZE, y: (r + 0.5) * TILE_SIZE, c, r,
    ownerId: f.id, range: f.bombRange,
    fuse: type === 'SHOCK' ? 1.35 : type === 'CRYO' ? 1.15 : type === 'C4' ? 30 : 2.35,
    vx: 0, vy: 0, passThroughPlayers: new Set(), exploded: false, seed: Math.random() * 10
  };
  bombs.push(bomb);
  updateBombPassThrough(bomb);
  if (bomb.type === 'NORMAL') f.activeBombs++;
  if (isMyFighter(f)) SFX.playPlaceBomb();
  return bomb;
}

function useTactical(f) {
  if (!f.alive) return;
  const type = f.tacticalType;
  if (type === 'C4') {
    const liveC4 = bombs.filter(b => !b.exploded && b.type === 'C4' && b.ownerId === f.id);
    if (liveC4.length) {
      liveC4.forEach(b => { b.fuse = 0.01; });
      if (isMyFighter(f)) { SFX.playWarning(); addFloatingLabel('DETONAR!', f.x, f.y - 30, '#f43f5e'); }
      return;
    }
  }
  if (f.tacticalAmmo[type] <= 0) {
    if (isMyFighter(f)) addFloatingLabel('SEM MUNIÇÃO', f.x, f.y - 30, '#94a3b8');
    return;
  }
  const bomb = placeBomb(f, type);
  if (!bomb) return;
  f.tacticalAmmo[type]--;
  if (isMyFighter(f)) {
    if (type === 'SHOCK') SFX.playShockwave();
    else if (type === 'CRYO') SFX.playCryo();
    else SFX.playPlaceBomb();
    updateHUD();
  }
}

function cycleTactical(who = null) {
  const h = who || getHuman();
  if (!h || !h.alive) return;
  const idx = TACTICAL_ORDER.indexOf(h.tacticalType);
  h.tacticalType = TACTICAL_ORDER[(idx + 1) % TACTICAL_ORDER.length];
  if (isMyFighter(h)) SFX.playPickup();
  updateHUD();
}

function tryDash(f) {
  if (!f || !f.alive || f.dashCooldown > 0) return;
  let dx = f.vx, dy = f.vy;
  const len = Math.hypot(dx, dy);
  if (len < 0.15) { dx = Math.cos(f.facingAngle); dy = Math.sin(f.facingAngle); }
  else { dx /= len; dy /= len; }
  f.dashDirX = dx; f.dashDirY = dy;
  f.dashTimer = DASH_DURATION; f.dashCooldown = DASH_COOLDOWN;
  f.invulnTimer = Math.max(f.invulnTimer, 0.3);
  spawnParticles(f.x, f.y, '#22d3ee', 10, 140, 0.3);
  if (isMyFighter(f)) SFX.playDash();
}

function updateBombs(dt) {
  for (let i = bombs.length - 1; i >= 0; i--) {
    const b = bombs[i];
    if (b.exploded) { bombs.splice(i, 1); continue; }
    updateBombPassThrough(b);
    if (Math.abs(b.vx) > 4 || Math.abs(b.vy) > 4) {
      const nx = b.x + b.vx * dt, ny = b.y + b.vy * dt;
      const nc = Math.floor(nx / TILE_SIZE), nr = Math.floor(ny / TILE_SIZE);
      const tile = inBounds(nc, nr) ? grid[nr][nc] : CELL.CRUSHED;
      const free = (tile === CELL.FLOOR || tile === CELL.BUSH) && !bombs.some(o => o !== b && !o.exploded && o.c === nc && o.r === nr);
      if (free) { b.x = nx; b.y = ny; b.c = nc; b.r = nr; }
      else { const ct = tileCenter(b.c, b.r); b.x = ct.x; b.y = ct.y; b.vx = 0; b.vy = 0; }
      b.vx *= Math.exp(-2.4 * dt); b.vy *= Math.exp(-2.4 * dt);
    }
    b.fuse -= dt;
    if (b.fuse <= 0) explodeBomb(b);
  }
}

function explodeBomb(bomb) {
  if (bomb.exploded) return;
  bomb.exploded = true;
  const owner = fighters.find(f => f.id === bomb.ownerId) || null;
  if (owner && bomb.type === 'NORMAL') {
    owner.activeBombs = Math.max(0, owner.activeBombs - 1);
    if (owner.isHuman) updateHUD();
  }
  const bc = Math.floor(bomb.x / TILE_SIZE), br = Math.floor(bomb.y / TILE_SIZE);
  if (bomb.type === 'SHOCK') { SFX.playShockwave(); triggerShake(4.5, bomb.x, bomb.y); shockBlast(bomb, owner); }
  else if (bomb.type === 'CRYO') { SFX.playCryo(); cryoBlast(bomb, owner); }
  else crossBlast(bomb, owner, bc, br);
}

function crossBlast(bomb, owner, bc, br) {
  const cells = [{ c: bc, r: br }];
  const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
  for (const [dx, dy] of dirs) {
    for (let i = 1; i <= bomb.range; i++) {
      const c = bc + dx * i, r = br + dy * i;
      if (!inBounds(c, r)) break;
      const t = grid[r][c];
      if (t === CELL.CRUSHED || t === CELL.PILLAR) break;
      if (t === CELL.CRATE) { destroyCrate(c, r, false); cells.push({ c, r }); break; }
      if (t === CELL.AIRDROP_CRATE) { destroyCrate(c, r, true); cells.push({ c, r }); break; }
      cells.push({ c, r });
    }
  }
  explosions.push({ id: ++explosionSeq, type: 'cross', x: bomb.x, y: bomb.y, cells, color: bomb.type === 'C4' ? '#fb7185' : '#fb923c', timer: 0.45, maxTimer: 0.45 });
  SFX.playExplosion(audibilityAt(bomb.x, bomb.y));
  triggerShake(bomb.type === 'C4' ? 7 : 5.5, bomb.x, bomb.y);
  damageInCells(cells, owner, bomb.type === 'C4' ? 2 : 1);
  bombs.forEach(o => { if (o === bomb || o.exploded) return; if (cells.some(cell => cell.c === o.c && cell.r === o.r)) o.fuse = 0.02; });
}

function damageInCells(cells, owner, amount) {
  const set = new Set(cells.map(c => `${c.c},${c.r}`));
  fighters.forEach(f => {
    if (!f.alive) return;
    const { c, r } = worldToGrid(f.x, f.y);
    if (set.has(`${c},${r}`)) damageFighter(f, amount, owner);
  });
}

function shockBlast(bomb, owner) {
  const radiusPx = (1.4 + bomb.range * 0.55) * TILE_SIZE;
  explosions.push({ id: ++explosionSeq, type: 'shock', x: bomb.x, y: bomb.y, radius: radiusPx, cells: [], color: '#fbbf24', timer: 0.55, maxTimer: 0.55 });
  fighters.forEach(f => {
    if (!f.alive) return;
    const dx = f.x - bomb.x, dy = f.y - bomb.y, d = Math.hypot(dx, dy);
    if (d > radiusPx || d < 0.001) return;
    const push = (1 - d / radiusPx) * 620;
    f.kbX += (dx / d) * push; f.kbY += (dy / d) * push;
    damageFighter(f, 1, owner);
  });
  bombs.forEach(b => {
    if (b === bomb || b.exploded) return;
    const dx = b.x - bomb.x, dy = b.y - bomb.y, d = Math.hypot(dx, dy);
    if (d > radiusPx || d < 0.001) return;
    const push = (1 - d / radiusPx) * 460;
    b.vx += (dx / d) * push; b.vy += (dy / d) * push;
    b.passThroughPlayers.clear();
  });
}

function cryoBlast(bomb, owner) {
  const cells = [{ c: Math.floor(bomb.x / TILE_SIZE), r: Math.floor(bomb.y / TILE_SIZE) }];
  const bc = cells[0].c, br = cells[0].r;
  const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
  for (const [dx, dy] of dirs) {
    for (let i = 1; i <= bomb.range; i++) {
      const c = bc + dx * i, r = br + dy * i;
      if (!inBounds(c, r)) break;
      const t = grid[r][c];
      if (t === CELL.CRUSHED || t === CELL.PILLAR || t === CELL.CRATE || t === CELL.AIRDROP_CRATE) break;
      cells.push({ c, r });
    }
  }
  cells.forEach(cell => cryoTiles.set(`${cell.c},${cell.r}`, 7));
  explosions.push({ id: ++explosionSeq, type: 'cryo', x: bomb.x, y: bomb.y, cells, color: '#67e8f9', timer: 0.6, maxTimer: 0.6 });
  damageInCells(cells, owner, 1);
}

/* ========================================================================
   10. FIGHTER MOVEMENT
   ======================================================================== */
function fighterSpeed(f) {
  let spd = 118 + f.speedLevel * 18;
  const { c, r } = worldToGrid(f.x, f.y);
  if (cryoTiles.has(`${c},${r}`)) spd *= 0.55;
  return spd;
}

function moveFighter(f, stepX, stepY) {
  if (Math.abs(stepX) > 0.001) {
    const nx = f.x + stepX;
    if (canOccupyPosition(nx, f.y, PLAYER_RADIUS, f)) f.x = nx;
    else {
      const centerY = (Math.floor(f.y / TILE_SIZE) + 0.5) * TILE_SIZE;
      const nudge = clamp(centerY - f.y, -Math.abs(stepX) * 0.8, Math.abs(stepX) * 0.8);
      if (Math.abs(nudge) > 0.01 && canOccupyPosition(f.x, f.y + nudge, PLAYER_RADIUS, f)) f.y += nudge;
    }
  }
  if (Math.abs(stepY) > 0.001) {
    const ny = f.y + stepY;
    if (canOccupyPosition(f.x, ny, PLAYER_RADIUS, f)) f.y = ny;
    else {
      const centerX = (Math.floor(f.x / TILE_SIZE) + 0.5) * TILE_SIZE;
      const nudge = clamp(centerX - f.x, -Math.abs(stepY) * 0.8, Math.abs(stepY) * 0.8);
      if (Math.abs(nudge) > 0.01 && canOccupyPosition(f.x + nudge, f.y, PLAYER_RADIUS, f)) f.x += nudge;
    }
  }
  f.x = clamp(f.x, PLAYER_RADIUS, WORLD_PX - PLAYER_RADIUS);
  f.y = clamp(f.y, PLAYER_RADIUS, WORLD_PX - PLAYER_RADIUS);
}

function updateFighter(f, dt) {
  f.invulnTimer = Math.max(0, f.invulnTimer - dt);
  f.dashCooldown = Math.max(0, f.dashCooldown - dt);
  f.dashTimer = Math.max(0, f.dashTimer - dt);
  f.portalCooldown = Math.max(0, f.portalCooldown - dt);
  if (!f.alive) return;
  let speed = fighterSpeed(f);
  let moveX = f.vx, moveY = f.vy;
  if (f.dashTimer > 0) { speed *= 3.1; moveX = f.dashDirX * speed; moveY = f.dashDirY * speed; }
  else {
    const len = Math.hypot(moveX, moveY);
    if (len > 0.01) { moveX = (moveX / len) * speed; moveY = (moveY / len) * speed; }
    else { moveX = 0; moveY = 0; }
  }
  moveX += f.kbX; moveY += f.kbY;
  f.kbX *= Math.exp(-7 * dt); f.kbY *= Math.exp(-7 * dt);
  if (Math.abs(f.kbX) < 1) f.kbX = 0;
  if (Math.abs(f.kbY) < 1) f.kbY = 0;
  if (Math.abs(moveX) > 1 || Math.abs(moveY) > 1) f.facingAngle = Math.atan2(moveY, moveX);
  if (f.canKick && (Math.abs(moveX) > 20 || Math.abs(moveY) > 20)) {
    const probeX = f.x + Math.sign(moveX || 0) * (PLAYER_RADIUS + 8);
    const probeY = f.y + Math.sign(moveY || 0) * (PLAYER_RADIUS + 8);
    const { c: pc, r: pr } = worldToGrid(probeX, probeY);
    bombs.forEach(b => {
      if (b.exploded || Math.abs(b.vx) > 10 || Math.abs(b.vy) > 10) return;
      if (b.passThroughPlayers.has(f.id)) return;
      const bc = Math.floor(b.x / TILE_SIZE), br = Math.floor(b.y / TILE_SIZE);
      if (bc === pc && br === pr) {
        if (Math.abs(moveX) >= Math.abs(moveY)) { b.vx = Math.sign(moveX) * 340; b.vy = 0; }
        else { b.vx = 0; b.vy = Math.sign(moveY) * 340; }
        b.passThroughPlayers.clear();
        if (isMyFighter(f)) SFX.playShockwave();
      }
    });
  }
  moveFighter(f, moveX * dt, moveY * dt);
  if (f.portalCooldown <= 0) {
    for (const p of portals) {
      const center = tileCenter(p.c, p.r);
      if (Math.hypot(f.x - center.x, f.y - center.y) < TILE_SIZE * 0.42) {
        const dest = portals.find(o => o.id === p.pairId) || portals.find(o => o.pairId === p.id);
        if (dest) {
          const target = tileCenter(dest.c, dest.r);
          f.x = target.x; f.y = target.y;
          f.portalCooldown = 1.4;
          spawnParticles(f.x, f.y, p.color, 16, 180, 0.5);
          if (isMyFighter(f)) SFX.playPortal();
        }
        break;
      }
    }
  }
  for (let i = powerups.length - 1; i >= 0; i--) {
    const pu = powerups[i];
    if (Math.hypot(pu.x - f.x, pu.y - f.y) < PLAYER_RADIUS + 10) {
      powerups.splice(i, 1);
      spawnParticles(pu.x, pu.y, POWERUP_TYPES[pu.type].color, 10, 120, 0.35);
      applyPowerup(f, pu.type);
    }
  }
  const { c, r } = worldToGrid(f.x, f.y);
  f.inBush = inBounds(c, r) && grid[r][c] === CELL.BUSH;
}

/* ========================================================================
   11. BOT AI (COM APOIO A ALIADOS)
   ======================================================================== */
function isTileInAnyBlast(c, r) {
  for (const b of bombs) {
    if (b.exploded) continue;
    if (b.type === 'SHOCK' || b.type === 'CRYO') {
      const center = tileCenter(c, r);
      const radiusPx = (1.4 + b.range * 0.55) * TILE_SIZE;
      if (Math.hypot(center.x - b.x, center.y - b.y) <= radiusPx) return true;
    } else if (b.c === c && Math.abs(b.r - r) <= b.range) return true;
    else if (b.r === r && Math.abs(b.c - c) <= b.range) return true;
  }
  return false;
}

function findDanger(f) {
  const { c: fc, r: fr } = worldToGrid(f.x, f.y);
  let worst = null, worstDist = Infinity;
  for (const b of bombs) {
    if (b.exploded) continue;
    let hit = false;
    if (b.type === 'SHOCK' || b.type === 'CRYO') {
      const radiusPx = (1.4 + b.range * 0.55) * TILE_SIZE + PLAYER_RADIUS;
      hit = Math.hypot(b.x - f.x, b.y - f.y) < radiusPx;
    } else hit = (b.c === fc && Math.abs(b.r - fr) <= b.range) || (b.r === fr && Math.abs(b.c - fc) <= b.range);
    if (hit) { const d = Math.hypot(b.x - f.x, b.y - f.y); if (d < worstDist) { worst = b; worstDist = d; } }
  }
  return worst;
}

const BFS_DIRS = [[0, -1], [0, 1], [-1, 0], [1, 0]];

function bfsFirstStep(f, startC, startR, isGoal, maxNodes = 500) {
  if (!inBounds(startC, startR)) return null;
  const keyOf = (c, r) => `${c},${r}`;
  const prev = new Map();
  const seen = new Set([keyOf(startC, startR)]);
  const queue = [{ c: startC, r: startR }];
  let head = 0, goal = null;
  while (head < queue.length && head < maxNodes) {
    const node = queue[head++];
    const isStart = node.c === startC && node.r === startR;
    if (!isStart && isGoal(node.c, node.r)) { goal = node; break; }
    for (const [dc, dr] of BFS_DIRS) {
      const c = node.c + dc, r = node.r + dr;
      const k = keyOf(c, r);
      if (seen.has(k) || !isTileWalkable(c, r, f)) continue;
      seen.add(k); prev.set(k, node); queue.push({ c, r });
    }
  }
  if (!goal) return null;
  let cur = goal;
  for (let guard = 0; guard < 600; guard++) {
    const p = prev.get(keyOf(cur.c, cur.r));
    if (!p || (p.c === startC && p.r === startR)) break;
    cur = p;
  }
  return cur;
}

function setBotStep(f, step, delay = 0.2) {
  const center = tileCenter(step.c, step.r);
  f.ai.stepX = center.x; f.ai.stepY = center.y; f.ai.pathTimer = delay;
}

function replanBotPath(f) {
  const start = worldToGrid(f.x, f.y);
  if (!inBounds(start.c, start.r)) return;
  if (findDanger(f)) {
    const step = bfsFirstStep(f, start.c, start.r, (c, r) => !isTileInAnyBlast(c, r), 320);
    if (step) { setBotStep(f, step, 0.15); return; }
    f.ai.stepX = f.x; f.ai.stepY = f.y; f.ai.pathTimer = 0.25; return;
  }
  if (f.ai.targetX === null || f.ai.targetY === null) {
    f.ai.stepX = f.x; f.ai.stepY = f.y; f.ai.pathTimer = 0.35; return;
  }
  const goal = worldToGrid(f.ai.targetX, f.ai.targetY);
  if (goal.c !== start.c || goal.r !== start.r) {
    const step = bfsFirstStep(f, start.c, start.r, (c, r) => c === goal.c && r === goal.r, 520);
    if (step) { setBotStep(f, step, 0.22); return; }
  }
  f.ai.targetX = null; f.ai.targetY = null;
  f.ai.stepX = f.x; f.ai.stepY = f.y; f.ai.pathTimer = 0.3;
}

function randomWalkableNear(f, range) {
  const { c: fc, r: fr } = worldToGrid(f.x, f.y);
  for (let attempt = 0; attempt < 24; attempt++) {
    const c = fc + Math.floor((Math.random() * 2 - 1) * range);
    const r = fr + Math.floor((Math.random() * 2 - 1) * range);
    if (!inBounds(c, r)) continue;
    if (match.safeRing > 0 && (c <= match.safeRing || r <= match.safeRing || c >= GRID_SIZE - 1 - match.safeRing || r >= GRID_SIZE - 1 - match.safeRing)) continue;
    if (!isTileWalkable(c, r, f) || isTileInAnyBlast(c, r)) continue;
    return tileCenter(c, r);
  }
  return null;
}

// 🆕 nearestEnemy IGNORA ALIADOS DO MESMO TIME
function nearestEnemy(f, maxDist) {
  let best = null, bestD = maxDist;
  for (const o of fighters) {
    if (!o.alive || o === f) continue;
    if (f.team !== 0 && o.team === f.team) continue;
    const d = Math.hypot(o.x - f.x, o.y - f.y);
    if (d < bestD) { best = o; bestD = d; }
  }
  return best;
}

function nearestPowerup(f, maxDist) {
  let best = null, bestD = maxDist;
  for (const pu of powerups) {
    const d = Math.hypot(pu.x - f.x, pu.y - f.y);
    if (d < bestD) { best = pu; bestD = d; }
  }
  return best;
}

function hasCrateInCross(f) {
  const { c: fc, r: fr } = worldToGrid(f.x, f.y);
  const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
  for (const [dx, dy] of dirs) {
    for (let i = 1; i <= f.bombRange; i++) {
      const c = fc + dx * i, r = fr + dy * i;
      if (!inBounds(c, r)) break;
      const t = grid[r][c];
      if (t === CELL.CRATE || t === CELL.AIRDROP_CRATE) return true;
      if (t === CELL.CRUSHED || t === CELL.PILLAR) break;
    }
  }
  return false;
}

function decideBotAction(f) {
  const danger = findDanger(f);
  if (danger) { f.ai.pathTimer = 0; return; }
  
  // 🆕 Bots aliados protegem o humano do seu time
  if (f.team !== 0) {
    const humanAlly = fighters.find(h => h.team === f.team && h.isHuman && h.alive);
    const enemy = nearestEnemy(f, 460);
    
    if (humanAlly && enemy) {
      const dEnemy = Math.hypot(enemy.x - humanAlly.x, enemy.y - humanAlly.y);
      const dAlly = Math.hypot(humanAlly.x - f.x, humanAlly.y - f.y);
      
      if (dEnemy < TILE_SIZE * 4 && dAlly < TILE_SIZE * 6) {
        f.ai.targetX = enemy.x;
        f.ai.targetY = enemy.y;
        
        const alignedX = Math.abs(enemy.y - f.y) < TILE_SIZE * 0.8 &&
          Math.abs(enemy.x - f.x) <= TILE_SIZE * (f.bombRange + 1.2);
        const alignedY = Math.abs(enemy.x - f.x) < TILE_SIZE * 0.8 &&
          Math.abs(enemy.y - f.y) <= TILE_SIZE * (f.bombRange + 1.2);
        
        if ((alignedX || alignedY) && Math.random() < 0.6) {
          if (placeBomb(f, 'NORMAL')) f.ai.pathTimer = 0;
        }
        return;
      }
    }
    
    if (humanAlly && !enemy) {
      const d = Math.hypot(humanAlly.x - f.x, humanAlly.y - f.y);
      if (d > TILE_SIZE * 3) {
        f.ai.targetX = humanAlly.x;
        f.ai.targetY = humanAlly.y;
        return;
      }
    }
  }
  
  const enemy = nearestEnemy(f, 460);
  if (enemy) {
    const d = Math.hypot(enemy.x - f.x, enemy.y - f.y);
    const alignedX = Math.abs(enemy.y - f.y) < TILE_SIZE * 0.8 && Math.abs(enemy.x - f.x) <= TILE_SIZE * (f.bombRange + 1.2);
    const alignedY = Math.abs(enemy.x - f.x) < TILE_SIZE * 0.8 && Math.abs(enemy.y - f.y) <= TILE_SIZE * (f.bombRange + 1.2);
    if ((alignedX || alignedY) && d < TILE_SIZE * (f.bombRange + 1.6) && Math.random() < 0.5) {
      if (placeBomb(f, 'NORMAL')) f.ai.pathTimer = 0;
    }
    if (d < TILE_SIZE * 4 && Math.random() < 0.05) useTactical(f);
    f.ai.targetX = enemy.x; f.ai.targetY = enemy.y; return;
  }
  if (f.activeBombs < f.maxBombs && hasCrateInCross(f) && Math.random() < 0.45) {
    if (placeBomb(f, 'NORMAL')) f.ai.pathTimer = 0;
  }
  const pu = nearestPowerup(f, 420);
  if (pu) { f.ai.targetX = pu.x; f.ai.targetY = pu.y; return; }
  if (f.ai.targetX === null || f.ai.targetY === null || Math.hypot(f.ai.targetX - f.x, f.ai.targetY - f.y) < TILE_SIZE) {
    const target = randomWalkableNear(f, 6);
    if (target) { f.ai.targetX = target.x; f.ai.targetY = target.y; }
    else { f.ai.targetX = WORLD_PX / 2; f.ai.targetY = WORLD_PX / 2; }
  }
}

function updateAI(f, dt) {
  f.ai.timer -= dt; f.ai.pathTimer -= dt;
  const moved = Math.hypot(f.x - f.ai.lastX, f.y - f.ai.lastY);
  f.ai.stuckTimer = moved < 0.35 ? f.ai.stuckTimer + dt : 0;
  f.ai.lastX = f.x; f.ai.lastY = f.y;
  if (f.ai.stuckTimer > 0.6) {
    f.ai.stuckTimer = 0; f.ai.targetX = null; f.ai.targetY = null; f.ai.pathTimer = 0;
  }
  if (f.ai.timer <= 0) { f.ai.timer = 0.4 + Math.random() * 0.5; decideBotAction(f); }
  if (f.ai.pathTimer <= 0) replanBotPath(f);
  const dx = f.ai.stepX - f.x, dy = f.ai.stepY - f.y;
  const d = Math.hypot(dx, dy);
  if (d > 6) { f.vx = dx / d; f.vy = dy / d; }
  else {
    const gx = f.ai.targetX ?? f.x, gy = f.ai.targetY ?? f.y;
    if (Math.hypot(gx - f.x, gy - f.y) < 14) { f.vx = 0; f.vy = 0; }
  }
}

/* ========================================================================
   12. STORM, AIRDROPS & MATCH FLOW (COM VITÓRIA POR TIME)
   ======================================================================== */
function updateStormAndAirdrops(dt) {
  match.stormTimer -= dt;
  if (!match.stormWarning && match.stormTimer <= match.warningDuration && match.safeRing < 11) {
    match.stormWarning = true;
    UI.stormBanner.classList.remove('hidden');
    SFX.playWarning();
  }
  if (match.stormTimer <= 0) {
    match.stormWarning = false;
    UI.stormBanner.classList.add('hidden');
    if (match.safeRing < 11) { crushRing(match.safeRing); match.safeRing++; }
    match.stormTimer = match.stormInterval;
  }
  if (!activeAirdrop) {
    match.airdropTimer -= dt;
    if (match.airdropTimer <= 0) { spawnAirdropBeacon(); match.airdropTimer = 28; }
  } else if (!activeAirdrop.landed) {
    activeAirdrop.timer -= dt;
    if (activeAirdrop.timer <= 0) {
      activeAirdrop.landed = true;
      UI.airdropBanner.classList.add('hidden');
      const { c, r } = activeAirdrop;
      if (inBounds(c, r) && (grid[r][c] === CELL.FLOOR || grid[r][c] === CELL.BUSH)) {
        grid[r][c] = CELL.AIRDROP_CRATE; markGridDirty();
        const wx = (c + 0.5) * TILE_SIZE, wy = (r + 0.5) * TILE_SIZE;
        spawnParticles(wx, wy, '#fbbf24', 22, 160, 0.5);
        triggerShake(4, wx, wy);
      }
      activeAirdrop = null;
    }
  }
}

function spawnAirdropBeacon() {
  const ring = clamp(match.safeRing, 1, 10);
  const minC = ring + 1, maxC = GRID_SIZE - 2 - ring;
  const spots = [];
  for (let r = minC; r <= maxC; r++) {
    for (let c = minC; c <= maxC; c++) {
      if (!inBounds(c, r)) continue;
      if (grid[r][c] !== CELL.FLOOR && grid[r][c] !== CELL.BUSH) continue;
      const occupied = fighters.some(f => f.alive && worldToGrid(f.x, f.y).c === c && worldToGrid(f.x, f.y).r === r);
      if (!occupied) spots.push({ c, r });
    }
  }
  if (!spots.length) { match.airdropTimer = 20; return; }
  const pick = spots[Math.floor(Math.random() * spots.length)];
  activeAirdrop = { c: pick.c, r: pick.r, timer: 7, landed: false };
  UI.airdropBanner.classList.remove('hidden');
  SFX.playWarning();
}

function crushRing(ring) {
  const min = ring, max = GRID_SIZE - 1 - ring;
  triggerShake(4.5);
  for (let r = min; r <= max; r++) {
    for (let c = min; c <= max; c++) {
      if (!(r === min || r === max || c === min || c === max)) continue;
      const tile = grid[r][c];
      if (tile === CELL.CRUSHED) continue;
      grid[r][c] = CELL.CRUSHED;
      cryoTiles.delete(`${c},${r}`);
      powerups = powerups.filter(p => { const g = worldToGrid(p.x, p.y); return !(g.c === c && g.r === r); });
      spawnParticles((c + 0.5) * TILE_SIZE, (r + 0.5) * TILE_SIZE, '#7f1d1d', 7, 100, 0.55);
    }
  }
  bombs = bombs.filter(b => {
    const { c, r } = worldToGrid(b.x, b.y);
    if (inBounds(c, r) && grid[r][c] === CELL.CRUSHED) {
      const owner = fighters.find(f => f.id === b.ownerId);
      if (owner && b.type === 'NORMAL') owner.activeBombs = Math.max(0, owner.activeBombs - 1);
      spawnParticles(b.x, b.y, '#f97316', 10, 120, 0.4);
      return false;
    }
    return true;
  });
  markGridDirty();
  fighters.forEach(f => {
    if (!f.alive) return;
    const { c, r } = worldToGrid(f.x, f.y);
    if (!inBounds(c, r) || grid[r][c] !== CELL.CRUSHED) return;
    if (f.shield) {
      f.shield = false; f.invulnTimer = 1.5;
      f.x = (13 + (Math.random() - 0.5) * 2) * TILE_SIZE;
      f.y = (13 + (Math.random() - 0.5) * 2) * TILE_SIZE;
      addFloatingLabel('SHIELD WARP!', f.x, f.y - 20, '#22d3ee');
      if (isMyFighter(f)) updateHUD();
    } else eliminateFighter(f, null, true);
  });
}

function checkMatchEnd(dt) {
  const alive = fighters.filter(f => f.alive);
  const cfg = MODE_CONFIG[match.mode] || MODE_CONFIG.SOLO;
  
  if (match.demoMode) {
    if (alive.length <= 1) {
      match.demoRestart += dt;
      if (match.demoRestart > 2.5) initArena(true, match.mode, match.mapId);
    } else match.demoRestart = 0;
    return;
  }
  if (match.ended) return;
  if (match.netRole === 'guest') return;
  
  // 🆕 Modo de time: vitória quando um time é eliminado
  if (cfg.teamMode) {
    const team1Alive = fighters.filter(f => f.team === 1 && f.alive).length;
    const team2Alive = fighters.filter(f => f.team === 2 && f.alive).length;
    
    updateTeamsHUD(team1Alive, team2Alive);
    
    if (team1Alive === 0) {
      endMatch(false, true);
      return;
    }
    if (team2Alive === 0) {
      endMatch(true, true);
      return;
    }
    return;
  }
  
  // Modo normal (Battle Royale)
  const humans = getHumans();
  if (!humans.length) return;
  const localHumans = humans.filter(f => controlOf(f.device) !== null);
  if (localHumans.length && localHumans.every(f => !f.alive)) {
    endMatch(false, false);
    return;
  }
  if (alive.length === 1) {
    const last = alive[0];
    endMatch(last.isHuman && controlOf(last.device) !== null, false);
  }
}

function updateTeamsHUD(team1Alive, team2Alive) {
  const hudTeams = document.getElementById('hudTeams');
  const t1El = document.getElementById('team1Alive');
  const t2El = document.getElementById('team2Alive');
  if (!hudTeams || !t1El || !t2El) return;
  
  const cfg = MODE_CONFIG[match.mode] || MODE_CONFIG.SOLO;
  if (cfg.teamMode) {
    hudTeams.classList.remove('hidden');
    t1El.textContent = team1Alive;
    t2El.textContent = team2Alive;
  } else {
    hudTeams.classList.add('hidden');
  }
}

function endMatch(win, isTeamMode = false) {
  if (match.ended) return;
  match.ended = true; match.running = false; match.shake = 0;
  resetJoystick();
  const human = getHuman();
  const winner = fighters.find(f => f.alive) || null;
  const total = fighters.length;
  const rank = win ? 1 : (match.humanRank || (fighters.filter(f => f.alive).length + 1));
  const dict = I18N[currentLang];
  const coOp = (match.mode === 'LOCAL');
  const p2Victory = !!(winner && coOp && winner.device === 'p2');
  const ownerWon = !!winner && winner === human;
  
  UI.endTrophy.textContent = win ? '🏆' : '💀';
  UI.endRank.textContent = isTeamMode ? (win ? 'TIME 1 VENCEU!' : 'TIME 2 VENCEU!') : `#${rank} / ${total}`;
  UI.endRank.className = win
    ? 'inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 font-display font-extrabold text-sm mb-1'
    : 'inline-block px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/50 text-rose-300 font-display font-extrabold text-sm mb-1';
  
  let subtitle = win ? dict.winSub : dict.loseSub;
  if (isTeamMode) {
    subtitle = win ? dict.teamWinSub : dict.teamLoseSub;
    UI.endTitle.textContent = win ? 'VITÓRIA DO TIME!' : 'DERROTA DO TIME';
  } else if (win && winner) {
    if (p2Victory) subtitle = dict.p2Wins;
    else if (match.mode === 'TEAM1v1') subtitle = dict.duelWinSub;
    else if (match.mode === 'ONLINE') subtitle = dict.onlineWinSub;
    UI.endTitle.textContent = p2Victory ? dict.p2WinTitle : (win ? dict.winTitle : dict.loseTitle);
  } else {
    UI.endTitle.textContent = win ? dict.winTitle : dict.loseTitle;
  }
  
  UI.endSub.textContent = subtitle;
  UI.endKills.textContent = (win && winner ? winner.kills : (human ? human.kills : 0));
  UI.endTime.textContent = formatTime(match.elapsedTime);
  UI.endModal.classList.remove('hidden');
  
  if (UI.btnPlayAgain) {
    const label = UI.btnPlayAgain.querySelector('span');
    if (label) label.textContent = (net.role === 'guest') ? dict.exitBtn : dict.playAgainBtn;
  }
  if (win) SFX.playVictory(); else SFX.playHit();
  
  const myKills = ownerWon && winner ? winner.kills : (human ? human.kills : 0);
  recordCareer({ win: ownerWon, kills: myKills, mode: match.mode, time: match.elapsedTime });
}

/* ========================================================================
   13. HUD
   ======================================================================== */
function updateHUD() {
  const human = getHuman();
  if (!human) return;
  UI.hearts.textContent = '❤️'.repeat(Math.max(0, human.hp)) + '🖤'.repeat(Math.max(0, human.maxHp - human.hp));
  UI.alive.textContent = `${aliveCount()}/${fighters.length}`;
  UI.stormTimer.textContent = `${Math.max(0, Math.ceil(match.stormTimer))}s`;
  UI.kills.textContent = human.kills;
  UI.statBombs.textContent = human.maxBombs;
  UI.statRange.textContent = human.bombRange;
  UI.statSpeed.textContent = human.speedLevel;
  UI.shieldPill.classList.toggle('hidden', !human.shield);
  UI.stealthBadge.classList.toggle('hidden', !human.inBush);
  const meta = TACTICAL_META[human.tacticalType];
  UI.tacticalIcon.textContent = meta.icon;
  UI.tacticalLabel.textContent = meta.label;
  const ammo = human.tacticalAmmo[human.tacticalType];
  UI.tacticalAmmo.textContent = ammo;
  UI.btnTactical.style.opacity = ammo > 0 ? '1' : '0.55';
  UI.dashFill.style.height = human.dashCooldown <= 0 ? '100%' : `${Math.round((1 - human.dashCooldown / DASH_COOLDOWN) * 100)}%`;
  const p2 = fighters.find(f => f.device === 'p2');
  const showP2 = !!p2 && (match.mode === 'LOCAL');
  if (UI.hudP2) {
    UI.hudP2.style.display = showP2 ? 'flex' : 'none';
    if (showP2) {
      UI.hudP2Hearts.textContent = '❤️'.repeat(Math.max(0, p2.hp)) + '🖤'.repeat(Math.max(0, p2.maxHp - p2.hp));
      UI.hudP2Bombs.textContent = p2.maxBombs;
      UI.hudP2Range.textContent = p2.bombRange;
      const meta2 = TACTICAL_META[p2.tacticalType];
      UI.hudP2Tactical.textContent = `${meta2.icon}${p2.tacticalAmmo[p2.tacticalType]}`;
      UI.hudP2.style.opacity = p2.alive ? '1' : '0.45';
    }
  }
}

/* ========================================================================
   14. INPUT
   ======================================================================== */
const keys = new Set();
const joystick = { active: false, id: null, ox: 0, oy: 0, dx: 0, dy: 0 };
let selectedMode = 'SOLO';
let selectedMap = 'NEON';

const KEYMAP = {
  p1: { up: ['KeyW'], down: ['KeyS'], left: ['KeyA'], right: ['KeyD'], bomb: ['Space'], dash: ['ShiftLeft'], tactical: ['KeyE'], cycle: ['KeyQ'] },
  p2: { up: ['ArrowUp'], down: ['ArrowDown'], left: ['ArrowLeft'], right: ['ArrowRight'], bomb: ['Enter', 'NumpadEnter'], dash: ['ShiftRight'], tactical: ['Period', 'NumpadDecimal'], cycle: ['Comma'] }
};

const PAD_BUTTONS = [
  { action: 'bomb', btn: 0 }, { action: 'dash', btn: 1 },
  { action: 'tactical', btn: 2 }, { action: 'cycle', btn: 3 }
];

const pads = { axes: { p1: { x: 0, y: 0 }, p2: { x: 0, y: 0 } }, prev: new Map(), connected: { p1: false, p2: false } };

function humanAlive() { const h = getHuman(); return !!(h && h.alive && match.running); }

function performAction(f, action) {
  if (!f || !f.alive || !match.running) return;
  if (action === 'bomb') { placeBomb(f, 'NORMAL'); updateHUD(); }
  else if (action === 'tactical') useTactical(f);
  else if (action === 'cycle') cycleTactical(f);
  else if (action === 'dash') { tryDash(f); updateHUD(); }
}

function handleActionInput(slot, f, action) {
  if (!f || !f.alive || !match.running || match.demoMode) return;
  SFX.init();
  if (net.role === 'guest') { netQueueAction(action); return; }
  performAction(f, action);
}

function readMoveVector(slot) {
  let ix = 0, iy = 0;
  const map = KEYMAP[slot] || KEYMAP.p1;
  if (map.left.some(k => keys.has(k))) ix -= 1;
  if (map.right.some(k => keys.has(k))) ix += 1;
  if (map.up.some(k => keys.has(k))) iy -= 1;
  if (map.down.some(k => keys.has(k))) iy += 1;
  if (slot === 'p1' && joystick.active && Math.hypot(joystick.dx, joystick.dy) > 0.18) { ix = joystick.dx; iy = joystick.dy; }
  const stick = pads.axes[slot];
  if (stick && Math.hypot(stick.x, stick.y) > 0.22) { ix = stick.x; iy = stick.y; }
  const len = Math.hypot(ix, iy);
  if (len > 1) { ix /= len; iy /= len; }
  return { x: ix, y: iy };
}

function pollGamepads() {
  const list = (navigator.getGamepads ? Array.from(navigator.getGamepads()) : []).filter(Boolean);
  const slots = ['p1', 'p2'];
  let changed = false;
  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    const pad = list[i];
    const nowConnected = !!pad;
    if (pads.connected[slot] !== nowConnected) changed = true;
    pads.connected[slot] = nowConnected;
    if (!pad) { pads.axes[slot].x = 0; pads.axes[slot].y = 0; continue; }
    let ax = pad.axes[0] || 0, ay = pad.axes[1] || 0;
    if (Math.hypot(ax, ay) < 0.22) { ax = 0; ay = 0; }
    const b = pad.buttons;
    if (b[14] && b[14].pressed) ax = -1;
    if (b[15] && b[15].pressed) ax = 1;
    if (b[12] && b[12].pressed) ay = -1;
    if (b[13] && b[13].pressed) ay = 1;
    pads.axes[slot].x = ax; pads.axes[slot].y = ay;
    let mask = 0;
    PAD_BUTTONS.forEach(pb => { if (b[pb.btn] && b[pb.btn].pressed) mask |= (1 << pb.btn); });
    const prev = pads.prev.get(pad.index) || 0;
    pads.prev.set(pad.index, mask);
    if (mask && match.running && !match.demoMode && isLocalControl(slot)) {
      const f = fighterForControl(slot);
      if (f) PAD_BUTTONS.forEach(pb => { const bit = 1 << pb.btn; if ((mask & bit) && !(prev & bit)) handleActionInput(slot, f, pb.action); });
    }
  }
  if (changed) updatePadStatus();
}

function updatePadStatus() {
  const el = document.getElementById('padStatus');
  if (!el) return;
  const dict = I18N[currentLang];
  const count = (pads.connected.p1 ? 1 : 0) + (pads.connected.p2 ? 1 : 0);
  if (!count) { el.className = 'hidden'; el.textContent = ''; return; }
  el.className = 'flex items-center justify-center gap-1.5 text-[10px] font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/40 rounded-xl px-2 py-1';
  el.textContent = `🎮 ${count > 1 ? dict.padTwo : dict.padOne}`;
}

/* ========================================================================
   15. LOBBY UI
   ======================================================================== */
function setSelectedMode(id) {
  selectedMode = id;
  document.querySelectorAll('.mode-choice').forEach(btn => {
    const on = btn.dataset.mode === id;
    btn.classList.toggle('border-emerald-400', on);
    btn.classList.toggle('bg-emerald-500/15', on);
    btn.classList.toggle('shadow-lg', on);
    btn.classList.toggle('border-slate-700', !on);
    btn.classList.toggle('bg-slate-800/60', !on);
  });
  const online = id === 'ONLINE';
  const panel = document.getElementById('onlinePanel');
  if (panel) panel.style.display = online ? 'flex' : 'none';
  const p2row = document.getElementById('p2NameRow');
  if (p2row) p2row.style.display = (id === 'LOCAL') ? 'flex' : 'none';
  const startBtn = document.getElementById('btnStartMatch');
  if (startBtn) startBtn.classList.toggle('hidden', online);
  const dict = I18N[currentLang];
  const badge = document.getElementById('modeBadge');
  if (badge) {
    const modeLabels = {
      SOLO: dict.tagSolo,
      TEAM1v1: dict.tagTeam1v1,
      TEAM2v2: dict.tagTeam2v2,
      TEAM3v3: dict.tagTeam3v3,
      LOCAL: dict.tagLocal,
      ONLINE: dict.tagOnline
    };
    badge.textContent = modeLabels[id] || dict.tagSolo;
  }
  if (UI.hintText) UI.hintText.textContent = (id === 'LOCAL') ? dict.hintLocal : dict.hintSolo;
  savePrefs({ mode: id });
  refreshDemo();
}

function setSelectedMap(id) {
  selectedMap = id;
  document.querySelectorAll('.map-choice').forEach(btn => {
    const on = btn.dataset.map === id;
    btn.classList.toggle('border-emerald-400', on);
    btn.classList.toggle('ring-2', on);
    btn.classList.toggle('ring-emerald-400/40', on);
    btn.classList.toggle('border-slate-700', !on);
    btn.classList.toggle('opacity-60', !on);
  });
  savePrefs({ map: id });
  refreshDemo();
}

function refreshDemo() {
  if (!UI.startScreen.classList.contains('hidden')) { initArena(true, selectedMode, selectedMap); drawMapPreview(); }
}

function bindUI() {
  document.getElementById('langPT').addEventListener('click', () => { applyLanguage('pt'); savePrefs({ lang: 'pt' }); setSelectedMode(selectedMode); updatePadStatus(); updateCareerUI(); });
  document.getElementById('langEN').addEventListener('click', () => { applyLanguage('en'); savePrefs({ lang: 'en' }); setSelectedMode(selectedMode); updatePadStatus(); updateCareerUI(); });
  const nameEl = document.getElementById('playerNameInput');
  if (nameEl) nameEl.addEventListener('input', () => savePrefs({ name: nameEl.value.trim() || 'Viper-01' }));
  const name2El = document.getElementById('player2NameInput');
  if (name2El) name2El.addEventListener('input', () => savePrefs({ name2: name2El.value.trim() || 'Viper-02' }));
  document.querySelectorAll('.mode-choice').forEach(btn => btn.addEventListener('click', () => setSelectedMode(btn.dataset.mode)));
  document.querySelectorAll('.map-choice').forEach(btn => btn.addEventListener('click', () => setSelectedMap(btn.dataset.map)));
  document.querySelectorAll('.tactical-choice').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tactical-choice').forEach(b => { b.classList.remove('active', 'bg-amber-500/20', 'border-amber-400'); b.classList.add('bg-slate-800/70', 'border-slate-700'); });
      btn.classList.remove('bg-slate-800/70', 'border-slate-700');
      btn.classList.add('active', 'bg-amber-500/20', 'border-amber-400');
      selectedStarterTactical = btn.getAttribute('data-tactical');
      savePrefs({ tactical: selectedStarterTactical });
    });
  });
  document.getElementById('btnStartMatch').addEventListener('click', () => {
    SFX.init();
    UI.startScreen.classList.add('hidden');
    UI.hud.classList.remove('hidden');
    initArena(false, selectedMode, selectedMap);
  });
  document.getElementById('btnPlayAgain').addEventListener('click', () => {
    if (net.role === 'guest') { netLeaveRoom(); return; }
    SFX.init();
    UI.endModal.classList.add('hidden');
    initArena(false, match.mode, match.mapId);
  });
  const btnMenu = document.getElementById('btnBackToMenu');
  if (btnMenu) {
    btnMenu.addEventListener('click', () => {
      UI.endModal.classList.add('hidden');
      UI.hud.classList.add('hidden');
      UI.startScreen.classList.remove('hidden');
      match.running = false; match.ended = false;
      const hudTeams = document.getElementById('hudTeams');
      if (hudTeams) hudTeams.classList.add('hidden');
      if (net.role === 'guest') netLeaveRoom();
      else { match.netRole = null; initArena(true, selectedMode, selectedMap); }
    });
  }
  
  // 🏆 CONQUISTAS
  document.getElementById('btnAchievements').addEventListener('click', () => {
    SFX.init();
    renderAchievementsModal();
    document.getElementById('achievementsModal').classList.remove('hidden');
  });
  document.getElementById('btnCloseAchievements').addEventListener('click', () => {
    document.getElementById('achievementsModal').classList.add('hidden');
  });
  
  const bindPress = (id, fn) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); fn(); });
    el.addEventListener('contextmenu', e => e.preventDefault());
  };
  const mainAction = action => () => { if (!humanAlive()) return; handleActionInput('p1', fighterForControl('p1'), action); };
  bindPress('btnBomb', mainAction('bomb'));
  bindPress('btnTactical', mainAction('tactical'));
  bindPress('btnCycleTactical', mainAction('cycle'));
  bindPress('btnDash', mainAction('dash'));
  document.getElementById('btnMuteHud').addEventListener('click', () => { SFX.init(); const m = SFX.toggleMute(); document.getElementById('btnMuteHud').textContent = m ? '🔇' : '🔊'; });
  document.getElementById('btnShakeHud').addEventListener('click', () => {
    SFX.init();
    match.shakeEnabled = !match.shakeEnabled;
    if (!match.shakeEnabled) match.shake = 0;
    const btn = document.getElementById('btnShakeHud');
    btn.style.opacity = match.shakeEnabled ? '1' : '0.45';
    btn.classList.toggle('border-cyan-500/60', match.shakeEnabled);
    btn.classList.toggle('border-slate-700/80', !match.shakeEnabled);
  });
  const fsBtn = document.getElementById('btnFullscreen');
  const fsSupported = !!(document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen);
  if (fsBtn && !fsSupported) fsBtn.style.display = 'none';
  if (fsBtn) {
    fsBtn.addEventListener('click', () => {
      SFX.init();
      const el = document.documentElement;
      const active = document.fullscreenElement || document.webkitFullscreenElement;
      if (active) (document.exitFullscreen || document.webkitExitFullscreen).call(document).catch(() => {});
      else { const req = el.requestFullscreen || el.webkitRequestFullscreen; Promise.resolve(req.call(el)).catch(() => {}); }
    });
  }
  const syncFsIcon = () => { if (!fsBtn) return; fsBtn.textContent = (document.fullscreenElement || document.webkitFullscreenElement) ? '⤡' : '⛶'; };
  document.addEventListener('fullscreenchange', syncFsIcon);
  document.addEventListener('webkitfullscreenchange', syncFsIcon);
  const on = (id, ev, fn) => { const el = document.getElementById(id); if (el) el.addEventListener(ev, fn); };
  on('btnHostRole', 'click', () => netPickRole('host'));
  on('btnGuestRole', 'click', () => netPickRole('guest'));
  on('btnCreateInvite', 'click', netHostCreateOffer);
  on('btnConnectAnswer', 'click', netHostAcceptAnswer);
  on('btnGenAnswer', 'click', netGuestMakeAnswer);
  on('btnCopyOffer', 'click', () => copyFrom('netOfferOut'));
  on('btnCopyAnswer', 'click', () => copyFrom('netAnswerOut'));
  window.addEventListener('keydown', e => {
    const code = e.code;
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(code)) e.preventDefault();
    keys.add(code);
    if (e.repeat || !match.running || match.demoMode) return;
    if (!UI.startScreen.classList.contains('hidden')) return;
    for (const slot of match.localControls) {
      const map = KEYMAP[slot];
      if (!map) continue;
      const f = fighterForControl(slot);
      if (!f) continue;
      for (const action of ['bomb', 'dash', 'tactical', 'cycle']) {
        if (map[action].includes(code)) { handleActionInput(slot, f, action); return; }
      }
    }
  });
  window.addEventListener('keyup', e => keys.delete(e.code));
  window.addEventListener('blur', () => { keys.clear(); resetJoystick(); });
  const onPointerDown = e => {
    // 🎨 Se o Chroma está ativo, não processa joystick do jogo principal
    if (chroma.active) return;
    if (!match.running || match.demoMode) return;
    if (!UI.startScreen.classList.contains('hidden') || !UI.endModal.classList.contains('hidden')) return;
    if (e.target.closest('button') || e.target.closest('input') || e.target.closest('textarea')) return;
    if (joystick.active || e.clientX > viewW * 0.62) return;
    joystick.active = true; joystick.id = e.pointerId;
    joystick.ox = e.clientX; joystick.oy = e.clientY;
    joystick.dx = 0; joystick.dy = 0;
    showJoystick(e.clientX, e.clientY);
  };
  const onPointerMove = e => {
    if (chroma.active) return;
    if (!joystick.active || e.pointerId !== joystick.id) return;
    const dx = e.clientX - joystick.ox, dy = e.clientY - joystick.oy;
    const len = Math.hypot(dx, dy);
    const max = 44;
    const clamped = Math.min(len, max);
    const nx = len > 0.001 ? dx / len : 0, ny = len > 0.001 ? dy / len : 0;
    joystick.dx = (nx * clamped) / max; joystick.dy = (ny * clamped) / max;
    UI.joyKnob.style.transform = `translate(${nx * clamped}px, ${ny * clamped}px)`;
  };
  const onPointerUp = e => {
    if (chroma.active) return;
    if (!joystick.active || (e.pointerId !== undefined && e.pointerId !== joystick.id)) return;
    resetJoystick();
  };
  window.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);
  window.addEventListener('resize', resize);
  if (window.visualViewport) window.visualViewport.addEventListener('resize', resize);
  window.addEventListener('orientationchange', () => setTimeout(resize, 120));
  window.addEventListener('gamepadconnected', updatePadStatus);
  window.addEventListener('gamepaddisconnected', updatePadStatus);
}

function copyFrom(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.removeAttribute('readonly'); el.select(); el.setSelectionRange(0, el.value.length);
  let ok = false;
  try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
  el.setAttribute('readonly', 'readonly');
  if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(el.value).catch(() => {}); ok = true; }
  const btn = document.getElementById(id === 'netOfferOut' ? 'btnCopyOffer' : 'btnCopyAnswer');
  if (btn) {
    const dict = I18N[currentLang];
    const original = btn.textContent;
    btn.textContent = ok ? dict.copied : original;
    setTimeout(() => { btn.textContent = original; }, 1400);
  }
}

function showJoystick(x, y) {
  UI.joyContainer.classList.remove('hidden');
  UI.joyBase.style.left = `${x}px`; UI.joyBase.style.top = `${y}px`;
  UI.joyBase.style.transform = 'translate(-50%, -50%)';
  UI.joyKnob.style.transform = 'translate(0px, 0px)';
}

function resetJoystick() {
  joystick.active = false; joystick.id = null;
  joystick.dx = 0; joystick.dy = 0;
  UI.joyContainer.classList.add('hidden');
  UI.joyKnob.style.transform = 'translate(0px, 0px)';
}

/* ========================================================================
   16. MAIN UPDATE LOOP
   ======================================================================== */
let hudAccum = 0;

function updateHumanInput() {
  if (match.netRole === 'guest') return;
  for (const slot of match.localControls) {
    const f = fighterForControl(slot);
    if (!f) continue;
    if (!f.alive) { f.vx = 0; f.vy = 0; continue; }
    const mv = readMoveVector(slot);
    f.vx = mv.x; f.vy = mv.y;
  }
  if (match.netRole === 'host') {
    const pf = fighters.find(f => f.device === 'p2');
    if (pf) {
      if (pf.alive && nowT - pf.netInTime < 0.4) { pf.vx = pf.netInX; pf.vy = pf.netInY; }
      else { pf.vx = 0; pf.vy = 0; }
    }
  }
}

function update(dt) {
  if (!match.running) return;
  if (match.netRole === 'guest') { updateNetGuest(dt); return; }
  match.elapsedTime += dt;
  if (match.shake > 0.05) { match.shake *= Math.exp(-18 * dt); if (match.shake < 0.05) match.shake = 0; }
  for (const [key, val] of cryoTiles.entries()) { const left = val - dt; if (left <= 0) cryoTiles.delete(key); else cryoTiles.set(key, left); }
  updateStormAndAirdrops(dt);
  updateHumanInput();
  for (const f of fighters) { if (!f.alive) continue; if (!f.isHuman) updateAI(f, dt); updateFighter(f, dt); }
  updateBombs(dt);
  for (let i = explosions.length - 1; i >= 0; i--) { explosions[i].timer -= dt; if (explosions[i].timer <= 0) explosions.splice(i, 1); }
  for (let i = particles.length - 1; i >= 0; i--) { const p = particles[i]; p.life -= dt; if (p.life <= 0) { particles.splice(i, 1); continue; } p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= Math.exp(-2.5 * dt); p.vy *= Math.exp(-2.5 * dt); }
  for (let i = floatingLabels.length - 1; i >= 0; i--) { const l = floatingLabels[i]; l.life -= dt; l.y -= 26 * dt; if (l.life <= 0) floatingLabels.splice(i, 1); }
  hudAccum += dt;
  if (hudAccum >= 0.1) { hudAccum = 0; updateHUD(); }
  updateCamera(dt);
  checkMatchEnd(dt);
}

function updateCamera(dt) {
  const localHumans = fighters.filter(f => f.alive && controlOf(f.device) !== null);
  let tx, ty;
  if (localHumans.length === 1) { tx = localHumans[0].x; ty = localHumans[0].y; }
  else if (localHumans.length > 1) { tx = localHumans.reduce((s, f) => s + f.x, 0) / localHumans.length; ty = localHumans.reduce((s, f) => s + f.y, 0) / localHumans.length; }
  else {
    const alive = fighters.filter(f => f.alive);
    if (alive.length) { tx = alive.reduce((s, f) => s + f.x, 0) / alive.length; ty = alive.reduce((s, f) => s + f.y, 0) / alive.length; }
    else { tx = WORLD_PX / 2; ty = WORLD_PX / 2; }
  }
  const k = 1 - Math.exp(-6 * dt);
  cam.x += (tx - cam.x) * k;
  cam.y += (ty - cam.y) * k;
  const halfW = viewW / (2 * cam.zoom), halfH = viewH / (2 * cam.zoom);
  cam.x = WORLD_PX > halfW * 2 ? clamp(cam.x, halfW, WORLD_PX - halfW) : WORLD_PX / 2;
  cam.y = WORLD_PX > halfH * 2 ? clamp(cam.y, halfH, WORLD_PX - halfH) : WORLD_PX / 2;
}

/* ========================================================================
   17. ONLINE MULTIPLAYER (WebRTC)
   ======================================================================== */
const NET_ICE = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:stun1.l.google.com:19302' }, { urls: 'stun:stun.cloudflare.com:3478' }] };

const net = { role: null, pc: null, dc: null, connected: false, started: false, sendAccum: 0, inputAccum: 0, pingAccum: 0, ping: 0, lastReceive: 0, gridSentRev: -1, feedSeq: 0, feedSentSeq: 0, seenExplosions: new Set(), pending: {}, lastGridRev: -1 };

function netSetStatus(key, kind = 'idle') {
  const el = document.getElementById('netStatus');
  if (!el) return;
  const dict = I18N[currentLang];
  el.textContent = dict[key] || key;
  el.className = 'text-[10px] font-bold text-center rounded-xl px-2 py-1 border ' + (kind === 'ok' ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300' : kind === 'err' ? 'bg-rose-500/15 border-rose-500/50 text-rose-300' : 'bg-slate-800/70 border-slate-700 text-slate-400');
}

function netPickRole(role) {
  net.role = role;
  const hostBox = document.getElementById('netHostBox');
  const guestBox = document.getElementById('netGuestBox');
  if (hostBox) hostBox.style.display = role === 'host' ? 'flex' : 'none';
  if (guestBox) guestBox.style.display = role === 'guest' ? 'flex' : 'none';
  document.getElementById('btnHostRole').className = role === 'host' ? 'flex-1 py-2 rounded-xl bg-emerald-500/20 border-2 border-emerald-400 font-display font-bold text-xs text-emerald-300' : 'flex-1 py-2 rounded-xl bg-slate-800/70 border-2 border-slate-700 font-display font-bold text-xs text-slate-300';
  document.getElementById('btnGuestRole').className = role === 'guest' ? 'flex-1 py-2 rounded-xl bg-emerald-500/20 border-2 border-emerald-400 font-display font-bold text-xs text-emerald-300' : 'flex-1 py-2 rounded-xl bg-slate-800/70 border-2 border-slate-700 font-display font-bold text-xs text-slate-300';
  netSetStatus('netIdle', 'idle');
}

function encodeSignal(obj) { return btoa(JSON.stringify(obj)); }
function decodeSignal(raw) {
  const clean = String(raw || '').replace(/\s+/g, '');
  if (!clean) throw new Error('empty');
  const padded = clean + '='.repeat((4 - (clean.length % 4)) % 4);
  return JSON.parse(atob(padded));
}

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
    if (pc.connectionState === 'failed' || pc.connectionState === 'disconnected') {
      net.connected = false;
      netSetStatus('netLost', 'err');
    }
  });
  net.pc = pc;
  return pc;
}

function netWireChannel(dc) {
  net.dc = dc;
  dc.addEventListener('open', () => {
    net.connected = true;
    netSetStatus('netConnected', 'ok');
    if (net.role === 'host') netStartHostMatch();
    else {
      netSetStatus('netWaitingHost', 'ok');
      const name = (UI.nameInput.value || 'Viper-02').trim().slice(0, 14) || 'Viper-02';
      try { dc.send(JSON.stringify({ t: 'hi', n: name })); } catch (e) {}
    }
  });
  dc.addEventListener('close', () => { net.connected = false; netSetStatus('netLost', 'err'); });
  dc.addEventListener('message', ev => {
    net.lastReceive = performance.now();
    let msg;
    try { msg = JSON.parse(ev.data); } catch (e) { return; }
    if (!msg || !msg.t) return;
    if (msg.t === 's') netApplySnapshot(msg);
    else if (msg.t === 'i') netOnRemoteInput(msg);
    else if (msg.t === 'hi') netOnHello(msg);
    else if (msg.t === 'p') { if (net.dc && net.dc.readyState === 'open') try { net.dc.send(JSON.stringify({ t: 'o', ts: msg.ts })); } catch (e) {} }
    else if (msg.t === 'o') { net.ping = Math.max(0, Math.round(performance.now() - msg.ts)); netUpdateBadge(); }
  });
}

async function netHostCreateOffer() {
  try {
    net.role = 'host'; netSetStatus('netCreating', 'idle');
    const pc = netCreatePeer();
    const dc = pc.createDataChannel('blast', { ordered: true });
    netWireChannel(dc);
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    await waitIceComplete(pc);
    if (!/a=candidate:/.test(pc.localDescription.sdp)) { netSetStatus('netNoIce', 'err'); return; }
    document.getElementById('netOfferOut').value = encodeSignal({ t: 'offer', sdp: pc.localDescription.sdp });
    netSetStatus('netInviteReady', 'ok');
  } catch (err) { console.error(err); netSetStatus('netError', 'err'); }
}

async function netHostAcceptAnswer() {
  try {
    const desc = decodeSignal(document.getElementById('netAnswerIn').value);
    if (!desc || desc.t !== 'answer' || !desc.sdp) throw new Error('bad answer');
    net.role = 'host';
    await net.pc.setRemoteDescription({ type: 'answer', sdp: desc.sdp });
    netSetStatus('netConnecting', 'idle');
  } catch (err) { console.error(err); netSetStatus('netError', 'err'); }
}

async function netGuestMakeAnswer() {
  try {
    const desc = decodeSignal(document.getElementById('netOfferIn').value);
    if (!desc || desc.t !== 'offer' || !desc.sdp) throw new Error('bad offer');
    net.role = 'guest'; netSetStatus('netCreating', 'idle');
    const pc = netCreatePeer();
    pc.addEventListener('datachannel', ev => netWireChannel(ev.channel));
    await pc.setRemoteDescription({ type: 'offer', sdp: desc.sdp });
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    await waitIceComplete(pc);
    if (!/a=candidate:/.test(pc.localDescription.sdp)) { netSetStatus('netNoIce', 'err'); return; }
    document.getElementById('netAnswerOut').value = encodeSignal({ t: 'answer', sdp: pc.localDescription.sdp });
    netSetStatus('netAnswerReady', 'ok');
  } catch (err) { console.error(err); netSetStatus('netError', 'err'); }
}

function netStartHostMatch() {
  if (net.started) return;
  net.started = true; net.role = 'host'; match.netRole = 'host';
  match.myControl = 'p1'; match.localControls = ['p1'];
  UI.startScreen.classList.add('hidden'); UI.hud.classList.remove('hidden');
  net.gridSentRev = -1; net.feedSentSeq = 0;
  initArena(false, 'ONLINE', selectedMap);
  match.netRole = 'host'; match.myControl = 'p1'; match.localControls = ['p1'];
  netUpdateBadge();
}

function netStartGuestMatch() {
  if (net.started) return;
  net.started = true; net.role = 'guest'; match.netRole = 'guest';
  match.myControl = 'p1'; match.localControls = ['p1'];
  UI.startScreen.classList.add('hidden'); UI.hud.classList.remove('hidden');
  initArena(false, 'ONLINE', selectedMap);
  match.netRole = 'guest'; match.myControl = 'p1'; match.localControls = ['p1'];
  netUpdateBadge();
}

function netUpdateBadge() {
  const el = document.getElementById('netBadge');
  if (!el) return;
  const online = !!match.netRole && !match.demoMode;
  el.style.display = online ? 'block' : 'none';
  if (!online) return;
  el.textContent = `🌐 ${match.netRole === 'host' ? 'HOST' : 'GUEST'}${net.ping ? ` • ${net.ping}ms` : ''}`;
  el.classList.toggle('text-rose-300', net.connected === false);
}

function netQueueAction(action) { net.pending[action] = true; }

function netOnRemoteInput(msg) {
  if (match.netRole !== 'host' || match.demoMode) return;
  const f = fighters.find(x => x.device === 'p2');
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
  const f = fighters.find(x => x.device === 'p2');
  if (f) f.name = String(msg.n).slice(0, 14);
}

function netFeedEvent(killer, victim, mode) {
  if (net.role !== 'host') return;
  net.feedSeq++;
  net.feed = net.feed || [];
  net.feed.push({ sq: net.feedSeq, k: killer ? killer.name : '', kc: killer ? killer.color : '', v: victim ? victim.name : '', vc: victim ? victim.color : '', m: mode });
  if (net.feed.length > 40) net.feed.shift();
}

function netBuildSnapshot() {
  const winner = fighters.find(f => f.alive);
  const snap = {
    t: 's', tm: Math.round(match.elapsedTime * 100) / 100,
    run: match.running ? 1 : 0, e: match.ended ? 1 : 0,
    w: (winner && winner.device === 'p2') ? 1 : 0,
    sr: match.safeRing, st: Math.round(match.stormTimer * 10) / 10,
    sw: match.stormWarning ? 1 : 0,
    ad: activeAirdrop ? { c: activeAirdrop.c, r: activeAirdrop.r, timer: Math.round(activeAirdrop.timer * 10) / 10, landed: !!activeAirdrop.landed } : null,
    f: fighters.map(f => ({ i: f.id, d: f.device, n: f.name, c: f.color, v: f.visor, tm: f.team, x: Math.round(f.x * 10) / 10, y: Math.round(f.y * 10) / 10, a: Math.round(f.facingAngle * 100) / 100, hp: f.hp, mhp: f.maxHp, sh: f.shield ? 1 : 0, ib: f.inBush ? 1 : 0, al: f.alive ? 1 : 0, k: f.kills, tt: f.tacticalType, ta: [f.tacticalAmmo.SHOCK, f.tacticalAmmo.CRYO, f.tacticalAmmo.C4], mb: f.maxBombs, br: f.bombRange, sl: f.speedLevel, dc: Math.round(f.dashCooldown * 100) / 100, it: Math.round(f.invulnTimer * 100) / 100 })),
    b: bombs.filter(b => !b.exploded).map(b => ({ i: b.id, t: b.type, x: Math.round(b.x * 10) / 10, y: Math.round(b.y * 10) / 10, c: b.c, r: b.r, s: Math.round(b.seed * 100) / 100, f: Math.round(b.fuse * 100) / 100 })),
    x: explosions.map(ex => ({ i: ex.id, t: ex.type, x: Math.round(ex.x * 10) / 10, y: Math.round(ex.y * 10) / 10, cells: ex.cells, rad: ex.radius || 0, col: ex.color, tm: Math.round(ex.timer * 100) / 100, mt: ex.maxTimer })),
    p: powerups.map(pu => ({ t: pu.type, x: Math.round(pu.x * 10) / 10, y: Math.round(pu.y * 10) / 10, b: Math.round(pu.bobPhase * 100) / 100 }))
  };
  if (gridRev !== net.gridSentRev) { snap.g = grid; snap.gv = gridRev; net.gridSentRev = gridRev; }
  if (net.feed && net.feed.length) {
    const fresh = net.feed.filter(ev => ev.sq > net.feedSentSeq);
    if (fresh.length) { snap.kf = fresh; net.feedSentSeq = fresh[fresh.length - 1].sq; }
  }
  return snap;
}

function netHostSend(dt) {
  if (net.role !== 'host' || !net.dc || net.dc.readyState !== 'open') return;
  net.sendAccum += dt;
  if (net.sendAccum < 0.05) return;
  net.sendAccum = 0;
  try { net.dc.send(JSON.stringify(netBuildSnapshot())); } catch (err) {}
}

function netApplySnapshot(s) {
  if (net.role !== 'guest') return;
  if (!net.started) netStartGuestMatch();
  if (s.e && !match.ended) { endMatch(s.w === 1, false); return; }
  if (!s.e && match.ended) { match.ended = false; match.running = true; UI.endModal.classList.add('hidden'); }
  match.elapsedTime = s.tm || 0;
  match.safeRing = typeof s.sr === 'number' ? s.sr : match.safeRing;
  match.stormTimer = typeof s.st === 'number' ? s.st : match.stormTimer;
  match.stormWarning = !!s.sw;
  activeAirdrop = s.ad || null;
  if (match.stormWarning) UI.stormBanner.classList.remove('hidden'); else UI.stormBanner.classList.add('hidden');
  if (activeAirdrop && !activeAirdrop.landed) UI.airdropBanner.classList.remove('hidden'); else UI.airdropBanner.classList.add('hidden');
  if (s.g && s.gv !== net.lastGridRev) { grid = s.g; net.lastGridRev = s.gv; }
  const prev = new Map(fighters.map(f => [f.id, f]));
  fighters = (s.f || []).map(d => {
    let f = prev.get(d.i);
    if (!f) { f = makeFighter(0, { c: 1, r: 1 }, d.n, d.c, d.v, d.d, d.tm); f.id = d.i; f.x = d.x; f.y = d.y; }
    f.device = d.d; f.isHuman = d.d === 'p1' || d.d === 'p2';
    f.name = d.n; f.color = d.c; f.visor = d.v; f.team = d.tm || 0;
    f.netX = d.x; f.netY = d.y; f.facingAngle = d.a;
    f.hp = d.hp; f.maxHp = d.mhp; f.shield = !!d.sh; f.inBush = !!d.ib; f.alive = !!d.al;
    f.kills = d.k; f.tacticalType = d.tt;
    f.tacticalAmmo = { SHOCK: d.ta[0], CRYO: d.ta[1], C4: d.ta[2] };
    f.maxBombs = d.mb; f.bombRange = d.br; f.speedLevel = d.sl;
    f.dashCooldown = d.dc; f.invulnTimer = d.it;
    return f;
  });
  bombs = (s.b || []).map(d => ({ id: d.i, type: d.t, x: d.x, y: d.y, c: d.c, r: d.r, ownerId: '', range: 1, fuse: d.f, vx: 0, vy: 0, passThroughPlayers: new Set(), exploded: false, seed: d.s }));
  explosions = (s.x || []).map(d => {
    if (!net.seenExplosions.has(d.i)) {
      net.seenExplosions.add(d.i);
      if (d.t === 'cross') SFX.playExplosion(audibilityAt(d.x, d.y));
      else if (d.t === 'shock') SFX.playShockwave();
      else if (d.t === 'cryo') SFX.playCryo();
      if (d.t === 'cross') triggerShake(5, d.x, d.y);
    }
    return { id: d.i, type: d.t, x: d.x, y: d.y, cells: d.cells || [], radius: d.rad, color: d.col, timer: d.tm, maxTimer: d.mt };
  });
  if (net.seenExplosions.size > 300) net.seenExplosions.clear();
  powerups = (s.p || []).map(d => ({ type: d.t, x: d.x, y: d.y, bobPhase: d.b }));
  if (s.kf && s.kf.length) s.kf.forEach(ev => renderKillFeedRow(ev.k, ev.kc, ev.v, ev.vc, ev.m));
  netUpdateBadge();
}

function updateNetGuest(dt) {
  const k = 1 - Math.exp(-16 * dt);
  for (const f of fighters) { if (!f.alive) continue; f.x += (f.netX - f.x) * k; f.y += (f.netY - f.y) * k; }
  for (let i = explosions.length - 1; i >= 0; i--) { explosions[i].timer -= dt; if (explosions[i].timer <= 0) explosions.splice(i, 1); }
  netSendInput(dt);
  hudAccum += dt;
  if (hudAccum >= 0.1) { hudAccum = 0; updateHUD(); }
  updateCamera(dt);
}

function netSendInput(dt) {
  if (net.role !== 'guest' || !net.dc || net.dc.readyState !== 'open') return;
  net.inputAccum += dt; net.pingAccum += dt;
  if (net.pingAccum > 2) { net.pingAccum = 0; try { net.dc.send(JSON.stringify({ t: 'p', ts: performance.now() })); } catch (e) {} }
  if (net.inputAccum < 1 / 60) return;
  net.inputAccum = 0;
  const f = getHuman();
  let x = 0, y = 0;
  if (f && f.alive) { const mv = readMoveVector('p1'); x = mv.x; y = mv.y; }
  const pending = net.pending; net.pending = {};
  const pkt = { t: 'i', x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 };
  if (pending.bomb) pkt.b = 1;
  if (pending.dash) pkt.d = 1;
  if (pending.tactical) pkt.q = 1;
  if (pending.cycle) pkt.c = 1;
  try { net.dc.send(JSON.stringify(pkt)); } catch (e) {}
}

function netTick(dt) { if (net.role === 'host') netHostSend(dt); }

function netLeaveRoom() {
  try { if (net.dc) net.dc.close(); } catch (e) {}
  try { if (net.pc) net.pc.close(); } catch (e) {}
  net.dc = null; net.pc = null; net.connected = false;
  net.role = null; net.started = false; match.netRole = null;
  setTimeout(() => location.reload(), 60);
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
const CHROMA_TILE = 90;
const CHROMA_ROUND_TIME = 4.5;
const CHROMA_WAIT_TIME = 2.0;
const CHROMA_FALL_TIME = 1.2;
const CHROMA_BOT_COUNT = 5;

const chroma = {
  active: false,
  canvas: null,
  ctx: null,
  viewW: 0,
  viewH: 0,
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
  shakeIntensity: 0
};

function initChromaDrop() {
  chroma.canvas = document.getElementById('chromaCanvas');
  chroma.ctx = chroma.canvas.getContext('2d');
  chroma.active = true;
  chroma.roundNumber = 0;
  chroma.particles = [];
  chroma.shakeTimer = 0;
  
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
  
  chroma.platforms = [];
  const offsetX = (chroma.viewW - CHROMA_GRID * CHROMA_TILE) / 2;
  const offsetY = (chroma.viewH - CHROMA_GRID * CHROMA_TILE) / 2 + 40;
  
  for (let r = 0; r < CHROMA_GRID; r++) {
    for (let c = 0; c < CHROMA_GRID; c++) {
      const colorIdx = Math.floor(Math.random() * CHROMA_COLORS.length);
      chroma.platforms.push({
        c, r,
        x: offsetX + c * CHROMA_TILE,
        y: offsetY + r * CHROMA_TILE,
        color: CHROMA_COLORS[colorIdx].id,
        alive: true,
        falling: false,
        fallY: 0,
        fallVel: 0,
        fallRot: 0,
        bobPhase: Math.random() * Math.PI * 2
      });
    }
  }
  
  chroma.players = [];
  const centerX = offsetX + (CHROMA_GRID / 2) * CHROMA_TILE;
  const centerY = offsetY + (CHROMA_GRID / 2) * CHROMA_TILE;
  
  chroma.players.push({
    x: centerX, y: centerY,
    vx: 0, vy: 0,
    radius: 18,
    color: '#34d399',
    visor: '#ecfdf5',
    name: (UI.nameInput.value || 'Viper-01').slice(0, 10),
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
    const dist = CHROMA_TILE * 1.5;
    chroma.players.push({
      x: centerX + Math.cos(angle) * dist,
      y: centerY + Math.sin(angle) * dist,
      vx: 0, vy: 0,
      radius: 16,
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
}

function startChromaRound() {
  chroma.roundNumber++;
  
  let availableColors = CHROMA_COLORS.filter(c => c.id !== (chroma.currentColor?.id));
  if (availableColors.length === 0) availableColors = CHROMA_COLORS;
  
  chroma.currentColor = availableColors[Math.floor(Math.random() * availableColors.length)];
  
  chroma.phase = 'waiting';
  chroma.waitTimer = CHROMA_WAIT_TIME;
  
  chroma.players.forEach(p => {
    if (p.isBot && p.alive && !p.falling) {
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
    const mv = readMoveVector('p1');
    const speed = 280;
    human.vx = mv.x * speed;
    human.vy = mv.y * speed;
    
    human.x += human.vx * dt;
    human.y += human.vy * dt;
    
    const minX = chroma.platforms[0].x;
    const maxX = chroma.platforms[CHROMA_GRID * CHROMA_GRID - 1].x + CHROMA_TILE;
    const minY = chroma.platforms[0].y;
    const maxY = chroma.platforms[CHROMA_GRID * CHROMA_GRID - 1].y + CHROMA_TILE;
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
      const tx = p.targetPlatform.x + CHROMA_TILE / 2;
      const ty = p.targetPlatform.y + CHROMA_TILE / 2;
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
    if (x >= p.x && x < p.x + CHROMA_TILE && y >= p.y && y < p.y + CHROMA_TILE) return p;
  }
  return null;
}

function findNearestPlatformOfColor(x, y, colorId) {
  let best = null;
  let bestDist = Infinity;
  for (const p of chroma.platforms) {
    if (!p.alive || p.color !== colorId) continue;
    const cx = p.x + CHROMA_TILE / 2;
    const cy = p.y + CHROMA_TILE / 2;
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
          x: p.x + CHROMA_TILE / 2,
          y: p.y + CHROMA_TILE / 2,
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
  
  SFX.playWarning();
}

function endChromaDrop() {
  chroma.phase = 'gameover';
  
  const rounds = chroma.roundNumber - 1;
  let newRecord = false;
  if (rounds > chroma.highScore) {
    chroma.highScore = rounds;
    newRecord = true;
    try { localStorage.setItem('chroma-highscore', String(chroma.highScore)); } catch (e) {}
  }
  
  SFX.playChromaWrong();
  
  setTimeout(() => {
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
      ctx.translate(px + CHROMA_TILE / 2, py + CHROMA_TILE / 2);
      ctx.rotate(p.fallRot);
      ctx.translate(-(px + CHROMA_TILE / 2), -(py + CHROMA_TILE / 2));
      ctx.globalAlpha = Math.max(0, 1 - p.fallY / 400);
    }
    
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.beginPath();
    ctx.ellipse(px + CHROMA_TILE / 2, py + CHROMA_TILE - 5, CHROMA_TILE * 0.4, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    const grad = ctx.createLinearGradient(px, py, px, py + CHROMA_TILE);
    grad.addColorStop(0, colorData.hex);
    grad.addColorStop(1, shadeColor(colorData.hex, -40));
    ctx.fillStyle = grad;
    chromaRoundRect(ctx, px + 4, py + 4, CHROMA_TILE - 8, CHROMA_TILE - 8, 12);
    ctx.fill();
    
    ctx.strokeStyle = shadeColor(colorData.hex, 30);
    ctx.lineWidth = 3;
    chromaRoundRect(ctx, px + 4, py + 4, CHROMA_TILE - 8, CHROMA_TILE - 8, 12);
    ctx.stroke();
    
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    chromaRoundRect(ctx, px + 10, py + 10, CHROMA_TILE - 20, (CHROMA_TILE - 20) / 2, 8);
    ctx.fill();
    
    if (chroma.currentColor && p.color === chroma.currentColor.id && chroma.phase === 'running') {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 4]);
      chromaRoundRect(ctx, px + 2, py + 2, CHROMA_TILE - 4, CHROMA_TILE - 4, 14);
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
    ctx.arc(px, py - 2, 5, 0, Math.PI * 2);
    ctx.fill();
    
    if (!pl.falling) {
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

function shadeColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

function exitChromaDrop() {
  chroma.active = false;
  chroma.phase = 'idle';
  document.getElementById('chromaModal').classList.add('hidden');
  document.getElementById('chromaGameOver').classList.add('hidden');
}

function bindChromaUI() {
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
   19. RENDERING
   ======================================================================== */
function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
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
  drawPortals();
  drawAirdropBeacon();
  drawPowerups();
  drawBombs();
  drawFighters();
  drawExplosions();
  drawParticles();
  drawLabels();
  ctx.restore();
  drawStormVignette();
  renderRadar();
}

function drawTiles(minC, maxC, minR, maxR) {
  const theme = match.theme || MAPS[0];
  const floorA = theme.floor[0], floorB = theme.floor[1];
  for (let r = minR; r <= maxR; r++) {
    for (let c = minC; c <= maxC; c++) {
      const x = c * TILE_SIZE, y = r * TILE_SIZE;
      const t = grid[r][c];
      ctx.fillStyle = (c + r) % 2 === 0 ? floorA : floorB;
      ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
      ctx.strokeStyle = 'rgba(56,189,248,0.05)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 0.5, y + 0.5, TILE_SIZE - 1, TILE_SIZE - 1);
      if (t === CELL.PILLAR) drawPillar(x, y);
      else if (t === CELL.CRATE) drawCrate(x, y);
      else if (t === CELL.BUSH) drawBush(x, y, c, r);
      else if (t === CELL.CRUSHED) drawCrushed(x, y);
      else if (t === CELL.AIRDROP_CRATE) drawAirdropCrate(x, y);
      if (cryoTiles.has(`${c},${r}`)) drawCryoTile(x, y);
    }
  }
}

function drawPillar(x, y) {
  ctx.fillStyle = '#1e293b'; rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 9); ctx.fill();
  ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = '#475569'; rr(x + 8, y + 8, TILE_SIZE - 16, 10, 4); ctx.fill();
  ctx.fillStyle = 'rgba(148,163,184,0.55)';
  [[12, 34], [TILE_SIZE - 12, 34], [12, TILE_SIZE - 12], [TILE_SIZE - 12, TILE_SIZE - 12]].forEach(([ox, oy]) => {
    ctx.beginPath(); ctx.arc(x + ox, y + oy, 2, 0, Math.PI * 2); ctx.fill();
  });
}

function drawCrate(x, y) {
  ctx.fillStyle = '#7c2d12'; rr(x + 3, y + 3, TILE_SIZE - 6, TILE_SIZE - 6, 8); ctx.fill();
  ctx.fillStyle = '#b45309'; rr(x + 7, y + 7, TILE_SIZE - 14, TILE_SIZE - 14, 5); ctx.fill();
  ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + 10, y + 10); ctx.lineTo(x + TILE_SIZE - 10, y + TILE_SIZE - 10);
  ctx.moveTo(x + TILE_SIZE - 10, y + 10); ctx.lineTo(x + 10, y + TILE_SIZE - 10);
  ctx.stroke();
}

function drawBush(x, y, c, r) {
  ctx.fillStyle = '#14532d'; rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 12); ctx.fill();
  const sway = Math.sin(nowT * 1.6 + c * 0.7 + r * 1.1) * 3;
  ctx.fillStyle = 'rgba(34,197,94,0.55)';
  [[14, 30], [26, 20], [34, 32], [22, 38]].forEach(([ox, oy], i) => {
    ctx.beginPath(); ctx.arc(x + ox + sway * (i % 2 ? 1 : -1), y + oy, 9 - i, 0, Math.PI * 2); ctx.fill();
  });
  ctx.strokeStyle = 'rgba(134,239,172,0.35)'; ctx.lineWidth = 1.5;
  rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 12); ctx.stroke();
}

function drawCrushed(x, y) {
  ctx.fillStyle = '#0a0d14'; ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  ctx.strokeStyle = 'rgba(127,29,29,0.55)'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(x + 4, y + TILE_SIZE - 6); ctx.lineTo(x + TILE_SIZE - 6, y + 4); ctx.stroke();
  ctx.strokeStyle = 'rgba(248,113,113,0.18)'; ctx.lineWidth = 1;
  ctx.strokeRect(x + 1.5, y + 1.5, TILE_SIZE - 3, TILE_SIZE - 3);
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

function drawBombs() {
  bombs.forEach(b => {
    if (b.exploded) return;
    const meta = b.type === 'NORMAL' ? { color: '#f97316', icon: '💣' } : b.type === 'C4' ? { color: '#f43f5e', icon: '📡' } : b.type === 'SHOCK' ? { color: '#fbbf24', icon: '🌀' } : { color: '#67e8f9', icon: '❄️' };
    const blink = b.fuse < 0.9 ? 0.55 + Math.abs(Math.sin(nowT * 16)) * 0.45 : 1;
    const pulse = 1 + Math.sin(nowT * 10 + b.seed) * 0.07;
    ctx.save(); ctx.globalAlpha = blink;
    const glow = ctx.createRadialGradient(b.x, b.y, 2, b.x, b.y, 26);
    glow.addColorStop(0, meta.color); glow.addColorStop(1, 'rgba(15,23,42,0)');
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(b.x, b.y, 26, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#111827';
    ctx.beginPath(); ctx.arc(b.x, b.y, 15 * pulse, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = meta.color; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.font = '16px "Segoe UI Emoji", sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(meta.icon, b.x, b.y + 1);
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
  return null;
}

function drawFighters() {
  for (const f of fighters) {
    if (!f.alive) continue;
    const accent = deviceAccent(f);
    let alpha = 1;
    if (f.inBush && !f.isHuman) alpha = 0.6;
    if (f.invulnTimer > 0 && Math.floor(nowT * 16) % 2 === 0) alpha *= 0.55;
    ctx.save(); ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.ellipse(f.x, f.y + 10, PLAYER_RADIUS * 0.95, PLAYER_RADIUS * 0.45, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fill();
    const grad = ctx.createRadialGradient(f.x - 5, f.y - 6, 2, f.x, f.y, PLAYER_RADIUS);
    grad.addColorStop(0, '#ffffff'); grad.addColorStop(0.3, f.color); grad.addColorStop(1, '#0f172a');
    ctx.beginPath(); ctx.arc(f.x, f.y, PLAYER_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = grad; ctx.fill();
    
    // 🆕 Borda colorida por time
    ctx.lineWidth = f.isHuman ? 3 : 2;
    if (f.team === 1) ctx.strokeStyle = '#34d399';
    else if (f.team === 2) ctx.strokeStyle = '#f87171';
    else ctx.strokeStyle = accent ? accent.light : 'rgba(2,6,23,0.85)';
    ctx.stroke();
    
    const ang = f.facingAngle;
    ctx.beginPath();
    ctx.arc(f.x + Math.cos(ang) * 4, f.y + Math.sin(ang) * 4, 6, ang - 0.9, ang + 0.9);
    ctx.strokeStyle = f.visor; ctx.lineWidth = 3; ctx.stroke();
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
        ctx.fillStyle = '#fef3c7';
        rr(x + pad + 8, y + pad + 8, TILE_SIZE - (pad + 8) * 2, TILE_SIZE - (pad + 8) * 2, 7); ctx.fill();
        ctx.restore();
      });
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
  if (!match.stormWarning) return;
  const pulse = 0.35 + Math.sin(nowT * 4) * 0.12;
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

function renderRadar() {
  const S = 88;
  const scale = S / WORLD_PX;
  rctx.clearRect(0, 0, S, S);
  rctx.save();
  rctx.beginPath(); rctx.arc(S / 2, S / 2, S / 2, 0, Math.PI * 2); rctx.clip();
  rctx.fillStyle = 'rgba(8,12,20,0.94)'; rctx.fillRect(0, 0, S, S);
  const ring = clamp(match.safeRing, 0, 13);
  const minT = ring, maxT = GRID_SIZE - 1 - ring;
  rctx.strokeStyle = 'rgba(244,63,94,0.7)'; rctx.lineWidth = 1;
  rctx.strokeRect(minT * TILE_SIZE * scale, minT * TILE_SIZE * scale, (maxT - minT) * TILE_SIZE * scale, (maxT - minT) * TILE_SIZE * scale);
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const t = grid[r] ? grid[r][c] : CELL.FLOOR;
      if (t === CELL.FLOOR || t === CELL.BUSH) continue;
      if (t === CELL.CRATE) rctx.fillStyle = 'rgba(180,83,9,0.7)';
      else if (t === CELL.AIRDROP_CRATE) rctx.fillStyle = '#fbbf24';
      else rctx.fillStyle = 'rgba(100,116,139,0.55)';
      rctx.fillRect(c * TILE_SIZE * scale, r * TILE_SIZE * scale, Math.max(1, TILE_SIZE * scale), Math.max(1, TILE_SIZE * scale));
    }
  }
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

function loop(ts) {
  const seconds = ts / 1000;
  if (!lastTime) lastTime = seconds;
  const dt = Math.min(0.05, Math.max(0, seconds - lastTime));
  lastTime = seconds;
  nowT = seconds;
  pollGamepads();
  
  // 🎨 Chroma Drop OU jogo principal
  if (chroma.active) {
    updateChromaDrop(dt);
    drawChromaDrop();
  } else {
    if (match.running) update(dt);
    netTick(dt);
    render();
  }
  
  requestAnimationFrame(loop);
}

window.onload = function () {
  try {
    loadPrefs();
    resize();
    bindUI();
    bindChromaUI(); // 🎨 Chroma Drop
    
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
    setSelectedMode(MODE_CONFIG[prefs.mode] ? prefs.mode : 'SOLO');
    setSelectedMap(getMap(prefs.map).id);
    updatePadStatus();
    updateCareerUI();
    initArena(true, selectedMode, selectedMap);
    updateHUD();
    requestAnimationFrame(loop);
  } catch (err) {
    console.error('❌ Erro ao iniciar o jogo:', err);
    document.body.innerHTML = `<div style="color:red;padding:20px;font-family:monospace"><h2>❌ Erro ao iniciar</h2><pre>${err.stack || err.message}</pre></div>`;
  }
};