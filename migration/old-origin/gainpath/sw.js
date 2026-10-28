// Replaces the old GainPath worker at the old origin. It serves only the
// migration page and deletes only Cache Storage entries (old app shell and
// images). It never reads or writes the page's storage, where the workouts are.
const CACHE = 'gainpath-migrate-v1';
const PAGE = './index.html';

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll([PAGE])));
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith('gainpath-') && k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try { return await fetch(PAGE, { cache: 'no-cache' }); }
      catch { return (await caches.match(PAGE)) || Response.error(); }
    })());
    return;
  }
  // Anything else under this scope (scripts of the old app, images) is gone.
  if (new URL(req.url).origin === self.location.origin && !req.url.endsWith('/sw.js')) {
    event.respondWith(new Response('', { status: 404 }));
  }
});
