const CACHE_NAME = 'todo-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './app.js',
  './css/styles.css',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// 설치 이벤트 - 파일 캐싱
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 요청 가로채기 - 캐시된 파일 응답
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
