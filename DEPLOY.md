# Publicar o servidor (jogar com o PC desligado)

O jogo em si roda no navegador do jogador. O que **não** pode ficar no seu PC é o
servidor de salas. Hospedando ele na nuvem, o site fica sempre no ar e só os
jogadores precisam estar com o computador ligado durante a partida.

> Depois que os dois jogadores conectam (canal P2P aberto), o servidor pode até
> reiniciar/suspender que a partida continua normalmente.
>
> Se o P2P não abrir (4G, CGNAT, Wi-Fi corporativo), o jogo passa sozinho para
> o **relay do servidor** e a partida continua — sem TURN. Enquanto isso o
> servidor precisa estar no ar. O selo do HUD mostra `📡` no relay.

---

## Opção 1 — Render (grátis, mais simples)

O projeto já vem com `render.yaml`.

1. Crie um repositório no GitHub e envie a pasta do jogo:
   ```powershell
   cd "C:\bombermam 2"
   git init
   git add .
   git commit -m "Blast Royale com servidor"
   ```
   Crie o repositório no <https://github.com/new> e siga as instruções que o
   GitHub mostra (as duas linhas de `git remote add` / `git push`).

2. Em <https://render.com>, entre com a conta do GitHub.
3. **New +** → **Blueprint** → escolha o repositório.
4. O Render detecta o `render.yaml`, instala e sobe sozinho.
5. Ao terminar, você recebe uma URL do tipo:
   ```text
   https://blast-royale-rrb5.onrender.com
   ```
   É esse link que você manda para os amigos. Confira a URL exata no topo da
   página do serviço no Render (o nome do serviço pode ganhar um sufixo).

### Configurar TURN no Render (para P2P em redes 4G/CGNAT)

Depois de criar o serviço no Render:

