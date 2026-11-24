import Phaser from 'phaser';
import { ARENA_HEIGHT, ARENA_WIDTH } from './simulation.js';
import type { NetworkClient } from './network.js';

type PlayerSnapshot = {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
  hp: number;
  kills: number;
  deaths: number;
  aimX: number;
  aimY: number;
  alive: boolean;
  invulnerable: boolean;
  dashReadyAt: number;
};

type BulletSnapshot = {
  id: string;
  ownerId: string;
  x: number;
  y: number;
  color: string;
};

export type MatchSnapshot = {
  type: string;
  matchId: string;
  phase: 'countdown' | 'running' | 'results';
  now: number;
  startsAt: number;
  endsAt: number;
  winnerIds: string[];
  players: PlayerSnapshot[];
  bullets: BulletSnapshot[];
  leaderboard: Array<{ id: string; name: string; kills: number; deaths: number; place: number }>;
  notice?: string;
};

type ViewPlayer = PlayerSnapshot & { viewX: number; viewY: number };

export class ArenaScene extends Phaser.Scene {
  private network: NetworkClient;
  private snapshot: MatchSnapshot | null = null;
  private selfId = '';
  private worldGraphics!: Phaser.GameObjects.Graphics;
  private names = new Map<string, Phaser.GameObjects.Text>();
  private viewPlayers = new Map<string, ViewPlayer>();
  private lastInputAt = 0;
  private keys!: Record<string, Phaser.Input.Keyboard.Key>;

  constructor(network: NetworkClient) {
    super('arena');
    this.network = network;
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#09121a');
    this.cameras.main.setBounds(0, 0, ARENA_WIDTH, ARENA_HEIGHT);
    this.worldGraphics = this.add.graphics();
    this.drawArena();
    this.keys = this.input.keyboard!.addKeys('W,A,S,D,SPACE,UP,DOWN,LEFT,RIGHT') as Record<string, Phaser.Input.Keyboard.Key>;
    this.input.mouse?.disableContextMenu();
  }

  setSelfId(id: string): void {
    this.selfId = id;
  }

  setSnapshot(snapshot: MatchSnapshot): void {
    this.snapshot = snapshot;
    for (const player of snapshot.players) {
      const view = this.viewPlayers.get(player.id);
      if (view) {
        Object.assign(view, player);
      } else {
        this.viewPlayers.set(player.id, { ...player, viewX: player.x, viewY: player.y });
      }
    }
    const currentIds = new Set(snapshot.players.map(player => player.id));
    for (const [id, text] of this.names) {
      if (!currentIds.has(id)) {
        text.destroy();
        this.names.delete(id);
        this.viewPlayers.delete(id);
      }
    }
  }

  update(time: number): void {
    if (!this.snapshot) return;
    const pointer = this.input.activePointer;
    const aim = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
    const moveX = Number(this.keys.A.isDown || this.keys.LEFT.isDown) * -1 +
      Number(this.keys.D.isDown || this.keys.RIGHT.isDown);
    const moveY = Number(this.keys.W.isDown || this.keys.UP.isDown) * -1 +
      Number(this.keys.S.isDown || this.keys.DOWN.isDown);

    if (time - this.lastInputAt >= 50) {
      this.network.send('input', {
        input: {
          moveX,
          moveY,
          aimX: aim.x,
          aimY: aim.y,
          shoot: pointer.isDown,
          dash: this.keys.SPACE.isDown
        }
      });
      this.lastInputAt = time;
    }

    const blend = 1 - Math.exp(-18 * Math.min(0.05, this.game.loop.delta / 1000));
    for (const player of this.viewPlayers.values()) {
      player.viewX += (player.x - player.viewX) * blend;
      player.viewY += (player.y - player.viewY) * blend;
    }
    this.drawFrame();
  }

