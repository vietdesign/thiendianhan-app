const CACHE_NAME = 'lunar-calendar-v' + Date.now(); // Dynamic cache name
const urlsToCache = [
  '/',
  '/manifest.json',
  '/appstore.png',
  '/favicon.ico'
];

// Thêm timestamp để force update
const APP_VERSION = 1752680003032;

// Install event - cache resources
self.addEventListener('install', (event) => {
  // Skip waiting để activate ngay lập tức
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache:', CACHE_NAME);
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

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Xóa tất cả cache cũ trừ cache hiện tại
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Claim tất cả clients ngay lập tức
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', (event) => {
  // KHÔNG cache các file JavaScript và CSS để tránh lỗi stale cache
  if (event.request.url.includes('/static/js/') || 
      event.request.url.includes('/static/css/') ||
      event.request.url.includes('.js') ||
      event.request.url.includes('.css')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Luôn trả về response mới từ network
          return response;
        })
        .catch(() => {
          // Nếu network fail, trả về error thay vì cache cũ
          return new Response('Network error', { status: 408 });
        })
    );
    return;
  }

  // Với các file khác, dùng cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Cache miss - fetch from network
        return fetch(event.request)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone response để cache
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Fallback cho HTML requests
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/');
            }
            return new Response('Offline', { status: 503 });
          });
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
    // Xóa tất cả cache
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    }).then(() => {
      self.skipWaiting();
      // Gửi message về main thread để reload
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({ type: 'FORCE_RELOAD' });
        });
      });
    });
  }
}); 