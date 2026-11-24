import './style.css';
import { ArenaScene, createGame, type MatchSnapshot } from './game/arena-scene';
import { NetworkClient, type GameMessage } from './game/network';

const network = new NetworkClient();
const scene = new ArenaScene(network);
const game = createGame(scene);
const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

const connectionStatus = $('connection-status');
const matchStatus = $('match-status');
const overlay = $('arena-overlay');
const overlayTitle = $('overlay-title');
const overlayCopy = $('overlay-copy');
const playButton = $('play-button') as HTMLButtonElement;
const buttonLabel = playButton.querySelector('span')!;
const pilotName = $('pilot-name') as HTMLInputElement;
const queueCopy = $('queue-copy');
const toast = $('toast');
const leaderboard = $('leaderboard');
const clock = $('hud-clock');
const countdown = $('match-countdown');
const hudName = $('hud-name');
const hudKills = $('hud-kills');
const hudHealth = $('hud-health');
const hudDash = $('hud-dash');
const progress = $('progress-fill') as HTMLElement;
const sessionProgress = $('session-progress');
const winsLabel = $('hud-wins');
const liveDot = document.querySelector('.live-dot')!;

let searching = false;
let selfId = '';
let latest: MatchSnapshot | null = null;
let toastTimer = 0;
let previousKills = -1;
let wins = Number(localStorage.getItem('neon-rivals-wins') || 0);
winsLabel.textContent = String(wins);
pilotName.value = localStorage.getItem('neon-rivals-name') || 'PILOTO';

function setConnection(connected: boolean): void {
  connectionStatus.textContent = connected ? 'SERVIDOR ONLINE' : 'SEM CONEXÃO';
  connectionStatus.classList.toggle('online', connected);
  connectionStatus.classList.toggle('offline', !connected);
  if (connected) {
    liveDot.classList.add('active');
  } else {
    liveDot.classList.remove('active');
    matchStatus.textContent = 'DESCONECTADO';
  }
}

function showToast(message: string): void {
  toast.textContent = message;
  toast.classList.remove('hidden');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.add('hidden'), 2600);
}

function showOverlay(title: string, copy: string, buttonText: string): void {
  overlayTitle.textContent = title;
  overlayCopy.textContent = copy;
  buttonLabel.textContent = buttonText;
  overlay.classList.remove('dismissed');
}

