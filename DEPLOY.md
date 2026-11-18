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
   https://blast-royale.onrender.com
   ```
   É esse link que você manda para os amigos.

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

## TURN (importante para jogar pela internet)

Sem TURN, algumas redes (4G, Wi-Fi corporativo, CGNAT) bloqueiam a conexão P2P
mesmo com o servidor funcionando. Configurar um TURN melhora muito a taxa de
sucesso.

No painel da hospedagem, adicione as variáveis:

```text
TURN_URL=turn:seu-servidor:3478
TURN_USERNAME=usuario
TURN_CREDENTIAL=senha
```

Ou a lista completa em `ICE_SERVERS` (JSON). O cliente pega isso sozinho em
`/api/health`.

Se quiser um TURN gerenciado: Metered, Twilio Network Traversal, Cloudflare
Calls (TURN). Todos têm plano gratuito limitado.

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
