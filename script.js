/* ========================================================================
   BLAST ROYALE v6.0 - COMPLETE GAME ENGINE
   - Modos de Time (1v1, 2v2, 3v3)
   - Conquistas
   - Chroma Drop (mini-jogo das cores)
   - Multiplayer WebRTC
   ======================================================================== */

/* Anúncios premiados — no navegador/desktop o "TEST_MODE" simula o vídeo.
   No Android (Capacitor) troque pelo ID real do bloco premiado do AdMob. */
const ADMOB_REWARDED_ID = "TEST_MODE";

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
    tutorialBtn: "TUTORIAL DE PRIMEIRA PARTIDA",
    tutorialBadge: "TUTORIAL", tutorialSkip: "PULAR TUTORIAL",
    tutorialDoneTitle: "TREINAMENTO CONCLUÍDO!", tutorialDoneSub: "Você aprendeu o básico. Agora é com você na arena!",
    tutorialPlayNow: "JOGAR AGORA",
    stealthActive: "OCULTO NO ARBUSTO", zoneShrinking: "ZONA FECHANDO!",
    airdropIncoming: "AIRDROP A CAMINHO!",
    winTitle: "CAMPEÃO BLAST ROYALE!", winSub: "Você sobreviveu e venceu a partida!",
    loseTitle: "ELIMINADO!", loseSub: "Continue treinando seus combos e esquivas!",
    deathByBomb: "Eliminado por {name}. Fique de olho nas bombas!",
    deathByStorm: "A zona te pegou! Fique mais perto do centro.",
    deathBySelf: "Você se pegou na própria explosão!",
    deathByLava: "A lava te queimou! Pise nas pedras, não nas poças.",
    lavaEliminated: "foi queimado pela lava",
    statKillsLabel: "Eliminações", statTimeLabel: "Sobrevivência",
    playAgainBtn: "JOGAR NOVAMENTE",
    endLeaguePts: "{n} PTS NA LIGA", endTrophyBonus: "Bônus de desempenho",
    eliminatedBy: "eliminou", stormEliminated: "foi esmagado pela Zona",
    selfEliminated: "explodiu a si mesmo",
    modeLabel: "Modo de Jogo", modeSoloDesc: "1 jogador + 15 bots",
    modeDuelDesc: "Duelo 1 contra 1", modeLocalDesc: "2 jogadores no mesmo PC",
    modeLocalDuelDesc: "Duelo 2 jogadores, sem bots, no mesmo PC",
    modeOnlineDesc: "2 jogadores pela internet", mapLabel: "Mapa",
    modeChange: "TROCAR", modePickerTitle: "MODO E MAPA", modePickerSub: "Escolha como e onde jogar",
    modeSheetDone: "PRONTO", mapPickSub: "9 mapas disponíveis",
    modeTeam1v1Desc: "Duelo puro", modeTeam2v2Desc: "Você + aliado vs 2", modeTeam3v3Desc: "Você + 2 aliados vs 3",
    p2NameLabel: "Codinome do Jogador 2",
    tagSolo: "BATTLE ROYALE • 16 LUTADORES", tagDuel: "DUELO • 1 CONTRA 1",
    tagLocal: "MULTIPLAYER LOCAL • 2 JOGADORES", tagLocalDuel: "DUELO LOCAL • 1 V 1",
    tagOnline: "MULTIPLAYER ONLINE • 1 CONTRA 1",
    tagTeam1v1: "🥊 DUELO 1 v 1", tagTeam2v2: "⚔️ EQUIPE 2 v 2", tagTeam3v3: "🛡️ GUERRA 3 v 3",
    hintSolo: "WASD • ESPAÇO • E • Q • SHIFT",
    hintLocal: "P1: WASD / ESPAÇO / E / Q / SHIFT ESQ.  ·  P2: SETAS / ENTER / . / , / SHIFT DIR.",
    padOne: "1 controle conectado", padTwo: "2 controles conectados",
    p2Wins: "O Jogador 2 venceu a partida!", p2WinTitle: "JOGADOR 2 VENCEU!",
    p1Wins: "O Jogador 1 venceu a partida!", p1WinTitle: "JOGADOR 1 VENCEU!",
    drawTitle: "EMPATE!", drawSub: "Os dois caíram ao mesmo tempo!",
    careerWins: "vitórias", careerKills: "eliminações",
    careerWin: "vitória", careerKill: "eliminação",
    duelWinSub: "Você venceu o duelo!", onlineWinSub: "Você venceu online. GG!",
    onlineWinTitle: "VITÓRIA ONLINE!", onlineLoseTitle: "DERROTA ONLINE",
    onlineLoseSub: "Seu rival levou a melhor. Tente de novo!",
    netLostTitle: "CONEXÃO PERDIDA!", netLostSub: "O outro jogador saiu ou a rede caiu.",
    shareBtn: "Enviar", pasteBtn: "Colar",
    netAutoCopied: "Código copiado! Envie para o amigo.",
    teamWinSub: "Seu time dominou a arena!", teamLoseSub: "Seu time foi eliminado!",
    teamWinTitle: "VITÓRIA DO TIME!", teamLoseTitle: "DERROTA DO TIME",
    teamWinBadge: "TIME 1 VENCEU!", teamLoseBadge: "TIME 2 VENCEU!",
    exitBtn: "SAIR DA SALA", backToMenu: "Voltar ao lobby",
    onlineLabel: "Multiplayer a Distância",
    onlineHint: "Sem servidor: troque os códigos abaixo com seu amigo.",
    onlineHintServer: "Servidor conectado: crie uma sala ou entre com um código.",
    serverTitle: "🌐 Servidor online", serverChecking: "verificando…", serverOnline: "conectado", serverOffline: "indisponível",
    serverCreate: "➕ Criar sala", serverJoin: "Entrar", serverRoomCode: "Código da sala",
    serverCopyLink: "Copiar link", serverLeave: "Sair", serverManual: "Usar códigos manuais", serverManualHide: "Ocultar códigos manuais",
    serverWaitGuest: "Sala criada. Envie o código ou o link para o amigo.",
    serverWaitOffer: "Conectando ao anfitrião…", serverNoRoom: "Sala não encontrada.",
    serverFull: "Sala cheia.", serverErrorMsg: "Falha no servidor. Tente novamente.",
    serverRoomClosed: "A sala foi encerrada.", serverCopied: "Link copiado!",
    serverGuestReady: "Conectado ao anfitrião. Aguardando o início da partida.",
    serverHostReady: "O amigo entrou. Preparando a partida…",
    serverBadCode: "Digite o código de 4 letras da sala.",
    serverConnecting: "Conectando…", serverWaiting: "Aguardando…",
    serverNoIce: "Sua rede bloqueou o WebRTC. Configure TURN_URL no servidor.",
    serverRelay: "Rede restrita: a partida está passando pelo servidor (latência um pouco maior).",
    serverRelayWait: "Rede bloqueou o P2P. A partida usa o servidor quando o amigo entrar.",
    quickMatchBtn: "🔎 BUSCAR PARTIDA 1v1", quickMatchCancel: "✖ CANCELAR BUSCA",
    quickMatchSearching: "Procurando jogador… {t}s", quickMatchFound: "Partida encontrada! Conectando…",
    quickMatchCancelled: "Busca cancelada.", quickMatchExpired: "A busca expirou. Tente de novo.",
    quickMatchUnavailable: "Busca rápida indisponível neste servidor.",
    quickMatchLeaveRoom: "Saia da sala atual antes de buscar partida.",
    bracketInQuick: "Cancele a busca rápida antes de jogar a chave.",
    quickMatchInBracket: "Você está na busca da chave. Cancele antes de buscar partida.",
    bracketWaitRival: "⏳ {rival} também precisa tocar em Jogar a Chave.",
    bracketSearching: "🔎 Procurando {rival}… {t}s",
    bracketCancelSearch: "✖ CANCELAR BUSCA",
    bracketFound: "⚔️ Adversário da chave encontrado! Conectando…",
    bracketCancelled: "Busca da chave cancelada.",
    bracketExpired: "A busca da chave expirou. Tente de novo.",
    bracketLeaveRoom: "Saia da sala atual antes de jogar a chave.",
    bracketUnavailable: "A chave online precisa do servidor de salas (indisponível aqui).",
    bracketWaitConfirm: "⏳ Registrando o resultado no servidor…",
    bracketConfirmedWin: "✅ Resultado oficial: você avançou na chave!",
    bracketConfirmedLoss: "❌ Resultado oficial: você foi eliminado.",
    bracketVoid: "⚠️ Resultado inconclusivo. O confronto não avançou.",
    bracketNoConfirm: "⚠️ Resultado não registrado pelo servidor. A chave não avançou.",
    netRelay: "Conectado pelo servidor (relay)",
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
    netNoIce: "Sua rede bloqueou WebRTC.", netReconnecting: "Reconectando...",
    netReconnectSub: "Aguardando a rede voltar. A partida está pausada.",
    netReconnectCount: "Reconectando... {s}s",
    netReconnectSubCount: "A partida está pausada. Se a rede não voltar em {s}s, a sala será encerrada.",
    netRematchTimeout: "O host não respondeu. Tente novamente.",
    netRematchSent: "Pedido de revanche enviado. Aguardando o host...",
    tabPlay: "JOGAR", tabOnline: "ONLINE",
    tabPlaySub: "Modos, mapa e loadout", tabOnlineSub: "Jogar pela internet",
    tabChromaSub: "Mini-jogo das cores",
    onlineModeHint: "🌐 Modo online selecionado — conecte-se na seção ONLINE.",
    pauseSettings: "⚙️ AJUSTES",
    settingsTitle: "AJUSTES", settingsAudio: "ÁUDIO", settingsControls: "CONTROLES", settingsScreen: "TELA",
    setVolume: "Volume geral", setVolumeDesc: "Efeitos sonoros do jogo",
    setMusic: "Volume da música", setMusicDesc: "Trilha sonora do menu e das partidas",
    rematchBtn: "🔁 REVANCHE", rematchWaiting: "AGUARDANDO O HOST...",
    setVibration: "Vibração", setVibrationDesc: "Vibrar ao levar dano (celular/controle)",
    setJoySize: "Tamanho do joystick", setJoyOpacity: "Opacidade do joystick",
    setDeadzone: "Zona morta do analógico", setDeadzoneDesc: "Aumente se o personagem se mover sozinho",
    setShake: "Tremor de tela", setShakeDesc: "Sacudir a câmera nas explosões",
    setReduceMotion: "Reduzir movimento", setReduceMotionDesc: "Desliga tremor, flashes e animações extras",
    progMissions: "🎯 Missões", progSeason: "🎫 Passe", progRanking: "🏆 Ranking",
    heroTitle: "PERSONAGEM", heroSub: "Visual, skins e estilo",
    heroHint: "Ganhe XP para liberar skins por nível. Skins exclusivas vêm do Passe de Temporada (coluna Plus).",
    achieveUnlocked: "Conquista Desbloqueada!",
    chromaTitle: "CHROMA DROP", chromaPlay: "🎨 CHROMA DROP",
    progTitle: "PROGRESSO", progSub: "Nível, missões, passe e ranking", progLevelLabel: "NÍVEL",
    pwaUpdated: "Nova versão instalada. Recarregue para atualizar.",
    setFps: "Mostrar FPS", setFpsDesc: "Exibe a taxa de quadros durante o jogo",
    setGraphics: "Gráficos", setGraphicsDesc: "Qualidade visual — baixe em celulares mais fracos",
    gfxLow: "Baixo", gfxMedium: "Médio", gfxHigh: "Alto", gfxUltra: "Ultra",
    setReset: "RESTAURAR PADRÕES", joySmall: "P", joyMedium: "M", joyLarge: "G",
    duelModeDesc: "Série MD3 • Arena 15×15 simétrica",
    duelFormatLabel: "Formato da Série", duelFormatHint: "MD5 é usada nas finais do mata-mata.",
    duelRound: "ROUND", duelRoundWon: "{name} venceu o round!", duelRoundDraw: "Round empatado — ninguém pontua",
    duelNextRound: "PRÓXIMO ROUND EM INSTANTES", duelSeriesWon: "SÉRIE VENCIDA!", duelSeriesLost: "SÉRIE PERDIDA",
    duelSeriesSub: "Placar final {a} × {b} — {bo}",
    duelBadgeMd: "MD{bo}",
    tabProfile: "PERFIL", tabProfileSub: "Nick, avatar e resumo",
    profileNick: "Nick do Jogador", profileSave: "SALVAR", profileSaved: "Perfil salvo!",
    profileAvatar: "Avatar", profileWins: "Vitórias", profileLosses: "Derrotas", profilePoints: "Pontos", profileCoins: "Moedas",
    profileGeneral: "PROGRESSO GERAL", profileCompetitive: "ESTATÍSTICAS COMPETITIVAS",
    profileLevel: "NÍVEL", profileLeaguePts: "PTS LIGA", profileRankedWins: "V RANQ.",
    profileRankedLosses: "D RANQ.", profileTrophies: "TROFÉUS",
    endTraining: "💰 +{c} MOEDAS · ⭐ +{x} XP · Treino Offline • Não vale pontos na Liga",
    tabLeague: "TABELA DA LIGA", tabLeagueSub: "Liga ONLINE • +3 PTS por vitória",
    leagueG8: "G8 — classificados ao mata-mata", leaguePos: "Pos", leaguePlayer: "Jogador",
    leaguePts: "Pts", leagueW: "V", leagueL: "D", leagueYou: "VOCÊ",
    leagueNote: "Só partidas ONLINE PvP pontuam. Treinos contra bots não alteram esta tabela.",
    leagueOnlineHint: "🌐 Só partidas ONLINE PvP pontuam na Liga.",
    tabBracket: "TORNEIOS", tabBracketSub: "Semanal + Copa de domingo",
    bracketHint: "Fase 1 (seg–qui): Liga ONLINE vale G8. Fase 2 (sex–sáb): mata-mata PvP ONLINE só para o Top 8.",
    champWeekly: "CAMPEONATO SEMANAL", champCopa: "COPA RELÂMPAGO",
    weeklyPhase1: "FASE 1 • LIGA (SEG–QUI)", weeklyPhase2: "FASE 2 • MATA-MATA ONLINE (SEX–SÁB)",
    weeklyPhaseClosed: "FASE ENCERRADA • COPA HOJE",
    weeklyPhase1Hint: "Liga ONLINE de pontos corridos: +3 PTS por vitória. Os 8 primeiros avançam.",
    bracketTieRule: "Desempate do G8: pontos → vitórias → menos derrotas → troféus → nick.",
    bracketSeedsPending: "⏳ A chave está fechando o Top 8. Tente de novo em instantes.",
    bracketNotQualified: "🔒 Só o Top 8 congelado desta semana pode jogar o mata-mata.",
    bracketNeedEight: "🔒 O mata-mata fecha quando a Liga tiver 8 jogadores ranqueados nesta semana.",
    weeklyPhase2Qualified: "Você está no G8. Chave eliminatória PvP contra os 7 melhores.",
    weeklyPhase2NoQual: "Somente o Top 8 da Liga joga o mata-mata desta semana.",
    weeklyClosedHint: "O Campeonato Semanal reabre na segunda. Domingo é dia de Copa Relâmpago.",
    weeklyPhase1Lock: "🔒 FASE 1 • LIGA", weeklyClosedLock: "🔒 FASE ENCERRADA",
    weeklyPhase2Lock: "🔒 AGUARDE A FASE 2",
    weeklyLocked: "🔒 O mata-mata abre sexta-feira.",
    weeklyNotQualified: "Você ainda não está no G8 da Liga.",
    copaPlay: "⚡ JOGAR COPA", copaWon: "CLASSIFICADO", copaLost: "ELIMINADO", copaChampion: "CAMPEÃO",
    copaProjected: "PROJETADO", copaAdvanced: "⚡ Classificado na Copa Relâmpago!",
    copaClosed: "⚡ A Copa Relâmpago acontece no domingo.", copaFinished: "Sua campanha na Copa já terminou.",
    copaChampionToast: "🏆 CAMPEÃO DA COPA! +{c} 💰 +{t} 🏆",
    copaOpenTitle: "⚡ COPA RELÂMPAGO • ABERTA", copaClosedTitle: "⚡ COPA RELÂMPAGO • DOMINGO",
    copaChampionTitle: "🏆 CAMPEÃO DA COPA", copaEliminatedTitle: "COPA ENCERRADA PARA VOCÊ",
    copaOpenHint: "Torneio aberto de 8 jogadores • 3 rodadas MD3 • sem exigir G8.",
    copaClosedHint: "Chave rápida de 8 jogadores, aberta a qualquer patente. Volta domingo.",
    copaChampionHint: "Você venceu as três partidas e levou o prêmio da semana.",
    copaEliminatedHint: "A Copa volta no próximo domingo. Sua campanha desta semana terminou.",
    copaReward: "🏆 Campeão: +300 💰 e +40 🏆 • vice e semifinalistas levam troféus de partida",
    copaWinTitle: "CAMPEÃO DA COPA!", copaWinSub: "Você venceu as três partidas da Copa Relâmpago!",
    bracketQuarters: "QUARTOS DE FINAL", bracketSemis: "MEIAS-FINAIS", bracketFinal: "GRANDE FINAL",
    bracketFinalTime: "Sábado • 19h30", bracketSchedule: "📅 AGENDAR", bracketWatch: "🔴 ASSISTIR AO VIVO",
    bracketScheduleTitle: "AGENDAR PARTIDA", bracketDay: "Dia", bracketTime: "Horário",
    bracketPropose: "PROPOR HORÁRIO", bracketAccept: "ACEITAR PROPOSTA",
    bracketSet: "📅 {d} • {t}", bracketTbd: "A definir", bracketProposed: "Proposta enviada: {d} às {t}",
    bracketAccepted: "Horário aceito! Confronto marcado.", bracketWaitingAccept: "Aguardando o adversário aceitar...",
    bracketCountdown: "⏳ {t}",
    bracketPlayCta: "⚔️ JOGAR A CHAVE (ONLINE)",
    bracketWonLock: "✅ VITÓRIA • AGUARDE A PRÓXIMA FASE",
    bracketLostLock: "❌ ELIMINADO NESTA FASE",
    bracketAwaitRival: "⏳ AGUARDANDO ADVERSÁRIO",
    leaguePlayBtn: "🏅 JOGAR LIGA ONLINE (+3 PTS)",
    lobbyLiveTitle: "PARTIDA AO VIVO", lobbyLiveCta: "ASSISTIR",
    lobbyProfileHint: "Abrir perfil",
    tabShop: "LOJA VISUAL", tabShopSub: "Skins de personagens, bombas e efeitos",
    shopCoins: "moedas", shopDaily: "🎁 DIÁRIA", shopTest: "+200 MOEDAS", shopZeroP2W: "Só visual: nenhuma skin altera dano, vida ou alcance.",
    shopChars: "PERSONAGENS", shopBombs: "BOMBAS", shopBuy: "COMPRAR {n} 💰", shopEquip: "EQUIPAR",
    shopEquipped: "✓ EM USO", shopOwned: "COMPRADA", shopInUse: "EM USO", shopNotEnough: "Moedas insuficientes. Jogue partidas para ganhar mais!",
    shopBought: "{name} desbloqueado!", shopEquippedMsg: "{name} equipado!", shopDailyDone: "Diária já resgatada hoje.",
    shopDailyGain: "🎁 +100 moedas da diária!", shopTestGain: "🧪 +200 moedas de teste!",
    shopTabSkins: "SKINS", shopTabBombs: "BOMBAS", shopTabExplosions: "EXPLOSÕES", shopTabTrails: "RASTROS", shopTabAvatars: "AVATARES",
    shopAdChest: "📺 BAÚ +40 💰", shopChestGain: "📺 +40 moedas do baú patrocinado!", shopDefault: "↩ USAR PADRÃO",
    previewBuy: "COMPRAR {n} 💰", previewEquip: "EQUIPAR", previewInUse: "✓ EM USO",
    previewConfirmTitle: "Confirmar compra de {name} por {n} 💰?",
    previewConfirmBody: "Saldo agora: {a} 💰 • depois da compra: {b} 💰",
    previewConfirmYes: "CONFIRMAR", previewConfirmNo: "CANCELAR", previewOwned: "Item desbloqueado — é só equipar.",
    endTrainingCap: "🚫 Limite de 5 vitórias contra bots por dia — jogue ONLINE para mais recompensas.",
    endMatchCoins: "💰 +{c}",
    doubleRewardBtn: "DOBRAR +40 MOEDAS", doubleGain: "📺 +40 moedas extras!",
    adBadge: "ANÚNCIO PREMIADO", adNote: "Teste local: o vídeo real só aparece no app Android com AdMob configurado.",
    adSimulating: "Simulando Anúncio Premiado...", adDailyCap: "Limite diário de anúncios atingido (5/dia).",
    adTypeCap: "Você já usou este anúncio hoje.", adUnavailable: "Anúncio indisponível agora. Tente de novo mais tarde.",
    tabEvent: "EVENTO", tabEventSub: "Rotativo a cada 3 horas • fora da Liga",
    eventNextLabel: "Próximo evento em", eventGoal: "Vença 2 partidas neste evento",
    eventNextUp: "A seguir", eventStartsIn: "em", eventRotated: "🎪 Novo evento: {name}!",
    eventFirstReward: "🎪 Evento: 1ª vitória! +10 moedas. Mais 1 para +35 moedas e +25 XP.",
    eventSplashBadge: "EVENTO ATIVO", eventSplashTag: "3H • Fora da Liga • Recompensa a cada 2 vitórias",
    eventHudChip: "EVENTO",
    eventRewardReady: "Recompensa de +35 moedas e +25 XP resgatada!",
    eventPlayBtn: "JOGAR EVENTO", eventNoLeague: "O evento não vale pontos na Liga nem troféus.",
    eventRewardGranted: "🎪 Evento: +35 moedas e +{x} XP pela 2ª vitória!",
    eventProgressLine: "🎪 Evento: vitória {n}/2 — mais {m} para a recompensa.",
    eventLossLine: "🎪 Evento: {n}/2 vitórias neste ciclo.",
    spinTitle: "ROLETA DA SORTE", spinSub: "Gire 1x por dia: +50, +100 ou +200 moedas", spinBtn: "GIRAR", spinUsed: "USADO HOJE", spinGain: "🎰 +{n} moedas!",
    spectateTitle: "ARQUIBANCADA AO VIVO", camTotal: "VISÃO TOTAL", camP1: "SEGUIR P1", camP2: "SEGUIR P2",
    spectateExit: "SAIR", cheerHint: "TORCIDA", spectateVs: "{a} × {b}",
    voicePanel: "Chat de voz", voiceMicOn: "Ativar microfone", voiceMicOff: "Desligar microfone",
    voiceMuteOpp: "Mutar adversário", voiceUnmuteOpp: "Ouvir adversário", voiceReport: "Denunciar adversário",
    voiceMicUnavailable: "Microfone indisponível neste dispositivo.",
    voiceMicDenied: "Permissão de microfone negada. Voz desligada.",
    voiceReportTitle: "DENUNCIAR JOGADOR",
    voiceReportSub: "Denunciar {name} por voz imprópria ou comportamento abusivo?",
    voiceReportSend: "ENVIAR DENÚNCIA", voiceReportCancel: "CANCELAR",
    voiceReportSent: "Denúncia enviada para análise.",
    statsYou: "VOCÊ", statsPlayed: "PARTIDAS", statsWins: "VITÓRIAS", statsLosses: "DERROTAS",
    statsWinRate: "APROVEITAMENTO", statsLeaguePts: "PTS LIGA",
    statsFoot: "Estatísticas ranqueadas • Atualizadas a cada partida",
    statsNoData: "Estatísticas indisponíveis para este jogador.",
    nickPlaceholder: "Digite seu nick...",
    lobbyNoNick: "Jogador (Sem Nick)", nickFallback: "JOGADOR",
    nickModalTitle: "Escolha seu Nick para competir",
    nickModalSub: "Seu nick aparece na Liga e no Mata-Mata. Entre 3 e 15 caracteres.",
    nickModalSave: "SALVAR E CONTINUAR",
    nickErrShort: "O nick precisa ter pelo menos 3 caracteres.",
    nickErrLong: "O nick pode ter no máximo 15 caracteres.",
    nickErrSpaces: "O nick não pode ter espaços duplos.",
    nickSaved: "Nick salvo!",
    rotateTitle: "Gire o celular para jogar",
    rotateSub: "A arena é jogada na horizontal, em tela cheia.",
    rotateBtn: "ENTRAR EM TELA CHEIA",
    leagueEmpty: "Nenhum jogador na tabela ainda. Jogue no modo ONLINE para estrear!",
    bracketEmpty: "Nenhum jogador ranqueado ainda. A Liga ONLINE alimenta o mata-mata.",
    copaNeedPlayers: "A Copa Relâmpago precisa de 8 jogadores reais na Liga para abrir.",
    trainingBot: "BOT TREINO",
    profileSyncLocal: "📴 Modo local — entre na internet para sincronizar",
    profileSyncOnline: "☁️ Sincronizado com a nuvem",
    profileSyncAuth: "☁️ Conectando ao Firebase..."
  },
  en: {
    subtitle: "Survive the shrinking arena, kick bombs and be the last standing!",
    nicknameLabel: "Your Callsign", loadoutLabel: "Starter Tactical Bomb",
    tactShockName: "Shockwave", tactShockDesc: "Pushes rivals & bombs",
    tactCryoName: "Cryo Blast", tactCryoDesc: "Freezes ground & slows",
    tactC4Name: "Remote C4", tactC4Desc: "Detonate on command",
    featBush: "Stealth Bushes", featPortal: "Quantum Portals", featDash: "Kinetic Dash",
    playBtn: "ENTER ARENA",
    tutorialBtn: "FIRST-MATCH TUTORIAL",
    tutorialBadge: "TUTORIAL", tutorialSkip: "SKIP TUTORIAL",
    tutorialDoneTitle: "TRAINING COMPLETE!", tutorialDoneSub: "You learned the basics. Now it's all you in the arena!",
    tutorialPlayNow: "PLAY NOW",
    stealthActive: "HIDDEN IN BUSH", zoneShrinking: "ZONE SHRINKING!",
    airdropIncoming: "AIRDROP INCOMING!",
    winTitle: "BLAST ROYALE CHAMPION!", winSub: "You survived and claimed #1!",
    loseTitle: "ELIMINATED!", loseSub: "Master combos and dashes to win!",
    deathByBomb: "Eliminated by {name}. Watch those bombs!",
    deathByStorm: "The zone got you! Stay closer to the center.",
    deathBySelf: "You got caught in your own explosion!",
    deathByLava: "The lava burned you! Step on rock, not the pools.",
    lavaEliminated: "was burned by the lava",
    statKillsLabel: "Eliminations", statTimeLabel: "Survival Time",
    playAgainBtn: "PLAY AGAIN",
    endLeaguePts: "{n} LEAGUE PTS", endTrophyBonus: "Performance bonus",
    eliminatedBy: "eliminated", stormEliminated: "was crushed by the Zone",
    selfEliminated: "blew themselves up",
    modeLabel: "Game Mode", modeSoloDesc: "1 player + 15 bots",
    modeDuelDesc: "1 versus 1 duel", modeLocalDesc: "2 players on one PC",
    modeLocalDuelDesc: "2-player duel, no bots, same PC",
    modeOnlineDesc: "2 players over the internet", mapLabel: "Map",
    modeChange: "CHANGE", modePickerTitle: "MODE & MAP", modePickerSub: "Pick how and where to play",
    modeSheetDone: "READY", mapPickSub: "9 maps available",
    modeTeam1v1Desc: "Pure duel", modeTeam2v2Desc: "You + ally vs 2", modeTeam3v3Desc: "You + 2 allies vs 3",
    p2NameLabel: "Player 2 Callsign",
    tagSolo: "BATTLE ROYALE • 16 FIGHTERS", tagDuel: "DUEL • 1 VERSUS 1",
    tagLocal: "LOCAL MULTIPLAYER • 2 PLAYERS", tagLocalDuel: "LOCAL DUEL • 1 V 1",
    tagOnline: "ONLINE MULTIPLAYER • 1 VERSUS 1",
    tagTeam1v1: "🥊 DUEL 1 v 1", tagTeam2v2: "⚔️ TEAM 2 v 2", tagTeam3v3: "🛡️ WAR 3 v 3",
    hintSolo: "WASD • SPACE • E • Q • SHIFT",
    hintLocal: "P1: WASD / SPACE / E / Q / L-SHIFT  ·  P2: ARROWS / ENTER / . / , / R-SHIFT",
    padOne: "1 gamepad connected", padTwo: "2 gamepads connected",
    p2Wins: "Player 2 won the match!", p2WinTitle: "PLAYER 2 WINS!",
    p1Wins: "Player 1 won the match!", p1WinTitle: "PLAYER 1 WINS!",
    drawTitle: "DRAW!", drawSub: "Both fighters went down at once!",
    careerWins: "wins", careerKills: "kills",
    careerWin: "win", careerKill: "kill",
    duelWinSub: "You won the duel!", onlineWinSub: "You won online. GG!",
    onlineWinTitle: "ONLINE VICTORY!", onlineLoseTitle: "ONLINE DEFEAT",
    onlineLoseSub: "Your rival got the upper hand. Try again!",
    netLostTitle: "CONNECTION LOST!", netLostSub: "The other player left or the network dropped.",
    shareBtn: "Share", pasteBtn: "Paste",
    netAutoCopied: "Code copied! Send it to your friend.",
    teamWinSub: "Your team dominated the arena!", teamLoseSub: "Your team was eliminated!",
    teamWinTitle: "TEAM VICTORY!", teamLoseTitle: "TEAM DEFEAT",
    teamWinBadge: "TEAM 1 WINS!", teamLoseBadge: "TEAM 2 WINS!",
    exitBtn: "LEAVE ROOM", backToMenu: "Back to lobby",
    onlineLabel: "Online Multiplayer",
    onlineHint: "Serverless: swap codes with your friend.",
    onlineHintServer: "Server connected: create a room or join with a code.",
    serverTitle: "🌐 Online server", serverChecking: "checking…", serverOnline: "connected", serverOffline: "unavailable",
    serverCreate: "➕ Create room", serverJoin: "Join", serverRoomCode: "Room code",
    serverCopyLink: "Copy link", serverLeave: "Leave", serverManual: "Use manual codes", serverManualHide: "Hide manual codes",
    serverWaitGuest: "Room created. Send the code or link to your friend.",
    serverWaitOffer: "Connecting to the host…", serverNoRoom: "Room not found.",
    serverFull: "Room is full.", serverErrorMsg: "Server error. Try again.",
    serverRoomClosed: "The room was closed.", serverCopied: "Link copied!",
    serverGuestReady: "Connected to the host. Waiting for the match to start.",
    serverHostReady: "Your friend joined. Preparing the match…",
    serverBadCode: "Type the 4-letter room code.",
    serverConnecting: "Connecting…", serverWaiting: "Waiting…",
    serverNoIce: "Your network blocked WebRTC. Configure TURN_URL on the server.",
    serverRelay: "Restricted network: the match is relayed through the server (slightly higher latency).",
    serverRelayWait: "Network blocked P2P. The match uses the server when your friend joins.",
    quickMatchBtn: "🔎 QUICK MATCH 1v1", quickMatchCancel: "✖ CANCEL SEARCH",
    quickMatchSearching: "Looking for a player… {t}s", quickMatchFound: "Match found! Connecting…",
    quickMatchCancelled: "Search cancelled.", quickMatchExpired: "Search expired. Try again.",
    quickMatchUnavailable: "Quick match is unavailable on this server.",
    quickMatchLeaveRoom: "Leave the current room before searching for a match.",
    bracketInQuick: "Cancel the quick match search before playing the bracket.",
    quickMatchInBracket: "You are searching the bracket. Cancel it before searching a match.",
    bracketWaitRival: "⏳ {rival} must also tap Play Bracket.",
    bracketSearching: "🔎 Looking for {rival}… {t}s",
    bracketCancelSearch: "✖ CANCEL SEARCH",
    bracketFound: "⚔️ Bracket opponent found! Connecting…",
    bracketCancelled: "Bracket search cancelled.",
    bracketExpired: "Bracket search expired. Try again.",
    bracketLeaveRoom: "Leave the current room before playing the bracket.",
    bracketUnavailable: "The online bracket needs the room server (unavailable here).",
    bracketWaitConfirm: "⏳ Registering the result on the server…",
    bracketConfirmedWin: "✅ Official result: you advanced in the bracket!",
    bracketConfirmedLoss: "❌ Official result: you were eliminated.",
    bracketVoid: "⚠️ Inconclusive result. The match did not advance.",
    bracketNoConfirm: "⚠️ The server did not register the result. The bracket did not advance.",
    netRelay: "Connected through the server (relay)",
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
    netNoIce: "WebRTC blocked by your network.", netReconnecting: "Reconnecting...",
    netReconnectSub: "Waiting for the network. The match is paused.",
    netReconnectCount: "Reconnecting... {s}s",
    netReconnectSubCount: "The match is paused. If the network does not return in {s}s, the room will close.",
    netRematchTimeout: "The host did not respond. Try again.",
    netRematchSent: "Rematch request sent. Waiting for the host...",
    tabPlay: "PLAY", tabOnline: "ONLINE",
    tabPlaySub: "Modes, map and loadout", tabOnlineSub: "Play over the internet",
    tabChromaSub: "Color mini-game",
    onlineModeHint: "🌐 Online mode selected — connect in the ONLINE section.",
    pauseSettings: "⚙️ SETTINGS",
    settingsTitle: "SETTINGS", settingsAudio: "AUDIO", settingsControls: "CONTROLS", settingsScreen: "DISPLAY",
    setVolume: "Master volume", setVolumeDesc: "Game sound effects",
    setMusic: "Music volume", setMusicDesc: "Menu and match soundtrack",
    rematchBtn: "🔁 REMATCH", rematchWaiting: "WAITING FOR HOST...",
    setVibration: "Vibration", setVibrationDesc: "Vibrate when taking damage (phone/gamepad)",
    setJoySize: "Joystick size", setJoyOpacity: "Joystick opacity",
    setDeadzone: "Stick deadzone", setDeadzoneDesc: "Raise it if your fighter drifts on its own",
    setShake: "Screen shake", setShakeDesc: "Camera shake on explosions",
    setReduceMotion: "Reduce motion", setReduceMotionDesc: "Turns off shake, flashes and extra animations",
    progMissions: "🎯 Missions", progSeason: "🎫 Pass", progRanking: "🏆 Ranking",
    heroTitle: "CHARACTER", heroSub: "Looks, skins and style",
    heroHint: "Earn XP to unlock skins by level. Exclusive skins come from the Season Pass (Plus column).",
    achieveUnlocked: "Achievement Unlocked!",
    chromaTitle: "CHROMA DROP", chromaPlay: "🎨 CHROMA DROP",
    progTitle: "PROGRESS", progSub: "Level, missions, pass and ranking", progLevelLabel: "LEVEL",
    pwaUpdated: "New version installed. Reload to update.",
    setFps: "Show FPS", setFpsDesc: "Display frame rate while playing",
    setGraphics: "Graphics", setGraphicsDesc: "Visual quality — lower it on weaker phones",
    gfxLow: "Low", gfxMedium: "Medium", gfxHigh: "High", gfxUltra: "Ultra",
    setReset: "RESTORE DEFAULTS", joySmall: "S", joyMedium: "M", joyLarge: "L",
    duelModeDesc: "Best-of-3 series • 15×15 symmetric arena",
    duelFormatLabel: "Series Format", duelFormatHint: "MD5 is used in knockout finals.",
    duelRound: "ROUND", duelRoundWon: "{name} won the round!", duelRoundDraw: "Round drawn — no points",
    duelNextRound: "NEXT ROUND IN A MOMENT", duelSeriesWon: "SERIES WON!", duelSeriesLost: "SERIES LOST",
    duelSeriesSub: "Final score {a} × {b} — {bo}",
    duelBadgeMd: "MD{bo}",
    tabProfile: "PROFILE", tabProfileSub: "Nick, avatar and summary",
    profileNick: "Player Nick", profileSave: "SAVE", profileSaved: "Profile saved!",
    profileAvatar: "Avatar", profileWins: "Wins", profileLosses: "Losses", profilePoints: "Points", profileCoins: "Coins",
    profileGeneral: "OVERALL PROGRESS", profileCompetitive: "COMPETITIVE STATS",
    profileLevel: "LEVEL", profileLeaguePts: "LEAGUE PTS", profileRankedWins: "RANKED W",
    profileRankedLosses: "RANKED L", profileTrophies: "TROPHIES",
    endTraining: "💰 +{c} COINS · ⭐ +{x} XP · Offline Training Mode • Does not count for the League",
    tabLeague: "LEAGUE TABLE", tabLeagueSub: "ONLINE league • +3 PTS per win",
    leagueG8: "G8 — qualified for the knockout", leaguePos: "Pos", leaguePlayer: "Player",
    leaguePts: "Pts", leagueW: "W", leagueL: "L", leagueYou: "YOU",
    leagueNote: "Only ONLINE PvP matches score. Practice against bots never changes this table.",
    leagueOnlineHint: "🌐 Only ONLINE PvP matches score in the League.",
    tabBracket: "TOURNAMENTS", tabBracketSub: "Weekly + Sunday Cup",
    bracketHint: "Phase 1 (Mon–Thu): ONLINE league ranks the G8. Phase 2 (Fri–Sat): ONLINE PvP knockout for the Top 8 only.",
    champWeekly: "WEEKLY CHAMPIONSHIP", champCopa: "FLASH CUP",
    weeklyPhase1: "PHASE 1 • LEAGUE (MON–THU)", weeklyPhase2: "PHASE 2 • ONLINE KNOCKOUT (FRI–SAT)",
    weeklyPhaseClosed: "PHASE CLOSED • CUP TODAY",
    weeklyPhase1Hint: "ONLINE points league: +3 PTS per win. The top 8 advance.",
    bracketTieRule: "G8 tie-break: points → wins → fewer losses → trophies → nick.",
    bracketSeedsPending: "⏳ The bracket is still locking the Top 8. Try again in a moment.",
    bracketNotQualified: "🔒 Only this week's locked Top 8 can play the knockout.",
    bracketNeedEight: "🔒 The knockout locks once the League has 8 ranked players this week.",
    weeklyPhase2Qualified: "You are in the G8. PvP knockout against the top 7.",
    weeklyPhase2NoQual: "Only the League Top 8 play this week's knockout.",
    weeklyClosedHint: "The Weekly Championship reopens on Monday. Sunday is Flash Cup day.",
    weeklyPhase1Lock: "🔒 PHASE 1 • LEAGUE", weeklyClosedLock: "🔒 PHASE CLOSED",
    weeklyPhase2Lock: "🔒 WAIT FOR PHASE 2",
    weeklyLocked: "🔒 The knockout opens on Friday.",
    weeklyNotQualified: "You are not in the League G8 yet.",
    copaPlay: "⚡ PLAY CUP", copaWon: "ADVANCED", copaLost: "ELIMINATED", copaChampion: "CHAMPION",
    copaProjected: "PROJECTED", copaAdvanced: "⚡ Advanced in the Flash Cup!",
    copaClosed: "⚡ The Flash Cup runs on Sunday.", copaFinished: "Your Cup run is already over.",
    copaChampionToast: "🏆 FLASH CUP CHAMPION! +{c} 💰 +{t} 🏆",
    copaOpenTitle: "⚡ FLASH CUP • OPEN", copaClosedTitle: "⚡ FLASH CUP • SUNDAY",
    copaChampionTitle: "🏆 FLASH CUP CHAMPION", copaEliminatedTitle: "CUP OVER FOR YOU",
    copaOpenHint: "Open 8-player bracket • 3 MD3 rounds • no G8 required.",
    copaClosedHint: "Fast 8-player bracket, open to every rank. Back on Sunday.",
    copaChampionHint: "You won all three matches and took the weekly prize.",
    copaEliminatedHint: "The Cup returns next Sunday. Your run this week is over.",
    copaReward: "🏆 Champion: +300 💰 and +40 🏆 • runner-up and semifinalists earn match trophies",
    copaWinTitle: "FLASH CUP CHAMPION!", copaWinSub: "You won all three Flash Cup matches!",
    bracketQuarters: "QUARTER-FINALS", bracketSemis: "SEMI-FINALS", bracketFinal: "GRAND FINAL",
    bracketFinalTime: "Saturday • 7:30 PM", bracketSchedule: "📅 SCHEDULE", bracketWatch: "🔴 WATCH LIVE",
    bracketScheduleTitle: "SCHEDULE MATCH", bracketDay: "Day", bracketTime: "Time",
    bracketPropose: "PROPOSE TIME", bracketAccept: "ACCEPT PROPOSAL",
    bracketSet: "📅 {d} • {t}", bracketTbd: "TBD", bracketProposed: "Proposal sent: {d} at {t}",
    bracketAccepted: "Time accepted! Match scheduled.", bracketWaitingAccept: "Waiting for the opponent to accept...",
    bracketCountdown: "⏳ {t}",
    bracketPlayCta: "⚔️ PLAY BRACKET (ONLINE)",
    bracketWonLock: "✅ WIN • WAITING FOR NEXT ROUND",
    bracketLostLock: "❌ ELIMINATED THIS ROUND",
    bracketAwaitRival: "⏳ WAITING FOR OPPONENT",
    leaguePlayBtn: "🏅 PLAY ONLINE LEAGUE (+3 PTS)",
    lobbyLiveTitle: "MATCH LIVE", lobbyLiveCta: "WATCH",
    lobbyProfileHint: "Open profile",
    tabShop: "VISUAL SHOP", tabShopSub: "Character, bomb and effect skins",
    shopCoins: "coins", shopDaily: "🎁 DAILY", shopTest: "+200 COINS", shopZeroP2W: "Cosmetic only: no skin changes damage, health or range.",
    shopChars: "CHARACTERS", shopBombs: "BOMBS", shopBuy: "BUY {n} 💰", shopEquip: "EQUIP",
    shopEquipped: "✓ IN USE", shopOwned: "OWNED", shopInUse: "IN USE", shopNotEnough: "Not enough coins. Play matches to earn more!",
    shopBought: "{name} unlocked!", shopEquippedMsg: "{name} equipped!", shopDailyDone: "Daily reward already claimed today.",
    shopDailyGain: "🎁 +100 daily coins!", shopTestGain: "🧪 +200 test coins!",
    shopTabSkins: "SKINS", shopTabBombs: "BOMBS", shopTabExplosions: "BLASTS", shopTabTrails: "TRAILS", shopTabAvatars: "AVATARS",
    shopAdChest: "📺 CHEST +40 💰", shopChestGain: "📺 +40 coins from the sponsored chest!", shopDefault: "↩ USE DEFAULT",
    previewBuy: "BUY {n} 💰", previewEquip: "EQUIP", previewInUse: "✓ IN USE",
    previewConfirmTitle: "Confirm buying {name} for {n} 💰?",
    previewConfirmBody: "Balance now: {a} 💰 • after purchase: {b} 💰",
    previewConfirmYes: "CONFIRM", previewConfirmNo: "CANCEL", previewOwned: "Already yours — just equip it.",
    endTrainingCap: "🚫 Limit of 5 bot wins per day — play ONLINE for more rewards.",
    endMatchCoins: "💰 +{c}",
    doubleRewardBtn: "DOUBLE +40 COINS", doubleGain: "📺 +40 extra coins!",
    adBadge: "REWARDED AD", adNote: "Local test: the real video only appears in the Android app with AdMob configured.",
    adSimulating: "Simulating Rewarded Ad...", adDailyCap: "Daily ad limit reached (5/day).",
    adTypeCap: "You already used this ad today.", adUnavailable: "Ad unavailable right now. Try again later.",
    tabEvent: "EVENT", tabEventSub: "Rotates every 3 hours • outside the League",
    eventNextLabel: "Next event in", eventGoal: "Win 2 matches in this event",
    eventNextUp: "Up next", eventStartsIn: "in", eventRotated: "🎪 New event: {name}!",
    eventFirstReward: "🎪 Event: 1st win! +10 coins. One more for +35 coins and +25 XP.",
    eventSplashBadge: "EVENT ACTIVE", eventSplashTag: "3H • Outside the League • Reward every 2 wins",
    eventHudChip: "EVENT",
    eventRewardReady: "Reward of +35 coins and +25 XP claimed!",
    eventPlayBtn: "PLAY EVENT", eventNoLeague: "The event grants no League points or trophies.",
    eventRewardGranted: "🎪 Event: +35 coins and +{x} XP for the 2nd win!",
    eventProgressLine: "🎪 Event: win {n}/2 — {m} more for the reward.",
    eventLossLine: "🎪 Event: {n}/2 wins this cycle.",
    spinTitle: "LUCKY SPIN", spinSub: "Spin once a day: +50, +100 or +200 coins", spinBtn: "SPIN", spinUsed: "USED TODAY", spinGain: "🎰 +{n} coins!",
    spectateTitle: "LIVE GRANDSTAND", camTotal: "FULL VIEW", camP1: "FOLLOW P1", camP2: "FOLLOW P2",
    spectateExit: "EXIT", cheerHint: "CHEER", spectateVs: "{a} × {b}",
    voicePanel: "Voice chat", voiceMicOn: "Turn mic on", voiceMicOff: "Turn mic off",
    voiceMuteOpp: "Mute opponent", voiceUnmuteOpp: "Hear opponent", voiceReport: "Report opponent",
    voiceMicUnavailable: "Microphone unavailable on this device.",
    voiceMicDenied: "Microphone permission denied. Voice is off.",
    voiceReportTitle: "REPORT PLAYER",
    voiceReportSub: "Report {name} for inappropriate voice or abusive behavior?",
    voiceReportSend: "SEND REPORT", voiceReportCancel: "CANCEL",
    voiceReportSent: "Report sent for review.",
    statsYou: "YOU", statsPlayed: "MATCHES", statsWins: "WINS", statsLosses: "LOSSES",
    statsWinRate: "WIN RATE", statsLeaguePts: "LEAGUE PTS",
    statsFoot: "Ranked stats • Updated after every match",
    statsNoData: "Stats unavailable for this player.",
    nickPlaceholder: "Type your nick...",
    lobbyNoNick: "Player (No Nick)", nickFallback: "PLAYER",
    nickModalTitle: "Choose your Nick to compete",
    nickModalSub: "Your nick appears in the League and the Knockout. 3 to 15 characters.",
    nickModalSave: "SAVE AND CONTINUE",
    nickErrShort: "The nick needs at least 3 characters.",
    nickErrLong: "The nick can have at most 15 characters.",
    nickErrSpaces: "The nick cannot contain double spaces.",
    nickSaved: "Nick saved!",
    rotateTitle: "Rotate your phone to play",
    rotateSub: "The arena is played in landscape, fullscreen.",
    rotateBtn: "GO FULLSCREEN",
    leagueEmpty: "No players on the table yet. Play ONLINE to make your debut!",
    bracketEmpty: "No ranked players yet. The ONLINE League feeds the knockout.",
    copaNeedPlayers: "The Flash Cup needs 8 real players in the League to open.",
    trainingBot: "TRAINING BOT",
    profileSyncLocal: "📴 Local mode — go online to sync",
    profileSyncOnline: "☁️ Synced with the cloud",
    profileSyncAuth: "☁️ Connecting to Firebase..."
  }
};

/* ========================================================================
   2. ACHIEVEMENTS
   ======================================================================== */
const ACHIEVEMENTS = {
  first_blood: { icon: '🩸', title: 'Primeiro Sangue', desc: 'Elimine seu primeiro oponente', titleEn: 'First Blood', descEn: 'Take down your first opponent', check: s => s.kills >= 1 },
  killer: { icon: '💀', title: 'Assassino', desc: 'Elimine 5 em uma partida', titleEn: 'Assassin', descEn: 'Take down 5 in one match', check: s => s.maxKillsInMatch >= 5 },
  survivor: { icon: '🛡️', title: 'Sobrevivente', desc: 'Sobreviva por 3 minutos', titleEn: 'Survivor', descEn: 'Survive for 3 minutes', check: s => s.maxSurvivalTime >= 180 },
  champion: { icon: '🏆', title: 'Campeão', desc: 'Vença sua primeira partida', titleEn: 'Champion', descEn: 'Win your first match', check: s => s.wins >= 1 },
  collector: { icon: '📦', title: 'Colecionador', desc: 'Vença 5 partidas', titleEn: 'Collector', descEn: 'Win 5 matches', check: s => s.wins >= 5 },
  master: { icon: '👑', title: 'Mestre da Arena', desc: 'Vença 10 partidas', titleEn: 'Arena Master', descEn: 'Win 10 matches', check: s => s.wins >= 10 },
  veteran: { icon: '🎖️', title: 'Veterano', desc: 'Jogue 20 partidas', titleEn: 'Veteran', descEn: 'Play 20 matches', check: s => s.matches >= 20 },
  godlike: { icon: '🌟', title: 'Divino', desc: '10 kills em uma partida', titleEn: 'Godlike', descEn: '10 kills in one match', check: s => s.maxKillsInMatch >= 10 },
  marathon: { icon: '⏱️', title: 'Maratonista', desc: 'Sobreviva 5 minutos', titleEn: 'Marathoner', descEn: 'Survive for 5 minutes', check: s => s.maxSurvivalTime >= 300 },
  warrior: { icon: '⚔️', title: 'Guerreiro', desc: '50 eliminações no total', titleEn: 'Warrior', descEn: '50 eliminations in total', check: s => s.kills >= 50 }
};
// Textos de conquistas disponíveis em PT e EN sem duplicar a lógica.
function achievementText(ach) {
  const en = currentLang === 'en';
  return { title: (en && ach.titleEn) || ach.title, desc: (en && ach.descEn) || ach.desc };
}

/* ========================================================================
   3. SOUND EFFECTS
   ======================================================================== */
/* Pool de áudio .mp3: buffers decodificados e reutilizáveis, nunca corta
   sons simultâneos e falha em silêncio quando o arquivo não existe ainda. */
class AudioPool {
  constructor() { this.ctx = null; this.buffers = {}; this.loading = {}; this.urls = {}; }
  register(name, urls) { this.urls[name] = Array.isArray(urls) ? urls.filter(Boolean) : [urls]; if (this.ctx) this._load(name); }
  init(ctx) {
    if (ctx) this.ctx = ctx;
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
    Object.keys(this.urls).forEach(name => this._load(name));
  }
  _load(name) {
    if (!this.ctx || this.buffers[name] || this.loading[name]) return;
    this.loading[name] = true;
    const list = this.urls[name] || [];
    const tryAt = (i) => {
      if (i >= list.length) { this.loading[name] = false; return; }
      fetch(list[i])
        .then(res => (res && res.ok ? res.arrayBuffer() : Promise.reject(new Error('miss'))))
        .then(data => {
          this.loading[name] = false;
          const done = buf => { if (buf) this.buffers[name] = buf; };
          try {
            const p = this.ctx.decodeAudioData(data, done, () => {});
            if (p && typeof p.then === 'function') p.then(done, () => {});
          } catch (e) {}
        })
        .catch(() => tryAt(i + 1));
    };
    tryAt(0);
  }
  has(name) { return !!this.buffers[name]; }
  play(name, vol = 0.8, rate = 1) {
    if (typeof SFX !== 'undefined' && SFX.muted) return false;
    const ctx = this.ctx;
    const buf = this.buffers[name];
    if (!ctx || !buf) return false;
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    try {
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.playbackRate.value = Math.max(0.5, Math.min(2, rate * (0.97 + Math.random() * 0.06)));
      const gain = ctx.createGain();
      gain.gain.value = Math.max(0, Math.min(1, vol));
      src.connect(gain);
      gain.connect((typeof SFX !== 'undefined' && SFX.master) || ctx.destination);
      src.start(ctx.currentTime);
      src.onended = () => { try { src.disconnect(); gain.disconnect(); } catch (e) {} };
      return true;
    } catch (e) { return false; }
  }
}
const AUDIO_POOL = new AudioPool();
/* SFX gravados em audio/. (assets/audio/ ainda não existe; tentar carregá-lo
   gerava 404 no console a cada boot.) */
const AUDIO_POOL_FALLBACK = {
  bomb_place: 'audio/slam_06.mp3',
  explosion: 'audio/explosion.mp3',
  dash: 'audio/spring_03.mp3',
  powerup: 'audio/bell_01.mp3',
  win: 'audio/bell_02.mp3'
};
['bomb_place', 'explosion', 'dash', 'powerup', 'win'].forEach(name => {
  AUDIO_POOL.register(name, [AUDIO_POOL_FALLBACK[name]]);
});

class SoundFX {
  // Recorded SFX from "100 CC0 SFX" (OpenGameArt, CC0); synth tones are fallback only
  constructor() { this.ctx = null; this.muted = false; this.volume = 0.8; this.master = null; this.samples = {}; this.samplesLoading = false; this.lastExpl = 0; }
  init() {
    if (!this.ctx) {
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) {
          this.ctx = new AC();
          this.master = this.ctx.createGain();
          this.master.gain.value = this.volume;
          this.master.connect(this.ctx.destination);
        }
      } catch (e) {}
    }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
    this.loadSamples();
    AUDIO_POOL.init(this.ctx);
  }
  loadSamples() {
    if (!this.ctx || this.samplesLoading) return;
    this.samplesLoading = true;
    const names = ['explosion', 'hit_01', 'hit_02', 'hit_03', 'glass_02', 'glass_03', 'wooden_01', 'slam_05', 'slam_06', 'spring_03', 'bell_01', 'bell_02', 'noise_02'];
    names.forEach(name => {
      fetch(`./audio/${name}.mp3`)
        .then(res => (res && res.ok ? res.arrayBuffer() : null))
        .then(data => {
          if (!data) return;
          const done = buf => { if (buf) this.samples[name] = buf; };
          try {
            const p = this.ctx.decodeAudioData(data, done, () => {});
            if (p && typeof p.then === 'function') p.then(done, () => {});
          } catch (e) {}
        })
        .catch(() => {});
    });
  }
  toggleMute() { this.muted = !this.muted; return this.muted; }
  setVolume(v) {
    this.volume = Math.max(0, Math.min(1, v));
    if (this.master) this.master.gain.value = this.volume;
  }
  _out() { return this.master || this.ctx.destination; }
  _sample(name, vol, rate = 1) {
    if (this.muted || !this.ctx) return false;
    const buf = this.samples[name];
    if (!buf) return false;
    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.playbackRate.value = rate;
    const g = this.ctx.createGain();
    g.gain.value = vol;
    src.connect(g); g.connect(this._out());
    src.start(t);
    return true;
  }
  _pick(list) { return list[(Math.random() * list.length) | 0]; }
  _tone(type, freq, dur, vol, ramp) {
    if (this.muted || !this.ctx) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (ramp) o.frequency.exponentialRampToValueAtTime(ramp, t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g); g.connect(this._out());
    o.start(t); o.stop(t + dur + 0.02);
  }
  playPlaceBomb() {
    if (AUDIO_POOL.play('bomb_place', 0.55)) return;
    if (this._sample('wooden_01', 0.6, 0.95 + Math.random() * 0.12)) return;
    this._tone('sine', 220, 0.1, 0.16, 90);
  }
  playExplosion(df = 1.0) {
    if (this.muted || !this.ctx || df <= 0.05) return;
    if (df > 0.35) MUSIC.duck();
    const vol = Math.min(0.95, 0.9 * df);
    const nowMs = performance.now();
    if (AUDIO_POOL.play('explosion', vol, 1)) { this.lastExpl = nowMs; return; }
    if (nowMs - this.lastExpl > 45 && this._sample('explosion', vol, 0.88 + Math.random() * 0.14)) {
      this.lastExpl = nowMs;
      this._sample('slam_06', vol * 0.6, 0.7 + Math.random() * 0.1);
      return;
    }
    if (this.samples.explosion) return;
    const t = this.ctx.currentTime;
    const dur = 0.42;
    const sz = Math.floor(this.ctx.sampleRate * dur);
    const buf = this.ctx.createBuffer(1, sz, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < sz; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (sz * 0.35));
    const n = this.ctx.createBufferSource(); n.buffer = buf;
    const f = this.ctx.createBiquadFilter(); f.type = 'lowpass';
    f.frequency.setValueAtTime(520, t); f.frequency.exponentialRampToValueAtTime(95, t + dur);
    const g = this.ctx.createGain(); g.gain.setValueAtTime(vol * 0.35, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    n.connect(f); f.connect(g); g.connect(this._out()); n.start(t);
    this._tone('triangle', 110, 0.35, vol * 0.4, 32);
  }
  playShockwave() {
    MUSIC.duck(420, 0.45);
    if (this._sample('slam_05', 0.78, 0.85 + Math.random() * 0.12)) return;
    this._tone('sawtooth', 320, 0.34, 0.18, 55);
  }
  playCryo() {
    if (this._sample(this._pick(['glass_02', 'glass_03']), 0.55, 0.95 + Math.random() * 0.12)) return;
    [1200, 1650, 2100].forEach((fr) => this._tone('sine', fr, 0.26, 0.07, fr * 0.65));
  }
  playDash() {
    if (AUDIO_POOL.play('dash', 0.3)) return;
    if (this._sample('spring_03', 0.3, 1.3 + Math.random() * 0.15)) return;
    this._tone('sine', 280, 0.16, 0.1, 640);
  }
  playPortal() {
    if (this._sample('noise_02', 0.45, 1.15 + Math.random() * 0.1)) return;
    this._tone('triangle', 380, 0.24, 0.12, 920);
  }
  playPickup() {
    if (AUDIO_POOL.play('powerup', 0.5)) return;
    if (this._sample('bell_02', 0.5, 0.98 + Math.random() * 0.06)) return;
    [587.33, 880].forEach((f) => this._tone('sine', f, 0.17, 0.1));
  }
  playHit() {
    if (this._sample(this._pick(['hit_01', 'hit_02', 'hit_03']), 0.65, 0.92 + Math.random() * 0.18)) return;
    this._tone('sawtooth', 160, 0.24, 0.18, 55);
  }
  playWarning() {
    if (this._sample('bell_01', 0.5, 0.92)) return;
    this.playBeep();
  }
  playBeep() {
    if (this.muted || !this.ctx) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'square';
    o.frequency.setValueAtTime(440, t);
    o.frequency.setValueAtTime(554.37, t + 0.12);
    g.gain.setValueAtTime(0.05, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.26);
    o.connect(g); g.connect(this._out());
    o.start(t); o.stop(t + 0.28);
  }
  playVictory() {
    if (this.muted || !this.ctx) return;
    if (AUDIO_POOL.play('win', 0.7)) return;
    [523.25, 659.25, 783.99, 1046.5].forEach((f) => this._tone('triangle', f, 0.47, 0.14));
  }
  playUnlock() {
    if (this.muted || !this.ctx) return;
    [659.25, 880, 1174.66].forEach((f, i) => setTimeout(() => this._tone('triangle', f, 0.26, 0.12), i * 70));
  }
  playEventStart() {
    if (this.muted || !this.ctx) return;
    [392, 523.25, 659.25].forEach((f, i) => setTimeout(() => this._tone('sawtooth', f, 0.22, 0.07), i * 90));
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

class MusicPlayer {
  // Tracks: "Space City" (menu) and "Virtual Rush" (battle), both CC0 from OpenGameArt
  constructor() {
    this.src = { menu: './audio/music_menu.mp3', battle: './audio/music_battle.mp3' };
    this.els = {};
    this.current = null;
    this.volume = 0.45;
    this.muted = false;
    this.unlocked = false;
    this.bus = 0.55;
    this.sceneGain = { menu: 1, battle: 0.8 };
    this.duckUntil = 0;
    this._duckTimer = null;
  }
  _el(name) {
    if (!this.els[name]) {
      const a = new Audio(this.src[name]);
      a.loop = true;
      a.preload = 'auto';
      a.volume = 0;
      this.els[name] = a;
    }
    return this.els[name];
  }
  _level() {
    if (this.muted) return 0;
    return this.volume * this.bus * (this.sceneGain[this.current] || 1);
  }
  _ducked() { return performance.now() < this.duckUntil; }
  unlock() {
    if (this.unlocked) return;
    this.unlocked = true;
    this.play(this.current || 'menu', true);
  }
  setVolume(v) {
    this.volume = Math.max(0, Math.min(1, v));
    const el = this.current ? this.els[this.current] : null;
    if (el && !el._fadeTimer) el.volume = this._ducked() ? this._level() * 0.35 : this._level();
  }
  setMuted(m) {
    this.muted = !!m;
    clearTimeout(this._duckTimer); this._duckTimer = null; this.duckUntil = 0;
    const el = this.current ? this.els[this.current] : null;
    if (el) { clearInterval(el._fadeTimer); el._fadeTimer = null; el.volume = this._level(); }
  }
  duck(ms = 520, factor = 0.35) {
    if (!this.unlocked || this.muted || this.current !== 'battle') return;
    const el = this.els[this.current];
    if (!el || el.paused) return;
    clearInterval(el._fadeTimer); el._fadeTimer = null;
    this.duckUntil = Math.max(this.duckUntil, performance.now() + ms);
    el.volume = this._level() * factor;
    clearTimeout(this._duckTimer);
    this._duckTimer = setTimeout(() => {
      this.duckUntil = 0; this._duckTimer = null;
      if (!this.muted) this._fade(el, this._level(), 320);
    }, ms);
  }
  play(name, force = false) {
    if (!this.src[name] || (!force && this.current === name)) return;
    const prev = this.current ? this.els[this.current] : null;
    if (prev && prev !== this.els[name]) this._fade(prev, 0, 420, () => { try { prev.pause(); } catch (e) {} });
    this.current = name;
    if (!this.unlocked) return;
    const el = this._el(name);
    if (!el.paused && !force) return;
    el.volume = 0;
    const started = el.play();
    if (started && started.catch) started.catch(() => {});
    this._fade(el, this._level(), 900);
  }
  _fade(el, target, ms, done) {
    clearInterval(el._fadeTimer);
    const from = el.volume;
    const t0 = performance.now();
    el._fadeTimer = setInterval(() => {
      const k = Math.min(1, (performance.now() - t0) / ms);
      el.volume = from + (target - from) * k;
      if (k >= 1) { clearInterval(el._fadeTimer); el._fadeTimer = null; if (done) done(); }
    }, 40);
  }
}
const MUSIC = new MusicPlayer();

/* ========================================================================
   4. GAME CONSTANTS
   ======================================================================== */
// A arena padrão é 35×35; o Duelo 1v1 usa uma arena compacta 15×15.
// Essas dimensões viram variáveis para o mesmo motor atender os dois formatos.
let GRID_SIZE = 35;
let GRID_MID = (GRID_SIZE - 1) / 2;
let MAX_RING = Math.floor((GRID_SIZE - 5) / 2);
const TILE_SIZE = 48;
const PLAYER_RADIUS = 14.5;
let WORLD_PX = GRID_SIZE * TILE_SIZE;
const MAX_SHAKE = 6;
const IS_TOUCH = ('ontouchstart' in window) || (navigator.maxTouchPoints || 0) > 0;
// Tela cheia só entra quando há um gesto do jogador (exigência dos navegadores).
function requestGameFullscreen() {
  if (!IS_TOUCH) return;
  if (document.fullscreenElement || document.webkitFullscreenElement) return;
  const el = document.documentElement;
  const req = el.requestFullscreen || el.webkitRequestFullscreen;
  if (!req) return;
  try {
    const p = req.call(el, { navigationUI: 'hide' });
    if (p && typeof p.catch === 'function') p.then(lockLandscape).catch(() => {});
  } catch (err) { /* iOS Safari não permite tela cheia fora de vídeo */ }
}
// Só faz sentido em celular/tablet de toque e exige tela cheia.
const IS_PHONE = IS_TOUCH;
function lockLandscape() {
  if (!IS_PHONE) return;
  try {
    const so = screen.orientation;
    if (so && typeof so.lock === 'function' && (document.fullscreenElement || document.webkitFullscreenElement)) {
      Promise.resolve(so.lock('landscape')).catch(() => {});
    }
  } catch (err) { /* iOS não permite travar orientação */ }
}
function isPortraitScreen() {
  return !!(window.matchMedia && matchMedia('(orientation: portrait)').matches);
}
// Em retrato no celular a arena não cabe: bloqueia com aviso e pausa o jogo local.
function updateRotateGate() {
  const gate = document.getElementById('rotateGate');
  const inGame = !!(match.running && !match.ended && !match.demoMode) || chroma.active;
  const blocked = IS_PHONE && isPortraitScreen() && inGame;
  if (gate) gate.classList.toggle('hidden', !blocked);
  document.body.classList.toggle('rotate-locked', blocked);
  if (blocked) {
    if (match.running && !match.demoMode && !match.ended && !match.netRole && !match.paused) {
      match.paused = true;
      match.pausedByRotate = true;
    }
    if (chroma.active && !chroma.paused && chroma.phase !== 'gameover') {
      chroma.paused = true;
      chroma.pausedByRotate = true;
    }
    resetJoystick();
  } else {
    if (match.pausedByRotate) { match.paused = false; match.pausedByRotate = false; }
    if (chroma.pausedByRotate) { chroma.paused = false; chroma.pausedByRotate = false; }
    lockLandscape();
  }
}
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
  C4: { icon: '📡', color: '#f43f5e', label: '+2 C4' },
  GOLD: { icon: '🪙', color: '#facc15', label: '+2 MOEDAS' }
};

const TACTICAL_META = {
  SHOCK: { icon: '🌀', label: 'SHOCK', color: '#fbbf24' },
  CRYO: { icon: '❄️', label: 'CRYO', color: '#67e8f9' },
  C4: { icon: '📡', label: 'C4', color: '#f43f5e' }
};

const TACTICAL_ORDER = ['SHOCK', 'CRYO', 'C4'];

/* 🆕 MODOS DE TIME */
const MODE_CONFIG = {
  SOLO:      { id: 'SOLO',      humans: 1, bots: 15, stormInterval: 32, stormDelay: 50, startRing: 0, airdropTimer: 18, teamMode: false },
  DUEL:      { id: 'DUEL',      humans: 1, bots: 1,  stormInterval: 999, stormDelay: 999, startRing: 0, airdropTimer: 999, teamMode: false, duel: true, grid: 15 },
  TEAM1v1:   { id: 'TEAM1v1',   humans: 1, bots: 1,  stormInterval: 17, stormDelay: 25, startRing: 3, airdropTimer: 9,  teamMode: true, teamSize: 1 },
  TEAM2v2:   { id: 'TEAM2v2',   humans: 1, bots: 3,  stormInterval: 21, stormDelay: 33, startRing: 2, airdropTimer: 12, teamMode: true, teamSize: 2 },
  TEAM3v3:   { id: 'TEAM3v3',   humans: 1, bots: 5,  stormInterval: 25, stormDelay: 38, startRing: 1, airdropTimer: 15, teamMode: true, teamSize: 3 },
  LOCAL:     { id: 'LOCAL',     humans: 2, bots: 0,  stormInterval: 21, stormDelay: 35, startRing: 3, airdropTimer: 9,  teamMode: false },
  ONLINE:    { id: 'ONLINE',    humans: 2, bots: 0,  stormInterval: 21, stormDelay: 35, startRing: 3, airdropTimer: 9,  teamMode: false },
  TUTORIAL:  { id: 'TUTORIAL',  humans: 1, bots: 2,  stormInterval: 999, stormDelay: 999, startRing: 0, airdropTimer: 999, teamMode: false }
};

const BOT_PROFILES = [
  { name: 'Nova', color: '#f472b6', visor: '#fdf2f8', style: 'hunter', vision: 900, aggression: 0.92, reaction: [0.18, 0.38], farm: 0.2 },
  { name: 'Rook', color: '#60a5fa', visor: '#e0f2fe', style: 'guard', vision: 660, aggression: 0.7, reaction: [0.3, 0.55], farm: 0.35 },
  { name: 'Vex', color: '#a78bfa', visor: '#ede9fe', style: 'trapper', vision: 760, aggression: 0.95, reaction: [0.34, 0.62], farm: 0.25 },
  { name: 'Kilo', color: '#fb923c', visor: '#ffedd5', style: 'farmer', vision: 560, aggression: 0.6, reaction: [0.36, 0.62], farm: 0.65 },
  { name: 'Zane', color: '#22d3ee', visor: '#cffafe', style: 'hunter', vision: 860, aggression: 0.85, reaction: [0.22, 0.44], farm: 0.3 },
  { name: 'Mira', color: '#f87171', visor: '#fee2e2', style: 'trapper', vision: 720, aggression: 0.9, reaction: [0.36, 0.66], farm: 0.3 },
  { name: 'Ash', color: '#94a3b8', visor: '#f1f5f9', style: 'guard', vision: 620, aggression: 0.65, reaction: [0.34, 0.6], farm: 0.45 },
  { name: 'Juno', color: '#34d399', visor: '#d1fae5', style: 'farmer', vision: 600, aggression: 0.62, reaction: [0.32, 0.58], farm: 0.6 },
  { name: 'Pyro', color: '#fbbf24', visor: '#fef3c7', style: 'hunter', vision: 880, aggression: 0.95, reaction: [0.2, 0.42], farm: 0.2 },
  { name: 'Echo', color: '#c084fc', visor: '#f3e8ff', style: 'trapper', vision: 700, aggression: 0.85, reaction: [0.38, 0.68], farm: 0.35 },
  { name: 'Bolt', color: '#38bdf8', visor: '#e0f2fe', style: 'guard', vision: 640, aggression: 0.72, reaction: [0.3, 0.54], farm: 0.4 },
  { name: 'Sly', color: '#fda4af', visor: '#fff1f2', style: 'farmer', vision: 580, aggression: 0.6, reaction: [0.34, 0.6], farm: 0.6 }
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

const PREFS_KEY = 'blast-royale-prefs-v7';
const LEGACY_PREFS_KEY = 'blast-royale-prefs-v6';
const prefs = {
  name: '', name2: 'Viper-02', lang: 'pt', tactical: 'SHOCK', mode: 'SOLO', map: 'NEON', duelBest: 3,
  wins: 0, kills: 0, matches: 0, maxKillsInMatch: 0, maxSurvivalTime: 0,
  achievements: {},
  xp: 0, skin: 'VIPER', ownedSkins: { VIPER: true },
  season: { claimed: {} },
  missions: { day: '', list: [] },
  eventDay: '', eventId: '',
  ranking: []
};

function loadPrefs() {
  try {
    let raw = localStorage.getItem(PREFS_KEY);
    if (!raw) raw = localStorage.getItem(LEGACY_PREFS_KEY);
    if (raw) Object.assign(prefs, JSON.parse(raw) || {});
    if (!prefs.achievements) prefs.achievements = {};
    if (!prefs.ownedSkins) prefs.ownedSkins = { VIPER: true };
    if (!prefs.season || typeof prefs.season !== 'object') prefs.season = {};
    if (!prefs.season.claimed || typeof prefs.season.claimed !== 'object') prefs.season.claimed = {};
    if (!Array.isArray(prefs.ranking)) prefs.ranking = [];
    if (!prefs.missions || !Array.isArray(prefs.missions.list)) prefs.missions = { day: '', list: [] };
  } catch (e) {}
  return prefs;
}

function savePrefs(patch) {
  Object.assign(prefs, patch || {});
  try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); } catch (e) {}
}

/* ========================================================================
   5.0 GAME STATE — fonte única para perfil, moedas, skins, liga e chaveamento
   Persistência temporária em localStorage. Toda a UI fala apenas com estes
   métodos, para que Firestore/Realtime Database possam ser plugados depois
   sem refatorar as telas.
   ======================================================================== */
/* Raridades da loja expandida. Preço define a faixa; o tier alimenta os
   efeitos de canvas (aura, anéis, ondas) e o brilho da Liga. */
const RARITY_META = {
  starter: { label: 'Inicial', labelEn: 'Starter', color: '#94a3b8', tier: 0 },
  common: { label: 'Comum', labelEn: 'Common', color: '#94a3b8', tier: 1 },
  rare: { label: 'Raro', labelEn: 'Rare', color: '#38bdf8', tier: 2 },
  epic: { label: 'Épico', labelEn: 'Epic', color: '#c084fc', tier: 3 },
  legendary: { label: 'Lendário', labelEn: 'Legendary', color: '#fbbf24', tier: 4 },
  mythic: { label: 'Mítico', labelEn: 'Mythic', color: '#f43f5e', tier: 5 }
};
const RARITY_PRICE = { common: 500, rare: 1500, epic: 3500, legendary: 8000, mythic: 15000 };
function rarityMeta(rarity) { return RARITY_META[rarity] || RARITY_META.common; }
function rarityTier(rarity) { return rarityMeta(rarity).tier; }

const CHARACTER_SKINS = [
  { id: 'viper', name: 'Viper', body: '#34d399', visor: '#ecfdf5', accent: '#10b981', style: 'viper', rarity: 'starter', price: 0, emoji: '🐍', desc: { pt: 'Verde tático. O clássico da arena.', en: 'Tactical green. The arena classic.' } },
  { id: 'pyro', name: 'Pyro', body: '#f97316', visor: '#fed7aa', accent: '#dc2626', style: 'pyro', rarity: 'common', price: 500, emoji: '🔥', desc: { pt: 'Vermelho vulcânico com brasas.', en: 'Volcanic red with embers.' } },
  { id: 'cyber', name: 'Cyber', body: '#22d3ee', visor: '#cffafe', accent: '#0ea5e9', style: 'cyber', rarity: 'common', price: 500, emoji: '⚡', desc: { pt: 'Ciano neon com circuitos vivos.', en: 'Neon cyan with live circuits.' } },
  { id: 'guardian', name: 'Guardian', body: '#fbbf24', visor: '#fffbeb', accent: '#f59e0b', style: 'guardian', rarity: 'rare', price: 1500, emoji: '👑', desc: { pt: 'Dourado e branco com auréola.', en: 'Gold and white with a halo.' } },
  { id: 'arctic', name: 'Tempestade Ártica', body: '#7dd3fc', visor: '#f0f9ff', accent: '#0284c7', style: 'arctic', rarity: 'rare', price: 1500, emoji: '❄️', desc: { pt: 'Gelo eterno com névoa congelante.', en: 'Eternal ice with freezing mist.' } },
  { id: 'fusion', name: 'Reator de Fusão', body: '#a3e635', visor: '#ecfccb', accent: '#65a30d', style: 'fusion', rarity: 'epic', price: 3500, emoji: '☢️', desc: { pt: 'Núcleo radioativo pulsando energia.', en: 'Radioactive core pulsing with energy.' } },
  { id: 'dragonlord', name: 'Dragão Supremo', body: '#f59e0b', visor: '#fef3c7', accent: '#b45309', style: 'dragon', rarity: 'legendary', price: 8000, emoji: '🐉', desc: { pt: 'Escamas de ouro e aura de dragão.', en: 'Golden scales and a dragon aura.' } },
  { id: 'phoenix', name: 'Fênix Solar', body: '#fb7185', visor: '#fff1f2', accent: '#e11d48', style: 'phoenix', rarity: 'legendary', price: 8000, emoji: '🔥', desc: { pt: 'Renasce das cinzas em chamas solares.', en: 'Reborn from ashes in solar flames.' } },
  { id: 'cosmic', name: 'Imperador Cósmico', body: '#8b5cf6', visor: '#f5f3ff', accent: '#4c1d95', style: 'cosmic', rarity: 'mythic', price: 15000, emoji: '🌌', desc: { pt: 'Governa a arena com o poder das estrelas.', en: 'Rules the arena with the power of stars.' } }
];
const BOMB_SKINS = [
  { id: 'classic', name: 'Clássica', color: '#f97316', flame: '#fb923c', core: '#fef3c7', rarity: 'starter', price: 0, emoji: '💣', desc: { pt: 'Esfera metálica com pavio.', en: 'Metallic sphere with a fuse.' } },
  { id: 'dynamite', name: 'Dinamite', color: '#ef4444', flame: '#f87171', core: '#fde68a', rarity: 'common', price: 500, emoji: '🧨', desc: { pt: 'Bastões vermelhos amarrados.', en: 'Bundled red sticks.' } },
  { id: 'plasma', name: 'Plasma', color: '#22d3ee', flame: '#22d3ee', core: '#e0f2fe', rarity: 'common', price: 500, emoji: '🌀', desc: { pt: 'Núcleo ciano brilhante.', en: 'Glowing cyan core.' } },
  { id: 'crystal', name: 'Cristal', color: '#a78bfa', flame: '#c084fc', core: '#f5f3ff', rarity: 'rare', price: 1500, emoji: '💎', desc: { pt: 'Cristal roxo e azul.', en: 'Purple and blue crystal.' } },
  { id: 'blackhole', name: 'Buraco Negro', color: '#7c3aed', flame: '#a78bfa', core: '#ede9fe', rarity: 'rare', price: 1500, emoji: '🕳️', desc: { pt: 'Distorce a luz ao redor da explosão.', en: 'Bends light around the blast.' } },
  { id: 'supernova', name: 'Supernova Cósmica', color: '#f472b6', flame: '#fb7185', core: '#fdf2f8', rarity: 'epic', price: 3500, emoji: '💥', desc: { pt: 'Colapso estelar em rosa e violeta.', en: 'Stellar collapse in pink and violet.' } },
  { id: 'golddragon', name: 'Dragão de Ouro', color: '#fbbf24', flame: '#f59e0b', core: '#fffbeb', rarity: 'legendary', price: 8000, emoji: '🐲', desc: { pt: 'Fogo dourado com anéis girando.', en: 'Golden fire with spinning rings.' } },
  { id: 'trophy', name: 'Troféu Campeão', color: '#facc15', flame: '#eab308', core: '#fefce8', rarity: 'legendary', price: 8000, emoji: '🏆', desc: { pt: 'Explode em confete de campeão.', en: 'Explodes in champion confetti.' } },
  { id: 'deathstar', name: 'Estrela da Morte', color: '#94a3b8', flame: '#a3e635', core: '#ecfccb', rarity: 'mythic', price: 15000, emoji: '🌑', desc: { pt: 'Estação de batalha com laser verde.', en: 'Battle station with a green laser.' } }
];
const EXPLOSION_SKINS = [
  { id: 'classic', name: 'Padrão', color: '#f97316', flame: '#fdba74', core: '#fef3c7', rarity: 'starter', price: 0, emoji: '💥', desc: { pt: 'Explosão laranja da arena.', en: 'Orange arena blast.' } },
  { id: 'spark', name: 'Faísca', color: '#fbbf24', flame: '#fde68a', core: '#fffbeb', rarity: 'common', price: 500, emoji: '✨', desc: { pt: 'Faíscas douradas rápidas.', en: 'Fast golden sparks.' } },
  { id: 'boom', name: 'Onda de Choque', color: '#38bdf8', flame: '#bae6fd', core: '#e0f2fe', rarity: 'common', price: 500, emoji: '🌊', desc: { pt: 'Anel azul de pressão.', en: 'Blue pressure ring.' } },
  { id: 'bluefire', name: 'Fogo Azul', color: '#3b82f6', flame: '#60a5fa', core: '#dbeafe', rarity: 'rare', price: 1500, emoji: '🔵', desc: { pt: 'Chamas azuis congelantes.', en: 'Freezing blue flames.' } },
  { id: 'toxic', name: 'Explosão Tóxica', color: '#84cc16', flame: '#bef264', core: '#ecfccb', rarity: 'rare', price: 1500, emoji: '☣️', desc: { pt: 'Ácido verde corrosivo.', en: 'Corrosive green acid.' } },
  { id: 'solar', name: 'Inferno Solar', color: '#f97316', flame: '#fb923c', core: '#fff7ed', rarity: 'epic', price: 3500, emoji: '☀️', desc: { pt: 'Explosão de plasma solar.', en: 'Solar plasma blast.' } },
  { id: 'pulse', name: 'Pulso Elétrico', color: '#22d3ee', flame: '#a5f3fc', core: '#ecfeff', rarity: 'legendary', price: 8000, emoji: '⚡', desc: { pt: 'Arcos elétricos girando.', en: 'Spinning electric arcs.' } },
  { id: 'supernova', name: 'Supernova', color: '#e879f9', flame: '#f0abfc', core: '#fdf4ff', rarity: 'legendary', price: 8000, emoji: '🌟', desc: { pt: 'Estrela em colapso violeta.', en: 'Violet collapsing star.' } },
  { id: 'apocalypse', name: 'Apocalipse Dourado', color: '#facc15', flame: '#fde047', core: '#fffbeb', rarity: 'mythic', price: 15000, emoji: '🌋', desc: { pt: 'Juízo final em ouro e fogo.', en: 'Golden fire doomsday.' } }
];
const TRAIL_SKINS = [
  { id: 'none', name: 'Nenhum', color: '#94a3b8', glow: '#cbd5e1', rarity: 'starter', price: 0, emoji: '🚫', desc: { pt: 'Sem rastro no chão.', en: 'No ground trail.' } },
  { id: 'fire', name: 'Pegadas de Fogo', color: '#fb923c', glow: '#fdba74', rarity: 'common', price: 500, emoji: '👣', desc: { pt: 'Deixa brasas por onde passa.', en: 'Leaves embers behind.' } },
  { id: 'electric', name: 'Rastro Elétrico', color: '#22d3ee', glow: '#a5f3fc', rarity: 'common', price: 500, emoji: '⚡', desc: { pt: 'Faíscas ciano no chão.', en: 'Cyan sparks on the ground.' } },
  { id: 'ice', name: 'Rastro de Gelo', color: '#7dd3fc', glow: '#e0f2fe', rarity: 'rare', price: 1500, emoji: '❄️', desc: { pt: 'Cristais de gelo derretendo.', en: 'Melting ice crystals.' } },
  { id: 'leaf', name: 'Folhas de Primavera', color: '#4ade80', glow: '#bbf7d0', rarity: 'rare', price: 1500, emoji: '🍃', desc: { pt: 'Pétalas e folhas ao vento.', en: 'Petals and leaves in the wind.' } },
  { id: 'comet', name: 'Cometa', color: '#fbbf24', glow: '#fef3c7', rarity: 'epic', price: 3500, emoji: '☄️', desc: { pt: 'Cauda de cometa dourada.', en: 'Golden comet tail.' } },
  { id: 'sonic', name: 'Rastro Sônico', color: '#38bdf8', glow: '#bae6fd', rarity: 'legendary', price: 8000, emoji: '💨', desc: { pt: 'Ondas de velocidade azuis.', en: 'Blue speed waves.' } },
  { id: 'phoenix', name: 'Asas de Fênix', color: '#fb7185', glow: '#fecdd3', rarity: 'legendary', price: 8000, emoji: '🪶', desc: { pt: 'Penas de fogo sagrado.', en: 'Sacred fire feathers.' } },
  { id: 'galaxy', name: 'Rastro Galáctico', color: '#a78bfa', glow: '#ddd6fe', rarity: 'mythic', price: 15000, emoji: '🌌', desc: { pt: 'Poeira estelar girando em órbita.', en: 'Orbiting stardust.' } }
];
const AVATAR_SKINS = [
  { id: 'default', name: 'Viper', emoji: '🐍', rarity: 'starter', price: 0, desc: { pt: 'Avatar padrão da arena.', en: 'Default arena avatar.' } },
  { id: 'frog', name: 'Sapo', emoji: '🐸', rarity: 'common', price: 500, desc: { pt: 'Salta longe e ri mais alto.', en: 'Jumps far and laughs louder.' } },
  { id: 'robot', name: 'Robô', emoji: '🤖', rarity: 'common', price: 500, desc: { pt: 'Calcula cada explosão.', en: 'Calculates every blast.' } },
  { id: 'wolf', name: 'Lobo', emoji: '🐺', rarity: 'rare', price: 1500, desc: { pt: 'Caça em matilha.', en: 'Hunts with the pack.' } },
  { id: 'fox', name: 'Raposa', emoji: '🦊', rarity: 'rare', price: 1500, desc: { pt: 'Esperta e impossível de pegar.', en: 'Sly and impossible to catch.' } },
  { id: 'unicorn', name: 'Unicórnio', emoji: '🦄', rarity: 'epic', price: 3500, desc: { pt: 'Magia pura na arena.', en: 'Pure magic in the arena.' } },
  { id: 'dragon', name: 'Dragão Ancestral', emoji: '🐉', rarity: 'legendary', price: 8000, desc: { pt: 'Sábio e devastador.', en: 'Wise and devastating.' } },
  { id: 'radiant', name: 'Fênix Radiante', emoji: '🦅', rarity: 'legendary', price: 8000, desc: { pt: 'Voa acima de todas as bombas.', en: 'Soars above every bomb.' } },
  { id: 'crown', name: 'Coroa Mítica Animada', emoji: '👑', rarity: 'mythic', price: 15000, desc: { pt: 'Brilho real animado na Liga.', en: 'Animated royal glow in the League.' } }
];
const COSMETIC_CATALOGS = { skins: CHARACTER_SKINS, bombs: BOMB_SKINS, explosions: EXPLOSION_SKINS, trails: TRAIL_SKINS, avatars: AVATAR_SKINS };
const COSMETIC_KINDS = ['skins', 'bombs', 'explosions', 'trails', 'avatars'];
function cosmeticCatalog(kind) { return COSMETIC_CATALOGS[kind] || CHARACTER_SKINS; }
function getCosmetic(kind, id) {
  const list = cosmeticCatalog(kind);
  return list.find(item => item.id === id) || list[0];
}
function cosmeticRarity(kind, id) { return getCosmetic(kind, id).rarity; }
function getCharacterSkin(id) { return CHARACTER_SKINS.find(s => s.id === id) || CHARACTER_SKINS[0]; }
function getBombSkin(id) { return BOMB_SKINS.find(s => s.id === id) || BOMB_SKINS[0]; }
function resolvePlayerLook() {
  const equipped = GameState.state.skins.equipped;
  if (equipped && equipped !== 'viper') {
    const s = getCharacterSkin(equipped);
    return { body: s.body, visor: s.visor, accent: s.accent, skinId: s.id };
  }
  if (prefs.skin && prefs.skin !== 'VIPER') {
    const s = getSkin(prefs.skin);
    return { body: s.body, visor: s.visor, accent: s.accent, skinId: equipped || 'viper' };
  }
  const s = getCharacterSkin('viper');
  return { body: s.body, visor: s.visor, accent: s.accent, skinId: s.id };
}

const GAMESTATE_KEY = 'blast-royale-gamestate-v1';
const GameState = (() => {
  const TROPHY_TIERS = [
    { id: 'bronze', min: 0, max: 199, win: 30, loss: 10, color: '#cd7f32', label: { pt: 'Bronze', en: 'Bronze' } },
    { id: 'silver', min: 200, max: 499, win: 25, loss: 15, color: '#cbd5e1', label: { pt: 'Prata', en: 'Silver' } },
    { id: 'gold', min: 500, max: 899, win: 22, loss: 18, color: '#fbbf24', label: { pt: 'Ouro', en: 'Gold' } },
    { id: 'diamond', min: 900, max: 1399, win: 20, loss: 20, color: '#67e8f9', label: { pt: 'Diamante', en: 'Diamond' } },
    { id: 'master', min: 1400, max: Infinity, win: 18, loss: 22, color: '#c084fc', label: { pt: 'Mestre', en: 'Master' } }
  ];
  // A tabela oficial começa vazia: só jogadores reais gravados no
  // Firestore (coleção users) ou resultados ONLINE entram nela.
  // Contas antigas carregavam uma liga fictícia salva no localStorage;
  // sanitize() remove esses registros legados (ids n1..n10).
  const state = {
    version: 1,
    profile: {
      nick: '', avatar: '🐍',
      competitive: { leaguePoints: 0, rankedWins: 0, rankedLosses: 0, trophies: 0 }
    },
    coins: 300,
    skins: { owned: ['viper'], equipped: 'viper' },
    bombs: { owned: ['classic'], equipped: 'classic' },
    cosmetics: {
      explosions: { owned: ['classic'], equipped: 'classic' },
      trails: { owned: ['none'], equipped: 'none' },
      avatars: { owned: ['default'], equipped: 'default' }
    },
    economy: {
      botDay: '', botWins: 0,
      adDay: '', ads: 0,
      chestDay: '', chest: 0, doubleDay: '', double: 0, spinDay: '', spin: 0,
      eventSlot: null, eventWins: 0, eventRewarded: false, eventFirst: false,
      goldSlot: null, goldCoins: 0
    },
    league: [],
    bracket: { schedules: {}, live: {}, results: {}, week: '' },
    weeklySeeds: { week: '', seeds: [] },
    copa: { week: '', field: [], round: 0, status: 'active', rewardClaimed: false },
    meta: { lastDaily: '' }
  };
  const listeners = new Set();
  let ready = false;

  function today() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  function emit() {
    listeners.forEach(fn => { try { fn(state); } catch (e) {} });
  }
  function save(withEmit = true) {
    try { localStorage.setItem(GAMESTATE_KEY, JSON.stringify(state)); } catch (e) {}
    if (withEmit) emit();
  }
  function normalizeLeagueRow(b) {
    const name = String((b && (b.name || b.nick)) || '').trim().slice(0, 15);
    if (!name) return null;
    const n = (v) => Math.max(0, Math.floor(Number(v) || 0));
    return {
      id: String((b && b.id) || name),
      name,
      avatar: (b && b.avatar) || '🐍',
      points: n(b && b.points),
      wins: n(b && b.wins),
      losses: n(b && b.losses),
      trophies: Number.isFinite(Number(b && b.trophies))
        ? n(b.trophies)
        : Math.max(0, n(b && b.wins) * 30 - n(b && b.losses) * 10),
      cosmeticRank: typeof (b && b.cosmeticRank) === 'string' ? b.cosmeticRank : ''
    };
  }
  function sanitize() {
    if (!state.profile || typeof state.profile !== 'object') {
      state.profile = { nick: '', avatar: '🐍', competitive: { leaguePoints: 0, rankedWins: 0, rankedLosses: 0, trophies: 0 } };
    }
    // Nome padrão antigo ("Viper-01") e espaços sobrando não sobrevivem:
    // o jogador precisa escolher o próprio nick.
    state.profile.nick = String(state.profile.nick == null ? '' : state.profile.nick).trim().slice(0, 15);
    if (state.profile.nick.toLowerCase() === 'viper-01') state.profile.nick = '';
    if (!state.profile.avatar) state.profile.avatar = '🐍';
    if (!state.profile.competitive || typeof state.profile.competitive !== 'object') {
      // V/D e pontos antigos misturavam treinos contra bots: só os troféus
      // (que já eram competitivos) sobrevivem à migração.
      state.profile.competitive = {
        leaguePoints: 0,
        rankedWins: 0,
        rankedLosses: 0,
        trophies: Math.max(0, Number(state.profile.trophies) || 0)
      };
    }
    const comp = state.profile.competitive;
    ['leaguePoints', 'rankedWins', 'rankedLosses', 'trophies'].forEach(k => {
      const n = Number(comp[k]);
      comp[k] = Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
    });
    // Estatísticas antigas do perfil eram misturadas com partidas contra bots.
    delete state.profile.points;
    delete state.profile.wins;
    delete state.profile.losses;
    delete state.profile.trophies;
    // Liga oficial: só jogadores reais. A lista fictícia antiga usava ids
    // n1..n10 e é descartada, nunca recriada.
    if (!Array.isArray(state.league)) state.league = [];
    state.league = state.league
      .filter(b => b && typeof b === 'object' && !/^n\d+$/.test(String(b.id || '')))
      .filter(b => String(b.name || b.nick || '').trim())
      .map(b => normalizeLeagueRow(b))
      .filter(Boolean)
      .slice(0, 50);
    if (!state.skins || !Array.isArray(state.skins.owned)) state.skins = { owned: ['viper'], equipped: 'viper' };
    if (!state.bombs || !Array.isArray(state.bombs.owned)) state.bombs = { owned: ['classic'], equipped: 'classic' };
    if (!state.skins.owned.includes('viper')) state.skins.owned.unshift('viper');
    if (!state.bombs.owned.includes('classic')) state.bombs.owned.unshift('classic');
    if (!CHARACTER_SKINS.some(s => s.id === state.skins.equipped)) state.skins.equipped = 'viper';
    if (!BOMB_SKINS.some(s => s.id === state.bombs.equipped)) state.bombs.equipped = 'classic';
    if (!state.cosmetics || typeof state.cosmetics !== 'object') state.cosmetics = {};
    ['explosions', 'trails', 'avatars'].forEach(kind => {
      const defaults = { explosions: 'classic', trails: 'none', avatars: 'default' }[kind];
      const bucket = state.cosmetics[kind];
      if (!bucket || !Array.isArray(bucket.owned)) {
        state.cosmetics[kind] = { owned: [defaults], equipped: defaults };
      } else {
        if (!bucket.owned.includes(defaults)) bucket.owned.unshift(defaults);
        if (!cosmeticCatalog(kind).some(item => item.id === bucket.equipped)) bucket.equipped = defaults;
      }
    });
    if (!state.economy || typeof state.economy !== 'object') state.economy = {};
    const econ = state.economy;
    ['botWins', 'ads', 'chest', 'double', 'spin', 'eventWins', 'goldCoins'].forEach(k => {
      const n = Number(econ[k]);
      econ[k] = Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
    });
    econ.eventRewarded = !!econ.eventRewarded;
    econ.eventFirst = !!econ.eventFirst;
    ['botDay', 'adDay', 'chestDay', 'doubleDay', 'spinDay'].forEach(k => { if (typeof econ[k] !== 'string') econ[k] = ''; });
    if (!Number.isFinite(Number(econ.eventSlot))) econ.eventSlot = null;
    if (!Number.isFinite(Number(econ.goldSlot))) econ.goldSlot = null;
    if (!state.bracket || typeof state.bracket !== 'object') state.bracket = { schedules: {}, live: {} };
    if (!state.bracket.schedules) state.bracket.schedules = {};
    if (!state.bracket.live) state.bracket.live = {};
    if (!state.bracket.results || typeof state.bracket.results !== 'object') state.bracket.results = {};
    // O mata-mata é semanal: resultados e horários da semana anterior
    // não podem travar (nem liberar) os confrontos da semana atual.
    const wk = weekKey();
    if (state.bracket.week && state.bracket.week !== wk) {
      state.bracket.results = {};
      state.bracket.schedules = {};
    }
    state.bracket.week = wk;
    if (!state.weeklySeeds || typeof state.weeklySeeds !== 'object') state.weeklySeeds = { week: '', seeds: [] };
    if (state.weeklySeeds.week !== wk) state.weeklySeeds = { week: wk, seeds: [] };
    if (!Array.isArray(state.weeklySeeds.seeds)) state.weeklySeeds.seeds = [];
    if (!state.copa || typeof state.copa !== 'object') state.copa = { week: '', field: [], round: 0, status: 'active', rewardClaimed: false };
    if (!Array.isArray(state.copa.field)) state.copa.field = [];
    if (!Number.isFinite(Number(state.copa.round))) state.copa.round = 0;
    if (state.copa.status !== 'champion' && state.copa.status !== 'eliminated') state.copa.status = 'active';
    if (!state.meta || typeof state.meta !== 'object') state.meta = { lastDaily: '' };
    if (typeof state.coins !== 'number' || !isFinite(state.coins)) state.coins = 300;
  }
  function load() {
    let raw = null;
    try { raw = localStorage.getItem(GAMESTATE_KEY); } catch (e) {}
    if (raw) {
      try { const data = JSON.parse(raw); if (data && typeof data === 'object') Object.assign(state, data); } catch (e) {}
    } else {
      // Contas antigas vinham com "Viper-01" pré-preenchido. Isso não é
      // mais um nick: o campo fica vazio até o jogador escolher o seu.
      const legacy = String(prefs.name || '').trim();
      state.profile.nick = legacy.toLowerCase() === 'viper-01' ? '' : legacy.slice(0, 15);
    }
    sanitize();
    ready = true;
    save(false);
    return state;
  }
  function addCoins(n) { state.coins = Math.max(0, state.coins + Math.round(n)); save(); return state.coins; }
  function setProfile(patch) {
    Object.assign(state.profile, patch || {});
    state.profile.nick = String(state.profile.nick == null ? '' : state.profile.nick).trim().slice(0, 15);
    if (state.profile.nick.toLowerCase() === 'viper-01') state.profile.nick = '';
    save();
    prefs.name = state.profile.nick;
    savePrefs({ name: state.profile.nick });
    return state.profile;
  }
  // Regras do nick competitivo: 3–15 caracteres, sem espaços duplos.
  function validateNick(value) {
    const nick = String(value == null ? '' : value).trim();
    if (!nick) return { ok: false, reason: 'empty', nick };
    if (nick.length < 3) return { ok: false, reason: 'short', nick };
    if (nick.length > 15) return { ok: false, reason: 'long', nick };
    if (/\s{2,}/.test(nick)) return { ok: false, reason: 'spaces', nick };
    return { ok: true, reason: '', nick };
  }
  function setLeague(rows) {
    if (!Array.isArray(rows)) return state.league;
    state.league = rows
      .filter(b => b && typeof b === 'object')
      .filter(b => String(b.name || b.nick || '').trim())
      .map(b => normalizeLeagueRow(b))
      .filter(Boolean)
      .slice(0, 50);
    save();
    return state.league;
  }
  // Sincronização Firestore: adota dados remotos sem perder progresso local
  // (cada estatística fica no maior valor entre nuvem e dispositivo).
  function mergeRemoteProfile(remote) {
    if (!remote || typeof remote !== 'object') return state.profile;
    const p = state.profile;
    if (!p.nick && remote.nick) p.nick = String(remote.nick).trim().slice(0, 15);
    if (remote.avatar) p.avatar = remote.avatar;
    if (remote.competitive && typeof remote.competitive === 'object') {
      ['leaguePoints', 'rankedWins', 'rankedLosses', 'trophies'].forEach(k => {
        const v = Math.max(0, Math.floor(Number(remote.competitive[k]) || 0));
        p.competitive[k] = Math.max(Number(p.competitive[k]) || 0, v);
      });
    }
    // Economia: moedas/XP nunca diminuem ao adotar a nuvem, e cosméticos
    // comprados em outro aparelho são incorporados sem perder os locais.
    if (Number.isFinite(Number(remote.coins))) state.coins = Math.max(state.coins, Math.floor(Number(remote.coins)));
    if (Number.isFinite(Number(remote.xp))) prefs.xp = Math.max(prefs.xp || 0, Math.floor(Number(remote.xp)));
    const mergeBucket = (kind, remoteBucket) => {
      if (!remoteBucket || !Array.isArray(remoteBucket.owned)) return;
      const bucket = bucketFor(kind);
      if (!bucket) return;
      remoteBucket.owned.forEach(id => {
        if (cosmeticCatalog(kind).some(item => item.id === id) && !bucket.owned.includes(id)) bucket.owned.push(id);
      });
      const currentDefault = defaultIdFor(kind);
      if (bucket.equipped === currentDefault && remoteBucket.equipped && isOwned(kind, remoteBucket.equipped)) {
        bucket.equipped = remoteBucket.equipped;
        if (kind === 'avatars') p.avatar = getCosmetic('avatars', bucket.equipped).emoji || p.avatar;
      }
    };
    mergeBucket('skins', remote.skins);
    mergeBucket('bombs', remote.bombs);
    if (remote.cosmetics && typeof remote.cosmetics === 'object') {
      ['explosions', 'trails', 'avatars'].forEach(kind => mergeBucket(kind, remote.cosmetics[kind]));
    }
    // Contadores diários do evento/anúncios: mescla só quando o ciclo é o
    // mesmo, sempre pelo maior valor (outro aparelho não "reseta" limites).
    const re = remote.economy;
    if (re && typeof re === 'object') {
      const e = state.economy;
      rollEconomyDay();
      const maxSame = (dayKey, valueKey) => {
        if (re[dayKey] && re[dayKey] === e[dayKey]) e[valueKey] = Math.max(Number(e[valueKey]) || 0, Number(re[valueKey]) || 0);
      };
      maxSame('botDay', 'botWins');
      maxSame('adDay', 'ads');
      maxSame('chestDay', 'chest');
      maxSame('doubleDay', 'double');
      maxSame('spinDay', 'spin');
      const slot = currentSlotId();
      if (Number(re.eventSlot) === slot) {
        if (e.eventSlot !== slot) { e.eventSlot = slot; e.eventWins = 0; e.eventRewarded = false; e.eventFirst = false; }
        e.eventWins = Math.max(e.eventWins, Math.min(2, Number(re.eventWins) || 0));
        e.eventRewarded = e.eventRewarded || !!re.eventRewarded;
        e.eventFirst = e.eventFirst || !!re.eventFirst;
      }
      if (Number(re.goldSlot) === slot) {
        if (e.goldSlot !== slot) { e.goldSlot = slot; e.goldCoins = 0; }
        e.goldCoins = Math.max(e.goldCoins, Math.min(15, Number(re.goldCoins) || 0));
      }
    }
    save();
    return p;
  }
  function trophyRank(value) {
    const v = Math.max(0, Number(value == null ? state.profile.competitive.trophies : value) || 0);
    return TROPHY_TIERS.find(t => v >= t.min && v <= t.max) || TROPHY_TIERS[TROPHY_TIERS.length - 1];
  }
  // Contadores diários (vitórias contra bots, anúncios) zera na virada do dia.
  function rollEconomyDay() {
    const day = today();
    const e = state.economy;
    if (e.botDay !== day) { e.botDay = day; e.botWins = 0; }
    if (e.adDay !== day) { e.adDay = day; e.ads = 0; }
    if (e.chestDay !== day) { e.chestDay = day; e.chest = 0; }
    if (e.doubleDay !== day) { e.doubleDay = day; e.double = 0; }
    if (e.spinDay !== day) { e.spinDay = day; e.spin = 0; }
  }
  const BOT_DAILY_WIN_CAP = 5;
  const AD_DAILY_CAP = 5;
  const AD_TYPE_LIMITS = { chest: 2, double: 2, spin: 1 };

  function bucketFor(kind) {
    if (kind === 'bombs') return state.bombs;
    if (kind === 'skins') return state.skins;
    return (state.cosmetics && state.cosmetics[kind]) || null;
  }
  function defaultIdFor(kind) {
    return { skins: 'viper', bombs: 'classic', explosions: 'classic', trails: 'none', avatars: 'default' }[kind] || '';
  }

  function addResult(result) {
    if (!result) return null;
    rollEconomyDay();
    const comp = state.profile.competitive;
    const econ = state.economy;
    const summary = {
      competitive: !!result.competitive, win: !!result.win, league: !!result.league,
      points: 0, coins: 0, xp: 0, delta: 0, bonus: 0, base: 0, botCapped: false,
      trophies: comp.trophies, rank: trophyRank()
    };
    // Economia rebalanceada: ONLINE 1v1 vale mais que treino contra bots.
    // Bots pagam +3 moedas/+2 XP por vitória, no máximo 5 vezes ao dia;
    // derrota contra bots não rende nada.
    if (result.mode === 'ONLINE') {
      summary.coins = result.win ? 25 : 8;
      summary.xp = result.win ? 15 : 5;
    } else if (result.win) {
      if (econ.botWins < BOT_DAILY_WIN_CAP) {
        econ.botWins++;
        summary.coins = 3;
        summary.xp = 2;
      } else {
        summary.botCapped = true;
      }
    }
    state.coins += summary.coins;
    // Estatísticas competitivas contam apenas ONLINE (PvP real) ou MATA-MATA/COPA.
    if (result.competitive) {
      if (result.win) {
        comp.rankedWins++;
        const rank = trophyRank();
        comp.trophies += rank.win;
        summary.base = rank.win;
        summary.delta = rank.win;
        summary.rank = rank;
      } else {
        comp.rankedLosses++;
        const rank = trophyRank();
        const eff = result.effort || {};
        const roundsWon = Math.max(0, Number(eff.roundsWon) || 0);
        const hearts = Math.max(0, Number(eff.heartsTaken) || 0);
        const survived = Math.max(0, Number(eff.survived) || 0);
        let bonus = roundsWon >= 1 ? 6 : 0;
        bonus += Math.min(6, hearts * 2);
        if (survived >= 45 && !eff.earlySelfKill) bonus += 2;
        const delta = Math.min(-2, -rank.loss + bonus);
        comp.trophies = Math.max(0, comp.trophies + delta);
        summary.base = -rank.loss;
        summary.bonus = bonus;
        summary.delta = delta;
        summary.rank = rank;
      }
      // Pontos da Liga só existem em partidas ONLINE PvP reais.
      if (result.league && result.win) {
        comp.leaguePoints += 3;
        summary.points = 3;
      }
    }
    summary.trophies = comp.trophies;
    save();
    return summary;
  }
  function leagueTable() {
    const comp = state.profile.competitive;
    const rows = state.league.map(b => ({ ...b, me: false }));
    // A linha local só existe depois de alguma partida ranqueada: a tabela
    // vazia mostra a mensagem de estreia em vez de um jogador fantasma.
    const active = comp.leaguePoints > 0 || comp.rankedWins > 0 || comp.rankedLosses > 0;
    if (active) {
      rows.push({
        id: 'me', me: true, name: state.profile.nick || (I18N[currentLang] || {}).nickFallback || 'JOGADOR', avatar: state.profile.avatar,
        points: comp.leaguePoints, wins: comp.rankedWins, losses: comp.rankedLosses,
        trophies: comp.trophies, cosmeticRank: cosmeticRarity('skins', state.skins.equipped)
      });
    }
    return rows
      // Ordem neutra e determinística (mesma para todos os jogadores):
      // pontos → vitórias → menos derrotas → troféus → nick.
      .sort((a, b) => b.points - a.points || b.wins - a.wins || a.losses - b.losses
        || b.trophies - a.trophies || String(a.name).localeCompare(String(b.name)))
      .map((row, i) => ({ ...row, pos: i + 1 }));
  }
  function isOwned(kind, id) {
    const bucket = bucketFor(kind);
    if (!bucket) return false;
    return bucket.owned.includes(id) || id === defaultIdFor(kind);
  }
  function buy(kind, id) {
    const item = cosmeticCatalog(kind).find(x => x.id === id);
    const bucket = bucketFor(kind);
    if (!item || !bucket) return { ok: false, reason: 'notfound' };
    if (item.rarity === 'starter' || isOwned(kind, id)) return { ok: true, already: true };
    if (state.coins < item.price) return { ok: false, reason: 'coins' };
    state.coins -= item.price;
    bucket.owned.push(id);
    save();
    return { ok: true, item, coins: state.coins };
  }
  function equip(kind, id) {
    const bucket = bucketFor(kind);
    if (!bucket || !isOwned(kind, id)) return false;
    bucket.equipped = id;
    if (kind === 'avatars') state.profile.avatar = getCosmetic('avatars', id).emoji || '🐍';
    save();
    return true;
  }
  // Entrega cosméticos sem cobrar (passe, eventos, presentes). Retorna true
  // apenas quando o item é realmente novo no inventário.
  function grant(kind, id) {
    const bucket = bucketFor(kind);
    const item = cosmeticCatalog(kind).find(x => x.id === id);
    if (!bucket || !item) return false;
    if (bucket.owned.includes(id) || id === defaultIdFor(kind)) return false;
    bucket.owned.push(id);
    save();
    return true;
  }
  function equipped(kind) { return getCosmetic(kind, bucketFor(kind).equipped); }
  // Payload para a nuvem: o que não é competitivo também precisa sobreviver
  // à troca de aparelho (moedas, cosméticos e contadores diários).
  function cloudPayload() {
    rollEconomyDay();
    return {
      coins: state.coins,
      xp: prefs.xp || 0,
      level: levelInfo().level,
      skins: { owned: state.skins.owned.slice(), equipped: state.skins.equipped },
      bombs: { owned: state.bombs.owned.slice(), equipped: state.bombs.equipped },
      cosmetics: {
        explosions: { owned: state.cosmetics.explosions.owned.slice(), equipped: state.cosmetics.explosions.equipped },
        trails: { owned: state.cosmetics.trails.owned.slice(), equipped: state.cosmetics.trails.equipped },
        avatars: { owned: state.cosmetics.avatars.owned.slice(), equipped: state.cosmetics.avatars.equipped }
      },
      cosmeticRank: cosmeticRarity('skins', state.skins.equipped),
      economy: {
        botDay: state.economy.botDay, botWins: state.economy.botWins,
        adDay: state.economy.adDay, ads: state.economy.ads,
        chestDay: state.economy.chestDay, chest: state.economy.chest,
        doubleDay: state.economy.doubleDay, double: state.economy.double,
        spinDay: state.economy.spinDay, spin: state.economy.spin,
        eventSlot: state.economy.eventSlot, eventWins: state.economy.eventWins, eventRewarded: state.economy.eventRewarded,
        eventFirst: !!state.economy.eventFirst,
        goldSlot: state.economy.goldSlot, goldCoins: state.economy.goldCoins
      }
    };
  }
  function canWatchAd(type) {
    rollEconomyDay();
    const e = state.economy;
    if (e.ads >= AD_DAILY_CAP) return { ok: false, reason: 'daily', left: 0 };
    const cap = AD_TYPE_LIMITS[type] || 0;
    if (!cap) return { ok: false, reason: 'type', left: 0 };
    const used = Number(e[type]) || 0;
    return { ok: used < cap, reason: used < cap ? '' : 'limit', left: Math.max(0, cap - used) };
  }
  function registerAd(type) {
    rollEconomyDay();
    const e = state.economy;
    e.ads++;
    e[type] = (Number(e[type]) || 0) + 1;
    save();
    return { ads: e.ads, used: e[type], left: Math.max(0, (AD_TYPE_LIMITS[type] || 0) - e[type]) };
  }
  function adStatus(type) {
    const check = canWatchAd(type);
    return { ...check, dailyLeft: Math.max(0, AD_DAILY_CAP - state.economy.ads) };
  }
  function registerEventWin() {
    const slot = currentSlotId();
    const e = state.economy;
    if (e.eventSlot !== slot) { e.eventSlot = slot; e.eventWins = 0; e.eventRewarded = false; e.eventFirst = false; }
    e.eventWins = Math.min(2, e.eventWins + 1);
    let reward = null;
    if (e.eventWins >= 2 && !e.eventRewarded) {
      e.eventRewarded = true;
      state.coins += 35;
      reward = { coins: 35, xp: rotatingEventIndexFor(slot) === 7 ? 50 : 25 };
    } else if (e.eventWins === 1 && !e.eventFirst) {
      // Escalonado: a 1ª vitória do ciclo já rende +10 moedas.
      e.eventFirst = true;
      state.coins += 10;
      reward = { coins: 10, xp: 0, first: true };
    }
    save();
    return reward;
  }
  function eventProgress() {
    const slot = currentSlotId();
    if (state.economy.eventSlot !== slot) return { wins: 0, rewarded: false };
    return { wins: state.economy.eventWins, rewarded: state.economy.eventRewarded };
  }
  function goldCrateReward() {
    const slot = currentSlotId();
    const e = state.economy;
    if (e.goldSlot !== slot) { e.goldSlot = slot; e.goldCoins = 0; }
    if (e.goldCoins >= 15) return 0;
    e.goldCoins += 2;
    state.coins += 2;
    save();
    return 2;
  }
  function goldLeft() {
    if (state.economy.goldSlot !== currentSlotId()) return 15;
    return Math.max(0, 15 - state.economy.goldCoins);
  }
  function claimDaily() {
    const day = today();
    if (state.meta.lastDaily === day) return 0;
    state.meta.lastDaily = day;
    state.coins += 100;
    save();
    return 100;
  }
  function getSchedule(id) { return state.bracket.schedules[id] || null; }
  function nextOccurrence(day, time) {
    const [hh, mm] = String(time || '19:30').split(':').map(Number);
    const nowDate = new Date();
    const target = new Date(nowDate);
    target.setHours(hh || 19, mm || 30, 0, 0);
    let diff = ((Number(day) - nowDate.getDay()) + 7) % 7;
    if (diff === 0 && target.getTime() <= nowDate.getTime()) diff = 7;
    target.setDate(nowDate.getDate() + diff);
    return target.getTime();
  }
  function proposeSchedule(id, day, time) {
    state.bracket.schedules[id] = { day: Number(day), time, ts: nextOccurrence(day, time), accepted: false, proposedAt: Date.now() };
    save();
    return state.bracket.schedules[id];
  }
  function acceptSchedule(id) {
    const sched = state.bracket.schedules[id];
    if (!sched) return null;
    if (!sched.ts || sched.ts <= Date.now()) sched.ts = nextOccurrence(sched.day, sched.time);
    sched.accepted = true;
    save();
    return sched;
  }
  function isLive(id) { return !!state.bracket.live[id]; }
  function setLive(id, on) { if (on) state.bracket.live[id] = true; else delete state.bracket.live[id]; save(); }
  function getBracketResult(id) { return (state.bracket.results && state.bracket.results[id]) || null; }
  // Top 8 congelado da semana: vale a lista do servidor ou, sem servidor, a
  // primeira lista gravada localmente ao abrir a fase de mata-mata.
  function getWeeklySeeds() {
    if (!state.weeklySeeds || state.weeklySeeds.week !== weekKey()) return [];
    return Array.isArray(state.weeklySeeds.seeds) ? state.weeklySeeds.seeds.slice() : [];
  }
  function setWeeklySeeds(names) {
    const list = (Array.isArray(names) ? names : [])
      .map(n => String(n || '').trim().slice(0, 24))
      .filter(Boolean)
      .slice(0, 8);
    state.weeklySeeds = { week: weekKey(), seeds: list };
    save();
    return list;
  }
  function setBracketResult(id, res) {
    if (!id) return null;
    if (res === 'won' || res === 'lost') state.bracket.results[id] = res;
    else delete state.bracket.results[id];
    save();
    return state.bracket.results[id] || null;
  }
  function countdownText(ts) {
    if (!ts) return '';
    const ms = ts - Date.now();
    if (ms <= 0) return 'AGORA';
    const totalMin = Math.ceil(ms / 60000);
    const d = Math.floor(totalMin / 1440);
    const h = Math.floor((totalMin % 1440) / 60);
    const m = totalMin % 60;
    if (d > 0) return `${d}d ${h}h`;
    if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m`;
    return `${m}m`;
  }
  function weekKey(d = new Date()) {
    const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    date.setDate(date.getDate() - ((date.getDay() + 6) % 7));
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
  const COPA_SIZE = 8;
  function ensureCopa() {
    const wk = weekKey();
    if (!state.copa || state.copa.week !== wk || !Array.isArray(state.copa.field) || state.copa.field.length < COPA_SIZE - 1) {
      // Sem jogadores fictícios: a Copa é formada por jogadores reais da Liga.
      const others = leagueTable().filter(r => !r.me).map(r => r.name).slice(0, COPA_SIZE - 1);
      state.copa = { week: wk, field: others, round: 0, status: 'active', rewardClaimed: false };
      save(false);
    }
    return state.copa;
  }
  function claimCopaReward() {
    const c = ensureCopa();
    if (c.rewardClaimed) return null;
    c.rewardClaimed = true;
    state.coins += 300;
    state.profile.competitive.trophies += 40;
    save();
    return { coins: 300, trophies: 40 };
  }

  return {
    get state() { return state; },
    get ready() { return ready; },
    load, save, subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    // Gancho para Firestore/Realtime DB: substitui o snapshot inteiro.
    hydrate(data) { if (!data || typeof data !== 'object') return state; Object.assign(state, data); sanitize(); save(); return state; },
    addCoins, setProfile, addResult, leagueTable, isOwned, buy, equip, grant, equipped, defaultIdFor,
    validateNick, setLeague, mergeRemoteProfile, cloudPayload,
    trophyRank, ensureCopa, claimCopaReward, weekKey,
    claimDaily, getSchedule, proposeSchedule, acceptSchedule, nextOccurrence,
    isLive, setLive, countdownText,
    getBracketResult, setBracketResult,
    getWeeklySeeds, setWeeklySeeds,
    canWatchAd, registerAd, adStatus, registerEventWin, eventProgress, goldCrateReward, goldLeft,
    rollEconomyDay
  };
})();
window.GameState = GameState;

/* ========================================================================
   5.05 EVENTOS ROTATIVOS DE 3 HORAS
   Relógio compartilhado: todos os jogadores calculam o mesmo slot a partir
   do horário do sistema (Date.now), sem depender de servidor.
   ======================================================================== */
const EVENT_SLOT_MS = 3 * 60 * 60 * 1000;
/* Cor da identidade de cada evento (mesma ordem de ROTATING_EVENTS). */
const EVENT_THEMES = [
  '#f472b6', '#a78bfa', '#fbbf24', '#fb7185', '#f97316', '#38bdf8', '#f43f5e', '#34d399'
];
function eventThemeColor(index) { return EVENT_THEMES[index] || EVENT_THEMES[0]; }
const ROTATING_EVENTS = [
  { id: 'powerups', icon: '🎁', name: 'Chuva de Power-Ups', desc: 'Caixas soltam itens com o dobro de frequência.', nameEn: 'Power-Up Rain', descEn: 'Crates drop items twice as often.' },
  { id: 'turbo', icon: '🚀', name: 'Velocidade Turbo', desc: 'Todo mundo começa na velocidade máxima.', nameEn: 'Turbo Speed', descEn: 'Everyone starts at max speed.' },
  { id: 'gold', icon: '🪙', name: 'Caça ao Ouro', desc: '5 moedas douradas na arena: +2 moedas cada (até 15 por ciclo).', nameEn: 'Gold Hunt', descEn: '5 golden coins in the arena: +2 coins each (max 15 per cycle).' },
  { id: 'shortfuse', icon: '💣', name: 'Pavio Curto', desc: 'As bombas explodem em 1,5s.', nameEn: 'Short Fuse', descEn: 'Bombs explode in 1.5s.' },
  { id: 'maxfire', icon: '🔥', name: 'Fogo Máximo', desc: 'Começa com alcance máximo e 3 bombas.', nameEn: 'Max Firepower', descEn: 'Start with max range and 3 bombs.' },
  { id: 'lightning', icon: '⚡', name: 'Arena Relâmpago', desc: 'A zona começa a fechar aos 30 segundos.', nameEn: 'Lightning Arena', descEn: 'The zone starts closing at 30 seconds.' },
  { id: 'sudden', icon: '❤️', name: 'Morte Súbita 1 HP', desc: 'Apenas 1 coração por partida.', nameEn: 'Sudden Death 1 HP', descEn: 'Only 1 heart per match.' },
  { id: 'pass', icon: '✨', name: 'Hora do Passe', desc: 'Todo XP ganho agora vale 2x.', nameEn: 'Pass Hour', descEn: 'All XP earned now counts 2x.' }
];
/* Relógio do servidor: o cabeçalho Date do /api/health corrige o relógio
   local. A rotação fica igual para todos e imune a mudança de hora do
   aparelho. Sem rede, vale o relógio local (offset 0). */
let serverClockOffset = 0;
function serverNow() { return Date.now() + serverClockOffset; }
function syncServerClock() {
  if (!/^https?:$/.test(location.protocol)) return;
  const t0 = Date.now();
  fetch('api/health', { cache: 'no-store' })
    .then(res => {
      const dateHeader = res.headers.get('date');
      if (!dateHeader) return;
      const serverMs = Date.parse(dateHeader);
      if (!serverMs) return;
      const t1 = Date.now();
      const offset = Math.round(serverMs + (t1 - t0) / 2 - t1);
      if (Math.abs(offset) < 12 * 60 * 60 * 1000) serverClockOffset = offset;
    })
    .catch(() => {});
}
syncServerClock();
setInterval(syncServerClock, 10 * 60 * 1000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) syncServerClock(); });

function currentSlotId() { return Math.floor(serverNow() / EVENT_SLOT_MS); }
function rotatingEventIndexFor(slot) { return ((slot % ROTATING_EVENTS.length) + ROTATING_EVENTS.length) % ROTATING_EVENTS.length; }
function currentRotatingEvent() {
  const slot = currentSlotId();
  const index = rotatingEventIndexFor(slot);
  return {
    slot, index,
    event: ROTATING_EVENTS[index],
    startAt: slot * EVENT_SLOT_MS,
    endsAt: (slot + 1) * EVENT_SLOT_MS
  };
}
function rotatingEvent() { return currentRotatingEvent().event; }
function eventIs(index) { return currentRotatingEvent().index === index; }
function eventCountdownText(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/* Identidade visual do evento dentro da partida: chip no HUD, splash de
   abertura e uma vinheta discreta na cor do evento. */
let eventSplashTimer = 0;
function applyEventHud(index) {
  const chip = document.getElementById('eventHudChip');
  if (!chip) return;
  if (index < 0) { chip.classList.add('hidden'); return; }
  const ev = ROTATING_EVENTS[index];
  const dict = I18N[currentLang] || {};
  const color = eventThemeColor(index);
  const nameEl = document.getElementById('eventHudName');
  if (nameEl) nameEl.textContent = `${(dict.eventHudChip || 'EVENTO')} · ${currentLang === 'en' ? ev.nameEn : ev.name}`;
  chip.style.setProperty('--event-accent', color);
  chip.classList.remove('hidden');
}
function showEventSplash(rot) {
  const el = document.getElementById('eventSplash');
  if (!el || !rot) return;
  const dict = I18N[currentLang] || {};
  const en = currentLang === 'en';
  const setText = (id, text) => { const node = document.getElementById(id); if (node) node.textContent = text; };
  const color = eventThemeColor(rot.index);
  el.style.setProperty('--event-accent', color);
  setText('eventSplashIcon', rot.event.icon);
  setText('eventSplashName', en ? rot.event.nameEn : rot.event.name);
  setText('eventSplashDesc', en ? rot.event.descEn : rot.event.desc);
  setText('eventSplashBadge', dict.eventSplashBadge || 'EVENTO ATIVO');
  setText('eventSplashTag', dict.eventSplashTag || '3H • Fora da Liga');
  el.classList.remove('hidden');
  const card = document.getElementById('eventSplashCard');
  if (card && card.animate) {
    card.animate([
      { transform: 'scale(.82) translateY(14px)', opacity: 0 },
      { transform: 'scale(1.04) translateY(0)', opacity: 1, offset: 0.6 },
      { transform: 'scale(1)', opacity: 1 }
    ], { duration: 420, easing: 'cubic-bezier(.2,.8,.3,1.2)' });
  }
  clearTimeout(eventSplashTimer);
  eventSplashTimer = setTimeout(() => el.classList.add('hidden'), 2600);
}
function drawEventTint() {
  if (!match.eventMode || !match.running || match.ended || match.demoMode) return;
  const color = eventThemeColor(match.eventIndex);
  const grad = ctx.createRadialGradient(viewW / 2, viewH / 2, Math.min(viewW, viewH) * 0.34, viewW / 2, viewH / 2, Math.max(viewW, viewH) * 0.78);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(1, hexToRgba(color, 0.11));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, viewW, viewH);
}
function hexToRgba(hex, alpha) {
  const h = String(hex || '').replace('#', '');
  if (h.length !== 6) return `rgba(148,163,184,${alpha})`;
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}

/* ========================================================================
   5.06 ANÚNCIOS PREMIADOS (AdManager)
   No navegador o vídeo é simulado por 3s (TEST_MODE). No Android o mesmo
   fluxo usa o plugin @capacitor-community/admob quando instalado.
   ======================================================================== */
window.AdManager = (() => {
  let busy = false;
  const TYPE_LABEL = {
    chest: { pt: 'Baú patrocinado', en: 'Sponsored chest' },
    double: { pt: 'Dobrar recompensa', en: 'Double reward' },
    spin: { pt: 'Giro da sorte', en: 'Lucky spin' }
  };
  function textOf(key) {
    const dict = I18N[currentLang] || {};
    return dict[key] || '';
  }
  function showOverlay(type, seconds, done) {
    const overlay = document.getElementById('adOverlay');
    const label = document.getElementById('adOverlayLabel');
    const timer = document.getElementById('adOverlayTimer');
    const progress = document.getElementById('adOverlayBar');
    if (label) label.textContent = `${(TYPE_LABEL[type] || TYPE_LABEL.chest)[currentLang] || TYPE_LABEL[type].pt} — ${textOf('adSimulating') || 'Simulando Anúncio Premiado...'}`;
    if (overlay) overlay.classList.remove('hidden');
    let left = seconds;
    const paint = () => {
      if (timer) timer.textContent = `${left}s`;
      if (progress) progress.style.width = `${((seconds - left) / seconds) * 100}%`;
    };
    paint();
    const iv = setInterval(() => {
      left--;
      paint();
      if (left <= 0) {
        clearInterval(iv);
        if (overlay) overlay.classList.add('hidden');
        done();
      }
    }, 1000);
  }
  async function showRewardedAd(type, onRewardSuccess) {
    if (busy) return false;
    const check = GameState.canWatchAd(type);
    if (!check.ok) {
      showToast(check.reason === 'daily'
        ? (textOf('adDailyCap') || 'Limite diário de anúncios atingido (5/dia).')
        : (textOf('adTypeCap') || 'Você já usou este anúncio hoje.'));
      return false;
    }
    busy = true;
    const finish = () => {
      busy = false;
      GameState.registerAd(type);
      try { if (typeof onRewardSuccess === 'function') onRewardSuccess(); } catch (e) {}
    };
    // Android nativo: o plugin só é usado quando o ID real está configurado.
    const admob = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.AdMob;
    if (ADMOB_REWARDED_ID !== 'TEST_MODE' && admob && typeof admob.showRewardVideoAd === 'function') {
      try {
        await admob.showRewardVideoAd({ adId: ADMOB_REWARDED_ID });
        finish();
        return true;
      } catch (err) {
        busy = false;
        showToast(textOf('adUnavailable') || 'Anúncio indisponível agora. Tente de novo mais tarde.');
        return false;
      }
    }
    showOverlay(type, 3, finish);
    return true;
  }
  return {
    showRewardedAd,
    get busy() { return busy; },
    status: (type) => GameState.adStatus(type)
  };
})();

/* Aparência dos duelistas fictícios da liga (também usada nos bots do duelo). */
const PROFILE_DEFS = {
  'Nova': { avatar: '🦊', body: '#f472b6', visor: '#fdf2f8', accent: '#db2777' },
  'Rook': { avatar: '🐼', body: '#60a5fa', visor: '#e0f2fe', accent: '#2563eb' },
  'Vex': { avatar: '🦂', body: '#a78bfa', visor: '#ede9fe', accent: '#7c3aed' },
  'Kilo': { avatar: '🐻', body: '#fb923c', visor: '#ffedd5', accent: '#ea580c' },
  'Juno': { avatar: '🦉', body: '#34d399', visor: '#d1fae5', accent: '#059669' },
  'Axel': { avatar: '🐺', body: '#94a3b8', visor: '#f1f5f9', accent: '#475569' },
  'Mira': { avatar: '🐯', body: '#f87171', visor: '#fee2e2', accent: '#dc2626' },
  'Zed': { avatar: '🦎', body: '#22d3ee', visor: '#cffafe', accent: '#0891b2' },
  'Iris': { avatar: '🦅', body: '#c084fc', visor: '#f3e8ff', accent: '#9333ea' },
  'Onyx': { avatar: '🐍', body: '#4ade80', visor: '#f0fdf4', accent: '#16a34a' }
};
function getProfileDef(name) {
  return PROFILE_DEFS[name] || { avatar: '🐍', body: '#34d399', visor: '#ecfdf5', accent: '#10b981' };
}
function botProfileFor(name) {
  return BOT_PROFILES.find(p => p.name === name) || BOT_PROFILES[(name || 'x').length % BOT_PROFILES.length];
}

/* ---------- Ajustes do jogador ---------- */
// Presets de gráficos: controlam resolução (DPR/escala), partículas, rastros
// e efeitos de brilho. "Baixo" e "Médio" priorizam celulares mais fracos.
const GRAPHICS_PRESETS = {
  low:    { label: 'Baixo', labelEn: 'Low',    dprCap: 1,   scaleCap: 0.75, scaleMin: 0.5,  particles: 0.35, trailCap: 60,  glow: false, ambience: false },
  medium: { label: 'Médio', labelEn: 'Medium', dprCap: 1.3, scaleCap: 0.9,  scaleMin: 0.55, particles: 0.65, trailCap: 120, glow: false, ambience: true },
  high:   { label: 'Alto',  labelEn: 'High',   dprCap: 2,   scaleCap: 1,    scaleMin: 0.6,  particles: 1,    trailCap: 220, glow: true,  ambience: true },
  ultra:  { label: 'Ultra', labelEn: 'Ultra',  dprCap: 2.5, scaleCap: 1,    scaleMin: 0.7,  particles: 1.4,  trailCap: 300, glow: true,  ambience: true }
};
const DEFAULT_SETTINGS = {
  volume: 80, music: 35, vibration: true, shake: true, reduceMotion: false,
  joySize: 112, joyOpacity: 80, deadzone: 22, showFps: false,
  graphics: IS_TOUCH ? 'medium' : 'high'
};
const settings = { ...DEFAULT_SETTINGS };
let QUALITY = GRAPHICS_PRESETS[settings.graphics];

function loadSettings() {
  const stored = prefs.settings && typeof prefs.settings === 'object' ? prefs.settings : null;
  if (stored) {
    Object.keys(DEFAULT_SETTINGS).forEach(k => {
      const v = stored[k];
      if (v !== undefined && v !== null) settings[k] = v;
    });
  }
  // Sem preferência salva, respeita a opção do sistema operacional.
  if (!stored || stored.reduceMotion === undefined) {
    const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    settings.reduceMotion = !!(mq && mq.matches);
  }
  if (!GRAPHICS_PRESETS[settings.graphics]) settings.graphics = IS_TOUCH ? 'medium' : 'high';
}

function saveSettings() { savePrefs({ settings: { ...settings } }); }

function applySettings() {
  SFX.setVolume(settings.volume / 100);
  MUSIC.setVolume(settings.music / 100);
  const reduce = !!settings.reduceMotion;
  document.documentElement.dataset.reduceMotion = reduce ? '1' : '0';
  // Movimento reduzido também desliga o tremor de câmera (acessibilidade).
  match.shakeEnabled = !!settings.shake && !reduce;
  if (reduce) match.shake = 0;
  const fps = document.getElementById('fpsCounter');
  if (fps) fps.classList.toggle('hidden', !settings.showFps);
  const shakeBtn = document.getElementById('btnShakeHud');
  if (shakeBtn) {
    shakeBtn.style.opacity = match.shakeEnabled ? '1' : '0.45';
    shakeBtn.classList.toggle('border-cyan-500/60', match.shakeEnabled);
    shakeBtn.classList.toggle('border-slate-700/80', !match.shakeEnabled);
  }
  QUALITY = GRAPHICS_PRESETS[settings.graphics] || GRAPHICS_PRESETS.high;
  if (typeof resize === 'function' && canvas && canvas.width) resize();
}

function syncSettingsUI() {
  const q = id => document.getElementById(id);
  const setVal = (id, text) => { const el = q(id); if (el) el.textContent = text; };
  if (q('setVolume')) { q('setVolume').value = settings.volume; setVal('setVolumeVal', settings.volume + '%'); }
  if (q('setMusic')) { q('setMusic').value = settings.music; setVal('setMusicVal', settings.music + '%'); }
  if (q('setJoyOpacity')) { q('setJoyOpacity').value = settings.joyOpacity; setVal('setJoyOpacityVal', settings.joyOpacity + '%'); }
  if (q('setDeadzone')) { q('setDeadzone').value = settings.deadzone; setVal('setDeadzoneVal', settings.deadzone + '%'); }
  [['setVibration', settings.vibration], ['setShake', settings.shake], ['setFps', settings.showFps], ['setReduceMotion', settings.reduceMotion]].forEach(([id, on]) => {
    const el = q(id);
    if (!el) return;
    el.dataset.on = on ? '1' : '0';
    el.setAttribute('aria-checked', on ? 'true' : 'false');
  });
  document.querySelectorAll('#setJoySize button').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.size, 10) === settings.joySize);
  });
  const segGfx = q('setGraphics');
  if (segGfx) segGfx.querySelectorAll('button[data-graphics]').forEach(b => {
    b.classList.toggle('active', b.dataset.graphics === settings.graphics);
  });
}

function openSettings() {
  syncSettingsUI();
  const el = document.getElementById('settingsModal');
  if (el) el.classList.remove('hidden');
}

function closeSettings() {
  const el = document.getElementById('settingsModal');
  if (el) el.classList.add('hidden');
}

function haptic(ms = 30) {
  if (!settings.vibration || !navigator.vibrate) return;
  try { navigator.vibrate(ms); } catch (e) {}
}

function padRumble(duration = 140, strong = 0.5, weak = 0.7, slot = 'p1') {
  if (!settings.vibration || !navigator.getGamepads) return;
  // Vibra no controle que realmente pertence ao jogador (slot p1/p2),
  // em vez de sempre usar o primeiro gamepad conectado.
  const gp = padBySlot(slot);
  if (!gp) return;
  const act = gp.vibrationActuator;
  if (!act) return;
  try {
    if (typeof act.playEffect === 'function') {
      act.playEffect('dual-rumble', { duration, strongMagnitude: strong, weakMagnitude: weak });
    } else if (typeof act.pulse === 'function') {
      act.pulse(Math.max(0.05, Math.min(1, strong)), duration);
    }
  } catch (e) {}
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
  const txt = achievementText(ach);
  document.getElementById('achieveIcon').textContent = ach.icon;
  document.getElementById('achieveTitle').textContent = txt.title;
  document.getElementById('achieveDesc').textContent = txt.desc;
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
    const txt = achievementText(ach);
    const item = document.createElement('div');
    item.className = `flex items-center gap-3 p-3 rounded-xl border-2 ${
      unlocked ? 'bg-amber-500/10 border-amber-400/50' : 'bg-slate-800/50 border-slate-700 opacity-60'
    }`;
    item.innerHTML = `
      <div class="text-3xl">${ach.icon}</div>
      <div class="flex-1">
        <div class="font-display font-extrabold text-white text-sm">${txt.title}</div>
        <div class="text-[11px] text-slate-300 mt-0.5">${txt.desc}</div>
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
  // A moeda/XP da partida agora vêm da economia rebalanceada, então o
  // resumo é calculado antes para o XP respeitar o limite diário de bots.
  const summary = GameState.addResult(result);
  awardMatchProgress(result, summary);
  checkAchievements();
  updateCareerUI();
  return summary;
}

function updateCareerUI() {
  renderProfileRank();
  const el = document.getElementById('careerStats');
  if (!el) return;
  const lv = levelInfo();
  el.style.display = 'block';
  const en = currentLang === 'en';
  const xpText = lv.maxed ? (en ? 'MAX LEVEL' : 'NÍVEL MÁXIMO') : `${lv.into}/${lv.need} XP`;
  el.textContent = en
    ? `⭐ Level ${lv.level} · ${xpText}  ·  💰 ${GameState.state.coins}`
    : `⭐ Nível ${lv.level} · ${xpText}  ·  💰 ${GameState.state.coins}`;
  const hudLevel = document.getElementById('hudLevel');
  if (hudLevel) hudLevel.textContent = lv.level;
}

/* ========================================================================
   5.1 PROGRESSÃO — XP, NÍVEL, SKINS, MISSÕES, EVENTOS, TEMPORADA, RANKING
   ======================================================================== */
const MAX_LEVEL = 40;
function xpToNext(level) { return 90 + (level - 1) * 55; }

function levelInfo(totalXp = prefs.xp || 0) {
  let level = 1;
  let rem = Math.max(0, totalXp);
  while (level < MAX_LEVEL && rem >= xpToNext(level)) { rem -= xpToNext(level); level++; }
  const maxed = level >= MAX_LEVEL;
  return { level, into: maxed ? 0 : rem, need: maxed ? 0 : xpToNext(level), total: totalXp, maxed };
}

function dayKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function daySeed() {
  return dayKey().split('-').reduce((n, part) => (n * 131 + parseInt(part, 10)) % 1000003, 7);
}

/* ---------- Skins ---------- */
const SKINS = [
  { id: 'VIPER', name: 'Viper', body: '#34d399', visor: '#ecfdf5', accent: '#10b981', level: 1, desc: 'O clássico da arena' },
  { id: 'SHADOW', name: 'Sombra', body: '#334155', visor: '#a78bfa', accent: '#6366f1', level: 3, desc: 'Silencioso e letal' },
  { id: 'CRIMSON', name: 'Carmesim', body: '#ef4444', visor: '#fde68a', accent: '#b91c1c', level: 6, desc: 'Puro instinto' },
  { id: 'GLACIER', name: 'Glaciar', body: '#67e8f9', visor: '#f0f9ff', accent: '#0891b2', level: 10, desc: 'Sangue frio' },
  { id: 'GOLD', name: 'Ouro', body: '#fbbf24', visor: '#fff7ed', accent: '#b45309', level: 14, desc: 'Lenda da temporada' },
  { id: 'NEON', name: 'Neon', body: '#e879f9', visor: '#22d3ee', accent: '#a21caf', seasonTier: 4, plus: true, desc: 'Exclusivo do Passe Plus' },
  { id: 'SAKURA', name: 'Sakura', body: '#f9a8d4', visor: '#fff1f2', accent: '#db2777', seasonTier: 8, plus: true, desc: 'Exclusivo do Passe Plus' },
  { id: 'OBSIDIAN', name: 'Obsidiana', body: '#0f172a', visor: '#f43f5e', accent: '#7f1d1d', seasonTier: 12, plus: true, desc: 'Exclusivo do Passe Plus' }
];
function getSkin(id) { return SKINS.find(sk => sk.id === id) || SKINS[0]; }
function skinUnlocked(skin) {
  if (prefs.ownedSkins && prefs.ownedSkins[skin.id]) return true;
  if (skin.level && levelInfo().level >= skin.level) return true;
  return false;
}
function equipSkin(id) {
  const skin = getSkin(id);
  if (!skinUnlocked(skin)) return;
  savePrefs({ skin: skin.id });
  renderSkins();
  refreshDemo();
  showToast(`🎨 Skin ${skin.name} equipada`);
}

/* ---------- Temporada / Passe ---------- */
const SEASON_NAME = 'Temporada 1 · Neon Rift';
const SEASON_PLUS_LEVEL = 8;
// O passe tem progressão própria (XP do passe), separada do nível da conta.
// A XP do passe tem teto diário: a temporada dura semanas, não um dia.
const SEASON_PASS_TIERS_COUNT = 30;
const SEASON_PASS_TIER_COST = 500;
const SEASON_PASS_DAILY_CAP = 800;
const SEASON_PASS_XP_FACTOR = 4;
const PASS_COINS = amount => ({ type: 'coins', amount });
const PASS_ITEM = (kind, id) => ({ type: 'cosmetic', kind, id });
const PASS_LEGACY = id => ({ type: 'legacySkin', id });
const SEASON_PASS_REWARDS = [
  { tier: 1, free: PASS_COINS(60), plus: PASS_COINS(120) },
  { tier: 2, free: PASS_COINS(60), plus: PASS_ITEM('bombs', 'dynamite') },
  { tier: 3, free: PASS_COINS(70), plus: PASS_COINS(140) },
  { tier: 4, free: PASS_ITEM('trails', 'fire'), plus: PASS_LEGACY('NEON') },
  { tier: 5, free: PASS_COINS(80), plus: PASS_COINS(160) },
  { tier: 6, free: PASS_COINS(80), plus: PASS_ITEM('explosions', 'spark') },
  { tier: 7, free: PASS_COINS(90), plus: PASS_COINS(180) },
  { tier: 8, free: PASS_COINS(100), plus: PASS_LEGACY('SAKURA') },
  { tier: 9, free: PASS_ITEM('bombs', 'crystal'), plus: PASS_COINS(220) },
  { tier: 10, free: PASS_COINS(100), plus: PASS_ITEM('explosions', 'boom') },
  { tier: 11, free: PASS_COINS(110), plus: PASS_COINS(240) },
  { tier: 12, free: PASS_COINS(110), plus: PASS_LEGACY('OBSIDIAN') },
  { tier: 13, free: PASS_COINS(120), plus: PASS_ITEM('skins', 'guardian') },
  { tier: 14, free: PASS_ITEM('explosions', 'toxic'), plus: PASS_COINS(300) },
  { tier: 15, free: PASS_COINS(130), plus: PASS_ITEM('trails', 'ice') },
  { tier: 16, free: PASS_COINS(140), plus: PASS_COINS(320) },
  { tier: 17, free: PASS_ITEM('trails', 'leaf'), plus: PASS_ITEM('skins', 'arctic') },
  { tier: 18, free: PASS_COINS(150), plus: PASS_ITEM('skins', 'fusion') },
  { tier: 19, free: PASS_COINS(160), plus: PASS_COINS(380) },
  { tier: 20, free: PASS_ITEM('bombs', 'supernova'), plus: PASS_ITEM('explosions', 'bluefire') },
  { tier: 21, free: PASS_COINS(170), plus: PASS_ITEM('trails', 'comet') },
  { tier: 22, free: PASS_COINS(180), plus: PASS_COINS(420) },
  { tier: 23, free: PASS_ITEM('explosions', 'solar'), plus: PASS_ITEM('avatars', 'wolf') },
  { tier: 24, free: PASS_COINS(200), plus: PASS_ITEM('explosions', 'pulse') },
  { tier: 25, free: PASS_ITEM('trails', 'sonic'), plus: PASS_COINS(500) },
  { tier: 26, free: PASS_COINS(220), plus: PASS_ITEM('skins', 'dragonlord') },
  { tier: 27, free: PASS_COINS(240), plus: PASS_ITEM('avatars', 'dragon') },
  { tier: 28, free: PASS_ITEM('bombs', 'golddragon'), plus: PASS_ITEM('trails', 'phoenix') },
  { tier: 29, free: PASS_COINS(300), plus: PASS_COINS(700) },
  { tier: 30, free: PASS_ITEM('explosions', 'supernova'), plus: PASS_ITEM('skins', 'cosmic') }
];
function seasonState() {
  if (!prefs.season || typeof prefs.season !== 'object') prefs.season = {};
  const s = prefs.season;
  if (!s.claimed || typeof s.claimed !== 'object') s.claimed = {};
  if (!Number.isFinite(s.xp)) s.xp = 0;
  if (!Number.isFinite(s.dayXp)) s.dayXp = 0;
  const day = dayKey();
  if (s.day !== day) { s.day = day; s.dayXp = 0; }
  return s;
}
function seasonLevel() {
  return Math.min(SEASON_PASS_TIERS_COUNT, Math.floor(seasonState().xp / SEASON_PASS_TIER_COST));
}
function seasonInto() { return seasonState().xp % SEASON_PASS_TIER_COST; }
function addSeasonXp(amount) {
  const s = seasonState();
  const left = Math.max(0, SEASON_PASS_DAILY_CAP - s.dayXp);
  const gain = Math.max(0, Math.min(Math.round(amount), left));
  if (!gain) return 0;
  const before = seasonLevel();
  s.dayXp += gain;
  s.xp += gain;
  savePrefs({ season: s });
  if (seasonLevel() > before) {
    showToast(currentLang === 'en'
      ? `🎫 Pass tier ${seasonLevel()} unlocked!`
      : `🎫 Passe: nível ${seasonLevel()} liberado!`);
  }
  return gain;
}
function plusPassUnlocked() { return levelInfo().level >= SEASON_PLUS_LEVEL; }
function seasonClaimed(tier, track) {
  return !!seasonState().claimed[`${tier}-${track}`];
}
function seasonRewardRarity(reward) {
  if (!reward) return '';
  if (reward.type === 'cosmetic') return getCosmetic(reward.kind, reward.id).rarity || '';
  if (reward.type === 'legacySkin') return 'epic';
  return '';
}
function seasonRewardLabel(reward, en) {
  if (reward.type === 'coins') return `💰 ${reward.amount}`;
  if (reward.type === 'legacySkin') return `🎁 ${getSkin(reward.id).name}`;
  return `🎁 ${getCosmetic(reward.kind, reward.id).name}`;
}
function claimSeasonReward(tier, track) {
  const row = SEASON_PASS_REWARDS.find(t => t.tier === tier);
  if (!row) return;
  const en = currentLang === 'en';
  if (seasonLevel() < tier) { showToast(en ? `🔒 Reach pass tier ${tier}` : `🔒 Alcança o nível ${tier} do passe`); return; }
  if (track === 'plus' && !plusPassUnlocked()) { showToast(en ? `🔒 Plus Pass unlocks at account level ${SEASON_PLUS_LEVEL}` : `🔒 Passe Plus libera no nível ${SEASON_PLUS_LEVEL}`); return; }
  const s = seasonState();
  if (s.claimed[`${tier}-${track}`]) return;
  const reward = row[track];
  s.claimed[`${tier}-${track}`] = true;
  if (reward.type === 'coins') {
    GameState.addCoins(reward.amount);
    showToast(`💰 +${reward.amount} ${en ? 'coins' : 'moedas'}`);
  } else if (reward.type === 'cosmetic') {
    const item = getCosmetic(reward.kind, reward.id);
    const isNew = GameState.grant(reward.kind, reward.id);
    const rarity = item.rarity ? ` (${en ? rarityMeta(item.rarity).labelEn : rarityMeta(item.rarity).label})` : '';
    showToast(`🎁 ${item.name}${rarity}${isNew ? '' : (en ? ' — already owned' : ' — já possuída')}`);
  } else if (reward.type === 'legacySkin') {
    prefs.ownedSkins[reward.id] = true;
    showToast(`🎁 Skin ${getSkin(reward.id).name}`);
  }
  savePrefs({ season: s, ownedSkins: prefs.ownedSkins });
  updateCareerUI();
  renderProgress();
  renderSkins();
  if (typeof renderShop === 'function') renderShop();
}

/* ---------- Evento do dia ---------- */
const DAILY_EVENTS = [
  { id: 'xp2', icon: '✨', name: 'Dobro de XP', desc: 'Todo XP ganho hoje vale 2x.', nameEn: 'Double XP', descEn: 'All XP earned today counts 2x.', mods: { xp: 2 } },
  { id: 'stormslow', icon: '🐢', name: 'Zona Calma', desc: 'A zona fecha 25% mais devagar.', nameEn: 'Calm Zone', descEn: 'The zone closes 25% slower.', mods: { storm: 1.25 } },
  { id: 'bombs', icon: '💣', name: 'Festa de Bombas', desc: 'Comece cada partida com 2 bombas.', nameEn: 'Bomb Party', descEn: 'Start every match with 2 bombs.', mods: { bombs: 2 } },
  { id: 'loot', icon: '🎁', name: 'Caixa Premiada', desc: 'Caixas soltam itens com o dobro de frequência.', nameEn: 'Prize Crate', descEn: 'Crates drop items twice as often.', mods: { loot: 2 } }
];
function eventText(ev) {
  const en = currentLang === 'en';
  return { name: (en && ev.nameEn) || ev.name, desc: (en && ev.descEn) || ev.desc };
}
function dailyEvent() {
  const day = dayKey();
  if (prefs.eventDay !== day || !DAILY_EVENTS.some(e => e.id === prefs.eventId)) {
    prefs.eventDay = day;
    prefs.eventId = DAILY_EVENTS[daySeed() % DAILY_EVENTS.length].id;
    savePrefs({});
  }
  return DAILY_EVENTS.find(e => e.id === prefs.eventId) || DAILY_EVENTS[0];
}

/* ---------- XP ---------- */
function addXp(raw, source = 'Partida', opts = {}) {
  const ev = dailyEvent();
  const rot = rotatingEvent();
  const mult = ev && ev.mods.xp ? ev.mods.xp : 1;
  // Hora do Passe dobra o XP; recompensas fixas do evento usam opts.raw
  // para entregar exatamente o valor prometido.
  const eventMult = rot && rot.id === 'pass' ? 2 : 1;
  const amount = Math.max(1, Math.round(raw * (opts.raw ? 1 : mult * eventMult)));
  const before = levelInfo();
  prefs.xp = (prefs.xp || 0) + amount;
  savePrefs({});
  const after = levelInfo();
  // Recompensas do próprio passe não alimentam a XP do passe (sem bola de neve).
  if (source !== 'Passe') addSeasonXp(amount * SEASON_PASS_XP_FACTOR);
  if (after.level > before.level) {
    showToast(`🎉 Nível ${after.level}! Novas recompensas liberadas`);
    SFX.playChromaCorrect();
    if (after.level >= SEASON_PLUS_LEVEL && before.level < SEASON_PLUS_LEVEL) {
      setTimeout(() => showToast('🎫 Passe Plus liberado! Resgate no Passe de Temporada'), 1800);
    }
  }
  updateCareerUI();
  if (lobbyTab === 'progress' || lobbyTab === 'hero') renderProgress();
  renderSkins();
  return amount;
}

/* ---------- Missões diárias ---------- */
const MISSION_POOL = [
  { id: 'win1', icon: '🏆', desc: 'Vença 1 partida', descEn: 'Win 1 match', target: 1, metric: 'wins', xp: 140 },
  { id: 'kills5', icon: '💀', desc: 'Elimine 5 rivais', descEn: 'Take down 5 rivals', target: 5, metric: 'kills', xp: 120 },
  { id: 'matches3', icon: '🎮', desc: 'Jogue 3 partidas', descEn: 'Play 3 matches', target: 3, metric: 'matches', xp: 90 },
  { id: 'top3', icon: '🥉', desc: 'Termine no Top 3 em 2 partidas', descEn: 'Finish Top 3 in 2 matches', target: 2, metric: 'top3', xp: 120 },
  { id: 'crates15', icon: '📦', desc: 'Quebre 15 caixas', descEn: 'Break 15 crates', target: 15, metric: 'crates', xp: 100 },
  { id: 'survive90', icon: '⏱️', desc: 'Sobreviva 90s em uma partida', descEn: 'Survive 90s in one match', target: 1, metric: 'survive90', xp: 100 },
  { id: 'tactical5', icon: '🌀', desc: 'Use 5 bombas táticas', descEn: 'Use 5 tactical bombs', target: 5, metric: 'tactical', xp: 90 },
  { id: 'chroma3', icon: '🎨', desc: 'Passe 3 rodadas no Chroma Drop', descEn: 'Clear 3 rounds in Chroma Drop', target: 3, metric: 'chroma', xp: 100 }
];
function missionText(def) {
  return (currentLang === 'en' && def.descEn) || def.desc;
}
function rollMissions() {
  const day = dayKey();
  if (prefs.missions.day === day && prefs.missions.list.length === 3) return;
  const pool = MISSION_POOL.slice();
  const seed = daySeed();
  const picked = [];
  for (let i = 0; i < 3; i++) {
    const idx = (seed + i * 37 + i * i * 11) % pool.length;
    picked.push({ id: pool[idx].id, progress: 0, done: false });
    pool.splice(idx, 1);
  }
  prefs.missions = { day, list: picked };
  savePrefs({});
}
function missionDef(id) { return MISSION_POOL.find(m => m.id === id); }
function missionProgress(metric, amount = 1) {
  if (!amount) return;
  rollMissions();
  let changed = false;
  prefs.missions.list.forEach(m => {
    const def = missionDef(m.id);
    if (!def || def.metric !== metric || m.done) return;
    m.progress = Math.min(def.target, (m.progress || 0) + amount);
    if (m.progress >= def.target) {
      m.done = true;
      changed = true;
      showToast(currentLang === 'en'
        ? `${def.icon} Mission complete: +${def.xp} XP`
        : `${def.icon} Missão concluída: +${def.xp} XP`);
      addXp(def.xp, 'Missão');
    }
  });
  if (changed) savePrefs({ missions: prefs.missions });
  if (lobbyTab === 'progress') renderProgress();
}

/* ---------- Ranking local ---------- */
function matchScore(result) {
  const rank = result.win ? 1 : (result.rank || match.humanRank || fighters.length || 12);
  const time = result.time || 0;
  return Math.round((result.win ? 900 : Math.max(0, 320 - rank * 22)) + (result.kills || 0) * 110 + Math.min(120, time * 2));
}
function addRankingEntry(result) {
  if (match.demoMode) return;
  const entry = {
    name: (prefs.name || (I18N[currentLang] || {}).nickFallback || 'JOGADOR'),
    score: matchScore(result),
    kills: result.kills || 0,
    win: !!result.win,
    rank: result.win ? 1 : (match.humanRank || fighters.length),
    total: fighters.length || 12,
    mode: match.mode,
    map: match.mapId,
    time: Math.round(match.elapsedTime || 0),
    ts: Date.now(),
    level: levelInfo().level
  };
  prefs.ranking = [entry, ...(prefs.ranking || [])]
    .sort((a, b) => b.score - a.score || b.ts - a.ts)
    .slice(0, 20);
  savePrefs({ ranking: prefs.ranking });
}

function awardMatchProgress(result, summary) {
  const rank = result.win ? 1 : (match.humanRank || fighters.length);
  const time = result.time || 0;
  // Base do XP segue a economia nova: +2 (vitória contra bots, até 5/dia),
  // +15/+5 (ONLINE) ou o que o resumo da partida calcular. Missões e Passe
  // continuam sendo as grandes fontes de XP.
  const base = summary && Number.isFinite(summary.xp) ? summary.xp : 0;
  const gained = base > 0 ? addXp(base, 'Partida') : 0;
  missionProgress('matches', 1);
  if (result.win) missionProgress('wins', 1);
  if ((result.kills || 0) > 0) missionProgress('kills', result.kills);
  if (rank <= 3) missionProgress('top3', 1);
  if (time >= 90) missionProgress('survive90', 1);
  addRankingEntry(result);
  match.lastXp = gained;
  return gained;
}

function updateEndXpLine() {
  const el = document.getElementById('endXpLine');
  if (!el) return;
  const lv = levelInfo();
  const gained = match.lastXp || 0;
  const en = currentLang === 'en';
  el.textContent = en
    ? (lv.maxed
      ? `⭐ +${gained} XP  ·  Level ${lv.level} (MAX)`
      : `⭐ +${gained} XP  ·  Level ${lv.level} (${lv.into}/${lv.need})`)
    : (lv.maxed
      ? `⭐ +${gained} XP  ·  Nível ${lv.level} (MÁXIMO)`
      : `⭐ +${gained} XP  ·  Nível ${lv.level} (${lv.into}/${lv.need})`);
}

function isCompetitiveEnd() {
  if (spectate.active) return true;
  if (match.mode === 'ONLINE' || match.netRole) return true;
  return match.mode === 'DUEL' && (duel.kind === 'bracket' || duel.kind === 'copa' || duel.kind === 'league');
}

function applyEndButtons(competitive, keepRematch = false) {
  if (UI.btnPlayAgain) {
    UI.btnPlayAgain.style.display = competitive && !keepRematch ? 'none' : '';
    UI.btnPlayAgain.classList.toggle('btn-lobby-secondary', !!competitive && keepRematch);
  }
  const lobbyBtn = document.getElementById('btnBackToMenu');
  if (lobbyBtn) lobbyBtn.classList.toggle('btn-lobby-primary', !!competitive);
}

function updateEndLeagueLine(summary) {
  const el = document.getElementById('endLeagueLine');
  const train = document.getElementById('endTrainingLine');
  if (!summary) {
    if (el) { el.textContent = ''; el.classList.add('hidden'); }
    if (train) { train.textContent = ''; train.classList.add('hidden'); }
    return;
  }
  const dict = I18N[currentLang] || I18N.pt;
  if (!summary.competitive) {
    if (el) { el.textContent = ''; el.classList.add('hidden'); }
    if (train) {
      const coins = summary.coins || 0;
      const xp = summary.xp || 0;
      train.textContent = summary.botCapped
        ? (dict.endTrainingCap || '🚫 Limite de 5 vitórias contra bots por dia — jogue ONLINE para mais recompensas.')
        : (dict.endTraining || '💰 +{c} MOEDAS · ⭐ +{x} XP · Treino Offline • Não vale pontos na Liga')
          .replace('{c}', coins).replace('{x}', xp);
      train.classList.remove('hidden');
    }
    return;
  }
  if (train) { train.textContent = ''; train.classList.add('hidden'); }
  if (!el) return;
  const pts = (dict.endLeaguePts || '{n} PTS NA LIGA').replace('{n}', summary.points);
  const delta = `${summary.delta > 0 ? '+' : ''}${summary.delta} 🏆`;
  const coins = (dict.endMatchCoins || '💰 +{c}').replace('{c}', summary.coins || 0);
  // Só partidas ONLINE mostram pontos da Liga; mata-mata/Copa mostram troféus.
  let text = summary.league ? `${pts} • ${delta} • ${coins}` : `${delta} • ${coins}`;
  if (summary.bonus > 0) text += ` (${dict.endTrophyBonus || 'Bônus de desempenho'}: +${summary.bonus} 🏆)`;
  el.textContent = text;
  el.classList.remove('hidden');
}

/* ---------- UI de progresso ---------- */
let progressTab = 'missions';

function progressTabButtons() {
  document.querySelectorAll('[data-progress-tab]').forEach(btn => {
    const on = btn.dataset.progressTab === progressTab;
    btn.classList.toggle('active', on);
  });
  document.querySelectorAll('[data-progress-body]').forEach(el => {
    const on = el.dataset.progressBody === progressTab;
    el.classList.toggle('hidden', !on);
  });
}

function renderProgress() {
  rollMissions();
  const lv = levelInfo();
  const ev = dailyEvent();
  const en = currentLang === 'en';
  const lvlNum = document.getElementById('levelNum');
  const lvlBadge = document.getElementById('levelBadge');
  const lvlText = document.getElementById('levelXpText');
  const lvlBar = document.getElementById('levelXpBar');
  const seasonName = document.getElementById('seasonName');
  const eventLine = document.getElementById('eventLine');
  const evIcon = document.getElementById('eventIcon');
  const evName = document.getElementById('eventName');
  const evDesc = document.getElementById('eventDesc');
  if (lvlNum) lvlNum.textContent = lv.level;
  if (lvlBadge) lvlBadge.textContent = lv.level;
  if (lvlText) lvlText.textContent = lv.maxed
    ? (en ? `Max level reached · ${lv.total} total XP` : `Nível máximo alcançado · ${lv.total} XP total`)
    : (en
      ? `${lv.into} / ${lv.need} XP to level ${Math.min(MAX_LEVEL, lv.level + 1)}`
      : `${lv.into} / ${lv.need} XP para o nível ${Math.min(MAX_LEVEL, lv.level + 1)}`);
  if (lvlBar) lvlBar.style.width = lv.maxed ? '100%' : `${Math.min(100, Math.round((lv.into / lv.need) * 100))}%`;
  if (seasonName) seasonName.textContent = en ? 'Season 1 · Neon Rift' : SEASON_NAME;
  if (eventLine) eventLine.textContent = plusPassUnlocked()
    ? (en ? '🎫 Plus Pass active' : '🎫 Passe Plus ativo')
    : (en ? `🎫 Plus at level ${SEASON_PLUS_LEVEL}` : `🎫 Plus no nível ${SEASON_PLUS_LEVEL}`);
  const evt = eventText(ev);
  if (evIcon) evIcon.textContent = ev.icon;
  if (evName) evName.textContent = evt.name;
  if (evDesc) evDesc.textContent = evt.desc;

  const missionsEl = document.querySelector('[data-progress-body="missions"]');
  if (missionsEl) {
    missionsEl.innerHTML = prefs.missions.list.map(m => {
      const def = missionDef(m.id);
      if (!def) return '';
      const pct = Math.min(100, Math.round((m.progress / def.target) * 100));
      return `<div class="prog-row${m.done ? ' done' : ''}">
        <span class="prog-row-icon">${def.icon}</span>
        <div class="prog-row-main">
          <div class="prog-row-top"><span>${missionText(def)}</span><span class="prog-row-xp">+${def.xp} XP</span></div>
          <div class="prog-bar"><div class="prog-bar-fill" style="width:${pct}%"></div></div>
          <div class="prog-row-sub">${m.done ? (en ? '✓ Completed' : '✓ Concluída') : `${m.progress} / ${def.target}`}</div>
        </div>
      </div>`;
    }).join('');
  }

  const seasonEl = document.querySelector('[data-progress-body="season"]');
  if (seasonEl) {
    const plusOn = plusPassUnlocked();
    const s = seasonState();
    const passLvl = seasonLevel();
    const into = seasonInto();
    const pct = Math.min(100, Math.round((into / SEASON_PASS_TIER_COST) * 100));
    const head = `<div class="season-head"><div>
      <b>${en ? 'Season 1 · Neon Rift' : SEASON_NAME}</b>
      <span>${en
        ? `Pass tier ${passLvl}/${SEASON_PASS_TIERS_COUNT} · ${into}/${SEASON_PASS_TIER_COST} XP to the next`
        : `Nível ${passLvl}/${SEASON_PASS_TIERS_COUNT} · ${into}/${SEASON_PASS_TIER_COST} XP para o próximo`}</span>
      <span>${en
        ? `Pass XP today: ${s.dayXp}/${SEASON_PASS_DAILY_CAP} (daily cap)`
        : `XP do passe hoje: ${s.dayXp}/${SEASON_PASS_DAILY_CAP} (teto diário)`}</span>
      </div><span class="season-badge${plusOn ? ' on' : ''}">PLUS ${plusOn ? 'ON' : 'OFF'}</span></div>
      <div class="prog-bar season-pass-bar"><div class="prog-bar-fill" style="width:${pct}%"></div></div>`;
    const rows = SEASON_PASS_REWARDS.map(row => {
      const unlocked = passLvl >= row.tier;
      const freeClaimed = seasonClaimed(row.tier, 'free');
      const plusClaimed = seasonClaimed(row.tier, 'plus');
      const rewardChip = (track, reward) => {
        const claimed = track === 'free' ? freeClaimed : plusClaimed;
        const locked = !unlocked || (track === 'plus' && !plusOn);
        const rarity = seasonRewardRarity(reward);
        const legend = rarity === 'mythic' ? ' mythic' : (rarity === 'legendary' ? ' legend' : '');
        const label = seasonRewardLabel(reward, en);
        return `<button type="button" class="season-reward${claimed ? ' claimed' : ''}${locked ? ' locked' : ''}${legend}" data-claim="${row.tier}-${track}" ${claimed ? 'disabled' : ''}>
          <span class="season-track">${track === 'free' ? (en ? 'FREE' : 'GRÁTIS') : 'PLUS'}</span>
          <span class="season-label">${claimed ? (en ? '✓ Claimed' : '✓ Resgatado') : (locked ? '🔒 ' : '') + label}</span>
        </button>`;
      };
      return `<div class="season-tier${unlocked ? ' unlocked' : ''}">
        <div class="season-tier-num">${unlocked ? row.tier : '🔒'}<span>${en ? 'T' : 'N'} ${row.tier}</span></div>
        <div class="season-tier-rewards">${rewardChip('free', row.free)}${rewardChip('plus', row.plus)}</div>
      </div>`;
    }).join('');
    seasonEl.innerHTML = head + rows;
  }

  const rankEl = document.querySelector('[data-progress-body="ranking"]');
  if (rankEl) {
    const list = prefs.ranking || [];
    const summary = `<div class="rank-summary">
      <div><b>${prefs.wins || 0}</b><span>${en ? 'wins' : 'vitórias'}</span></div>
      <div><b>${prefs.kills || 0}</b><span>${en ? 'eliminations' : 'eliminações'}</span></div>
      <div><b>${prefs.matches || 0}</b><span>${en ? 'matches' : 'partidas'}</span></div>
      <div><b>${lv.level}</b><span>${en ? 'level' : 'nível'}</span></div>
    </div>`;
    const rows = list.length
      ? list.map((e, i) => {
          const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`;
          const mapName = getMap(e.map).name;
          const date = new Date(e.ts).toLocaleDateString(en ? 'en-US' : 'pt-BR', { day: '2-digit', month: '2-digit' });
          return `<div class="rank-row${i < 3 ? ' top' : ''}">
            <span class="rank-pos">${medal}</span>
            <div class="rank-main">
              <div class="rank-name">${escapeHtml(e.name)} <span class="rank-tag">${e.win ? (en ? '👑 WIN' : '👑 VITÓRIA') : `#${e.rank}/${e.total}`}</span></div>
              <div class="rank-sub">${e.mode} · ${mapName} · ${e.kills} ${en ? 'kills' : 'kills'} · ${formatTime(e.time)} · ${date}</div>
            </div>
            <span class="rank-score">${e.score}</span>
          </div>`;
        }).join('')
      : `<p class="rank-empty">${en ? 'Play a match to enter the local ranking.' : 'Jogue uma partida para entrar no ranking local.'}</p>`;
    rankEl.innerHTML = summary + `<div class="rank-list">${rows}</div>`;
  }
  progressTabButtons();
}

function renderSkins() {
  const el = document.getElementById('skinsGrid');
  if (!el) return;
  const en = currentLang === 'en';
  const lv = levelInfo().level;
  el.innerHTML = SKINS.map(sk => {
    const unlocked = skinUnlocked(sk);
    const equipped = prefs.skin === sk.id;
    let req = '';
    if (!unlocked) {
      if (sk.level) req = en ? `Level ${sk.level}` : `Nível ${sk.level}`;
      else if (sk.seasonTier) req = en ? `Plus Pass · Tier ${sk.seasonTier}` : `Passe Plus · Tier ${sk.seasonTier}`;
    }
    return `<button type="button" class="skin-card${equipped ? ' equipped' : ''}${unlocked ? '' : ' locked'}" data-skin="${sk.id}" ${unlocked ? '' : 'disabled'}>
      <span class="skin-preview" style="--sk-body:${sk.body};--sk-accent:${sk.accent};--sk-visor:${sk.visor}">
        <span class="skin-figure"><i class="skin-eye"></i></span>
      </span>
      <span class="skin-name">${sk.name}</span>
      <span class="skin-sub">${equipped ? (en ? '✓ Equipped' : '✓ Equipada') : (unlocked ? (en ? 'Tap to equip' : 'Toque para equipar') : `🔒 ${req}`)}</span>
    </button>`;
  }).join('');
}

/* ---------- Toast ---------- */
function showToast(text) {
  const el = document.getElementById('gameToast');
  if (!el) return;
  el.textContent = text;
  el.classList.remove('hidden');
  el.classList.add('toast-in');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    el.classList.add('hidden');
    el.classList.remove('toast-in');
  }, 2800);
}

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
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
  if (tutorial.active) renderTutorialCard();
  const nickPh = dict.nickPlaceholder || (lang === 'en' ? 'Type your nick...' : 'Digite seu nick...');
  ['playerNameInput', 'profileNickInput', 'nickModalInput'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.placeholder = nickPh;
  });
  if (document.getElementById('leagueTable')) {
    renderLeague(); renderBracket(); renderCopa(); renderProfile();
  }
  if (document.getElementById('levelNum')) renderProgress();
  if (document.getElementById('achievementsList')) renderAchievementsModal();
  if (document.getElementById('skinsGrid')) renderSkins();
  if (typeof refreshLobbyHeader === 'function' && document.getElementById('lobbyTopNick')) refreshLobbyHeader();
  if (netServer.checked) netServerUI();
  if (window.FirebaseSync && window.FirebaseSync.refreshText) window.FirebaseSync.refreshText();
}

/* ========================================================================
   6. DOM REFERENCES & GAME STATE
   ======================================================================== */
const canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
const radarCanvas = document.getElementById('radarCanvas');
const rctx = radarCanvas.getContext('2d');

const UI = {
  hud: document.getElementById('hudLayer'),
  startScreen: document.getElementById('startScreen'),
  endModal: document.getElementById('endModal'),
  hearts: document.getElementById('hudHearts'),
  alive: document.getElementById('hudAlive'),
  time: document.getElementById('hudTime'),
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
  endTime: document.getElementById('endTimeVal'),
  pauseModal: document.getElementById('pauseModal'),
  pauseSubtitle: document.getElementById('pauseSubtitle')
};

let grid = [];
let fighters = [];
let bombs = [];
let explosions = [];
let powerups = [];
let particles = [];
/* Rastros de chão dos cosméticos (~1,2s de vida). Gerados a partir das
   posições sincronizadas, então host e convidado veem o mesmo caminho. */
let trails = [];
const TRAIL_LIFE = 1.2;
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
  running: false, demoMode: true, ended: false, paused: false,
  mode: 'SOLO', mapId: 'NEON', theme: null,
  netRole: null, myControl: 'p1', localControls: ['p1'],
  elapsedTime: 0, safeRing: 1, stormInterval: 25, stormTimer: 25, stormTick: 0,
  stormWarning: false, warningDuration: 4.5, airdropTimer: 20,
  shake: 0, shakeEnabled: true, humanRank: 12, demoRestart: 0, hitFlash: 0, lastDeath: null,
  humanSurvived: null, eventMode: false, eventGoldSpawned: false
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
  { id: 'NEON', name: 'Neon Grid', emoji: '🌐', accent: '#38bdf8', floor: ['#101a2c', '#0d1524'], layout: 'pillars', crate: 0.5, bush: 0.55, bushBand: true, deco: 'circuit', ground: 'circuit', props: 'conduit', pillarStyle: 'tech', crateStyle: 'neon', bushStyle: 'leaf', ambience: 'spark', border: 'tech', glow: 'rgba(56,189,248,0.12)', pillar: ['#1e293b', '#334155', '#475569'] },
  { id: 'DUNES', name: 'Dunas', emoji: '🏜️', accent: '#fbbf24', floor: ['#241a12', '#1d150f'], layout: 'open', crate: 0.4, bush: 0.7, bushBand: true, deco: 'sand', ground: 'sand', props: 'desert', pillarStyle: 'sandstone', crateStyle: 'wood', bushStyle: 'dry', ambience: 'sand', border: 'sand', glow: 'rgba(251,191,36,0.09)', pillar: ['#3f2d1e', '#5b422b', '#8a6135'] },
  { id: 'FROST', name: 'Geleira', emoji: '❄️', accent: '#67e8f9', floor: ['#0f2027', '#0b1a20'], layout: 'maze', crate: 0.48, bush: 0.4, bushBand: false, deco: 'ice', ground: 'ice', props: 'ice', pillarStyle: 'ice', crateStyle: 'ice', bushStyle: 'snow', ambience: 'snow', border: 'ice', hazard: 'ice', glow: 'rgba(103,232,249,0.10)', pillar: ['#1b3a44', '#2c5a68', '#7dd3fc'] },
  { id: 'EMBER', name: 'Vulcão', emoji: '🌋', accent: '#fb7185', floor: ['#201016', '#180b10'], layout: 'blocks', crate: 0.55, bush: 0.3, bushBand: false, deco: 'lava', ground: 'lava', props: 'volcano', pillarStyle: 'obsidian', crateStyle: 'obsidian', bushStyle: 'charred', ambience: 'ember', border: 'lava', hazard: 'lava', glow: 'rgba(251,113,133,0.11)', pillar: ['#30141c', '#4a1e28', '#9f1239'] },
  { id: 'JUNGLE', name: 'Selva', emoji: '🌿', accent: '#34d399', floor: ['#0d1f16', '#0a1811'], layout: 'islands', crate: 0.34, bush: 0.75, bushBand: true, deco: 'leaf', ground: 'leaf', props: 'forest', pillarStyle: 'tree', crateStyle: 'bamboo', bushStyle: 'jungle', ambience: 'firefly', border: 'jungle', glow: 'rgba(52,211,153,0.10)', pillar: ['#1f3a2a', '#2f5238', '#4ade80'] },
  { id: 'SAKURA', name: 'Sakura', emoji: '🌸', accent: '#f9a8d4', floor: ['#201426', '#180f1e'], layout: 'ring', crate: 0.44, bush: 0.3, bushBand: false, deco: 'petal', ground: 'petal', props: 'shrine', pillarStyle: 'lantern', crateStyle: 'wood', bushStyle: 'blossom', ambience: 'petal', border: 'shrine', glow: 'rgba(249,168,212,0.13)', pillar: ['#3b2347', '#553166', '#e9a8d0'] },
  { id: 'METRO', name: 'Metrópole', emoji: '🏙️', accent: '#a78bfa', floor: ['#14121f', '#0f0d18'], layout: 'cross', crate: 0.5, bush: 0.35, bushBand: true, deco: 'circuit', ground: 'asphalt', props: 'city', pillarStyle: 'building', crateStyle: 'metal', bushStyle: 'citybush', ambience: 'rain', border: 'concrete', glow: 'rgba(167,139,250,0.13)', pillar: ['#231f38', '#332c52', '#8b7bd8'] },
  { id: 'PORTO', name: 'Porto', emoji: '⚓', accent: '#2dd4bf', floor: ['#101c22', '#0c151a'], layout: 'islands', crate: 0.46, bush: 0.3, bushBand: false, deco: 'plank', ground: 'plank', props: 'harbor', pillarStyle: 'container', crateStyle: 'dock', bushStyle: 'reed', ambience: 'spray', border: 'water', hazard: 'water', glow: 'rgba(45,212,191,0.10)', pillar: ['#1c3b3f', '#2c5a5c', '#5eead4'] },
  { id: 'ORBIT', name: 'Estação', emoji: '🛰️', accent: '#c084fc', floor: ['#12131f', '#0d0e18'], layout: 'ring', crate: 0.5, bush: 0.24, bushBand: false, deco: 'panel', ground: 'panel', props: 'orbit', pillarStyle: 'bulkhead', crateStyle: 'pod', bushStyle: 'vent', ambience: 'dust', border: 'space', hazard: 'lowgrav', glow: 'rgba(192,132,252,0.10)', pillar: ['#241f38', '#3a3158', '#a78bfa'] }
];

function getMap(id) { return MAPS.find(m => m.id === id) || MAPS[0]; }

/* ---- Perigos de cenário ----
   Cada mapa pode ter uma regra de terreno própria. 'ice' e 'lowgrav' valem
   para a arena inteira; 'lava' e 'water' aparecem em células determinísticas
   (hash por coordenada), então host e convidado online concordam sem enviar
   nada pela rede. No duelo 15×15 o hash usa o espelho da coordenada para
   manter a arena simétrica e justa. */
const HAZARD_INFO = {
  lava: { icon: '🌋', pt: 'LAVA QUEIMA', en: 'LAVA BURNS', warnPt: 'SAIA DA LAVA!', warnEn: 'GET OFF THE LAVA!', color: '#fb923c' },
  water: { icon: '🌊', pt: 'ÁGUA ATRASA', en: 'WATER SLOWS', color: '#2dd4bf' },
  ice: { icon: '❄️', pt: 'GELO ESCORREGA', en: 'ICE IS SLIPPERY', color: '#67e8f9' },
  lowgrav: { icon: '🛰️', pt: 'BAIXA GRAVIDADE', en: 'LOW GRAVITY', color: '#c084fc' }
};
function mapHazard() {
  const theme = match.theme || MAPS[0];
  return theme.hazard || null;
}
function hazardCellType(c, r) {
  const hz = mapHazard();
  if (hz !== 'lava' && hz !== 'water') return null;
  if (!inBounds(c, r)) return null;
  if (c <= 0 || r <= 0 || c >= GRID_SIZE - 1 || r >= GRID_SIZE - 1) return null;
  if (grid[r][c] !== CELL.FLOOR) return null;
  if (safeSpawnSet.has(`${c},${r}`)) return null;
  const cc = GRID_SIZE <= 15 ? Math.min(c, GRID_SIZE - 1 - c) : c;
  const rr = GRID_SIZE <= 15 ? Math.min(r, GRID_SIZE - 1 - r) : r;
  const h = tileHash(cc + 17, rr + 31);
  if (hz === 'lava') return h < 0.045 ? 'lava' : null;
  return h < 0.07 ? 'water' : null;
}


/* Texturas opcionais dos biomas: se o arquivo não existir, o piso procedural
   do mapa continua valendo. Elas não fazem parte do pacote, então o preload
   fica desligado por padrão para não gerar 5 erros 404 no console. Ative
   quando adicionar os arquivos em assets/maps/. */
const BIOME_TEXTURES_ENABLED = false;
/* O botão "+200 moedas" é uma ferramenta de teste. Ele só aparece em builds
   de desenvolvimento (?dev=1), para não dar moedas de graça ao jogador. */
const DEV_MODE = /(?:^|[?&])dev=1(?:&|$)/.test(location.search);
const BIOMES = { quatro_nucleos: 'NEON', selva: 'JUNGLE', cristal: 'FROST', vulcao: 'EMBER', oasis: 'SAKURA' };
const BIOME_TEXTURE = {};
function loadBiomeTextures() {
  if (!BIOME_TEXTURES_ENABLED) return;
  Object.keys(BIOMES).forEach(key => {
    const img = new Image();
    img.onload = () => { BIOME_TEXTURE[key] = { img, ok: true }; markGridDirty(); };
    img.onerror = () => { BIOME_TEXTURE[key] = { img: null, ok: false }; };
    img.src = `assets/maps/${key}.jpg`;
  });
}
function biomeImageFor(mapId) {
  const key = Object.keys(BIOMES).find(k => BIOMES[k] === mapId);
  const entry = key ? BIOME_TEXTURE[key] : null;
  return entry && entry.ok ? entry.img : null;
}


let SPAWN_COORDS = [];
let SPAWN_P1 = { c: 0, r: 0 };
let SPAWN_P2 = { c: 0, r: 0 };
function rebuildSpawns() {
  if (GRID_SIZE <= 15) {
    SPAWN_P1 = { c: 2, r: 2 };
    SPAWN_P2 = { c: GRID_SIZE - 3, r: GRID_SIZE - 3 };
    SPAWN_COORDS = [
      { c: 2, r: 2 }, { c: GRID_SIZE - 3, r: GRID_SIZE - 3 },
      { c: GRID_SIZE - 3, r: 2 }, { c: 2, r: GRID_SIZE - 3 },
      { c: GRID_MID, r: 2 }, { c: GRID_MID, r: GRID_SIZE - 3 },
      { c: 2, r: GRID_MID }, { c: GRID_SIZE - 3, r: GRID_MID }
    ];
    return;
  }
  SPAWN_P1 = { c: GRID_MID - 7, r: GRID_MID };
  SPAWN_P2 = { c: GRID_MID + 7, r: GRID_MID };
  SPAWN_COORDS = [
    { c: 3, r: 3 }, { c: GRID_MID, r: 3 }, { c: GRID_SIZE - 4, r: 3 },
    { c: GRID_MID - 7, r: 3 }, { c: GRID_MID + 7, r: 3 },
    { c: 3, r: GRID_MID - 6 }, { c: GRID_SIZE - 4, r: GRID_MID - 6 },
    { c: GRID_MID - 7, r: GRID_MID }, { c: GRID_MID + 7, r: GRID_MID },
    { c: 3, r: GRID_MID + 6 }, { c: GRID_SIZE - 4, r: GRID_MID + 6 },
    { c: 3, r: GRID_SIZE - 4 }, { c: GRID_MID, r: GRID_SIZE - 4 }, { c: GRID_SIZE - 4, r: GRID_SIZE - 4 },
    { c: GRID_MID - 7, r: GRID_SIZE - 4 }, { c: GRID_MID + 7, r: GRID_SIZE - 4 }
  ];
}
function applyGridSize(n) {
  GRID_SIZE = n;
  GRID_MID = (n - 1) / 2;
  MAX_RING = Math.floor((n - 5) / 2);
  WORLD_PX = n * TILE_SIZE;
  rebuildSpawns();
  markGridDirty();
}
rebuildSpawns();
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
      if (Math.abs(r - GRID_MID) <= 1 && Math.abs(c - GRID_MID) <= 1) continue;
      if (mapDef.layout === 'pillars') { if (r % 2 === 0 && c % 2 === 0) grid[r][c] = CELL.PILLAR; }
      else if (mapDef.layout === 'open') { if (r % 4 === 0 && c % 4 === 0) grid[r][c] = CELL.PILLAR; }
      else if (mapDef.layout === 'blocks') {
        if (r % 3 === 0 && c % 3 === 0) {
          grid[r][c] = CELL.PILLAR;
          if (c + 1 < GRID_SIZE - 1) grid[r][c + 1] = CELL.PILLAR;
          if (r + 1 < GRID_SIZE - 1) { grid[r + 1][c] = CELL.PILLAR; grid[r + 1][c + 1] = CELL.PILLAR; }
        }
      } else if (mapDef.layout === 'maze') { if (r % 2 === 0 && c % 2 === 0) grid[r][c] = CELL.BUSH; }
      else if (mapDef.layout === 'islands') {
        if (r % 5 === 0 && c % 5 === 0) grid[r][c] = CELL.PILLAR;
        else if ((r % 5 <= 1 && c % 5 <= 1) && !(r % 5 === 0 && c % 5 === 0)) grid[r][c] = CELL.BUSH;
      } else if (mapDef.layout === 'cross') {
        const onRow = (r === GRID_MID - 3 || r === GRID_MID + 3);
        const onCol = (c === GRID_MID - 3 || c === GRID_MID + 3);
        if ((onRow || onCol) && (c + r) % 4 !== 0) grid[r][c] = CELL.PILLAR;
        if (r % 4 === 0 && c % 4 === 2) grid[r][c] = CELL.PILLAR;
      } else if (mapDef.layout === 'ring') {
        const dist = Math.hypot(c - GRID_MID, r - GRID_MID);
        const ringR = GRID_SIZE * 0.29;
        if (dist > ringR - 1 && dist < ringR + 1) {
          const ang = Math.atan2(r - GRID_MID, c - GRID_MID);
          const gap = Math.abs(Math.sin(ang * 2)) > 0.92;
          if (!gap) grid[r][c] = CELL.PILLAR;
        } else if (r % 3 === 0 && c % 3 === 0) grid[r][c] = CELL.PILLAR;
      }
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
      const distCenter = Math.hypot(c - GRID_MID, r - GRID_MID);
      if (distCenter < 2.5) continue;
      const bandScale = GRID_SIZE / 27;
      const inBand = distCenter >= 3.5 * bandScale && distCenter <= 7.0 * bandScale;
      const bushChance = mapDef.bushBand ? (inBand ? mapDef.bush : mapDef.bush * 0.18) : (inBand ? mapDef.bush * 0.5 : mapDef.bush * 0.12);
      if (Math.random() < bushChance) grid[r][c] = CELL.BUSH;
      else if (Math.random() < mapDef.crate) grid[r][c] = CELL.CRATE;
    }
  }
  SPAWN_COORDS.forEach(({ c, r }) => {
    for (let dr = -2; dr <= 2; dr++) for (let dc = -2; dc <= 2; dc++) {
      const cc = c + dc, rr = r + dr;
      if (inBounds(cc, rr) && grid[rr][cc] === CELL.CRATE) grid[rr][cc] = CELL.FLOOR;
    }
  });
}

/* Arena 15×15 do duelo: gera só o quadrante superior-esquerdo e espelha
   nos dois eixos, garantindo simetria perfeita (inclusive nos spawns opostos). */
function buildDuelLayout(mapDef, portalSet) {
  grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(CELL.FLOOR));
  const mid = GRID_MID;
  const mir = (v) => GRID_SIZE - 1 - v;
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (r === 0 || c === 0 || r === GRID_SIZE - 1 || c === GRID_SIZE - 1) grid[r][c] = CELL.CRUSHED;
    }
  }
  const nearSpawn = (c, r) =>
    (Math.abs(c - SPAWN_P1.c) <= 2 && Math.abs(r - SPAWN_P1.r) <= 2) ||
    (Math.abs(c - SPAWN_P2.c) <= 2 && Math.abs(r - SPAWN_P2.r) <= 2);
  for (let r = 1; r < mid; r++) {
    for (let c = 1; c < mid; c++) {
      if (nearSpawn(c, r)) continue;
      let t = CELL.FLOOR;
      const d = Math.hypot(c - mid, r - mid);
      if (mapDef.layout === 'pillars') { if (r % 2 === 0 && c % 2 === 0) t = CELL.PILLAR; }
      else if (mapDef.layout === 'open') { if (r % 4 === 0 && c % 4 === 0) t = CELL.PILLAR; }
      else if (mapDef.layout === 'blocks') { if (r % 3 === 0 && c % 3 === 0) t = CELL.PILLAR; }
      else if (mapDef.layout === 'maze') { if (r % 2 === 0 && c % 2 === 0) t = CELL.BUSH; }
      else if (mapDef.layout === 'islands') {
        if (r % 5 === 0 && c % 5 === 0) t = CELL.PILLAR;
        else if (r % 5 <= 1 && c % 5 <= 1) t = CELL.BUSH;
      } else if (mapDef.layout === 'cross') {
        if ((r === mid - 3 || c === mid - 3) && (c + r) % 4 !== 0) t = CELL.PILLAR;
        if (r % 4 === 0 && c % 4 === 2) t = CELL.PILLAR;
      } else if (mapDef.layout === 'ring') {
        const ringR = GRID_SIZE * 0.29;
        if (d > ringR - 1 && d < ringR + 1) {
          const ang = Math.atan2(r - mid, c - mid);
          if (Math.abs(Math.sin(ang * 2)) <= 0.92) t = CELL.PILLAR;
        } else if (r % 3 === 0 && c % 3 === 0) t = CELL.PILLAR;
      }
      if (t === CELL.FLOOR && d > 2.2) {
        if (Math.random() < mapDef.bush * 0.7) t = CELL.BUSH;
        else if (Math.random() < mapDef.crate) t = CELL.CRATE;
      }
      grid[r][c] = t;
      grid[r][mir(c)] = t;
      grid[mir(r)][c] = t;
      grid[mir(r)][mir(c)] = t;
    }
  }
  for (const key of [...safeSpawnSet, ...portalSet]) {
    const [c, r] = key.split(',').map(Number);
    if (!inBounds(c, r)) continue;
    if (grid[r][c] === CELL.CRUSHED || grid[r][c] === CELL.PILLAR || grid[r][c] === CELL.CRATE) grid[r][c] = CELL.FLOOR;
  }
  const center = { c: mid, r: mid };
  let reach = floodFillFrom(SPAWN_P1);
  if (!reach.has(`${center.c},${center.r}`)) {
    carveCorridor(SPAWN_P1, center);
    carveCorridor(SPAWN_P2, center);
  }
  reach = floodFillFrom(SPAWN_P1);
  if (!reach.has(`${SPAWN_P2.c},${SPAWN_P2.r}`)) carveCorridor(center, SPAWN_P2);
}

function initArena(isDemo = false, modeId = null, mapId = null) {
  const cfg = MODE_CONFIG[modeId || match.mode] || MODE_CONFIG.SOLO;
  const mapDef = getMap(mapId || match.mapId || 'NEON');
  if (!isDemo) requestGameFullscreen();
  if (cfg.grid && GRID_SIZE !== cfg.grid) applyGridSize(cfg.grid);
  else if (!cfg.grid && GRID_SIZE !== 35) applyGridSize(35);
  match.mode = cfg.id; match.mapId = mapDef.id; match.theme = mapDef;
  match.demoMode = isDemo; match.running = true; match.ended = false;
  // Evento rotativo: só partidas iniciadas pelo card JOGAR EVENTO entram
  // na contagem deste ciclo de 3 horas.
  match.eventMode = !isDemo && pendingEventMatch;
  pendingEventMatch = false;
  match.eventGoldSpawned = false;
  const rotEv = match.eventMode ? currentRotatingEvent() : null;
  match.eventIndex = rotEv ? rotEv.index : -1;
  match.eventMods = rotEv ? {
    speed: rotEv.index === 1 ? 3 : 0,
    bombs: rotEv.index === 4 ? 3 : 0,
    range: rotEv.index === 4 ? 7 : 0,
    hp: rotEv.index === 6 ? 1 : 0,
    gold: rotEv.index === 2,
    doubleLoot: rotEv.index === 0,
    shortFuse: rotEv.index === 3,
    lightning: rotEv.index === 5
  } : null;
  // Voz é por partida: reaparece desligada no 1v1/Online e some no resto.
  if (window.VoiceChat) window.VoiceChat.setVisible(!isDemo && !spectate.active && (cfg.id === 'DUEL' || cfg.id === 'ONLINE'));
  match.paused = false;
  match.pausedByRotate = false;
  if (UI.pauseModal) UI.pauseModal.classList.add('hidden');
  match.demoRestart = 0; match.elapsedTime = 0; match.humanSurvived = null;
  match.safeRing = isDemo ? 0 : cfg.startRing;
  const stormMod = dailyEvent().mods.storm || 1;
  match.stormInterval = cfg.stormInterval * stormMod;
  match.stormTimer = (cfg.stormDelay || cfg.stormInterval) * stormMod;
  // Arena Relâmpago: queda de blocos começa aos 30s e acelera o fechamento.
  if (match.eventMods && match.eventMods.lightning) {
    match.stormTimer = 30;
    match.stormInterval = Math.min(match.stormInterval, 10);
  }
  match.stormTick = 0;
  match.stormWarning = false; match.airdropTimer = cfg.airdropTimer;
  match.shake = 0; match.hitFlash = 0; match.lastDeath = null;
  match.humanHeartsTaken = 0; match.selfKillEarly = false;
  match.localControls = (cfg.humans >= 2 && cfg.id !== 'ONLINE') ? ['p1', 'p2'] : ['p1'];
  match.myControl = 'p1';
  match.bracketSlot = ''; match.bracketRival = '';
  if (cfg.id !== 'ONLINE') match.netRole = null;
  
  bombs = []; explosions = []; powerups = []; particles = []; floatingLabels = [];
  trails = [];
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
    { id: 'P1B', pairId: 'P1A', c: GRID_SIZE - 6, r: GRID_SIZE - 6, color: '#22d3ee' },
    { id: 'P2A', pairId: 'P2B', c: GRID_SIZE - 6, r: 5, color: '#e879f9' },
    { id: 'P2B', pairId: 'P2A', c: 5, r: GRID_SIZE - 6, color: '#e879f9' }
  ];
  const portalSet = new Set(portals.map(p => `${p.c},${p.r}`));
  safeSpawnSet = new Set();
  SPAWN_COORDS.forEach(sp => {
    for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) safeSpawnSet.add(`${sp.c + dc},${sp.r + dr}`);
  });
  if (cfg.duel) buildDuelLayout(mapDef, portalSet);
  else buildArenaLayout(mapDef, portalSet);
  markGridDirty();
  
  // 🆕 Criação de fighters COM TIMES
  fighters = [];
  const humans = [];
  const isTeamMode = cfg.teamMode;
  
  if (!isDemo) {
    const fallbackName = (I18N[currentLang] || {}).nickFallback || 'JOGADOR';
    const n1 = (GameState.state.profile.nick || UI.nameInput.value || fallbackName).trim().slice(0, 15) || fallbackName;
    const look = resolvePlayerLook();
    humans.push({ sp: SPAWN_P1, name: n1, color: look.body, visor: look.visor, device: 'p1', team: 1 });
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
  const botCount = cfg.duel ? (isDemo ? 2 : 1) : (isDemo ? 12 : cfg.bots);
  
  for (let i = 0; i < botCount; i++) {
    let profile = BOT_PROFILES[i % BOT_PROFILES.length];
    let sp = botSpawns[i] || { c: 3 + (i % 9) * 2, r: 3 + (i % 7) * 3 };
    let botName = profile.name;
    let botColor = profile.color;
    let botVisor = profile.visor;
    if (cfg.duel) {
      const pair = isDemo ? spectatePair : [null, duel.opponent || (I18N[currentLang] || {}).trainingBot || 'BOT TREINO'];
      botName = pair[i] || pair[1] || 'Nova';
      const look = getProfileDef(botName);
      botColor = look.body; botVisor = look.visor;
      profile = { ...botProfileFor(botName), name: botName, color: botColor, visor: botVisor };
      sp = isDemo ? [SPAWN_P1, SPAWN_P2][i] : SPAWN_P2;
    }
    
    let botTeam = 0;
    if (isTeamMode) {
      const teamSize = cfg.teamSize;
      const team1Count = fighters.filter(f => f.team === 1).length;
      const team2Count = fighters.filter(f => f.team === 2).length;
      
      if (team2Count < teamSize) botTeam = 2;
      else if (team1Count < teamSize) botTeam = 1;
      else botTeam = 2;
    } else if (cfg.duel) {
      botTeam = isDemo ? (i === 0 ? 1 : 2) : 2;
    }
    
    const bot = makeFighter(fighters.length, sp, botName, botColor, botVisor, 'bot', botTeam, profile);
    bot.avatar = getProfileDef(botName).avatar;
    if (cfg.duel) bot.duelSide = isDemo ? i : 1;
    fighters.push(bot);
  }
  
  match.humanRank = fighters.length;
  // Caça ao Ouro: 5 moedas douradas espalhadas pela arena a cada partida.
  if (match.eventMods && match.eventMods.gold) spawnGoldPickups(5);
  if (!isDemo) fighters.forEach(f => { f.invulnTimer = 2; });
  const localHuman = fighters.find(f => f.device === 'p1');
  if (localHuman) localHuman.avatar = GameState.state.profile.avatar;
  cam.x = WORLD_PX / 2; cam.y = WORLD_PX / 2;
  resetJoystick();
  updateHUD();
  if (cfg.duel) updateDuelHUD();
  MUSIC.play(isDemo ? 'menu' : 'battle');
  updateRotateGate();
  if (!isDemo) {
    if (match.eventMode && rotEv) {
      applyEventHud(match.eventIndex);
      showEventSplash(rotEv);
      SFX.playEventStart();
    } else {
      applyEventHud(-1);
    }
  } else {
    applyEventHud(-1);
  }
}

function makeFighter(idx, sp, name, color, visor, device = 'bot', team = 0, profile = null) {
  const isHuman = device === 'p1' || device === 'p2';
  const traits = profile || BOT_PROFILES[idx % BOT_PROFILES.length];
  let skin = null;
  let bombSkinId = 'classic';
  if (device === 'p1') {
    const look = resolvePlayerLook();
    color = look.body; visor = look.visor;
    skin = getSkin(prefs.skin);
    bombSkinId = GameState.state.bombs.equipped;
  } else if (device === 'p2') {
    bombSkinId = 'dynamite';
  } else {
    bombSkinId = BOMB_SKINS[idx % BOMB_SKINS.length].id;
  }
  const tactical = isHuman ? selectedStarterTactical : TACTICAL_ORDER[idx % 3];
  const evm = match.eventMods || null;
  const f = {
    id: `F_${idx}`, name, isHuman, device, team,
    alive: true, hp: evm && evm.hp ? evm.hp : 2, maxHp: evm && evm.hp ? evm.hp : 2,
    x: (sp.c + 0.5) * TILE_SIZE, y: (sp.r + 0.5) * TILE_SIZE,
    netX: 0, netY: 0, vx: 0, vy: 0, kbX: 0, kbY: 0,
    slideX: 0, slideY: 0, lavaTime: 0, onHazard: null,
    netInX: 0, netInY: 0, netInTime: 0,
    facingAngle: Math.atan2(GRID_MID - sp.r, GRID_MID - sp.c),
    color, visor, kills: 0, skin: skin ? skin.id : null, bombSkinId,
    cosmeticSkin: device === 'p1' ? GameState.state.skins.equipped : null,
    trailId: device === 'p1' ? GameState.state.cosmetics.trails.equipped : 'none',
    explosionSkin: device === 'p1' ? GameState.state.cosmetics.explosions.equipped : 'classic',
    maxBombs: evm && evm.bombs ? evm.bombs : ((device === 'p1' && dailyEvent().mods.bombs) ? 2 : 1), activeBombs: 0,
    bombRange: evm && evm.range ? evm.range : 2, speedLevel: evm && evm.speed ? 3 : 1,
    canKick: false, shield: false,
    tacticalType: tactical, tacticalAmmo: { SHOCK: 0, CRYO: 0, C4: 0 },
    invulnTimer: 0, dashTimer: 0, dashCooldown: 0, dashDirX: 0, dashDirY: 1,
    portalCooldown: 0.8, inBush: false,
    ai: {
      timer: 0, targetX: null, targetY: null, stuckTimer: 0, lastX: 0, lastY: 0, pathTimer: 0, stepX: 0, stepY: 0,
      style: traits.style || 'hunter', vision: traits.vision || 760,
      aggression: traits.aggression != null ? traits.aggression : 0.8,
      reaction: traits.reaction || [0.26, 0.5], farm: traits.farm != null ? traits.farm : 0.35,
      sense: ({ hunter: 1.3, trapper: 1.45, guard: 1.55, farmer: 1.75 }[traits.style] || 1.4) + Math.random() * 0.2,
      targetId: null, targetUntil: 0, bombCd: 0, digAt: 0
    }
  };
  f.tacticalAmmo[tactical] = 3;
  f.netX = f.x; f.netY = f.y;
  f.ai.lastX = f.x; f.ai.lastY = f.y;
  f.ai.stepX = f.x; f.ai.stepY = f.y;
  return f;
}

/* ========================================================================
   7.1 DUELO 1v1 — SÉRIE MD3 / MD5
   ======================================================================== */
const duel = {
  active: false, best: 3, wins: [0, 0], round: 0, over: false,
  roundOver: false, roundTimer: 0, seriesWinner: null,
  opponent: null, biomeIndex: 0,
  biomeCycle: ['NEON', 'JUNGLE', 'FROST', 'EMBER', 'PORTO', 'ORBIT'],
  humanFighter: null, botFighter: null, bannerTimer: null
};
let spectatePair = ['JOGADOR 1', 'JOGADOR 2'];
const DUEL_BANNER_MS = 2600;

function isDuelRoundActive() {
  return match.mode === 'DUEL' && duel.active && !duel.over && !duel.roundOver;
}
function pickDuelOpponent() {
  const table = GameState.leagueTable().filter(r => !r.me);
  const pool = table.slice(0, 8);
  if (!pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)].name;
}
function showDuelBanner(title, score, sub) {
  const el = document.getElementById('duelBanner');
  if (!el) return;
  document.getElementById('duelBannerTitle').textContent = title || '';
  document.getElementById('duelBannerScore').textContent = score || '';
  document.getElementById('duelBannerSub').textContent = sub || '';
  el.classList.add('show');
  clearTimeout(duel.bannerTimer);
  duel.bannerTimer = setTimeout(() => el.classList.remove('show'), DUEL_BANNER_MS);
}
function updateDuelHUD() {
  const wrap = document.getElementById('hudDuel');
  if (!wrap) return;
  const visible = match.mode === 'DUEL' && duel.active && !match.demoMode && !spectate.active;
  wrap.classList.remove('hidden');
  wrap.style.display = visible ? 'flex' : 'none';
  if (!visible) return;
  const h = duel.humanFighter, b = duel.botFighter;
  const hearts = (f) => (f && f.alive ? '♥'.repeat(Math.max(1, f.hp)) : '🖤').slice(0, 3);
  const name1 = document.getElementById('duelName1');
  const name2 = document.getElementById('duelName2');
  const hearts1 = document.getElementById('duelHearts1');
  const hearts2 = document.getElementById('duelHearts2');
  const pts1 = document.getElementById('duelPts1');
  const pts2 = document.getElementById('duelPts2');
  const fmt = document.getElementById('duelFormat');
  if (name1) name1.textContent = h ? h.name.slice(0, 9) : 'P1';
  if (name2) name2.textContent = b ? b.name.slice(0, 9) : 'P2';
  if (hearts1) hearts1.textContent = hearts(h);
  if (hearts2) hearts2.textContent = hearts(b);
  if (pts1) pts1.textContent = duel.wins[0];
  if (pts2) pts2.textContent = duel.wins[1];
  if (fmt) fmt.textContent = `MD${duel.best}`;
}
function startDuelSeries(best = 3, kind = null) {
  duel.best = Number(best) === 5 ? 5 : 3;
  duel.wins = [0, 0]; duel.round = 0; duel.over = false;
  duel.roundOver = false; duel.roundTimer = 0; duel.seriesWinner = null;
  duel.biomeIndex = 0;
  duel.kind = (kind === 'league' || kind === 'bracket' || kind === 'copa') ? kind : null;
  duel.seriesTime = 0;
  duel.heartsTaken = 0;
  duel.earlySelfKill = false;
  duel.bracketId = null;
  duel.opponent = duel.forcedOpponent || pickDuelOpponent() || (I18N[currentLang] || {}).trainingBot || 'BOT TREINO';
  duel.forcedOpponent = null;
  duel.active = true;
  savePrefs({ duelBest: duel.best });
  duelStartRound();
}
function duelStartRound() {
  duel.round++;
  duel.roundOver = false;
  duel.roundTimer = 0;
  duel.seriesWinner = null;
  const biome = duel.biomeCycle[duel.biomeIndex % duel.biomeCycle.length];
  selectedMap = biome;
  initArena(false, 'DUEL', biome);
  match.stormTimer = match.stormInterval = 999;
  match.airdropTimer = 999;
  duel.humanFighter = fighters.find(f => f.device === 'p1') || fighters[0];
  duel.botFighter = fighters.find(f => f.device === 'bot' && f.team === 2) || fighters.find(f => f.device === 'bot') || fighters[1];
  const dict = I18N[currentLang] || {};
  showDuelBanner(`${dict.duelRound || 'ROUND'} ${duel.round}`, `${duel.wins[0]} × ${duel.wins[1]}`, `${duel.humanFighter.name} vs ${duel.botFighter.name}`);
  updateDuelHUD();
}
function updateDuel(dt) {
  if (!duel.active || match.mode !== 'DUEL' || duel.over || match.demoMode || !match.running) return;
  if (match.paused) return;
  if (duel.roundTimer > 0) {
    duel.roundTimer -= dt;
    if (duel.roundTimer <= 0) {
      duel.roundTimer = 0;
      if (duel.seriesWinner !== null) finishDuelSeries();
      else { duel.biomeIndex++; duelStartRound(); }
    }
    return;
  }
  if (duel.roundOver) return;
  const h = duel.humanFighter, b = duel.botFighter;
  if (!h || !b || match.elapsedTime < 1.5) return;
  if (h.alive && b.alive) return;
  const dict = I18N[currentLang] || {};
  if (!h.alive && !b.alive) {
    duel.roundOver = true;
    duel.roundTimer = 2.2;
    duel.seriesTime += match.elapsedTime;
    showDuelBanner(dict.duelRoundDraw || 'ROUND EMPATADO', `${duel.wins[0]} × ${duel.wins[1]}`, '');
    updateDuelHUD();
    return;
  }
  const winner = h.alive ? 0 : 1;
  duel.roundOver = true;
  duel.roundTimer = 2.2;
  duel.seriesTime += match.elapsedTime;
  duel.wins[winner]++;
  duel.seriesWinner = duel.wins[winner] >= Math.ceil(duel.best / 2) ? winner : null;
  const winnerName = winner === 0 ? h.name : b.name;
  SFX.playVictory();
  showDuelBanner(
    (dict.duelRoundWon || '{name} won the round!').replace('{name}', winnerName),
    `${duel.wins[0]} × ${duel.wins[1]}`,
    duel.seriesWinner !== null ? (winner === 0 ? dict.duelSeriesWon : dict.duelSeriesLost) : (dict.duelNextRound || '')
  );
  updateDuelHUD();
}
function finishDuelSeries() {
  duel.over = true;
  const winner = duel.seriesWinner;
  const dict = I18N[currentLang] || {};
  const win = winner === 0;
  showDuelBanner(
    win ? (dict.duelSeriesWon || 'SERIES WON!') : (dict.duelSeriesLost || 'SERIES LOST'),
    `${duel.wins[0]} × ${duel.wins[1]}`,
    (dict.duelSeriesSub || '{a} × {b} — {bo}').replace('{a}', duel.wins[0]).replace('{b}', duel.wins[1]).replace('{bo}', `MD${duel.best}`)
  );
  setTimeout(() => { if (duel.active && duel.over) endMatch(win, false, { duelSeries: true }); }, 900);
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
  if (!match.shakeEnabled || settings.reduceMotion) return;
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
  let n = Math.max(1, Math.round(count * (QUALITY.particles || 1)));
  if (settings.reduceMotion) n = Math.min(n, 3);
  for (let i = 0; i < n; i++) {
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
  else if (mode === 'lava') row.innerHTML = `🌋 ${vTag} ${dict.lavaEliminated}`;
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
  else if (type === 'GOLD') {
    if (isMyFighter(fighter)) {
      const got = GameState.goldCrateReward();
      addFloatingLabel(got ? '+2 🪙' : 'LIMITE 🪙', fighter.x, fighter.y - 26, POWERUP_TYPES.GOLD.color);
      SFX.playPickup();
      updateHUD();
    }
    spawnParticles(fighter.x, fighter.y, POWERUP_TYPES.GOLD.color, 12, 120, 0.4);
    return;
  }
  else if (type === 'SHOCK' || type === 'CRYO' || type === 'C4') {
    fighter.tacticalAmmo[type] = Math.min(9, fighter.tacticalAmmo[type] + 2);
  }
  // O host simula a partida; ele avisa o convidado para que o efeito
  // (som, partículas e etiqueta) também apareça do outro lado.
  if (net.role === 'host') netQueuePickup(fighter, type);
  if (isMyFighter(fighter)) {
    SFX.playPickup();
    addFloatingLabel(POWERUP_TYPES[type].label, fighter.x, fighter.y - 26, POWERUP_TYPES[type].color);
    updateHUD();
    tutorialEvent('pickup');
  } else {
    // Coleta do adversário: o host também mostra o efeito; o convidado
    // recebe o mesmo efeito pelo evento de pickup no snapshot.
    spawnParticles(fighter.x, fighter.y, POWERUP_TYPES[type].color, 10, 120, 0.35);
  }
}

function damageFighter(f, amount, killer, isStorm = false, cause = null) {
  if (!f.alive || f.invulnTimer > 0) return;
  if (killer === f && !f.isHuman) return;

  // 🆕 Friendly fire desligado em modos de time
  if (killer && f.team !== 0 && killer.team === f.team && killer !== f) {
    return;
  }

  if (match.mode === 'TUTORIAL' && tutorial.active) {
    if (f.ai && f.ai.tutorialDormant) return;
    if (f === getHuman() && f.hp - amount <= 0) {
      f.hp = 1; f.invulnTimer = 2.2;
      spawnParticles(f.x, f.y, '#22d3ee', 14, 140, 0.4);
      addFloatingLabel(currentLang === 'en' ? 'CAREFUL!' : 'CUIDADO!', f.x, f.y - 26, '#fbbf24');
      match.hitFlash = 0.4; SFX.playHit(); triggerShake(4); updateHUD();
      return;
    }
  }

  const hpBefore = Math.max(0, f.hp);
  f.hp -= amount;
  const heartsRemoved = Math.min(hpBefore, Math.max(0, amount));
  if (killer && killer !== f && !isStorm && isMyFighter(killer) && !f.isHuman) {
    if (match.mode === 'DUEL' && duel.active && f === duel.botFighter) duel.heartsTaken += heartsRemoved;
    else match.humanHeartsTaken = (match.humanHeartsTaken || 0) + heartsRemoved;
  }
  spawnParticles(f.x, f.y, '#f43f5e', 16, 150, 0.45);
  if (f.hp > 0) {
    f.invulnTimer = 2;
    addFloatingLabel('-1 ❤️', f.x, f.y - 24, '#fb7185');
    if (isMyFighter(f)) {
      match.hitFlash = 0.45;
      SFX.playHit(); triggerShake(6); updateHUD();
      haptic(28); padRumble(140, 0.5, 0.7, controlOf(f.device) || 'p1');
    }
    return;
  }
  f.hp = 0;
  eliminateFighter(f, killer, isStorm, cause);
}

function eliminateFighter(victim, killer, isStorm = false, cause = null) {
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
  else if (!isStorm && killer === victim) {
    addKillFeed(null, victim, 'self');
  }
  else addKillFeed(null, victim, cause || 'storm');
  if (killer && isMyFighter(killer)) updateHUD();
  if (victim.isHuman) {
    match.humanRank = fighters.filter(f => f.alive).length + 1;
    match.humanSurvived = match.elapsedTime;
    match.lastDeath = {
      storm: !!isStorm,
      self: !isStorm && killer === victim,
      hazard: cause || null,
      killer: killer && killer !== victim ? killer.name : null
    };
    if (!isStorm && killer === victim) {
      const seriesElapsed = (match.mode === 'DUEL' && duel.active)
        ? duel.seriesTime + match.elapsedTime
        : match.elapsedTime;
      if (seriesElapsed < 10) {
        match.selfKillEarly = true;
        if (match.mode === 'DUEL' && duel.active) duel.earlySelfKill = true;
      }
    }
  }
  if (isMyFighter(victim)) {
    match.humanSurvived = match.elapsedTime;
    padRumble(320, 0.9, 0.8, controlOf(victim.device) || 'p1');
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
  const lootMult = (dailyEvent().mods.loot || 1) * ((match.eventMods && match.eventMods.doubleLoot) ? 2 : 1);
  if (Math.random() < Math.min(0.95, 0.55 * lootMult)) {
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

/* Caça ao Ouro: moedas douradas em piso livre, longe dos spawns. */
function spawnGoldPickups(count) {
  const spots = [];
  for (let r = 1; r < GRID_SIZE - 1; r++) {
    for (let c = 1; c < GRID_SIZE - 1; c++) {
      if (grid[r][c] === CELL.FLOOR || grid[r][c] === CELL.BUSH) spots.push({ c, r });
    }
  }
  shuffle(spots);
  let placed = 0;
  for (const s of spots) {
    if (placed >= count) break;
    const x = (s.c + 0.5) * TILE_SIZE, y = (s.r + 0.5) * TILE_SIZE;
    if (fighters.some(f => Math.hypot(f.x - x, f.y - y) < TILE_SIZE * 1.5)) continue;
    if (powerups.some(pu => Math.hypot(pu.x - x, pu.y - y) < TILE_SIZE * 0.6)) continue;
    powerups.push({ type: 'GOLD', x, y, bobPhase: Math.random() * 6 });
    placed++;
  }
  match.eventGoldSpawned = placed > 0;
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
    ownerId: f.id, range: f.bombRange, skinId: f.bombSkinId || 'classic',
    blastId: f.explosionSkin || 'classic',
    fuse: type === 'SHOCK' ? 1.35 : type === 'CRYO' ? 1.15 : type === 'C4' ? 30 : 2.35,
    bornAt: match.elapsedTime,
    vx: 0, vy: 0, passThroughPlayers: new Set(), exploded: false, seed: Math.random() * 10
  };
  bombs.push(bomb);
  updateBombPassThrough(bomb);
  if (bomb.type === 'NORMAL') f.activeBombs++;
  if (isMyFighter(f)) SFX.playPlaceBomb();
  if (tutorial.active && f === getHuman()) tutorialEvent('bomb');
  return bomb;
}

function useTactical(f) {
  if (!f.alive) return;
  const type = f.tacticalType;
  if (type === 'C4') {
    const liveC4 = bombs.filter(b => !b.exploded && b.type === 'C4' && b.ownerId === f.id);
    if (liveC4.length) {
      liveC4.forEach(b => { b.fuse = 0.01; });
      if (isMyFighter(f)) { SFX.playBeep(); addFloatingLabel('DETONAR!', f.x, f.y - 30, '#f43f5e'); }
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
    tutorialEvent('tactical');
    if (!match.demoMode) missionProgress('tactical', 1);
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
  if (isMyFighter(f)) { SFX.playDash(); tutorialEvent('dash'); }
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
  match.lastBoom = { x: bomb.x, y: bomb.y, t: match.elapsedTime };
  const owner = fighters.find(f => f.id === bomb.ownerId) || null;
  const credit = bomb.chainedFrom || owner;
  if (owner && bomb.type === 'NORMAL') {
    owner.activeBombs = Math.max(0, owner.activeBombs - 1);
    if (owner.isHuman) updateHUD();
  }
  const bc = Math.floor(bomb.x / TILE_SIZE), br = Math.floor(bomb.y / TILE_SIZE);
  if (bomb.type === 'SHOCK') { SFX.playShockwave(); triggerShake(4.5, bomb.x, bomb.y); shockBlast(bomb, credit); }
  else if (bomb.type === 'CRYO') { SFX.playCryo(); cryoBlast(bomb, credit); }
  else crossBlast(bomb, credit, bc, br);
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
      if (t === CELL.CRATE) { destroyCrate(c, r, false); if (owner === getHuman() && !match.demoMode) missionProgress('crates', 1); if (tutorial.active && owner === getHuman()) tutorialEvent('crate'); cells.push({ c, r }); break; }
      if (t === CELL.AIRDROP_CRATE) { destroyCrate(c, r, true); if (owner === getHuman() && !match.demoMode) missionProgress('crates', 1); if (tutorial.active && owner === getHuman()) tutorialEvent('crate'); cells.push({ c, r }); break; }
      cells.push({ c, r });
    }
  }
  const blastSkin = bomb.type === 'C4' ? null : getCosmetic('explosions', bomb.blastId || 'classic');
  explosions.push({
    id: ++explosionSeq, type: 'cross', x: bomb.x, y: bomb.y, cells,
    color: bomb.type === 'C4' ? '#fb7185' : blastSkin.color,
    center: bomb.type === 'C4' ? '#fef3c7' : blastSkin.core,
    tier: blastSkin ? rarityTier(blastSkin.rarity) : 0,
    timer: 0.45, maxTimer: 0.45
  });
  SFX.playExplosion(audibilityAt(bomb.x, bomb.y));
  triggerShake(bomb.type === 'C4' ? 7 : 5.5, bomb.x, bomb.y);
  damageInCells(cells, owner, bomb.type === 'C4' ? 2 : 1);
  bombs.forEach(o => { if (o === bomb || o.exploded) return; if (cells.some(cell => cell.c === o.c && cell.r === o.r)) { o.fuse = 0.02; o.chainedFrom = owner; } });
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
  const R = PLAYER_RADIUS;
  const penetration = (px, py) => {
    let sum = 0;
    const minC = Math.floor((px - R) / TILE_SIZE), maxC = Math.floor((px + R) / TILE_SIZE);
    const minR = Math.floor((py - R) / TILE_SIZE), maxR = Math.floor((py + R) / TILE_SIZE);
    for (let r = minR; r <= maxR; r++) for (let c = minC; c <= maxC; c++) {
      if (isTileWalkable(c, r, f)) continue;
      const left = c * TILE_SIZE, top = r * TILE_SIZE;
      sum += Math.min(px + R, left + TILE_SIZE) - Math.max(px - R, left)
        + Math.min(py + R, top + TILE_SIZE) - Math.max(py - R, top);
    }
    return sum;
  };
  // Corpo sobreposto (spawn/desync): sai pelo lado mais curto. Antes isso era
  // resolvido pelo alinhamento de corredor, que atrapalhava o movimento normal.
  if (!canOccupyPosition(f.x, f.y, R, f)) {
    for (let i = 0; i < 40; i++) {
      let best = penetration(f.x, f.y), bx = 0, by = 0;
      if (best <= 1e-4) break;
      for (const [sx, sy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const p = penetration(f.x + sx, f.y + sy);
        if (p < best - 1e-4) { best = p; bx = sx; by = sy; }
      }
      if (!bx && !by) break;
      f.x += bx; f.y += by;
    }
  }
  const stuckPen = canOccupyPosition(f.x, f.y, R, f) ? 0 : penetration(f.x, f.y);
  const canGoTo = (px, py) => canOccupyPosition(px, py, R, f)
    || (stuckPen > 0 && penetration(px, py) < stuckPen - 1e-4);
  // Passo em bloco penetrava no canto e a colisão recusava o movimento por
  // inteiro, deixando o lutador parado raspando o bloco. Avança o máximo
  // permitido no eixo para o contato ser contínuo e o deslize não travar.
  const advance = (step, horizontal) => {
    if (Math.abs(step) <= 0.001) return;
    const probe = (d) => (horizontal ? canGoTo(f.x + d, f.y) : canGoTo(f.x, f.y + d));
    if (probe(step)) {
      if (horizontal) f.x += step; else f.y += step;
      return;
    }
    let free = 0, wall = step;
    for (let i = 0; i < 12; i++) {
      const mid = (free + wall) / 2;
      if (probe(mid)) free = mid; else wall = mid;
    }
    if (Math.abs(free) < 0.01) return;
    if (horizontal) f.x += free; else f.y += free;
  };
  advance(stepX, true);
  advance(stepY, false);
  f.x = clamp(f.x, R, WORLD_PX - R);
  f.y = clamp(f.y, R, WORLD_PX - R);
}

function updateFighter(f, dt) {
  f.invulnTimer = Math.max(0, f.invulnTimer - dt);
  f.dashCooldown = Math.max(0, f.dashCooldown - dt);
  f.dashTimer = Math.max(0, f.dashTimer - dt);
  f.portalCooldown = Math.max(0, f.portalCooldown - dt);
  if (!f.alive) return;
  const startCell = worldToGrid(f.x, f.y);
  const floorHz = mapHazard();
  const cellHz = hazardCellType(startCell.c, startCell.r);
  let speed = fighterSpeed(f);
  if (cellHz === 'water') speed *= 0.7;
  if (floorHz === 'lowgrav') speed *= 1.06;
  let moveX = f.vx, moveY = f.vy;
  if (f.dashTimer > 0) { speed *= 3.1 * (floorHz === 'lowgrav' ? 1.12 : 1); moveX = f.dashDirX * speed; moveY = f.dashDirY * speed; }
  else {
    const len = Math.hypot(moveX, moveY);
    if (len > 0.01) { moveX = (moveX / len) * speed; moveY = (moveY / len) * speed; }
    else { moveX = 0; moveY = 0; }
  }
  // Gelo escorregadio / baixa gravidade: acelera e freia devagar, então o
  // personagem desliza depois de soltar o direcional (e depois do dash).
  if (f.dashTimer > 0) {
    f.slideX = moveX; f.slideY = moveY;
  } else if (floorHz === 'ice' || floorHz === 'lowgrav') {
    const moving = Math.hypot(moveX, moveY) > 1;
    const grip = floorHz === 'ice' ? (moving ? 6.0 : 2.1) : (moving ? 30 : 4.0);
    const k = 1 - Math.exp(-grip * dt);
    f.slideX += (moveX - f.slideX) * k;
    f.slideY += (moveY - f.slideY) * k;
    const sl = Math.hypot(f.slideX, f.slideY);
    const cap = speed * (floorHz === 'ice' ? 1.25 : 1.15);
    if (sl > cap) { f.slideX = (f.slideX / sl) * cap; f.slideY = (f.slideY / sl) * cap; }
    moveX = f.slideX; moveY = f.slideY;
  } else {
    f.slideX = moveX; f.slideY = moveY;
  }
  moveX += f.kbX; moveY += f.kbY;
  const kbDecay = floorHz === 'lowgrav' ? 3.2 : 7;
  f.kbX *= Math.exp(-kbDecay * dt); f.kbY *= Math.exp(-kbDecay * dt);
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
      if (!f.isHuman && b.ownerId === f.id) return;
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
  f.onHazard = hazardCellType(c, r);
  if (f.onHazard === 'lava') {
    f.lavaTime += dt;
    if (f.lavaTime >= 0.7) {
      f.lavaTime = 0;
      if (f.invulnTimer <= 0) {
        spawnParticles(f.x, f.y, '#fb923c', 12, 150, 0.45);
        if (isMyFighter(f)) addFloatingLabel(currentLang === 'en' ? 'LAVA!' : 'LAVA!', f.x, f.y - 26, '#fb923c');
        damageFighter(f, 1, null, false, 'lava');
      }
    }
  } else if (f.lavaTime > 0) {
    f.lavaTime = Math.max(0, f.lavaTime - dt * 2);
  }
  if (f.onHazard === 'water' && Math.random() < dt * 7) {
    spawnParticles(f.x, f.y + 8, 'rgba(94,234,212,0.85)', 2, 60, 0.32);
  }
}

/* ========================================================================
   11. BOT AI (COM APOIO A ALIADOS)
   ======================================================================== */
function simulatedBlastSet(extraBombs = null) {
  const set = new Set();
  const all = bombs.filter(b => !b.exploded);
  if (extraBombs) all.push(...extraBombs);
  const queued = new Set();
  const pending = all.slice();
  for (let i = 0; i < pending.length; i++) {
    const b = pending[i];
    if (queued.has(b)) continue;
    queued.add(b);
    const bc = Math.floor(b.x / TILE_SIZE), br = Math.floor(b.y / TILE_SIZE);
    if (b.type === 'SHOCK') {
      const radiusPx = (1.4 + b.range * 0.55) * TILE_SIZE + TILE_SIZE * 0.35;
      const rc = Math.ceil(radiusPx / TILE_SIZE);
      for (let dr = -rc; dr <= rc; dr++) for (let dc = -rc; dc <= rc; dc++) {
        const c = bc + dc, r = br + dr;
        if (!inBounds(c, r)) continue;
        const t = tileCenter(c, r);
        if (Math.hypot(t.x - b.x, t.y - b.y) <= radiusPx) set.add(`${c},${r}`);
      }
      continue;
    }
    set.add(`${bc},${br}`);
    for (const [dx, dy] of BFS_DIRS) {
      for (let n = 1; n <= b.range; n++) {
        const c = bc + dx * n, r = br + dy * n;
        if (!inBounds(c, r)) break;
        const t = grid[r][c];
        if (t === CELL.CRUSHED || t === CELL.PILLAR) break;
        const isCrate = t === CELL.CRATE || t === CELL.AIRDROP_CRATE;
        if (isCrate && b.type === 'CRYO') break;
        set.add(`${c},${r}`);
        if (isCrate) break;
        const chained = all.find(o => o !== b && !queued.has(o) && o.c === c && o.r === r);
        if (chained) pending.push(chained);
      }
    }
  }
  return set;
}

function bombFuseFor(type) {
  if (type === 'NORMAL' && match.eventMods && match.eventMods.shortFuse) return 1.5;
  return type === 'SHOCK' ? 1.35 : type === 'CRYO' ? 1.15 : type === 'C4' ? 30 : 2.35;
}

function bombBlastHas(b, c, r) {
  const bc = Math.floor(b.x / TILE_SIZE), br = Math.floor(b.y / TILE_SIZE);
  if (b.type === 'SHOCK') {
    const radiusPx = (1.4 + b.range * 0.55) * TILE_SIZE + TILE_SIZE * 0.35;
    const t = tileCenter(c, r);
    return Math.hypot(t.x - b.x, t.y - b.y) <= radiusPx;
  }
  if (c === bc && r === br) return true;
  if (c !== bc && r !== br) return false;
  const dc = Math.sign(c - bc), dr = Math.sign(r - br);
  const dist = Math.abs(c - bc) + Math.abs(r - br);
  if (dist > b.range) return false;
  for (let i = 1; i < dist; i++) {
    const t = grid[br + dr * i][bc + dc * i];
    if (t === CELL.CRUSHED || t === CELL.PILLAR || t === CELL.CRATE || t === CELL.AIRDROP_CRATE) return false;
  }
  const endT = grid[r][c];
  if (endT === CELL.CRUSHED || endT === CELL.PILLAR) return false;
  if (b.type === 'CRYO' && (endT === CELL.CRATE || endT === CELL.AIRDROP_CRATE)) return false;
  return true;
}

function threatFuseAt(c, r) {
  let fuse = Infinity;
  const covers = [];
  for (const b of bombs) {
    if (b.exploded) continue;
    if (bombBlastHas(b, c, r)) { fuse = Math.min(fuse, b.fuse); covers.push(b); }
  }
  for (const b of covers) {
    for (const o of bombs) {
      if (o.exploded || o === b) continue;
      if (bombBlastHas(o, b.c, b.r)) fuse = Math.min(fuse, o.fuse);
    }
  }
  return Number.isFinite(fuse) ? fuse : 2.35;
}

function bombProbe(f, type = 'NORMAL') {
  const { c, r } = worldToGrid(f.x, f.y);
  return { type, range: f.bombRange, c, r, x: (c + 0.5) * TILE_SIZE, y: (r + 0.5) * TILE_SIZE, fuse: bombFuseFor(type), exploded: false };
}

function botBlastHitsAlly(f, probe) {
  if (!f.team) return false;
  for (const o of fighters) {
    if (!o.alive || o === f || o.team !== f.team) continue;
    const t = worldToGrid(o.x, o.y);
    if (bombBlastHas(probe, t.c, t.r)) return true;
  }
  return false;
}

function botCanPlaceSafely(f, type = 'NORMAL') {
  const { c, r } = worldToGrid(f.x, f.y);
  if (!inBounds(c, r)) return false;
  const tile = grid[r][c];
  if (tile !== CELL.FLOOR && tile !== CELL.BUSH) return false;
  if (bombs.some(b => !b.exploded && b.c === c && b.r === r)) return false;
  if (fighters.some(o => o !== f && o.alive && Math.floor(o.x / TILE_SIZE) === c && Math.floor(o.y / TILE_SIZE) === r)) return false;
  const probe = bombProbe(f, type);
  if (botBlastHitsAlly(f, probe)) return false;
  const dangerLimit = Math.min(probe.fuse, threatFuseAt(c, r));
  return escapeExistsFrom(f, c, r, bombs.filter(b => !b.exploded).concat(probe), dangerLimit, 0.7);
}

function botTryBomb(f, chance = 1) {
  if (f.activeBombs >= f.maxBombs) return false;
  if (match.elapsedTime < (f.ai.bombCd || 0)) return false;
  if (chance < 1 && Math.random() > chance) return false;
  if (!botCanPlaceSafely(f)) return false;
  if (!placeBomb(f, 'NORMAL')) return false;
  f.ai.bombCd = match.elapsedTime + 0.35 + Math.random() * 0.5;
  f.ai.pathTimer = 0;
  return true;
}

function botCanSee(f, o) {
  const d = Math.hypot(o.x - f.x, o.y - f.y);
  if (d > f.ai.vision) return false;
  if (o.inBush && !f.inBush && d > TILE_SIZE * 2.2) return false;
  return true;
}

function botPickTarget(f) {
  const held = f.ai.targetId ? fighters.find(o => o.id === f.ai.targetId) : null;
  if (held && held.alive && match.elapsedTime < (f.ai.targetUntil || 0) && botCanSee(f, held)) return held;
  const claimedByOther = o => fighters.some(b => b !== f && b !== o && b.alive && b.ai && b.ai.targetId === o.id && match.elapsedTime < (b.ai.targetUntil || 0));
  let best = null, bestScore = Infinity;
  for (const o of fighters) {
    if (!o.alive || o === f) continue;
    if (f.team !== 0 && o.team === f.team) continue;
    if (!botCanSee(f, o)) continue;
    const d = Math.hypot(o.x - f.x, o.y - f.y);
    const score = d * (o.hp === 1 ? 0.6 : 1) * (claimedByOther(o) ? 1.8 : 1);
    if (score < bestScore) { best = o; bestScore = score; }
  }
  f.ai.targetId = best ? best.id : null;
  f.ai.targetUntil = match.elapsedTime + 1.6;
  return best;
}

// Fecha o cerco: anda até uma célula vizinha do alvo em vez de empurrar contra ele
function botApproachStep(f, enemy) {
  const et = worldToGrid(enemy.x, enemy.y);
  let best = null, bestD = Infinity;
  for (const [dc, dr] of BFS_DIRS) {
    const c = et.c + dc, r = et.r + dr;
    if (!isTileWalkable(c, r, f)) continue;
    if (bombs.some(b => !b.exploded && b.c === c && b.r === r)) continue;
    const d = Math.hypot((c + 0.5) * TILE_SIZE - f.x, (r + 0.5) * TILE_SIZE - f.y);
    if (d < bestD) { bestD = d; best = { c, r }; }
  }
  if (best) return tileCenter(best.c, best.r);
  return { x: enemy.x, y: enemy.y };
}

function botTrapsEnemy(f, enemy) {
  if (!enemy || !enemy.alive) return false;
  const probe = bombProbe(f);
  const et = worldToGrid(enemy.x, enemy.y);
  return !escapeExistsFrom(enemy, et.c, et.r, bombs.filter(b => !b.exploded).concat(probe), probe.fuse, 0.15);
}

function escapeExistsFrom(f, sc, sr, list, limit, margin) {
  const eff = new Map();
  for (const b of list) eff.set(b, b.fuse != null ? b.fuse : bombFuseFor(b.type));
  for (let pass = 0; pass < 2; pass++) {
    for (const b of list) for (const o of list) {
      if (o === b) continue;
      if (bombBlastHas(o, b.c, b.r)) eff.set(b, Math.min(eff.get(b), eff.get(o)));
    }
  }
  const cellFuse = (c, r) => {
    let t = Infinity;
    for (const [b, fu] of eff) if (bombBlastHas(b, c, r)) t = Math.min(t, fu);
    return t;
  };
  const startFuse = cellFuse(sc, sr);
  const budget = Math.min(limit, Number.isFinite(startFuse) ? startFuse : limit);
  const speed = Math.max(60, fighterSpeed(f)) * 0.75;
  const maxSteps = Math.floor(((budget - margin) * speed) / TILE_SIZE);
  if (maxSteps < 1) return false;
  const seen = new Set([`${sc},${sr}`]);
  let frontier = [{ c: sc, r: sr }];
  for (let step = 1; step <= maxSteps; step++) {
    const arrival = ((step - 0.5) * TILE_SIZE) / speed;
    const next = [];
    for (const node of frontier) {
      for (const [dc, dr] of BFS_DIRS) {
        const c = node.c + dc, r = node.r + dr;
        const k = `${c},${r}`;
        if (seen.has(k) || !isTileWalkable(c, r, f)) continue;
        seen.add(k);
        const fu = cellFuse(c, r);
        if (fu < arrival + 0.2) continue;
        if (!Number.isFinite(fu)) return true;
        next.push({ c, r });
      }
    }
    if (!next.length) break;
    frontier = next;
  }
  return false;
}

function bestEffortStep(f) {
  const { c: sc, r: sr } = worldToGrid(f.x, f.y);
  const live = bombs.filter(b => !b.exploded);
  let urgent = null, uf = Infinity;
  for (const b of live) if (bombBlastHas(b, sc, sr) && b.fuse < uf) { urgent = b; uf = b.fuse; }
  let best = null, bestFuse = -1;
  for (const [dc, dr] of BFS_DIRS) {
    const c = sc + dc, r = sr + dr;
    if (!isTileWalkable(c, r, f)) continue;
    if (urgent && bombBlastHas(urgent, c, r)) continue;
    let fu = Infinity;
    for (const b of live) if (bombBlastHas(b, c, r)) fu = Math.min(fu, b.fuse);
    if (fu > bestFuse) { bestFuse = fu; best = { c, r }; }
  }
  return best;
}

function botEscapeStep(f, extra = [], fuseLimit = 2.35) {
  const list = bombs.filter(b => !b.exploded).concat(extra);
  const eff = new Map();
  for (const b of list) eff.set(b, Math.min(b.fuse != null ? b.fuse : bombFuseFor(b.type), fuseLimit));
  for (const b of list) for (const o of list) {
    if (o === b) continue;
    if (bombBlastHas(o, b.c, b.r)) eff.set(b, Math.min(eff.get(b), eff.get(o)));
  }
  const cellFuse = (c, r) => {
    let t = Infinity;
    for (const [b, fu] of eff) if (bombBlastHas(b, c, r)) t = Math.min(t, fu);
    return t;
  };
  const { c: sc, r: sr } = worldToGrid(f.x, f.y);
  const startFuse = cellFuse(sc, sr);
  if (!Number.isFinite(startFuse)) return { c: sc, r: sr };
  const speed = Math.max(60, fighterSpeed(f)) * 0.6;
  const maxSteps = Math.max(1, Math.floor((Math.min(fuseLimit, startFuse) * speed) / TILE_SIZE + 0.35));
  const prev = new Map();
  const seen = new Set([`${sc},${sr}`]);
  let frontier = [{ c: sc, r: sr }];
  for (let step = 1; step <= maxSteps; step++) {
    const arrival = Math.max(0.05, (step - 0.5) * TILE_SIZE / speed) + 0.45;
    const next = [];
    for (const node of frontier) {
      for (const [dc, dr] of BFS_DIRS) {
        const c = node.c + dc, r = node.r + dr;
        const k = `${c},${r}`;
        if (seen.has(k) || !isTileWalkable(c, r, f)) continue;
        seen.add(k);
        prev.set(k, node);
        const fu = cellFuse(c, r);
        if (fu !== Infinity && fu <= arrival) continue;
        if (!Number.isFinite(fu)) {
          let cur = { c, r };
          for (let guard = 0; guard < 600; guard++) {
            const p = prev.get(`${cur.c},${cur.r}`);
            if (!p || (p.c === sc && p.r === sr)) break;
            cur = p;
          }
          return cur;
        }
        next.push({ c, r });
      }
    }
    if (!next.length) break;
    frontier = next;
  }
  return null;
}

function findDanger(f) {
  const { c: fc, r: fr } = worldToGrid(f.x, f.y);
  const sameTeam = b => {
    if (f.team === 0 || !b.ownerId) return false;
    const owner = fighters.find(o => o.id === b.ownerId);
    return !!owner && owner.team === f.team;
  };
  const alert = bombs.some(b => !b.exploded && b.ownerId === f.id && Math.hypot(b.x - f.x, b.y - f.y) < TILE_SIZE * 5);
  let worst = null, worstDist = Infinity;
  for (const b of bombs) {
    if (b.exploded) continue;
    if (sameTeam(b)) continue;
    if (!alert && b.ownerId !== f.id && b.bornAt != null && match.elapsedTime - b.bornAt < (f.ai.sense || 1.0)) continue;
    let hit = false;
    if (b.type === 'SHOCK') {
      const radiusPx = (1.4 + b.range * 0.55) * TILE_SIZE;
      hit = Math.hypot(b.x - f.x, b.y - f.y) < radiusPx;
    } else hit = bombBlastHas(b, fc, fr);
    if (hit) { const d = Math.hypot(b.x - f.x, b.y - f.y); if (d < worstDist) { worst = b; worstDist = d; } }
  }
  return worst;
}

function tileThreatened(c, r) {
  for (const b of bombs) {
    if (b.exploded) continue;
    if (bombBlastHas(b, c, r)) return true;
  }
  return false;
}

const BFS_DIRS = [[0, -1], [0, 1], [-1, 0], [1, 0]];

function bfsFirstStep(f, startC, startR, isGoal, maxNodes = 500, blocked = null) {
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
      if (blocked && blocked.has(k)) continue;
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
  if (hazardCellType(start.c, start.r) === 'lava' && !findDanger(f)) {
    const safeSteps = [];
    for (const [dc, dr] of BFS_DIRS_4) {
      const c = start.c + dc, r = start.r + dr;
      if (isTileWalkable(c, r, f) && hazardCellType(c, r) !== 'lava') safeSteps.push({ c, r });
    }
    if (safeSteps.length) { setBotStep(f, safeSteps[Math.floor(Math.random() * safeSteps.length)], 0.12); return; }
  }
  if (findDanger(f)) {
    const fuseLimit = Math.max(0.3, threatFuseAt(start.c, start.r));
    const step = botEscapeStep(f, [], fuseLimit);
    if (step && (step.c !== start.c || step.r !== start.r)) { setBotStep(f, step, 0.12); return; }
    const best = bestEffortStep(f);
    if (best) { setBotStep(f, best, 0.1); return; }
    f.ai.stepX = f.x; f.ai.stepY = f.y; f.ai.pathTimer = 0.25; return;
  }
  if (f.ai.targetX === null || f.ai.targetY === null) {
    f.ai.stepX = f.x; f.ai.stepY = f.y; f.ai.pathTimer = 0.35; return;
  }
  const goal = worldToGrid(f.ai.targetX, f.ai.targetY);
  if (goal.c !== start.c || goal.r !== start.r) {
    const blast = simulatedBlastSet();
    const step = bfsFirstStep(f, start.c, start.r, (c, r) => c === goal.c && r === goal.r, 900, blast);
    if (step) { setBotStep(f, step, 0.22); return; }
    const safe = randomWalkableNear(f, 6);
    if (safe) {
      const sg = worldToGrid(safe.x, safe.y);
      const alt = bfsFirstStep(f, start.c, start.r, (c, r) => c === sg.c && r === sg.r, 900, blast);
      if (alt) { f.ai.targetX = null; f.ai.targetY = null; setBotStep(f, alt, 0.16); return; }
    }
  }
  f.ai.targetX = null; f.ai.targetY = null;
  if (match.elapsedTime >= (f.ai.digAt || 0) && hasCrateInCross(f) && botTryBomb(f, 1)) {
    f.ai.digAt = match.elapsedTime + 0.9;
    f.ai.pathTimer = 0.3;
    return;
  }
  const roam = roamStep(f);
  if (roam) { setBotStep(f, roam, 0.22); return; }
  f.ai.stepX = f.x; f.ai.stepY = f.y; f.ai.pathTimer = 0.3;
}

function roamStep(f, depth = 4) {
  const start = worldToGrid(f.x, f.y);
  const blast = simulatedBlastSet();
  const prev = new Map();
  const seen = new Set([`${start.c},${start.r}`]);
  const options = [];
  let frontier = [{ c: start.c, r: start.r }];
  for (let step = 1; step <= depth; step++) {
    const next = [];
    for (const node of frontier) {
      for (const [dc, dr] of BFS_DIRS) {
        const c = node.c + dc, r = node.r + dr;
        const k = `${c},${r}`;
        if (seen.has(k) || !isTileWalkable(c, r, f) || blast.has(k) || hazardCellType(c, r) === 'lava') continue;
        seen.add(k); prev.set(k, node); next.push({ c, r });
      }
    }
    if (!next.length) break;
    options.push(...next);
    frontier = next;
  }
  if (!options.length) return null;
  let cur = options[Math.floor(Math.random() * options.length)];
  for (let guard = 0; guard < 50; guard++) {
    const p = prev.get(`${cur.c},${cur.r}`);
    if (!p || (p.c === start.c && p.r === start.r)) break;
    cur = p;
  }
  return cur;
}

function randomWalkableNear(f, range) {
  const { c: fc, r: fr } = worldToGrid(f.x, f.y);
  const blast = simulatedBlastSet();
  for (let attempt = 0; attempt < 24; attempt++) {
    const c = fc + Math.floor((Math.random() * 2 - 1) * range);
    const r = fr + Math.floor((Math.random() * 2 - 1) * range);
    if (!inBounds(c, r)) continue;
    if (match.safeRing > 0 && (c <= match.safeRing || r <= match.safeRing || c >= GRID_SIZE - 1 - match.safeRing || r >= GRID_SIZE - 1 - match.safeRing)) continue;
    if (!isTileWalkable(c, r, f) || blast.has(`${c},${r}`)) continue;
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

  const { c: bc, r: br } = worldToGrid(f.x, f.y);
  const edge = Math.min(bc, br, GRID_SIZE - 1 - bc, GRID_SIZE - 1 - br);
  const stormClose = match.stormWarning || match.stormTimer <= match.warningDuration + 2;
  if (edge <= match.safeRing + 1 || (stormClose && edge <= match.safeRing + 3)) {
    f.ai.targetX = WORLD_PX / 2; f.ai.targetY = WORLD_PX / 2;
    return;
  }

  const snack = nearestPowerup(f, TILE_SIZE * 4);
  if (snack) { f.ai.targetX = snack.x; f.ai.targetY = snack.y; return; }

  // Aliados: protege o humano do time e nunca bombardeia colega de equipe
  if (f.team !== 0) {
    const humanAlly = fighters.find(h => h.team === f.team && h.isHuman && h.alive);
    const threat = nearestEnemy(f, TILE_SIZE * 13);
    if (humanAlly && threat) {
      const dEnemy = Math.hypot(threat.x - humanAlly.x, threat.y - humanAlly.y);
      const dAlly = Math.hypot(humanAlly.x - f.x, humanAlly.y - f.y);
      if (dEnemy < TILE_SIZE * 4 && dAlly < TILE_SIZE * 6) {
        const step = botApproachStep(f, threat);
        f.ai.targetX = step.x; f.ai.targetY = step.y;
        const alignedX = Math.abs(threat.y - f.y) < TILE_SIZE * 0.8 &&
          Math.abs(threat.x - f.x) <= TILE_SIZE * (f.bombRange + 1.2);
        const alignedY = Math.abs(threat.x - f.x) < TILE_SIZE * 0.8 &&
          Math.abs(threat.y - f.y) <= TILE_SIZE * (f.bombRange + 1.2);
        if (alignedX || alignedY) botTryBomb(f, 0.7);
        return;
      }
    }
    if (humanAlly && !threat) {
      const d = Math.hypot(humanAlly.x - f.x, humanAlly.y - f.y);
      if (d > TILE_SIZE * 3) { f.ai.targetX = humanAlly.x; f.ai.targetY = humanAlly.y; return; }
    }
  }

  const enemy = botPickTarget(f);
  if (enemy) {
    const d = Math.hypot(enemy.x - f.x, enemy.y - f.y);
    const alignedX = Math.abs(enemy.y - f.y) < TILE_SIZE * 0.8 && Math.abs(enemy.x - f.x) <= TILE_SIZE * (f.bombRange + 0.3);
    const alignedY = Math.abs(enemy.x - f.x) < TILE_SIZE * 0.8 && Math.abs(enemy.y - f.y) <= TILE_SIZE * (f.bombRange + 0.3);
    if (d <= TILE_SIZE * (f.bombRange + 0.7) && botTrapsEnemy(f, enemy)) botTryBomb(f, 1);
    else if ((alignedX || alignedY) && d <= TILE_SIZE * (f.bombRange + 0.25)) {
      const chance = (alignedX && alignedY ? 0.95 : 0.7) * f.ai.aggression;
      botTryBomb(f, chance);
    }
    const step = botApproachStep(f, enemy);
    f.ai.targetX = step.x; f.ai.targetY = step.y;
    return;
  }

  // Sem ninguém à vista: investiga a última explosão (bots "ouvem" a arena)
  const boom = match.lastBoom;
  if (boom && match.elapsedTime - boom.t < 2.8 && f.ai.style !== 'farmer') {
    const d = Math.hypot(boom.x - f.x, boom.y - f.y);
    if (d > TILE_SIZE * 2 && d < TILE_SIZE * 9) { f.ai.targetX = boom.x; f.ai.targetY = boom.y; return; }
  }

  if (hasCrateInCross(f) && botTryBomb(f, f.ai.farm)) { f.ai.digAt = match.elapsedTime + 0.9; return; }

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
  if (f.ai.timer <= 0) {
    const r = f.ai.reaction || [0.26, 0.5];
    f.ai.timer = r[0] + Math.random() * (r[1] - r[0]);
    decideBotAction(f);
  }
  const dangerNow = findDanger(f);
  if (dangerNow || f.ai.pathTimer <= 0) replanBotPath(f);
  const dx = f.ai.stepX - f.x, dy = f.ai.stepY - f.y;
  const d = Math.hypot(dx, dy);
  if (d > 6) {
    const { c: curC, r: curR } = worldToGrid(f.x, f.y);
    const { c: stepC, r: stepR } = worldToGrid(f.ai.stepX, f.ai.stepY);
    if (!tileThreatened(curC, curR) && tileThreatened(stepC, stepR)) {
      f.ai.pathTimer = 0;
      f.vx = 0; f.vy = 0;
    } else {
      f.vx = dx / d; f.vy = dy / d;
      if (!dangerNow) {
        let sx = 0, sy = 0;
        for (const o of fighters) {
          if (o === f || !o.alive) continue;
          const ox = f.x - o.x, oy = f.y - o.y;
          const od = Math.hypot(ox, oy);
          if (od < TILE_SIZE * 0.75) {
            if (od < 0.5) { sx += (Math.random() - 0.5) * 2; sy += (Math.random() - 0.5) * 2; }
            else { sx += (ox / od) * (1 - od / (TILE_SIZE * 0.75)); sy += (oy / od) * (1 - od / (TILE_SIZE * 0.75)); }
          }
        }
        if (sx || sy) {
          const sl = Math.hypot(sx, sy);
          f.vx = f.vx * 0.6 + (sx / sl) * 0.4;
          f.vy = f.vy * 0.6 + (sy / sl) * 0.4;
          const nl = Math.hypot(f.vx, f.vy);
          f.vx /= nl; f.vy /= nl;
        }
      }
    }
  } else {
    f.ai.pathTimer = 0;
    f.vx = 0; f.vy = 0;
  }
}

/* ========================================================================
   12. STORM, AIRDROPS & MATCH FLOW (COM VITÓRIA POR TIME)
   ======================================================================== */
function updateStormAndAirdrops(dt) {
  match.stormTimer -= dt;
  if (!match.stormWarning && match.stormTimer <= match.warningDuration && match.safeRing < MAX_RING) {
    match.stormWarning = true;
    UI.stormBanner.classList.remove('hidden');
    SFX.playWarning();
  }
  if (match.stormTimer <= 0) {
    match.stormWarning = false;
    UI.stormBanner.classList.add('hidden');
    if (match.safeRing < MAX_RING) { crushRing(match.safeRing); match.safeRing++; }
    match.stormTimer = match.stormInterval;
  }

  // Dano contínuo na zona vermelha (fora do anel seguro).
  // Antes, só o fechamento do anel machucava; dava para ficar parado no
  // vermelho entre fechamentos sem perder vida.
  if (!match.demoMode && match.safeRing > 0) {
    match.stormTick += dt;
    if (match.stormTick >= 1.25) {
      match.stormTick = 0;
      const lo = match.safeRing, hi = GRID_SIZE - 1 - match.safeRing;
      for (const f of fighters) {
        if (!f.alive) continue;
        const { c, r } = worldToGrid(f.x, f.y);
        if (c >= lo && c <= hi && r >= lo && r <= hi) continue;
        damageFighter(f, 1, null, true);
      }
    }
  } else {
    match.stormTick = 0;
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
  const ring = clamp(match.safeRing, 1, MAX_RING - 1);
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
      f.x = (GRID_MID + (Math.random() - 0.5) * 2) * TILE_SIZE;
      f.y = (GRID_MID + (Math.random() - 0.5) * 2) * TILE_SIZE;
      addFloatingLabel('SHIELD WARP!', f.x, f.y - 20, '#22d3ee');
      if (isMyFighter(f)) updateHUD();
    } else {
      const spot = stormRescueSpot(f, ring);
      damageFighter(f, 1, null, true);
      if (!f.alive) return;
      if (spot) {
        spawnParticles(f.x, f.y, '#f43f5e', 14, 130, 0.4);
        f.x = spot.x; f.y = spot.y;
        f.vx = 0; f.vy = 0; f.kbX = 0; f.kbY = 0;
        f.ai.targetX = null; f.ai.targetY = null;
        f.ai.stepX = spot.x; f.ai.stepY = spot.y;
        f.ai.lastX = spot.x; f.ai.lastY = spot.y;
        f.ai.pathTimer = 0;
        addFloatingLabel('ZONA!', spot.x, spot.y - 22, '#f43f5e');
      }
      f.invulnTimer = Math.max(f.invulnTimer, 1.2);
      if (isMyFighter(f)) { match.hitFlash = 0.45; triggerShake(7); updateHUD(); }
    }
  });
}

function stormRescueSpot(f, ring) {
  const lo = ring + 1, hi = GRID_SIZE - 2 - ring;
  if (lo > hi) return null;
  const { c: fc, r: fr } = worldToGrid(f.x, f.y);
  let best = null, bestD = Infinity;
  for (let r = lo; r <= hi; r++) {
    for (let c = lo; c <= hi; c++) {
      if (!isTileWalkable(c, r, f)) continue;
      if (fighters.some(o => o !== f && o.alive && Math.floor(o.x / TILE_SIZE) === c && Math.floor(o.y / TILE_SIZE) === r)) continue;
      const d = (c - fc) ** 2 + (r - fr) ** 2;
      if (d < bestD) { bestD = d; best = tileCenter(c, r); }
    }
  }
  return best;
}

function checkMatchEnd(dt) {
  const alive = fighters.filter(f => f.alive);
  const cfg = MODE_CONFIG[match.mode] || MODE_CONFIG.SOLO;

  if (match.mode === 'TUTORIAL') {
    if (!match.demoMode && !match.ended && tutorial.active) checkTutorialEnd();
    return;
  }

  if (match.demoMode) {
    if (alive.length <= 1) {
      match.demoRestart += dt;
      if (match.demoRestart > 2.5) initArena(true, match.mode, match.mapId);
    } else match.demoRestart = 0;
    return;
  }
  if (cfg.duel) { updateDuel(dt); return; }
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

function endMatch(win, isTeamMode = false, opts = {}) {
  if (match.ended) return;
  if (match.mode === 'DUEL' && duel.active && !duel.over && !opts.forceDuelEnd) return;
  // A voz é só da partida: encerra o microfone e esconde o painel.
  if (window.VoiceChat) window.VoiceChat.setVisible(false);
  const shouldRecord = opts.record !== false;
  if (!shouldRecord) match.lastXp = 0;
  match.ended = true; match.running = false; match.shake = 0;
  resetJoystick();
  const endDoubleBtn = document.getElementById('btnDoubleReward');
  if (endDoubleBtn) endDoubleBtn.classList.add('hidden');
  const endEventEl = document.getElementById('endEventLine');
  if (endEventEl) { endEventEl.textContent = ''; endEventEl.classList.add('hidden'); }
  const endBracketEl = document.getElementById('endBracketLine');
  if (endBracketEl) { endBracketEl.textContent = ''; endBracketEl.className = 'end-bracket hidden'; }
  const human = getHuman();
  const winner = fighters.find(f => f.alive) || null;
  const total = fighters.length;
  const rank = win ? 1 : (match.humanRank || (fighters.filter(f => f.alive).length + 1));
  const dict = I18N[currentLang];
  // Em modos de time, a vitória é do time — mesmo que o último sobrevivente
  // seja um bot aliado. Em modos normais, só conta se o humano sobreviveu.
  const ownerWon = match.mode === 'DUEL'
    ? !!win
    : (isTeamMode ? !!win : (!!winner && winner === human));
  const competitive = isCompetitiveEnd();
  // Confronto da chave não soma pontos de Liga: a tabela já definiu o G8 e
  // o mata-mata é eliminatório (só troféus/estatísticas contam).
  const league = match.mode === 'ONLINE' && (!!match.netRole || !!net.role) && !match.bracketSlot;
  const effort = competitive ? {
    roundsWon: match.mode === 'DUEL' ? (duel.wins[0] || 0) : 0,
    heartsTaken: match.mode === 'DUEL' ? (duel.heartsTaken || 0) : (match.humanHeartsTaken || 0),
    survived: match.mode === 'DUEL' ? (duel.seriesTime || 0) : (match.humanSurvived != null ? match.humanSurvived : match.elapsedTime),
    earlySelfKill: match.mode === 'DUEL' ? !!duel.earlySelfKill : !!match.selfKillEarly
  } : null;

  if (UI.btnPlayAgain) {
    const label = UI.btnPlayAgain.querySelector('span');
    if (label) label.textContent = net.role ? dict.rematchBtn : dict.playAgainBtn;
  }

  // Duelo local 1v1: mostra explicitamente qual jogador venceu
  if (match.mode === 'LOCAL' && !match.netRole) {
    const control = winner ? controlOf(winner.device) : null;
    const p2Won = control === 'p2';
    UI.endTrophy.textContent = winner ? '🏆' : '🤝';
    UI.endRank.textContent = dict.tagLocalDuel;
    UI.endRank.className = winner
      ? 'inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 font-display font-extrabold text-sm mb-1'
      : 'inline-block px-3 py-1 rounded-full bg-slate-500/20 border border-slate-400/50 text-slate-300 font-display font-extrabold text-sm mb-1';
    UI.endTitle.textContent = !winner ? dict.drawTitle : (p2Won ? dict.p2WinTitle : dict.p1WinTitle);
    UI.endSub.textContent = !winner ? dict.drawSub : (p2Won ? dict.p2Wins : dict.p1Wins);
    UI.endKills.textContent = winner ? winner.kills : 0;
    UI.endTime.textContent = formatTime(match.elapsedTime);
    UI.endModal.classList.remove('hidden');
    if (winner) SFX.playVictory(); else SFX.playHit();
    let localSummary = null;
    if (shouldRecord) localSummary = recordCareer({ win: ownerWon, kills: human ? human.kills : 0, mode: match.mode, time: match.elapsedTime, competitive: false, league: false });
    updateEndLeagueLine(localSummary);
    applyEndButtons(false);
    updateEndXpLine();
    MUSIC.play('menu');
    return;
  }

  UI.endTrophy.textContent = win ? '🏆' : '💀';
  UI.endRank.textContent = isTeamMode ? (win ? dict.teamWinBadge : dict.teamLoseBadge) : `#${rank} / ${total}`;
  UI.endRank.className = win
    ? 'inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 font-display font-extrabold text-sm mb-1'
    : 'inline-block px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/50 text-rose-300 font-display font-extrabold text-sm mb-1';
  
  let subtitle = win ? dict.winSub : dict.loseSub;
  if (isTeamMode) {
    subtitle = win ? dict.teamWinSub : dict.teamLoseSub;
    UI.endTitle.textContent = win ? dict.teamWinTitle : dict.teamLoseTitle;
  } else if (match.mode === 'ONLINE') {
    subtitle = win ? dict.onlineWinSub : dict.onlineLoseSub;
    UI.endTitle.textContent = win ? dict.onlineWinTitle : dict.onlineLoseTitle;
  } else if (win && winner) {
    if (match.mode === 'TEAM1v1') subtitle = dict.duelWinSub;
    UI.endTitle.textContent = dict.winTitle;
  } else {
    UI.endTitle.textContent = win ? dict.winTitle : dict.loseTitle;
  }
  if (!win && !isTeamMode && match.mode !== 'LOCAL' && match.mode !== 'ONLINE' && match.lastDeath) {
    const ld = match.lastDeath;
    if (ld.hazard === 'lava') subtitle = dict.deathByLava;
    else if (ld.storm || (!ld.killer && !ld.self)) subtitle = dict.deathByStorm;
    else if (ld.self) subtitle = dict.deathBySelf;
    else subtitle = dict.deathByBomb.replace('{name}', ld.killer);
  }
  
  UI.endSub.textContent = subtitle;
  if (match.mode === 'DUEL') {
    UI.endTitle.textContent = win ? (dict.duelSeriesWon || 'SÉRIE VENCIDA!') : (dict.duelSeriesLost || 'SÉRIE PERDIDA');
    UI.endRank.textContent = `MD${duel.best} · ${duel.wins[0]} × ${duel.wins[1]}`;
    UI.endSub.textContent = (dict.duelSeriesSub || '{a} × {b} — {bo}')
      .replace('{a}', duel.wins[0]).replace('{b}', duel.wins[1]).replace('{bo}', `MD${duel.best}`);
  }
  // O placar pessoal mostra sempre as eliminações do jogador humano,
  // nunca as do bot aliado que porventura tenha sobrevivido.
  UI.endKills.textContent = human ? human.kills : 0;
  UI.endTime.textContent = formatTime(match.elapsedTime);
  UI.endModal.classList.remove('hidden');
  
  if (win) SFX.playVictory(); else SFX.playHit();
  
  const myKills = human ? human.kills : 0;
  let leagueSummary = null;
  if (shouldRecord) {
    leagueSummary = recordCareer({
      win: ownerWon,
      kills: myKills,
      mode: match.mode,
      time: match.elapsedTime,
      competitive,
      league,
      effort
    });
    if (match.mode === 'DUEL' && duel.kind === 'copa') {
      copaApplyResult(ownerWon);
      if (GameState.state.copa.status === 'champion') {
        UI.endTitle.textContent = dict.copaWinTitle || 'CAMPEÃO DA COPA!';
        UI.endSub.textContent = dict.copaWinSub || 'Você venceu as três partidas da Copa Relâmpago!';
      }
    }
    if (match.mode === 'DUEL' && duel.kind === 'bracket' && duel.bracketId) {
      GameState.setBracketResult(duel.bracketId, ownerWon ? 'won' : 'lost');
      duel.bracketId = null;
    }
    // Mata-mata online: o resultado é decidido pelo servidor a partir do
    // estado final da partida. Até o registro oficial, a chave local não avança.
    if (match.mode === 'ONLINE' && match.bracketSlot) {
      bracketReportResult(match.bracketSlot);
    }
  }
  // Evento rotativo: 2 vitórias no mesmo ciclo de 3h pagam +35 moedas e
  // +25 XP (+50 na Hora do Passe). XP é fixo, sem multiplicador de missão.
  if (shouldRecord && match.eventMode) {
    const evDict = I18N[currentLang] || {};
    const prog = GameState.eventProgress();
    if (ownerWon) {
      const reward = GameState.registerEventWin();
      if (reward && reward.first) {
        endEventEl.textContent = evDict.eventFirstReward || '🎪 Evento: 1ª vitória! +10 moedas. Mais 1 para +35 moedas e +25 XP.';
      } else if (reward) {
        const gained = addXp(reward.xp, 'Evento', { raw: true });
        match.lastXp = (match.lastXp || 0) + gained;
        endEventEl.textContent = (evDict.eventRewardGranted || '🎪 Evento: +35 moedas e +{x} XP pela 2ª vitória!').replace('{x}', gained);
      } else {
        endEventEl.textContent = (evDict.eventProgressLine || '🎪 Evento: vitória {n}/2 — mais {m} para a recompensa.')
          .replace('{n}', GameState.eventProgress().wins).replace('{m}', Math.max(0, 2 - GameState.eventProgress().wins));
      }
    } else {
      endEventEl.textContent = (evDict.eventLossLine || '🎪 Evento: {n}/2 vitórias neste ciclo.').replace('{n}', prog.wins);
    }
    endEventEl.classList.remove('hidden');
    updateEndXpLine();
  }
  updateEndLeagueLine(leagueSummary);
  // Revanche não existe em confronto eliminatório: repetir a partida não
  // pode reabrir a chave já confirmada.
  applyEndButtons(competitive, competitive && match.mode === 'ONLINE' && !!net.role && !match.bracketSlot);
  // Dobrar a recompensa: só vitória ONLINE 1v1 válida, 2x por dia.
  if (endDoubleBtn && shouldRecord && ownerWon && match.mode === 'ONLINE' && league) {
    const st = GameState.adStatus('double');
    endDoubleBtn.classList.toggle('hidden', !st.ok);
    endDoubleBtn.disabled = !st.ok;
  }
  updateEndXpLine();
  MUSIC.play('menu');
  updateRotateGate();
}

/* ========================================================================
   12.1 PAUSA & RETORNO AO LOBBY
   ======================================================================== */
function pauseGame(fromHidden = false) {
  if (spectate.active) return;
  if (chroma.active) {
    if (chroma.paused || chroma.phase === 'gameover') return;
    chroma.paused = true;
  } else {
    if (!match.running || match.demoMode || match.ended) return;
    if (match.netRole) return; // pausar online congelaria o outro jogador
    if (match.paused) return;
    match.paused = true;
  }
  if (UI.pauseSubtitle) {
    UI.pauseSubtitle.textContent = fromHidden
      ? 'O jogo foi para segundo plano. Toque em continuar quando estiver pronto.'
      : 'Respire. A arena espera por você.';
  }
  if (UI.pauseModal) UI.pauseModal.classList.remove('hidden');
  resetJoystick();
}

function resumeGame() {
  match.paused = false;
  match.pausedByRotate = false;
  chroma.paused = false;
  chroma.pausedByRotate = false;
  if (UI.pauseModal) UI.pauseModal.classList.add('hidden');
  resetJoystick();
  resetChromaTouch();
  lastTime = performance.now() / 1000;
}

function leaveMatchToLobby() {
  if (window.VoiceChat) window.VoiceChat.setVisible(false);
  if (net.role) { netLeaveRoom(); return; }
  applyEndButtons(false);
  tutorial.active = false; tutorial.finished = false; tutorial.busy = false;
  clearTimeout(tutorial.completeTimer);
  hideTutorialLayer();
  const again = UI.btnPlayAgain && UI.btnPlayAgain.querySelector('span');
  if (again) again.textContent = I18N[currentLang].playAgainBtn;
  UI.endModal.classList.add('hidden');
  UI.hud.classList.add('hidden');
  UI.startScreen.classList.remove('hidden');
  renderProgress();
  renderSkins();
  refreshLobbyScreens();
  match.running = false; match.ended = false; match.paused = false; match.pausedByRotate = false;
  duel.active = false; duel.over = false; duel.roundOver = false; duel.roundTimer = 0;
  clearTimeout(duel.bannerTimer);
  const banner = document.getElementById('duelBanner');
  if (banner) banner.classList.remove('show');
  updateDuelHUD();
  resetJoystick();
  const hudTeams = document.getElementById('hudTeams');
  if (hudTeams) hudTeams.classList.add('hidden');
  match.netRole = null;
  initArena(true, selectedMode, selectedMap);
}

function pauseToLobby() {
  resumeGame();
  if (chroma.active) {
    exitChromaDrop();
    UI.startScreen.classList.remove('hidden');
    return;
  }
  leaveMatchToLobby();
}

/* ========================================================================
   12.2 TUTORIAL DE PRIMEIRA PARTIDA
   ======================================================================== */
const TUTORIAL_STEPS = [
  {
    id: 'move', anchor: 'player', pointer: { pt: 'MOVER', en: 'MOVE' },
    keys: ['WASD', 'JOYSTICK'],
    title: { pt: '1. MOVIMENTO', en: '1. MOVEMENT' },
    text: {
      pt: 'Use WASD (ou arraste o joystick) para se mover pela arena. O objetivo é ser o último de pé!',
      en: 'Use WASD (or drag the joystick) to move around the arena. Your goal is to be the last one standing!'
    }
  },
  {
    id: 'bomb', anchor: 'player', pointer: { pt: 'ESPAÇO', en: 'SPACE' },
    keys: ['ESPAÇO', 'BOTÃO 💣'],
    title: { pt: '2. SOLTE UMA BOMBA', en: '2. DROP A BOMB' },
    text: {
      pt: 'Pressione ESPAÇO (ou o botão 💣) para soltar uma bomba. Ela explode em 2 segundos — saia do alcance!',
      en: 'Press SPACE (or the 💣 button) to drop a bomb. It blows up in 2 seconds — get out of range!'
    }
  },
  {
    id: 'crate', anchor: 'crate', pointer: { pt: 'CAIXA', en: 'CRATE' },
    keys: ['ESPAÇO', 'ANDAR'],
    title: { pt: '3. DESTRUA UMA CAIXA', en: '3. BREAK A CRATE' },
    text: {
      pt: 'Bombas destroem caixas e revelam itens. Solte uma bomba ao lado da caixa destacada e saia correndo!',
      en: 'Bombs break crates and reveal items. Drop a bomb next to the highlighted crate and run away!'
    }
  },
  {
    id: 'pickup', anchor: 'pickup', pointer: { pt: 'ITEM', en: 'ITEM' },
    keys: ['ANDAR'],
    title: { pt: '4. COLETE PODERES', en: '4. GRAB POWER-UPS' },
    text: {
      pt: 'Passe por cima dos itens brilhantes para ganhar mais bombas, alcance e velocidade.',
      en: 'Walk over the glowing items to gain extra bombs, range and speed.'
    }
  },
  {
    id: 'dash', anchor: 'dash', pointer: { pt: 'DASH', en: 'DASH' },
    keys: ['SHIFT', 'BOTÃO ⚡'],
    title: { pt: '5. ESQUIVA DASH', en: '5. DASH DODGE' },
    text: {
      pt: 'O dash é um impulso rápido com breve invulnerabilidade. Use SHIFT ou o botão ⚡ para escapar de explosões.',
      en: 'Dash is a quick burst with brief invulnerability. Use SHIFT or the ⚡ button to escape explosions.'
    }
  },
  {
    id: 'tactical', anchor: 'tactical', pointer: { pt: 'TÁTICA', en: 'TACTICAL' },
    keys: ['E', 'Q'],
    title: { pt: '6. BOMBA TÁTICA', en: '6. TACTICAL BOMB' },
    text: {
      pt: 'Sua bomba tática tem um efeito especial. Pressione E para usar (ou o botão 🌀) e Q para trocar de tipo.',
      en: 'Your tactical bomb has a special effect. Press E to use it (or the 🌀 button) and Q to switch types.'
    }
  },
  {
    id: 'fight', anchor: 'bot', pointer: { pt: 'RIVAL', en: 'RIVAL' },
    keys: ['TUDO'],
    title: { pt: '7. ÚLTIMO DESAFIO', en: '7. FINAL CHALLENGE' },
    text: {
      pt: 'Os rivais acordaram! Use bombas, dash e tática para eliminar os dois e concluir o treinamento.',
      en: 'The rivals are awake! Use bombs, dash and tacticals to take both of them down and finish training.'
    }
  }
];

const tutorial = {
  active: false, finished: false, step: -1, busy: false,
  startPos: null, completeTimer: null
};

function startTutorial() {
  SFX.init();
  clearTimeout(tutorial.completeTimer);
  tutorial.active = false; tutorial.finished = false; tutorial.busy = false;
  UI.endModal.classList.add('hidden');
  UI.startScreen.classList.add('hidden');
  UI.hud.classList.remove('hidden');
  initArena(false, 'TUTORIAL', selectedMap);
  setupTutorialArena();
  tutorial.active = true;
  tutorial.step = -1;
  tutorial.startPos = null;
  document.getElementById('tutorialLayer').classList.remove('hidden');
  tutorialSetStep(0);
}

function setupTutorialArena() {
  const sp = SPAWN_P1;
  for (let dr = -2; dr <= 2; dr++) {
    for (let dc = -2; dc <= 2; dc++) {
      const c = sp.c + dc, r = sp.r + dr;
      if (inBounds(c, r)) grid[r][c] = CELL.FLOOR;
    }
  }
  [[2, -1], [2, 1], [3, 0]].forEach(([dc, dr]) => {
    const c = sp.c + dc, r = sp.r + dr;
    if (inBounds(c, r)) grid[r][c] = CELL.CRATE;
  });
  markGridDirty();
  fighters.forEach((f, i) => {
    if (f.isHuman) return;
    const spot = nearestWalkablePoint(sp.c + 9, sp.r + (i === 0 ? -4 : 4));
    if (spot) {
      f.x = spot.x; f.y = spot.y;
      f.netX = spot.x; f.netY = spot.y;
      f.ai.stepX = spot.x; f.ai.stepY = spot.y;
      f.ai.lastX = spot.x; f.ai.lastY = spot.y;
    }
    f.ai.tutorialDormant = true;
  });
  updateHUD();
}

function nearestWalkablePoint(c0, r0) {
  for (let radius = 0; radius <= 12; radius++) {
    for (let dr = -radius; dr <= radius; dr++) {
      for (let dc = -radius; dc <= radius; dc++) {
        if (Math.max(Math.abs(dr), Math.abs(dc)) !== radius) continue;
        const c = c0 + dc, r = r0 + dr;
        if (!inBounds(c, r) || grid[r][c] !== CELL.FLOOR) continue;
        if (fighters.some(f => Math.floor(f.x / TILE_SIZE) === c && Math.floor(f.y / TILE_SIZE) === r)) continue;
        return tileCenter(c, r);
      }
    }
  }
  return null;
}

function tutorialCrate() {
  const h = getHuman();
  if (!h) return null;
  let best = null, bestD = Infinity;
  for (let r = 1; r < GRID_SIZE - 1; r++) {
    for (let c = 1; c < GRID_SIZE - 1; c++) {
      if (grid[r][c] !== CELL.CRATE) continue;
      const d = Math.hypot((c + 0.5) * TILE_SIZE - h.x, (r + 0.5) * TILE_SIZE - h.y);
      if (d < bestD) { bestD = d; best = { c, r }; }
    }
  }
  return best;
}

function ensureTutorialCrate() {
  const h = getHuman();
  if (!h) return;
  const { c, r } = worldToGrid(h.x, h.y);
  const spots = [[2, 0], [0, 2], [-2, 0], [0, -2], [2, 2], [-2, -2], [2, -2], [-2, 2]];
  for (const [dc, dr] of spots) {
    const cc = c + dc, rr = r + dr;
    if (!inBounds(cc, rr) || grid[rr][cc] !== CELL.FLOOR) continue;
    if (bombs.some(b => !b.exploded && b.c === cc && b.r === rr)) continue;
    grid[rr][cc] = CELL.CRATE;
    markGridDirty();
    return;
  }
}

function tutorialSpawnPickups() {
  const h = getHuman();
  if (!h) return;
  const { c, r } = worldToGrid(h.x, h.y);
  const types = ['BOMB', 'RANGE', 'SPEED'];
  const spots = [[1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1], [-1, 0], [2, 0], [0, 2]];
  let placed = 0;
  for (const [dc, dr] of spots) {
    if (placed >= types.length) break;
    const cc = c + dc, rr = r + dr;
    if (!inBounds(cc, rr)) continue;
    const t = grid[rr][cc];
    if (t !== CELL.FLOOR && t !== CELL.BUSH) continue;
    if (powerups.some(p => { const g = worldToGrid(p.x, p.y); return g.c === cc && g.r === rr; })) continue;
    const center = tileCenter(cc, rr);
    powerups.push({ type: types[placed], x: center.x, y: center.y, bobPhase: Math.random() * 6 });
    placed++;
  }
}

function tutorialSetStep(i) {
  if (!tutorial.active) return;
  if (i >= TUTORIAL_STEPS.length) { finishTutorial(); return; }
  tutorial.step = i;
  const step = TUTORIAL_STEPS[i];
  tutorial.startPos = null;
  if (step.id === 'move') {
    const h = getHuman();
    if (h) tutorial.startPos = { x: h.x, y: h.y };
  } else if (step.id === 'crate') {
    if (!tutorialCrate()) ensureTutorialCrate();
  } else if (step.id === 'pickup') {
    tutorialSpawnPickups();
  } else if (step.id === 'tactical') {
    const h = getHuman();
    if (h) h.tacticalAmmo[h.tacticalType] = Math.max(1, h.tacticalAmmo[h.tacticalType]);
    updateHUD();
  } else if (step.id === 'fight') {
    fighters.forEach(f => {
      if (f.isHuman) return;
      f.ai.tutorialDormant = false;
      f.invulnTimer = Math.max(f.invulnTimer, 0.6);
    });
    const h = getHuman();
    if (h) { h.hp = h.maxHp; h.invulnTimer = Math.max(h.invulnTimer, 0.6); }
    addFloatingLabel(currentLang === 'en' ? 'RIVALS AWAKE!' : 'RIVAIS ACORDARAM!', h ? h.x : WORLD_PX / 2, (h ? h.y : WORLD_PX / 2) - 52, '#f43f5e');
    updateHUD();
  }
  renderTutorialCard();
}

function renderTutorialCard() {
  const step = TUTORIAL_STEPS[tutorial.step];
  if (!step) return;
  const dict = I18N[currentLang];
  const title = document.getElementById('tutorialTitle');
  const text = document.getElementById('tutorialText');
  const keys = document.getElementById('tutorialKeys');
  const counter = document.getElementById('tutorialStepCounter');
  const skip = document.querySelector('#btnTutorialSkip span');
  const badge = document.querySelector('#tutorialCard .tut-badge span');
  if (title) title.textContent = step.title[currentLang] || step.title.pt;
  if (text) text.textContent = step.text[currentLang] || step.text.pt;
  if (counter) counter.textContent = `${tutorial.step + 1}/${TUTORIAL_STEPS.length}`;
  if (keys) keys.innerHTML = step.keys.map(k => `<span class="tut-key">${escapeHtml(k)}</span>`).join('');
  if (skip) skip.textContent = dict.tutorialSkip;
  if (badge) badge.textContent = dict.tutorialBadge;
  const pointer = document.getElementById('tutorialPointer');
  const label = document.getElementById('tutorialPointerLabel');
  if (pointer) pointer.classList.add('show');
  if (label) label.textContent = step.pointer[currentLang] || step.pointer.pt;
}

function tutorialEvent(kind) {
  if (!tutorial.active || match.paused || match.ended) return;
  const step = TUTORIAL_STEPS[tutorial.step];
  if (!step) return;
  if (step.id === kind) tutorialCompleteStep();
}

function tutorialCompleteStep() {
  if (!tutorial.active || tutorial.busy) return;
  tutorial.busy = true;
  SFX.playPickup();
  const card = document.getElementById('tutorialCard');
  if (card) card.classList.add('tut-step-done');
  clearTimeout(tutorial.completeTimer);
  tutorial.completeTimer = setTimeout(() => {
    if (card) card.classList.remove('tut-step-done');
    tutorial.busy = false;
    if (!tutorial.active) return;
    tutorialSetStep(tutorial.step + 1);
  }, 420);
}

function updateTutorial() {
  if (!tutorial.active || match.paused || match.ended) return;
  const step = TUTORIAL_STEPS[tutorial.step];
  if (!step) return;
  if (step.id === 'move') {
    const h = getHuman();
    if (h && tutorial.startPos && Math.hypot(h.x - tutorial.startPos.x, h.y - tutorial.startPos.y) > TILE_SIZE * 1.5) {
      tutorialCompleteStep();
    }
  }
  updateTutorialUI();
}

function tutorialAnchorTarget(step) {
  if (step.anchor === 'dash' || step.anchor === 'tactical') {
    const el = document.getElementById(step.anchor === 'dash' ? 'btnDash' : 'btnTactical');
    if (el) {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top - 4 };
    }
  }
  const h = getHuman();
  let wx = h ? h.x : WORLD_PX / 2, wy = h ? h.y : WORLD_PX / 2;
  if (step.anchor === 'crate') {
    const c = tutorialCrate();
    if (c) { wx = (c.c + 0.5) * TILE_SIZE; wy = (c.r + 0.5) * TILE_SIZE; }
  } else if (step.anchor === 'pickup') {
    let best = null, bestD = Infinity;
    for (const pu of powerups) {
      const d = h ? Math.hypot(pu.x - h.x, pu.y - h.y) : 0;
      if (d < bestD) { bestD = d; best = pu; }
    }
    if (best) { wx = best.x; wy = best.y; }
  } else if (step.anchor === 'bot') {
    const bots = fighters.filter(f => !f.isHuman && f.alive);
    let best = null, bestD = Infinity;
    for (const b of bots) {
      const d = h ? Math.hypot(b.x - h.x, b.y - h.y) : 0;
      if (d < bestD) { bestD = d; best = b; }
    }
    if (best) { wx = best.x; wy = best.y; }
  }
  const lift = step.anchor === 'player' ? 30 : step.anchor === 'bot' ? 18 : 0;
  return { x: viewW / 2 + (wx - cam.x) * cam.zoom, y: viewH / 2 + (wy - cam.y) * cam.zoom - lift };
}

function updateTutorialUI() {
  if (!tutorial.active) return;
  const pointer = document.getElementById('tutorialPointer');
  if (!pointer) return;
  const visible = !match.paused && !match.ended && UI.endModal.classList.contains('hidden') && UI.startScreen.classList.contains('hidden');
  if (!visible) { pointer.classList.remove('show'); return; }
  const step = TUTORIAL_STEPS[tutorial.step];
  if (!step) { pointer.classList.remove('show'); return; }
  const target = tutorialAnchorTarget(step);
  if (!target) { pointer.classList.remove('show'); return; }
  pointer.classList.add('show');
  const x = clamp(target.x, 34, viewW - 34);
  const y = clamp(target.y, 130, viewH - 20);
  pointer.style.transform = `translate(${x}px, ${y}px) translate(-50%, -100%)`;
}

function checkTutorialEnd() {
  if (!tutorial.active) return;
  const botsAlive = fighters.filter(f => !f.isHuman && f.alive).length;
  if (botsAlive === 0) finishTutorial();
}

function hideTutorialLayer() {
  const layer = document.getElementById('tutorialLayer');
  if (layer) layer.classList.add('hidden');
  const card = document.getElementById('tutorialCard');
  if (card) card.classList.remove('tut-step-done');
  const pointer = document.getElementById('tutorialPointer');
  if (pointer) pointer.classList.remove('show');
}

function finishTutorial() {
  if (!tutorial.active) return;
  tutorial.active = false; tutorial.finished = true; tutorial.busy = false;
  clearTimeout(tutorial.completeTimer);
  match.ended = true; match.running = false; match.paused = false;
  resetJoystick();
  hideTutorialLayer();
  savePrefs({ tutorialDone: true });
  updateTutorialButton();
  const dict = I18N[currentLang];
  UI.endTrophy.textContent = '🎓';
  UI.endRank.textContent = dict.tutorialBadge;
  UI.endRank.className = 'end-rank-tut';
  UI.endTitle.textContent = dict.tutorialDoneTitle;
  UI.endSub.textContent = dict.tutorialDoneSub;
  UI.endKills.textContent = getHuman() ? getHuman().kills : 0;
  UI.endTime.textContent = formatTime(match.elapsedTime);
  const label = UI.btnPlayAgain && UI.btnPlayAgain.querySelector('span');
  if (label) label.textContent = dict.tutorialPlayNow;
  UI.endModal.classList.remove('hidden');
  SFX.playVictory();
  MUSIC.play('menu');
}

function exitTutorial() {
  tutorial.active = false; tutorial.finished = false; tutorial.busy = false;
  clearTimeout(tutorial.completeTimer);
  hideTutorialLayer();
  UI.endModal.classList.add('hidden');
  leaveMatchToLobby();
}

function updateTutorialButton() {
  const btn = document.getElementById('btnTutorial');
  if (!btn) return;
  btn.classList.toggle('is-new', !prefs.tutorialDone);
}

/* ========================================================================
   13. HUD
   ======================================================================== */
function updateHUD() {
  const human = getHuman();
  if (!human) return;
  UI.hearts.textContent = '❤️'.repeat(Math.max(0, human.hp)) + '🖤'.repeat(Math.max(0, human.maxHp - human.hp));
  UI.alive.textContent = `${aliveCount()}/${fighters.length}`;
  if (UI.time) {
    const shown = human.alive ? match.elapsedTime : (match.humanSurvived != null ? match.humanSurvived : match.elapsedTime);
    UI.time.textContent = formatTime(shown);
  }
  UI.stormTimer.textContent = match.mode === 'TUTORIAL' ? '∞' : `${Math.max(0, Math.ceil(match.stormTimer))}s`;
  const stormChip = document.getElementById('hudStormChip');
  if (stormChip) stormChip.style.display = match.mode === 'DUEL' ? 'none' : '';
  UI.kills.textContent = human.kills;
  UI.statBombs.textContent = human.maxBombs;
  UI.statRange.textContent = human.bombRange;
  UI.statSpeed.textContent = human.speedLevel;
  UI.shieldPill.classList.toggle('hidden', !human.shield);
  UI.stealthBadge.classList.toggle('hidden', !human.inBush);
  const hazardChip = document.getElementById('hudHazardChip');
  if (hazardChip) {
    const hz = mapHazard();
    const info = hz ? HAZARD_INFO[hz] : null;
    if (info && match.running) {
      const onLava = hz === 'lava' && human.onHazard === 'lava';
      hazardChip.classList.remove('hidden');
      hazardChip.classList.toggle('hazard-warn', onLava);
      hazardChip.style.color = info.color;
      hazardChip.style.borderColor = info.color;
      const iconEl = document.getElementById('hudHazardIcon');
      const labelEl = document.getElementById('hudHazardText');
      if (iconEl) iconEl.textContent = info.icon;
      if (labelEl) {
        const pt = onLava && info.warnPt ? info.warnPt : info.pt;
        const en = onLava && info.warnEn ? info.warnEn : info.en;
        labelEl.textContent = currentLang === 'en' ? en : pt;
      }
    } else {
      hazardChip.classList.add('hidden');
      hazardChip.classList.remove('hazard-warn');
    }
  }
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
  if (match.mode === 'DUEL') updateDuelHUD();
}

/* ========================================================================
   14. INPUT
   ======================================================================== */
const keys = new Set();
const joystick = { active: false, id: null, ox: 0, oy: 0, dx: 0, dy: 0 };
let selectedMode = 'SOLO';
let selectedMap = 'NEON';
let pendingEventMatch = false;

const KEYMAP = {
  p1: { up: ['KeyW'], down: ['KeyS'], left: ['KeyA'], right: ['KeyD'], bomb: ['Space'], dash: ['ShiftLeft'], tactical: ['KeyE'], cycle: ['KeyQ'] },
  p2: { up: ['ArrowUp'], down: ['ArrowDown'], left: ['ArrowLeft'], right: ['ArrowRight'], bomb: ['Enter', 'NumpadEnter'], dash: ['ShiftRight'], tactical: ['Period', 'NumpadDecimal'], cycle: ['Comma'] }
};

const PAD_BUTTONS = [
  { action: 'bomb', btn: 0 }, { action: 'dash', btn: 1 },
  { action: 'tactical', btn: 2 }, { action: 'cycle', btn: 3 }
];

const pads = {
  axes: { p1: { x: 0, y: 0 }, p2: { x: 0, y: 0 } },
  prev: new Map(), startPrev: new Map(),
  connected: { p1: false, p2: false },
  // Mapeia cada slot para o gamepad.index real, para que o jogador 2
  // continue no mesmo controle mesmo se outro aparelho for conectado antes.
  slotIndex: { p1: null, p2: null }
};

function padList() {
  if (!navigator.getGamepads) return [];
  return Array.from(navigator.getGamepads()).filter(gp => gp && gp.connected);
}

function padBySlot(slot) {
  if (!navigator.getGamepads) return null;
  const idx = pads.slotIndex[slot];
  if (idx == null) return null;
  const gp = navigator.getGamepads()[idx];
  return gp && gp.connected ? gp : null;
}

// Reatribui os slots usando o index real de cada controle. Slots já
// ocupados são preservados; controles novos entram no primeiro slot livre.
function syncPadAssignments() {
  const list = padList();
  // Limpa o histórico de botões de controles que foram desconectados,
  // para um controle novo com o mesmo index não começar "travado".
  const live = new Set(list.map(gp => gp.index));
  for (const key of pads.prev.keys()) if (!live.has(key)) pads.prev.delete(key);
  for (const key of pads.startPrev.keys()) if (!live.has(key)) pads.startPrev.delete(key);
  const used = new Set();
  for (const slot of ['p1', 'p2']) {
    const idx = pads.slotIndex[slot];
    if (idx != null && list.some(gp => gp.index === idx) && !used.has(idx)) used.add(idx);
    else pads.slotIndex[slot] = null;
  }
  const free = list.filter(gp => !used.has(gp.index)).sort((a, b) => a.index - b.index);
  for (const slot of ['p1', 'p2']) {
    if (pads.slotIndex[slot] == null && free.length) pads.slotIndex[slot] = free.shift().index;
  }
}

function humanAlive() { const h = getHuman(); return !!(h && h.alive && match.running); }

function performAction(f, action) {
  if (!f || !f.alive || !match.running) return;
  if (action === 'bomb') { placeBomb(f, 'NORMAL'); updateHUD(); }
  else if (action === 'tactical') useTactical(f);
  else if (action === 'cycle') cycleTactical(f);
  else if (action === 'dash') { tryDash(f); updateHUD(); }
}

function handleActionInput(slot, f, action) {
  if (!f || !f.alive || !match.running || match.demoMode || match.paused) return;
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
  if (slot === 'p1' && joystick.active && Math.hypot(joystick.dx, joystick.dy) > Math.max(0.08, settings.deadzone / 100)) { ix = joystick.dx; iy = joystick.dy; }
  const stick = pads.axes[slot];
  if (stick && Math.hypot(stick.x, stick.y) > Math.max(0.08, settings.deadzone / 100)) { ix = stick.x; iy = stick.y; }
  const len = Math.hypot(ix, iy);
  if (len > 1) { ix /= len; iy /= len; }
  return { x: ix, y: iy };
}

function pollGamepads() {
  syncPadAssignments();
  const slots = ['p1', 'p2'];
  const dz = Math.max(0.05, (parseInt(settings.deadzone, 10) || 22) / 100);
  let changed = false;
  for (const slot of slots) {
    const pad = padBySlot(slot);
    const nowConnected = !!pad;
    if (pads.connected[slot] !== nowConnected) changed = true;
    pads.connected[slot] = nowConnected;
    if (!pad) { pads.axes[slot].x = 0; pads.axes[slot].y = 0; continue; }
    let ax = pad.axes[0] || 0, ay = pad.axes[1] || 0;
    if (Math.hypot(ax, ay) < dz) { ax = 0; ay = 0; }
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
    // Só o controle do jogador 1 abre/fecha o menu, para dois controles
    // não alternarem a pausa ao mesmo tempo.
    if (slot === 'p1') {
      const startDown = !!(b[9] && b[9].pressed);
      const startPrev = pads.startPrev.get(pad.index) || false;
      pads.startPrev.set(pad.index, startDown);
      if (startDown && !startPrev) {
        const pauseOpen = UI.pauseModal && !UI.pauseModal.classList.contains('hidden');
        if (pauseOpen) resumeGame();
        else if (UI.startScreen.classList.contains('hidden')) pauseGame();
      }
    }
  }
  if (changed) updatePadStatus();
}

function updatePadStatus() {
  const el = document.getElementById('padStatus');
  if (!el) return;
  // Em telas de toque a linha de controles só ocupa espaço no lobby.
  if (document.body.classList.contains('is-touch')) {
    el.className = 'hidden';
    el.textContent = '';
    return;
  }
  const dict = I18N[currentLang];
  const count = (pads.connected.p1 ? 1 : 0) + (pads.connected.p2 ? 1 : 0);
  if (!count) { el.className = 'hidden'; el.textContent = ''; return; }
  el.className = 'flex items-center justify-center gap-1.5 text-[10px] font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/40 rounded-xl px-2 py-1';
  el.textContent = `🎮 ${count > 1 ? dict.padTwo : dict.padOne}`;
}

/* ========================================================================
   15. LOBBY UI
   ======================================================================== */
let lobbyTab = null;

function setLobbySection(tab) {
  lobbyTab = tab || null;
  document.querySelectorAll('.lobby-section').forEach(section => {
    const on = section.dataset.lobbySection === lobbyTab;
    section.classList.toggle('open', on);
    const head = section.querySelector('.lobby-section-head');
    if (head) head.setAttribute('aria-expanded', on ? 'true' : 'false');
    const body = section.querySelector('.lobby-section-body');
    if (body) body.classList.toggle('hidden', !on);
  });
  const hideActions = selectedMode === 'ONLINE' || lobbyTab !== 'play';
  const startBtn = document.getElementById('btnStartMatch');
  if (startBtn) startBtn.classList.toggle('hidden', hideActions);
  const tutBtn = document.getElementById('btnTutorial');
  if (tutBtn) tutBtn.classList.toggle('hidden', hideActions);
  const hint = document.getElementById('onlineTabHint');
  if (hint) hint.classList.toggle('hidden', !(lobbyTab === 'play' && selectedMode === 'ONLINE'));
  if (lobbyTab === 'progress') renderProgress();
  if (lobbyTab === 'hero') renderSkins();
  if (lobbyTab === 'profile') renderProfile();
  if (lobbyTab === 'league') renderLeague();
  if (lobbyTab === 'bracket') { renderBracket(); renderCopa(); refreshBracketServerState(); }
  if (lobbyTab === 'shop') renderShop();
  if (lobbyTab === 'event') renderEventLobby();
  if (lobbyTab === 'online') {
    if (!netServerLikely()) return;
    if (!netServer.checked) netServerCheck();
    else if (!netServer.available && Date.now() - (netServer.lastCheck || 0) > 15000) netServerCheck(true);
  }
}

function switchLobbyTab(tab) {
  // Competitivo exige nick: ONLINE e MATA-MATA abrem o modal de nick antes.
  if ((tab === 'online' || tab === 'bracket') && !hasCompetitiveNick()) {
    openNickGate(() => setLobbySection(tab));
    return;
  }
  // Tocar na aba ativa mantém a seção aberta: recolher tudo deixaria o
  // lobby sem nenhuma ação visível.
  setLobbySection(tab);
}

/* ========================================================================
   15.05 NICK COMPETITIVO — modal obrigatório para ONLINE / MATA-MATA
   ======================================================================== */
let pendingNickAction = null;

function hasCompetitiveNick() {
  return GameState.validateNick(GameState.state.profile.nick).ok;
}
function nickErrorText(reason) {
  const dict = I18N[currentLang] || {};
  if (reason === 'short') return dict.nickErrShort || 'O nick precisa ter pelo menos 3 caracteres.';
  if (reason === 'long') return dict.nickErrLong || 'O nick pode ter no máximo 15 caracteres.';
  if (reason === 'spaces') return dict.nickErrSpaces || 'O nick não pode ter espaços duplos.';
  return dict.nickErrShort || 'O nick precisa ter pelo menos 3 caracteres.';
}
function openNickGate(action) {
  pendingNickAction = typeof action === 'function' ? action : null;
  const dict = I18N[currentLang] || {};
  const modal = document.getElementById('nickModal');
  const input = document.getElementById('nickModalInput');
  const error = document.getElementById('nickModalError');
  if (error) error.textContent = '';
  if (input) {
    input.classList.remove('invalid');
    input.value = GameState.state.profile.nick || '';
    input.placeholder = dict.nickPlaceholder || 'Digite seu nick...';
    setTimeout(() => { try { input.focus(); } catch (e) {} }, 30);
  }
  if (modal) modal.classList.remove('hidden');
}
function closeNickModal(cancelled = true) {
  const modal = document.getElementById('nickModal');
  if (modal) modal.classList.add('hidden');
  if (cancelled) pendingNickAction = null;
}
function saveNickModal() {
  const dict = I18N[currentLang] || {};
  const input = document.getElementById('nickModalInput');
  const error = document.getElementById('nickModalError');
  const check = GameState.validateNick(input ? input.value : '');
  if (!check.ok) {
    if (error) error.textContent = nickErrorText(check.reason);
    if (input) input.classList.add('invalid');
    return false;
  }
  GameState.setProfile({ nick: check.nick });
  if (window.FirebaseSync && window.FirebaseSync.saveProfileNow) window.FirebaseSync.saveProfileNow();
  const pInput = document.getElementById('profileNickInput');
  const nInput = document.getElementById('playerNameInput');
  if (pInput) pInput.value = check.nick;
  if (nInput) nInput.value = check.nick;
  if (error) error.textContent = '';
  if (input) input.classList.remove('invalid');
  refreshLobbyHeader();
  renderProfile();
  renderLeague();
  renderBracket();
  closeNickModal(false);
  showToast(dict.nickSaved || 'Nick salvo!');
  const action = pendingNickAction;
  pendingNickAction = null;
  if (action) {
    try { action(); } catch (e) {}
  }
  return true;
}
// Portão central do competitivo: sem nick válido, abre o modal e guarda
// a ação para continuar exatamente de onde o jogador parou.
function requireCompetitiveNick(action) {
  if (hasCompetitiveNick()) { action(); return; }
  openNickGate(action);
}
function saveNickFromInput(input, successToast = 'profileSaved') {
  const dict = I18N[currentLang] || {};
  const check = GameState.validateNick(input ? input.value : '');
  if (!check.ok) {
    showToast(nickErrorText(check.reason));
    if (input) input.value = GameState.state.profile.nick || '';
    return false;
  }
  GameState.setProfile({ nick: check.nick });
  if (window.FirebaseSync && window.FirebaseSync.saveProfileNow) window.FirebaseSync.saveProfileNow();
  if (input) input.value = check.nick;
  const other = input && input.id === 'profileNickInput'
    ? document.getElementById('playerNameInput')
    : document.getElementById('profileNickInput');
  if (other) other.value = check.nick;
  refreshLobbyHeader();
  renderProfile();
  renderLeague();
  renderBracket();
  showToast(dict[successToast] || dict.nickSaved || 'Nick salvo!');
  return true;
}

/* ========================================================================
   15.1 TELAS COMPETITIVAS (Perfil, Liga, Mata-Mata, Loja)
   ======================================================================== */
const PROFILE_AVATARS = ['🐍', '🦊', '🐼', '🦉', '🐺', '🐯', '🦎', '🦅', '🦂', '🐻'];
let scheduleTarget = null;

function dayName(d) {
  const pt = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const en = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return (currentLang === 'en' ? en : pt)[Number(d) % 7];
}
function shortDay(d) {
  const pt = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const en = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return (currentLang === 'en' ? en : pt)[Number(d) % 7];
}
function fmtSchedule(sched) {
  return sched ? `${shortDay(sched.day)} • ${sched.time}` : '';
}

function renderProfile() {
  const dict = I18N[currentLang] || {};
  const p = GameState.state.profile;
  renderProfileRank();
  const preview = document.getElementById('profileAvatarPreview');
  if (preview) preview.textContent = p.avatar || '🐍';
  const nickInput = document.getElementById('profileNickInput');
  if (nickInput && document.activeElement !== nickInput) nickInput.value = p.nick || '';
  const stats = document.getElementById('profileStats');
  if (stats) {
    const comp = p.competitive;
    const lv = levelInfo();
    const xpText = lv.maxed ? 'MAX' : `${lv.into}/${lv.need}`;
    stats.innerHTML = `
      <div class="profile-stat-group">
        <span class="profile-stat-title">${dict.profileGeneral || 'PROGRESSO GERAL'}</span>
        <div class="profile-stats">
          <div class="profile-stat"><b>${lv.level}</b><span>${dict.profileLevel || 'NÍVEL'}</span></div>
          <div class="profile-stat"><b>${xpText}</b><span>XP</span></div>
          <div class="profile-stat"><b>${GameState.state.coins}</b><span>${dict.profileCoins || 'MOEDAS'}</span></div>
        </div>
      </div>
      <div class="profile-stat-group">
        <span class="profile-stat-title">${dict.profileCompetitive || 'ESTATÍSTICAS COMPETITIVAS'}</span>
        <div class="profile-stats">
          <div class="profile-stat"><b>${comp.leaguePoints}</b><span>${dict.profileLeaguePts || 'PTS LIGA'}</span></div>
          <div class="profile-stat"><b>${comp.rankedWins}</b><span>${dict.profileRankedWins || 'V RANQ.'}</span></div>
          <div class="profile-stat"><b>${comp.rankedLosses}</b><span>${dict.profileRankedLosses || 'D RANQ.'}</span></div>
          <div class="profile-stat"><b>${comp.trophies}</b><span>${dict.profileTrophies || 'TROFÉUS'}</span></div>
        </div>
      </div>`;
  }
  const box = document.getElementById('profileAvatars');
  if (box) {
    box.innerHTML = PROFILE_AVATARS.map(a =>
      `<button type="button" class="profile-avatar-choice${a === p.avatar ? ' active' : ''}" data-avatar="${a}">${a}</button>`
    ).join('');
  }
}

function renderProfileRank() {
  const el = document.getElementById('profileRank');
  if (!el) return;
  const comp = GameState.state.profile.competitive;
  const rank = GameState.trophyRank();
  el.style.setProperty('--rank-color', rank.color);
  el.innerHTML = `🏆 <b>${comp.trophies || 0}</b> · ${rank.label[currentLang] || rank.label.pt}`;
}

function renderLeague() {
  const dict = I18N[currentLang] || {};
  const table = GameState.leagueTable();
  const el = document.getElementById('leagueTable');
  if (!el) return;
  if (!table.length) {
    el.innerHTML = `<div class="league-empty">${escapeHtml(dict.leagueEmpty || 'Nenhum jogador na tabela ainda. Jogue no modo ONLINE para estrear!')}</div>`;
    return;
  }
  const head = `<div class="league-row head">
    <span class="league-pos">${dict.leaguePos || '#'}</span>
    <span>${dict.leaguePlayer || 'JOGADOR'}</span>
    <span class="league-pts">${dict.leaguePts || 'PTS'}</span>
    <span class="league-w">${dict.leagueW || 'V'}</span>
    <span class="league-l">${dict.leagueL || 'D'}</span>
  </div>`;
  el.innerHTML = head + table.map(row => {
    const cos = row.cosmeticRank && rarityTier(row.cosmeticRank) >= 4 ? ` cos-${row.cosmeticRank}` : '';
    return `
    <div class="league-row${row.pos <= 8 ? ' g8' : ''}${row.me ? ' me' : ''}${cos}" data-player="${row.me ? 'me' : escapeHtml(row.name)}" tabindex="0" role="button" title="${escapeHtml((I18N[currentLang] || {}).tabProfile || 'Perfil')}">
      <span class="league-pos">${row.pos}</span>
      <span class="league-player">${escapeHtml(row.avatar || '🐍')} ${escapeHtml(row.name)}${row.me ? ` <span class="me-tag">${dict.leagueYou || 'VOCÊ'}</span>` : ''}</span>
      <span class="league-pts">${row.points}</span>
      <span class="league-w">${row.wins}</span>
      <span class="league-l">${row.losses}</span>
    </div>`;
  }).join('');
}

/* Perfil público do jogador (tabela, mata-mata, Copa e arquibancada).
   No local o registro vem da tabela da Liga; no Firestore será um documento
   da coleção users com os mesmos campos (avatar, wins, losses, trophies, points). */
function playerProfileRecord(playerIdOrNick) {
  const q = String(playerIdOrNick == null ? '' : playerIdOrNick).trim().toLowerCase();
  if (!q) return null;
  const meName = String(GameState.state.profile.nick || '').trim().toLowerCase();
  if (q === 'me' || (meName && q === meName)) {
    // Clicar no próprio nome sempre relê o perfil atual (vitórias/derrotas
    // podem ter mudado na última partida).
    const p = GameState.state.profile;
    const comp = p.competitive;
    return {
      id: 'me', me: true, name: p.nick || (I18N[currentLang] || {}).nickFallback || 'JOGADOR', avatar: p.avatar,
      points: comp.leaguePoints, wins: comp.rankedWins, losses: comp.rankedLosses,
      trophies: comp.trophies
    };
  }
  return GameState.leagueTable().find(r =>
    String(r.name || '').toLowerCase() === q || String(r.id || '').toLowerCase() === q
  ) || null;
}

function openPlayerStatsModal(playerIdOrNick) {
  const dict = I18N[currentLang] || {};
  const modal = document.getElementById('statsModal');
  const rec = playerProfileRecord(playerIdOrNick);
  if (!modal) return;
  if (!rec) { showToast(dict.statsNoData || 'Estatísticas indisponíveis para este jogador.'); return; }
  const total = Math.max(0, Number(rec.wins) || 0) + Math.max(0, Number(rec.losses) || 0);
  const rate = total > 0 ? Math.round((Math.max(0, Number(rec.wins) || 0) / total) * 100) : 0;
  const rank = GameState.trophyRank(rec.trophies);
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('statsAvatar', rec.avatar || '🐍');
  set('statsName', rec.name || '—');
  const badge = document.getElementById('statsYouBadge');
  if (badge) {
    badge.textContent = dict.statsYou || 'VOCÊ';
    badge.classList.toggle('hidden', !rec.me);
  }
  const rankEl = document.getElementById('statsRank');
  if (rankEl) {
    rankEl.style.setProperty('--rank-color', rank.color);
    rankEl.innerHTML = `🏆 <b>${rec.trophies || 0}</b> · ${escapeHtml(rank.label[currentLang] || rank.label.pt)}`;
  }
  const cell = (value, label, cls = '') =>
    `<div class="stats-cell${cls ? ' ' + cls : ''}"><b>${value}</b><span>${escapeHtml(label)}</span></div>`;
  const grid = document.getElementById('statsGrid');
  if (grid) {
    grid.innerHTML =
      cell(total, dict.statsPlayed || 'PARTIDAS') +
      cell(rec.wins || 0, dict.statsWins || 'VITÓRIAS', 'win') +
      cell(rec.losses || 0, dict.statsLosses || 'DERROTAS', 'loss') +
      cell(`${rate}%`, dict.statsWinRate || 'APROVEITAMENTO', 'wide rate') +
      cell(rec.points || 0, dict.statsLeaguePts || 'PTS LIGA', 'wide pts');
  }
  modal.classList.remove('hidden');
}

function closePlayerStatsModal() {
  const modal = document.getElementById('statsModal');
  if (modal) modal.classList.add('hidden');
}

/* ---------- Estado da chave no servidor (Top 8 congelado + vencedores) ---------- */
const bracketServer = { week: '', seeds: null, winners: {}, loadedAt: 0, loading: false, tickAt: 0, sig: '' };

function bracketNick() { return String((GameState.state.profile && GameState.state.profile.nick) || '').trim(); }
function bracketSame(a, b) {
  return !!a && !!b && String(a).trim().toLowerCase() === String(b).trim().toLowerCase();
}
function bracketServerLive() { return (netServer.available || netServer.base) && !netServer.serverless; }
function bracketServerWinner(id) {
  const w = bracketServer.winners ? bracketServer.winners[id] : null;
  return typeof w === 'string' ? w : (w && typeof w.name === 'string' ? w.name : '');
}
// Ordem das sementes: servidor > lista congelada local > tabela ao vivo.
function bracketSeedNames() {
  if (bracketServer.seeds && bracketServer.seeds.length >= 2) return bracketServer.seeds.slice(0, 8);
  const local = GameState.getWeeklySeeds();
  if (local.length >= 2) return local.slice(0, 8);
  return GameState.leagueTable().slice(0, 8).map(r => r.name);
}
function applyBracketServerState(data) {
  if (!data || !data.ok) return false;
  bracketServer.week = data.week || bracketServer.week;
  if (Array.isArray(data.seeds) && data.seeds.length >= 2) bracketServer.seeds = data.seeds.slice(0, 8);
  bracketServer.winners = data.winners && typeof data.winners === 'object' ? data.winners : {};
  bracketServer.loadedAt = Date.now();
  if (bracketServer.seeds) {
    const cur = GameState.getWeeklySeeds();
    const same = cur.length === bracketServer.seeds.length
      && cur.every((n, i) => bracketSame(n, bracketServer.seeds[i]));
    if (!same) GameState.setWeeklySeeds(bracketServer.seeds);
  }
  // Só pede nova renderização quando o estado oficial realmente mudou.
  const sig = JSON.stringify({ s: bracketServer.seeds, w: bracketServer.winners });
  const changed = sig !== bracketServer.sig;
  bracketServer.sig = sig;
  return changed;
}
// Congela o Top 8 assim que a fase de mata-mata abre. O primeiro aparelho a
// congelar vira a referência no servidor; ninguém mais muda a lista na semana.
function bracketLockSeeds() {
  if (weeklyPhase() !== 'knockout') return;
  const local = GameState.getWeeklySeeds();
  // Servidor já tem a lista oficial: não há o que publicar.
  if (bracketServer.seeds && bracketServer.seeds.length >= 2) return;
  const tbd = (I18N[currentLang] || {}).bracketTbd || 'A definir';
  const names = local.length >= 2 ? local : GameState.leagueTable()
    .slice(0, 8)
    .map(r => String(r.name || '').trim())
    .filter(n => n && n !== tbd);
  // Só congela o G8 completo: tabela ainda carregando (nuvem lenta) não pode
  // virar lista oficial pela metade.
  if (names.length < 8) return;
  if (local.length < 2) {
    GameState.setWeeklySeeds(names);
    renderBracket();
  }
  if (!bracketServerLive()) return;
  netApi('/api/bracket/state', { seeds: names }, 'POST', 6000)
    .then(data => { if (applyBracketServerState(data)) renderBracket(); })
    .catch(() => { /* offline: a lista local congela a semana */ });
}
async function refreshBracketServerState(force = false) {
  if (!bracketServerLive()) return;
  if (bracketServer.loading) return;
  if (!force && Date.now() - bracketServer.loadedAt < 15000) return;
  bracketServer.loading = true;
  try {
    const data = await netApi('/api/bracket/state', {}, 'POST', 6000);
    if (applyBracketServerState(data)) {
      if (weeklyPhase() === 'knockout' && !bracketServer.seeds) bracketLockSeeds();
      renderBracket();
    }
  } catch (e) { /* offline: a chave local continua valendo */ } finally {
    bracketServer.loading = false;
  }}

function bracketMatches() {
  const dict = I18N[currentLang] || {};
  const tbd = dict.bracketTbd || 'A definir';
  const nick = bracketNick();
  const table = GameState.leagueTable();
  // Sementes congeladas na semana: a classificação não muda mais no meio do
  // mata-mata. Antes do congelamento, usa a tabela ao vivo.
  const seeds = bracketSeedNames().map(name => {
    const row = table.find(r => bracketSame(r.name, name));
    return { name, me: !!(row && row.me) || (!!nick && bracketSame(name, nick)) };
  });
  const seedEntry = (pos) => (seeds[pos]
    ? { name: seeds[pos].name, me: !!seeds[pos].me }
    : { name: tbd, me: false });
  const tbdEntry = { name: tbd, me: false };
  const qfPairs = [[0, 7], [1, 6], [2, 5], [3, 4]];
  const qf = qfPairs.map(([a, b], i) => {
    const ea = seedEntry(a), eb = seedEntry(b);
    return {
      id: `qf${i + 1}`, a: ea.name, b: eb.name, aMe: ea.me, bMe: eb.me,
      label: `${a + 1}º × ${b + 1}º`
    };
  });
  // Vencedor confirmado no servidor (vale para confrontos de terceiros também);
  // sem servidor, só o resultado local do próprio jogador conta.
  const serverWinnerFor = (m) => {
    const n = m ? bracketServerWinner(m.id) : '';
    return n && (bracketSame(n, m.a) || bracketSame(n, m.b)) ? n : '';
  };
  const winnerOf = (m) => {
    if (!m) return null;
    const server = serverWinnerFor(m);
    if (server) return { name: server, me: !!nick && bracketSame(server, nick) };
    const res = GameState.getBracketResult(m.id);
    if (!res || !(m.aMe || m.bMe)) return null;
    if (res === 'won') return { name: m.aMe ? m.a : m.b, me: true };
    return { name: m.aMe ? m.b : m.a, me: false };
  };
  // Projeção de terceiros: melhor seed do confronto que não seja o jogador
  // (o próprio nick nunca pode "avançar" sem vitória).
  const project = (a, b) => {
    for (const pos of [a, b]) {
      const e = seedEntry(pos);
      if (e.name !== tbd && !e.me) return e;
    }
    return tbdEntry;
  };
  const playedQf = qf.map(winnerOf);
  const myQfIdx = qf.findIndex(m => m.aMe || m.bMe);
  const mySlots = new Set();
  if (myQfIdx >= 0) {
    mySlots.add(`qf${myQfIdx + 1}`);
    mySlots.add(myQfIdx < 2 ? 'sf1' : 'sf2');
    mySlots.add('f1');
  }
  // Resultado oficial do confronto: o servidor confirmado manda; o local é
  // reserva (partida confirmada também sobrevive a limpar o navegador).
  const outcomeOf = (id) => {
    if (mySlots.has(id)) {
      const server = bracketServerWinner(id);
      if (server) return bracketSame(server, nick) ? 'won' : 'lost';
    }
    return GameState.getBracketResult(id);
  };
  // Trilha do jogador: conta vitórias consecutivas desde as quartas.
  const pathIds = myQfIdx < 0 ? [] : [myQfIdx < 2 ? 'sf1' : 'sf2', 'f1'];
  let stage = 0;
  let lostRun = false;
  if (myQfIdx >= 0) {
    const ids = [`qf${myQfIdx + 1}`, ...pathIds];
    for (const id of ids) {
      const res = outcomeOf(id);
      if (res === 'won') stage++;
      else { lostRun = res === 'lost'; break; }
    }
  }
  const eliminated = lostRun;
  const myHalf = myQfIdx >= 0 ? Math.floor(myQfIdx / 2) : -1;
  // Fases só abrem depois da fase anterior concluída (vitória do jogador);
  // eliminado, o resto da chave segue projetado sem o nick dele.
  const revealSf = (i) => eliminated || stage >= 2 || (i === myHalf && stage >= 1);
  const revealFin = eliminated || stage >= 2;
  const sf = [0, 1].map(i => {
    const open = revealSf(i);
    const a = open ? (playedQf[i * 2] || project(qfPairs[i * 2][0], qfPairs[i * 2][1])) : tbdEntry;
    const b = open ? (playedQf[i * 2 + 1] || project(qfPairs[i * 2 + 1][0], qfPairs[i * 2 + 1][1])) : tbdEntry;
    return { id: `sf${i + 1}`, a: a.name, b: b.name, aMe: a.me, bMe: b.me, label: '—' };
  });
  const playedSf = sf.map(winnerOf);
  const finA = revealFin ? (playedSf[0] || project(qfPairs[0][0], qfPairs[1][0])) : tbdEntry;
  const finB = revealFin ? (playedSf[1] || project(qfPairs[2][0], qfPairs[3][0])) : tbdEntry;
  const fin = {
    id: 'f1', a: finA.name, b: finB.name, aMe: finA.me, bMe: finB.me,
    label: dict.bracketFinalTime || 'Sábado • 19h30'
  };
  const all = [...qf, ...sf, fin];
  all.forEach(m => {
    // Sem dois jogadores reais não existe transmissão: "A definir × A definir"
    // nunca pode virar card/banner ao vivo.
    const tbdName = !m.a || !m.b || m.a === tbd || m.b === tbd;
    m.live = !tbdName && GameState.isLive(m.id);
    // Resultado do confronto: vencedor confirmado no servidor manda; o local
    // é a reserva quando ainda não há registro central.
    const mine = !!(m.aMe || m.bMe);
    const server = serverWinnerFor(m);
    const local = GameState.getBracketResult(m.id);
    m.result = mine ? (server ? (bracketSame(server, nick) ? 'won' : 'lost') : local) : null;
    const sched = GameState.getSchedule(m.id);
    m.sched = sched;
    if (!tbdName && sched && sched.ts && Date.now() >= sched.ts) m.live = true;
  });
  return { qf, sf, fin };
}

function bracketList() {
  const { qf, sf, fin } = bracketMatches();
  return [...qf, ...sf, fin];
}

function bracketPlayerHtml(name, own = false) {
  const dict = I18N[currentLang] || {};
  const cls = `bracket-player${own ? ' own' : ''}`;
  const tbd = String(name || '') === String(dict.bracketTbd || 'A definir');
  if (!name || tbd) return `<div class="${cls}">${escapeHtml(name || '')}</div>`;
  // Nomes de verdade abrem o perfil do jogador (modal de estatísticas).
  return `<button type="button" class="${cls}" data-player="${own ? 'me' : escapeHtml(name)}">${escapeHtml(name)}</button>`;
}

function bracketCardHtml(m) {
  const dict = I18N[currentLang] || {};
  const mine = !!(m.aMe || m.bMe);
  const phase = weeklyPhase();
  const result = m.result || null;
  const rivalName = m.aMe ? m.b : m.bMe ? m.a : '';
  const rivalTbd = !rivalName || rivalName === (dict.bracketTbd || 'A definir');
  const canPlay = mine && !rivalTbd && !result && phase === 'knockout' && weeklyQualified();
  const when = m.sched ? fmtSchedule(m.sched) : (m.id === 'f1' ? (dict.bracketFinalTime || '') : '');
  const count = m.sched && m.sched.ts
    ? `<span class="bracket-count" data-ts="${m.sched.ts}">${(dict.bracketCountdown || '⏳ {t}').replace('{t}', GameState.countdownText(m.sched.ts))}</span>`
    : '';
  // O botão vermelho de assistir fica para confrontos de terceiros; no
  // confronto do próprio jogador a ação principal é jogar/agendar.
  const watchBtn = (m.live && !mine)
    ? `<button type="button" class="bracket-btn watch" data-watch="${m.id}">${dict.bracketWatch || '🔴 ASSISTIR AO VIVO'}</button>`
    : '';
  let action;
  if (mine) {
    if (bracketDuel.polling && bracketDuel.slot === m.id) {
      action = `<span class="bracket-locked" id="bracketDuelStatus"></span>
       <button type="button" class="bracket-btn" data-bracket-cancel="${m.id}">${dict.bracketCancelSearch || '✖ CANCELAR BUSCA'}</button>`;
    } else if (result === 'won') {
      action = `<span class="bracket-locked">${dict.bracketWonLock || '✅ VITÓRIA • AGUARDE A PRÓXIMA FASE'}</span>
       <button type="button" class="bracket-btn" data-schedule="${m.id}">${dict.bracketSchedule || '📅 AGENDAR'}</button>`;
    } else if (result === 'lost') {
      action = `<span class="bracket-locked">${dict.bracketLostLock || '❌ ELIMINADO NESTA FASE'}</span>`;
    } else if (canPlay) {
      action = `<button type="button" class="bracket-btn play" data-bracket-play="${m.id}">${dict.bracketPlayCta || '⚔️ JOGAR A CHAVE (ONLINE)'}</button>
       <button type="button" class="bracket-btn" data-schedule="${m.id}">${dict.bracketSchedule || '📅 AGENDAR'}</button>`;
    } else {
      const lockText = rivalTbd && phase === 'knockout' && weeklyQualified()
        ? (dict.bracketAwaitRival || '⏳ AGUARDANDO ADVERSÁRIO')
        : phase === 'qualifying'
          ? (dict.weeklyPhase1Lock || '🔒 FASE 1 • LIGA')
          : phase === 'closed'
            ? (dict.weeklyClosedLock || '🔒 FASE ENCERRADA')
            : (dict.weeklyPhase2Lock || '🔒 AGUARDE A FASE 2');
      action = `<span class="bracket-locked">${lockText}</span>${phase === 'knockout' ? `<button type="button" class="bracket-btn" data-schedule="${m.id}">${dict.bracketSchedule || '📅 AGENDAR'}</button>` : ''}`;
    }
  } else {
    action = watchBtn || `<button type="button" class="bracket-btn" data-schedule="${m.id}">${dict.bracketSchedule || '📅 AGENDAR'}</button>`;
  }
  return `<div class="bracket-card${m.live ? ' live' : ''}${mine ? ' mine' : ''}" data-match="${m.id}">
    <div class="bracket-duel">
      ${bracketPlayerHtml(m.a, m.aMe)}
      <div class="bracket-vs">VS</div>
      ${bracketPlayerHtml(m.b, m.bMe)}
    </div>
    <div class="bracket-meta">
      <span class="bracket-time">${when || m.label}</span>
      ${count}
    </div>
    <div class="bracket-actions">${action}</div>
  </div>`;
}

function renderBracket() {
  const dict = I18N[currentLang] || {};
  const board = document.getElementById('bracketBoard');
  if (!board) return;
  const phase = weeklyPhase();
  const qualified = weeklyQualified();
  const phaseEl = document.getElementById('weeklyPhase');
  if (phaseEl) {
    phaseEl.className = `champ-phase ${phase}`;
    phaseEl.textContent = phase === 'qualifying'
      ? (dict.weeklyPhase1 || 'FASE 1 • LIGA (SEG–QUI)')
      : phase === 'knockout'
        ? (dict.weeklyPhase2 || 'FASE 2 • MATA-MATA ONLINE (SEX–SÁB)')
        : (dict.weeklyPhaseClosed || 'FASE ENCERRADA • COPA HOJE');
  }
  const hintEl = document.getElementById('weeklyPhaseHint');
  if (hintEl) {
    const nick = bracketNick();
    const idx = bracketSeedNames().findIndex(n => bracketSame(n, nick));
    const g8 = `G8: ${idx >= 0 ? idx + 1 : '—'}º`;
    hintEl.textContent = phase === 'qualifying'
      ? `${dict.weeklyPhase1Hint || 'Liga ONLINE de pontos corridos: +3 PTS por vitória. Os 8 primeiros avançam.'} • ${g8} • ${dict.bracketTieRule || 'Desempate do G8: pontos → vitórias → menos derrotas → troféus → nick.'}`
      : phase === 'knockout'
        ? (qualified
          ? (dict.weeklyPhase2Qualified || 'Você está no G8. Chave eliminatória PvP contra os 7 melhores.')
          : (dict.weeklyPhase2NoQual || 'Somente o Top 8 da Liga joga o mata-mata desta semana.')) + ` • ${g8}`
        : (dict.weeklyClosedHint || 'O Campeonato Semanal reabre na segunda. Domingo é dia de Copa Relâmpago.');
  }
  const { qf, sf, fin } = bracketMatches();
  const hasSeeds = GameState.leagueTable().length > 0;
  board.innerHTML = `
    ${hasSeeds ? '' : `<div class="bracket-empty-note">${escapeHtml(dict.bracketEmpty || 'Nenhum jogador ranqueado ainda. A Liga ONLINE alimenta o mata-mata.')}</div>`}
    <div class="bracket-col"><div class="bracket-col-title">${dict.bracketQuarters || 'QUARTOS DE FINAL'}</div>${qf.map(bracketCardHtml).join('')}</div>
    <div class="bracket-col"><div class="bracket-col-title">${dict.bracketSemis || 'MEIAS-FINAIS'}</div>${sf.map(bracketCardHtml).join('')}</div>
    <div class="bracket-col"><div class="bracket-col-title">${dict.bracketFinal || 'GRANDE FINAL'}</div>${bracketCardHtml(fin)}<div class="bracket-final">${dict.bracketFinalTime || 'Sábado • 19h30'}</div></div>`;
}

function bracketTick() {
  document.querySelectorAll('.bracket-count[data-ts]').forEach(el => {
    const ts = Number(el.dataset.ts);
    if (!ts) return;
    const dict = I18N[currentLang] || {};
    el.textContent = (dict.bracketCountdown || '⏳ {t}').replace('{t}', GameState.countdownText(ts));
  });
  renderLobbyLiveBanner();
  // Com a aba da chave aberta, busca o estado oficial (sementes e vencedores)
  // a cada 20 s; também tenta congelar o Top 8 se ainda não houver sementes.
  const board = document.getElementById('bracketBoard');
  if (board && board.offsetParent !== null && Date.now() - bracketServer.tickAt > 20000) {
    bracketServer.tickAt = Date.now();
    bracketLockSeeds();
    refreshBracketServerState();
  }
}

function lobbyLiveMatch() {
  // A arquibancada transmite só confrontos de terceiros. A partida do
  // próprio jogador nunca pode virar opção de "assistir" no lobby.
  return bracketList().find(m => m.live && !m.aMe && !m.bMe) || null;
}

function renderLobbyLiveBanner() {
  const banner = document.getElementById('lobbyLiveBanner');
  if (!banner) return;
  const live = lobbyLiveMatch();
  if (!live) { banner.classList.add('hidden'); return; }
  const label = document.getElementById('lobbyLiveMatch');
  if (label) {
    const tpl = (I18N[currentLang] || {}).spectateVs || '{a} × {b}';
    // O banner inteiro já é um botão (assistir): os nomes usam span para não
    // aninhar controles interativos, mas continuam abrindo o perfil.
    const link = (n) => `<span role="button" tabindex="0" class="live-player-link" data-player="${escapeHtml(n)}">${escapeHtml(n)}</span>`;
    label.innerHTML = tpl.split('{a}').join(link(live.a)).split('{b}').join(link(live.b));
  }
  banner.classList.remove('hidden');
}

function refreshLobbyHeader() {
  const p = GameState.state.profile || {};
  const dict = I18N[currentLang] || {};
  const av = document.getElementById('lobbyTopAvatar');
  const nick = document.getElementById('lobbyTopNick');
  const coins = document.getElementById('lobbyTopCoins');
  if (av) av.textContent = p.avatar || '🐍';
  if (nick) {
    // Sem nick: texto visual discreto, sem preencher nenhum campo de digitação.
    const hasNick = !!(p.nick && String(p.nick).trim());
    nick.textContent = hasNick ? p.nick : (dict.lobbyNoNick || 'Jogador (Sem Nick)');
    nick.classList.toggle('no-nick', !hasNick);
  }
  if (coins) coins.innerHTML = `💰 <b>${GameState.state.coins || 0}</b>`;
  renderLobbyLiveBanner();
}

async function startBracketMatch(id) {
  const dict = I18N[currentLang] || {};
  if (!hasCompetitiveNick()) { openNickGate(() => startBracketMatch(id)); return; }
  if (bracketDuel.polling) return;
  if (weeklyPhase() !== 'knockout') {
    showToast(dict.weeklyLocked || '🔒 O mata-mata abre sexta-feira.');
    return;
  }
  if (!weeklyQualified()) {
    showToast(dict.weeklyNotQualified || 'Você ainda não está no G8 da Liga.');
    return;
  }
  if (netServer.code) { showToast(dict.bracketLeaveRoom || 'Saia da sala atual antes de jogar a chave.'); return; }
  if (matchmaking.polling) { showToast(dict.bracketInQuick || 'Cancele a busca rápida antes de jogar a chave.'); return; }
  const m = bracketList().find(x => x.id === id);
  if (!m || !(m.aMe || m.bMe) || m.result) return;
  const rival = m.aMe ? m.b : m.a;
  const tbd = dict.bracketTbd || 'A definir';
  if (!rival || rival === tbd) return;
  if (!(await netServerCheck())) { showToast(dict.serverErrorMsg || 'Falha no servidor. Tente novamente.'); return; }
  if (netServer.serverless) { showToast(dict.bracketUnavailable || 'A chave online precisa do servidor de salas.'); return; }
  // O confronto é PvP online de verdade: pareia com o adversário da chave e
  // só avança quando o resultado é confirmado pelos dois lados.
  bracketDuelSearch(id, rival);
}

let champTab = 'weekly';
function championshipNow() { return new Date(); }
function weeklyPhase(date = championshipNow()) {
  const d = date.getDay();
  if (d >= 1 && d <= 4) return 'qualifying';
  if (d === 5 || d === 6) return 'knockout';
  return 'closed';
}
function copaOpen(date = championshipNow()) { return date.getDay() === 0; }
function copaReady() {
  const c = GameState.ensureCopa();
  return GameState.leagueTable().filter(r => !r.me).length >= 7 && c.field.length >= 7;
}
function weeklyQualified() {
  // Vaga no mata-mata: sementes congeladas da semana ou, antes do congelamento,
  // o Top 8 ao vivo da Liga.
  const nick = bracketNick();
  const seeds = bracketSeedNames();
  if (nick && seeds.some(n => bracketSame(n, nick))) return true;
  return GameState.leagueTable().slice(0, 8).some(row => row.me);
}
function setChampTab(tab) {
  champTab = tab === 'copa' ? 'copa' : 'weekly';
  if (champTab === 'weekly') refreshBracketServerState();
  document.querySelectorAll('[data-champ]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.champ === champTab);
  });
  const weekly = document.getElementById('champWeekly');
  const copa = document.getElementById('champCopa');
  if (weekly) weekly.classList.toggle('hidden', champTab !== 'weekly');
  if (copa) copa.classList.toggle('hidden', champTab !== 'copa');
  if (champTab === 'copa') renderCopa(); else renderBracket();
}

function openOnlineLeague() {
  const dict = I18N[currentLang] || {};
  requireCompetitiveNick(() => {
    setLobbySection('online');
    const target = netServer.available
      ? document.getElementById('btnServerCreate')
      : document.getElementById('btnHostRole');
    if (target) target.focus();
    showToast(dict.leagueOnlineHint || '🌐 Só partidas ONLINE PvP pontuam na Liga.');
  });
}

function copaStageRival(c) {
  const idx = [0, 1, 3][Math.min(2, c.round)] || 0;
  return c.field[idx] || '';
}

function copaApplyResult(win) {
  const c = GameState.ensureCopa();
  if (c.status !== 'active') return;
  if (match.copaRound != null && c.round !== match.copaRound) return;
  const dict = I18N[currentLang] || {};
  if (win) {
    c.round++;
    if (c.round >= 3) {
      c.status = 'champion';
      const reward = GameState.claimCopaReward();
      if (reward) {
        showToast((dict.copaChampionToast || '🏆 CAMPEÃO DA COPA! +{c} 💰 +{t} 🏆')
          .replace('{c}', reward.coins).replace('{t}', reward.trophies));
      }
    } else {
      showToast(dict.copaAdvanced || '⚡ Classificado na Copa Relâmpago!');
    }
  } else {
    c.status = 'eliminated';
  }
  GameState.save();
}

function startCopaMatch() {
  const dict = I18N[currentLang] || {};
  if (!hasCompetitiveNick()) { openNickGate(() => startCopaMatch()); return; }
  if (!copaOpen()) { showToast(dict.copaClosed || '⚡ A Copa Relâmpago acontece no domingo.'); return; }
  if (!copaReady()) { showToast(dict.copaNeedPlayers || 'A Copa Relâmpago precisa de 8 jogadores reais na Liga para abrir.'); return; }
  const c = GameState.ensureCopa();
  if (c.status !== 'active' || c.round > 2) {
    showToast(dict.copaFinished || 'Sua campanha na Copa já terminou.');
    return;
  }
  const rival = copaStageRival(c);
  if (!rival) { showToast(dict.copaNeedPlayers || 'A Copa Relâmpago precisa de 8 jogadores reais na Liga para abrir.'); return; }
  SFX.init();
  UI.startScreen.classList.add('hidden');
  UI.hud.classList.remove('hidden');
  setSelectedMode('DUEL');
  duel.forcedOpponent = rival;
  match.copaRound = c.round;
  startDuelSeries(3, 'copa');
  showToast(`⚡ COPA • ${GameState.state.profile.nick || dict.nickFallback || 'JOGADOR'} × ${rival}`);
}

function copaCardHtml(a, b, opts = {}) {
  const dict = I18N[currentLang] || {};
  const stateText = opts.playable
    ? `<button type="button" class="bracket-btn play" data-copa-play="1">${dict.copaPlay || '⚡ JOGAR COPA'}</button>`
    : opts.won
      ? `<span class="copa-state won">✓ ${dict.copaWon || 'CLASSIFICADO'}</span>`
      : opts.lost
        ? `<span class="copa-state lost">✗ ${dict.copaLost || 'ELIMINADO'}</span>`
        : opts.champion
          ? `<span class="copa-state won">🏆 ${dict.copaChampion || 'CAMPEÃO'}</span>`
          : opts.label
            ? `<span class="copa-state">${opts.label}</span>`
            : '';
  return `<div class="bracket-card${opts.playable ? ' live mine' : ''}" data-copa-match="${opts.id || ''}">
    <div class="bracket-duel">
      ${bracketPlayerHtml(a, !!opts.meA)}
      <div class="bracket-vs">VS</div>
      ${bracketPlayerHtml(b, !!opts.meB)}
    </div>
    ${opts.meta ? `<div class="bracket-meta"><span class="bracket-time copa-meta">${opts.meta}</span></div>` : ''}
    ${stateText ? `<div class="bracket-actions">${stateText}</div>` : ''}
  </div>`;
}

function renderCopa() {
  const dict = I18N[currentLang] || {};
  const board = document.getElementById('copaBoard');
  if (!board) return;
  const c = GameState.ensureCopa();
  const me = GameState.state.profile.nick || 'VOCÊ';
  const tbd = dict.bracketTbd || 'A definir';
  const f = Array.from({ length: 7 }, (_, i) => c.field[i] || tbd);
  const stage = c.round;
  const open = copaOpen();
  const ready = copaReady();
  const active = c.status === 'active';
  const lostAt = c.status === 'eliminated' ? stage : -1;
  const qfWon = stage > 0;
  const sfWon = stage > 1;
  const qfPlayable = active && stage === 0 && open && ready;
  const sfPlayable = active && stage === 1 && open && ready;
  const finPlayable = active && stage === 2 && open && ready;
  // Avanço só com resultado validado: até vencer as Quartas, Meias e Final
  // ficam "A definir"; o lado do adversário aparece junto com a fase aberta.
  const sfA = qfWon ? me : (lostAt === 0 ? f[0] : tbd);
  const sfB = (qfWon || lostAt === 0) ? f[1] : tbd;
  const finA = sfWon ? me : (lostAt === 1 ? f[1] : (lostAt === 2 ? me : tbd));
  const finB = (sfWon || lostAt >= 1) ? f[3] : tbd;
  const qf = [
    copaCardHtml(me, f[0], { id: 'cqf1', meA: true, playable: qfPlayable, won: qfWon, lost: lostAt === 0 }),
    copaCardHtml(f[1], f[2], { id: 'cqf2', meta: dict.copaProjected || 'PROJETADO' }),
    copaCardHtml(f[3], f[4], { id: 'cqf3', meta: dict.copaProjected || 'PROJETADO' }),
    copaCardHtml(f[5], f[6], { id: 'cqf4', meta: dict.copaProjected || 'PROJETADO' })
  ];
  const sf = [
    copaCardHtml(sfA, sfB, { id: 'csf1', meA: sfA === me, playable: sfPlayable, won: sfWon, lost: lostAt === 1 }),
    copaCardHtml(sfB === tbd ? tbd : f[3], sfB === tbd ? tbd : f[5], { id: 'csf2', meta: sfB === tbd ? '' : (dict.copaProjected || 'PROJETADO') })
  ];
  const fin = copaCardHtml(finA, finB, {
    id: 'cf1', meA: finA === me, playable: finPlayable,
    won: stage >= 3, lost: lostAt === 2, champion: c.status === 'champion'
  });
  board.innerHTML = `
    <div class="bracket-col"><div class="bracket-col-title">${dict.bracketQuarters || 'QUARTOS DE FINAL'}</div>${qf.join('')}</div>
    <div class="bracket-col"><div class="bracket-col-title">${dict.bracketSemis || 'MEIAS-FINAIS'}</div>${sf.join('')}</div>
    <div class="bracket-col"><div class="bracket-col-title">${dict.bracketFinal || 'GRANDE FINAL'}</div>${fin}</div>`;
  const phase = document.getElementById('copaPhase');
  if (phase) {
    phase.className = `champ-phase ${c.status === 'champion' ? 'copa' : (c.status === 'eliminated' ? 'closed' : (open ? 'copa' : 'closed'))}`;
    phase.textContent = c.status === 'champion'
      ? (dict.copaChampionTitle || '🏆 CAMPEÃO DA COPA')
      : c.status === 'eliminated'
        ? (dict.copaEliminatedTitle || 'COPA ENCERRADA PARA VOCÊ')
        : open
          ? (dict.copaOpenTitle || '⚡ COPA RELÂMPAGO • ABERTA')
          : (dict.copaClosedTitle || '⚡ COPA RELÂMPAGO • DOMINGO');
  }
  const hint = document.getElementById('copaHint');
  if (hint) {
    hint.textContent = !ready
      ? (dict.copaNeedPlayers || 'A Copa Relâmpago precisa de 8 jogadores reais na Liga para abrir.')
      : c.status === 'champion'
        ? (dict.copaChampionHint || 'Você venceu as três partidas e levou o prêmio da semana.')
      : c.status === 'eliminated'
        ? (dict.copaEliminatedHint || 'A Copa volta no próximo domingo. Sua campanha desta semana terminou.')
        : open
          ? (dict.copaOpenHint || 'Torneio aberto de 8 jogadores • 3 rodadas MD3 • sem exigir G8.')
          : (dict.copaClosedHint || 'Chave rápida de 8 jogadores, aberta a qualquer patente. Volta domingo.');
  }
  const rewards = document.getElementById('copaRewards');
  if (rewards) rewards.textContent = dict.copaReward || '🏆 Campeão: +300 💰 e +40 🏆 • vice e semifinalistas levam troféus de partida';
}

let shopTab = 'skins';
const SHOP_TABS = ['skins', 'bombs', 'explosions', 'trails', 'avatars'];
const SHOP_GRID_IDS = { skins: 'charaShop', bombs: 'bombShop', explosions: 'explosionShop', trails: 'trailShop', avatars: 'avatarShop' };

function shopItemHtml(kind, item, dict) {
  const bucket = kind === 'bombs' ? GameState.state.bombs
    : kind === 'skins' ? GameState.state.skins
      : GameState.state.cosmetics[kind];
  const owned = GameState.isOwned(kind, item.id);
  const equipped = bucket.equipped === item.id;
  const meta = rarityMeta(item.rarity);
  const emoji = item.emoji || (kind === 'skins' ? '🎨' : kind === 'bombs' ? '💣' : '✨');
  const swatch = item.body || item.color || item.glow || meta.color;
  const previewBg = `radial-gradient(circle at 40% 35%, ${swatch}88, #0f172a)`;
  let btn;
  if (equipped) btn = `<button type="button" class="shop-buy equip" disabled>${dict.shopEquipped || '✓ EQUIPADO'}</button>`;
  else if (owned) btn = `<button type="button" class="shop-buy equip" data-shop-kind="${kind}" data-shop-id="${item.id}" data-shop-act="equip">${dict.shopEquip || 'EQUIPAR'}</button>`;
  else if (item.rarity === 'starter') btn = `<button type="button" class="shop-buy equip" data-shop-kind="${kind}" data-shop-id="${item.id}" data-shop-act="equip">${dict.shopDefault || 'PADRÃO'}</button>`;
  else btn = `<button type="button" class="shop-buy buy" data-shop-kind="${kind}" data-shop-id="${item.id}" data-shop-act="buy">${(dict.shopBuy || 'COMPRAR {n} 💰').replace('{n}', item.price)}</button>`;
  const rarityLabel = currentLang === 'en' ? meta.labelEn : meta.label;
  return `<div class="shop-item${equipped ? ' equipped' : ''}${item.rarity === 'starter' ? ' starter' : ''}" data-shop-kind="${kind}" data-shop-id="${item.id}" style="--rarity:${meta.color}">
    ${equipped ? `<span class="shop-owned">${dict.shopInUse || 'EM USO'}</span>` : ''}
    <div class="shop-item-top">
      <div class="shop-preview" style="background:${previewBg};border:1px solid ${swatch}77">${emoji}</div>
      <div style="min-width:0">
        <div class="shop-item-name">${item.name}</div>
        <div class="shop-item-sub">${(item.desc && (item.desc[currentLang] || item.desc.pt)) || ''}</div>
      </div>
    </div>
    <div class="shop-item-foot">
      <span class="shop-rarity">${rarityLabel}</span>
      ${btn}
    </div>
  </div>`;
}

function setShopTab(tab) {
  shopTab = SHOP_TABS.includes(tab) ? tab : 'skins';
  SHOP_TABS.forEach(kind => {
    const grid = document.getElementById(SHOP_GRID_IDS[kind]);
    if (grid) grid.classList.toggle('hidden', kind !== shopTab);
  });
  document.querySelectorAll('[data-shop-tab]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.shopTab === shopTab);
  });
  const reset = document.getElementById('btnShopDefault');
  const defaults = { skins: 'viper', bombs: 'classic', explosions: 'classic', trails: 'none', avatars: 'default' };
  if (reset) {
    const bucket = shopTab === 'bombs' ? GameState.state.bombs
      : shopTab === 'skins' ? GameState.state.skins
        : GameState.state.cosmetics[shopTab];
    reset.classList.toggle('hidden', bucket.equipped === defaults[shopTab]);
    reset.dataset.shopKind = shopTab;
  }
}

let eventLobbySlot = 0;

function renderEventLobby() {
  const rot = currentRotatingEvent();
  eventLobbySlot = rot.slot;
  const ev = rot.event;
  const en = currentLang === 'en';
  const dict = I18N[currentLang] || {};
  const setText = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
  setText('eventIcon', ev.icon);
  setText('eventName', en ? ev.nameEn : ev.name);
  setText('eventDesc', en ? ev.descEn : ev.desc);
  const card = document.querySelector('.event-card');
  if (card) card.style.setProperty('--event-accent', eventThemeColor(rot.index));
  const prog = GameState.eventProgress();
  setText('eventProgressCount', `${Math.min(2, prog.wins)}/2`);
  const fill = document.getElementById('eventProgressFill');
  if (fill) fill.style.width = `${Math.min(100, (prog.wins / 2) * 100)}%`;
  const reward = document.getElementById('eventReward');
  if (reward) reward.classList.toggle('hidden', !prog.rewarded);
  const spin = document.getElementById('btnSpin');
  if (spin) {
    const st = GameState.adStatus('spin');
    spin.disabled = !st.ok;
    spin.innerHTML = `🎬 <span>${st.ok ? (dict.spinBtn || 'GIRAR') : (dict.spinUsed || 'USADO HOJE')}</span>`;
  }
  updateEventCountdown();
}

function updateEventCountdown() {
  const el = document.getElementById('eventCountdown');
  if (!el) return;
  const rot = currentRotatingEvent();
  const remaining = eventCountdownText(rot.endsAt - serverNow());
  el.textContent = remaining;
  const nextEv = ROTATING_EVENTS[rotatingEventIndexFor(rot.slot + 1)];
  const nextName = document.getElementById('eventNextName');
  if (nextName) nextName.textContent = currentLang === 'en' ? nextEv.nameEn : nextEv.name;
  const nextTimer = document.getElementById('eventNextCountdown');
  if (nextTimer) nextTimer.textContent = remaining;
  // Virada de slot: card se atualiza sozinho e o lobby anuncia o novo evento.
  if (eventLobbySlot !== rot.slot) {
    const prev = eventLobbySlot;
    eventLobbySlot = rot.slot;
    const lobbyOpen = UI.startScreen && !UI.startScreen.classList.contains('hidden');
    if (lobbyOpen) {
      renderEventLobby();
      if (prev !== 0) {
        const dict = I18N[currentLang] || {};
        const name = currentLang === 'en' ? rot.event.nameEn : rot.event.name;
        showToast((dict.eventRotated || '🎪 Novo evento: {name}!').replace('{name}', name));
        SFX.playBeep();
      }
    } else if (lobbyTab === 'event') {
      renderEventLobby();
    }
  }
}
setInterval(updateEventCountdown, 1000);

function renderShop() {
  const dict = I18N[currentLang] || {};
  const coins = document.getElementById('shopCoins');
  if (coins) coins.textContent = GameState.state.coins;
  SHOP_TABS.forEach(kind => {
    const grid = document.getElementById(SHOP_GRID_IDS[kind]);
    if (!grid) return;
    // Os 8 itens compráveis da aba (o padrão continua disponível no botão
    // "usar padrão" para quem já trocou de cosmético).
    grid.innerHTML = cosmeticCatalog(kind)
      .filter(item => item.rarity !== 'starter')
      .map(item => shopItemHtml(kind, item, dict))
      .join('');
    grid.classList.toggle('hidden', kind !== shopTab);
  });
  document.querySelectorAll('[data-shop-tab]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.shopTab === shopTab);
  });
  // Baú patrocinado: mostra quantas vezes ainda pode ser aberto hoje.
  const chestBtn = document.getElementById('btnAdChest');
  if (chestBtn) {
    const st = GameState.adStatus('chest');
    chestBtn.textContent = (dict.shopAdChest || '📺 BAÚ +40 💰') + ` (${st.left}/2)`;
    chestBtn.disabled = !st.ok;
  }
  setShopTab(shopTab);
}

/* ---------- Preview animado da loja ----------
   Cada item ganha um palco em canvas com a mesma linguagem visual do jogo:
   skins andando, bombas girando, explosões em loop, rastros desenhando no
   chão e avatares pulsando. Lendários/míticos ganham aura e partículas. */
const previewState = { kind: null, id: null, item: null, raf: 0 };

function equippedIdFor(kind) {
  if (kind === 'bombs') return GameState.state.bombs.equipped;
  if (kind === 'skins') return GameState.state.skins.equipped;
  return GameState.state.cosmetics[kind].equipped;
}

function openShopPreview(kind, id) {
  const item = cosmeticCatalog(kind).find(x => x.id === id);
  if (!item) return;
  const card = document.getElementById('shopPreview');
  if (!card) return;
  previewState.kind = kind; previewState.id = id; previewState.item = item;
  const dict = I18N[currentLang] || {};
  const en = currentLang === 'en';
  const meta = rarityMeta(item.rarity);
  const owned = GameState.isOwned(kind, id);
  const equipped = equippedIdFor(kind) === id;
  const nameEl = document.getElementById('previewName');
  if (nameEl) nameEl.textContent = item.name;
  const descEl = document.getElementById('previewDesc');
  if (descEl) descEl.textContent = (item.desc && (item.desc[currentLang] || item.desc.pt)) || '';
  const rarEl = document.getElementById('previewRarity');
  if (rarEl) {
    rarEl.textContent = en ? meta.labelEn : meta.label;
    rarEl.style.setProperty('--rarity', meta.color);
  }
  const confirmBox = document.getElementById('previewConfirm');
  if (confirmBox) confirmBox.classList.add('hidden');
  const actions = document.getElementById('previewActions');
  if (actions) actions.classList.remove('hidden');
  const buyBtn = document.getElementById('btnPreviewBuy');
  if (buyBtn) {
    buyBtn.classList.toggle('hidden', owned);
    buyBtn.textContent = (dict.previewBuy || 'COMPRAR {n} 💰').replace('{n}', item.price);
  }
  const equipBtn = document.getElementById('btnPreviewEquip');
  if (equipBtn) {
    equipBtn.classList.toggle('hidden', !owned);
    equipBtn.textContent = equipped ? (dict.previewInUse || '✓ EM USO') : (dict.previewEquip || 'EQUIPAR');
    equipBtn.disabled = equipped;
  }
  const balance = document.getElementById('previewBalance');
  if (balance) {
    balance.classList.toggle('hidden', owned);
    const now = GameState.state.coins;
    const nowEl = document.getElementById('previewBalanceNow');
    const afterEl = document.getElementById('previewBalanceAfter');
    if (nowEl) nowEl.textContent = now;
    if (afterEl) afterEl.textContent = Math.max(0, now - item.price);
  }
  card.classList.remove('hidden');
  startPreviewLoop();
}

function closeShopPreview() {
  stopPreviewLoop();
  const card = document.getElementById('shopPreview');
  if (card) card.classList.add('hidden');
  previewState.kind = null; previewState.id = null; previewState.item = null;
}

function startPreviewLoop() {
  stopPreviewLoop();
  const cnv = document.getElementById('previewCanvas');
  if (!cnv) return;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  cnv.width = 320 * dpr; cnv.height = 190 * dpr;
  const pctx = cnv.getContext('2d');
  if (!pctx) return;
  const t0 = performance.now();
  const draw = t => {
    const host = document.getElementById('shopPreview');
    if (!host || host.classList.contains('hidden')) { previewState.raf = 0; return; }
    const sec = (t - t0) / 1000;
    pctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    pctx.clearRect(0, 0, 320, 190);
    drawPreviewItem(pctx, 320, 190, previewState.kind, previewState.item, sec);
    previewState.raf = requestAnimationFrame(draw);
  };
  previewState.raf = requestAnimationFrame(draw);
}

function stopPreviewLoop() {
  if (previewState.raf) cancelAnimationFrame(previewState.raf);
  previewState.raf = 0;
}

function drawPreviewItem(p, w, h, kind, item, t) {
  if (!item) return;
  const tier = rarityTier(item.rarity);
  const swatch = item.body || item.color || item.glow || rarityMeta(item.rarity).color;
  const cx = w / 2;
  const bg = p.createRadialGradient(cx, h * 0.42, 8, cx, h * 0.42, w * 0.62);
  bg.addColorStop(0, hexToRgba(swatch, 0.28));
  bg.addColorStop(1, 'rgba(2,6,23,0)');
  p.fillStyle = bg;
  p.fillRect(0, 0, w, h);

  const aura = (color, radius) => {
    if (tier < 4) return;
    const g = p.createRadialGradient(cx, h * 0.5, 6, cx, h * 0.5, radius);
    g.addColorStop(0, hexToRgba(color, 0.22 + Math.sin(t * 3) * 0.05));
    g.addColorStop(1, 'rgba(0,0,0,0)');
    p.fillStyle = g;
    p.fillRect(cx - radius, h * 0.5 - radius, radius * 2, radius * 2);
    for (let i = 0; i < 6; i++) {
      const ang = t * 1.6 + i * (Math.PI / 3);
      const orbit = radius * 0.72;
      p.fillStyle = hexToRgba(color, 0.85);
      p.beginPath();
      p.arc(cx + Math.cos(ang) * orbit, h * 0.5 + Math.sin(ang) * orbit * 0.55, 2.4, 0, Math.PI * 2);
      p.fill();
    }
  };

  if (kind === 'skins') {
    aura(item.accent || swatch, 82);
    const bob = Math.sin(t * 3) * 3;
    const cy = h * 0.54 + bob;
    p.fillStyle = 'rgba(0,0,0,0.4)';
    p.beginPath(); p.ellipse(cx, cy + 30, 24, 7, 0, 0, Math.PI * 2); p.fill();
    const grad = p.createRadialGradient(cx - 10, cy - 12, 3, cx, cy, 36);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.3, item.body || swatch);
    grad.addColorStop(1, '#0b1220');
    p.fillStyle = grad;
    p.beginPath(); p.arc(cx, cy, 32, 0, Math.PI * 2); p.fill();
    p.strokeStyle = item.accent || swatch;
    p.lineWidth = 3;
    p.beginPath(); p.arc(cx, cy, 32, 0, Math.PI * 2); p.stroke();
    p.fillStyle = item.visor || '#e2e8f0';
    p.beginPath(); p.ellipse(cx, cy - 5, 15, 8, 0, 0, Math.PI * 2); p.fill();
    p.fillStyle = 'rgba(2,6,23,0.85)';
    p.beginPath(); p.ellipse(cx - 5, cy - 5, 3, 4, 0, 0, Math.PI * 2); p.fill();
    p.beginPath(); p.ellipse(cx + 6, cy - 5, 3, 4, 0, 0, Math.PI * 2); p.fill();
    if (item.style === 'dragon') {
      p.fillStyle = item.accent || swatch;
      [[-1, 0], [1, 0]].forEach(([s]) => {
        p.beginPath();
        p.moveTo(cx + s * 18, cy - 26); p.lineTo(cx + s * 28, cy - 40); p.lineTo(cx + s * 30, cy - 22);
        p.closePath(); p.fill();
      });
    }
    if (item.style === 'cosmic') {
      p.strokeStyle = hexToRgba('#ddd6fe', 0.8);
      p.lineWidth = 2;
      p.beginPath(); p.ellipse(cx, cy - 2, 44, 12, t * 0.6, 0, Math.PI * 2); p.stroke();
    }
    if (item.style === 'guardian') {
      p.strokeStyle = hexToRgba('#fef3c7', 0.9);
      p.lineWidth = 3;
      p.beginPath(); p.ellipse(cx, cy - 30, 16, 5, 0, 0, Math.PI * 2); p.stroke();
    }
    return;
  }

  if (kind === 'bombs') {
    aura(item.color || swatch, 76);
    const bob = Math.sin(t * 2.4) * 3;
    const cy = h * 0.56 + bob;
    p.strokeStyle = hexToRgba(item.flame, 0.85);
    p.lineWidth = 3;
    p.beginPath(); p.moveTo(cx + 10, cy - 22); p.quadraticCurveTo(cx + 18, cy - 36, cx + 14, cy - 44); p.stroke();
    const spark = 1 + Math.sin(t * 14) * 0.35;
    p.fillStyle = item.core || '#fef3c7';
    p.beginPath(); p.arc(cx + 14, cy - 45, 3.4 * spark, 0, Math.PI * 2); p.fill();
    const g = p.createRadialGradient(cx - 9, cy - 10, 2, cx, cy, 34);
    g.addColorStop(0, '#f8fafc');
    g.addColorStop(0.35, item.color || swatch);
    g.addColorStop(1, '#0b1220');
    p.fillStyle = g;
    p.beginPath(); p.arc(cx, cy, 30, 0, Math.PI * 2); p.fill();
    p.strokeStyle = hexToRgba(item.flame, 0.9);
    p.lineWidth = 2.5;
    p.beginPath(); p.arc(cx, cy, 30, 0, Math.PI * 2); p.stroke();
    p.fillStyle = hexToRgba(item.core, 0.85);
    p.beginPath(); p.arc(cx - 9, cy - 9, 6, 0, Math.PI * 2); p.fill();
    if (tier >= 4) {
      p.strokeStyle = hexToRgba(item.flame, 0.75);
      p.lineWidth = 2;
      p.beginPath(); p.ellipse(cx, cy, 42, 13, t * 1.2, 0, Math.PI * 2); p.stroke();
      p.beginPath(); p.ellipse(cx, cy, 42, 13, -t * 1.2 + 0.8, 0, Math.PI * 2); p.stroke();
    }
    return;
  }

  if (kind === 'explosions') {
    aura(item.color || swatch, 84);
    const cycle = (t % 1.5) / 1.5;
    const cy = h * 0.54;
    const rings = [
      { r: 14 + cycle * 62, a: 1 - cycle, lw: 4 },
      { r: 8 + ((cycle + 0.35) % 1) * 58, a: 1 - ((cycle + 0.35) % 1), lw: 2.5 }
    ];
    rings.forEach(ring => {
      p.strokeStyle = hexToRgba(ring.r > 40 ? item.color : item.flame, Math.max(0, ring.a) * 0.9);
      p.lineWidth = ring.lw;
      p.beginPath(); p.arc(cx, cy, ring.r, 0, Math.PI * 2); p.stroke();
    });
    const flash = Math.max(0, 1 - cycle * 2.2);
    const core = p.createRadialGradient(cx, cy, 1, cx, cy, 26 + (1 - flash) * 14);
    core.addColorStop(0, hexToRgba(item.core, 0.95 * flash));
    core.addColorStop(1, 'rgba(0,0,0,0)');
    p.fillStyle = core;
    p.beginPath(); p.arc(cx, cy, 30, 0, Math.PI * 2); p.fill();
    return;
  }

  if (kind === 'trails') {
    aura(item.glow || swatch, 78);
    const baseY = h * 0.6;
    const px = x => cx + Math.sin(x * 1.5) * 64;
    const py = x => baseY + Math.sin(x * 3) * 7;
    for (let i = 14; i >= 1; i--) {
      const x = t - i * 0.09;
      p.fillStyle = hexToRgba(i % 2 ? item.color : item.glow, (1 - i / 15) * 0.8);
      p.beginPath(); p.arc(px(x), py(x), 5 - i * 0.22, 0, Math.PI * 2); p.fill();
    }
    p.fillStyle = '#f8fafc';
    p.beginPath(); p.arc(px(t), py(t), 7, 0, Math.PI * 2); p.fill();
    p.strokeStyle = hexToRgba(item.color, 0.9);
    p.lineWidth = 2;
    p.beginPath(); p.arc(px(t), py(t), 10, 0, Math.PI * 2); p.stroke();
    return;
  }

  // avatars
  aura(rarityMeta(item.rarity).color, 80);
  const bob = Math.sin(t * 2.6) * 4;
  p.save();
  p.textAlign = 'center';
  p.textBaseline = 'middle';
  p.font = '64px serif';
  p.fillText(item.emoji || '🪪', cx, h * 0.52 + bob);
  p.restore();
  if (item.rarity !== 'starter') {
    p.strokeStyle = hexToRgba(rarityMeta(item.rarity).color, 0.85);
    p.lineWidth = 2.5;
    p.beginPath(); p.arc(cx, h * 0.52 + bob, 44 + Math.sin(t * 4) * 2, 0, Math.PI * 2); p.stroke();
  }
}

function buyFromPreview() {
  const { kind, id, item } = previewState;
  if (!item) return;
  const dict = I18N[currentLang] || {};
  const res = GameState.buy(kind, id);
  if (!res.ok) { showToast(dict.shopNotEnough || 'Moedas insuficientes'); return; }
  GameState.equip(kind, id);
  SFX.playUnlock();
  haptic(35);
  showToast((dict.shopBought || '{name} desbloqueado!').replace('{name}', item.name));
  const stage = document.querySelector('.preview-stage');
  const wallet = document.querySelector('.shop-coins');
  if (stage && wallet) coinFly(stage, wallet, rarityMeta(item.rarity).color);
  const cardEl = document.querySelector(`.shop-item[data-shop-kind="${kind}"][data-shop-id="${id}"]`);
  if (cardEl) { cardEl.classList.add('burst'); setTimeout(() => cardEl.classList.remove('burst'), 520); }
  renderShop();
  openShopPreview(kind, id);
  if (UI.startScreen && !UI.startScreen.classList.contains('hidden')) refreshDemo();
}

function coinFly(fromEl, toEl, color) {
  const a = fromEl.getBoundingClientRect();
  const b = toEl.getBoundingClientRect();
  const sx = a.left + a.width / 2, sy = a.top + a.height / 2;
  const tx = b.left + b.width / 2, ty = b.top + b.height / 2;
  for (let i = 0; i < 8; i++) {
    const coin = document.createElement('span');
    coin.className = 'coin-fly';
    if (color) coin.style.background = `radial-gradient(circle at 35% 30%, #fff, ${color} 60%, #111827)`;
    coin.style.left = `${sx + (Math.random() - 0.5) * 40}px`;
    coin.style.top = `${sy + (Math.random() - 0.5) * 30}px`;
    document.body.appendChild(coin);
    const dx = tx - sx + (Math.random() - 0.5) * 24;
    const dy = ty - sy + (Math.random() - 0.5) * 18;
    coin.animate([
      { transform: 'translate(0,0) scale(1)', opacity: 1 },
      { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 26}px) scale(1.1)`, opacity: 1, offset: 0.55 },
      { transform: `translate(${dx}px, ${dy}px) scale(.5)`, opacity: 0 }
    ], { duration: 620 + i * 35, easing: 'cubic-bezier(.25,.7,.35,1)' }).onfinish = () => coin.remove();
  }
  if (toEl) {
    toEl.classList.remove('wallet-bump');
    void toEl.offsetWidth;
    toEl.classList.add('wallet-bump');
  }
}

function refreshLobbyScreens() {
  renderProfile();
  renderLeague();
  renderBracket();
  renderCopa();
  renderShop();
  renderEventLobby();
  refreshLobbyHeader();
}

// Mudanças no GameState (compra, resultado, liga remota do Firestore)
// atualizam a tela aberta sem exigir re-render de tudo.
function onGameStateChanged() {
  refreshLobbyHeader();
  if (lobbyTab === 'league') renderLeague();
  if (lobbyTab === 'bracket') { renderBracket(); renderCopa(); }
  if (lobbyTab === 'profile') renderProfile();
  if (lobbyTab === 'shop') renderShop();
  if (lobbyTab === 'event') renderEventLobby();
}

function syncDuelBestUI() {
  document.querySelectorAll('[data-duel-best]').forEach(btn => {
    btn.classList.toggle('active', Number(btn.dataset.duelBest) === (Number(prefs.duelBest) === 5 ? 5 : 3));
  });
}

function openScheduleModal(id) {
  const dict = I18N[currentLang] || {};
  scheduleTarget = id;
  const board = bracketMatches();
  const all = [...board.qf, ...board.sf, board.fin];
  const m = all.find(x => x.id === id) || { a: '?', b: '?' };
  const label = document.getElementById('scheduleMatchLabel');
  if (label) label.textContent = `${m.a} × ${m.b}`;
  const daySel = document.getElementById('schedDay');
  const timeSel = document.getElementById('schedTime');
  const sched = GameState.getSchedule(id);
  const today = new Date().getDay();
  if (daySel && !daySel.options.length) {
    daySel.innerHTML = Array.from({ length: 7 }, (_, i) => {
      const d = (today + i) % 7;
      return `<option value="${d}">${dayName(d)}</option>`;
    }).join('');
  }
  if (timeSel && !timeSel.options.length) {
    const opts = [];
    for (let h = 8; h <= 22; h++) {
      for (const mm of [0, 30]) {
        if (h === 22 && mm === 30) continue;
        const t = `${String(h).padStart(2, '0')}:${mm ? '30' : '00'}`;
        opts.push(`<option value="${t}">${t}</option>`);
      }
    }
    timeSel.innerHTML = opts.join('');
    timeSel.value = '19:30';
  }
  if (sched) {
    if (daySel) daySel.value = String(sched.day);
    if (timeSel) timeSel.value = sched.time;
  }
  const status = document.getElementById('scheduleStatus');
  if (status) {
    status.textContent = sched
      ? (sched.accepted
        ? (dict.bracketAccepted || '') + ' ' + (dict.bracketSet || '{d} • {t}').replace('{d}', dayName(sched.day)).replace('{t}', sched.time)
        : (dict.bracketProposed || '').replace('{d}', dayName(sched.day)).replace('{t}', sched.time) + ' — ' + (dict.bracketWaitingAccept || ''))
      : '';
  }
  const modal = document.getElementById('scheduleModal');
  if (modal) modal.classList.remove('hidden');
}

function closeScheduleModal() {
  const modal = document.getElementById('scheduleModal');
  if (modal) modal.classList.add('hidden');
  scheduleTarget = null;
}

function proposeScheduleFromModal() {
  if (!scheduleTarget) return;
  const daySel = document.getElementById('schedDay');
  const timeSel = document.getElementById('schedTime');
  const dict = I18N[currentLang] || {};
  const sched = GameState.proposeSchedule(scheduleTarget, Number(daySel ? daySel.value : 6), timeSel ? timeSel.value : '19:30');
  const status = document.getElementById('scheduleStatus');
  if (status) status.textContent = (dict.bracketProposed || '').replace('{d}', dayName(sched.day)).replace('{t}', sched.time) + ' — ' + (dict.bracketWaitingAccept || '');
  renderBracket();
}

function acceptScheduleFromModal() {
  if (!scheduleTarget) return;
  const dict = I18N[currentLang] || {};
  const sched = GameState.acceptSchedule(scheduleTarget);
  if (!sched) return;
  const status = document.getElementById('scheduleStatus');
  if (status) status.textContent = (dict.bracketAccepted || '') + ' ' + (dict.bracketSet || '{d} • {t}').replace('{d}', dayName(sched.day)).replace('{t}', sched.time);
  renderBracket();
}

const MODE_ICONS = { SOLO: '👤', DUEL: '🥊', TEAM1v1: '🥊', TEAM2v2: '⚔️', TEAM3v3: '🛡️', LOCAL: '👥', ONLINE: '🌐' };

function updateModeSelectBtn() {
  const row = document.querySelector(`.mode-choice[data-mode="${selectedMode}"]`);
  const icon = document.getElementById('modeSelectIcon');
  const name = document.getElementById('modeSelectName');
  if (icon) icon.textContent = MODE_ICONS[selectedMode] || '🎮';
  if (name && row) name.textContent = row.querySelector('.mode-row-name').textContent;
}

function openModeSheet() {
  const sheet = document.getElementById('modeSheet');
  if (!sheet || !sheet.classList.contains('hidden')) return;
  sheet.classList.remove('hidden');
  requestAnimationFrame(() => sheet.classList.add('open'));
}

function closeModeSheet() {
  const sheet = document.getElementById('modeSheet');
  if (!sheet || sheet.classList.contains('hidden')) return;
  sheet.classList.remove('open');
  clearTimeout(closeModeSheet._t);
  closeModeSheet._t = setTimeout(() => sheet.classList.add('hidden'), 200);
}

function setSelectedMode(id) {
  // O antigo "1 v 1" (TEAM1v1) foi unificado no card 1v1 (DUEL 15×15).
  if (id === 'TEAM1v1') id = 'DUEL';
  selectedMode = id;
  document.querySelectorAll('.mode-choice').forEach(btn => {
    const on = btn.dataset.mode === id;
    btn.classList.toggle('border-emerald-400', on);
    btn.classList.toggle('bg-emerald-500/15', on);
    btn.classList.toggle('shadow-lg', on);
    btn.classList.toggle('border-slate-700', !on);
    btn.classList.toggle('bg-slate-800/60', !on);
  });
  updateModeSelectBtn();
  if (id === 'ONLINE') closeModeSheet();
  const online = id === 'ONLINE';
  const p2row = document.getElementById('p2NameRow');
  if (p2row) p2row.style.display = (id === 'LOCAL') ? 'flex' : 'none';
  const startBtn = document.getElementById('btnStartMatch');
  if (startBtn) startBtn.classList.toggle('hidden', online || lobbyTab !== 'play');
  const tutBtn = document.getElementById('btnTutorial');
  if (tutBtn) tutBtn.classList.toggle('hidden', online || lobbyTab !== 'play');
  const hint = document.getElementById('onlineTabHint');
  if (hint) hint.classList.toggle('hidden', !(lobbyTab === 'play' && online));
  if (online) {
    if (hasCompetitiveNick()) setLobbySection('online');
    else openNickGate(() => setLobbySection('online'));
  }
  const dict = I18N[currentLang];
  const badge = document.getElementById('modeBadge');
  if (badge) {
    const modeLabels = {
      SOLO: dict.tagSolo,
      DUEL: dict.tagDuel,
      TEAM1v1: dict.tagTeam1v1,
      TEAM2v2: dict.tagTeam2v2,
      TEAM3v3: dict.tagTeam3v3,
      LOCAL: dict.tagLocalDuel,
      ONLINE: dict.tagOnline
    };
    badge.textContent = modeLabels[id] || dict.tagSolo;
  }
  const duelRow = document.getElementById('duelBestRow');
  if (duelRow) {
    duelRow.classList.remove('hidden');
    duelRow.style.display = id === 'DUEL' ? 'flex' : 'none';
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
  const nameEl = document.getElementById('mapPreviewName');
  if (nameEl) nameEl.textContent = getMap(id).name;
  savePrefs({ map: id });
  refreshDemo();
}

function refreshDemo() {
  if (!UI.startScreen.classList.contains('hidden')) { initArena(true, selectedMode, selectedMap); drawMapPreview(); }
}

function bindUI() {
  document.getElementById('langPT').addEventListener('click', () => { applyLanguage('pt'); savePrefs({ lang: 'pt' }); setSelectedMode(selectedMode); updatePadStatus(); updateCareerUI(); refreshLobbyScreens(); });
  document.getElementById('langEN').addEventListener('click', () => { applyLanguage('en'); savePrefs({ lang: 'en' }); setSelectedMode(selectedMode); updatePadStatus(); updateCareerUI(); refreshLobbyScreens(); });
  document.querySelectorAll('.lobby-section-head').forEach(btn => btn.addEventListener('click', () => switchLobbyTab(btn.dataset.lobbyTab)));
  document.querySelectorAll('[data-progress-tab]').forEach(btn => btn.addEventListener('click', () => {
    progressTab = btn.dataset.progressTab;
    progressTabButtons();
  }));
  const seasonBox = document.getElementById('progressPanel');
  if (seasonBox) seasonBox.addEventListener('click', e => {
    const claimBtn = e.target.closest('[data-claim]');
    if (claimBtn) {
      const [tier, track] = claimBtn.dataset.claim.split('-');
      claimSeasonReward(parseInt(tier, 10), track);
      return;
    }
    const skinBtn = e.target.closest('[data-skin]');
    if (skinBtn) equipSkin(skinBtn.dataset.skin);
  });
  const skinBox = document.getElementById('skinsGrid');
  if (skinBox) skinBox.addEventListener('click', e => {
    const btn = e.target.closest('[data-skin]');
    if (btn) equipSkin(btn.dataset.skin);
  });
  const nameEl = document.getElementById('playerNameInput');
  if (nameEl) {
    // O nick só é salvo quando completo e válido (blur/Enter), nunca a
    // cada tecla: valores parciais não podem virar perfil.
    nameEl.addEventListener('change', () => saveNickFromInput(nameEl, 'nickSaved'));
    nameEl.addEventListener('keydown', e => {
      if (e.key !== 'Enter') return;
      e.preventDefault();
      if (saveNickFromInput(nameEl, 'nickSaved')) { try { nameEl.blur(); } catch (err) {} }
    });
  }
  const name2El = document.getElementById('player2NameInput');
  if (name2El) name2El.addEventListener('input', () => savePrefs({ name2: name2El.value.trim() || 'Viper-02' }));
  document.querySelectorAll('.mode-choice').forEach(btn => btn.addEventListener('click', () => setSelectedMode(btn.dataset.mode)));
  const modeSelectBtn = document.getElementById('modeSelectBtn');
  if (modeSelectBtn) modeSelectBtn.addEventListener('click', openModeSheet);
  const mapSelectBtn = document.getElementById('mapSelectBtn');
  if (mapSelectBtn) mapSelectBtn.addEventListener('click', openModeSheet);
  const modeSheetClose = document.getElementById('modeSheetClose');
  if (modeSheetClose) modeSheetClose.addEventListener('click', closeModeSheet);
  const modeSheetDone = document.getElementById('modeSheetDone');
  if (modeSheetDone) modeSheetDone.addEventListener('click', closeModeSheet);
  document.querySelectorAll('[data-mode-close]').forEach(el => el.addEventListener('click', closeModeSheet));
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
    if (selectedMode === 'DUEL') startDuelSeries(prefs.duelBest || 3);
    else initArena(false, selectedMode, selectedMap);
  });
  const playEventBtn = document.getElementById('btnPlayEvent');
  if (playEventBtn) playEventBtn.addEventListener('click', () => {
    SFX.init();
    UI.startScreen.classList.add('hidden');
    setSelectedMode('SOLO');
    // Depois do setSelectedMode: ele recria o demo do lobby, o que
    // consumiria a flag antes da partida real começar.
    pendingEventMatch = true;
    UI.hud.classList.remove('hidden');
    initArena(false, 'SOLO', selectedMap);
  });
  const spinBtn = document.getElementById('btnSpin');
  if (spinBtn) spinBtn.addEventListener('click', () => {
    const dict = I18N[currentLang] || {};
    AdManager.showRewardedAd('spin', () => {
      const prizes = [50, 100, 200];
      const gain = prizes[Math.floor(Math.random() * prizes.length)];
      GameState.addCoins(gain);
      renderEventLobby();
      showToast((dict.spinGain || '🎰 +{n} moedas!').replace('{n}', gain));
    });
  });
  const tutBtnEl = document.getElementById('btnTutorial');
  if (tutBtnEl) tutBtnEl.addEventListener('click', startTutorial);
  const tutSkipEl = document.getElementById('btnTutorialSkip');
  if (tutSkipEl) tutSkipEl.addEventListener('click', () => { SFX.init(); exitTutorial(); });
  document.getElementById('btnPlayAgain').addEventListener('click', () => {
    if (tutorial.finished) {
      tutorial.finished = false;
      SFX.init();
      UI.endModal.classList.add('hidden');
      initArena(false, selectedMode, selectedMap);
      return;
    }
    if (net.role) {
      if (!net.started || !net.connected) { netLeaveRoom(); return; }
      if (net.role === 'guest') {
        if (net.rematchPending) return;
        if (!netCanSend()) { netLeaveRoom(); return; }
        net.rematchPending = true;
        const label = UI.btnPlayAgain.querySelector('span');
        if (label) label.textContent = I18N[currentLang].rematchWaiting;
        if (!netSend({ t: 'rm' })) { netLeaveRoom(); return; }
        // Se o host não iniciar a revanche, devolve o botão ao jogador.
        clearTimeout(net.rematchTimer);
        net.rematchTimer = setTimeout(() => {
          if (!net.rematchPending) return;
          net.rematchPending = false;
          const l = UI.btnPlayAgain.querySelector('span');
          if (l) l.textContent = I18N[currentLang].rematchBtn;
          if (UI.endSub) UI.endSub.textContent = I18N[currentLang].netRematchTimeout;
        }, NET_REMATCH_WAIT_MS);
        return;
      }
      netStartRematch();
      return;
    }
    SFX.init();
    UI.endModal.classList.add('hidden');
    pendingEventMatch = !!match.eventMode;
    if (match.mode === 'DUEL') startDuelSeries(duel.best);
    else initArena(false, match.mode, match.mapId);
  });
  const doubleRewardBtn = document.getElementById('btnDoubleReward');
  if (doubleRewardBtn) doubleRewardBtn.addEventListener('click', () => {
    const dict = I18N[currentLang] || {};
    AdManager.showRewardedAd('double', () => {
      GameState.addCoins(40);
      doubleRewardBtn.classList.add('hidden');
      doubleRewardBtn.disabled = true;
      showToast(dict.doubleGain || '📺 +40 moedas extras!');
    });
  });
  const btnMenu = document.getElementById('btnBackToMenu');
  if (btnMenu) {
    btnMenu.addEventListener('click', leaveMatchToLobby);
  }

  // PERFIL
  const btnSaveProfile = document.getElementById('btnSaveProfile');
  if (btnSaveProfile) btnSaveProfile.addEventListener('click', () => {
    const input = document.getElementById('profileNickInput');
    if (saveNickFromInput(input, 'profileSaved')) renderProfile();
  });
  // MODAL DE NICK COMPETITIVO
  const btnNickSave = document.getElementById('btnNickModalSave');
  if (btnNickSave) btnNickSave.addEventListener('click', saveNickModal);
  const btnNickCancel = document.getElementById('btnNickModalCancel');
  if (btnNickCancel) btnNickCancel.addEventListener('click', () => closeNickModal(true));
  const btnNickClose = document.getElementById('btnNickModalClose');
  if (btnNickClose) btnNickClose.addEventListener('click', () => closeNickModal(true));
  const nickModalEl = document.getElementById('nickModal');
  if (nickModalEl) {
    nickModalEl.addEventListener('click', e => { if (e.target === nickModalEl) closeNickModal(true); });
  }
  const nickModalInput = document.getElementById('nickModalInput');
  if (nickModalInput) {
    nickModalInput.addEventListener('input', () => {
      nickModalInput.classList.remove('invalid');
      const error = document.getElementById('nickModalError');
      if (error) error.textContent = '';
    });
    nickModalInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); saveNickModal(); }
    });
  }
  const profileAvatars = document.getElementById('profileAvatars');
  if (profileAvatars) profileAvatars.addEventListener('click', e => {
    const btn = e.target && e.target.closest ? e.target.closest('[data-avatar]') : null;
    if (!btn) return;
    const input = document.getElementById('profileNickInput');
    // Trocar o avatar não pode descartar um codinome digitado e ainda não salvo.
    const pendingNick = input ? input.value : null;
    GameState.setProfile({ avatar: btn.dataset.avatar });
    renderProfile();
    if (input && pendingNick !== null) input.value = pendingNick;
  });

  // MATA-MATA
  const onEl = (id, ev, fn) => { const el = document.getElementById(id); if (el) el.addEventListener(ev, fn); };
  const bracketBoard = document.getElementById('bracketBoard');
  if (bracketBoard) bracketBoard.addEventListener('click', e => {
    const who = e.target.closest('[data-player]');
    if (who) { openPlayerStatsModal(who.dataset.player); return; }
    const play = e.target.closest('[data-bracket-play]');
    if (play) { startBracketMatch(play.dataset.bracketPlay); return; }
    const cancelBracket = e.target.closest('[data-bracket-cancel]');
    if (cancelBracket) { bracketDuelCancel(); return; }
    const watch = e.target.closest('[data-watch]');
    if (watch) {
      const m = bracketList().find(x => x.id === watch.dataset.watch);
      startSpectate(m ? [m.a, m.b] : null);
      return;
    }
    const sched = e.target.closest('[data-schedule]');
    if (sched) openScheduleModal(sched.dataset.schedule);
  });
  const leagueTableEl = document.getElementById('leagueTable');
  if (leagueTableEl) {
    leagueTableEl.addEventListener('click', e => {
      const who = e.target.closest('[data-player]');
      if (who) openPlayerStatsModal(who.dataset.player);
    });
    leagueTableEl.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const who = e.target.closest('[data-player]');
      if (!who) return;
      e.preventDefault();
      openPlayerStatsModal(who.dataset.player);
    });
  }
  const liveBanner = document.getElementById('lobbyLiveBanner');
  if (liveBanner) {
    // Capture: clicar no nome abre o perfil em vez de entrar na arquibancada.
    liveBanner.addEventListener('click', e => {
      const who = e.target.closest('[data-player]');
      if (!who) return;
      e.preventDefault();
      e.stopPropagation();
      openPlayerStatsModal(who.dataset.player);
    }, true);
    liveBanner.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const who = e.target.closest('[data-player]');
      if (!who) return;
      e.preventDefault();
      e.stopPropagation();
      openPlayerStatsModal(who.dataset.player);
    });
    liveBanner.addEventListener('click', () => {
      const live = lobbyLiveMatch();
      if (!live) return;
      startSpectate([live.a, live.b]);
    });
  }
  const spectateLabelEl = document.getElementById('spectateMatchLabel');
  if (spectateLabelEl) {
    const openFromLabel = e => {
      const who = e.target.closest('[data-player]');
      if (!who) return;
      e.preventDefault();
      e.stopPropagation();
      openPlayerStatsModal(who.dataset.player);
    };
    spectateLabelEl.addEventListener('click', openFromLabel);
    spectateLabelEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openFromLabel(e);
    });
  }
  const statsModal = document.getElementById('statsModal');
  if (statsModal) {
    statsModal.addEventListener('click', e => { if (e.target === statsModal) closePlayerStatsModal(); });
  }
  onEl('btnStatsClose', 'click', closePlayerStatsModal);
  const copaBoard = document.getElementById('copaBoard');
  if (copaBoard) copaBoard.addEventListener('click', e => {
    const who = e.target.closest('[data-player]');
    if (who) { openPlayerStatsModal(who.dataset.player); return; }
    if (e.target.closest('[data-copa-play]')) startCopaMatch();
  });
  const champSwitch = document.getElementById('champSwitch');
  if (champSwitch) champSwitch.addEventListener('click', e => {
    const btn = e.target.closest('[data-champ]');
    if (btn) setChampTab(btn.dataset.champ);
  });
  onEl('lobbyTopProfile', 'click', () => setLobbySection('profile'));
  onEl('btnLeaguePlay', 'click', openOnlineLeague);
  onEl('btnLeaguePlayOnline', 'click', openOnlineLeague);
  onEl('btnScheduleClose', 'click', closeScheduleModal);
  onEl('btnSchedulePropose', 'click', proposeScheduleFromModal);
  onEl('btnScheduleAccept', 'click', acceptScheduleFromModal);
  const scheduleModal = document.getElementById('scheduleModal');
  if (scheduleModal) scheduleModal.addEventListener('click', e => { if (e.target === scheduleModal) closeScheduleModal(); });

  // LOJA: o card abre o preview animado; comprar/equipar acontecem no modal.
  const shopClick = e => {
    const cardEl = e.target.closest('.shop-item');
    if (!cardEl) return;
    const grid = cardEl.closest('.shop-grid');
    if (!grid) return;
    const kind = SHOP_TABS.find(k => SHOP_GRID_IDS[k] === grid.id);
    const id = cardEl.dataset.shopId;
    if (kind && id) openShopPreview(kind, id);
  };
  Object.values(SHOP_GRID_IDS).forEach(gid => {
    const el = document.getElementById(gid);
    if (el) el.addEventListener('click', shopClick);
  });
  const previewModal = document.getElementById('shopPreview');
  if (previewModal) previewModal.addEventListener('click', e => { if (e.target === previewModal) closeShopPreview(); });
  const btnPreviewClose = document.getElementById('btnPreviewClose');
  if (btnPreviewClose) btnPreviewClose.addEventListener('click', closeShopPreview);
  const btnPreviewEquip = document.getElementById('btnPreviewEquip');
  if (btnPreviewEquip) btnPreviewEquip.addEventListener('click', () => {
    const { kind, id, item } = previewState;
    if (!kind || !id) return;
    const dict = I18N[currentLang] || {};
    GameState.equip(kind, id);
    SFX.playPickup();
    haptic(20);
    showToast((dict.shopEquippedMsg || '{name} equipado!').replace('{name}', item ? item.name : id));
    renderShop();
    openShopPreview(kind, id);
    if (UI.startScreen && !UI.startScreen.classList.contains('hidden')) refreshDemo();
  });
  const btnPreviewBuy = document.getElementById('btnPreviewBuy');
  if (btnPreviewBuy) btnPreviewBuy.addEventListener('click', () => {
    const { item } = previewState;
    if (!item) return;
    const dict = I18N[currentLang] || {};
    const price = Number(item.price) || 0;
    // Itens caros pedem confirmação em duas etapas com o saldo depois.
    if (price >= 3500) {
      const box = document.getElementById('previewConfirm');
      const title = document.getElementById('previewConfirmTitle');
      const body = document.getElementById('previewConfirmBody');
      const actions = document.getElementById('previewActions');
      if (title) title.textContent = (dict.previewConfirmTitle || 'Confirmar compra de {name} por {n} 💰?')
        .replace('{name}', item.name).replace('{n}', price);
      if (body) body.textContent = (dict.previewConfirmBody || 'Saldo agora: {a} 💰 • depois da compra: {b} 💰')
        .replace('{a}', GameState.state.coins).replace('{b}', Math.max(0, GameState.state.coins - price));
      if (box) box.classList.remove('hidden');
      if (actions) actions.classList.add('hidden');
      haptic(15);
      return;
    }
    buyFromPreview();
  });
  const btnPreviewConfirm = document.getElementById('btnPreviewConfirm');
  if (btnPreviewConfirm) btnPreviewConfirm.addEventListener('click', buyFromPreview);
  const btnPreviewCancel = document.getElementById('btnPreviewCancel');
  if (btnPreviewCancel) btnPreviewCancel.addEventListener('click', () => {
    const { kind, id } = previewState;
    if (kind && id) openShopPreview(kind, id);
  });
  document.querySelectorAll('[data-shop-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      setShopTab(btn.dataset.shopTab);
      if (UI.startScreen && !UI.startScreen.classList.contains('hidden')) refreshDemo();
    });
  });
  onEl('btnShopDefault', 'click', () => {
    const kind = shopTab;
    const def = GameState.defaultIdFor(kind);
    GameState.equip(kind, def);
    renderShop();
    const item = getCosmetic(kind, def);
    showToast((I18N[currentLang].shopEquippedMsg || '{name} equipado!').replace('{name}', item ? item.name : def));
    if (UI.startScreen && !UI.startScreen.classList.contains('hidden')) refreshDemo();
  });
  onEl('btnAdChest', 'click', () => {
    const dict = I18N[currentLang] || {};
    AdManager.showRewardedAd('chest', () => {
      GameState.addCoins(40);
      renderShop();
      showToast(dict.shopChestGain || '📺 +40 moedas do baú patrocinado!');
    });
  });
  onEl('btnDailyReward', 'click', () => {
    const dict = I18N[currentLang] || {};
    const gain = GameState.claimDaily();
    renderShop();
    showToast(gain ? (dict.shopDailyGain || '🎁 +100 moedas!') : (dict.shopDailyDone || 'Já resgatado hoje.'));
  });
  const testCoinsBtn = document.getElementById('btnTestCoins');
  if (testCoinsBtn && !DEV_MODE) testCoinsBtn.classList.add('hidden');
  onEl('btnTestCoins', 'click', () => {
    if (!DEV_MODE) return;
    const dict = I18N[currentLang] || {};
    GameState.addCoins(200);
    renderShop();
    showToast(dict.shopTestGain || '🧪 +200 moedas!');
  });

  // FORMATO DO DUELO
  document.querySelectorAll('[data-duel-best]').forEach(btn => btn.addEventListener('click', () => {
    const best = Number(btn.dataset.duelBest) === 5 ? 5 : 3;
    savePrefs({ duelBest: best });
    syncDuelBestUI();
  }));

  // ARQUIBANCADA
  document.querySelectorAll('[data-cam]').forEach(btn => btn.addEventListener('click', () => setSpectateCam(btn.dataset.cam)));
  document.querySelectorAll('.cheer-btn').forEach(btn => btn.addEventListener('click', () => cheer(btn.dataset.cheer)));
  onEl('btnExitSpectate', 'click', stopSpectate);

  // Persistência central: qualquer troca de moedas/skins atualiza as telas
  GameState.subscribe(() => {
    renderShop();
    const stats = document.getElementById('profileStats');
    if (stats && !stats.closest('.hidden')) renderProfile();
  });

  // PAUSA
  const btnPauseHud = document.getElementById('btnPauseHud');
  if (btnPauseHud) btnPauseHud.addEventListener('click', () => { SFX.init(); pauseGame(); });
  const btnResume = document.getElementById('btnResume');
  if (btnResume) btnResume.addEventListener('click', () => { SFX.init(); resumeGame(); });
  const btnPauseLobby = document.getElementById('btnPauseLobby');
  if (btnPauseLobby) btnPauseLobby.addEventListener('click', pauseToLobby);
  window.addEventListener('keydown', e => {
    if (e.code !== 'Escape' || e.repeat) return;
    const stm = document.getElementById('statsModal');
    if (stm && !stm.classList.contains('hidden')) { closePlayerStatsModal(); return; }
    const rpm = document.getElementById('voiceReportModal');
    if (rpm && !rpm.classList.contains('hidden')) { if (window.VoiceChat) window.VoiceChat.closeReport(); return; }
    const nickM = document.getElementById('nickModal');
    if (nickM && !nickM.classList.contains('hidden')) { closeNickModal(true); return; }
    const sm = document.getElementById('settingsModal');
    if (sm && !sm.classList.contains('hidden')) { closeSettings(); return; }
    if (UI.pauseModal && !UI.pauseModal.classList.contains('hidden')) { resumeGame(); return; }
    pauseGame();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseGame(true);
  });
  // Queda de rede do próprio navegador: abre a janela de reconexão
  // imediatamente, sem esperar o timeout do WebRTC.
  window.addEventListener('offline', () => {
    if (net.started && !match.ended) netEnterReconnectGrace();
  });
  window.addEventListener('online', () => {
    if (net.started && !match.ended) netUpdateBadge();
  });
  
  // 🏆 CONQUISTAS
  document.getElementById('btnAchievements').addEventListener('click', () => {
    SFX.init();
    renderAchievementsModal();
    document.getElementById('achievementsModal').classList.remove('hidden');
  });
  document.getElementById('btnCloseAchievements').addEventListener('click', () => {
    document.getElementById('achievementsModal').classList.add('hidden');
  });

  // ⚙️ AJUSTES
  const btnOpenSettings = document.getElementById('btnOpenSettings');
  const btnPauseSettings = document.getElementById('btnPauseSettings');
  const btnCloseSettings = document.getElementById('btnCloseSettings');
  const settingsModal = document.getElementById('settingsModal');
  if (btnOpenSettings) btnOpenSettings.addEventListener('click', () => { SFX.init(); openSettings(); });
  if (btnPauseSettings) btnPauseSettings.addEventListener('click', () => { SFX.init(); openSettings(); });
  if (btnCloseSettings) btnCloseSettings.addEventListener('click', closeSettings);
  if (settingsModal) settingsModal.addEventListener('click', e => { if (e.target === settingsModal) closeSettings(); });

  const bindRangeSetting = (id, key, suffix, labelId) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => {
      settings[key] = parseInt(el.value, 10) || 0;
      const label = document.getElementById(labelId);
      if (label) label.textContent = settings[key] + suffix;
      saveSettings();
      applySettings();
    });
  };
  bindRangeSetting('setVolume', 'volume', '%', 'setVolumeVal');
  bindRangeSetting('setMusic', 'music', '%', 'setMusicVal');
  bindRangeSetting('setJoyOpacity', 'joyOpacity', '%', 'setJoyOpacityVal');
  bindRangeSetting('setDeadzone', 'deadzone', '%', 'setDeadzoneVal');

  const bindToggleSetting = (id, key) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('click', () => {
      settings[key] = !settings[key];
      el.dataset.on = settings[key] ? '1' : '0';
      el.setAttribute('aria-checked', settings[key] ? 'true' : 'false');
      saveSettings();
      applySettings();
    });
  };
  bindToggleSetting('setVibration', 'vibration');
  bindToggleSetting('setShake', 'shake');
  bindToggleSetting('setFps', 'showFps');
  bindToggleSetting('setReduceMotion', 'reduceMotion');

  const segJoy = document.getElementById('setJoySize');
  if (segJoy) segJoy.addEventListener('click', e => {
    const btn = e.target.closest('button[data-size]');
    if (!btn) return;
    settings.joySize = parseInt(btn.dataset.size, 10);
    segJoy.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === btn));
    saveSettings();
  });

  const segGraphics = document.getElementById('setGraphics');
  if (segGraphics) segGraphics.addEventListener('click', e => {
    const btn = e.target.closest('button[data-graphics]');
    if (!btn || !GRAPHICS_PRESETS[btn.dataset.graphics]) return;
    settings.graphics = btn.dataset.graphics;
    saveSettings();
    applySettings();
    syncSettingsUI();
  });

  const btnResetSettings = document.getElementById('btnResetSettings');
  if (btnResetSettings) btnResetSettings.addEventListener('click', () => {
    Object.assign(settings, DEFAULT_SETTINGS);
    const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    settings.reduceMotion = !!(mq && mq.matches);
    saveSettings();
    applySettings();
    syncSettingsUI();
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
  document.getElementById('btnMuteHud').addEventListener('click', () => {
    SFX.init();
    const m = SFX.toggleMute();
    MUSIC.setMuted(m);
    document.getElementById('btnMuteHud').textContent = m ? '🔇' : '🔊';
  });
  document.getElementById('btnShakeHud').addEventListener('click', () => {
    SFX.init();
    if (settings.reduceMotion) {
      // Tremor desligado por acessibilidade: o toque reativa os efeitos.
      settings.reduceMotion = false;
      settings.shake = true;
      showToast(currentLang === 'en' ? 'Motion effects enabled' : 'Efeitos de movimento ativados');
    } else {
      settings.shake = !settings.shake;
    }
    saveSettings();
    applySettings();
    syncSettingsUI();
  });
  // Chat de voz: nada acontece (nem permissão) até o jogador tocar no microfone.
  const voiceOn = (id, ev, fn) => { const el = document.getElementById(id); if (el) el.addEventListener(ev, fn); };
  voiceOn('btnVoiceMic', 'click', () => { SFX.init(); if (window.VoiceChat) window.VoiceChat.toggleMic(); });
  voiceOn('btnVoiceMuteOpp', 'click', () => { SFX.init(); if (window.VoiceChat) window.VoiceChat.toggleMuteOpponent(); });
  voiceOn('btnVoiceReport', 'click', () => { SFX.init(); if (window.VoiceChat) window.VoiceChat.openReport(); });
  voiceOn('btnVoiceReportCancel', 'click', () => { if (window.VoiceChat) window.VoiceChat.closeReport(); });
  voiceOn('btnVoiceReportConfirm', 'click', () => { if (window.VoiceChat) window.VoiceChat.confirmReport(); });
  const voiceReportModal = document.getElementById('voiceReportModal');
  if (voiceReportModal) voiceReportModal.addEventListener('click', e => {
    if (e.target === voiceReportModal && window.VoiceChat) window.VoiceChat.closeReport();
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
  const syncFsIcon = () => {
    if (fsBtn) fsBtn.textContent = (document.fullscreenElement || document.webkitFullscreenElement) ? '⤡' : '⛶';
    if (document.fullscreenElement || document.webkitFullscreenElement) lockLandscape();
    updateRotateGate();
  };
  document.addEventListener('fullscreenchange', syncFsIcon);
  document.addEventListener('webkitfullscreenchange', syncFsIcon);
  const on = (id, ev, fn) => { const el = document.getElementById(id); if (el) el.addEventListener(ev, fn); };
  on('btnRotateGateFullscreen', 'click', () => { SFX.init(); requestGameFullscreen(); setTimeout(updateRotateGate, 350); });
  on('btnHostRole', 'click', () => netPickRole('host'));
  on('btnGuestRole', 'click', () => netPickRole('guest'));
  on('btnCreateInvite', 'click', netHostCreateOffer);
  on('btnConnectAnswer', 'click', netHostAcceptAnswer);
  on('btnGenAnswer', 'click', netGuestMakeAnswer);
  on('btnCopyOffer', 'click', () => copyFrom('netOfferOut'));
  on('btnCopyAnswer', 'click', () => copyFrom('netAnswerOut'));
  on('btnShareOffer', 'click', () => shareSignal('netOfferOut'));
  on('btnShareAnswer', 'click', () => shareSignal('netAnswerOut'));
  on('btnPasteAnswer', 'click', () => pasteInto('netAnswerIn', tryAutoConnect));
  on('btnPasteOffer', 'click', () => pasteInto('netOfferIn', tryAutoAnswer));
  on('btnNetReconnectQuit', 'click', () => { SFX.init(); netLeaveRoom(); });
  on('netAnswerIn', 'input', scheduleAutoConnect);
  on('netOfferIn', 'input', scheduleAutoAnswer);
  on('btnServerCreate', 'click', netServerCreateRoom);
  on('btnQuickMatch', 'click', quickMatchSearch);
  on('btnServerJoin', 'click', () => {
    const el = document.getElementById('netServerCode');
    netServerJoinRoom(el ? el.value : '');
  });
  on('btnServerLeave', 'click', () => netServerLeave(false));
  on('btnServerCopy', 'click', netServerCopyLink);
  on('netManualToggle', 'click', netServerToggleManual);
  const serverCodeInput = document.getElementById('netServerCode');
  if (serverCodeInput) {
    serverCodeInput.addEventListener('input', () => {
      serverCodeInput.value = serverCodeInput.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4);
    });
    serverCodeInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); netServerJoinRoom(serverCodeInput.value); }
    });
  }
  window.addEventListener('keydown', e => {
    // Não intercepta teclas enquanto o jogador digita em um campo de texto
    // (codinome, códigos do multiplayer etc.).
    const target = e.target;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable)) return;
    // Em menus/modais, deixa Enter/Espaço ativarem o botão focado (acessibilidade).
    // Durante a partida, os controles do jogo continuam tendo prioridade.
    if (target && target.closest && target.closest('#startScreen, #endModal, #pauseModal, #settingsModal, #modeSheet, #achievementsModal, #tutorialLayer, #chromaModal')) return;
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
    if (UI.pauseModal && !UI.pauseModal.classList.contains('hidden')) return;
    const targetEl = e.target && e.target.closest ? e.target : null;
    if (targetEl && targetEl.closest('button, input, textarea, select, a')) return;
    if (joystick.active || e.clientX > viewW * 0.62) return;
    if (e.cancelable) e.preventDefault();
    joystick.active = true; joystick.id = e.pointerId;
    joystick.ox = e.clientX; joystick.oy = e.clientY;
    joystick.dx = 0; joystick.dy = 0;
    showJoystick(e.clientX, e.clientY);
  };
  const onPointerMove = e => {
    if (chroma.active) return;
    if (!joystick.active || e.pointerId !== joystick.id) return;
    if (e.cancelable) e.preventDefault();
    const dx = e.clientX - joystick.ox, dy = e.clientY - joystick.oy;
    const len = Math.hypot(dx, dy);
    const max = Math.round((parseInt(settings.joySize, 10) || 112) * 0.39);
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
  window.addEventListener('resize', () => { resize(); updateRotateGate(); });
  if (window.visualViewport) window.visualViewport.addEventListener('resize', resize);
  window.addEventListener('orientationchange', () => setTimeout(() => { resize(); updateRotateGate(); }, 120));
  window.addEventListener('gamepadconnected', () => { syncPadAssignments(); updatePadStatus(); });
  window.addEventListener('gamepaddisconnected', () => { syncPadAssignments(); updatePadStatus(); });
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
  const size = clamp(parseInt(settings.joySize, 10) || 112, 80, 160);
  const knob = Math.round(size * 0.42);
  UI.joyContainer.classList.remove('hidden');
  UI.joyContainer.style.opacity = String(clamp(parseInt(settings.joyOpacity, 10) || 80, 20, 100) / 100);
  UI.joyBase.style.width = `${size}px`; UI.joyBase.style.height = `${size}px`;
  UI.joyKnob.style.width = `${knob}px`; UI.joyKnob.style.height = `${knob}px`;
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
let fpsAccum = 0;
let fpsFrames = 0;

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
  // Durante a janela de reconexão a simulação congela (host e convidado)
  // para o jogador que voltar encontrar a partida no mesmo ponto.
  if (net.hold) return;
  if (match.netRole === 'guest') { updateNetGuest(dt); return; }
  match.elapsedTime += dt;
  if (match.shake > 0.05) { match.shake *= Math.exp(-18 * dt); if (match.shake < 0.05) match.shake = 0; }
  for (const [key, val] of cryoTiles.entries()) { const left = val - dt; if (left <= 0) cryoTiles.delete(key); else cryoTiles.set(key, left); }
  if (match.mode !== 'TUTORIAL') updateStormAndAirdrops(dt);
  updateHumanInput();
  for (const f of fighters) {
    if (!f.alive) continue;
    if (!f.isHuman) {
      if (f.ai.tutorialDormant) { f.vx = 0; f.vy = 0; }
      else updateAI(f, dt);
    }
    updateFighter(f, dt);
  }
  updateBombs(dt);
  for (let i = explosions.length - 1; i >= 0; i--) { explosions[i].timer -= dt; if (explosions[i].timer <= 0) explosions.splice(i, 1); }
  for (let i = particles.length - 1; i >= 0; i--) { const p = particles[i]; p.life -= dt; if (p.life <= 0) { particles.splice(i, 1); continue; } p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= Math.exp(-2.5 * dt); p.vy *= Math.exp(-2.5 * dt); }
  for (let i = floatingLabels.length - 1; i >= 0; i--) { const l = floatingLabels[i]; l.life -= dt; l.y -= 26 * dt; if (l.life <= 0) floatingLabels.splice(i, 1); }
  hudAccum += dt;
  if (hudAccum >= 0.1) { hudAccum = 0; updateHUD(); }
  updateCamera(dt);
  updateTrails(dt);
  if (tutorial.active) updateTutorial(dt);
  checkMatchEnd(dt);
}

function updateCamera(dt) {
  const k = 1 - Math.exp(-6 * dt);
  if (spectate.active) {
    if (spectate.cam === 'total') {
      const topPad = 44, bottomPad = 150;
      const areaH = Math.max(200, viewH - topPad - bottomPad);
      const fit = Math.min(viewW, areaH) / WORLD_PX * 0.98;
      const top = topPad + (areaH - WORLD_PX * fit) / 2;
      const targetY = (viewH / 2 - top) / fit;
      cam.zoom += (fit - cam.zoom) * k;
      cam.x += (WORLD_PX / 2 - cam.x) * k;
      cam.y += (targetY - cam.y) * k;
      return;
    }
    const idx = spectate.cam === 'p2' ? 1 : 0;
    const sf = fighters[idx] || fighters[0];
    const want = viewW < 520 ? 1.0 : 1.25;
    cam.zoom += (want - cam.zoom) * k;
    if (sf) { cam.x += (sf.x - cam.x) * k; cam.y += (sf.y - cam.y) * k; }
    return;
  }
  if (match.mode === 'DUEL' && !match.demoMode && duel.humanFighter && duel.botFighter) {
    const h = duel.humanFighter, b = duel.botFighter;
    if (h.alive && b.alive) {
      const spanX = Math.abs(h.x - b.x) + TILE_SIZE * 3;
      const spanY = Math.abs(h.y - b.y) + TILE_SIZE * 3;
      const wantZoom = clamp(Math.min(viewW / spanX, viewH / spanY), 0.5, 1.45);
      cam.zoom += (wantZoom - cam.zoom) * k;
      cam.x += ((h.x + b.x) / 2 - cam.x) * k;
      cam.y += ((h.y + b.y) / 2 - cam.y) * k;
      const halfW = viewW / (2 * cam.zoom), halfH = viewH / (2 * cam.zoom);
      cam.x = WORLD_PX > halfW * 2 ? clamp(cam.x, halfW, WORLD_PX - halfW) : WORLD_PX / 2;
      cam.y = WORLD_PX > halfH * 2 ? clamp(cam.y, halfH, WORLD_PX - halfH) : WORLD_PX / 2;
      return;
    }
  }
  const localHumans = fighters.filter(f => f.alive && controlOf(f.device) !== null);
  let tx, ty;
  if (localHumans.length === 1) { tx = localHumans[0].x; ty = localHumans[0].y; }
  else if (localHumans.length > 1) { tx = localHumans.reduce((s, f) => s + f.x, 0) / localHumans.length; ty = localHumans.reduce((s, f) => s + f.y, 0) / localHumans.length; }
  else {
    const alive = fighters.filter(f => f.alive);
    if (alive.length) { tx = alive.reduce((s, f) => s + f.x, 0) / alive.length; ty = alive.reduce((s, f) => s + f.y, 0) / alive.length; }
    else { tx = WORLD_PX / 2; ty = WORLD_PX / 2; }
  }
  const wantZoom = match.mode === 'DUEL'
    ? clamp(Math.min(viewW, viewH) / (16 * TILE_SIZE), 0.72, 2.1)
    : clamp(Math.max(viewW, viewH) / (17 * TILE_SIZE), 0.72, 2.1) * (match.mode === 'LOCAL' ? 0.84 : 1) * (Math.min(viewW, viewH) < 430 ? 0.94 : 1);
  cam.zoom += (wantZoom - cam.zoom) * k;
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

/* ---------- Servidor de salas (sinalização WebRTC) ---------- */
// Mesmo host por padrão; aceita ?server=https://... ou window.BLAST_SERVER.
const netServer = {
  base: (() => {
    try {
      const q = new URLSearchParams(location.search).get('server');
      return String(q || window.BLAST_SERVER || '').replace(/\/+$/, '');
    } catch (e) { return ''; }
  })(),
  available: false, checked: false, serverless: false, code: '', token: '', role: null,
  since: 0, polling: false, pollAbort: null, busy: false, roomToken: '',
  quick: false,
  bracketSlot: '', bracketRival: '',
  peers: { host: false, guest: false },
  ws: null, wsWanted: false, wsTries: 0
};
function netApiUrl(p) { return netServer.base + p; }
function netServerLikely() {
  if (window.__BLAST_SERVER__ || netServer.base) return true;
  try {
    if (/\.vercel\.app$/i.test(location.hostname)) return true;
    return new URLSearchParams(location.search).has('room');
  } catch (e) { return false; }
}
async function netApi(p, body, method = 'POST', timeoutMs = 8000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(netApiUrl(p), {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      cache: 'no-store',
      signal: ctrl.signal
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(data.error || ('HTTP ' + res.status));
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  } finally {
    clearTimeout(timer);
  }
}

const NET_GRACE_MS = 12000;
const NET_REMATCH_WAIT_MS = 15000;

const net = {
  role: null, pc: null, dc: null, connected: false, started: false, hold: false,
  closing: false, sendAccum: 0, inputAccum: 0, pingAccum: 0, ping: 0, lastReceive: 0,
  gridSentRev: -1, feedSeq: 0, feedSentSeq: 0, seenExplosions: new Set(), pending: {},
  lastGridRev: -1,
  // Sincronização do efeito de coleta de power-up e estado de revanche.
  pickupSeq: 0, pickupQueue: [], pickupSentSeq: 0, lastPickupSeq: 0,
  graceDeadline: 0, rematchPending: false, rematchTimer: null,
  // Depois que a janela de reconexão expira, o canal não deve mais
  // ressuscitar a partida com snapshots atrasados.
  dropped: false,
  // Fallback de transporte: quando o P2P não abre (CGNAT, Wi-Fi
  // corporativo, firewall), a partida continua pelo servidor de salas.
  relay: false, relayOut: [], relayPosting: false, relayPump: null,
  relayFallbackTimer: null, relayWatch: 0, relayFails: 0
};

function netRelayStop() {
  if (!net.relay) return;
  net.relay = false;
  net.relayOut = [];
  net.relayPosting = false;
  net.relayFails = 0;
  clearInterval(net.relayPump); net.relayPump = null;
  clearTimeout(net.relayFallbackTimer); net.relayFallbackTimer = null;
  netServerSocketClose();
}

let netGraceInterval = null;

/* Transporte único: P2P quando o canal abriu, relay do servidor quando a
   rede bloqueou o WebRTC. Todo envio do jogo passa por aqui. */
function netCanSend() {
  if (net.relay) return !!(netServer.code && netServer.token);
  return !!(net.dc && net.dc.readyState === 'open');
}

function netSend(obj) {
  const raw = typeof obj === 'string' ? obj : JSON.stringify(obj);
  if (!net.relay && net.dc && net.dc.readyState === 'open') {
    try { net.dc.send(raw); return true; } catch (e) {}
  }
  if (net.relay && netServer.ws && netServer.ws.readyState === 1 && typeof obj !== 'string') {
    try { netServer.ws.send('{"m":' + raw + '}'); return true; } catch (e) {}
  }
  if (net.relay && netServer.code && netServer.token) {
    net.relayOut.push(raw);
    if (net.relayOut.length > 160) net.relayOut.splice(0, net.relayOut.length - 160);
    return true;
  }
  return false;
}

function netSetStatus(key, kind = 'idle') {
  const el = document.getElementById('netStatus');
  if (!el) return;
  const dict = I18N[currentLang];
  el.textContent = dict[key] || key;
  el.className = 'text-[10px] font-bold text-center rounded-xl px-2 py-1 border ' + (kind === 'ok' ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300' : kind === 'err' ? 'bg-rose-500/15 border-rose-500/50 text-rose-300' : 'bg-slate-800/70 border-slate-700 text-slate-400');
}

function netPickRole(role) {
  if (!hasCompetitiveNick()) { openNickGate(() => netPickRole(role)); return; }
  net.role = role;
  const hostBox = document.getElementById('netHostBox');
  const guestBox = document.getElementById('netGuestBox');
  if (hostBox) hostBox.style.display = role === 'host' ? 'flex' : 'none';
  if (guestBox) guestBox.style.display = role === 'guest' ? 'flex' : 'none';
  document.getElementById('btnHostRole').className = role === 'host' ? 'flex-1 py-2 rounded-xl bg-emerald-500/20 border-2 border-emerald-400 font-display font-bold text-xs text-emerald-300' : 'flex-1 py-2 rounded-xl bg-slate-800/70 border-2 border-slate-700 font-display font-bold text-xs text-slate-300';
  document.getElementById('btnGuestRole').className = role === 'guest' ? 'flex-1 py-2 rounded-xl bg-emerald-500/20 border-2 border-emerald-400 font-display font-bold text-xs text-emerald-300' : 'flex-1 py-2 rounded-xl bg-slate-800/70 border-2 border-slate-700 font-display font-bold text-xs text-slate-300';
  netSetStatus('netIdle', 'idle');
}

function b64FromBytes(bytes) {
  let out = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) out += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  return btoa(out);
}
function bytesFromB64(str) {
  const bin = atob(str);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function encodeSignal(obj) {
  const text = JSON.stringify(obj);
  if (typeof CompressionStream === 'function') {
    try {
      const stream = new Blob([text]).stream().pipeThrough(new CompressionStream('gzip'));
      const buf = await new Response(stream).arrayBuffer();
      return 'GZ:' + b64FromBytes(new Uint8Array(buf));
    } catch (e) {}
  }
  return 'B:' + btoa(text);
}

async function decodeSignal(raw) {
  let clean = String(raw || '').replace(/\s+/g, '');
  if (!clean) throw new Error('empty');
  const gzAt = clean.indexOf('GZ:');
  if (gzAt > 0) clean = clean.slice(gzAt);
  if (clean.startsWith('GZ:')) {
    if (typeof DecompressionStream !== 'function') throw new Error('no-decompress');
    const stream = new Blob([bytesFromB64(clean.slice(3))]).stream().pipeThrough(new DecompressionStream('gzip'));
    return JSON.parse(await new Response(stream).text());
  }
  const body = clean.startsWith('B:') ? clean.slice(2) : clean;
  const padded = body + '='.repeat((4 - (body.length % 4)) % 4);
  return JSON.parse(atob(padded));
}

function netShowReconnect(show) {
  const el = document.getElementById('netReconnect');
  if (!el) return;
  if (show) netRefreshReconnectUI();
  el.classList.toggle('hidden', !show);
}

function netReconnectRemaining() {
  return net.graceDeadline ? Math.max(0, Math.ceil((net.graceDeadline - performance.now()) / 1000)) : 0;
}

function netRefreshReconnectUI() {
  const dict = I18N[currentLang];
  const s = netReconnectRemaining();
  const title = document.getElementById('netReconnectTitle');
  const sub = document.getElementById('netReconnectSub');
  const cd = document.getElementById('netReconnectCountdown');
  if (title) title.textContent = dict.netReconnecting;
  if (sub) sub.textContent = (dict.netReconnectSubCount || dict.netReconnectSub).replace('{s}', s);
  if (cd) cd.textContent = `${s}s`;
}

function netEnterReconnectGrace() {
  if (!net.started || match.ended || net.closing) return;
  net.connected = false;
  net.ping = 0;
  // Renova a janela a cada oscilação para o jogador não perder a partida
  // por causa de um pico curto de rede.
  net.graceDeadline = performance.now() + NET_GRACE_MS;
  if (!net.hold) {
    net.hold = true;
    netShowReconnect(true);
    netSetStatus('netReconnecting', 'idle');
    resetJoystick();
  }
  netRefreshReconnectUI();
  clearInterval(netGraceInterval);
  netGraceInterval = setInterval(() => {
    if (!net.hold) { clearInterval(netGraceInterval); netGraceInterval = null; return; }
    if (netReconnectRemaining() <= 0) { clearInterval(netGraceInterval); netGraceInterval = null; netHandleDrop(); return; }
    netRefreshReconnectUI();
  }, 250);
  netUpdateBadge();
}

function netExitReconnectGrace() {
  clearInterval(netGraceInterval); netGraceInterval = null;
  net.graceDeadline = 0;
  net.connected = true;
  if (!net.hold) { netUpdateBadge(); return; }
  net.hold = false;
  net.dropped = false;
  net.lastReceive = performance.now();
  // Reenviar/aceitar o estado completo depois da queda, para os dois
  // lados voltarem exatamente ao mesmo ponto.
  net.gridSentRev = -1;
  net.lastGridRev = -1;
  net.pingAccum = 0;
  net.pending = {};
  netShowReconnect(false);
  netSetStatus('netConnected', 'ok');
  netUpdateBadge();
}

function netHandleDrop() {
  if (net.closing) return;
  netRelayStop();
  clearInterval(netGraceInterval); netGraceInterval = null;
  clearTimeout(netDropTimer); netDropTimer = null;
  clearTimeout(net.rematchTimer); net.rematchTimer = null;
  net.graceDeadline = 0;
  net.connected = false;
  net.hold = false;
  net.ping = 0;
  net.pending = {};
  net.lastReceive = 0;
  net.dropped = true;
  net.rematchPending = false;
  netShowReconnect(false);
  resetJoystick();
  netSetStatus('netLost', 'err');
  if (!net.started) { netUpdateBadge(); return; }
  if (match.running && !match.ended) endMatch(false, false, { record: false });
  const dict = I18N[currentLang];
  UI.endTrophy.textContent = '📡';
  UI.endRank.textContent = 'ONLINE';
  UI.endRank.className = 'inline-block px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/50 text-rose-300 font-display font-extrabold text-sm mb-1';
  UI.endTitle.textContent = dict.netLostTitle;
  UI.endSub.textContent = dict.netLostSub;
  if (UI.btnPlayAgain) {
    const label = UI.btnPlayAgain.querySelector('span');
    if (label) label.textContent = dict.exitBtn;
  }
  UI.endModal.classList.remove('hidden');
  netUpdateBadge();
}

let netDropTimer = null;

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
    if (net.relay) return;
    const st = pc.connectionState;
    if (st === 'connected') {
      clearTimeout(netDropTimer); netDropTimer = null;
      netExitReconnectGrace();
      net.connected = true;
    } else if (st === 'failed') {
      netHandleDrop();
    } else if (st === 'disconnected') {
      // Oscilação de rede: pausa a partida e abre uma janela de 12s
      // (com contagem regressiva visível) para a conexão voltar.
      netEnterReconnectGrace();
    }
  });
  net.pc = pc;
  return pc;
}

function netWireChannel(dc) {
  net.dc = dc;
  dc.addEventListener('open', () => {
    // A partida já migrou para o relay: este canal chegou tarde e não pode
    // duplicar mensagens.
    if (net.relay) { try { dc.close(); } catch (e) {} return; }
    net.closing = false;
    net.connected = true;
    net.lastReceive = performance.now();
    clearTimeout(net.relayFallbackTimer); net.relayFallbackTimer = null;
    netServerStopPoll();
    netSetStatus('netConnected', 'ok');
    // Sinais de voz que chegaram antes do canal abrir saem agora.
    if (window.VoiceChat) window.VoiceChat.flushSignals();
    if (net.role === 'host') netStartHostMatch();
    else {
      netSetStatus('netWaitingHost', 'ok');
      const fallback = (I18N[currentLang] || {}).nickFallback || 'JOGADOR';
      const name = (GameState.state.profile.nick || UI.nameInput.value || fallback).trim().slice(0, 15) || fallback;
      try { dc.send(JSON.stringify({ t: 'hi', n: name, cs: GameState.state.skins.equipped, tr: GameState.state.cosmetics.trails.equipped, xs: GameState.state.cosmetics.explosions.equipped, av: GameState.state.profile.avatar })); } catch (e) {}
    }
  });
  dc.addEventListener('close', () => {
    if (net.closing || net.relay) return;
    // Um fechamento do canal normalmente é definitivo, mas ainda damos
    // uma janela curta caso seja só uma queda momentânea do transporte.
    if (net.started && !match.ended && net.pc && net.pc.connectionState !== 'closed' && net.pc.connectionState !== 'failed') {
      netEnterReconnectGrace();
      clearTimeout(netDropTimer);
      netDropTimer = setTimeout(() => { if (!net.connected) netHandleDrop(); }, NET_GRACE_MS);
    } else {
      netHandleDrop();
    }
  });
  dc.addEventListener('message', ev => {
    if (net.relay) return;
    let msg;
    try { msg = JSON.parse(ev.data); } catch (e) { return; }
    netHandleMessage(msg);
  });
}

/* Roteia uma mensagem da partida, venha ela do canal P2P ou do relay. */
function netHandleMessage(msg) {
  if (!msg || !msg.t) return;
  net.lastReceive = performance.now();
  if (net.hold) netExitReconnectGrace();
  if (msg.t === 's') netApplySnapshot(msg);
  else if (msg.t === 'i') netOnRemoteInput(msg);
  else if (msg.t === 'hi') netOnHello(msg);
  else if (msg.t === 'p') netSend({ t: 'o', ts: msg.ts });
  else if (msg.t === 'o') {
    const rtt = Math.max(0, performance.now() - Number(msg.ts || 0));
    net.ping = net.ping ? Math.round(net.ping * 0.6 + rtt * 0.4) : Math.round(rtt);
    netUpdateBadge();
  }
  else if (msg.t === 'rm') netOnRematchRequest();
  else if (msg.t === 'vs') { if (window.VoiceChat) window.VoiceChat.onSignalReceived(msg.k, msg.d); }
}

function autoCopySignal(id) {
  const el = document.getElementById(id);
  if (!el || !el.value) return;
  if (!navigator.clipboard || !navigator.clipboard.writeText) return;
  navigator.clipboard.writeText(el.value).then(() => netSetStatus('netAutoCopied', 'ok')).catch(() => {});
}

async function netBuildOfferSignal() {
  net.role = 'host';
  netSetStatus('netCreating', 'idle');
  try { if (net.pc) net.pc.close(); } catch (e) {}
  net.pc = null;
  const pc = netCreatePeer();
  const dc = pc.createDataChannel('blast', { ordered: true });
  netWireChannel(dc);
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  await waitIceComplete(pc);
  if (!/a=candidate:/.test(pc.localDescription.sdp)) { netSetStatus('netNoIce', 'err'); return null; }
  const signal = await encodeSignal({ t: 'offer', sdp: pc.localDescription.sdp });
  const out = document.getElementById('netOfferOut');
  if (out) out.value = signal;
  netSetStatus('netInviteReady', 'ok');
  return signal;
}

async function netHostCreateOffer() {
  if (!hasCompetitiveNick()) { openNickGate(netHostCreateOffer); return; }
  try {
    const signal = await netBuildOfferSignal();
    if (signal) autoCopySignal('netOfferOut');
  } catch (err) { console.error(err); netSetStatus('netError', 'err'); }
}

async function netAcceptAnswerSignal(raw) {
  try {
    if (!net.pc) { netSetStatus('netError', 'err'); return false; }
    if (net.pc.remoteDescription) return true;
    const desc = await decodeSignal(raw);
    if (!desc || desc.t !== 'answer' || !desc.sdp) throw new Error('bad answer');
    net.role = 'host';
    await net.pc.setRemoteDescription({ type: 'answer', sdp: desc.sdp });
    netSetStatus('netConnecting', 'idle');
    return true;
  } catch (err) { console.error(err); netSetStatus('netError', 'err'); return false; }
}

async function netHostAcceptAnswer() {
  const el = document.getElementById('netAnswerIn');
  await netAcceptAnswerSignal(el ? el.value : '');
}

async function netBuildAnswerSignal(rawOffer) {
  if (net.connected) return null;
  const desc = await decodeSignal(rawOffer);
  if (!desc || desc.t !== 'offer' || !desc.sdp) throw new Error('bad offer');
  net.role = 'guest';
  netSetStatus('netCreating', 'idle');
  try { if (net.pc) net.pc.close(); } catch (e) {}
  net.pc = null;
  const pc = netCreatePeer();
  pc.addEventListener('datachannel', ev => netWireChannel(ev.channel));
  await pc.setRemoteDescription({ type: 'offer', sdp: desc.sdp });
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  await waitIceComplete(pc);
  if (!/a=candidate:/.test(pc.localDescription.sdp)) { netSetStatus('netNoIce', 'err'); return null; }
  const signal = await encodeSignal({ t: 'answer', sdp: pc.localDescription.sdp });
  const out = document.getElementById('netAnswerOut');
  if (out) out.value = signal;
  netSetStatus('netAnswerReady', 'ok');
  return signal;
}

async function netGuestMakeAnswer() {
  if (!hasCompetitiveNick()) { openNickGate(netGuestMakeAnswer); return; }
  try {
    const el = document.getElementById('netOfferIn');
    const signal = await netBuildAnswerSignal(el ? el.value : '');
    if (signal) autoCopySignal('netAnswerOut');
  } catch (err) { console.error(err); netSetStatus('netError', 'err'); }
}

let autoConnectTimer = null, autoAnswerTimer = null;

async function tryAutoConnect() {
  if (net.role !== 'host' || !net.pc || net.connected || net.pc.remoteDescription) return;
  const el = document.getElementById('netAnswerIn');
  const v = el && el.value.trim();
  if (!v || v.length < 40) return;
  try { await decodeSignal(v); } catch (e) { return; }
  netHostAcceptAnswer();
}

async function tryAutoAnswer() {
  if (net.pc || net.connected || net.role !== 'guest') return;
  const el = document.getElementById('netOfferIn');
  const v = el && el.value.trim();
  if (!v || v.length < 40) return;
  try { await decodeSignal(v); } catch (e) { return; }
  netGuestMakeAnswer();
}

function scheduleAutoConnect() { clearTimeout(autoConnectTimer); autoConnectTimer = setTimeout(tryAutoConnect, 500); }
function scheduleAutoAnswer() { clearTimeout(autoAnswerTimer); autoAnswerTimer = setTimeout(tryAutoAnswer, 600); }

/* ---------- Servidor de salas: criar/entrar sem copiar códigos ---------- */
function netServerDict() { return I18N[currentLang] || I18N.pt; }

function netServerState(text, kind = '') {
  const el = document.getElementById('netServerState');
  if (!el) return;
  el.textContent = text;
  el.classList.remove('ok', 'err');
  if (kind) el.classList.add(kind);
}

function netServerHint(key) {
  const el = document.getElementById('netServerHint');
  if (el) el.textContent = netServerDict()[key] || key;
}

function netServerUI() {
  const dict = netServerDict();
  const box = document.getElementById('netServerBox');
  const toggle = document.getElementById('netManualToggle');
  const manual = document.getElementById('netManualArea');
  const showServer = netServer.checked && netServer.available;
  if (box) box.classList.toggle('hidden', !showServer);
  if (toggle) {
    toggle.classList.toggle('hidden', !showServer);
    toggle.textContent = dict[netServer.manualOpen ? 'serverManualHide' : 'serverManual'] || '';
  }
  if (manual) manual.classList.toggle('hidden', showServer && !netServer.manualOpen);
  if (showServer) {
    netServerState(netServer.available ? dict.serverOnline : dict.serverOffline, 'ok');
    const hint = document.querySelector('#onlinePanel [data-i18n="onlineHint"]');
    if (hint) hint.textContent = dict.onlineHintServer || dict.onlineHint;
  }
  const lobby = document.getElementById('netServerLobby');
  const room = document.getElementById('netServerRoom');
  if (lobby) lobby.classList.toggle('hidden', !!netServer.code);
  if (room) room.classList.toggle('hidden', !netServer.code);
  const codeOut = document.getElementById('netServerCodeOut');
  if (codeOut) codeOut.textContent = netServer.code || '----';
  if (netServer.code) netServerHint(netServer.role === 'guest' ? 'serverWaitOffer' : 'serverWaitGuest');
  quickMatchUI();
}

async function netServerCheck(force = false) {
  const now = Date.now();
  if (!force && netServer.checked) return netServer.available;
  if (netServer.checking) return netServer.available;
  netServer.checking = true;
  netServer.lastCheck = now;
  try {
    const data = await netApi('/api/health', null, 'GET', 3500);
    netServer.available = !!data.ok;
    // Serverless não tem long-poll: o laço precisa respirar um pouco mais.
    netServer.serverless = data.mode === 'serverless';
    if (Array.isArray(data.iceServers) && data.iceServers.length) NET_ICE.iceServers = data.iceServers;
  } catch (e) {
    netServer.available = false;
  }
  netServer.checking = false;
  netServer.checked = true;
  netServerUI();
  return netServer.available;
}

function netServerStopPoll() {
  netServer.polling = false;
  if (netServer.pollAbort) {
    try { netServer.pollAbort.abort(); } catch (e) {}
    netServer.pollAbort = null;
  }
}

async function netServerHandleSignal(data) {
  // O relay manda JSON puro ({t:'rb', m:[...]}); oferta/resposta seguem
  // compactadas (GZ:) como no fluxo P2P.
  if (typeof data === 'string' && data.charAt(0) === '{') {
    let raw = null;
    try { raw = JSON.parse(data); } catch (e) { return; }
    if (!raw || !raw.t) return;
    if (raw.t === 'offer' || raw.t === 'answer') { /* fluxo antigo em JSON puro */ }
    else {
      // JSON puro só chega pelo relay: promove os dois lados juntos.
      if (!net.relay) netEnterRelay({ quiet: true });
      if (raw.t === 'rb') {
        if (Array.isArray(raw.m)) raw.m.forEach(m => { if (m && m.t) netHandleMessage(m); });
      } else {
        netHandleMessage(raw);
      }
      return;
    }
  }
  if (net.relay) return;
  let msg = null;
  try { msg = await decodeSignal(data); } catch (e) { return; }
  if (!msg) return;
  if (msg.t === 'offer' && netServer.role === 'guest') {
    const answer = await netBuildAnswerSignal(data);
    if (answer) await netApi(`/api/rooms/${netServer.code}/signal`, { token: netServer.token, data: answer });
    netServerHint(answer ? 'serverGuestReady' : 'serverNoIce');
  } else if (msg.t === 'answer' && netServer.role === 'host') {
    if (await netAcceptAnswerSignal(data)) netServerHint('serverHostReady');
  }
}

/* ---------- Relay do servidor: partida mesmo sem P2P ---------- */
const NET_RELAY_DELAY_MS = 7000;

/* Socket por sala: um envio/recebimento por mensagem, sem custo de
   requisição. Quando o servidor não aceita o upgrade (proxy, Vercel,
   `ws` ausente), o relay HTTP com lotes continua exatamente como antes. */
function netWsUrl() {
  if (!netServer.code || !netServer.token) return '';
  const p = `/api/rooms/${netServer.code}/ws?token=${encodeURIComponent(netServer.token)}`;
  if (netServer.base) return netServer.base.replace(/^http/i, 'ws') + p;
  if (location.protocol === 'https:') return 'wss://' + location.host + p;
  if (location.protocol === 'http:') return 'ws://' + location.host + p;
  return '';
}

function netServerSocketOpen() {
  if (netServer.ws || !netServer.wsWanted) return;
  const url = netWsUrl();
  if (!url || typeof WebSocket === 'undefined') return;
  let ws = null;
  try { ws = new WebSocket(url); } catch (e) { return; }
  ws.onopen = () => {
    if (!netServer.wsWanted) { try { ws.close(); } catch (e) {} return; }
    netServer.ws = ws;
    netServer.wsTries = 0;
    // O que estava na fila do HTTP sai agora pelo socket, na ordem.
    const queued = net.relayOut.splice(0);
    queued.forEach(raw => { try { ws.send('{"m":' + raw + '}'); } catch (e) {} });
    netServerStopPoll();
  };
  ws.onmessage = ev => {
    let frame = null;
    try { frame = JSON.parse(ev.data); } catch (e) { return; }
    if (!frame) return;
    if (frame.peers) {
      netServer.peers = frame.peers;
      if (net.relay && net.started && !frame.peers.guest && netServer.role === 'host' && !net.closing) netHandleDrop();
    }
    if (frame.closed) {
      netServerHint('serverRoomClosed');
      netSetStatus('netLost', 'err');
      if (net.relay && net.started && !net.closing) netHandleDrop();
      return;
    }
    if (frame.m) {
      if (Number(frame.seq)) netServer.since = Number(frame.seq);
      netHandleMessage(frame.m);
    }
  };
  ws.onclose = () => {
    if (netServer.ws !== ws) return;
    netServer.ws = null;
    if (!netServer.wsWanted || net.closing || net.dropped) return;
    // Sem socket, volta para o long-poll para a partida não parar.
    if (net.relay && !netServer.polling) netServerStartPoll();
    netServer.wsTries = (netServer.wsTries || 0) + 1;
    if (netServer.wsTries <= 3) setTimeout(netServerSocketOpen, 1200);
  };
  ws.onerror = () => { try { ws.close(); } catch (e) {} };
}

function netServerSocketClose() {
  netServer.wsWanted = false;
  netServer.wsTries = 0;
  if (netServer.ws) {
    const ws = netServer.ws;
    netServer.ws = null;
    try { ws.close(); } catch (e) {}
  }
}

/* Migra a partida para o relay do servidor de salas. É o caminho que
   garante partida quando o WebRTC é bloqueado (4G, CGNAT, Wi-Fi
   corporativo). Quando o P2P abre, ele continua sendo o transporte rápido. */
function netEnterRelay(opts = {}) {
  if (net.relay || !netServer.code || !netServer.token) return false;
  if (!net.role) net.role = netServer.role || null;
  if (!net.role) return false;
  net.relay = true;
  net.relayFails = 0;
  net.closing = false;
  net.dropped = false;
  net.connected = true;
  net.hold = false;
  net.graceDeadline = 0;
  net.lastReceive = performance.now();
  net.ping = 0;
  clearInterval(netGraceInterval); netGraceInterval = null;
  clearTimeout(net.relayFallbackTimer); net.relayFallbackTimer = null;
  clearTimeout(netDropTimer); netDropTimer = null;
  // O canal P2P (se ainda estava negociando) não pode mais entregar nada.
  try { if (net.dc) net.dc.close(); } catch (e) {}
  try { if (net.pc) net.pc.close(); } catch (e) {}
  net.dc = null; net.pc = null;
  if (window.VoiceChat) window.VoiceChat.setVisible(false);
  // Pode ser chamado de dentro do próprio laço de poll: não abre um segundo.
  if (!netServer.polling) netServerStartPoll();
  clearInterval(net.relayPump);
  net.relayPump = setInterval(netServerRelayPump, 50);
  netServer.wsTries = 0;
  netServer.wsWanted = true;
  netServerSocketOpen();
  netShowReconnect(false);
  netSetStatus('netConnected', 'ok');
  netUpdateBadge();
  if (!opts.quiet) showToast((I18N[currentLang] || {}).serverRelay || '');
  if (net.role === 'host') {
    if (!net.started) netStartHostMatch();
  } else {
    netSetStatus('netWaitingHost', 'ok');
    const fallback = (I18N[currentLang] || {}).nickFallback || 'JOGADOR';
    const name = (GameState.state.profile.nick || UI.nameInput.value || fallback).trim().slice(0, 15) || fallback;
    netSend({ t: 'hi', n: name, cs: GameState.state.skins.equipped, tr: GameState.state.cosmetics.trails.equipped, xs: GameState.state.cosmetics.explosions.equipped, av: GameState.state.profile.avatar });
  }
  return true;
}

/* Um POST por lote: snapshots (30 Hz) + inputs (60 Hz) viram ~15
   requisições por segundo, na ordem, sem sobrecarregar o servidor.
   Com o socket aberto a fila sai por ele e o HTTP fica de reserva. */
function netServerRelayPump() {
  if (!net.relay || net.relayPosting || !net.relayOut.length) return;
  if (netServer.ws && netServer.ws.readyState === 1) {
    const raw = net.relayOut.splice(0, 64);
    raw.forEach(s => { try { netServer.ws.send('{"m":' + s + '}'); } catch (e) {} });
    return;
  }
  if (!netServer.code || !netServer.token) return;
  const raw = net.relayOut.splice(0, net.relayOut.length > 40 ? 24 : 12);
  const batch = [];
  raw.forEach(s => { try { batch.push(JSON.parse(s)); } catch (e) {} });
  if (!batch.length) return;
  net.relayPosting = true;
  netApi(`/api/rooms/${netServer.code}/signal`, { token: netServer.token, data: JSON.stringify({ t: 'rb', m: batch }) }, 'POST', 6000)
    .then(() => { net.relayPosting = false; net.relayFails = 0; })
    .catch(err => {
      net.relayPosting = false;
      net.relayFails = (net.relayFails || 0) + 1;
      if (err.status === 404 || err.status === 403 || net.relayFails >= 5) { netHandleDrop(); return; }
      // Devolve o lote para a frente da fila e tenta de novo.
      net.relayOut.unshift(...raw);
    });
}

function netScheduleRelayFallback(delay = NET_RELAY_DELAY_MS) {
  if (!netServer.code || !netServer.token) return;
  clearTimeout(net.relayFallbackTimer);
  net.relayFallbackTimer = setTimeout(netRelayFallbackCheck, delay);
}

function netRelayFallbackCheck() {
  net.relayFallbackTimer = null;
  if (net.relay || net.connected) return;
  if (net.dc && net.dc.readyState === 'open') return;
  if (!netServer.code || !netServer.token) return;
  const peer = netServer.role === 'host' ? !!(netServer.peers && netServer.peers.guest) : true;
  if (!peer) {
    // Sala ainda vazia: continua vigiando sem atrasar a entrada do amigo.
    net.relayFallbackTimer = setTimeout(netRelayFallbackCheck, 2000);
    return;
  }
  netEnterRelay();
}

async function netServerPollLoop() {
  while (netServer.polling) {
    const ctrl = new AbortController();
    netServer.pollAbort = ctrl;
    const timer = setTimeout(() => ctrl.abort(), 32000);
    let data = null;
    try {
      const res = await fetch(
        netApiUrl(`/api/rooms/${netServer.code}/poll?token=${encodeURIComponent(netServer.token)}&since=${netServer.since}`),
        { cache: 'no-store', signal: ctrl.signal }
      );
      data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 404) {
          clearTimeout(timer);
          netServer.pollAbort = null;
          netServerStopPoll();
          netServerHint('serverRoomClosed');
          netSetStatus('netLost', 'err');
          showToast(netServerDict().serverRoomClosed);
          if (net.relay && net.started && !net.closing) netHandleDrop();
          break;
        }
        throw new Error(data.error || ('HTTP ' + res.status));
      }
    } catch (err) {
      clearTimeout(timer);
      netServer.pollAbort = null;
      if (!netServer.polling || err.name === 'AbortError') break;
      netServerHint('serverErrorMsg');
      await new Promise(r => setTimeout(r, 1500));
      continue;
    }
    clearTimeout(timer);
    netServer.pollAbort = null;
    if (!netServer.polling) break;
    netServer.since = Number(data.seq) || netServer.since;
    for (const msg of data.messages || []) {
      try { await netServerHandleSignal(msg.data); } catch (e) { console.warn('sinal', e); }
    }
    if (data.peers) {
      netServer.peers = data.peers;
      // O amigo entrou: vigia o P2P e cai no relay se ele não abrir.
      if (data.peers.guest && !net.relay && !net.connected && netServer.role === 'host' && !net.relayFallbackTimer) {
        netScheduleRelayFallback();
      }
      // No relay o convidado pode fechar a aba sem fechar canal algum:
      // a ausência dele na sala encerra a partida.
      if (net.relay && net.started && !data.peers.guest && netServer.role === 'host' && !net.closing) {
        netHandleDrop();
      }
    }
    if (netServer.role === 'host' && data.peers) {
      netServerHint(data.peers.guest ? 'serverHostReady' : 'serverWaitGuest');
    }
    if (data.closed) {
      netServerStopPoll();
      netServerHint('serverRoomClosed');
      netSetStatus('netLost', 'err');
      showToast(netServerDict().serverRoomClosed);
      if (net.relay && net.started && !net.closing) netHandleDrop();
      break;
    }
    // Servidor serverless responde na hora com a fila vazia: sem esta
    // pausa o laço martelaria a API sem necessidade.
    if (data.empty && !(data.messages || []).length) {
      await new Promise(r => setTimeout(r, netServer.serverless ? 480 : 320));
      if (!netServer.polling) break;
    } else if (netServer.serverless) {
      await new Promise(r => setTimeout(r, 120));
      if (!netServer.polling) break;
    }
  }
}

function netServerStartPoll() {
  netServerStopPoll();
  netServer.polling = true;
  netServerPollLoop();
}

async function netServerCreateRoom() {
  const dict = netServerDict();
  if (!hasCompetitiveNick()) { openNickGate(netServerCreateRoom); return; }
  if (netServer.busy) return;
  if (!(await netServerCheck())) { showToast(dict.serverErrorMsg); return; }
  netServer.busy = true;
  netServer.manualOpen = false;
  try {
    netServerStopPoll();
    net.role = 'host';
    const room = await netApi('/api/rooms', { name: (GameState.state.profile.nick || 'Host').slice(0, 24) });
    netServer.code = room.code;
    netServer.token = room.token;
    netServer.role = 'host';
    netServer.since = 0;
    netServerUI();
    // Navegador/rede pode nem permitir criar o RTCPeerConnection: o relay
    // não depende dele.
    let signal = null;
    try { signal = await netBuildOfferSignal(); } catch (e) { signal = null; }
    if (signal) {
      await netApi(`/api/rooms/${netServer.code}/signal`, { token: netServer.token, data: signal });
      netServerHint('serverWaitGuest');
    } else {
      // Sem ICE a sala continua de pé: quando o amigo entrar, o relay do
      // servidor assume e a partida acontece mesmo assim.
      netServerHint('serverRelayWait');
    }
    netServerStartPoll();
  } catch (err) {
    console.error(err);
    showToast(dict.serverErrorMsg);
    await netServerLeave(true);
  } finally {
    netServer.busy = false;
  }
}

async function netServerJoinRoom(rawCode) {
  const dict = netServerDict();
  const code = String(rawCode || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4);
  if (code.length !== 4) { showToast(dict.serverBadCode); return; }
  if (!hasCompetitiveNick()) { openNickGate(() => netServerJoinRoom(code)); return; }
  if (netServer.busy) return;
  if (!(await netServerCheck())) { showToast(dict.serverErrorMsg); return; }
  netServer.busy = true;
  netServer.manualOpen = false;
  try {
    netServerStopPoll();
    const joined = await netApi(`/api/rooms/${code}/join`, { name: (GameState.state.profile.nick || 'Guest').slice(0, 24) });
    netServer.code = joined.code;
    netServer.token = joined.token;
    netServer.role = 'guest';
    netServer.since = 0;
    netServer.peers = joined.peers || { host: true, guest: true };
    net.role = 'guest';
    netServerUI();
    netServerHint('serverWaitOffer');
    netServerStartPoll();
    // Se o P2P não abrir, a partida segue pelo relay do servidor.
    netScheduleRelayFallback();
  } catch (err) {
    console.error(err);
    if (err.status === 404) showToast(dict.serverNoRoom);
    else if (err.status === 409) showToast(dict.serverFull);
    else showToast(dict.serverErrorMsg);
  } finally {
    netServer.busy = false;
  }
}

async function netServerLeave(silent = false) {
  const code = netServer.code;
  const token = netServer.token;
  netRelayStop();
  netServerStopPoll();
  netServer.code = '';
  netServer.token = '';
  netServer.role = null;
  netServer.since = 0;
  netServer.busy = false;
  netServer.quick = false;
  netServer.bracketSlot = '';
  netServer.bracketRival = '';
  quickMatchStatus('');
  if (code && token) {
    try {
      await fetch(netApiUrl(`/api/rooms/${code}/leave`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
        cache: 'no-store',
        keepalive: true
      });
    } catch (e) { /* sala expira sozinha */ }
  }
  if (!net.started) {
    try { if (net.pc) net.pc.close(); } catch (e) {}
    net.pc = null;
    net.dc = null;
    net.connected = false;
    net.role = null;
  }
  netServerUI();
  if (!silent) netSetStatus('netIdle', 'idle');
}

async function netServerCopyLink() {
  if (!netServer.code) return;
  const dict = netServerDict();
  const url = `${location.origin}${location.pathname}?room=${netServer.code}`;
  try {
    await navigator.clipboard.writeText(url);
    showToast(dict.serverCopied);
  } catch (e) {
    const el = document.getElementById('netServerCodeOut');
    if (el) el.textContent = netServer.code;
    showToast(url);
  }
}

function netServerToggleManual() {
  netServer.manualOpen = !netServer.manualOpen;
  netServerUI();
}

/* ---------- Busca rápida 1v1 (fila pública do servidor) ---------- */
const matchmaking = { ticket: '', polling: false, startedAt: 0, tick: null };

function quickMatchUI() {
  const idle = document.querySelector('#btnQuickMatch .qm-idle');
  const busy = document.querySelector('#btnQuickMatch .qm-busy');
  const btn = document.getElementById('btnQuickMatch');
  if (!btn) return;
  // Fila em memória não existe no modo serverless (Vercel).
  btn.classList.toggle('hidden', netServer.serverless);
  const quick = document.querySelector('.net-quick');
  if (quick) quick.dataset.searching = matchmaking.polling ? '1' : '';
  if (idle) idle.classList.toggle('hidden', matchmaking.polling);
  if (busy) busy.classList.toggle('hidden', !matchmaking.polling);
  const el = document.getElementById('quickMatchStatus');
  if (!el) return;
  if (matchmaking.polling) el.classList.remove('hidden');
  else if (!el.dataset.keep) { el.classList.add('hidden'); el.textContent = ''; }
}

function quickMatchStatus(text, keep = false) {
  const el = document.getElementById('quickMatchStatus');
  if (!el) return;
  if (!text) { el.classList.add('hidden'); el.textContent = ''; el.removeAttribute('data-keep'); return; }
  el.classList.remove('hidden');
  el.textContent = text;
  if (keep) el.dataset.keep = '1';
}

function quickMatchStop(statusText) {
  matchmaking.polling = false;
  matchmaking.ticket = '';
  clearInterval(matchmaking.tick); matchmaking.tick = null;
  quickMatchStatus(statusText || '', !!statusText);
  quickMatchUI();
}

async function quickMatchCancel(silent = false) {
  const ticket = matchmaking.ticket;
  const dict = netServerDict();
  if (!ticket && !matchmaking.polling) return;
  quickMatchStop('');
  if (ticket) {
    try {
      await fetch(netApiUrl('/api/matchmaking/leave'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticket }),
        cache: 'no-store',
        keepalive: true
      });
    } catch (e) { /* o servidor descarta o ticket ocioso */ }
  }
  if (!silent) showToast(dict.quickMatchCancelled || 'Busca cancelada.');
}

function quickMatchEnter(room, meta = {}) {
  const dict = netServerDict();
  quickMatchStop(meta.foundText || (dict.quickMatchFound || 'Partida encontrada! Conectando…'));
  netServerStopPoll();
  netServer.code = room.code;
  netServer.token = room.token;
  netServer.role = room.role === 'guest' ? 'guest' : 'host';
  netServer.since = 0;
  netServer.peers = room.peers || { host: true, guest: true };
  netServer.quick = !meta.slot;
  netServer.bracketSlot = meta.slot || '';
  netServer.bracketRival = meta.rival || '';
  net.role = netServer.role;
  netServerUI();
  netServerHint(netServer.role === 'guest' ? 'serverWaitOffer' : 'serverWaitGuest');
  if (netServer.bracketSlot) {
    // Confronto do mata-mata: a partida inteira passa pelo servidor (relay).
    // Assim o servidor vê o estado final e decide o vencedor sozinho — o
    // jogador não declara vitória/derrota.
    netServerStartPoll();
    netEnterRelay({ quiet: true });
    return;
  }
  if (netServer.role === 'host') {
    // O convidado já está na sala: manda a oferta e deixa o poll vigiar.
    netBuildOfferSignal()
      .then(signal => (signal ? netApi(`/api/rooms/${netServer.code}/signal`, { token: netServer.token, data: signal }) : null))
      .catch(() => null)
      .then(() => {
        if (!netServer.code) return;
        netServerStartPoll();
        netScheduleRelayFallback(2500);
      });
  } else {
    netServerStartPoll();
    netScheduleRelayFallback();
  }
}

async function quickMatchPollLoop() {
  const dict = netServerDict();
  while (matchmaking.polling && matchmaking.ticket) {
    const ticket = matchmaking.ticket;
    let data = null;
    try {
      data = await netApi('/api/matchmaking/poll', { ticket }, 'POST', 14000);
    } catch (err) {
      if (!matchmaking.polling || matchmaking.ticket !== ticket) return;
      if (err.status === 410) {
        quickMatchStop('');
        showToast(dict.quickMatchExpired || 'A busca expirou. Tente de novo.');
        return;
      }
      await new Promise(r => setTimeout(r, 1500));
      continue;
    }
    if (!matchmaking.polling || matchmaking.ticket !== ticket) return;
    if (data.state === 'matched' && data.room) { quickMatchEnter(data.room); return; }
  }
}

async function quickMatchSearch() {
  const dict = netServerDict();
  if (matchmaking.polling) { quickMatchCancel(); return; }
  if (!hasCompetitiveNick()) { openNickGate(quickMatchSearch); return; }
  if (bracketDuel.polling) { showToast(dict.quickMatchInBracket || 'Você está na busca da chave. Cancele antes de buscar partida.'); return; }
  if (netServer.code) { showToast(dict.quickMatchLeaveRoom || ''); return; }
  if (!(await netServerCheck())) { showToast(dict.serverErrorMsg || ''); return; }
  if (netServer.serverless) { showToast(dict.quickMatchUnavailable || ''); return; }
  const name = String(GameState.state.profile.nick || '').trim().slice(0, 24);
  if (!name) return;
  matchmaking.polling = true;
  matchmaking.startedAt = Date.now();
  const tickText = () => {
    const secs = Math.round((Date.now() - matchmaking.startedAt) / 1000);
    quickMatchStatus((dict.quickMatchSearching || 'Procurando jogador… {t}s').replace('{t}', secs));
  };
  tickText();
  clearInterval(matchmaking.tick);
  matchmaking.tick = setInterval(tickText, 1000);
  quickMatchUI();
  try {
    const data = await netApi('/api/matchmaking/join', { name });
    if (!matchmaking.polling) return;
    matchmaking.ticket = data.ticket || '';
    if (data.state === 'matched' && data.room) { quickMatchEnter(data.room); return; }
    quickMatchPollLoop();
  } catch (err) {
    quickMatchStop('');
    showToast(dict.serverErrorMsg || '');
  }
}

/* ---------- Mata-mata semanal: PvP online com resultado confirmado ---------- */
/* O pareamento acontece por confronto da chave (qf1..f1) e o servidor só
   junta os dois jogadores se cada um declarar o outro como adversário.
   O confronto só avança quando OS DOIS lados reportam o resultado. */
const bracketDuel = { ticket: '', polling: false, slot: '', rival: '', startedAt: 0, tick: null };

function bracketDuelTick() {
  const el = document.getElementById('bracketDuelStatus');
  if (!el || !bracketDuel.polling) return;
  const dict = netServerDict();
  const secs = Math.round((Date.now() - bracketDuel.startedAt) / 1000);
  el.textContent = (dict.bracketSearching || '🔎 Procurando {rival}… {t}s')
    .replace('{rival}', bracketDuel.rival || '?').replace('{t}', secs);
}

function bracketDuelStop() {
  bracketDuel.polling = false;
  bracketDuel.ticket = '';
  bracketDuel.slot = '';
  bracketDuel.rival = '';
  clearInterval(bracketDuel.tick);
  bracketDuel.tick = null;
}

async function bracketDuelCancel(silent = false) {
  const ticket = bracketDuel.ticket;
  const dict = netServerDict();
  if (!ticket && !bracketDuel.polling) return;
  bracketDuelStop();
  renderBracket();
  if (ticket) {
    try {
      await fetch(netApiUrl('/api/bracket/leave'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticket }),
        cache: 'no-store',
        keepalive: true
      });
    } catch (e) { /* o servidor descarta o ticket ocioso */ }
  }
  if (!silent) showToast(dict.bracketCancelled || 'Busca da chave cancelada.');
}

function bracketDuelEnter(room) {
  const dict = netServerDict();
  const slot = bracketDuel.slot;
  const rival = bracketDuel.rival;
  bracketDuelStop();
  renderBracket();
  quickMatchEnter(room, { slot, rival, foundText: dict.bracketFound || '⚔️ Adversário da chave encontrado! Conectando…' });
}

async function bracketDuelPollLoop() {
  const dict = netServerDict();
  while (bracketDuel.polling && bracketDuel.ticket) {
    const ticket = bracketDuel.ticket;
    let data = null;
    try {
      data = await netApi('/api/bracket/poll', { ticket }, 'POST', 14000);
    } catch (err) {
      if (!bracketDuel.polling || bracketDuel.ticket !== ticket) return;
      if (err.status === 410) {
        bracketDuelStop();
        renderBracket();
        showToast(dict.bracketExpired || 'A busca da chave expirou. Tente de novo.');
        return;
      }
      await new Promise(r => setTimeout(r, 1500));
      continue;
    }
    if (!bracketDuel.polling || bracketDuel.ticket !== ticket) return;
    if (data.state === 'matched' && data.room) { bracketDuelEnter(data.room); return; }
  }
}

async function bracketDuelSearch(slot, rival) {
  const dict = netServerDict();
  const name = String(GameState.state.profile.nick || '').trim().slice(0, 24);
  bracketDuel.polling = true;
  bracketDuel.slot = slot;
  bracketDuel.rival = rival;
  bracketDuel.startedAt = Date.now();
  clearInterval(bracketDuel.tick);
  bracketDuel.tick = setInterval(bracketDuelTick, 1000);
  renderBracket();
  bracketDuelTick();
  showToast((dict.bracketWaitRival || '⏳ {rival} também precisa tocar em Jogar a Chave.').replace('{rival}', rival));
  try {
    const join = () => netApi('/api/bracket/join', { slot, name, opponent: rival });
    let data;
    try {
      data = await join();
    } catch (err) {
      // Top 8 ainda não chegou ao servidor (ex.: primeiro boot da semana):
      // publica a lista congelada deste aparelho e tenta mais uma vez.
      if (err.status !== 409) throw err;
      showToast(dict.bracketSeedsPending || '⏳ A chave está fechando o Top 8. Tente de novo em instantes.');
      bracketLockSeeds();
      await new Promise(r => setTimeout(r, 1200));
      data = await join();
    }
    if (!bracketDuel.polling || bracketDuel.slot !== slot) return;
    bracketDuel.ticket = data.ticket || '';
    if (data.state === 'matched' && data.room) { bracketDuelEnter(data.room); return; }
    bracketDuelPollLoop();
  } catch (err) {
    bracketDuelStop();
    renderBracket();
    if (err.status === 403) showToast(dict.bracketNotQualified || '🔒 Só o Top 8 congelado desta semana pode jogar o mata-mata.');
    else if (err.status === 409) showToast(dict.bracketNeedEight || '🔒 O mata-mata fecha quando a Liga tiver 8 jogadores ranqueados nesta semana.');
    else showToast(dict.serverErrorMsg || 'Falha no servidor. Tente novamente.');
  }
}

/* Publica o resultado da partida e espera a confirmação do adversário.
   Só grava a vitória/derrota da chave quando o servidor confirma. */
async function bracketReportResult(slot) {
  const dict = netServerDict();
  const note = document.getElementById('endBracketLine');
  const mark = (text, tone) => {
    if (!note) return;
    note.textContent = text;
    note.className = `end-bracket ${tone || ''}`.trim();
    note.classList.remove('hidden');
  };
  const code = netServer.code;
  const token = netServer.token;
  const role = netServer.role || net.role;
  if (!code || !token || !role) {
    mark(dict.bracketNoConfirm || '⚠️ Resultado não registrado pelo servidor.', 'warn');
    return;
  }
  // O jogador não declara nada: a chave inteira passa pelo servidor, que lê
  // o estado final transmitido pela partida e decide o vencedor sozinho.
  // Aqui só esperamos essa decisão aparecer.
  mark(dict.bracketWaitConfirm || '⏳ Registrando o resultado no servidor…', 'wait');
  for (let i = 0; i < 12; i++) {
    let data = null;
    try { data = await netApi('/api/bracket/result', { code, token }, 'POST', 8000); } catch (err) { data = null; }
    if (data && data.confirmed) {
      if (!data.winner) { mark(dict.bracketVoid || '⚠️ Resultado inconclusivo. O confronto não avançou.', 'warn'); return; }
      const advanced = data.winner === role;
      GameState.setBracketResult(slot, advanced ? 'won' : 'lost');
      mark(advanced
        ? (dict.bracketConfirmedWin || '✅ Resultado oficial: você avançou na chave!')
        : (dict.bracketConfirmedLoss || '❌ Resultado oficial: você foi eliminado.'),
        advanced ? 'win' : 'loss');
      renderBracket();
      refreshBracketServerState(true);
      return;
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  mark(dict.bracketNoConfirm || '⚠️ Resultado não registrado pelo servidor.', 'warn');
  refreshBracketServerState(true);
}

// Fecha a sala no servidor se o jogador fechar/recarregar a aba antes da partida.
window.addEventListener('pagehide', () => {
  if (matchmaking.ticket) {
    try {
      const body = new Blob([JSON.stringify({ ticket: matchmaking.ticket })], { type: 'application/json' });
      navigator.sendBeacon(netApiUrl('/api/matchmaking/leave'), body);
    } catch (e) { /* o TTL do servidor limpa depois */ }
  }
  if (bracketDuel.ticket) {
    try {
      const body = new Blob([JSON.stringify({ ticket: bracketDuel.ticket })], { type: 'application/json' });
      navigator.sendBeacon(netApiUrl('/api/bracket/leave'), body);
    } catch (e) { /* o TTL do servidor limpa depois */ }
  }
  if (!netServer.code || !netServer.token) return;
  try {
    const body = new Blob([JSON.stringify({ token: netServer.token })], { type: 'application/json' });
    navigator.sendBeacon(netApiUrl(`/api/rooms/${netServer.code}/leave`), body);
  } catch (e) { /* o TTL do servidor limpa depois */ }
});


/* ========================================================================
   13.5 CHAT DE VOZ OPCIONAL (WebRTC — sempre desligado ao entrar)
   ======================================================================== */
const VOICE_ICE = {
  iceServers: [{ urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] }]
};
const VOICE_REPORT_KEY = 'blastVoiceReports';

const VoiceChat = (() => {
  const state = {
    micOn: false, oppMuted: false, visible: false,
    stream: null, pc: null, remoteAudio: null,
    makingOffer: false, ignoreOffer: false, polite: false,
    pendingSignals: [],
    // O transporte dos sinais SDP/ICE é o datachannel do jogo até o Firebase
    // entrar. Para migrar: VoiceChat.transport = (kind, data) => db.ref(...).
    transport: null
  };

  function dict() { return I18N[currentLang] || {}; }

  function remoteAudioEl() {
    if (!state.remoteAudio) state.remoteAudio = document.getElementById('voiceRemoteAudio');
    return state.remoteAudio;
  }

  function opponentName() {
    if (net.role) {
      const other = fighters.find(f => f.device === (net.role === 'host' ? 'p2' : 'p1'));
      if (other && other.name) return other.name;
      return net.role === 'host' ? 'Jogador 2' : 'Host';
    }
    if (match.mode === 'DUEL' && duel.botFighter) return duel.botFighter.name;
    return duel.opponent || 'Rival';
  }

  function sendSignal(kind, payload) {
    const msg = { t: 'vs', k: kind, d: payload };
    // Nunca envia sinal do jogo sozinho fora do canal aberto: fica na fila.
    if (typeof VoiceChat.transport === 'function') {
      try { VoiceChat.transport(kind, payload); return; } catch (e) {}
    }
    // No relay a mídia P2P da voz também não abriria: o chat fica oculto.
    if (net.relay) return;
    if (netSend(msg)) { flushSignals(); return; }
    if (state.pendingSignals.length < 40) state.pendingSignals.push(msg);
  }

  function flushSignals() {
    if (!netCanSend() || !state.pendingSignals.length) return;
    const queue = state.pendingSignals.splice(0);
    queue.forEach(msg => { if (!netSend(msg)) state.pendingSignals.push(msg); });
  }

  function ensurePeer() {
    if (state.pc) return state.pc;
    const pc = new RTCPeerConnection(VOICE_ICE);
    state.polite = net.role === 'guest';
    pc.addEventListener('track', ev => {
      const audio = remoteAudioEl();
      if (!audio) return;
      audio.srcObject = ev.streams[0] || new MediaStream([ev.track]);
      audio.muted = state.oppMuted;
      const p = audio.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    });
    pc.addEventListener('icecandidate', ev => {
      if (ev.candidate) sendSignal('ice', ev.candidate.toJSON());
    });
    // Negociação perfeita (padrão W3C): se os dois ligarem o mic quase juntos,
    // o host (impolite) ignora a oferta concorrente e o convidado dá rollback.
    pc.addEventListener('negotiationneeded', async () => {
      try {
        state.makingOffer = true;
        await pc.setLocalDescription(await pc.createOffer());
        sendSignal('description', pc.localDescription.toJSON());
      } catch (err) {
      } finally {
        state.makingOffer = false;
      }
    });
    state.pc = pc;
    return pc;
  }

  async function onSignalReceived(kind, payload) {
    if (!payload || (kind !== 'description' && kind !== 'ice')) return;
    const pc = ensurePeer();
    try {
      if (kind === 'description') {
        const desc = payload;
        const collision = desc.type === 'offer' && (state.makingOffer || pc.signalingState !== 'stable');
        state.ignoreOffer = !state.polite && collision;
        if (state.ignoreOffer) return;
        if (collision && state.polite) {
          await Promise.all([
            pc.setLocalDescription({ type: 'rollback' }).catch(() => {}),
            pc.setRemoteDescription(desc)
          ]);
        } else {
          await pc.setRemoteDescription(desc);
        }
        if (desc.type === 'offer') {
          await pc.setLocalDescription(await pc.createAnswer());
          sendSignal('description', pc.localDescription.toJSON());
        }
      } else {
        try { await pc.addIceCandidate(payload); } catch (err) { if (!state.ignoreOffer) throw err; }
      }
    } catch (err) {}
  }

  async function toggleMic() {
    const d = dict();
    if (state.micOn) {
      state.micOn = false;
      if (state.stream) state.stream.getAudioTracks().forEach(t => { t.enabled = false; });
      updateUI();
      return;
    }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      showToast(d.voiceMicUnavailable || 'Microfone indisponível neste dispositivo.');
      updateUI();
      return;
    }
    try {
      // Permissão só é pedida aqui, no toque do jogador — nunca ao abrir o jogo.
      if (!state.stream) {
        state.stream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
        });
      }
      const pc = ensurePeer();
      const track = state.stream.getAudioTracks()[0];
      if (track) {
        track.enabled = true;
        if (!pc.getSenders().some(s => s.track === track)) pc.addTrack(track, state.stream);
      }
      state.micOn = true;
    } catch (err) {
      state.micOn = false;
      showToast(d.voiceMicDenied || 'Permissão de microfone negada. Voz desligada.');
    }
    updateUI();
  }

  function toggleMuteOpponent() {
    state.oppMuted = !state.oppMuted;
    const audio = remoteAudioEl();
    if (audio) audio.muted = state.oppMuted;
    updateUI();
  }

  function updateUI() {
    const d = dict();
    const mic = document.getElementById('btnVoiceMic');
    const opp = document.getElementById('btnVoiceMuteOpp');
    const rep = document.getElementById('btnVoiceReport');
    const panel = document.getElementById('voicePanel');
    if (panel) panel.title = d.voicePanel || 'Chat de voz';
    if (mic) {
      mic.textContent = state.micOn ? '🎙️' : '🎤';
      mic.classList.toggle('on', state.micOn);
      mic.setAttribute('aria-pressed', state.micOn ? 'true' : 'false');
      mic.title = state.micOn ? (d.voiceMicOff || 'Desligar microfone') : (d.voiceMicOn || 'Ativar microfone');
    }
    if (opp) {
      opp.textContent = state.oppMuted ? '🔇' : '🔊';
      opp.classList.toggle('muted', state.oppMuted);
      opp.setAttribute('aria-pressed', state.oppMuted ? 'true' : 'false');
      opp.title = state.oppMuted ? (d.voiceUnmuteOpp || 'Ouvir adversário') : (d.voiceMuteOpp || 'Mutar adversário');
    }
    if (rep) rep.title = d.voiceReport || 'Denunciar adversário';
  }

  function openReport() {
    const modal = document.getElementById('voiceReportModal');
    const sub = document.getElementById('voiceReportSub');
    if (sub) {
      const tpl = dict().voiceReportSub || 'Denunciar {name} por voz imprópria ou comportamento abusivo?';
      sub.textContent = tpl.replace('{name}', opponentName());
    }
    if (modal) modal.classList.remove('hidden');
  }

  function closeReport() {
    const modal = document.getElementById('voiceReportModal');
    if (modal) modal.classList.add('hidden');
  }

  function confirmReport() {
    // Registro local + fila da nuvem (Realtime Database) quando conectada.
    const entry = { ts: Date.now(), opponent: opponentName(), mode: match.mode, role: net.role || 'local' };
    try {
      const raw = JSON.parse(localStorage.getItem(VOICE_REPORT_KEY) || '[]');
      raw.push(entry);
      localStorage.setItem(VOICE_REPORT_KEY, JSON.stringify(raw.slice(-50)));
    } catch (e) {}
    if (window.FirebaseSync && window.FirebaseSync.reportPlayer) {
      try { window.FirebaseSync.reportPlayer(entry); } catch (e) {}
    }
    closeReport();
    showToast(dict().voiceReportSent || 'Denúncia enviada para análise.');
  }

  function destroy() {
    state.micOn = false;
    state.oppMuted = false;
    state.makingOffer = false;
    state.ignoreOffer = false;
    state.pendingSignals = [];
    if (state.stream) {
      state.stream.getTracks().forEach(t => { try { t.stop(); } catch (e) {} });
      state.stream = null;
    }
    if (state.pc) {
      try { state.pc.close(); } catch (e) {}
      state.pc = null;
    }
    const audio = remoteAudioEl();
    if (audio) {
      try { audio.pause(); } catch (e) {}
      audio.srcObject = null;
      audio.muted = false;
    }
    updateUI();
  }

  function setVisible(show) {
    state.visible = !!show;
    const panel = document.getElementById('voicePanel');
    if (panel) panel.classList.toggle('hidden', !state.visible);
    if (!state.visible) destroy();
    else updateUI();
  }

  return {
    toggleMic, toggleMuteOpponent, sendSignal, onSignalReceived, destroy,
    flushSignals, setVisible, openReport, closeReport, confirmReport, updateUI,
    get micOn() { return state.micOn; },
    get oppMuted() { return state.oppMuted; },
    get visible() { return state.visible; },
    get signalQueue() { return state.pendingSignals.length; },
    get transport() { return state.transport; },
    set transport(fn) { state.transport = typeof fn === 'function' ? fn : null; }
  };
})();
window.VoiceChat = VoiceChat;

async function pasteInto(id, after) {
  try {
    const text = await navigator.clipboard.readText();
    const el = document.getElementById(id);
    if (el && text) el.value = text.trim();
  } catch (e) {
    const el = document.getElementById(id);
    if (el) el.focus();
  }
  if (after) after();
}

async function shareSignal(id) {
  const el = document.getElementById(id);
  if (!el || !el.value) return;
  const text = `Blast Royale\n${el.value}`;
  if (navigator.share) {
    try { await navigator.share({ title: 'Blast Royale', text }); return; }
    catch (e) { if (e && e.name === 'AbortError') return; }
  }
  copyFrom(id);
}

function netStartHostMatch() {
  if (net.started) return;
  net.started = true; net.role = 'host'; match.netRole = 'host';
  match.myControl = 'p1'; match.localControls = ['p1'];
  UI.startScreen.classList.add('hidden'); UI.hud.classList.remove('hidden');
  netResetRoundState();
  net.lastReceive = performance.now();
  initArena(false, 'ONLINE', selectedMap);
  match.netRole = 'host'; match.myControl = 'p1'; match.localControls = ['p1'];
  match.bracketSlot = netServer.bracketSlot || '';
  match.bracketRival = netServer.bracketRival || '';
  netUpdateBadge();
}

function netStartGuestMatch() {
  if (net.started) return;
  net.started = true; net.role = 'guest'; match.netRole = 'guest';
  match.myControl = 'p1'; match.localControls = ['p1'];
  UI.startScreen.classList.add('hidden'); UI.hud.classList.remove('hidden');
  netResetRoundState();
  net.lastReceive = performance.now();
  initArena(false, 'ONLINE', selectedMap);
  match.netRole = 'guest'; match.myControl = 'p1'; match.localControls = ['p1'];
  match.bracketSlot = netServer.bracketSlot || '';
  match.bracketRival = netServer.bracketRival || '';
  netUpdateBadge();
}

// Zera tudo que é específico de uma partida (menos a conexão em si),
// para a revanche começar limpa dos dois lados.
function netResetRoundState() {
  net.sendAccum = 0; net.inputAccum = 0; net.pingAccum = 0; net.ping = 0;
  net.seenExplosions.clear();
  net.gridSentRev = -1; net.lastGridRev = -1;
  net.feed = []; net.feedSeq = 0; net.feedSentSeq = 0;
  net.pickupSeq = 0; net.pickupQueue = []; net.pickupSentSeq = 0; net.lastPickupSeq = 0;
  net.pending = {};
  net.rematchPending = false;
  net.hold = false;
  net.dropped = false;
  clearTimeout(net.rematchTimer); net.rematchTimer = null;
  clearInterval(netGraceInterval); netGraceInterval = null;
  net.graceDeadline = 0;
  netShowReconnect(false);
  const label = UI.btnPlayAgain && UI.btnPlayAgain.querySelector('span');
  if (label) label.textContent = I18N[currentLang].rematchBtn;
}

function netUpdateBadge() {
  const el = document.getElementById('netBadge');
  if (el) {
    const online = !!match.netRole && !match.demoMode;
    const sig = online ? (net.hold ? 'hold' : (!net.connected ? 'offline' : (net.relay ? 'relay' : (match.netRole || 'host')))) : 'lobby';
    if (net.badgeSig !== sig) {
      net.badgeSig = sig;
      el.style.display = online ? 'block' : 'none';
      if (online) {
        if (net.hold) {
          el.textContent = '🌐 ⏳';
          el.className = 'text-[9px] font-display font-bold text-amber-300 bg-slate-950/85 border border-amber-500/50 px-2 py-0.5 rounded-lg text-center';
        } else if (!net.connected) {
          el.textContent = '🌐 OFFLINE';
          el.className = 'text-[9px] font-display font-bold bg-slate-950/85 border px-2 py-0.5 rounded-lg text-center text-rose-300 border-rose-500/50';
        } else if (net.relay) {
          el.textContent = `📡 ${match.netRole === 'host' ? 'HOST' : 'GUEST'}`;
          el.title = (I18N[currentLang] || {}).netRelay || 'relay';
          el.className = 'text-[9px] font-display font-bold bg-slate-950/85 border px-2 py-0.5 rounded-lg text-center text-amber-300 border-amber-500/50';
        } else {
          el.textContent = `🌐 ${match.netRole === 'host' ? 'HOST' : 'GUEST'}`;
          el.className = 'text-[9px] font-display font-bold bg-slate-950/85 border px-2 py-0.5 rounded-lg text-center text-cyan-300 border-cyan-500/40';
        }
      }
    }
  }
  netUpdatePing();
}

function netUpdatePing() {
  const el = document.getElementById('netPing');
  if (!el) return;
  const show = !!match.netRole && !match.demoMode && net.started && net.connected;
  const ms = net.ping ? Math.min(999, Math.round(net.ping)) : 0;
  // netUpdateBadge roda a 30 Hz: só toca no DOM quando o valor muda.
  const sig = `${show ? 1 : 0}:${ms}`;
  if (net.pingSig === sig) return;
  net.pingSig = sig;
  el.classList.toggle('hidden', !show);
  if (!show) return;
  const base = 'text-[9px] font-display font-bold bg-slate-950/85 border px-2 py-0.5 rounded-lg text-center ';
  if (!ms) {
    el.textContent = '📶 -- ms';
    el.className = base + 'text-slate-400 border-slate-700/60';
    return;
  }
  const tone = ms < 70 ? 'text-emerald-300 border-emerald-500/40' : ms < 150 ? 'text-cyan-300 border-cyan-500/40' : 'text-amber-300 border-amber-500/40';
  el.textContent = `📶 ${ms} ms`;
  el.className = base + tone;
}

function netStartRematch() {
  if (net.role !== 'host') return;
  // Sem conexão não há revanche possível: volta ao lobby em vez de
  // deixar o botão "morto" sem feedback.
  if (!net.connected) { netLeaveRoom(); return; }
  netResetRoundState();
  UI.endModal.classList.add('hidden');
  match.ended = false; match.paused = false;
  initArena(false, 'ONLINE', match.mapId);
  netUpdateBadge();
}

function netGuestRematch() {
  netResetRoundState();
  UI.endModal.classList.add('hidden');
  netShowReconnect(false);
  net.hold = false; net.connected = true;
  match.ended = false; match.paused = false; match.running = true;
  match.humanRank = 12; match.lastDeath = null; match.hitFlash = 0;
  match.humanSurvived = null; match.elapsedTime = 0;
  bombs = []; explosions = []; powerups = []; particles = []; floatingLabels = [];
  cryoTiles = new Map(); activeAirdrop = null;
  if (UI.killFeed) UI.killFeed.innerHTML = '';
  if (UI.stormBanner) UI.stormBanner.classList.add('hidden');
  if (UI.airdropBanner) UI.airdropBanner.classList.add('hidden');
  netUpdateBadge();
}

function netOnRematchRequest() {
  if (net.role !== 'host' || !net.started) return;
  if (!net.connected || net.hold) return;
  if (match.ended) netStartRematch();
}

function netQueuePickup(fighter, type) {
  if (net.role !== 'host' || !fighter || !POWERUP_TYPES[type]) return;
  net.pickupSeq++;
  net.pickupQueue.push({
    sq: net.pickupSeq, ty: type,
    x: Math.round(fighter.x * 10) / 10,
    y: Math.round(fighter.y * 10) / 10,
    d: fighter.device
  });
  if (net.pickupQueue.length > 60) net.pickupQueue.shift();
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
  if (!f) return;
  f.name = String(msg.n).slice(0, 14);
  // Cosméticos do convidado: a aura/rastro dele é desenhada no host e
  // chega de volta pelo snapshot para os dois lados verem igual.
  if (msg.cs && cosmeticCatalog('skins').some(s => s.id === msg.cs)) f.cosmeticSkin = msg.cs;
  if (msg.tr && cosmeticCatalog('trails').some(t => t.id === msg.tr)) f.trailId = msg.tr;
  if (msg.xs && cosmeticCatalog('explosions').some(x => x.id === msg.xs)) f.explosionSkin = msg.xs;
  if (msg.av) f.avatar = String(msg.av).slice(0, 8);
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
    run: match.running ? 1 : 0, e: match.ended ? 1 : 0, mp: match.mapId,
    w: (winner && winner.device === 'p2') ? 1 : 0,
    sr: match.safeRing, st: Math.round(match.stormTimer * 10) / 10,
    sw: match.stormWarning ? 1 : 0,
    ad: activeAirdrop ? { c: activeAirdrop.c, r: activeAirdrop.r, timer: Math.round(activeAirdrop.timer * 10) / 10, landed: !!activeAirdrop.landed } : null,
    f: fighters.map(f => ({ i: f.id, d: f.device, n: f.name, c: f.color, v: f.visor, tm: f.team, x: Math.round(f.x * 10) / 10, y: Math.round(f.y * 10) / 10, a: Math.round(f.facingAngle * 100) / 100, hp: f.hp, mhp: f.maxHp, sh: f.shield ? 1 : 0, ck: f.canKick ? 1 : 0, ib: f.inBush ? 1 : 0, al: f.alive ? 1 : 0, k: f.kills, tt: f.tacticalType, ta: [f.tacticalAmmo.SHOCK, f.tacticalAmmo.CRYO, f.tacticalAmmo.C4], mb: f.maxBombs, br: f.bombRange, sl: f.speedLevel, dc: Math.round(f.dashCooldown * 100) / 100, it: Math.round(f.invulnTimer * 100) / 100, cs: f.cosmeticSkin || '', tr: f.trailId || 'none', xs: f.explosionSkin || 'classic', av: f.avatar || '', rk: f.cosmeticSkin ? rarityTier(cosmeticRarity('skins', f.cosmeticSkin)) : 0 })),
    b: bombs.filter(b => !b.exploded).map(b => ({ i: b.id, t: b.type, x: Math.round(b.x * 10) / 10, y: Math.round(b.y * 10) / 10, c: b.c, r: b.r, s: Math.round(b.seed * 100) / 100, f: Math.round(b.fuse * 100) / 100, sk: b.skinId || 'classic' })),
    x: explosions.map(ex => ({ i: ex.id, t: ex.type, x: Math.round(ex.x * 10) / 10, y: Math.round(ex.y * 10) / 10, cells: ex.cells, rad: ex.radius || 0, col: ex.color, ct: ex.center, rt: ex.tier || 0, tm: Math.round(ex.timer * 100) / 100, mt: ex.maxTimer })),
    p: powerups.map(pu => ({ t: pu.type, x: Math.round(pu.x * 10) / 10, y: Math.round(pu.y * 10) / 10, b: Math.round(pu.bobPhase * 100) / 100 })),
    // Efeito visual do gelo também precisa chegar ao convidado.
    cy: Array.from(cryoTiles.entries()).map(([k, v]) => [k, Math.round(v * 10) / 10])
  };
  if (gridRev !== net.gridSentRev) { snap.g = grid; snap.gv = gridRev; net.gridSentRev = gridRev; }
  if (net.feed && net.feed.length) {
    const fresh = net.feed.filter(ev => ev.sq > net.feedSentSeq);
    if (fresh.length) { snap.kf = fresh; net.feedSentSeq = fresh[fresh.length - 1].sq; }
  }
  if (net.pickupQueue.length) {
    const fresh = net.pickupQueue.filter(ev => ev.sq > net.pickupSentSeq);
    if (fresh.length) { snap.pk = fresh; net.pickupSentSeq = fresh[fresh.length - 1].sq; }
  }
  return snap;
}

function netHostSend(dt) {
  if (net.role !== 'host' || !netCanSend()) return;
  if (net.hold || net.dropped) return;
  // O host também mede o ping (antes só o convidado tinha essa leitura).
  net.pingAccum += dt;
  if (net.pingAccum > 2) {
    net.pingAccum = 0;
    netSend({ t: 'p', ts: performance.now() });
  }
  net.sendAccum += dt;
  if (net.sendAccum < 0.033) return;
  net.sendAccum = 0;
  // Evita acumular snapshots na fila quando a conexão está lenta.
  if (!net.relay && net.dc && net.dc.bufferedAmount > 96 * 1024) return;
  netSend(netBuildSnapshot());
}

function netApplySnapshot(s) {
  if (net.role !== 'guest') return;
  if (net.dropped) return;
  if (!net.started) netStartGuestMatch();
  if (s.e && !match.ended) { endMatch(s.w === 1, false); return; }
  if (!s.e && match.ended) netGuestRematch();
  if (s.mp && s.mp !== match.mapId && MAPS.some(m => m.id === s.mp)) {
    // O convidado precisa usar o mesmo mapa/tema escolhido pelo host.
    match.mapId = s.mp;
    match.theme = getMap(s.mp);
    markGridDirty();
  }
  match.elapsedTime = s.tm || 0;
  match.safeRing = typeof s.sr === 'number' ? s.sr : match.safeRing;
  match.stormTimer = typeof s.st === 'number' ? s.st : match.stormTimer;
  match.stormWarning = !!s.sw;
  activeAirdrop = s.ad || null;
  if (match.stormWarning) UI.stormBanner.classList.remove('hidden'); else UI.stormBanner.classList.add('hidden');
  if (activeAirdrop && !activeAirdrop.landed) UI.airdropBanner.classList.remove('hidden'); else UI.airdropBanner.classList.add('hidden');
  if (s.g && s.gv !== net.lastGridRev) { grid = s.g; net.lastGridRev = s.gv; }
  if (Array.isArray(s.cy)) cryoTiles = new Map(s.cy.map(([k, v]) => [k, v]));
  const humanRef = getHuman();
  const prevHp = humanRef ? humanRef.hp : null;
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
    f.canKick = !!d.ck;
    f.cosmeticSkin = d.cs || null;
    f.trailId = d.tr || 'none';
    f.explosionSkin = d.xs || 'classic';
    if (d.av) f.avatar = String(d.av).slice(0, 8);
    f.cosmeticRank = d.rk || 0;
    return f;
  });
  if (humanRef && prevHp != null && humanRef.alive && humanRef.hp < prevHp) match.hitFlash = 0.45;
  bombs = (s.b || []).map(d => ({ id: d.i, type: d.t, x: d.x, y: d.y, c: d.c, r: d.r, ownerId: '', range: 1, fuse: d.f, vx: 0, vy: 0, passThroughPlayers: new Set(), exploded: false, seed: d.s, skinId: d.sk || 'classic' }));
  explosions = (s.x || []).map(d => {
    if (!net.seenExplosions.has(d.i)) {
      net.seenExplosions.add(d.i);
      if (d.t === 'cross') SFX.playExplosion(audibilityAt(d.x, d.y));
      else if (d.t === 'shock') SFX.playShockwave();
      else if (d.t === 'cryo') SFX.playCryo();
      if (d.t === 'cross') triggerShake(5, d.x, d.y);
    }
    return { id: d.i, type: d.t, x: d.x, y: d.y, cells: d.cells || [], radius: d.rad, color: d.col, center: d.ct, tier: d.rt || 0, timer: d.tm, maxTimer: d.mt };
  });
  if (net.seenExplosions.size > 300) net.seenExplosions.clear();
  powerups = (s.p || []).map(d => ({ type: d.t, x: d.x, y: d.y, bobPhase: d.b }));
  if (s.kf && s.kf.length) s.kf.forEach(ev => renderKillFeedRow(ev.k, ev.kc, ev.v, ev.vc, ev.m));
  // Feedback de coleta de power-up vindo do host: som, partículas e
  // etiqueta flutuante para o convidado ver o que acabou de pegar.
  if (Array.isArray(s.pk)) {
    s.pk.forEach(ev => {
      if (!ev || !(ev.sq > net.lastPickupSeq)) return;
      net.lastPickupSeq = ev.sq;
      const meta = POWERUP_TYPES[ev.ty];
      if (!meta) return;
      spawnParticles(ev.x, ev.y, meta.color, 10, 120, 0.35);
      if (ev.d === 'p2') {
        SFX.playPickup();
        addFloatingLabel(meta.label, ev.x, ev.y - 26, meta.color);
        haptic(18);
        padRumble(90, 0.3, 0.45, 'p1');
      }
    });
  }
  netUpdateBadge();
}

function updateNetGuest(dt) {
  // Se o host parar de enviar snapshots (rede caiu ou aba em segundo
  // plano), pausa a partida e mostra a tela de reconexão com contagem.
  if (net.started && !match.ended && net.connected && net.lastReceive &&
      performance.now() - net.lastReceive > 3000) {
    netEnterReconnectGrace();
  }
  const k = 1 - Math.exp(-16 * dt);
  for (const f of fighters) { if (!f.alive) continue; f.x += (f.netX - f.x) * k; f.y += (f.netY - f.y) * k; }
  for (let i = explosions.length - 1; i >= 0; i--) { explosions[i].timer -= dt; if (explosions[i].timer <= 0) explosions.splice(i, 1); }
  netSendInput(dt);
  hudAccum += dt;
  if (hudAccum >= 0.1) { hudAccum = 0; updateHUD(); }
  updateCamera(dt);
  updateTrails(dt);
}

function netSendInput(dt) {
  if (net.role !== 'guest' || !netCanSend()) return;
  if (net.hold || net.dropped) return;
  if (!net.relay && net.dc && net.dc.bufferedAmount > 48 * 1024) return;
  net.inputAccum += dt; net.pingAccum += dt;
  if (net.pingAccum > 2) { net.pingAccum = 0; netSend({ t: 'p', ts: performance.now() }); }
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
  netSend(pkt);
}

function netTick(dt) { if (net.role === 'host') netHostSend(dt); }

function netLeaveRoom() {
  netRelayStop();
  if (netServer.code) netServerLeave(true);
  net.closing = true;
  if (window.VoiceChat) window.VoiceChat.setVisible(false);
  try { if (net.dc) net.dc.close(); } catch (e) {}
  try { if (net.pc) net.pc.close(); } catch (e) {}
  clearTimeout(netDropTimer); netDropTimer = null;
  clearTimeout(net.rematchTimer); net.rematchTimer = null;
  clearInterval(netGraceInterval); netGraceInterval = null;
  net.dc = null; net.pc = null;
  net.connected = false; net.role = null; net.started = false; net.hold = false;
  net.ping = 0; net.pending = {}; net.seenExplosions.clear();
  net.gridSentRev = -1; net.lastGridRev = -1;
  net.feed = []; net.feedSeq = 0; net.feedSentSeq = 0;
  net.pickupSeq = 0; net.pickupQueue = []; net.pickupSentSeq = 0; net.lastPickupSeq = 0;
  net.graceDeadline = 0; net.rematchPending = false; net.lastReceive = 0;
  net.dropped = false;
  setTimeout(() => { net.closing = false; }, 900);
  match.netRole = null;
  match.ended = false; match.running = false; match.paused = false;
  netShowReconnect(false);
  netSetStatus('netIdle', 'idle');
  UI.endModal.classList.add('hidden');
  UI.hud.classList.add('hidden');
  UI.startScreen.classList.remove('hidden');
  renderProgress();
  renderSkins();
  resetJoystick();
  const hudTeams = document.getElementById('hudTeams');
  if (hudTeams) hudTeams.classList.add('hidden');
  initArena(true, selectedMode, selectedMap);
  netUpdateBadge();
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
const CHROMA_TILE_MAX = 96;
const CHROMA_TILE_MIN = 26;
const CHROMA_ROUND_TIME = 4.5;
const CHROMA_WAIT_TIME = 2.0;
const CHROMA_FALL_TIME = 1.2;
const CHROMA_BOT_COUNT = 5;

const chroma = {
  active: false,
  paused: false,
  canvas: null,
  ctx: null,
  viewW: 0,
  viewH: 0,
  tile: 90,
  offsetX: 0,
  offsetY: 0,
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
  shakeIntensity: 0,
  gameOverTimer: null
};

const chromaTouch = { active: false, id: null, ox: 0, oy: 0, dx: 0, dy: 0, max: 46 };

function chromaMetrics() {
  const compact = chroma.viewH < 520;
  const top = compact ? 52 : 150;
  const bottom = compact ? 56 : 84;
  const availW = Math.max(160, chroma.viewW - 20);
  const availH = Math.max(160, chroma.viewH - top - bottom);
  const tile = clamp(Math.floor(Math.min(availW, availH) / CHROMA_GRID), CHROMA_TILE_MIN, CHROMA_TILE_MAX);
  const size = tile * CHROMA_GRID;
  const centered = Math.round((chroma.viewH - size) / 2);
  const maxY = chroma.viewH - bottom - size;
  return {
    tile,
    offsetX: Math.round((chroma.viewW - size) / 2),
    offsetY: clamp(centered, top, Math.max(top, maxY))
  };
}

function layoutChroma(adjustPlayers = false) {
  if (!chroma.canvas) return;
  const metrics = chromaMetrics();
  const prevX = chroma.offsetX, prevY = chroma.offsetY, prevTile = chroma.tile;
  chroma.tile = metrics.tile;
  chroma.offsetX = metrics.offsetX;
  chroma.offsetY = metrics.offsetY;
  chroma.platforms.forEach(p => {
    p.x = metrics.offsetX + p.c * metrics.tile;
    p.y = metrics.offsetY + p.r * metrics.tile;
  });
  if (adjustPlayers && prevTile > 0) {
    const scale = metrics.tile / prevTile;
    chroma.players.forEach(p => {
      p.x = metrics.offsetX + (p.x - prevX) * scale;
      p.y = metrics.offsetY + (p.y - prevY) * scale;
    });
  }
}

function resetChromaTouch() {
  chromaTouch.active = false;
  chromaTouch.id = null;
  chromaTouch.dx = 0;
  chromaTouch.dy = 0;
}

function initChromaDrop() {
  chroma.canvas = document.getElementById('chromaCanvas');
  chroma.ctx = chroma.canvas.getContext('2d');
  clearTimeout(chroma.gameOverTimer);
  chroma.gameOverTimer = null;
  document.getElementById('chromaGameOver').classList.add('hidden');
  MUSIC.play('battle');
  chroma.active = true;
  chroma.paused = false;
  chroma.roundNumber = 0;
  chroma.particles = [];
  chroma.shakeTimer = 0;
  resetChromaTouch();
  
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
  
  const metrics = chromaMetrics();
  chroma.tile = metrics.tile;
  chroma.offsetX = metrics.offsetX;
  chroma.offsetY = metrics.offsetY;

  chroma.platforms = [];
  for (let r = 0; r < CHROMA_GRID; r++) {
    for (let c = 0; c < CHROMA_GRID; c++) {
      const colorIdx = Math.floor(Math.random() * CHROMA_COLORS.length);
      chroma.platforms.push({
        c, r,
        x: metrics.offsetX + c * metrics.tile,
        y: metrics.offsetY + r * metrics.tile,
        color: CHROMA_COLORS[colorIdx].id,
        alive: true,
        falling: false,
        fallY: 0,
        fallVel: 0,
        fallRot: 0,
        spawnT: 0,
        bobPhase: Math.random() * Math.PI * 2
      });
    }
  }
  
  chroma.players = [];
  const centerX = metrics.offsetX + (CHROMA_GRID / 2) * metrics.tile;
  const centerY = metrics.offsetY + (CHROMA_GRID / 2) * metrics.tile;
  const humanRadius = clamp(metrics.tile * 0.2, 11, 18);
  const botRadius = clamp(metrics.tile * 0.18, 10, 16);
  
  chroma.players.push({
    x: centerX, y: centerY,
    vx: 0, vy: 0,
    radius: humanRadius,
    color: '#34d399',
    visor: '#ecfdf5',
    name: (GameState.state.profile.nick || UI.nameInput.value || 'JOGADOR').slice(0, 15),
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
    const dist = metrics.tile * 1.5;
    chroma.players.push({
      x: centerX + Math.cos(angle) * dist,
      y: centerY + Math.sin(angle) * dist,
      vx: 0, vy: 0,
      radius: botRadius,
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
  if (chroma.active && chroma.platforms.length) layoutChroma(true);
}

function startChromaRound() {
  chroma.roundNumber++;
  
  let availableColors = CHROMA_COLORS.filter(c => c.id !== (chroma.currentColor?.id));
  if (availableColors.length === 0) availableColors = CHROMA_COLORS;
  
  chroma.currentColor = availableColors[Math.floor(Math.random() * availableColors.length)];

  // Floor rebuilds between rounds: every broken tile comes back, with a new color mix
  chroma.platforms.forEach(p => {
    p.alive = true;
    p.falling = false;
    p.fallY = 0;
    p.fallVel = 0;
    p.fallRot = 0;
    p.spawnT = 0;
    p.color = CHROMA_COLORS[Math.floor(Math.random() * CHROMA_COLORS.length)].id;
  });
  let safeCount = chroma.platforms.filter(p => p.color === chroma.currentColor.id).length;
  const minSafe = Math.max(6, Math.round(chroma.platforms.length * 0.16));
  while (safeCount < minSafe) {
    const candidates = chroma.platforms.filter(p => p.color !== chroma.currentColor.id);
    if (!candidates.length) break;
    candidates[Math.floor(Math.random() * candidates.length)].color = chroma.currentColor.id;
    safeCount++;
  }

  chroma.phase = 'waiting';
  chroma.waitTimer = CHROMA_WAIT_TIME;

  // Bots respawn every round so the arena stays populated
  chroma.players.forEach(p => {
    if (!p.isBot) return;
    if (p.alive && !p.falling) {
      p.aiTimer = 0.3 + Math.random() * 0.5;
      p.targetPlatform = null;
    } else {
      const tile = chroma.platforms[Math.floor(Math.random() * chroma.platforms.length)];
      p.alive = true;
      p.falling = false;
      p.fallY = 0;
      p.fallVel = 0;
      p.vx = 0;
      p.vy = 0;
      p.x = tile.x + chroma.tile / 2;
      p.y = tile.y + chroma.tile / 2;
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

  chroma.platforms.forEach(p => {
    if (p.spawnT < 1) p.spawnT = Math.min(1, p.spawnT + dt * 4.5);
  });
  
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
    const mv = chromaTouch.active ? { x: chromaTouch.dx, y: chromaTouch.dy } : readMoveVector('p1');
    const speed = 280;
    human.vx = mv.x * speed;
    human.vy = mv.y * speed;
    
    human.x += human.vx * dt;
    human.y += human.vy * dt;
    
    const minX = chroma.offsetX;
    const maxX = chroma.offsetX + CHROMA_GRID * chroma.tile;
    const minY = chroma.offsetY;
    const maxY = chroma.offsetY + CHROMA_GRID * chroma.tile;
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
      const tx = p.targetPlatform.x + chroma.tile / 2;
      const ty = p.targetPlatform.y + chroma.tile / 2;
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
    if (x >= p.x && x < p.x + chroma.tile && y >= p.y && y < p.y + chroma.tile) return p;
  }
  return null;
}

function findNearestPlatformOfColor(x, y, colorId) {
  let best = null;
  let bestDist = Infinity;
  for (const p of chroma.platforms) {
    if (!p.alive || p.color !== colorId) continue;
    const cx = p.x + chroma.tile / 2;
    const cy = p.y + chroma.tile / 2;
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
          x: p.x + chroma.tile / 2,
          y: p.y + chroma.tile / 2,
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
  
  SFX.playBeep();
}

function endChromaDrop() {
  chroma.phase = 'gameover';
  
  const rounds = chroma.roundNumber - 1;
  if (rounds > 0) missionProgress('chroma', rounds);
  let newRecord = false;
  if (rounds > chroma.highScore) {
    chroma.highScore = rounds;
    newRecord = true;
    try { localStorage.setItem('chroma-highscore', String(chroma.highScore)); } catch (e) {}
  }
  
  SFX.playChromaWrong();
  
  clearTimeout(chroma.gameOverTimer);
  chroma.gameOverTimer = setTimeout(() => {
    chroma.gameOverTimer = null;
    // Segurança extra: se o jogador saiu ou reiniciou antes do timeout,
    // o overlay não deve reaparecer por cima do lobby/da nova partida.
    if (!chroma.active || chroma.phase !== 'gameover') return;
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
      ctx.translate(px + chroma.tile / 2, py + chroma.tile / 2);
      ctx.rotate(p.fallRot);
      ctx.translate(-(px + chroma.tile / 2), -(py + chroma.tile / 2));
      ctx.globalAlpha = Math.max(0, 1 - p.fallY / 400);
    } else if (p.spawnT < 1) {
      const grow = 0.55 + 0.45 * (1 - Math.pow(1 - p.spawnT, 3));
      ctx.translate(px + chroma.tile / 2, py + chroma.tile / 2);
      ctx.scale(grow, grow);
      ctx.translate(-(px + chroma.tile / 2), -(py + chroma.tile / 2));
      ctx.globalAlpha = Math.min(1, 0.35 + p.spawnT);
    }
    
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.beginPath();
    ctx.ellipse(px + chroma.tile / 2, py + chroma.tile - 5, chroma.tile * 0.4, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    const grad = ctx.createLinearGradient(px, py, px, py + chroma.tile);
    grad.addColorStop(0, colorData.hex);
    grad.addColorStop(1, shadeColor(colorData.hex, -40));
    ctx.fillStyle = grad;
    chromaRoundRect(ctx, px + 4, py + 4, chroma.tile - 8, chroma.tile - 8, Math.max(6, chroma.tile * 0.14));
    ctx.fill();
    
    ctx.strokeStyle = shadeColor(colorData.hex, 30);
    ctx.lineWidth = 3;
    chromaRoundRect(ctx, px + 4, py + 4, chroma.tile - 8, chroma.tile - 8, Math.max(6, chroma.tile * 0.14));
    ctx.stroke();
    
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    chromaRoundRect(ctx, px + 10, py + 10, chroma.tile - 20, (chroma.tile - 20) / 2, Math.max(4, chroma.tile * 0.09));
    ctx.fill();
    
    if (chroma.currentColor && p.color === chroma.currentColor.id && chroma.phase === 'running') {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 4]);
      chromaRoundRect(ctx, px + 2, py + 2, chroma.tile - 4, chroma.tile - 4, Math.max(7, chroma.tile * 0.16));
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
    ctx.arc(px, py - 2, Math.max(3, pl.radius * 0.35), 0, Math.PI * 2);
    ctx.fill();
    
    if (!pl.falling && chroma.tile >= 44) {
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

  drawChromaTouch();
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches && chroma.roundNumber <= 2) {
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    const hintY = chroma.viewH < 520 ? H - 22 : H - 76;
    ctx.fillText('ARRASTE PARA SE MOVER', W / 2, hintY);
  }
}

function drawChromaTouch() {
  if (!chromaTouch.active) return;
  const ctx = chroma.ctx;
  const R = chromaTouch.max;
  ctx.save();
  ctx.fillStyle = 'rgba(2,6,23,0.35)';
  ctx.strokeStyle = 'rgba(255,255,255,0.28)';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(chromaTouch.ox, chromaTouch.oy, R, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  const kx = chromaTouch.ox + chromaTouch.dx * R;
  const ky = chromaTouch.oy + chromaTouch.dy * R;
  ctx.fillStyle = 'rgba(168,85,247,0.9)';
  ctx.beginPath(); ctx.arc(kx, ky, 20, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.85)';
  ctx.lineWidth = 2;
  ctx.stroke();
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

function hexA(color, alpha) {
  const h = String(color || '#ffffff').replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const n = parseInt(full, 16);
  if (!Number.isFinite(n)) return `rgba(255,255,255,${alpha})`;
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
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
  clearTimeout(chroma.gameOverTimer);
  chroma.gameOverTimer = null;
  chroma.active = false;
  chroma.paused = false;
  chroma.phase = 'idle';
  MUSIC.play('menu');
  resetChromaTouch();
  document.getElementById('chromaModal').classList.add('hidden');
  document.getElementById('chromaGameOver').classList.add('hidden');
}

function bindChromaTouch() {
  window.addEventListener('pointerdown', e => {
    if (!chroma.active || chroma.paused || chroma.phase === 'gameover') return;
    if (e.pointerType === 'mouse') return;
    if (e.target && e.target.closest && e.target.closest('button, input, textarea, a')) return;
    chromaTouch.active = true;
    chromaTouch.id = e.pointerId;
    chromaTouch.ox = e.clientX;
    chromaTouch.oy = e.clientY;
    chromaTouch.dx = 0;
    chromaTouch.dy = 0;
  }, { passive: true });
  window.addEventListener('pointermove', e => {
    if (!chromaTouch.active || e.pointerId !== chromaTouch.id) return;
    const dx = e.clientX - chromaTouch.ox;
    const dy = e.clientY - chromaTouch.oy;
    const len = Math.hypot(dx, dy);
    const max = chromaTouch.max;
    if (len < 6) { chromaTouch.dx = 0; chromaTouch.dy = 0; return; }
    const clamped = Math.min(len, max);
    chromaTouch.dx = (dx / len) * (clamped / max);
    chromaTouch.dy = (dy / len) * (clamped / max);
  }, { passive: true });
  const end = e => {
    if (chromaTouch.active && e.pointerId === chromaTouch.id) resetChromaTouch();
  };
  window.addEventListener('pointerup', end);
  window.addEventListener('pointercancel', end);
}

function bindChromaUI() {
  bindChromaTouch();
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
      MUSIC.setMuted(m);
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
   18.1 ARQUIBANCADA AO VIVO (ESPECTADOR)
   ======================================================================== */
const spectate = { active: false, cam: 'total', cooldownUntil: 0, ticker: null };

function setSpectateCam(cam) {
  spectate.cam = ['total', 'p1', 'p2'].includes(cam) ? cam : 'total';
  document.querySelectorAll('[data-cam]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cam === spectate.cam);
  });
}

function updateCheerCooldown() {
  const el = document.getElementById('cheerCooldown');
  if (!el) return;
  const left = Math.max(0, spectate.cooldownUntil - performance.now());
  el.textContent = left > 0 ? `${(left / 1000).toFixed(1)}s` : '';
  document.querySelectorAll('.cheer-btn').forEach(btn => {
    btn.classList.toggle('cooling', left > 0);
    btn.disabled = left > 0;
  });
}

function spawnCheerEmoji(emoji) {
  const layer = document.getElementById('cheerFloatLayer');
  if (!layer) return;
  const span = document.createElement('span');
  span.className = 'cheer-float';
  span.textContent = emoji;
  const side = Math.random();
  if (side < 0.5) {
    span.style.left = `${8 + Math.random() * 84}%`;
    span.style.bottom = `${6 + Math.random() * 8}%`;
  } else {
    span.style.left = side < 0.75 ? '6%' : '92%';
    span.style.bottom = `${18 + Math.random() * 55}%`;
  }
  span.style.setProperty('--dx', `${(Math.random() * 80 - 40).toFixed(0)}px`);
  span.style.setProperty('--rot', `${(Math.random() * 36 - 18).toFixed(0)}deg`);
  layer.appendChild(span);
  setTimeout(() => span.remove(), 2800);
}

function cheer(emoji) {
  if (!spectate.active) return;
  if (performance.now() < spectate.cooldownUntil) return;
  spectate.cooldownUntil = performance.now() + 3000;
  SFX.playPickup();
  spawnCheerEmoji(emoji);
  updateCheerCooldown();
}

function startSpectate(pair = null) {
  if (spectate.active) return;
  SFX.init();
  spectate.active = true;
  spectate.cooldownUntil = 0;
  setSpectateCam('total');
  // A arquibancada é sempre entre terceiros: o nick local nunca entra na
  // transmissão, nem como padrão nem vindo de um par malformado.
  const me = String(GameState.state.profile.nick || '').trim().toLowerCase();
  const rivals = GameState.leagueTable().filter(r => !r.me).map(r => r.name);
  const pickRival = (i) => rivals.length ? rivals[i % rivals.length] : `Bot ${i + 1}`;
  const sanitize = (name, i) => {
    const n = String(name || '').trim();
    return (!n || n.toLowerCase() === me) ? pickRival(i) : n;
  };
  spectatePair = Array.isArray(pair) && pair[0] && pair[1]
    ? [sanitize(pair[0], 0), sanitize(pair[1], 1)]
    : [pickRival(0), pickRival(1)];
  const label = document.getElementById('spectateMatchLabel');
  if (label) {
    const tpl = I18N[currentLang].spectateVs || '{a} × {b}';
    const link = (n) => `<span role="button" tabindex="0" class="live-player-link" data-player="${escapeHtml(n)}">${escapeHtml(n)}</span>`;
    label.innerHTML = tpl.split('{a}').join(link(spectatePair[0])).split('{b}').join(link(spectatePair[1]));
  }
  UI.endModal.classList.add('hidden');
  UI.startScreen.classList.add('hidden');
  UI.hud.classList.add('hidden');
  document.body.classList.add('spectating');
  const layer = document.getElementById('spectateLayer');
  if (layer) layer.classList.remove('hidden');
  initArena(true, 'DUEL', duel.biomeCycle[Math.floor(Math.random() * duel.biomeCycle.length)]);
  match.stormTimer = match.stormInterval = 999;
  match.airdropTimer = 999;
  clearInterval(spectate.ticker);
  spectate.ticker = setInterval(updateCheerCooldown, 120);
  updateCheerCooldown();
}

function stopSpectate() {
  if (!spectate.active) return;
  spectate.active = false;
  clearInterval(spectate.ticker);
  spectate.ticker = null;
  document.body.classList.remove('spectating');
  const layer = document.getElementById('spectateLayer');
  if (layer) layer.classList.add('hidden');
  const floatLayer = document.getElementById('cheerFloatLayer');
  if (floatLayer) floatLayer.innerHTML = '';
  UI.endModal.classList.add('hidden');
  UI.hud.classList.add('hidden');
  UI.startScreen.classList.remove('hidden');
  match.running = false; match.ended = false; match.paused = false; match.pausedByRotate = false;
  initArena(true, selectedMode, selectedMap);
}

/* ========================================================================
   19. RENDERING
   ======================================================================== */
function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, QUALITY.dprCap) * Math.min(renderScale, QUALITY.scaleCap);
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
  drawAmbience(minC, maxC, minR, maxR, match.theme || MAPS[0]);
  drawStormRingWarning();
  drawPortals();
  drawAirdropBeacon();
  drawPowerups();
  drawBlastTelegraphs();
  drawTrails();
  drawBombs();
  drawFighters();
  drawExplosions();
  drawParticles();
  drawLabels();
  ctx.restore();
  drawStormVignette();
  drawHitVignette();
  drawEventTint();
  renderRadar();
}

/* ---- Fundo do lobby ----
   A partida-demo serve para prévias e arquibancada, mas não pode aparecer
   atrás do menu. O lobby desenha um cenário estático do bioma escolhido no
   lugar da arena, então nenhum lutador, bomba ou explosão fica visível. */
const lobbyBackdrop = { key: '', canvas: null };

function drawLobbyBackdrop() {
  const w = canvas.width, h = canvas.height;
  if (!w || !h) return;
  const theme = match.theme || MAPS[0];
  const key = `${theme.id}:${w}x${h}`;
  if (key !== lobbyBackdrop.key || !lobbyBackdrop.canvas) {
    const off = document.createElement('canvas');
    off.width = w; off.height = h;
    paintLobbyBackdrop(off.getContext('2d'), w, h, theme);
    lobbyBackdrop.canvas = off;
    lobbyBackdrop.key = key;
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.drawImage(lobbyBackdrop.canvas, 0, 0);
}

function paintLobbyBackdrop(g, w, h, theme) {
  const base = g.createLinearGradient(0, 0, w * 0.3, h);
  base.addColorStop(0, '#05070d');
  base.addColorStop(0.55, theme.floor[0]);
  base.addColorStop(1, '#04060b');
  g.fillStyle = base;
  g.fillRect(0, 0, w, h);

  const glowAt = (x, y, r, alpha) => {
    const gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, theme.accent);
    gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.save();
    g.globalAlpha = alpha;
    g.fillStyle = gr;
    g.fillRect(x - r, y - r, r * 2, r * 2);
    g.restore();
  };
  glowAt(w * 0.8, h * 0.14, Math.max(w, h) * 0.5, 0.2);
  glowAt(w * 0.1, h * 0.92, Math.max(w, h) * 0.42, 0.1);

  // Anéis de radar atrás do painel, na cor do bioma
  g.save();
  g.strokeStyle = theme.accent;
  g.lineWidth = 1.5;
  for (let i = 1; i <= 5; i++) {
    g.globalAlpha = 0.04 + i * 0.008;
    g.beginPath();
    g.arc(w * 0.5, h * 0.42, Math.min(w, h) * 0.12 * i, 0, Math.PI * 2);
    g.stroke();
  }
  g.restore();

  // Faixas diagonais de velocidade
  g.save();
  g.strokeStyle = theme.glow;
  g.lineWidth = 2;
  const span = Math.max(w, h);
  for (let i = -6; i <= 6; i++) {
    const off = i * span * 0.11;
    g.globalAlpha = i % 2 ? 0.5 : 0.8;
    g.beginPath();
    g.moveTo(-w * 0.2 + off, h);
    g.lineTo(w * 0.5 + off, -h * 0.2);
    g.stroke();
  }
  g.restore();

  // Pontos de luz determinísticos
  g.save();
  g.fillStyle = theme.accent;
  for (let i = 0; i < 80; i++) {
    const x = (((i * 733) % 1000) / 1000) * w;
    const y = (((i * 397) % 1000) / 1000) * h;
    g.globalAlpha = 0.04 + ((i * 53) % 20) / 260;
    g.beginPath();
    g.arc(x, y, 1 + (i % 3) * 0.6, 0, Math.PI * 2);
    g.fill();
  }
  g.restore();

  const vig = g.createRadialGradient(w * 0.5, h * 0.45, Math.min(w, h) * 0.25, w * 0.5, h * 0.45, Math.max(w, h) * 0.75);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(2,4,9,0.82)');
  g.fillStyle = vig;
  g.fillRect(0, 0, w, h);
}

function drawStormRingWarning() {
  if (match.demoMode || match.mode === 'TUTORIAL' || !match.running || match.paused || match.safeRing < 0 || match.safeRing >= MAX_RING) return;
  const ring = match.safeRing;
  const lo = ring * TILE_SIZE, hi = (GRID_SIZE - ring) * TILE_SIZE;
  const warn = match.stormWarning;
  const t = performance.now() / 1000;
  ctx.save();
  ctx.fillStyle = warn ? `rgba(120,20,45,${0.22 + 0.08 * Math.sin(t * 9)})` : 'rgba(120,20,45,0.12)';
  ctx.fillRect(0, 0, WORLD_PX, lo);
  ctx.fillRect(0, hi, WORLD_PX, WORLD_PX - hi);
  ctx.fillRect(0, lo, lo, hi - lo);
  ctx.fillRect(hi, lo, WORLD_PX - hi, hi - lo);
  const band = TILE_SIZE;
  ctx.fillStyle = warn ? `rgba(244,63,94,${0.30 + 0.15 * Math.sin(t * 9)})` : 'rgba(244,63,94,0.16)';
  ctx.fillRect(lo, lo, hi - lo, band);
  ctx.fillRect(lo, hi - band, hi - lo, band);
  ctx.fillRect(lo, lo + band, band, hi - lo - band * 2);
  ctx.fillRect(hi - band, lo + band, band, hi - lo - band * 2);
  ctx.strokeStyle = warn ? 'rgba(255,228,230,0.95)' : 'rgba(251,113,133,0.65)';
  ctx.lineWidth = warn ? 3 : 2;
  ctx.setLineDash(warn ? [16, 10] : [6, 12]);
  ctx.lineDashOffset = -t * (warn ? 60 : 20);
  ctx.strokeRect(lo + band + 2, lo + band + 2, hi - lo - band * 2 - 4, hi - lo - band * 2 - 4);
  ctx.restore();
}

function drawHitVignette() {
  if (!(match.hitFlash > 0)) return;
  const a = Math.min(1, match.hitFlash / 0.45);
  const grad = ctx.createRadialGradient(viewW / 2, viewH / 2, Math.min(viewW, viewH) * 0.28, viewW / 2, viewH / 2, Math.max(viewW, viewH) * 0.72);
  grad.addColorStop(0, 'rgba(244,63,94,0)');
  grad.addColorStop(1, `rgba(225,29,72,${0.55 * a})`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, viewW, viewH);
}

function tileHash(c, r) {
  let h = (c * 374761393 + r * 668265263) ^ 0x5bf03635;
  h = (h ^ (h >> 13)) * 1274126177;
  return ((h ^ (h >> 16)) >>> 0) / 4294967295;
}

/* ---- Cenário por bioma: cada mapa tem piso, props, obstáculos, vegetação,
   borda e partículas próprios (não é só troca de cor). Tudo é decorativo e
   determinístico (hash por célula), então não interfere na colisão. ---- */

function drawGround(x, y, c, r, theme) {
  const h = tileHash(c, r);
  const ground = theme.ground || theme.deco || 'circuit';
  ctx.save();
  if (ground === 'sand') drawSandGround(x, y, h);
  else if (ground === 'ice') drawIceGround(x, y, h);
  else if (ground === 'lava') drawLavaGround(x, y, c, r, h);
  else if (ground === 'leaf') drawLeafGround(x, y, h);
  else if (ground === 'petal') drawPetalGround(x, y, c, r, h);
  else if (ground === 'asphalt') drawAsphaltGround(x, y, r, h);
  else if (ground === 'plank') drawPlankGround(x, y, c, r, h);
  else if (ground === 'panel') drawPanelGround(x, y, c, r, h, theme);
  else drawCircuitGround(x, y, c, h, theme);
  ctx.restore();
  if (h > 0.9) drawGroundProp(x, y, c, r, h, theme);
}

function drawCircuitGround(x, y, c, h, theme) {
  ctx.strokeStyle = theme.glow; ctx.lineWidth = 1.5;
  const ox = 8 + (h * 30), oy = 10 + ((h * 7919) % 28);
  ctx.beginPath();
  ctx.moveTo(x + ox, y + oy);
  ctx.lineTo(x + ox + 14, y + oy);
  ctx.lineTo(x + ox + 14, y + oy + 10);
  ctx.stroke();
  if (h > 0.72) {
    ctx.fillStyle = theme.accent; ctx.globalAlpha = 0.32;
    ctx.beginPath(); ctx.arc(x + ox + 14, y + oy + 10, 2, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
  }
  if (h > 0.86) {
    // pequena placa hexagonal de piso tecnológico
    ctx.strokeStyle = 'rgba(148,163,184,0.10)'; ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = Math.PI / 3 * i + Math.PI / 6;
      const px = x + 24 + Math.cos(a) * 9, py = y + 24 + Math.sin(a) * 9;
      i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
    }
    ctx.closePath(); ctx.stroke();
  }
}

function drawSandGround(x, y, h) {
  ctx.strokeStyle = 'rgba(251,191,36,0.10)'; ctx.lineWidth = 1.4;
  for (let i = 0; i < 2; i++) {
    const oy = 13 + i * 17 + h * 6;
    ctx.beginPath();
    ctx.moveTo(x + 3, y + oy);
    ctx.quadraticCurveTo(x + TILE_SIZE * 0.5, y + oy - 5 - h * 4, x + TILE_SIZE - 3, y + oy + 2);
    ctx.stroke();
  }
  ctx.fillStyle = 'rgba(251,191,36,0.18)';
  ctx.beginPath(); ctx.arc(x + 12 + h * 22, y + 32 - h * 16, 1.6, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(x + 34 - h * 12, y + 12 + h * 10, 1.2, 0, Math.PI * 2); ctx.fill();
  if (h > 0.74) {
    ctx.strokeStyle = 'rgba(148,163,184,0.14)'; ctx.lineWidth = 1;
    ctx.strokeRect(x + 6, y + 6, TILE_SIZE - 12, TILE_SIZE - 12);
  }
}

function drawIceGround(x, y, h) {
  const flip = h > 0.5;
  ctx.strokeStyle = 'rgba(224,242,254,0.09)'; ctx.lineWidth = 6;
  ctx.beginPath();
  if (flip) { ctx.moveTo(x + 6, y + TILE_SIZE - 8); ctx.lineTo(x + TILE_SIZE - 8, y + 8); }
  else { ctx.moveTo(x + 8, y + 8); ctx.lineTo(x + TILE_SIZE - 6, y + TILE_SIZE - 8); }
  ctx.stroke();
  ctx.strokeStyle = 'rgba(165,243,252,0.16)'; ctx.lineWidth = 1.2;
  const ox = 8 + h * 26;
  ctx.beginPath();
  ctx.moveTo(x + ox, y + 40);
  ctx.lineTo(x + ox + 5, y + 27);
  ctx.lineTo(x + ox - 2, y + 16);
  ctx.stroke();
  if (h > 0.68) {
    ctx.fillStyle = 'rgba(224,242,254,0.09)';
    ctx.beginPath(); ctx.ellipse(x + 24, y + 20, 13, 6, h * 3, 0, Math.PI * 2); ctx.fill();
  }
  ctx.fillStyle = 'rgba(255,255,255,0.22)';
  ctx.beginPath(); ctx.arc(x + 10 + h * 24, y + 12 + h * 20, 1, 0, Math.PI * 2); ctx.fill();
}

function drawLavaGround(x, y, c, r, h) {
  ctx.strokeStyle = 'rgba(0,0,0,0.34)'; ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y + (h > 0.5 ? 22 : 30));
  ctx.lineTo(x + TILE_SIZE, y + (h > 0.5 ? 28 : 19));
  ctx.stroke();
  if (h > 0.62) {
    const t = 0.16 + 0.05 * Math.sin(nowT * 2 + c * 0.8 + r * 1.3);
    ctx.strokeStyle = `rgba(251,113,133,${t})`; ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(x + 6 + h * 10, y + 4);
    ctx.lineTo(x + 14 + h * 8, y + 20);
    ctx.lineTo(x + 10 + h * 12, y + 32);
    ctx.lineTo(x + 20 + h * 6, y + 44);
    ctx.stroke();
    ctx.strokeStyle = `rgba(254,205,211,${t * 0.7})`; ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.fillStyle = 'rgba(120,113,108,0.16)';
  ctx.beginPath(); ctx.arc(x + 14 + h * 20, y + 10 + h * 24, 1.6, 0, Math.PI * 2); ctx.fill();
}

function drawLeafGround(x, y, h) {
  ctx.strokeStyle = 'rgba(74,222,128,0.15)'; ctx.lineWidth = 1.2;
  for (let i = 0; i < 3; i++) {
    const ox = 8 + ((h * 977 + i * 137) % (TILE_SIZE - 16));
    const oy = 30 + ((h * 613 + i * 191) % 14);
    ctx.beginPath(); ctx.moveTo(x + ox, y + oy); ctx.lineTo(x + ox - 2, y + oy - 7); ctx.stroke();
  }
  ctx.fillStyle = 'rgba(52,211,153,0.13)';
  const ox = 10 + h * 26, oy = 12 + ((h * 401) % 24);
  ctx.beginPath(); ctx.ellipse(x + ox, y + oy, 5.5, 2.6, h * 6, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(x + ox + 9, y + oy + 7, 4, 2, h * 6 + 1, 0, Math.PI * 2); ctx.fill();
  if (h > 0.82) {
    ctx.fillStyle = 'rgba(250,204,21,0.35)';
    ctx.beginPath(); ctx.arc(x + 24 + h * 8, y + 30 - h * 10, 1.6, 0, Math.PI * 2); ctx.fill();
  }
}

function drawPetalGround(x, y, c, r, h) {
  ctx.strokeStyle = 'rgba(148,163,184,0.07)'; ctx.lineWidth = 1;
  for (let i = 1; i < 3; i++) {
    const oy = y + i * 16;
    ctx.beginPath(); ctx.moveTo(x, oy); ctx.lineTo(x + TILE_SIZE, oy); ctx.stroke();
  }
  ctx.fillStyle = 'rgba(249,168,212,0.16)';
  const ox = 8 + h * 30, oy = 8 + ((h * 881) % 30);
  ctx.beginPath(); ctx.ellipse(x + ox, y + oy, 4.4, 2.2, h * 7, 0, Math.PI * 2); ctx.fill();
  ctx.globalAlpha = 0.7;
  ctx.beginPath(); ctx.ellipse(x + ox + 11, y + oy + 9, 3.2, 1.8, h * 5 + 2, 0, Math.PI * 2); ctx.fill();
  ctx.globalAlpha = 1;
}

function drawAsphaltGround(x, y, r, h) {
  ctx.strokeStyle = 'rgba(148,163,184,0.08)'; ctx.lineWidth = 1;
  ctx.strokeRect(x + 1.5, y + 1.5, TILE_SIZE - 3, TILE_SIZE - 3);
  ctx.fillStyle = 'rgba(148,163,184,0.12)';
  ctx.beginPath(); ctx.arc(x + 10 + h * 26, y + 10 + h * 24, 1, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(x + 32 - h * 14, y + 34 - h * 18, 0.9, 0, Math.PI * 2); ctx.fill();
  if (r % 6 === 2) {
    ctx.fillStyle = 'rgba(226,232,240,0.10)';
    ctx.fillRect(x + 8, y + TILE_SIZE / 2 - 1.5, 20, 3);
  }
  if (h > 0.8) {
    ctx.strokeStyle = 'rgba(0,0,0,0.35)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(x + 8, y + 38); ctx.lineTo(x + 18, y + 30); ctx.lineTo(x + 26, y + 40); ctx.stroke();
  }
}

function drawPlankGround(x, y, c, r, h) {
  ctx.strokeStyle = 'rgba(0,0,0,0.30)'; ctx.lineWidth = 1.5;
  for (let i = 1; i < 3; i++) {
    const oy = y + i * 16;
    ctx.beginPath(); ctx.moveTo(x, oy); ctx.lineTo(x + TILE_SIZE, oy); ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(94,234,212,0.05)'; ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x + 4, y + 9 + h * 4);
  ctx.lineTo(x + TILE_SIZE - 5, y + 10 + h * 3);
  ctx.stroke();
  ctx.fillStyle = 'rgba(15,23,42,0.5)';
  [[6, 8], [TILE_SIZE - 7, 8], [6, 40], [TILE_SIZE - 7, 40]].forEach(([ox, oy]) => {
    ctx.beginPath(); ctx.arc(x + ox, y + oy, 1.3, 0, Math.PI * 2); ctx.fill();
  });
  if (h > 0.78) {
    ctx.fillStyle = 'rgba(45,212,191,0.10)';
    ctx.beginPath(); ctx.ellipse(x + 24, y + 24, 12, 5, h * 2, 0, Math.PI * 2); ctx.fill();
  }
}

function drawPanelGround(x, y, c, r, h, theme) {
  ctx.strokeStyle = 'rgba(148,163,184,0.10)'; ctx.lineWidth = 1;
  ctx.strokeRect(x + 5, y + 5, TILE_SIZE - 10, TILE_SIZE - 10);
  ctx.fillStyle = 'rgba(148,163,184,0.16)';
  [[8, 8], [TILE_SIZE - 8, 8], [8, TILE_SIZE - 8], [TILE_SIZE - 8, TILE_SIZE - 8]].forEach(([ox, oy]) => {
    ctx.beginPath(); ctx.arc(x + ox, y + oy, 1.2, 0, Math.PI * 2); ctx.fill();
  });
  if (h > 0.72) {
    ctx.fillStyle = theme.accent; ctx.globalAlpha = 0.10;
    ctx.fillRect(x + 12, y + 22, TILE_SIZE - 24, 4);
    ctx.globalAlpha = 1;
  }
  if (h > 0.88) {
    ctx.strokeStyle = 'rgba(192,132,252,0.16)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(x + 8, y + TILE_SIZE - 12); ctx.lineTo(x + TILE_SIZE - 8, y + TILE_SIZE - 12); ctx.stroke();
  }
}

function drawGroundProp(x, y, c, r, h, theme) {
  const kind = theme.props || 'conduit';
  const ox = 6 + h * (TILE_SIZE - 24);
  const oy = 5 + ((h * 7919) % (TILE_SIZE - 22));
  ctx.save();
  if (kind === 'desert') {
    ctx.fillStyle = 'rgba(120,113,108,0.30)';
    ctx.beginPath(); ctx.moveTo(x + ox, y + oy + 14); ctx.lineTo(x + ox + 6, y + oy + 4); ctx.lineTo(x + ox + 13, y + oy + 14); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(168,162,158,0.22)';
    ctx.beginPath(); ctx.arc(x + ox + 18, y + oy + 15, 2.2, 0, Math.PI * 2); ctx.fill();
    if (h > 0.965) {
      ctx.fillStyle = 'rgba(226,232,240,0.22)';
      ctx.beginPath(); ctx.arc(x + ox + 4, y + oy + 4, 4.2, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(15,23,42,0.5)';
      ctx.beginPath(); ctx.arc(x + ox + 2.4, y + oy + 3, 0.9, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x + ox + 5.8, y + oy + 3, 0.9, 0, Math.PI * 2); ctx.fill();
    }
  } else if (kind === 'forest') {
    ctx.fillStyle = 'rgba(52,211,153,0.22)';
    ctx.beginPath(); ctx.ellipse(x + ox + 4, y + oy + 4, 5, 2.4, -0.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(163,230,53,0.20)';
    ctx.beginPath(); ctx.ellipse(x + ox + 11, y + oy + 8, 4.2, 2, 0.6, 0, Math.PI * 2); ctx.fill();
    if (h > 0.95) {
      ctx.fillStyle = 'rgba(244,114,182,0.26)';
      ctx.beginPath(); ctx.arc(x + ox + 7, y + oy + 12, 2.2, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(148,163,184,0.28)'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(x + ox + 7, y + oy + 14); ctx.lineTo(x + ox + 7, y + oy + 19); ctx.stroke();
    }
  } else if (kind === 'ice') {
    ctx.fillStyle = 'rgba(165,243,252,0.28)';
    ctx.beginPath(); ctx.moveTo(x + ox + 6, y + oy + 16); ctx.lineTo(x + ox + 9, y + oy + 2); ctx.lineTo(x + ox + 13, y + oy + 16); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x + ox + 1, y + oy + 16); ctx.lineTo(x + ox + 4, y + oy + 7); ctx.lineTo(x + ox + 7, y + oy + 16); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(224,242,254,0.35)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x + ox + 9, y + oy + 3); ctx.lineTo(x + ox + 10, y + oy + 14); ctx.stroke();
  } else if (kind === 'volcano') {
    ctx.fillStyle = 'rgba(24,12,16,0.55)';
    ctx.beginPath(); ctx.moveTo(x + ox, y + oy + 16); ctx.lineTo(x + ox + 7, y + oy + 1); ctx.lineTo(x + ox + 15, y + oy + 16); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = `rgba(251,113,133,${0.22 + 0.08 * Math.sin(nowT * 2.4 + c)})`; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(x + ox + 8, y + oy + 5); ctx.lineTo(x + ox + 5, y + oy + 12); ctx.lineTo(x + ox + 9, y + oy + 15); ctx.stroke();
  } else if (kind === 'shrine') {
    ctx.fillStyle = 'rgba(148,163,184,0.22)';
    ctx.fillRect(x + ox + 4, y + oy + 8, 10, 8);
    ctx.fillStyle = 'rgba(251,191,36,0.35)';
    ctx.fillRect(x + ox + 6, y + oy + 10, 6, 4);
    ctx.fillStyle = 'rgba(148,163,184,0.30)';
    ctx.beginPath(); ctx.moveTo(x + ox + 2, y + oy + 8); ctx.lineTo(x + ox + 16, y + oy + 8); ctx.lineTo(x + ox + 13, y + oy + 5); ctx.lineTo(x + ox + 5, y + oy + 5); ctx.closePath(); ctx.fill();
  } else if (kind === 'city') {
    ctx.strokeStyle = 'rgba(148,163,184,0.26)'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.arc(x + ox + 8, y + oy + 8, 6, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + ox + 3, y + oy + 8); ctx.lineTo(x + ox + 13, y + oy + 8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + ox + 8, y + oy + 3); ctx.lineTo(x + ox + 8, y + oy + 13); ctx.stroke();
  } else if (kind === 'harbor') {
    ctx.strokeStyle = 'rgba(45,212,191,0.22)'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.ellipse(x + ox + 8, y + oy + 8, 7, 4.5, h * 2, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(x + ox + 8, y + oy + 8, 4, 2.4, h * 2, 0, Math.PI * 2); ctx.stroke();
    if (h > 0.96) {
      ctx.fillStyle = 'rgba(45,212,191,0.12)';
      ctx.beginPath(); ctx.ellipse(x + ox + 2, y + oy + 2, 9, 3.4, 0.3, 0, Math.PI * 2); ctx.fill();
    }
  } else if (kind === 'orbit') {
    ctx.strokeStyle = 'rgba(192,132,252,0.18)'; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(x + ox, y + oy + 6); ctx.lineTo(x + ox + 13, y + oy + 6); ctx.stroke();
    ctx.fillStyle = 'rgba(192,132,252,0.22)';
    ctx.beginPath(); ctx.arc(x + ox + 13, y + oy + 6, 2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + ox, y + oy + 6, 1.6, 0, Math.PI * 2); ctx.fill();
  } else {
    ctx.strokeStyle = 'rgba(56,189,248,0.16)'; ctx.lineWidth = 1.2;
    ctx.strokeRect(x + ox, y + oy + 4, 12, 8);
    ctx.beginPath(); ctx.moveTo(x + ox + 3, y + oy + 7); ctx.lineTo(x + ox + 9, y + oy + 7); ctx.stroke();
    ctx.fillStyle = 'rgba(56,189,248,0.30)';
    ctx.beginPath(); ctx.arc(x + ox + 10, y + oy + 10, 1.2, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}

function drawTiles(minC, maxC, minR, maxR) {
  const theme = match.theme || MAPS[0];
  const x0 = minC * TILE_SIZE, y0 = minR * TILE_SIZE;
  const w = (maxC - minC + 1) * TILE_SIZE, h = (maxR - minR + 1) * TILE_SIZE;
  ctx.drawImage(ensureGroundLayer(), x0, y0, w, h, x0, y0, w, h);
  for (let r = minR; r <= maxR; r++) {
    for (let c = minC; c <= maxC; c++) {
      const x = c * TILE_SIZE, y = r * TILE_SIZE;
      const t = grid[r][c];
      const borderCell = c === 0 || r === 0 || c === GRID_SIZE - 1 || r === GRID_SIZE - 1;
      if (!borderCell && (t === CELL.FLOOR || t === CELL.BUSH)) drawHazardFloor(x, y, c, r);
      if (t === CELL.PILLAR) drawPillar(x, y, c, r, theme);
      else if (t === CELL.CRATE) drawCrate(x, y, c, r, theme);
      else if (t === CELL.BUSH) drawBush(x, y, c, r, theme);
      else if (t === CELL.CRUSHED) {
        if (borderCell) drawBorderTile(x, y, c, r, theme);
        else drawCrushed(x, y);
      }
      else if (t === CELL.AIRDROP_CRATE) drawAirdropCrate(x, y);
      if (cryoTiles.has(`${c},${r}`)) drawCryoTile(x, y);
    }
  }
}

/* Piso, textura e grade são estáticos: desenhar tudo de novo a cada frame
   custava ~14 ms no celular. Ficam num canvas offscreen e são reutilizados
   até a grade/mapa mudar; só o que anima (props, lava, água, cryo) fica
   no desenho ao vivo. */
let groundLayer = null;
let groundLayerKey = '';
function ensureGroundLayer() {
  const theme = match.theme || MAPS[0];
  const tex = biomeImageFor(theme.id);
  const key = `${theme.id}|${GRID_SIZE}|${gridRev}|${tex ? 1 : 0}`;
  if (groundLayer && groundLayerKey === key) return groundLayer;
  if (!groundLayer) groundLayer = document.createElement('canvas');
  if (groundLayer.width !== WORLD_PX) { groundLayer.width = WORLD_PX; groundLayer.height = WORLD_PX; }
  const layerCtx = groundLayer.getContext('2d');
  const prevCtx = ctx;
  ctx = layerCtx;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, WORLD_PX, WORLD_PX);
  const floorA = theme.floor[0], floorB = theme.floor[1];
  const srcW = tex ? tex.width / GRID_SIZE : 0;
  const srcH = tex ? tex.height / GRID_SIZE : 0;
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const x = c * TILE_SIZE, y = r * TILE_SIZE;
      const t = grid[r][c];
      const borderCell = c === 0 || r === 0 || c === GRID_SIZE - 1 || r === GRID_SIZE - 1;
      ctx.fillStyle = (c + r) % 2 === 0 ? floorA : floorB;
      ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
      if (!borderCell && (t === CELL.FLOOR || t === CELL.BUSH)) {
        if (tex) {
          ctx.save();
          ctx.globalAlpha = 0.62;
          ctx.drawImage(tex, c * srcW, r * srcH, srcW, srcH, x, y, TILE_SIZE, TILE_SIZE);
          ctx.globalAlpha = 1;
          ctx.fillStyle = 'rgba(2,6,23,0.28)';
          ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
          ctx.restore();
        } else {
          drawGround(x, y, c, r, theme);
        }
      }
      ctx.strokeStyle = theme.glow;
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 0.5, y + 0.5, TILE_SIZE - 1, TILE_SIZE - 1);
    }
  }
  ctx = prevCtx;
  groundLayerKey = key;
  return groundLayer;
}

function drawHazardFloor(x, y, c, r) {
  const hz = hazardCellType(c, r);
  if (!hz) return;
  const h = tileHash(c + 5, r + 11);
  if (hz === 'lava') {
    const pulse = 0.55 + 0.18 * Math.sin(nowT * 2.2 + h * 9);
    ctx.save();
    const g = ctx.createRadialGradient(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 3, x + TILE_SIZE / 2, y + TILE_SIZE / 2, TILE_SIZE * 0.55);
    g.addColorStop(0, `rgba(254,240,138,${0.55 + pulse * 0.3})`);
    g.addColorStop(0.45, `rgba(251,146,60,${0.5 + pulse * 0.2})`);
    g.addColorStop(1, 'rgba(225,29,72,0.08)');
    ctx.fillStyle = g;
    rr(x + 3, y + 3, TILE_SIZE - 6, TILE_SIZE - 6, 11); ctx.fill();
    ctx.strokeStyle = 'rgba(251,113,133,0.8)'; ctx.lineWidth = 1.4;
    rr(x + 3, y + 3, TILE_SIZE - 6, TILE_SIZE - 6, 11); ctx.stroke();
    ctx.fillStyle = `rgba(254,249,195,${0.45 + 0.3 * Math.sin(nowT * 3 + h * 12)})`;
    [[16, 30, 3], [32, 18, 2.2], [26, 36, 1.8]].forEach(([ox, oy, rad], i) => {
      const bob = Math.sin(nowT * 2.4 + h * 7 + i) * 1.5;
      ctx.beginPath(); ctx.arc(x + ox, y + oy + bob, rad, 0, Math.PI * 2); ctx.fill();
    });
    ctx.restore();
  } else if (hz === 'water') {
    const ph = nowT * 1.6 + h * 8;
    ctx.save();
    ctx.fillStyle = 'rgba(3,32,44,0.78)';
    rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 12); ctx.fill();
    ctx.fillStyle = 'rgba(13,148,136,0.35)';
    rr(x + 5, y + 5, TILE_SIZE - 10, TILE_SIZE - 10, 10); ctx.fill();
    ctx.strokeStyle = 'rgba(94,234,212,0.85)'; ctx.lineWidth = 1.8;
    rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 12); ctx.stroke();
    ctx.strokeStyle = 'rgba(165,243,252,0.7)'; ctx.lineWidth = 1.4;
    for (let i = 0; i < 3; i++) {
      const oy = y + 15 + i * 11 + Math.sin(ph + i * 1.6) * 2;
      ctx.beginPath();
      ctx.moveTo(x + 8, oy);
      ctx.quadraticCurveTo(x + 24, oy - 4, x + TILE_SIZE - 8, oy);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.beginPath(); ctx.arc(x + 18 + Math.sin(ph) * 8, y + 21, 1.8, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }
}

function drawPillar(x, y, c, r, theme = MAPS[0]) {
  const pal = theme.pillar || ['#1e293b', '#334155', '#475569'];
  const style = theme.pillarStyle || 'tech';
  const h = tileHash(c, r);
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.35)'; rr(x + 4, y + 6, TILE_SIZE - 6, TILE_SIZE - 6, 9); ctx.fill();
  if (style === 'tech') {
    ctx.fillStyle = pal[0]; rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 9); ctx.fill();
    ctx.strokeStyle = pal[1]; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = pal[2]; rr(x + 8, y + 8, TILE_SIZE - 16, 10, 4); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.22)';
    [[12, 34], [TILE_SIZE - 12, 34], [12, TILE_SIZE - 12], [TILE_SIZE - 12, TILE_SIZE - 12]].forEach(([ox, oy]) => {
      ctx.beginPath(); ctx.arc(x + ox, y + oy, 2, 0, Math.PI * 2); ctx.fill();
    });
    ctx.fillStyle = theme.accent; ctx.globalAlpha = 0.55 + 0.15 * Math.sin(nowT * 2.2 + c);
    ctx.fillRect(x + 6, y + 6, 4, 4); ctx.fillRect(x + TILE_SIZE - 10, y + 6, 4, 4);
    ctx.globalAlpha = 1;
  } else if (style === 'sandstone') {
    ctx.fillStyle = pal[0]; rr(x + 3, y + 4, TILE_SIZE - 6, TILE_SIZE - 8, 12); ctx.fill();
    ctx.fillStyle = pal[1]; rr(x + 8, y + 9, TILE_SIZE - 18, TILE_SIZE - 20, 10); ctx.fill();
    ctx.fillStyle = pal[2]; ctx.globalAlpha = 0.45;
    rr(x + 10, y + 8, TILE_SIZE - 26, 6, 3); ctx.fill(); ctx.globalAlpha = 1;
    ctx.strokeStyle = 'rgba(0,0,0,0.28)'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(x + 14, y + 16); ctx.lineTo(x + 20, y + 24); ctx.lineTo(x + 16, y + 33); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + 31, y + 13); ctx.lineTo(x + 35, y + 21); ctx.stroke();
    if (h > 0.6) {
      ctx.fillStyle = 'rgba(120,113,108,0.35)';
      ctx.beginPath(); ctx.arc(x + 12, y + 38, 2.4, 0, Math.PI * 2); ctx.fill();
    }
  } else if (style === 'ice') {
    const cx = x + TILE_SIZE / 2, cy = y + TILE_SIZE / 2;
    ctx.fillStyle = pal[0];
    ctx.beginPath();
    ctx.moveTo(cx - 16, cy + 16); ctx.lineTo(cx - 17, cy - 4); ctx.lineTo(cx - 5, cy - 18);
    ctx.lineTo(cx + 12, cy - 15); ctx.lineTo(cx + 17, cy + 6); ctx.lineTo(cx + 4, cy + 18);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = pal[1];
    ctx.beginPath();
    ctx.moveTo(cx - 10, cy + 12); ctx.lineTo(cx - 11, cy - 2); ctx.lineTo(cx - 2, cy - 12);
    ctx.lineTo(cx + 7, cy - 10); ctx.lineTo(cx + 10, cy + 4); ctx.lineTo(cx + 1, cy + 13);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(224,242,254,0.45)'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(cx - 5, cy - 17); ctx.lineTo(cx - 3, cy - 4); ctx.lineTo(cx + 6, cy + 10); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.beginPath(); ctx.arc(cx + 7, cy - 8, 1.6, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'obsidian') {
    ctx.fillStyle = pal[0];
    ctx.beginPath();
    ctx.moveTo(x + 8, y + 40); ctx.lineTo(x + 5, y + 20); ctx.lineTo(x + 14, y + 5);
    ctx.lineTo(x + 28, y + 3); ctx.lineTo(x + 42, y + 16); ctx.lineTo(x + 40, y + 38);
    ctx.lineTo(x + 28, y + 44); ctx.lineTo(x + 14, y + 44); ctx.closePath(); ctx.fill();
    ctx.fillStyle = pal[1];
    ctx.beginPath();
    ctx.moveTo(x + 12, y + 36); ctx.lineTo(x + 11, y + 21); ctx.lineTo(x + 19, y + 9);
    ctx.lineTo(x + 30, y + 8); ctx.lineTo(x + 38, y + 18); ctx.lineTo(x + 36, y + 34);
    ctx.lineTo(x + 26, y + 40); ctx.lineTo(x + 16, y + 39); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = `rgba(251,113,133,${0.35 + 0.1 * Math.sin(nowT * 2 + c)})`; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(x + 18, y + 10); ctx.lineTo(x + 24, y + 22); ctx.lineTo(x + 20, y + 36); ctx.stroke();
    ctx.strokeStyle = 'rgba(0,0,0,0.4)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(x + 30, y + 9); ctx.lineTo(x + 34, y + 20); ctx.stroke();
  } else if (style === 'tree') {
    const sway = Math.sin(nowT * 1.1 + c * 0.8 + r * 1.4) * 2.2;
    ctx.fillStyle = '#31241a'; rr(x + 18, y + 18, 12, 26, 4); ctx.fill();
    ctx.fillStyle = '#241a12'; rr(x + 14, y + 40, 20, 5, 3); ctx.fill();
    ctx.fillStyle = pal[0];
    ctx.beginPath(); ctx.arc(x + 15 + sway, y + 22, 12, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = pal[1];
    ctx.beginPath(); ctx.arc(x + 33 + sway, y + 20, 11, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + 24 + sway * 1.2, y + 10, 13, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = pal[2]; ctx.globalAlpha = 0.22;
    ctx.beginPath(); ctx.arc(x + 24 + sway * 1.2, y + 6, 7, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
  } else if (style === 'lantern') {
    ctx.fillStyle = pal[0]; rr(x + 10, y + 32, 28, 12, 4); ctx.fill();
    ctx.fillStyle = pal[1]; rr(x + 20, y + 20, 8, 14, 3); ctx.fill();
    const glow = 0.16 + 0.05 * Math.sin(nowT * 2.4 + c);
    ctx.fillStyle = `rgba(251,191,36,${glow})`;
    ctx.beginPath(); ctx.arc(x + 24, y + 16, 15, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fde68a'; ctx.globalAlpha = 0.85;
    rr(x + 15, y + 9, 18, 12, 3); ctx.fill(); ctx.globalAlpha = 1;
    ctx.fillStyle = pal[2]; rr(x + 12, y + 5, 24, 6, 3); ctx.fill();
  } else if (style === 'building') {
    ctx.fillStyle = pal[0]; rr(x + 3, y + 2, TILE_SIZE - 6, TILE_SIZE - 5, 5); ctx.fill();
    ctx.fillStyle = pal[1]; rr(x + 6, y + 5, TILE_SIZE - 20, TILE_SIZE - 11, 3); ctx.fill();
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 3; j++) {
        const lit = tileHash(c + j * 7, r + i * 5) > 0.55;
        ctx.fillStyle = lit ? 'rgba(251,191,36,0.55)' : 'rgba(15,23,42,0.65)';
        ctx.fillRect(x + 9 + j * 8, y + 9 + i * 14, 5, 7);
      }
    }
    ctx.fillStyle = theme.accent; ctx.globalAlpha = 0.7;
    ctx.fillRect(x + TILE_SIZE - 12, y + 8, 3, 3); ctx.globalAlpha = 1;
    ctx.strokeStyle = 'rgba(0,0,0,0.4)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x + TILE_SIZE - 11, y + 6); ctx.lineTo(x + TILE_SIZE - 11, y + 2); ctx.stroke();
  } else if (style === 'container') {
    ctx.fillStyle = pal[0]; rr(x + 2, y + 9, TILE_SIZE - 4, TILE_SIZE - 17, 4); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.28)'; ctx.lineWidth = 1;
    for (let i = 1; i < 6; i++) {
      const px = x + 6 + i * 6;
      ctx.beginPath(); ctx.moveTo(px, y + 11); ctx.lineTo(px, y + TILE_SIZE - 10); ctx.stroke();
    }
    ctx.fillStyle = pal[1]; ctx.globalAlpha = 0.55;
    ctx.fillRect(x + 3, y + 10, TILE_SIZE - 6, 4); ctx.globalAlpha = 1;
    ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(x + 24, y + 11); ctx.lineTo(x + 24, y + TILE_SIZE - 10); ctx.stroke();
    ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(x + 4, y + 14, 2, 14);
    ctx.fillStyle = theme.accent; ctx.globalAlpha = 0.5;
    ctx.fillRect(x + 10, y + 24, 12, 3); ctx.globalAlpha = 1;
  } else {
    ctx.fillStyle = pal[0]; rr(x + 3, y + 3, TILE_SIZE - 6, TILE_SIZE - 6, 6); ctx.fill();
    ctx.fillStyle = pal[1]; rr(x + 8, y + 8, TILE_SIZE - 16, TILE_SIZE - 16, 4); ctx.fill();
    ctx.fillStyle = 'rgba(226,232,240,0.35)';
    [[10, 10], [TILE_SIZE - 10, 10], [10, TILE_SIZE - 10], [TILE_SIZE - 10, TILE_SIZE - 10]].forEach(([ox, oy]) => {
      ctx.beginPath(); ctx.arc(x + ox, y + oy, 1.7, 0, Math.PI * 2); ctx.fill();
    });
    ctx.save();
    ctx.beginPath(); ctx.rect(x + 11, y + TILE_SIZE - 17, TILE_SIZE - 22, 6); ctx.clip();
    for (let i = -1; i < 6; i++) {
      ctx.fillStyle = i % 2 ? 'rgba(251,191,36,0.55)' : 'rgba(15,23,42,0.55)';
      ctx.beginPath();
      ctx.moveTo(x + 11 + i * 8, y + TILE_SIZE - 17);
      ctx.lineTo(x + 15 + i * 8, y + TILE_SIZE - 17);
      ctx.lineTo(x + 11 + i * 8, y + TILE_SIZE - 11);
      ctx.lineTo(x + 7 + i * 8, y + TILE_SIZE - 11);
      ctx.closePath(); ctx.fill();
    }
    ctx.restore();
    ctx.fillStyle = theme.accent; ctx.globalAlpha = 0.6;
    ctx.fillRect(x + 16, y + 12, TILE_SIZE - 32, 2); ctx.globalAlpha = 1;
  }
  ctx.restore();
}

function drawCrate(x, y, c, r, theme = MAPS[0]) {
  const accent = theme.accent;
  const style = theme.crateStyle || 'wood';
  const h = tileHash(c, r);
  const body = (fill, inset, rad) => {
    ctx.fillStyle = fill;
    rr(x + inset, y + inset, TILE_SIZE - inset * 2, TILE_SIZE - inset * 2, rad);
    ctx.fill();
  };
  const drawX = (color, w) => {
    ctx.strokeStyle = color; ctx.lineWidth = w;
    ctx.beginPath();
    ctx.moveTo(x + 10, y + 10); ctx.lineTo(x + TILE_SIZE - 10, y + TILE_SIZE - 10);
    ctx.moveTo(x + TILE_SIZE - 10, y + 10); ctx.lineTo(x + 10, y + TILE_SIZE - 10);
    ctx.stroke();
  };
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.35)'; rr(x + 4, y + 5, TILE_SIZE - 6, TILE_SIZE - 6, 8); ctx.fill();
  if (style === 'wood') {
    body('#5b2c10', 3, 8);
    body('#8a4a16', 7, 5);
    drawX('#d97706', 2);
    ctx.globalAlpha = 0.8; ctx.fillStyle = accent;
    ctx.fillRect(x + TILE_SIZE / 2 - 2, y + 4, 4, TILE_SIZE - 8);
    ctx.globalAlpha = 1;
  } else if (style === 'neon') {
    body('#141d2e', 3, 8);
    body('#1e2b42', 7, 5);
    ctx.strokeStyle = 'rgba(56,189,248,0.35)'; ctx.lineWidth = 1;
    rr(x + 3, y + 3, TILE_SIZE - 6, TILE_SIZE - 6, 8); ctx.stroke();
    drawX(accent, 2.2);
    ctx.fillStyle = 'rgba(255,255,255,0.28)';
    [[8, 8], [TILE_SIZE - 8, 8], [8, TILE_SIZE - 8], [TILE_SIZE - 8, TILE_SIZE - 8]].forEach(([ox, oy]) => {
      ctx.beginPath(); ctx.arc(x + ox, y + oy, 1.5, 0, Math.PI * 2); ctx.fill();
    });
  } else if (style === 'metal') {
    body('#3f4652', 3, 7);
    body('#59616f', 7, 4);
    drawX('#fbbf24', 2.2);
    ctx.fillStyle = 'rgba(15,23,42,0.55)';
    ctx.fillRect(x + 4, y + 8, TILE_SIZE - 8, 3);
    ctx.fillStyle = 'rgba(251,191,36,0.5)';
    for (let i = 0; i < 4; i++) ctx.fillRect(x + 8 + i * 9, y + 9, 4, 2);
    ctx.fillStyle = 'rgba(255,255,255,0.22)';
    [[7, 20], [TILE_SIZE - 7, 20], [7, TILE_SIZE - 7], [TILE_SIZE - 7, TILE_SIZE - 7]].forEach(([ox, oy]) => {
      ctx.beginPath(); ctx.arc(x + ox, y + oy, 1.3, 0, Math.PI * 2); ctx.fill();
    });
  } else if (style === 'ice') {
    body('rgba(125,211,252,0.32)', 3, 8);
    body('rgba(224,242,254,0.22)', 7, 5);
    ctx.strokeStyle = 'rgba(224,242,254,0.55)'; ctx.lineWidth = 1.4;
    rr(x + 3, y + 3, TILE_SIZE - 6, TILE_SIZE - 6, 8); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 1.1;
    ctx.beginPath(); ctx.moveTo(x + 12, y + 30 + h * 4); ctx.lineTo(x + 20, y + 20); ctx.lineTo(x + 33, y + 25); ctx.stroke();
    drawX('rgba(240,249,255,0.85)', 2);
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.beginPath(); ctx.arc(x + 14, y + 12, 1.4, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'obsidian') {
    body('#1a1014', 3, 8);
    body('#2a161d', 7, 5);
    drawX(`rgba(251,113,133,${0.7 + 0.15 * Math.sin(nowT * 2 + c)})`, 2.4);
    ctx.strokeStyle = 'rgba(251,113,133,0.35)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x + 8, y + 34); ctx.lineTo(x + 18, y + 40); ctx.stroke();
    ctx.fillStyle = 'rgba(254,205,211,0.35)';
    ctx.beginPath(); ctx.arc(x + TILE_SIZE / 2 - 2, y + 4, 2.4, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'bamboo') {
    body('#4d5f2a', 3, 7);
    body('#6b7f3d', 7, 4);
    ctx.strokeStyle = 'rgba(34,48,14,0.65)'; ctx.lineWidth = 1.4;
    for (let i = 0; i < 3; i++) {
      const oy = y + 14 + i * 9;
      ctx.beginPath(); ctx.moveTo(x + 8, oy); ctx.lineTo(x + TILE_SIZE - 8, oy); ctx.stroke();
    }
    drawX('#22300f', 2);
    ctx.fillStyle = 'rgba(22,101,52,0.55)';
    ctx.fillRect(x + 4, y + 18, 3, TILE_SIZE - 36);
    ctx.fillRect(x + TILE_SIZE - 7, y + 18, 3, TILE_SIZE - 36);
  } else if (style === 'dock') {
    body('#5b3a1c', 3, 7);
    body('#7a5227', 7, 4);
    ctx.strokeStyle = 'rgba(45,212,191,0.35)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(x + 8, y + 12); ctx.lineTo(x + TILE_SIZE - 8, y + 12); ctx.stroke();
    drawX('#3b2512', 2);
    ctx.strokeStyle = 'rgba(214,177,106,0.5)'; ctx.lineWidth = 2.4;
    ctx.beginPath(); ctx.moveTo(x + 9, y + TILE_SIZE - 9); ctx.lineTo(x + TILE_SIZE - 9, y + 20); ctx.stroke();
  } else {
    body('#b6c2d1', 3, 7);
    body('#e2e8f0', 7, 4);
    ctx.fillStyle = 'rgba(249,115,22,0.75)';
    ctx.fillRect(x + 4, y + 8, TILE_SIZE - 8, 3);
    ctx.fillRect(x + 4, y + TILE_SIZE - 11, TILE_SIZE - 8, 3);
    for (let i = 0; i < 4; i++) ctx.fillRect(x + 7 + i * 9, y + 9, 4, 2);
    drawX('#ea580c', 2.2);
    ctx.fillStyle = 'rgba(15,23,42,0.35)';
    ctx.beginPath(); ctx.arc(x + TILE_SIZE - 12, y + TILE_SIZE - 12, 2.2, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}

function drawBush(x, y, c, r, theme = MAPS[0]) {
  const style = theme.bushStyle || 'leaf';
  const sway = Math.sin(nowT * 1.6 + c * 0.7 + r * 1.1) * 3;
  ctx.save();
  if (style === 'leaf' || style === 'jungle') {
    ctx.fillStyle = '#0d3d24'; rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 12); ctx.fill();
    ctx.fillStyle = style === 'jungle' ? 'rgba(34,197,94,0.62)' : 'rgba(34,197,94,0.55)';
    [[14, 30], [26, 20], [34, 32], [22, 38]].forEach(([ox, oy], i) => {
      ctx.beginPath(); ctx.arc(x + ox + sway * (i % 2 ? 1 : -1), y + oy, 9 - i, 0, Math.PI * 2); ctx.fill();
    });
    ctx.fillStyle = theme.glow;
    ctx.beginPath(); ctx.arc(x + 20 + sway, y + 18, 5, 0, Math.PI * 2); ctx.fill();
    if (style === 'jungle') {
      ctx.fillStyle = 'rgba(250,204,21,0.55)';
      ctx.beginPath(); ctx.arc(x + 30 + sway * 0.4, y + 14, 1.8, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(244,114,182,0.5)';
      ctx.beginPath(); ctx.arc(x + 12 + sway * 0.6, y + 24, 1.6, 0, Math.PI * 2); ctx.fill();
    }
    ctx.strokeStyle = 'rgba(134,239,172,0.35)'; ctx.lineWidth = 1.5;
    rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 12); ctx.stroke();
  } else if (style === 'dry') {
    ctx.fillStyle = '#3a3020'; rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 10); ctx.fill();
    ctx.strokeStyle = 'rgba(212,168,106,0.6)'; ctx.lineWidth = 1.6;
    for (let i = 0; i < 7; i++) {
      const ox = 8 + i * 5.2;
      const oy = 38 - ((c * 13 + r * 7 + i * 11) % 10);
      ctx.beginPath();
      ctx.moveTo(x + ox, y + oy);
      ctx.quadraticCurveTo(x + ox + sway * 0.5, y + oy - 8, x + ox + 2 + sway * 0.7, y + oy - 14);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(251,191,36,0.22)';
    ctx.beginPath(); ctx.arc(x + 12, y + 12, 2.6, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'snow') {
    ctx.fillStyle = '#1a3a3e'; rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 12); ctx.fill();
    ctx.fillStyle = 'rgba(56,118,108,0.9)';
    [[14, 30], [26, 20], [34, 32], [22, 38]].forEach(([ox, oy], i) => {
      ctx.beginPath(); ctx.arc(x + ox + sway * (i % 2 ? 1 : -1), y + oy, 9 - i, 0, Math.PI * 2); ctx.fill();
    });
    ctx.fillStyle = 'rgba(240,249,255,0.82)';
    [[14, 26], [27, 16], [34, 28]].forEach(([ox, oy], i) => {
      ctx.beginPath(); ctx.arc(x + ox + sway * (i % 2 ? 1 : -1), y + oy, 6 - i, 0, Math.PI * 2); ctx.fill();
    });
    ctx.fillStyle = 'rgba(224,242,254,0.5)';
    ctx.beginPath(); ctx.arc(x + 38, y + 36, 1.4, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'charred') {
    ctx.fillStyle = '#1a1014'; rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 10); ctx.fill();
    ctx.strokeStyle = 'rgba(87,45,54,0.8)'; ctx.lineWidth = 1.6;
    [[14, 36, 12, 18], [24, 38, 27, 14], [34, 36, 31, 20]].forEach(([x1, y1, x2, y2]) => {
      ctx.beginPath(); ctx.moveTo(x + x1, y + y1); ctx.lineTo(x + x2 + sway * 0.3, y + y2); ctx.stroke();
    });
    ctx.fillStyle = `rgba(251,146,60,${0.4 + 0.2 * Math.sin(nowT * 3 + c)})`;
    ctx.beginPath(); ctx.arc(x + 20 + sway, y + 24, 1.7, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + 33, y + 30, 1.3, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'blossom') {
    ctx.fillStyle = '#123321'; rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 12); ctx.fill();
    ctx.fillStyle = 'rgba(34,197,94,0.45)';
    [[14, 30], [26, 20], [34, 32], [22, 38]].forEach(([ox, oy], i) => {
      ctx.beginPath(); ctx.arc(x + ox + sway * (i % 2 ? 1 : -1), y + oy, 9 - i, 0, Math.PI * 2); ctx.fill();
    });
    ctx.fillStyle = 'rgba(249,168,212,0.75)';
    [[14, 22], [28, 16], [35, 26], [20, 34]].forEach(([ox, oy], i) => {
      ctx.beginPath(); ctx.arc(x + ox + sway * (i % 2 ? 1 : -1), y + oy, 4 - (i % 2), 0, Math.PI * 2); ctx.fill();
    });
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.beginPath(); ctx.arc(x + 14 + sway, y + 22, 1.2, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'citybush') {
    ctx.fillStyle = '#16351f'; rr(x + 3, y + 3, TILE_SIZE - 6, TILE_SIZE - 6, 7); ctx.fill();
    ctx.fillStyle = 'rgba(34,197,94,0.5)';
    rr(x + 6, y + 6, TILE_SIZE - 12, TILE_SIZE - 12, 5); ctx.fill();
    ctx.fillStyle = 'rgba(20,83,45,0.55)';
    for (let i = 0; i < 3; i++) ctx.fillRect(x + 7 + i * 11, y + 10, 2, TILE_SIZE - 20);
    ctx.fillStyle = theme.accent; ctx.globalAlpha = 0.35;
    ctx.fillRect(x + 6, y + TILE_SIZE - 10, TILE_SIZE - 12, 2); ctx.globalAlpha = 1;
  } else if (style === 'reed') {
    ctx.fillStyle = '#123a35'; rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 10); ctx.fill();
    ctx.strokeStyle = 'rgba(163,196,102,0.55)'; ctx.lineWidth = 1.4;
    for (let i = 0; i < 6; i++) {
      const ox = 8 + i * 6;
      const tip = y + 10 + ((c * 7 + r * 11 + i * 5) % 8);
      ctx.beginPath();
      ctx.moveTo(x + ox, y + TILE_SIZE - 6);
      ctx.quadraticCurveTo(x + ox + sway * 0.6, y + 28, x + ox + 2 + sway, tip);
      ctx.stroke();
      ctx.fillStyle = 'rgba(132,204,22,0.35)';
      ctx.beginPath(); ctx.ellipse(x + ox + 2 + sway, tip + 2, 1.8, 4, 0, 0, Math.PI * 2); ctx.fill();
    }
  } else {
    ctx.fillStyle = '#1c2430'; rr(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4, 10); ctx.fill();
    ctx.strokeStyle = 'rgba(148,163,184,0.35)'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.arc(x + 24, y + 26, 12, 0, Math.PI * 2); ctx.stroke();
    for (let i = 0; i < 4; i++) {
      ctx.beginPath(); ctx.moveTo(x + 14, y + 20 + i * 4); ctx.lineTo(x + 34, y + 20 + i * 4); ctx.stroke();
    }
    ctx.fillStyle = 'rgba(226,232,240,0.12)';
    for (let i = 0; i < 3; i++) {
      const px = x + 18 + Math.sin(nowT * 1.4 + i * 2 + c) * 8;
      const py = y + 10 - ((nowT * 14 + i * 9 + c * 3) % 18);
      ctx.beginPath(); ctx.arc(px, py, 4 + i, 0, Math.PI * 2); ctx.fill();
    }
  }
  ctx.restore();
}

function drawCrushed(x, y) {
  ctx.fillStyle = '#0a0d14'; ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  ctx.strokeStyle = 'rgba(127,29,29,0.55)'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(x + 4, y + TILE_SIZE - 6); ctx.lineTo(x + TILE_SIZE - 6, y + 4); ctx.stroke();
  ctx.strokeStyle = 'rgba(248,113,113,0.18)'; ctx.lineWidth = 1;
  ctx.strokeRect(x + 1.5, y + 1.5, TILE_SIZE - 3, TILE_SIZE - 3);
}

/* Moldura externa da arena: cada bioma tem uma "borda" com identidade própria
   (mar no Porto, vazio estelar na Estação, lava no Vulcão etc.). Só decorativa. */
function drawBorderTile(x, y, c, r, theme) {
  const style = theme.border || 'tech';
  const h = tileHash(c + 1, r + 3);
  let base = '#0b1220';
  if (style === 'sand') base = '#2a1f15';
  else if (style === 'ice') base = '#102b33';
  else if (style === 'lava') base = '#1a0d12';
  else if (style === 'jungle') base = '#0b1a12';
  else if (style === 'shrine') base = '#221626';
  else if (style === 'concrete') base = '#1a1b24';
  else if (style === 'water') base = '#0a2530';
  else if (style === 'space') base = '#05060d';
  ctx.save();
  ctx.fillStyle = base; ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  if (style === 'sand') {
    ctx.strokeStyle = 'rgba(251,191,36,0.14)'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(x + 2, y + 16); ctx.quadraticCurveTo(x + 24, y + 11, x + 46, y + 18); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + 2, y + 34); ctx.quadraticCurveTo(x + 24, y + 30, x + 46, y + 37); ctx.stroke();
    ctx.fillStyle = 'rgba(120,113,108,0.35)';
    ctx.beginPath(); ctx.arc(x + 10 + h * 24, y + 24, 2.4, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'ice') {
    ctx.strokeStyle = 'rgba(224,242,254,0.30)'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(x + 4, y + 40); ctx.lineTo(x + 20, y + 24); ctx.lineTo(x + 30, y + 30); ctx.stroke();
    ctx.fillStyle = 'rgba(224,242,254,0.5)';
    ctx.beginPath(); ctx.arc(x + 12 + h * 22, y + 12, 1.4, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'lava') {
    const glow = 0.28 + 0.08 * Math.sin(nowT * 2 + c * 0.7);
    ctx.strokeStyle = `rgba(251,113,133,${glow})`; ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.moveTo(x + 2, y + 26 + h * 8); ctx.lineTo(x + 18, y + 22); ctx.lineTo(x + 34, y + 34); ctx.lineTo(x + 46, y + 28); ctx.stroke();
    ctx.fillStyle = `rgba(251,146,60,${glow * 0.9})`;
    ctx.beginPath(); ctx.arc(x + 14 + h * 18, y + 14, 1.6, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'jungle') {
    ctx.fillStyle = 'rgba(34,197,94,0.22)';
    [[10, 26, 11], [24, 16, 13], [37, 30, 10]].forEach(([ox, oy, rad]) => {
      ctx.beginPath(); ctx.arc(x + ox, y + oy, rad, 0, Math.PI * 2); ctx.fill();
    });
    ctx.strokeStyle = 'rgba(74,222,128,0.25)'; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(x + 6, y + 2); ctx.quadraticCurveTo(x + 14, y + 18, x + 8, y + 40); ctx.stroke();
    ctx.fillStyle = 'rgba(250,204,21,0.35)';
    ctx.beginPath(); ctx.arc(x + 30, y + 22, 1.5, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'shrine') {
    ctx.strokeStyle = 'rgba(148,163,184,0.16)'; ctx.lineWidth = 1.2;
    ctx.strokeRect(x + 4, y + 6, 40, 16);
    ctx.strokeRect(x + 4, y + 24, 40, 16);
    ctx.fillStyle = 'rgba(249,168,212,0.28)';
    ctx.beginPath(); ctx.ellipse(x + 12 + h * 22, y + 36, 3, 1.5, h * 4, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'concrete') {
    ctx.strokeStyle = 'rgba(148,163,184,0.14)'; ctx.lineWidth = 1;
    ctx.strokeRect(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4);
    ctx.strokeStyle = 'rgba(0,0,0,0.45)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(x + 10, y + 8); ctx.lineTo(x + 22, y + 20); ctx.lineTo(x + 16, y + 34); ctx.stroke();
  } else if (style === 'water') {
    ctx.strokeStyle = 'rgba(94,234,212,0.20)'; ctx.lineWidth = 1.4;
    for (let i = 0; i < 3; i++) {
      const oy = y + 10 + i * 13;
      const ph = nowT * 1.4 + i * 1.7 + c * 0.5;
      ctx.beginPath();
      ctx.moveTo(x + 2, oy + Math.sin(ph) * 2);
      ctx.quadraticCurveTo(x + 24, oy - 4 + Math.sin(ph + 1) * 3, x + 46, oy + Math.sin(ph + 2) * 2);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(204,251,241,0.28)';
    ctx.beginPath(); ctx.arc(x + 12 + h * 24, y + 14 + h * 18, 1.4, 0, Math.PI * 2); ctx.fill();
  } else if (style === 'space') {
    ctx.fillStyle = 'rgba(226,232,240,0.6)';
    [[10, 12], [32, 22], [20, 36], [38, 8]].forEach(([ox, oy], i) => {
      const tw = 0.35 + 0.35 * Math.sin(nowT * 1.6 + i * 2 + c);
      ctx.globalAlpha = tw;
      ctx.fillRect(x + ox + (h * 4 | 0), y + oy, 1.4, 1.4);
    });
    ctx.globalAlpha = 0.35; ctx.strokeStyle = 'rgba(192,132,252,0.5)'; ctx.lineWidth = 1;
    ctx.setLineDash([6, 6]);
    ctx.beginPath(); ctx.moveTo(x + 2, y + 24); ctx.lineTo(x + 46, y + 24); ctx.stroke();
    ctx.setLineDash([]);
  } else {
    ctx.strokeStyle = 'rgba(56,189,248,0.22)'; ctx.lineWidth = 1.4;
    const ox = 6 + h * 24;
    ctx.beginPath(); ctx.moveTo(x + ox, y + 6); ctx.lineTo(x + ox + 12, y + 6); ctx.lineTo(x + ox + 12, y + 18); ctx.stroke();
    ctx.fillStyle = 'rgba(56,189,248,0.35)';
    ctx.beginPath(); ctx.arc(x + ox + 12, y + 18, 1.6, 0, Math.PI * 2); ctx.fill();
  }
  // Linha interna marcando o limite jogável
  const edgeColor = {
    tech: 'rgba(56,189,248,0.35)', sand: 'rgba(251,191,36,0.22)', ice: 'rgba(165,243,252,0.35)',
    lava: 'rgba(251,113,133,0.35)', jungle: 'rgba(52,211,153,0.25)', shrine: 'rgba(249,168,212,0.28)',
    concrete: 'rgba(167,139,250,0.28)', water: 'rgba(94,234,212,0.4)', space: 'rgba(192,132,252,0.4)'
  }[style] || 'rgba(148,163,184,0.25)';
  ctx.strokeStyle = edgeColor; ctx.lineWidth = 3;
  ctx.beginPath();
  if (c === 0) { ctx.moveTo(x + TILE_SIZE - 1.5, y); ctx.lineTo(x + TILE_SIZE - 1.5, y + TILE_SIZE); }
  if (c === GRID_SIZE - 1) { ctx.moveTo(x + 1.5, y); ctx.lineTo(x + 1.5, y + TILE_SIZE); }
  if (r === 0) { ctx.moveTo(x, y + TILE_SIZE - 1.5); ctx.lineTo(x + TILE_SIZE, y + TILE_SIZE - 1.5); }
  if (r === GRID_SIZE - 1) { ctx.moveTo(x, y + 1.5); ctx.lineTo(x + TILE_SIZE, y + 1.5); }
  ctx.stroke();
  ctx.restore();
}

/* Partículas ambientais por bioma (neve, brasas, pétalas, chuva, vagalumes...).
   Determinísticas por célula: não acumulam estado nem atrapalham a leitura. */
function drawAmbience(minC, maxC, minR, maxR, theme) {
  if (!QUALITY.ambience) return;
  const kind = theme.ambience || 'spark';
  const thresh = viewW < 520 ? 0.94 : 0.9;
  ctx.save();
  for (let r = minR; r <= maxR; r++) {
    for (let c = minC; c <= maxC; c++) {
      const t = grid[r][c];
      if (t !== CELL.FLOOR && t !== CELL.BUSH) continue;
      const h = tileHash(c, r);
      if (h < thresh) continue;
      const x = c * TILE_SIZE, y = r * TILE_SIZE;
      const px = x + 8 + ((h * 677) % (TILE_SIZE - 16));
      if (kind === 'snow') {
        const yy = y + ((nowT * 26 + h * 500) % TILE_SIZE);
        ctx.fillStyle = 'rgba(224,242,254,0.55)';
        ctx.beginPath(); ctx.arc(px + Math.sin(nowT * 0.8 + h * 12) * 6, yy, 1.7, 0, Math.PI * 2); ctx.fill();
      } else if (kind === 'ember') {
        const yy = y + TILE_SIZE - ((nowT * 34 + h * 400) % (TILE_SIZE + 10));
        ctx.fillStyle = `rgba(251,146,60,${0.28 + 0.18 * Math.sin(nowT * 4 + h * 9)})`;
        ctx.beginPath(); ctx.arc(px + Math.sin(nowT + h * 20) * 3, yy, 1.6, 0, Math.PI * 2); ctx.fill();
      } else if (kind === 'firefly') {
        const xx = px + Math.sin(nowT * 0.9 + h * 17) * 9;
        const yy = y + 14 + ((h * 503) % 24) + Math.cos(nowT * 0.7 + h * 11) * 6;
        ctx.fillStyle = `rgba(190,242,100,${0.25 + 0.25 * Math.sin(nowT * 2.6 + h * 30)})`;
        ctx.beginPath(); ctx.arc(xx, yy, 1.8, 0, Math.PI * 2); ctx.fill();
      } else if (kind === 'petal') {
        const yy = y + ((nowT * 20 + h * 480) % TILE_SIZE);
        const xx = px + Math.sin(nowT * 0.6 + h * 8) * 8;
        ctx.fillStyle = 'rgba(249,168,212,0.42)';
        ctx.beginPath(); ctx.ellipse(xx, yy, 3, 1.6, nowT * 1.4 + h * 7, 0, Math.PI * 2); ctx.fill();
      } else if (kind === 'sand') {
        const xx = x + TILE_SIZE - ((nowT * 36 + h * 600) % (TILE_SIZE * 2));
        ctx.strokeStyle = 'rgba(251,191,36,0.16)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(xx, y + 16 + h * 18); ctx.lineTo(xx + 10, y + 15 + h * 18); ctx.stroke();
      } else if (kind === 'rain') {
        const yy = y + ((nowT * 120 + h * 600) % TILE_SIZE);
        ctx.strokeStyle = 'rgba(148,163,184,0.22)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(px, yy); ctx.lineTo(px - 4, yy + 7); ctx.stroke();
      } else if (kind === 'spray') {
        const yy = y + 10 + ((h * 401) % 26) + Math.sin(nowT * 1.2 + h * 9) * 5;
        ctx.fillStyle = 'rgba(204,251,241,0.28)';
        ctx.beginPath(); ctx.arc(px + Math.sin(nowT * 0.8 + h * 14) * 5, yy, 1.4, 0, Math.PI * 2); ctx.fill();
      } else if (kind === 'dust') {
        const yy = y + 8 + ((h * 509) % 30) + Math.cos(nowT * 0.6 + h * 13) * 5;
        ctx.fillStyle = 'rgba(192,132,252,0.26)';
        ctx.beginPath(); ctx.arc(px + Math.sin(nowT * 0.5 + h * 21) * 7, yy, 1.5, 0, Math.PI * 2); ctx.fill();
      } else {
        ctx.fillStyle = `rgba(56,189,248,${0.18 + 0.12 * Math.sin(nowT * 3 + h * 25)})`;
        ctx.beginPath(); ctx.arc(px, y + 12 + ((h * 307) % 24), 1.4, 0, Math.PI * 2); ctx.fill();
      }
    }
  }
  ctx.restore();
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

function drawBlastTelegraphs() {
  if (!bombs.length) return;
  const time = performance.now() / 1000;
  for (const b of bombs) {
    if (b.exploded || b.fuse > 0.8) continue;
    const p = 1 - clamp(b.fuse / 0.8, 0, 1);
    const alpha = clamp(0.16 + p * 0.24 + Math.sin(time * 20) * 0.06, 0.08, 0.5);
    if (b.type === 'SHOCK') {
      const radius = (1.4 + b.range * 0.55) * TILE_SIZE;
      ctx.save();
      ctx.fillStyle = `rgba(244,63,94,${alpha * 0.55})`;
      ctx.beginPath(); ctx.arc(b.x, b.y, radius * (0.92 + Math.sin(time * 18) * 0.03), 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = `rgba(254,205,211,${Math.min(0.85, alpha + 0.25)})`;
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(b.x, b.y, radius, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
      continue;
    }
    const cells = bombBlastPreview(b);
    ctx.save();
    for (const cell of cells) {
      const x = cell.c * TILE_SIZE, y = cell.r * TILE_SIZE;
      ctx.fillStyle = `rgba(244,63,94,${alpha})`;
      rr(x + 3, y + 3, TILE_SIZE - 6, TILE_SIZE - 6, 8); ctx.fill();
      ctx.strokeStyle = `rgba(254,205,211,${Math.min(0.9, alpha + 0.22)})`;
      ctx.lineWidth = 1.5 + p * 1.2;
      rr(x + 3, y + 3, TILE_SIZE - 6, TILE_SIZE - 6, 8); ctx.stroke();
    }
    ctx.restore();
  }
}

/* Espelha exatamente a área que a explosão atingirá (paredes bloqueiam). */
function bombBlastPreview(b) {
  const bc = Math.floor(b.x / TILE_SIZE), br = Math.floor(b.y / TILE_SIZE);
  const cells = [{ c: bc, r: br }];
  const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
  const cryo = b.type === 'CRYO';
  for (const [dx, dy] of dirs) {
    for (let i = 1; i <= b.range; i++) {
      const c = bc + dx * i, r = br + dy * i;
      if (!inBounds(c, r)) break;
      const t = grid[r][c];
      if (t === CELL.CRUSHED || t === CELL.PILLAR) break;
      if (cryo) {
        if (t === CELL.CRATE || t === CELL.AIRDROP_CRATE) break;
        cells.push({ c, r });
      } else {
        cells.push({ c, r });
        if (t === CELL.CRATE || t === CELL.AIRDROP_CRATE) break;
      }
    }
  }
  return cells;
}

function drawBombSkinBody(b, skin, pulse) {
  const x = b.x, y = b.y;
  if (skin.id === 'dynamite') {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-0.12);
    for (let i = -1; i <= 1; i++) {
      const ox = i * 8;
      ctx.fillStyle = i === 0 ? '#dc2626' : '#b91c1c';
      rr(ox - 4, -14 * pulse, 8, 28 * pulse, 4); ctx.fill();
      ctx.strokeStyle = 'rgba(254,202,202,0.55)'; ctx.lineWidth = 1;
      rr(ox - 4, -14 * pulse, 8, 28 * pulse, 4); ctx.stroke();
    }
    ctx.fillStyle = '#facc15';
    ctx.fillRect(-14, -3, 28, 6);
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(2, -14); ctx.quadraticCurveTo(9, -20, 12, -25); ctx.stroke();
    ctx.restore();
    return;
  }
  if (skin.id === 'plasma') {
    const glow = ctx.createRadialGradient(x, y, 1, x, y, 19 * pulse);
    glow.addColorStop(0, '#e0f2fe');
    glow.addColorStop(0.35, '#22d3ee');
    glow.addColorStop(1, 'rgba(14,165,233,0)');
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(x, y, 19 * pulse, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0e2a3a';
    ctx.beginPath(); ctx.arc(x, y, 12 * pulse, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#67e8f9'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(x, y, 12 * pulse, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = 'rgba(224,242,254,0.85)'; ctx.lineWidth = 1.5;
    const orbit = nowT * 4 + b.seed;
    ctx.beginPath(); ctx.arc(x + Math.cos(orbit) * 16, y + Math.sin(orbit) * 16, 2.6, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#e0f2fe';
    ctx.beginPath(); ctx.arc(x, y, 4.5 + Math.sin(nowT * 12) * 0.8, 0, Math.PI * 2); ctx.fill();
    return;
  }
  if (skin.id === 'crystal') {
    ctx.save();
    ctx.translate(x, y);
    const gem = ctx.createLinearGradient(-10, -13, 12, 14);
    gem.addColorStop(0, '#c4b5fd');
    gem.addColorStop(0.5, '#8b5cf6');
    gem.addColorStop(1, '#38bdf8');
    ctx.fillStyle = gem;
    ctx.beginPath();
    ctx.moveTo(0, -15 * pulse); ctx.lineTo(12 * pulse, -4); ctx.lineTo(8, 13 * pulse);
    ctx.lineTo(-8, 13 * pulse); ctx.lineTo(-12 * pulse, -4); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(245,243,255,0.8)'; ctx.lineWidth = 1.6; ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, -15); ctx.lineTo(0, 13); ctx.moveTo(-12, -4); ctx.lineTo(12, -4); ctx.stroke();
    ctx.restore();
    return;
  }
  if (skin.id === 'blackhole') {
    const hole = ctx.createRadialGradient(x, y, 1, x, y, 20 * pulse);
    hole.addColorStop(0, '#000000');
    hole.addColorStop(0.55, '#111827');
    hole.addColorStop(0.8, 'rgba(124,58,237,0.55)');
    hole.addColorStop(1, 'rgba(124,58,237,0)');
    ctx.fillStyle = hole;
    ctx.beginPath(); ctx.arc(x, y, 20 * pulse, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(196,181,253,0.85)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(x, y, 17 * pulse, 6 * pulse, nowT * 2 + b.seed, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.arc(x, y, 9 * pulse, 0, Math.PI * 2); ctx.fill();
    return;
  }
  if (skin.id === 'deathstar') {
    const hull = ctx.createRadialGradient(x - 5, y - 6, 2, x, y, 16 * pulse);
    hull.addColorStop(0, '#e2e8f0');
    hull.addColorStop(0.6, '#64748b');
    hull.addColorStop(1, '#1e293b');
    ctx.fillStyle = hull;
    ctx.beginPath(); ctx.arc(x, y, 15 * pulse, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(163,230,53,0.85)'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.ellipse(x, y, 15 * pulse, 4.5 * pulse, -0.35, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#a3e635';
    ctx.beginPath(); ctx.arc(x - 4, y, 3.4, 0, Math.PI * 2); ctx.fill();
    return;
  }
  // Clássica: esfera metálica com pavio
  const metal = ctx.createRadialGradient(x - 5, y - 6, 2, x, y, 16 * pulse);
  metal.addColorStop(0, '#64748b');
  metal.addColorStop(0.5, '#1f2937');
  metal.addColorStop(1, '#0b1220');
  ctx.fillStyle = metal;
  ctx.beginPath(); ctx.arc(x, y, 15 * pulse, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = skin.color; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.arc(x, y, 15 * pulse, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(x - 3, y - 3, 9, -2.4, -0.6); ctx.stroke();
  ctx.strokeStyle = '#d97706'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(x + 3, y - 13); ctx.quadraticCurveTo(x + 9, y - 20, x + 13, y - 22); ctx.stroke();
  const spark = 0.6 + Math.abs(Math.sin(nowT * 18)) * 0.4;
  ctx.fillStyle = `rgba(254,240,138,${spark})`;
  ctx.beginPath(); ctx.arc(x + 13, y - 22, 2.6, 0, Math.PI * 2); ctx.fill();
}

function drawBombs() {
  bombs.forEach(b => {
    if (b.exploded) return;
    const isNormal = b.type === 'NORMAL';
    const meta = isNormal
      ? { color: getBombSkin(b.skinId).color }
      : b.type === 'C4' ? { color: '#f43f5e', icon: '📡' } : b.type === 'SHOCK' ? { color: '#fbbf24', icon: '🌀' } : { color: '#67e8f9', icon: '❄️' };
    const blink = b.fuse < 0.9 ? 0.55 + Math.abs(Math.sin(nowT * 16)) * 0.45 : 1;
    const pulse = 1 + Math.sin(nowT * 10 + b.seed) * 0.07;
    ctx.save(); ctx.globalAlpha = blink;
    const glow = ctx.createRadialGradient(b.x, b.y, 2, b.x, b.y, 26);
    glow.addColorStop(0, meta.color); glow.addColorStop(1, 'rgba(15,23,42,0)');
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(b.x, b.y, 26, 0, Math.PI * 2); ctx.fill();
    if (isNormal) {
      const bombCosmetic = getBombSkin(b.skinId);
      drawBombSkinBody(b, bombCosmetic, pulse);
      // Bombas lendárias/míticas ganham anéis girando ao redor.
      const bombRank = rarityTier(bombCosmetic.rarity);
      if (bombRank >= 4) {
        const meta = rarityMeta(bombCosmetic.rarity);
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(nowT * (bombRank >= 5 ? 2.2 : 1.3) + b.seed);
        ctx.strokeStyle = hexA(meta.color, 0.6);
        ctx.lineWidth = 1.6;
        ctx.setLineDash([7, 8]);
        ctx.beginPath(); ctx.arc(0, 0, 22 * pulse, 0, Math.PI * 2); ctx.stroke();
        ctx.rotate(-nowT * (bombRank >= 5 ? 3.4 : 2.1));
        ctx.setLineDash([3, 9]);
        ctx.beginPath(); ctx.arc(0, 0, 26 * pulse, 0, Math.PI * 2); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = hexA(meta.color, 0.8);
        for (let i = 0; i < (bombRank >= 5 ? 4 : 3); i++) {
          const a = (i / (bombRank >= 5 ? 4 : 3)) * Math.PI * 2 + b.seed;
          ctx.beginPath(); ctx.arc(Math.cos(a) * 24, Math.sin(a) * 24, 1.8, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
      }
    } else {
      ctx.fillStyle = '#111827';
      ctx.beginPath(); ctx.arc(b.x, b.y, 15 * pulse, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = meta.color; ctx.lineWidth = 2.5; ctx.stroke();
      ctx.font = '16px "Segoe UI Emoji", sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(meta.icon, b.x, b.y + 1);
    }
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
    const isLocal = f.isHuman && !match.demoMode && controlOf(f.device) !== null;
    const look = isLocal ? resolvePlayerLook() : null;
    const profileLook = PROFILE_DEFS[f.name] || null;
    const bodyColor = look ? look.body : (profileLook ? profileLook.body : f.color);
    const visorColor = look ? look.visor : (profileLook ? profileLook.visor : f.visor);
    const skin = f.skin ? getSkin(f.skin) : null;
    const accentCol = look ? look.accent : (skin ? skin.accent : (accent ? accent.solid : '#0f172a'));
    const moving = Math.hypot(f.vx, f.vy) > 20;
    const step = moving ? Math.sin(nowT * 16 + f.name.length) * 3 : 0;

    ctx.beginPath();
    ctx.ellipse(f.x, f.y + 11, PLAYER_RADIUS * 1.02, PLAYER_RADIUS * 0.46, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.38)'; ctx.fill();

    // Botas com passada animada
    ctx.fillStyle = shadeColor(accentCol, -55);
    ctx.beginPath(); ctx.ellipse(f.x - 6.5, f.y + PLAYER_RADIUS * 0.72 + step, 4.6, 3.4, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(f.x + 6.5, f.y + PLAYER_RADIUS * 0.72 - step, 4.6, 3.4, 0, 0, Math.PI * 2); ctx.fill();

    // Mochila de bombas
    const bx = f.x + Math.cos(f.facingAngle + Math.PI) * (PLAYER_RADIUS * 0.62);
    const by = f.y + Math.sin(f.facingAngle + Math.PI) * (PLAYER_RADIUS * 0.62);
    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate(f.facingAngle);
    ctx.fillStyle = '#0f172a'; rr(-5, -7, 10, 14, 4); ctx.fill();
    ctx.strokeStyle = accentCol; ctx.lineWidth = 1.6; rr(-5, -7, 10, 14, 4); ctx.stroke();
    ctx.fillStyle = '#f97316';
    ctx.beginPath(); ctx.arc(0, 1, 2.6, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // Corpo
    const grad = ctx.createRadialGradient(f.x - 5, f.y - 7, 2, f.x, f.y, PLAYER_RADIUS * 1.1);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.28, bodyColor);
    grad.addColorStop(0.86, shadeColor(bodyColor, -42));
    grad.addColorStop(1, '#0b1220');
    ctx.beginPath(); ctx.arc(f.x, f.y, PLAYER_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = grad; ctx.fill();

    ctx.beginPath();
    ctx.arc(f.x, f.y, PLAYER_RADIUS - 4.5, -2.5, -0.4);
    ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 1.6; ctx.stroke();

    // Aro de time/skin
    ctx.lineWidth = f.isHuman ? 3 : 2;
    if (f.team === 1) ctx.strokeStyle = '#34d399';
    else if (f.team === 2) ctx.strokeStyle = '#f87171';
    else ctx.strokeStyle = accentCol;
    ctx.beginPath(); ctx.arc(f.x, f.y, PLAYER_RADIUS, 0, Math.PI * 2); ctx.stroke();

    // Visor com brilho
    const ang = f.facingAngle;
    ctx.save();
    if (QUALITY.glow) { ctx.shadowColor = visorColor; ctx.shadowBlur = 7; }
    ctx.beginPath();
    ctx.arc(f.x + Math.cos(ang) * 4, f.y + Math.sin(ang) * 4, 6.2, ang - 0.95, ang + 0.95);
    ctx.strokeStyle = visorColor; ctx.lineWidth = 3.2; ctx.stroke();
    ctx.restore();
    // Detalhes exclusivos das skins equipadas
    if (look && look.skinId === 'guardian') {
      ctx.strokeStyle = 'rgba(254,243,199,0.85)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(f.x, f.y - 2, PLAYER_RADIUS + 4, Math.PI * 1.12, Math.PI * 1.88); ctx.stroke();
    } else if (look && look.skinId === 'cyber') {
      ctx.strokeStyle = 'rgba(207,250,254,0.7)'; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.arc(f.x, f.y, PLAYER_RADIUS - 5, ang + 1.1, ang + 2.2); ctx.stroke();
      ctx.beginPath(); ctx.arc(f.x, f.y, PLAYER_RADIUS - 5, ang - 2.2, ang - 1.1); ctx.stroke();
    } else if (look && look.skinId === 'pyro') {
      const ember = 0.5 + Math.abs(Math.sin(nowT * 5 + f.name.length)) * 0.5;
      ctx.fillStyle = `rgba(249,115,22,${0.35 + ember * 0.3})`;
      ctx.beginPath(); ctx.arc(f.x, f.y, PLAYER_RADIUS + 2, 0, Math.PI * 2); ctx.fill();
    }
    // Skins lendárias/míticas: aura pulsante + partículas orbitando
    // dentro do raio de 1 tile (32px).
    const cosmeticSkinId = f.cosmeticSkin || (look ? look.skinId : null);
    const skinRank = cosmeticSkinId ? rarityTier(cosmeticRarity('skins', cosmeticSkinId)) : 0;
    if (skinRank >= 4) {
      const meta = rarityMeta(cosmeticRarity('skins', cosmeticSkinId));
      const pulse = 0.6 + Math.sin(nowT * 3 + f.name.length) * 0.25;
      const auraR = TILE_SIZE * (0.82 + pulse * 0.12);
      const aura = ctx.createRadialGradient(f.x, f.y, PLAYER_RADIUS * 0.5, f.x, f.y, auraR);
      aura.addColorStop(0, hexA(meta.color, 0.02));
      aura.addColorStop(0.7, hexA(meta.color, 0.10 + pulse * 0.06));
      aura.addColorStop(1, hexA(meta.color, 0));
      ctx.fillStyle = aura;
      ctx.beginPath(); ctx.arc(f.x, f.y, auraR, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = hexA(meta.color, 0.35 + pulse * 0.2);
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 7]);
      ctx.lineDashOffset = -nowT * 26;
      ctx.beginPath(); ctx.arc(f.x, f.y, PLAYER_RADIUS + 7, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]);
      const orbitCount = QUALITY.glow ? (skinRank >= 5 ? 6 : 4) : 0;
      for (let i = 0; i < orbitCount; i++) {
        const a = nowT * (skinRank >= 5 ? 1.6 : 1.1) + (i / orbitCount) * Math.PI * 2;
        const r = PLAYER_RADIUS + 9 + Math.sin(nowT * 2 + i) * 3;
        ctx.fillStyle = hexA(meta.color, 0.75);
        ctx.beginPath(); ctx.arc(f.x + Math.cos(a) * r, f.y + Math.sin(a) * r * 0.9, skinRank >= 5 ? 2.4 : 1.9, 0, Math.PI * 2); ctx.fill();
      }
    }
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
        ctx.fillStyle = ex.center || '#fef3c7';
        rr(x + pad + 8, y + pad + 8, TILE_SIZE - (pad + 8) * 2, TILE_SIZE - (pad + 8) * 2, 7); ctx.fill();
        ctx.restore();
      });
      // Explosões lendárias/míticas: anel girando + onda colorida.
      if (ex.tier >= 4) {
        const meta = rarityMeta(ex.tier >= 5 ? 'mythic' : 'legendary');
        const t = 1 - p;
        ctx.save();
        ctx.globalAlpha = p * 0.85;
        ctx.strokeStyle = hexA(meta.color, 0.9);
        ctx.lineWidth = 2 + p * 4;
        ctx.beginPath(); ctx.arc(ex.x, ex.y, TILE_SIZE * (0.8 + t * 1.7), 0, Math.PI * 2); ctx.stroke();
        ctx.strokeStyle = hexA(meta.color, 0.35);
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(ex.x, ex.y, TILE_SIZE * (0.45 + t * 1.05), 0, Math.PI * 2); ctx.stroke();
        ctx.translate(ex.x, ex.y);
        ctx.rotate(nowT * 5.5);
        ctx.setLineDash([10, 13]);
        ctx.beginPath(); ctx.arc(0, 0, TILE_SIZE * 1.15, 0, Math.PI * 2); ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }
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

function updateTrails(dt) {
  for (let i = trails.length - 1; i >= 0; i--) {
    const p = trails[i]; p.life -= dt;
    if (p.life <= 0) { trails.splice(i, 1); continue; }
    p.x += p.vx * dt; p.y += p.vy * dt;
    p.vx *= Math.exp(-3 * dt); p.vy *= Math.exp(-3 * dt);
  }
  if (match.demoMode || !match.running) return;
  for (const f of fighters) {
    if (!f.alive || !f.trailId || f.trailId === 'none') continue;
    const skin = TRAIL_SKINS.find(t => t.id === f.trailId);
    if (!skin) continue;
    if (f._trailX == null) { f._trailX = f.x; f._trailY = f.y; f._trailAccum = 0; }
    const moved = Math.hypot(f.x - f._trailX, f.y - f._trailY);
    f._trailX = f.x; f._trailY = f.y;
    if (moved < dt * 36) { f._trailAccum = 0; continue; }
    f._trailAccum = (f._trailAccum || 0) + dt;
    const tier = rarityTier(skin.rarity);
    if (f._trailAccum < (tier >= 4 ? 0.05 : 0.085)) continue;
    f._trailAccum = 0;
    const count = tier >= 4 ? 2 : 1;
    for (let i = 0; i < count; i++) {
      trails.push({
        x: f.x + (Math.random() - 0.5) * 10,
        y: f.y + PLAYER_RADIUS * 0.45 + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 14, vy: (Math.random() - 0.5) * 14,
        color: skin.color, glow: skin.glow,
        size: (tier >= 4 ? 3.2 : 2.3) + Math.random() * 1.4,
        life: TRAIL_LIFE, maxLife: TRAIL_LIFE
      });
    }
  }
  const cap = QUALITY.trailCap || 220;
  if (trails.length > cap) trails.splice(0, trails.length - cap);
}

function drawTrails() {
  for (const p of trails) {
    const a = clamp(p.life / p.maxLife, 0, 1);
    ctx.save(); ctx.globalAlpha = a * 0.9;
    ctx.fillStyle = p.color;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.size * a + 0.7, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = a * 0.28;
    ctx.fillStyle = p.glow || p.color;
    ctx.beginPath(); ctx.arc(p.x, p.y, (p.size + 2.2) * a + 0.5, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
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
  const h = getHuman();
  let outside = false;
  if (h && h.alive && match.safeRing > 0 && !match.demoMode) {
    const { c, r } = worldToGrid(h.x, h.y);
    const lo = match.safeRing, hi = GRID_SIZE - 1 - match.safeRing;
    outside = c < lo || c > hi || r < lo || r > hi;
  }
  if (!match.stormWarning && !outside) return;
  const pulse = outside ? 0.48 + Math.sin(nowT * 6) * 0.12 : 0.35 + Math.sin(nowT * 4) * 0.12;
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
  // Marca do piso de cada bioma, para a miniatura não ser só cor
  const ground = theme.ground || theme.deco || 'circuit';
  c2.save();
  c2.strokeStyle = theme.accent; c2.globalAlpha = 0.32; c2.lineWidth = 1;
  if (ground === 'sand') {
    for (let i = 0; i < 3; i++) {
      const oy = 14 + i * 18;
      c2.beginPath(); c2.moveTo(2, oy); c2.quadraticCurveTo(size / 2, oy - 5, size - 2, oy + 2); c2.stroke();
    }
  } else if (ground === 'ice') {
    c2.beginPath(); c2.moveTo(4, size - 6); c2.lineTo(size - 6, 6); c2.stroke();
    c2.beginPath(); c2.moveTo(6, 10); c2.lineTo(size - 10, size - 8); c2.stroke();
  } else if (ground === 'lava') {
    c2.beginPath(); c2.moveTo(6, 4); c2.lineTo(20, 26); c2.lineTo(14, 42); c2.lineTo(30, size - 2); c2.stroke();
    c2.beginPath(); c2.moveTo(size - 8, 8); c2.lineTo(size - 22, 30); c2.stroke();
  } else if (ground === 'leaf' || ground === 'petal') {
    c2.fillStyle = theme.accent;
    for (let i = 0; i < 9; i++) {
      const ox = 5 + ((i * 37) % (size - 10));
      const oy = 5 + ((i * 53) % (size - 10));
      c2.beginPath(); c2.ellipse(ox, oy, 2, 1.1, i, 0, Math.PI * 2); c2.fill();
    }
  } else if (ground === 'asphalt' || ground === 'plank') {
    for (let i = 1; i < 4; i++) {
      const oy = (size / 4) * i;
      c2.beginPath(); c2.moveTo(0, oy); c2.lineTo(size, oy); c2.stroke();
    }
  } else if (ground === 'panel' || ground === 'circuit') {
    c2.strokeRect(6, 6, size - 12, size - 12);
    c2.beginPath(); c2.moveTo(6, size / 2); c2.lineTo(size / 2, size / 2); c2.lineTo(size / 2, size - 6); c2.stroke();
  }
  c2.globalAlpha = 0.55;
  c2.strokeStyle = theme.accent;
  c2.strokeRect(0.5, 0.5, size - 1, size - 1);
  c2.restore();
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

let radarBase = null;
let radarBaseRev = -1;
function renderRadar() {
  const S = 88;
  const scale = S / WORLD_PX;
  if (!radarBase) { radarBase = document.createElement('canvas'); radarBase.width = S; radarBase.height = S; }
  // Paredes do radar são estáticas: redesenha só quando a grade muda.
  if (radarBaseRev !== gridRev) {
    const b = radarBase.getContext('2d');
    b.setTransform(1, 0, 0, 1, 0, 0);
    b.clearRect(0, 0, S, S);
    b.save();
    b.beginPath(); b.arc(S / 2, S / 2, S / 2, 0, Math.PI * 2); b.clip();
    b.fillStyle = 'rgba(8,12,20,0.94)'; b.fillRect(0, 0, S, S);
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const t = grid[r] ? grid[r][c] : CELL.FLOOR;
        if (t === CELL.FLOOR || t === CELL.BUSH || t === CELL.CRATE || t === CELL.AIRDROP_CRATE) continue;
        b.fillStyle = 'rgba(100,116,139,0.55)';
        b.fillRect(c * TILE_SIZE * scale, r * TILE_SIZE * scale, Math.max(1, TILE_SIZE * scale), Math.max(1, TILE_SIZE * scale));
      }
    }
    b.restore();
    radarBaseRev = gridRev;
  }
  rctx.clearRect(0, 0, S, S);
  rctx.save();
  rctx.beginPath(); rctx.arc(S / 2, S / 2, S / 2, 0, Math.PI * 2); rctx.clip();
  rctx.drawImage(radarBase, 0, 0);
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const t = grid[r] ? grid[r][c] : CELL.FLOOR;
      if (t === CELL.CRATE) rctx.fillStyle = 'rgba(180,83,9,0.7)';
      else if (t === CELL.AIRDROP_CRATE) rctx.fillStyle = '#fbbf24';
      else continue;
      rctx.fillRect(c * TILE_SIZE * scale, r * TILE_SIZE * scale, Math.max(1, TILE_SIZE * scale), Math.max(1, TILE_SIZE * scale));
    }
  }
  const ring = clamp(match.safeRing, 0, MAX_RING + 2);
  const minT = ring, maxT = GRID_SIZE - 1 - ring;
  rctx.strokeStyle = 'rgba(244,63,94,0.7)'; rctx.lineWidth = 1;
  rctx.strokeRect(minT * TILE_SIZE * scale, minT * TILE_SIZE * scale, (maxT - minT) * TILE_SIZE * scale, (maxT - minT) * TILE_SIZE * scale);
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
// Em celulares fracos a resolução do canvas cai sozinha até o jogo voltar
// a rodar liso; volta a subir quando há folga de desempenho.
let renderScale = 1;
let perfAccum = 0, perfFrames = 0, perfCooldown = 0;
function adaptRenderScale(rawDt) {
  if (!IS_TOUCH || chroma.active) return;
  if (rawDt <= 0 || rawDt > 0.4) return;
  perfAccum += rawDt; perfFrames++;
  perfCooldown = Math.max(0, perfCooldown - rawDt);
  if (perfAccum < 2) return;
  const avgMs = (perfAccum / perfFrames) * 1000;
  perfAccum = 0; perfFrames = 0;
  if (perfCooldown > 0) return;
  if (avgMs > 26 && renderScale > QUALITY.scaleMin) {
    renderScale = Math.max(QUALITY.scaleMin, renderScale - 0.15);
    resize(); perfCooldown = 2.5;
  } else if (avgMs < 16.5 && renderScale < QUALITY.scaleCap) {
    renderScale = Math.min(QUALITY.scaleCap, renderScale + 0.1);
    resize(); perfCooldown = 4;
  }
}

function loop(ts) {
  const seconds = ts / 1000;
  if (!lastTime) lastTime = seconds;
  const rawDt = Math.max(0, seconds - lastTime);
  const dt = Math.min(0.05, rawDt);
  lastTime = seconds;
  nowT = seconds;
  adaptRenderScale(rawDt);
  if (match.hitFlash > 0) match.hitFlash = Math.max(0, match.hitFlash - dt);
  pollGamepads();

  fpsAccum += dt; fpsFrames++;
  if (fpsAccum >= 0.5) {
    const fpsEl = document.getElementById('fpsCounter');
    const visible = settings.showFps && !chroma.active && match.running && !match.paused && UI.startScreen.classList.contains('hidden');
    if (fpsEl) {
      fpsEl.classList.toggle('hidden', !visible);
      if (visible) fpsEl.textContent = `${Math.round(fpsFrames / fpsAccum)} FPS`;
    }
    fpsAccum = 0; fpsFrames = 0;
  }
  
  // 🎨 Chroma Drop OU jogo principal
  if (chroma.active) {
    if (!chroma.paused) updateChromaDrop(dt);
    drawChromaDrop();
  } else {
    // No lobby a partida-demo fica congelada: nada de bombas, som ou ação
    // atrás do painel. O fundo do menu é um cenário próprio, sem gameplay.
    const lobbyOpen = !UI.startScreen.classList.contains('hidden');
    if (lobbyOpen && match.demoMode) {
      drawLobbyBackdrop();
    } else {
      if (match.running && !match.paused && !net.hold) update(dt);
      render();
    }
    if (!match.paused && !net.hold) netTick(dt);
    if (tutorial.active) updateTutorialUI();
  }
  
  requestAnimationFrame(loop);
}

window.onload = function () {
  try {
    loadPrefs();
    loadSettings();
    GameState.load();
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints || 0) > 0;
    if (isTouch) {
      document.body.classList.add('is-touch');
      // No celular, o primeiro toque já deixa tudo em tela cheia.
      document.addEventListener('pointerdown', (e) => {
        if (e.target && e.target.closest && e.target.closest('#btnFullscreen')) return;
        requestGameFullscreen();
      }, { once: true });
    }
    resize();
    updateRotateGate();
    bindUI();
    bindChromaUI(); // 🎨 Chroma Drop
    applySettings();
    syncSettingsUI();
    
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
    const bootMode = MODE_CONFIG[prefs.mode] ? prefs.mode : 'SOLO';
    // Sem nick, o boot não pode abrir o modal do competitivo sozinho.
    setSelectedMode(bootMode === 'ONLINE' && !hasCompetitiveNick() ? 'SOLO' : bootMode);
    setSelectedMap(getMap(prefs.map).id);
    // Abre "JOGAR" por padrão para o CTA "ENTRAR NA ARENA" já ficar visível.
    setLobbySection(selectedMode === 'ONLINE' ? 'online' : 'play');
    updatePadStatus();
    updateTutorialButton();
    updateCareerUI();
    if (UI.nameInput) UI.nameInput.value = GameState.state.profile.nick;
    const profileNick = document.getElementById('profileNickInput');
    if (profileNick) profileNick.value = GameState.state.profile.nick;
    syncDuelBestUI();
    rollMissions();
    renderProgress();
    renderSkins();
    refreshLobbyScreens();
    GameState.subscribe(onGameStateChanged);
    loadBiomeTextures();
    setInterval(bracketTick, 1000);
    // Liga vem da nuvem depois do boot: com a fase 2 aberta, espera a tabela
    // encher antes de congelar o Top 8 e depois alinha com o servidor.
    setTimeout(() => {
      if (weeklyPhase() !== 'knockout') return;
      bracketLockSeeds();
      refreshBracketServerState(true);
    }, 8000);
    initArena(true, selectedMode, selectedMap);
    updateHUD();
    MUSIC.play('menu');
    const unlockAudio = () => MUSIC.unlock();
    document.addEventListener('pointerdown', unlockAudio, { once: true });
    document.addEventListener('keydown', unlockAudio, { once: true });
    requestAnimationFrame(loop);
    if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
      navigator.serviceWorker.register('sw.js').then(reg => {
        // Só avisa atualização quando a página já era controlada por um SW.
        // Na primeira instalação não existe versão antiga para substituir.
        const hadController = !!navigator.serviceWorker.controller;
        let notified = false;
        const notifyUpdate = () => {
          if (notified || !hadController || !navigator.serviceWorker.controller) return;
          notified = true;
          const dict = I18N[currentLang] || I18N.pt;
          showToast(dict.pwaUpdated || 'Nova versão instalada. Recarregue para atualizar.');
        };
        reg.addEventListener('updatefound', () => {
          const worker = reg.installing;
          if (!worker) return;
          worker.addEventListener('statechange', () => {
            if (worker.state === 'installed') notifyUpdate();
          });
        });
        if (reg.waiting) notifyUpdate();
        navigator.serviceWorker.addEventListener('controllerchange', notifyUpdate);
      }).catch(() => {});
    }
    // Servidor de salas opcional: se este host tiver o servidor, habilita
    // criar/entrar por código curto. Sem ele, o fluxo manual continua igual.
    if (netServerLikely()) netServerCheck().then(ok => {
      if (!ok) return;
      let room = '';
      try { room = new URLSearchParams(location.search).get('room') || ''; } catch (e) {}
      room = String(room).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4);
      if (!room) return;
      setLobbySection('online');
      const input = document.getElementById('netServerCode');
      if (input) input.value = room;
      setTimeout(() => netServerJoinRoom(room), 200);
    });
  } catch (err) {
    console.error('❌ Erro ao iniciar o jogo:', err);
    document.body.innerHTML = `<div style="color:red;padding:20px;font-family:monospace"><h2>❌ Erro ao iniciar</h2><pre>${err.stack || err.message}</pre></div>`;
  }
};