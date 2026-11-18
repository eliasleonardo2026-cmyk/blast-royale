# Blast Royale — servidor

Servidor Node.js **sem dependências** que:

- serve o jogo em `http://localhost:8123`;
- cria salas com código curto (ex.: `ZS9V`);
- troca `offer`/`answer` do WebRTC entre os dois jogadores;
- **relay automático**: se o P2P não abrir (4G, CGNAT, Wi-Fi corporativo,
  firewall), a partida continua passando pelo servidor — sem TURN e sem
  configuração extra;
- entrega a configuração de STUN/TURN para o cliente;
- mantém o gameplay **P2P** quando ele funciona (o servidor não simula a
  partida; no relay ele só repassa mensagens).

## Rodar localmente

Requer **Node.js 18+**.

```powershell
cd "C:\bombermam 2"
node server.js
```

Abra `http://localhost:8123`, vá em **ONLINE** e use **Criar sala** / **Entrar** com o código.

> Se a porta 8123 estiver ocupada (por exemplo, pelo `python -m http.server`), pare o outro processo ou use outra porta:
>
> ```powershell
> $env:PORT=8080; node server.js
> ```

Para jogar em dois computadores na mesma rede, use o IP da máquina no lugar de `localhost`:

```text
http://192.168.0.10:8123
```

O servidor escuta em `0.0.0.0` por padrão.

## Como funciona

1. O host cria a sala e recebe um código de 4 letras.
2. O host gera a oferta WebRTC e a envia ao servidor.
3. O convidado entra com o código, busca a oferta e devolve a resposta.
4. Os dois abrem um canal de dados P2P; o servidor para de participar.
5. Se em ~7 s o canal P2P não abrir (ou a rede nem permitir criar
   `RTCPeerConnection`), os dois lados ligam o **relay**: snapshots e inputs
   passam pelo servidor em lotes a cada ~50 ms. O selo do HUD troca de
   `🌐` para `📡` e a latência sobe um pouco, mas a partida acontece.
   Se o P2P abrir, ele continua sendo o transporte usado (o relay não liga).

O relay usa as mesmas rotas de sinalização (`signal` + `poll`), então
qualquer instância deste servidor já o suporta. A sala só expira após
2 horas **sem atividade** — uma partida em relay mantém a sala viva.

Também é possível compartilhar um link direto:

```text
http://localhost:8123/?room=ZS9V
```

O convidado cai direto na sala (precisa de um nick configurado).

O fluxo antigo de **copiar/colar códigos** continua disponível em “Usar códigos manuais” — útil quando o jogo é hospedado como site estático (GitHub Pages, por exemplo).

## TURN (opcional — o relay já cobre as redes bloqueadas)

Com o relay automático, **não é obrigatório** configurar TURN: redes que
bloqueiam o P2P caem sozinhas para o relay do servidor. O TURN continua útil
quando você quer manter o **P2P** (menor latência) também nessas redes.
Também vale lembrar que o relay repassa o tráfego do servidor; para partidas
longas ou muitos jogadores simultâneos, o TURN (ou um plano pago) escala melhor.

```powershell
$env:TURN_URL="turn:seu-servidor:3478"
$env:TURN_USERNAME="usuario"
$env:TURN_CREDENTIAL="senha"
node server.js
```

Ou passe a lista completa:

```powershell
$env:ICE_SERVERS='[{"urls":"turn:host:3478","username":"u","credential":"p"},{"urls":"stun:stun.l.google.com:19302"}]'
node server.js
```

O cliente busca essa configuração automaticamente em `/api/health`.

### coturn rápido (Linux)

```bash
sudo apt install coturn
sudo turnserver -a -f -n --user=usuario:senha --realm=blast --listening-port=3478
```

Libere as portas **3478/tcp**, **3478/udp** e a faixa de relay (padrão **49152–65535/udp**).

## Publicar (para jogar com o PC desligado)

Enquanto o servidor roda no seu computador, ele só existe enquanto o PC está
ligado. Para o jogo ficar sempre acessível, hospede este servidor na nuvem.

O projeto já vem pronto para deploy:

| Arquivo | Serve para |
|---|---|
| `render.yaml` | Render (Blueprint, plano free) |
| `Dockerfile` | Fly.io, Railway, VPS, qualquer host com Docker |
| `Procfile` | Railway, Heroku, Dokku |
| `DEPLOY.md` | Passo a passo de cada opção |

Resumo:

- Start command: `node server.js`
- A plataforma injeta `PORT`; o padrão local continua `8123`.
- Configure `TURN_URL`, `TURN_USERNAME` e `TURN_CREDENTIAL` para jogar pela
  internet com mais estabilidade.
- HTTPS é obrigatório para WebRTC fora de `localhost` (Render/Railway/Fly já dão).

Passo a passo completo: **[DEPLOY.md](./DEPLOY.md)**.

> Se o jogo ficar em um host estático (GitHub Pages, Netlify) e o servidor em
> outro, use `?server=https://seu-servidor` na URL do jogo — ou deixe para o
> modo manual de códigos.

## API

| Método | Rota | Função |
|---|---|---|
| GET | `/api/health` | Status, salas ativas e servidores ICE |
| GET | `/api/ice` | Apenas a configuração ICE |
| POST | `/api/rooms` | Cria sala (host) |
| POST | `/api/rooms/:code/join` | Entra na sala (guest) |
| POST | `/api/rooms/:code/signal` | Envia oferta/resposta |
| GET | `/api/rooms/:code/poll?token=...&since=...` | Long-poll de sinais |
| POST | `/api/rooms/:code/leave` | Sai da sala |

As salas expiram sozinhas após **2 horas** sem atividade (`ROOM_TTL_MINUTES`).

## Limitações conhecidas

- O relay cobre só os dados da partida (posições, bombas, inputs). O **chat de
  voz** continua exigindo P2P e fica oculto no modo relay.
- No relay a latência é um pouco maior e o tráfego passa pelo servidor
  (~150–300 KB/s); o P2P, quando disponível, continua sem custo de banda.
- O servidor não simula a partida: no relay ele apenas repassa mensagens.
- O backend de perfis/nuvem (Firebase) continua separado e desligado por padrão; este servidor não substitui o Firestore.
- Não há autenticação de contas; o token da sala protege apenas a sessão de sinalização.
