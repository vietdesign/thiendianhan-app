const CACHE_NAME = 'lunar-calendar-v' + Date.now(); // Dynamic cache name
const urlsToCache = [
  '/',
  '/manifest.json',
  '/appstore.png',
  '/favicon.ico'
];

// Thêm timestamp để force update
const APP_VERSION = 1752770138287;

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
          // Xóa TẤT CẢ cache cũ, kể cả cache hiện tại nếu khác tên
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

// Fetch event - NEVER cache JavaScript and CSS files
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // KHÔNG BAO GIỜ cache các file JavaScript và CSS
  if (url.pathname.includes('/static/js/') || 
      url.pathname.includes('/static/css/') ||
      url.pathname.endsWith('.js') ||
      url.pathname.endsWith('.css') ||
      url.pathname.includes('main.') ||
      url.pathname.includes('chunk.')) {
    
    event.respondWith(
      fetch(event.request, {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
      .then(response => {
        // Luôn trả về response mới từ network
        return response;
      })
      .catch(error => {
        console.error('Failed to fetch:', event.request.url, error);
        // Nếu network fail, trả về error thay vì cache cũ
        return new Response('Network error', { 
          status: 408,
          statusText: 'Request Timeout'
        });
      })
    );
    return;
  }

  // Với các file khác, dùng network-first strategy thay vì cache-first
  event.respondWith(
    fetch(event.request)
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
        // Fallback to cache only if network fails
        return caches.match(event.request)
          .then((response) => {
            if (response) {
              return response;
            }
            
            // Fallback cho HTML requests
            if (event.request.headers.get('accept')?.includes('text/html')) {
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
  
  // Force update - xóa tất cả cache và reload
  if (event.data && event.data.type === 'FORCE_UPDATE') {
    console.log('🔄 Force update requested');
    
    // Xóa tất cả cache
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          console.log('🗑️ Force deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      console.log('✅ All caches force deleted');
      self.skipWaiting();
      
      // Gửi message về main thread để reload
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({ type: 'FORCE_RELOAD' });
        });
      });
    });
  }
  
  // Clear all caches
  if (event.data && event.data.type === 'CLEAR_ALL_CACHES') {
    console.log('🗑️ Clearing all caches...');
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          console.log('🗑️ Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      console.log('✅ All caches cleared');
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({ type: 'CACHES_CLEARED' });
        });
      });
    });
  }
}); 