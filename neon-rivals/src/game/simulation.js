export const ARENA_WIDTH = 1120;
export const ARENA_HEIGHT = 710;
export const MAX_PLAYERS = 4;
export const MIN_PLAYERS = 2;
export const MATCH_SECONDS = 150;
export const TICK_RATE = 20;
export const PLAYER_RADIUS = 17;
export const PLAYER_SPEED = 245;
export const DASH_SPEED = 675;
export const DASH_MS = 165;
export const DASH_COOLDOWN_MS = 1450;
export const DASH_INVULN_MS = 135;
export const FIRE_COOLDOWN_MS = 270;
export const BULLET_SPEED = 690;
export const BULLET_LIFETIME_MS = 1100;
export const BULLET_DAMAGE = 34;
export const RESPAWN_MS = 1700;
export const ROUND_COUNTDOWN_MS = 3500;

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function normalize(x, y) {
  const length = Math.hypot(x, y);
  return length > 1 ? { x: x / length, y: y / length } : { x, y };
}

export function randomSpawn(index, total) {
  const angle = (Math.PI * 2 * index) / Math.max(1, total) - Math.PI / 2;
  const radius = Math.min(ARENA_WIDTH, ARENA_HEIGHT) * 0.28;
  return {
    x: ARENA_WIDTH / 2 + Math.cos(angle) * radius,
    y: ARENA_HEIGHT / 2 + Math.sin(angle) * radius
  };
}
