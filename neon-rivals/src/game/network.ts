export type GameMessage = {
  type: string;
  [key: string]: unknown;
};

export class NetworkClient {
  private socket: WebSocket | null = null;
  private connectPromise: Promise<void> | null = null;
  private listeners = new Set<(message: GameMessage) => void>();
  private statusListeners = new Set<(connected: boolean) => void>();

  connect(): Promise<void> {
    if (this.socket?.readyState === WebSocket.OPEN) return Promise.resolve();
    if (this.connectPromise) return this.connectPromise;

    const scheme = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const socket = new WebSocket(`${scheme}//${window.location.host}/ws`);
    this.socket = socket;

    this.connectPromise = new Promise((resolve, reject) => {
      const timeout = window.setTimeout(() => {
        socket.close();
        reject(new Error('Não foi possível conectar ao servidor'));
      }, 8000);
      let welcomed = false;

      socket.addEventListener('open', () => {
        this.emitStatus(true);
      });
      socket.addEventListener('message', event => {
        let message: GameMessage;
        try {
          message = JSON.parse(String(event.data)) as GameMessage;
        } catch {
          return;
        }
        this.emitMessage(message);
        if (!welcomed && message.type === 'welcome') {
          welcomed = true;
          window.clearTimeout(timeout);
          resolve();
        }
      });
      socket.addEventListener('close', () => {
        this.emitStatus(false);
        this.connectPromise = null;
        if (!welcomed) {
          window.clearTimeout(timeout);
          reject(new Error('Conexão encerrada antes de entrar'));
        }
      });
      socket.addEventListener('error', () => {
        this.emitStatus(false);
        this.connectPromise = null;
        if (!welcomed) {
          window.clearTimeout(timeout);
          reject(new Error('Falha ao conectar ao servidor'));
        }
      });
    });
    return this.connectPromise;
  }

  send(type: string, payload: Record<string, unknown> = {}): void {
    if (this.socket?.readyState !== WebSocket.OPEN) return;
    this.socket.send(JSON.stringify({ type, ...payload }));
  }

  onMessage(listener: (message: GameMessage) => void): void {
    this.listeners.add(listener);
  }

  offMessage(listener: (message: GameMessage) => void): void {
    this.listeners.delete(listener);
  }

  onStatus(listener: (connected: boolean) => void): void {
    this.statusListeners.add(listener);
  }

  close(): void {
    this.socket?.close();
    this.socket = null;
    this.connectPromise = null;
  }

  private emitMessage(message: GameMessage): void {
    for (const listener of this.listeners) listener(message);
  }

  private emitStatus(connected: boolean): void {
    for (const listener of this.statusListeners) listener(connected);
  }
}
