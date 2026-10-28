// GainPath service worker — app-shell caching only. Bump CACHE_NAME whenever
// SHELL_URLS/LIB_URLS or the caching logic below changes; activate() deletes
// the app's own older caches (see ownsCache) and nothing else.
const CACHE_NAME = 'gainpath-v54';
// Exercise images (all .webp) are fetched the first time they are shown and kept
// here. This cache is not tied to CACHE_NAME, so a release never makes phones
// download them again, and install stays small (the shell, libraries and
// tutorial screenshots only).
const IMG_CACHE = 'gainpath-img-v1';
// CacheStorage is shared by every app on this origin (a GitHub Pages user site
// hosts several projects), so cleanup and lookups only ever touch the names
// this file creates: gainpath-v<N> and gainpath-img-v<N>.
const ownsCache = (name) => /^gainpath-(v|img-v)\d+$/.test(name);
// Look in our own caches only, never caches.match(), which searches every cache
// on the origin and could return another app's response for the same URL.
async function cachedResponse(req) {
  for (const name of [CACHE_NAME, IMG_CACHE]) {
    const hit = await (await caches.open(name)).match(req);
    if (hit) return hit;
  }
  return undefined;
}
// Keep a network response only if it succeeded. An error page (404/500 from the
// host during a bad deploy) is never stored, and never replaces a good cached
// copy: the cached one is served instead, and the error is shown only when
// there is nothing better.
function keepIfOk(req, res) {
  if (res.ok) {
    const copy = res.clone();
    caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
    return res;
  }
  return cachedResponse(req).then((cached) => cached || res);
}
// Chart.js, jsPDF and EmailJS are loaded on demand by loadLib() (js/ui-core.js)
// from vendor/, not at startup. Precached best-effort (like the images) so
// charts, the PDF report and feedback also work offline; install doesn't fail
// if one is missing, and a miss is fetched and cached on first use.
const LIB_URLS = [
  './vendor/chart-4.4.1.min.js',
  './vendor/jspdf-2.5.1.min.js',
  './vendor/emailjs-browser-4.4.1.min.js'
];
// The tutorial screenshots are lazy-loaded (they are not fetched until the
// tutorial opens), so they are precached here, best-effort, to keep the tutorial
// working offline for someone who never opened it online.
const TUTORIAL_IMAGE_URLS = [
  './images/tutorial/calendar.png',
  './images/tutorial/climb.png',
  './images/tutorial/day-editor.png',
  './images/tutorial/home.png',
  './images/tutorial/plate-calc.png',
  './images/tutorial/program-builder.png',
  './images/tutorial/prs.png',
  './images/tutorial/reports.png',
  './images/tutorial/rest-timer.png',
  './images/tutorial/settings.png',
  './images/tutorial/workout.png'
];
const SHELL_URLS = [
  './', './index.html', './manifest.json', './privacy.html',
  './images/branding/favicon-16.png', './images/branding/favicon-32.png',
  './images/branding/apple-touch-icon.png', './images/branding/logo.png',
  // Self-hosted Kinetic Athletic fonts (latin subset) — precached so the
  // reskin renders offline without any fonts.googleapis.com dependency.
  './fonts/archivo-latin-var.woff2', './fonts/space-grotesk-latin-var.woff2',
  './fonts/space-mono-latin-400.woff2', './fonts/space-mono-latin-700.woff2',
  // Tabler icons, self-hosted for the same reason. The CDN build used to live
  // in CDN_URLS, but only its stylesheet was ever cached — the font file it
  // references was not, so offline every icon in the app rendered as an empty
  // box. A stylesheet and the font it depends on must cache together.
  './fonts/tabler-icons.css', './fonts/tabler-icons-subset.woff2',
  // App code: plain scripts under js/, in index.html's load order. The ?v= is
  // APP_VERSION, so each release precaches fresh URLs (visual-check enforces it).
  './js/boot.js?v=2.14.0',
  './js/exercises.js?v=2.14.0',
  './js/exercise-text-en.js?v=2.14.0',
  // Japanese and Korean are loaded on demand (loadExText) but precached so switching language works offline.
  './js/exercise-text-ja.js?v=2.14.0',
  './js/exercise-text-ko.js?v=2.14.0',
  './js/state.js?v=2.14.0',
  './js/i18n.js?v=2.14.0',
  './js/storage.js?v=2.14.0',
  './js/ui-core.js?v=2.14.0',
  './js/onboarding.js?v=2.14.0',
  './js/math.js?v=2.14.0',
  './js/history.js?v=2.14.0',
  './js/settings.js?v=2.14.0',
  './js/day-edit.js?v=2.14.0',
  './js/workout.js?v=2.14.0',
  './js/climb.js?v=2.14.0',
  './js/photos.js?v=2.14.0',
  './js/data-safety.js?v=2.14.0',
  './js/main.js?v=2.14.0'
];
// Network first, but never wait for it forever: on a weak or hung connection
// (a basement gym) the cached copy is served after NET_WAIT_MS. The slow request
// keeps running (waitUntil) and is stored when it finally arrives.
const NET_WAIT_MS = 2500;
function networkOrCache(event, req, fromCache) {
  const net = fetch(req).then((res) => keepIfOk(req, res));
  event.waitUntil(net.catch(() => {}));
  const slow = new Promise((_, reject) => setTimeout(() => reject(new Error('slow network')), NET_WAIT_MS));
  return Promise.race([net, slow]).catch(() => fromCache().then((c) => c || net)).catch(() => Response.error());
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(SHELL_URLS).then(() =>
        Promise.all([
          // Same-origin libraries loaded on demand (see LIB_URLS).
          ...TUTORIAL_IMAGE_URLS.map((url) =>
            fetch(url).then((res) => { if (res.ok) return cache.put(url, res); }).catch(() => {})
          ),
          ...LIB_URLS.map((url) =>
            fetch(url).then((res) => { if (res.ok) return cache.put(url, res); }).catch(() => {})
          )
        ])
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.filter((n) => ownsCache(n) && n !== CACHE_NAME && n !== IMG_CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== 'GET') return;

  if (req.mode === 'navigate') {
    event.respondWith(networkOrCache(event, req, () => cachedResponse(req).then((c) => c || cachedResponse('./index.html'))));
    return;
  }

  const sameOrigin = url.origin === self.location.origin;

  if (sameOrigin && req.destination === 'image') {
    event.respondWith(
      cachedResponse(req).then((cached) => cached || fetch(req).then((res) => {
        const onDemand = url.pathname.includes('/images/exercises/') && url.pathname.endsWith('.webp');
        if (res.ok) { const copy = res.clone(); caches.open(onDemand ? IMG_CACHE : CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {}); }
        return res;
      }))
    );
    return;
  }

  if (sameOrigin) {
    // Sub-resources are cache-first: scripts carry ?v=<APP_VERSION> and the rest
    // of the shell is replaced as a whole by the worker update, so a cached copy
    // is never stale, and a weak signal can't stall the exercise-text files.
    // Only what was never cached goes to the network.
    event.respondWith(cachedResponse(req).then((c) => c || networkOrCache(event, req, () => cachedResponse(req))));
  }
});

// Focus (or open) the app when a rest-timer notification is tapped.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      if (clients.openWindow) return clients.openWindow('./');
    })
  );
});
