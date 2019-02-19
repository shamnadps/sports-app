var cacheName = '15.31';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(cacheName)
            .then((cache) =>
                cache.addAll(['favicon.ico', 'icon-1024x1024.png'])
            )
    );
});

self.addEventListener('message', function(event) {
    if (event.data.action === 'skipWaiting') {
        event.waitUntil(
            self.skipWaiting().then(() => {
                event.waitUntil(self.clients.claim());
            })
        );
    }
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
