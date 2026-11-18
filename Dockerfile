# Blast Royale — imagem de produção (Node 22, sem dependências)
FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production

# Só o necessário para o jogo e o servidor.
COPY package.json server.js index.html script.js style.css tailwind.css ui-extra.css firebase-sync.js sw.js manifest.webmanifest ./
COPY audio ./audio
COPY icons ./icons

# A plataforma define PORT; 8123 é só o padrão local.
ENV PORT=8123
EXPOSE 8123

USER node
CMD ["node", "server.js"]