  private drawArena(): void {
    const graphics = this.worldGraphics;
    graphics.clear();
    graphics.fillStyle(0x0a1119, 1);
    graphics.fillRect(0, 0, ARENA_WIDTH, ARENA_HEIGHT);
    graphics.lineStyle(1, 0x18303a, 0.25);
    for (let x = 0; x <= ARENA_WIDTH; x += 40) graphics.lineBetween(x, 0, x, ARENA_HEIGHT);
    for (let y = 0; y <= ARENA_HEIGHT; y += 40) graphics.lineBetween(0, y, ARENA_WIDTH, y);
    graphics.lineStyle(1, 0x54f6dd, 0.09);
    for (let x = 0; x <= ARENA_WIDTH; x += 200) graphics.lineBetween(x, 0, x, ARENA_HEIGHT);
    for (let y = 0; y <= ARENA_HEIGHT; y += 200) graphics.lineBetween(0, y, ARENA_WIDTH, y);
    graphics.lineStyle(2, 0x54f6dd, 0.5);
    graphics.strokeRect(12, 12, ARENA_WIDTH - 24, ARENA_HEIGHT - 24);
    graphics.lineStyle(1, 0xff4f9a, 0.32);
    graphics.strokeRect(19, 19, ARENA_WIDTH - 38, ARENA_HEIGHT - 38);
    graphics.lineStyle(1, 0x54f6dd, 0.17);
    graphics.strokeCircle(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, 114);
    graphics.strokeCircle(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, 121);
    graphics.fillStyle(0x54f6dd, 0.06);
    graphics.fillCircle(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, 3);
    this.drawBracket(28, 28, 1, 1);
    this.drawBracket(ARENA_WIDTH - 28, 28, -1, 1);
    this.drawBracket(28, ARENA_HEIGHT - 28, 1, -1);
    this.drawBracket(ARENA_WIDTH - 28, ARENA_HEIGHT - 28, -1, -1);
  }

  private drawBracket(x: number, y: number, sx: number, sy: number): void {
    this.worldGraphics.lineStyle(2, 0x54f6dd, 0.8);
    this.worldGraphics.lineBetween(x, y, x + sx * 20, y);
    this.worldGraphics.lineBetween(x, y, x, y + sy * 20);
    this.worldGraphics.fillStyle(0x54f6dd, 0.85);
    this.worldGraphics.fillCircle(x, y, 2);
  }

  private drawFrame(): void {
    const graphics = this.worldGraphics;
    graphics.clear();
    this.drawArena();

    for (const bullet of this.snapshot!.bullets) {
      const color = Phaser.Display.Color.HexStringToColor(bullet.color).color;
      graphics.fillStyle(color, 0.18);
      graphics.fillCircle(bullet.x, bullet.y, 11);
      graphics.fillStyle(color, 0.95);
      graphics.fillCircle(bullet.x, bullet.y, 4);
    }

    for (const player of this.viewPlayers.values()) {
      if (!player.alive) continue;
      const color = Phaser.Display.Color.HexStringToColor(player.color).color;
      const isSelf = player.id === this.selfId;
      const x = player.viewX;
      const y = player.viewY;
      const pointer = this.input.activePointer;
      const aim = isSelf
        ? this.cameras.main.getWorldPoint(pointer.x, pointer.y)
        : { x: player.aimX, y: player.aimY };
      const angle = Math.atan2(aim.y - y, aim.x - x);

      graphics.fillStyle(color, 0.1);
      graphics.fillCircle(x, y, 31);
      if (player.invulnerable) {
        graphics.lineStyle(2, 0xffffff, 0.85);
        graphics.strokeCircle(x, y, 26 + Math.sin(this.time.now / 70) * 2);
      }
      if (isSelf) {
        graphics.lineStyle(1, 0xffffff, 0.45);
        graphics.strokeCircle(x, y, 22);
      }
      graphics.lineStyle(5, 0x05080c, 0.9);
      graphics.lineBetween(x, y, x + Math.cos(angle) * 20, y + Math.sin(angle) * 20);
      graphics.lineStyle(2, color, 1);
      graphics.lineBetween(x, y, x + Math.cos(angle) * 20, y + Math.sin(angle) * 20);
      graphics.fillStyle(0x071019, 1);
      graphics.fillCircle(x, y, 14);
      graphics.fillStyle(color, 1);
      graphics.fillCircle(x, y, 10);
      graphics.fillStyle(0xeafefa, 0.95);
      graphics.fillCircle(x + Math.cos(angle) * 4, y + Math.sin(angle) * 4, 3);

      let nameTag = this.names.get(player.id);
      if (!nameTag) {
        nameTag = this.add.text(x, y + 30, player.name.toUpperCase(), {
          fontFamily: 'DM Mono, monospace',
          fontSize: '10px',
          color: isSelf ? '#e8fffb' : '#c2cbd4',
          stroke: '#081018',
          strokeThickness: 4
        }).setOrigin(0.5, 0);
        this.names.set(player.id, nameTag);
      }
      nameTag.setPosition(x, y + 25);
      nameTag.setAlpha(isSelf ? 1 : 0.88);
      nameTag.setDepth(2);
    }
  }
}

export function createGame(scene: ArenaScene): Phaser.Game {
  return new Phaser.Game({
    type: Phaser.CANVAS,
    parent: 'arena',
    width: ARENA_WIDTH,
    height: ARENA_HEIGHT,
    backgroundColor: '#0a1119',
    render: { antialias: true, pixelArt: false },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: ARENA_WIDTH,
      height: ARENA_HEIGHT
    },
    scene: [scene]
  });
}
