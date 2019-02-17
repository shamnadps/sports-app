var cacheName = '1.0';

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
