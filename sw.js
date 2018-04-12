self.addEventListener('install', function(event) {
    console.log(event);
    event.waitUntil(
        caches.open('static')
            .then(function(cache) {
                console.log('Precaching...');
                cache.addAll([
                    '/index.html',
                    '/dist/build.js',
                    '/dist/build.js.map',
                    '/dist/0.build.js',
                    '/dist/0.build.js.map',
                    '/dist/1.build.js',
                    '/dist/1.build.js.map',
                    '/dist/2.build.js',
                    '/dist/2.build.js.map',
                    '/dist/3.build.js',
                    '/dist/3.build.js.map',
                    '/dist/4.build.js',
                    '/dist/4.build.js.map',
                    '/dist/5.build.js',
                    '/dist/5.build.js.map',
                    '/dist/6.build.js',
                    '/dist/6.build.js.map',
                    '/dist/7.build.js',
                    '/dist/7.build.js.map',
                    '/dist/8.build.js',
                    '/dist/8.build.js.map',
                    '/dist/9.build.js',
                    '/dist/9.build.js.map',
                    '/dist/10.build.js',
                    '/dist/10.build.js.map',
                    '/dist/11.build.js',
                    '/dist/11.build.js.map',
                    '/',
                    '/login',
                    '/signup',
                    '/terms',
                    '/homepage',
                    // '/user-id:',
                    '/edit-profile',
                    '/my-notifications',
                    '/search'
                ]);
            })
    );
});

self.addEventListener('activate', function(event) {
    console.log(event);
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                } else {
                    return fetch(event.request);
                }
            })
    );
});