function formatTime(seconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(safeSeconds / 60)).padStart(2, '0')}:${String(safeSeconds % 60).padStart(2, '0')}`;
}

function updateLeaderboard(message: MatchSnapshot): void {
  leaderboard.replaceChildren();
  const rows = message.leaderboard.slice(0, 4);
  for (let index = 0; index < 4; index += 1) {
    const entry = rows[index];
    const row = document.createElement('div');
    row.className = `rank-row${entry?.id === selfId ? ' me' : ''}`;
    const place = document.createElement('span');
    place.textContent = String(index + 1).padStart(2, '0');
    const name = document.createElement('span');
    name.textContent = entry?.name.toUpperCase() || '—';
    const kills = document.createElement('b');
    kills.textContent = entry ? `${String(entry.kills).padStart(2, '0')} K` : '—';
    row.append(place, name, kills);
    leaderboard.append(row);
  }
}

function updateMatch(message: MatchSnapshot): void {
  latest = message;
  scene.setSnapshot(message);
  updateLeaderboard(message);
  const me = message.players.find(player => player.id === selfId);

  if (message.phase === 'countdown') {
    matchStatus.textContent = `${message.players.length} PILOTOS NA ARENA`;
    countdown.textContent = String(Math.max(1, Math.ceil((message.startsAt - Date.now()) / 1000)));
    countdown.classList.remove('hidden');
    clock.textContent = formatTime(150);
  } else if (message.phase === 'running') {
    matchStatus.textContent = 'COMBATE ATIVO';
    countdown.classList.add('hidden');
    clock.textContent = formatTime((message.endsAt - Date.now()) / 1000);
  } else {
    matchStatus.textContent = 'PARTIDA FINALIZADA';
    countdown.classList.add('hidden');
  }

  if (me) {
    hudName.textContent = me.name.toUpperCase();
    hudKills.textContent = String(me.kills).padStart(2, '0');
    hudHealth.innerHTML = `${me.hp}<span>%</span>`;
    hudDash.textContent = Date.now() >= me.dashReadyAt ? 'PRONTO' : 'RECARREGANDO';
    progress.style.width = `${Math.min(100, me.kills / 3 * 100)}%`;
    sessionProgress.textContent = `${Math.min(3, me.kills)} / 3`;
    if (me.kills > previousKills && previousKills >= 0) showToast('ELIMINAÇÃO CONFIRMADA  +1');
    previousKills = me.kills;
  }
}

function handleMessage(message: GameMessage): void {
  if (message.type === 'welcome') {
    setConnection(true);
  } else if (message.type === 'queue') {
    const count = Number(message.count || 1);
    queueCopy.textContent = `${count} PILOTO${count === 1 ? '' : 'S'} NA FILA · MÁX. 4`;
  } else if (message.type === 'queue-cancelled') {
    searching = false;
    playButton.disabled = false;
    buttonLabel.textContent = 'BUSCAR PARTIDA';
    queueCopy.textContent = '2–4 PILOTOS · PARTIDAS DE 2:30';
    showToast('BUSCA CANCELADA');
  } else if (message.type === 'match-found') {
    selfId = String(message.selfId || '');
    scene.setSelfId(selfId);
    searching = false;
    playButton.disabled = true;
    previousKills = -1;
    hudName.textContent = pilotName.value.trim().toUpperCase() || 'PILOTO';
    matchStatus.textContent = 'PREPARE-SE';
    queueCopy.textContent = `${Number(message.playerCount || 2)} PILOTOS · BOA CAÇADA`;
    overlay.classList.add('dismissed');
  } else if (message.type === 'state' || message.type === 'result') {
    updateMatch(message as unknown as MatchSnapshot);
    if ('notice' in message && message.notice) showToast(String(message.notice));
    if (message.type === 'result') {
      const winners = message.winnerIds as string[];
      if (winners.includes(selfId)) {
        wins += 1;
        localStorage.setItem('neon-rivals-wins', String(wins));
        winsLabel.textContent = String(wins);
        showOverlay('VOCÊ DOMINOU.', 'Vitória confirmada. Mais uma partida pode mudar seu lugar no topo.', 'JOGAR DE NOVO');
      } else {
        const winner = (message.players as Array<{ id: string; name: string }>).find(player => winners.includes(player.id));
        showOverlay('A PRÓXIMA É SUA.', `${winner?.name || 'Outro piloto'} levou a rodada. Ajuste a mira e volte para a arena.`, 'TENTAR DE NOVO');
      }
    }
  } else if (message.type === 'match-ended') {
    if (latest?.phase !== 'results') showOverlay('PARTIDA ENCERRADA.', 'Um piloto saiu da arena. Encontre novos rivais para jogar de novo.', 'BUSCAR PARTIDA');
    selfId = '';
    latest = null;
    scene.setSelfId('');
    searching = false;
    playButton.disabled = false;
    playButton.disabled = false;
    buttonLabel.textContent = 'BUSCAR PARTIDA';
  } else if (message.type === 'error') {
    showToast(String(message.message || 'Algo deu errado.'));
  }
}

network.onMessage(handleMessage);
network.onStatus(connected => {
  setConnection(connected);
  if (!connected && latest && latest.phase !== 'results') {
    showOverlay('CONEXÃO PERDIDA.', 'O servidor caiu ou sua rede oscilou. Reconecte para voltar à fila.', 'CONECTAR');
    searching = false;
    playButton.disabled = false;
    buttonLabel.textContent = 'CONECTAR';
  }
});
void network.connect().catch(() => setConnection(false));

playButton.addEventListener('click', async () => {
  if (searching) {
    network.send('cancel-queue');
    return;
  }
  const name = pilotName.value.trim().slice(0, 16) || 'PILOTO';
  pilotName.value = name.toUpperCase();
  localStorage.setItem('neon-rivals-name', pilotName.value);
  playButton.disabled = true;
  buttonLabel.textContent = 'CONECTANDO...';
  try {
    await network.connect();
    searching = true;
    playButton.disabled = false;
    buttonLabel.textContent = 'CANCELAR BUSCA';
    queueCopy.textContent = 'PROCURANDO RIVAIS...';
    matchStatus.textContent = 'NA FILA DE MATCHMAKING';
    network.send('quickplay', { name: pilotName.value });
  } catch (error) {
    playButton.disabled = false;
    buttonLabel.textContent = 'TENTAR CONECTAR';
    showToast(error instanceof Error ? error.message : 'Falha na conexão');
  }
});

window.addEventListener('beforeunload', () => {
  network.send('leave');
  network.close();
});

window.setInterval(() => {
  if (latest?.phase === 'running') {
    clock.textContent = formatTime((latest.endsAt - Date.now()) / 1000);
    const me = latest.players.find(player => player.id === selfId);
    if (me) hudDash.textContent = Date.now() >= me.dashReadyAt ? 'PRONTO' : 'RECARREGANDO';
  } else if (latest?.phase === 'countdown') {
    countdown.textContent = String(Math.max(1, Math.ceil((latest.startsAt - Date.now()) / 1000)));
  }
}, 100);

window.addEventListener('pagehide', () => game.destroy(true));
