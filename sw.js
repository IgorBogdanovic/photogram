importScripts('/idb.js');
importScripts('/utility.js');

var CACHE_STATIC_NAME = 'static-v1';
var CACHE_DYNAMIC_NAME = 'dynamic-v1';
var STATIC_FILES = [
    '/index.html',
    '/idb.js',
    '/utility.js',
    '/dist/build.js',
    '/dist/0.build.js',
    '/dist/1.build.js',
    '/dist/2.build.js',
    '/dist/3.build.js',
    '/dist/4.build.js',
    '/dist/5.build.js',
    '/dist/6.build.js',
    '/dist/7.build.js',
    '/dist/8.build.js',
    '/dist/9.build.js',
    '/dist/10.build.js',
    '/dist/11.build.js',
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
    '/manifest.json',
    '/',
    '/login',
    '/signup',
    '/terms',
    '/homepage',
    '/edit-profile',
    '/my-notifications',
    '/search'
];
var DYNAMIC_FILES = [];

function trimCache(cacheName, maxItems) {
    caches.open(cacheName)
        .then(function(cache) {
            return cache.keys()
                .then(function(keys) {
                    if (keys.length > maxItems) {
                        cache.delete(keys[0])
                            .then(trimCache(cacheName, maxItems));
                    }
                });
        });
}

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
                    if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
                        return caches.delete(key);
                    }
                }));
            })
    );
    return self.clients.claim();
});

// func should be changed/adapted once everything put on one server (self.origin will be 'http://54.37.227.57/')
function isInArray(string) {
    if (string.indexOf(self.origin) > -1) {
        var cachePath = string.substring(self.origin.length);
        return STATIC_FILES.indexOf(cachePath) > -1;
    } else if (string.indexOf('http://54.37.227.57/storage/') > -1) {
        for (let i = 0; i < DYNAMIC_FILES.length; i++) {
            if (DYNAMIC_FILES[i].url.indexOf(string) > -1) return true;
        }
        return false;
    } else {
        return false;
    }
}

self.addEventListener('fetch', function(event) {
    if (event.request.method === 'GET') {
        if (navigator.onLine && !isInArray(event.request.url)) {
            console.log('from network');
            event.respondWith(
                caches.open(CACHE_DYNAMIC_NAME)
                    .then(function(cache) {
                        return fetch(event.request)
                            .then(function(res) {
                                trimCache(CACHE_DYNAMIC_NAME, 100);
                                cache.put(event.request, res.clone());
                                return res;
                            });
                    })
            );
            caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                    cache.keys()
                        .then(function(keyList) {
                            self.DYNAMIC_FILES = keyList;
                        });
                });
        } else {
            console.log('from cashe');
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
                                            trimCache(CACHE_DYNAMIC_NAME, 100);
                                            cache.put(event.request.url, res.clone());
                                            return res;
                                        });
                                })
                                .catch(function(err) {
                                    return caches.open(CACHE_STATIC_NAME)
                                        .then(function(cache) {
                                            return cache.match('/');
                                        });
                                });
                        }
                    })
            );
        }
    } else return;
});

