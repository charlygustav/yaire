// ═══════════════════════════════════════════════════════════════════════
// 🌷 Yaire — Service Worker v1.0
// Cache-first strategy for offline support
// ═══════════════════════════════════════════════════════════════════════

const CACHE_NAME = 'yaire-v14';

// Core assets to cache for offline use (essential for first paint)
const CORE_ASSETS = [
  './',
  './index.html',
  './tulip.ico',
  './icon-512.png',
  './icon-192.png',
  './sounds/inicio.wav',
  './sounds/scroll.wav',
  './sounds/flyin.wav',
  './sounds/flyout.wav',
  './sounds/navegacion.wav',
  './sounds/modos.wav',
  './sounds/language.wav',
  './sounds/entry.wav',
];

// Lazy assets — cached on first use (not blocking install)
const LAZY_SOUNDS = [
  './sounds/colors.wav',
  './sounds/correcto.wav',
  './sounds/gameopen.wav',
  './sounds/incorrect.wav',
  './sounds/juego.wav',
  './sounds/revelacion.wav',
  './sounds/seleccionno.wav',
  './sounds/seleccionsi.wav',
  './sounds/slideralto.wav',
  './sounds/sliderbajo.wav',
  './sounds/tarjetas.wav',
  './sounds/transicion.wav',
  './sounds/typing.wav',
  './sounds/perdergirasol.wav',
  './sounds/clickgirasol.wav',
];

// External CDN resources to cache on first fetch
const CDN_ASSETS = [
  'https://cdn.tailwindcss.com/',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Merriweather:ital@0;1&display=swap',
];

// ─── INSTALL ─────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Yaire Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching core assets');
      return cache.addAll(CORE_ASSETS);
    })
  );
  // Activate immediately without waiting for old SW to retire
  self.skipWaiting();
});

// ─── ACTIVATE ────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Yaire Service Worker...');
  // Clean out old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  // Take control of all pages immediately
  self.clients.claim();

  // Background: lazily cache remaining sounds after activation
  event.waitUntil(
    new Promise(resolve => setTimeout(resolve, 2000)).then(() =>
      caches.open(CACHE_NAME).then(cache => {
        return Promise.allSettled(
          LAZY_SOUNDS.map(url => cache.add(url).catch(() => {}))
        );
      })
    )
  );
});

// ─── FETCH ───────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // Strategy: Network-first for HTML (to get fresh content), Cache-first for everything else
  if (request.mode === 'navigate' || request.destination === 'document') {
    // Network-first for navigation (HTML pages)
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache the fresh response
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => {
          // Fallback to cache if offline
          return caches.match(request).then((cached) => cached || caches.match('./index.html'));
        })
    );
    return;
  }

  // Cache-first for all other assets (CSS, JS, images, sounds, fonts)
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request)
        .then((response) => {
          // Don't cache opaque responses or errors
          if (!response || response.status !== 200) {
            // For opaque (no-cors) responses from CDNs, cache them anyway
            if (response && response.type === 'opaque') {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
              return response;
            }
            return response;
          }
          // Cache successful responses
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => {
          // If both cache and network fail, return nothing
          return new Response('', { status: 408, statusText: 'Offline' });
        });
    })
  );
});