1. Crie uma conta em um provedor de TURN grátis (ex.: <https://metered.ca>) e anote `urls`, `username` e `credential`.
2. No painel do Render, abra seu serviço **blast-royale**.
3. Vá em **Environment** → **Add Environment Variable**.
4. Adicione estas três variáveis (uma por vez):

   | Key | Value |
   |-----|-------|
   | `TURN_URL` | `turn:seu-servidor-de-turn.com:3478` |
   | `TURN_USERNAME` | `seu_usuario_turn` |
   | `TURN_CREDENTIAL` | `sua_senha_turn` |

5. Clique em **Save Changes**. O Render reinicia o serviço automaticamente.
6. Confirme em `https://SEU-LINK.onrender.com/api/ice` que a lista de TURN aparece.

Alternativamente, edite o `render.yaml` e descomente as linhas de `TURN_URL`, `TURN_USERNAME` e `TURN_CREDENTIAL` com seus valores reais, então faça um novo `git push` (o autoDeploy do Render sobe sozinho).

### Atenção ao plano free
- O serviço **dorme após ~15 minutos sem acesso**. O primeiro acesso depois disso
  demora ~30–60 s (aparece “carregando”).
- Salas em memória somem quando o serviço reinicia — normal, elas duram poucas
  rodadas. Uma partida já conectada não cai.
- Para evitar a espera: plano pago (US$ 7/mês) ou um ping periódico no
  `/api/health` (consome horas do plano free).

---

## Opção 2 — Railway (grátis com limite mensal)

1. Instale o CLI: <https://docs.railway.com/guides/cli>
2. Na pasta do projeto:
   ```powershell
   railway login
   railway init
   railway up
   ```
3. Em **Settings → Networking → Generate Domain**, copie a URL `https://...`.

O Railway usa o `package.json` (`npm start`) automaticamente. O `Procfile`
também funciona em plataformas compatíveis (Heroku, Dokku).

---

## Opção 3 — Fly.io (Docker, sem precisar de GitHub)

O projeto já tem `Dockerfile`.

```powershell
# instale o flyctl: https://fly.io/docs/flyctl/install/
fly auth signup
cd "C:\bombermam 2"
fly launch --no-deploy
# aceite o Dockerfile e escolha a região mais próxima (ex.: gru = São Paulo)
fly deploy
```

A URL fica `https://SEU-APP.fly.dev`. Pode exigir cartão mesmo no plano free.

---

## Opção 4 — VPS própria (mais controle)

Requisitos: Node 18+ e um domínio/subdomínio apontando para o servidor.
Exemplo com Ubuntu + systemd + Caddy (HTTPS automático):

```bash
# 1. copie o jogo para /opt/blast-royale
sudo mkdir -p /opt/blast-royale
# envie os arquivos (scp/rsync) para essa pasta
cd /opt/blast-royale

# 2. serviço
sudo tee /etc/systemd/system/blast.service >/dev/null <<'EOF'
[Unit]
Description=Blast Royale
After=network.target

[Service]
WorkingDirectory=/opt/blast-royale
ExecStart=/usr/bin/node server.js
Environment=PORT=8123
Environment=NODE_ENV=production
Restart=always

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable --now blast

# 3. HTTPS
sudo apt install caddy
sudo tee /etc/caddy/Caddyfile >/dev/null <<'EOF'
blast.seudominio.com {
    reverse_proxy 127.0.0.1:8123
}
EOF
sudo systemctl reload caddy
```

---

## Opção 5 — Vercel (site sempre no ar)

O Vercel **hospeda o jogo**, mas não roda este `server.js` como está: funções
serverless não compartilham memória entre requisições, então as salas em memória
e o long-poll não funcionam de forma confiável.

Há dois caminhos:

### 5A. Vercel estático (rápido, sem conta de Redis)

O jogo fica online e o multiplayer usa o modo **“Usar códigos manuais”**
(copiar/colar oferta e resposta). O painel de servidor fica oculto sozinho.

```powershell
cd "C:\bombermam 2"
npx vercel --prod
```

O CLI pede login (e-mail/GitHub) e publica a pasta atual. Não precisa de
repositório. O `vercel.json` já cuida do cache do service worker.

> Neste modo **não** existe “Criar sala” com código de 4 letras — isso depende
> do servidor Node/Redis. Também não há relay automático; se o P2P falhar,
> sobram os códigos manuais em outra tentativa.

### 5B. Vercel + Upstash (salas automáticas)

Para ter “Criar sala / Entrar com código” no Vercel é preciso trocar a memória
do servidor por um Redis externo (Upstash, plano free). A versão serverless já
está em `api/[...path].js` e o relay automático funciona com ela (o cliente
usa polling curto no Vercel). Configure no painel do Vercel:

```text
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

É mais trabalhoso e depende de uma conta gratuita no Upstash; para jogar com
os amigos sem mexer nisso, Render/Railway/Fly são mais diretos.

---

## TURN (essencial para jogar pela internet)

Sem TURN, algumas redes (4G, Wi-Fi corporativo, CGNAT) bloqueiam a conexão P2P
mesmo com o servidor funcionando. O jogo tem **relay automático** (cai para o
servidor se o P2P não abrir), mas o relay tem latência maior e consome banda do
servidor. Um TURN real mantém o **P2P** funcionando nessas redes, com menor
latência.

### Como configurar

No painel da sua hospedagem (Render, Railway, Fly, VPS), adicione as variáveis
de ambiente:

```text
TURN_URL=turn:seu-servidor.com:3478
TURN_USERNAME=blast_turn_user
TURN_CREDENTIAL=uma_senha_forte_aqui
```

Ou passe a lista ICE completa em uma única variável:

```text
ICE_SERVERS='[{"urls":"turn:turn.seu-servidor.com:3478","username":"u","credential":"p"},{"urls":"stun:stun.l.google.com:19302"}]'
```

O cliente busca essa configuração automaticamente em `/api/health` e `/api/ice`.

### Opção A — TURN próprio com coturn (Linux, recomendado se você tem VPS)

```bash
# 1. Instale o coturn
sudo apt update
sudo apt install coturn

# 2. Rode com seu usuário/senha
sudo turnserver -a -f -n \
  --user=blast_turn_user:uma_senha_forte_aqui \
  --realm=blast \
  --listening-port=3478 \
  --cert=/etc/letsencrypt/live/seu-dominio.com/fullchain.pem \
  --pkey=/etc/letsencrypt/live/seu-dominio.com/privkey.pem

# 3. Libere no firewall (ufw exemplo)
sudo ufw allow 3478/tcp
sudo ufw allow 3478/udp
sudo ufw allow 49152:65535/udp   # faixa de relay de mídia do coturn
```

No `.env` da hospedagem:

```text
TURN_URL=turn:seu-dominio.com:3478
TURN_USERNAME=blast_turn_user
TURN_CREDENTIAL=uma_senha_forte_aqui
```

> O coturn precisa de **certificado TLS válido** para funcionar em TURN sobre
> TLS (porta 5349). Para TURN simples (3478 UDP/TCP sem TLS), pode pular
> `--cert`/`--pkey`, mas algumas redes bloqueiam porta 3478.

### Opção B — Provedores gerenciados de TURN (mais rápido, sem VPS próprio)

Todos têm planos gratuitos limitados, suficientes para testes e partidas
ocasionalmente:

| Provedor | Plano grátis | Link |
|----------|-------------|------|
| **Metered** | 10 GB de relé grátis/mês | https://metered.ca |
| **Twilio Network Traversal** | créditos iniciais | https://twilio.com |
| **Xirsys** | 10 GB grátis/mês | https://xirsys.com |
| **Cloudflare Calls** | TURN incluído | https://cloudflare.com/products/calls |

Após criar a conta, você recebe `urls`, `username` e `credential`. Preencha no
`.env` da sua hospedagem:

```text
TURN_URL=turn:seu-provedor.com:3478
TURN_USERNAME=usuario_do_provedor
TURN_CREDENTIAL=senha_do_provedor
```

### Opção C — Sem TURN (relay automático, já funciona)

O servidor já inclui **relay automático** via WebSocket ou HTTP long-poll.
Se o P2P não abrir, o jogo passa sozinho para o relay e a partida acontece
— apenas com latência um pouco maior. O selo do HUD mostra `📡` quando está
no relay. Isso já cobre a maioria dos casos sem precisar configurar nada
extra.

### Checklist depois de publicar

- [ ] Abrir `https://SEU-LINK/api/health` e ver `"ok": true`.
- [ ] Confirmar que `/api/ice` retorna a lista de STUN/TURN configurada.
- [ ] Abrir o jogo e confirmar o selo **“Servidor online · conectado”** no lobby ONLINE.
- [ ] Criar sala em um computador e entrar com o código em outro (de outra rede).
- [ ] Testar o link `?room=CODIGO` no celular.
- [ ] Se aparecer “Sua rede bloqueou o WebRTC”, configurar `TURN_URL`.

---

## Checklist depois de publicar

- [ ] Abrir `https://SEU-LINK/api/health` e ver `"ok": true`.
- [ ] Abrir o jogo e confirmar o selo **“Servidor online · conectado”** no lobby ONLINE.
- [ ] Criar sala em um computador e entrar com o código em outro (de outra rede).
- [ ] Testar o link `?room=CODIGO` no celular.
- [ ] Se aparecer “Sua rede bloqueou o WebRTC”, configurar `TURN_URL`.

## Observações

- WebRTC fora de `localhost` **exige HTTPS** — Render/Railway/Fly já entregam HTTPS.
- GitHub Pages/Netlify/Vercel (estático) **não** rodam este servidor; nesses casos
  o jogo cai no modo manual de copiar/colar códigos.
- Firebase/perfis na nuvem continua desligado por padrão e é independente disto.
