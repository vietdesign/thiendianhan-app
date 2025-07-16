const CACHE_NAME = 'lunar-calendar-v4';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/appstore.png',
  '/favicon.ico'
];

// Thêm timestamp để force update
const APP_VERSION = Date.now();

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // Thông báo cho main thread rằng có update mới
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({ 
              type: 'UPDATE_AVAILABLE',
              version: APP_VERSION 
            });
          });
        });
      })
  );
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', (event) => {
  // Không cache các file JavaScript và CSS để tránh lỗi stale cache
  if (event.request.url.includes('/static/js/') || event.request.url.includes('/static/css/')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // Nếu network fail, thử lấy từ cache làm fallback
          return caches.match(event.request);
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  // Thêm message để force update
  if (event.data && event.data.type === 'FORCE_UPDATE') {
    self.skipWaiting();
    // Gửi message về main thread để reload
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({ type: 'FORCE_RELOAD' });
      });
    });
  }
}); 