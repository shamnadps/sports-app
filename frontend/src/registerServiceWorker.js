export default function register() {
    let newWorker;
    if ('serviceWorker' in navigator) {
        // Register the service worker
        navigator.serviceWorker.register('./sw.js').then((reg) => {
            window['updateAvailble'] = false;

            if (reg && reg.active) {
                window.serviceWorkerVar = reg.active;
            }

            if (reg && reg.waiting) {
                window.serviceWorkerVar = reg.waiting;
                window['updateAvailble'] = true;
            }

            if (reg) {
                setInterval(function() {
                    if (reg.waiting) {
                        window['updateAvailble'] = true;
                    }
                    reg.update();
                }, 60000);
            }
            reg.addEventListener('updatefound', () => {
                // An updated service worker has appeared in reg.installing!
                newWorker = reg.installing;

                window.serviceWorkerVar = newWorker;
                newWorker.addEventListener('statechange', () => {
                    // Has service worker state changed?
                    switch (newWorker.state) {
                        case 'installed':
                            // There is a new service worker available, show the notification
                            if (navigator.serviceWorker.controller) {
                                window.localStorage.removeItem(
                                    'cookieSetRefreshFlag'
                                );
                            }
                            break;
                    }
                });
            });
        });

        let refreshing;
        // The event listener that is fired when the service worker updates
        // Here we reload the page
        navigator.serviceWorker.addEventListener(
            'controllerchange',
            function() {
                if (refreshing) return;
                window.location.reload();
                refreshing = true;
            }
        );
    }
}
