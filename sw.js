const CACHE = 'blast-royale-v1.52.0';
const APP_SHELL = [
  './',
  './index.html',
  './script.js',
  './script2.js',
  './firebase-sync.js',
  './social.js',
  './style.css',
  './ui-extra.css',
  './tailwind.css',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
  './audio/explosion.mp3',
  './audio/hit_01.mp3',
  './audio/hit_02.mp3',
  './audio/hit_03.mp3',
  './audio/glass_02.mp3',
  './audio/glass_03.mp3',
  './audio/wooden_01.mp3',
  './audio/slam_05.mp3',
  './audio/slam_06.mp3',
  './audio/spring_03.mp3',
  './audio/bell_01.mp3',
  './audio/bell_02.mp3',
  './audio/noise_02.mp3',
  './audio/music_menu.mp3',
  './audio/music_battle.mp3'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      // cache:'reload' evita instalar arquivos velhos servidos pelo cache HTTP
      // logo após uma atualização do app.
      .then(cache => Promise.all(APP_SHELL.map(url =>
        fetch(new Request(url, { cache: 'reload' }))
          .then(res => {
            if (!res || !res.ok || res.status === 206) throw new Error('app-shell:' + url);
            return cache.put(url, res);
          })
      )))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Sinalização/salas nunca deve vir do cache.
  if (url.origin === self.location.origin && url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(req));
    return;
  }

  if (req.mode === 'navigate') {
    const cachedIndex = () => caches.match('./index.html').then(hit => hit || caches.match('./'));
    event.respondWith(
      fetch(req)
        .then(res => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then(cache => cache.put('./index.html', copy));
            return res;
          }
          // Offline/proxy error pages (ex.: 502) não devem substituir o app shell.
          return cachedIndex().then(hit => hit || res);
        })
        .catch(() => cachedIndex())
    );
    return;
  }

  if (url.origin === self.location.origin) {
    // NETWORK-FIRST em tudo: a versão nova do servidor chega sempre. O cache
    // só entra como fallback quando a rede falha (offline) — assim nenhum
    // aparelho fica preso em arquivo antigo por causa do Service Worker.
    event.respondWith(
      fetch(req)
        .then(res => {
          if (res && res.ok && res.status !== 206) {
            const copy = res.clone();
            caches.open(CACHE).then(cache => cache.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // Terceiros: hoje só as fontes do Google são cacheadas (quando válidas).
  // Tudo o mais (Firebase, RTDB, firestore, um relé via ?server=) NÃO é
  // interceptado pelo SW: o navegador busca direto na rede, senão uma falha
  // sem cache geraria "Failed to convert value to 'Response'" e quebraria.
  const CROSS_ORIGIN_CACHE_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];
  if (!CROSS_ORIGIN_CACHE_HOSTS.includes(url.hostname)) return;

  const cacheable = res => !!res && res.status !== 206 && (res.ok || res.type === 'opaque');
  event.respondWith(
    caches.match(req).then(hit => {
      const network = fetch(req)
        .then(res => {
          if (cacheable(res)) {
            const copy = res.clone();
            caches.open(CACHE).then(cache => cache.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => hit);
      return hit || network;
    })
  );
});
