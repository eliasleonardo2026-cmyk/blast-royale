# Neon Rivals

Protótipo de arena 2D online focado em duelos curtos e habilidade. O servidor é a autoridade da partida: recebe movimento, mira, tiro e dash; valida deslocamento, dano, eliminações e resultado.

## Rodar localmente

Requer Node.js 20 ou mais recente.

```powershell
npm install
npm run dev
```

Abra `http://localhost:5181` em duas janelas. O Vite serve o cliente; o servidor WebSocket autoritativo e a API de saúde rodam na porta `3001`.

## Controles

- `WASD` ou setas: mover.
- Mouse: mirar e segurar o botão esquerdo para disparar.
- `Espaço`: dash direcional com breve janela de invulnerabilidade.

## Deploy

O `render.yaml` define um serviço independente para este jogo. Crie um serviço/Blueprint apontando para o repositório com **Root Directory** `neon-rivals`; o Render instala dependências, gera o cliente e inicia o servidor HTTP + WebSocket.

## Estado do protótipo

- Fila rápida para 2 a 4 pilotos, partidas de 2:30 e respawn.
- Movimento, disparos, dash, dano e placar calculados no servidor.
- Os recordes de vitória e o nome são locais neste protótipo.
- Matchmaking, sala de convite, persistência de ranking e infraestrutura de produção ainda precisam de uma etapa própria antes de uma temporada competitiva pública.
