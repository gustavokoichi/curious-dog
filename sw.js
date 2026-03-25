const CACHE = 'cachorro-curioso-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

const API_URL = 'https://dogapi.dog/api/v2/facts';

const FALLBACK_FACTS = [
  'Cães têm um olfato 40 vezes mais apurado que o dos humanos.',
  'Um cão pode entender até 250 palavras e gestos.',
  'Os cães sonham, assim como os humanos.',
  'O focinho de cada cão é único, como uma impressão digital.'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))
    )
  );
});

self.addEventListener('fetch', event => {
  if (event.request.url.startsWith(API_URL)) {
    event.respondWith(
      fetch(event.request).catch(() => {
        const fact = FALLBACK_FACTS[Math.floor(Math.random() * FALLBACK_FACTS.length)];
        const body = JSON.stringify({
          data: [{ attributes: { body: fact } }]
        });
        return new Response(body, { headers: { 'Content-Type': 'application/json' } });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