self.addEventListener('sync', function(event) {
    console.log('[Service Worker] Background syncing', event);
    switch (event.tag) {
        case 'sync-new-comments':
            event.waitUntil(
                readAllData('sync-comments')
                    .then(function(data) {
                        for (let i=0; i < data.length; i++) {
                            setTimeout(() => {
                                let dt = data[i];

                                if (dt.reply_username) {
                                    fetch('http://54.37.227.57/api/comments/', {
                                        method: 'POST',
                                        headers: {
                                            'Accept': 'application/json, text/plain, */*',
                                            'Content-Type': 'application/json',
                                            Authorization: 'Bearer ' + dt.token
                                        },
                                        body: JSON.stringify({
                                            post_id: dt.post_id,
                                            reply_username: dt.reply_username,
                                            body: dt.body
                                        })
                                    })
                                    .then(function(res) {
                                        console.log('Sent data', res);
                                        if (res.ok) {
                                            res.json()
                                                .then(function(resData) {
                                                    var notificationData = {
                                                        paramId: dt.post_id,
                                                        openUrl: 'http://localhost:8081/homepage/comments:',
                                                        typeOfNotf: 'comment',
                                                        body: dt.body
                                                    };
                                                    if (dt.body === resData.data.body) {
                                                        deleteItemFromData('sync-comments', dt.id);
                                                    }
                                                    displaySyncedNotification(notificationData);
                                                });
                                        }
                                    })
                                    .catch(function(err) {
                                        console.log('Error while sending data', err);
                                    });
                                } else {
                                    fetch('http://54.37.227.57/api/comments/', {
                                        method: 'POST',
                                        headers: {
                                            'Accept': 'application/json, text/plain, */*',
                                            'Content-Type': 'application/json',
                                            Authorization: 'Bearer ' + dt.token
                                        },
                                        body: JSON.stringify({
                                            post_id: dt.post_id,
                                            body: dt.body
                                        })
                                    })
                                    .then(function(res) {
                                        console.log('Sent data', res);
                                        if (res.ok) {
                                            res.json()
                                                .then(function(resData) {
                                                    var notificationData = {
                                                        paramId: dt.post_id,
                                                        openUrl: 'http://localhost:8081/homepage/comments:',
                                                        typeOfNotf: 'comment',
                                                        body: dt.body
                                                    };
                                                    if (dt.body === resData.data.body) {
                                                        deleteItemFromData('sync-comments', dt.id);
                                                    }
                                                    displaySyncedNotification(notificationData);
                                                });
                                        }
                                    })
                                    .catch(function(err) {
                                        console.log('Error while sending data', err);
                                    });
                                }
                            }, 5000 + (2000 * i));
                        }
                    })
            );
            break;
        case 'sync-new-posts':
            event.waitUntil(
                readAllData('sync-posts')
                    .then(function(data) {
                        for (let i=0; i < data.length; i++) {
                            setTimeout(() => {
                                let dt = data[i];

                                const postData = new FormData();
                                const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
                                const validVideoTypes = ['video/mp4', 'video/flv', 'video/wmv', 'video/avi', 'video/mpeg', 'video/qt'];
                                if (validImageTypes.indexOf(dt.media.type) > -1) {
                                    postData.append('image', dt.media);
                                } else if (validVideoTypes.indexOf(dt.media.type) > -1) {
                                    postData.append('video', dt.media);
                                }
                                postData.append('description', dt.description);

                                fetch('http://54.37.227.57/api/posts/', {
                                    method: 'POST',
                                    headers: {
                                        Authorization: 'Bearer ' + dt.token
                                    },
                                    body: postData
                                })
                                .then(function(res) {
                                    console.log('Sent data', res);
                                    if (res.ok) {
                                        res.json()
                                            .then(function(resData) {
                                                console.log(resData);
                                                var notificationData = {
                                                    paramId: resData.data.id,
                                                    // openUrl: 'http://localhost:8081/user-id:' + resData.data.user_id + '/photo-detail:',
                                                    openUrl: 'http://localhost:8081/homepage/photo:',
                                                    typeOfNotf: 'post',
                                                    body: 'description: ' + dt.description,
                                                    // image: 'http://54.37.227.57/storage/' + resData.data.media
                                                };
                                                deleteItemFromData('sync-posts', dt.id);
                                                displaySyncedNotification(notificationData);
                                            });
                                    }
                                })
                                .catch(function(err) {
                                    console.log('Error while sending data', err);
                                });
                            }, 5000 + (2000 * i));
                        }
                    })
            );
    }
});

self.addEventListener('notificationclick', function(event) {
    var notification = event.notification;
    // var tempNotfTag = notification.tag;
    // var notificationTag = tempNotfTag.replace(notification.data.id, "");
    // console.log(notification);
    // switch (notificationTag) {
    //     case 'confirm-comment-sync-':
    //         event.waitUntil(
    //             clients.matchAll()
    //                 .then(function(clis) {
    //                     var client = clis.find(function(c) {
    //                         return c.visibilityState === 'visible';
    //                     });
        
    //                     if (client !== undefined) {
    //                         client.navigate(notification.data.url);
    //                         client.focus();
    //                     } else {
    //                         clients.openWindow(notification.data.url);
    //                     }
    //                     notification.close();
    //                 })
    //         );
    // }
    event.waitUntil(
        clients.matchAll()
            .then(function(clis) {
                var client = clis.find(function(c) {
                    return c.visibilityState === 'visible';
                });

                if (client !== undefined) {
                    client.navigate(notification.data.url);
                    client.focus();
                } else {
                    clients.openWindow(notification.data.url);
                }
                notification.close();
            })
    );
});

self.addEventListener('notificationclose', function(event) {
    console.log('Notification was closed', event);
});


// notifications display functionality
function displaySyncedNotification(notificationData) {
    var msgBody;

    if (notificationData.body) {
        msgBody = 'Your ' + notificationData.typeOfNotf + ' ["' + notificationData.body + '"] is synced as the connection is established!';
    } else {
        msgBody = 'Your ' + notificationData.typeOfNotf + 'is synced as the connection is established!';
    }

    var options = {
        body: msgBody,
        // image: notificationData.image,
        icon: './favicon-96x96.png',
        dir: 'ltr',
        lang: 'en-US',
        vibrate: [100, 50, 300],
        badge: './favicon-96x96.png',
        tag: 'confirm-' + notificationData.typeOfNotf + '-sync-' + notificationData.paramId,
        renotify: true,
        data: {
            url: notificationData.openUrl + notificationData.paramId,
            id: notificationData.paramId.toString()
        }
    };

    self.registration.showNotification('>>Your ' + notificationData.typeOfNotf + ' is synced<<', options);
}
//
