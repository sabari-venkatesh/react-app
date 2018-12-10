// service-worker.js
// chrome url to inspect service workers: chrome://inspect/#service-workers
// Flag for enabling cache in production
var doCache = false;

var CACHE_NAME = 'pwa-app-cache';
var urlsToCache = [
  '/',
  '/src/app.js'
]
// This triggers when user starts the app
self.addEventListener('install', function (event) {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function (cache) {
          console.log('opened cache');
          return cache.addAll(urlsToCache);
        })
    );
  }
});

self.addEventListener('fetch', function (event) {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        return response || fetch(event.request);
      })
  );
});