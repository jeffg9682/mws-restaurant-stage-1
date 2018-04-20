// Referred from: https://developers.google.com/web/fundamentals/getting-started/codelabs/offline
// Referred from: https://una.im/save-offline
// Referred from: https://github.com/GoogleChrome/airhorn
//https://jakearchibald.com/2014/offline-cookbook/

 
var webCacheName = 'mwsnd-stage-1';
 
var cacheFiles = [
  '/',
  '/service-worker.js',
  '/css/styles.css',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/index.html',
  '/restaurant.html'
];
 
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(webCacheName).then(function(cache) {
      return cache.addAll(cacheFiles).then(function() {
      });
    })
  );
});
 
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('mwsnd-');
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
 
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request).then((response) => {
        var resp = response.clone()
            var req = event.request.clone();
        caches.open(webCacheName).then(function(cache) {
          cache.put(req, resp);
        });
        return response;
      });
    })
  );
});