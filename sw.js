var CACHE_STATIC_NAME = 'static-v1';
var CACHE_DYNAMIC_NAME = 'dynamic-v1';
var STATIC_FILES = [
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
    '/dist/3e1af3ef546b9e6ecef9f3ba197bf7d2.ttf',
    '/dist/8dc42d2dd5674cddaf92cb059941ebb9.woff2',
    '/dist/9c1d20db71460837e1270a7769f46aec.eot',
    '/dist/39b2c3031be6b4ea96e2e3e95d307814.woff2',
    '/dist/73f0a88bbca1bec19fb1303c689d04c6.woff2',
    '/dist/878ad7158f6fa9136d796d4bad613bc2.woff',
    '/dist/68889c246da2739681c1065d15a1ab0b.eot',
    '/dist/a858f925b333458f7915e3c5eaa8faaf.woff',
    '/dist/bc5fda0d2825e763b0b32b16e71b77d8.eot',
    '/dist/d0bea41e57cc30eb00f709aa13317ec3.woff2',
    '/dist/d9de5ce0ced6ad5e576149e62f023ae2.ttf',
    '/dist/dc81817def276b4f21395f7ea5e88dcd.woff',
    '/dist/e4d685c1c577a1b0dbe5fe350defd8d6.ttf',
    '/dist/e31fcf1885e371e19f5786c2bdfeae1b.ttf',
    '/dist/ebb94a5be456c711926db5d106828c13.woff',
    '/dist/ecdd509cadbf1ea78b8d2e31ec52328c.eot',
    '/',
    '/login',
    '/signup',
    '/terms',
    '/homepage',
    // '/user-id:',
    '/edit-profile',
    '/my-notifications',
    '/search'
];

self.addEventListener('install', function(event) {
    console.log(event);
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
            .then(function(cache) {
                console.log('Precaching...');
                cache.addAll(STATIC_FILES);
            })
    );
});

self.addEventListener('activate', function(event) {
    console.log(event);
    event.waitUntil(
        caches.keys()
            .then(function(keyList) {
                return Promise.all(keyList.map(function(key) {
                    if ( key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME ) {
                        return caches.delete(key);
                    }
                }));
            })
    );
    return self.clients.claim();
});

function isInArray(string, array) {
    var cachePath;
    if (string.indexOf(self.origin) === 0) { // request targets domain where we serve the page from (i.e. NOT a CDN)
        // console.log('matched ', string);
        cachePath = string.substring(self.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
    } else {
        cachePath = string; // store the full request (for CDNs)
    }
    return array.indexOf(cachePath) > -1;
}

self.addEventListener('fetch', function(event) {
    if (navigator.onLine) {
        console.log('fetch');
        event.respondWith(
            caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                    return fetch(event.request)
                        .then(function(res) {
                            cache.put(event.request, res.clone());
                            return res;
                        });
                })
        );
    } else if (isInArray(event.request.url, STATIC_FILES)) {
        event.respondWith(
            caches.match(event.request)
        );
    } else {
        console.log('cache');
        event.respondWith(
            caches.match(event.request)
                .then(function(response) {
                    if (response) {
                        return response;
                    } else {
                        return fetch(event.request)
                            .then(function(res) {
                                return caches.open(CACHE_DYNAMIC_NAME)
                                    .then(function(cache) {
                                        cache.put(event.request.url, res.clone());
                                        return res;
                                    });
                            })
                            .catch(function(err) {
                                return caches.open(CACHE_STATIC_NAME)
                                    .then(function(cache) {
                                        // if (event.request.headers.get('accept').includes('text/html')) {
                                        //     return cache.match('/');
                                        // }
                                        return cache.match('/');
                                    });
                            });
                    }
                })
        );
    }
});

// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//         caches.match(event.request)
//             .then(function(response) {
//                 if (response) {
//                     console.log('cache');
//                     return response;
//                 } else {
//                     console.log('fetch');
//                     return fetch(event.request)
//                         .then(function(res) {
//                             return caches.open(CACHE_DYNAMIC_NAME)
//                                 .then(function(cache) {
//                                     cache.put(event.request.url, res.clone());
//                                     return res;
//                                 });
//                         })
//                         .catch(function(err) {
//                             return caches.open(CACHE_STATIC_NAME)
//                                 .then(function(cache) {
//                                     // if (event.request.headers.get('accept').includes('text/html')) {
//                                     //     return cache.match('/');
//                                     // }
//                                     return cache.match('/');
//                                 });
//                         });
//                 }
//             })
//     );
// });
