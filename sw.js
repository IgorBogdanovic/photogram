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
      console.log('matched ', string);
      cachePath = string.substring(self.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
    } else {
      cachePath = string; // store the full request (for CDNs)
    }
    return array.indexOf(cachePath) > -1;
}

// self.addEventListener('fetch', function(event) {
//     // var url = 'http://54.37.227.57';
//     // event.request.url.indexOf('http://54.37.227.57') > -1 || event.request.url.indexOf('http://localhost:8081/') > -1
//     // console.log(event.request);

//     if (event.request.mode !== 'navigate' && event.request.redirect !== 'manual' && event.request.url.indexOf('http://54.37.227.57') > -1) {
//         console.log('fetch');
//         event.respondWith(
//             caches.open(CACHE_DYNAMIC_NAME)
//                 .then(function(cache) {
//                     return fetch(event.request)
//                     .then(function(res) {
//                         cache.put(event.request, res.clone());
//                         return res;
//                     });
//                 })
//         );
//     }
//     // else if (isInArray(event.request.url, STATIC_FILES)) {
//     //     event.respondWith(
//     //         caches.match(event.request)
//     //     );
//     // }
//     else {
//         console.log('cache');
//         event.respondWith(
//             caches.match(event.request)
//                 .then(function(response) {
//                     if (response) {
//                         return response;
//                     } else {
//                         return fetch(event.request)
//                             .then(function(res) {
//                                 return caches.open(CACHE_DYNAMIC_NAME)
//                                     .then(function(cache) {
//                                         cache.put(event.request.url, res.clone());
//                                         return res;
//                                     });
//                             })
//                             .catch(function(err) {
//                                 return caches.open(CACHE_STATIC_NAME)
//                                     .then(function(cache) {
//                                         return cache.match('/');
//                                     });
//                             });
//                     }
//                 })
//         );
//     }
// });

self.addEventListener('fetch', function(event) {
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
});
