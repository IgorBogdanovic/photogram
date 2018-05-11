importScripts('/idb.js');
importScripts('/utility.js');

var STATIC_FILES = [
    '/index.html',
    '/idb.js',
    '/utility.js',
];

workbox.routing.registerRoute(
    'http://54.37.227.57/(.*)',
    workbox.strategies.networkFirst({
        cacheName: 'cache-posts'
    }),
    'GET'
);

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = STATIC_FILES.concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
