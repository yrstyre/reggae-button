self.importScripts('./scripts/utils/util.js');

self.addEventListener('install', event => {
    const urlsToCache = [
        '/',
        '/dist/style.css',
        '/dist/main.js',
        '/scripts/utils/util.js',
        '/songs.json'
    ];

    caches.delete('sw-cache');
    event.waitUntil(
        caches.open('sw-cache')
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
    );
});

// This is called by the browser every time a http request is made.
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') {
        return;
    }

    // Use network if response is fast enough. Otherwise, fall back on cached data.
    event.respondWith(
        fromNetwork(event.request, 200)
            .then(networkResponse => {
                const responseClone = networkResponse.clone();
                caches.open('sw-cache').then(cache => cache.put(event.request, responseClone));
                return networkResponse;
            })
            .catch(() => {
                // If network fails or is too slow, return the cached data
                return caches.match(event.request);
            })
    );
});