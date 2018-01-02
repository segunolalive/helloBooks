importScripts('workbox-sw.prod.js');


const workbox = new WorkboxSW({
  skipWaiting: true,
  clientsClaim: true
});


workbox.router.registerRoute(
  /^https:\/\/res\.cloudinary\.com\/hfdd5itnd\/image\/upload\//,
  workbox.strategies.staleWhileRevalidate()
);

workbox.router.registerRoute('/api/v1/', workbox.strategies.networkFirst());
workbox.router.registerRoute('/api-docs/', workbox.strategies.networkFirst());


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open('dynamic')
      .then(cache => (
        cache.match(event.request)
          .then((response) => {
            const fetchPromise = fetch(event.request)
              .then((networkResponse) => {
                if (event.request.method === 'GET') {
                  cache.put(event.request, networkResponse.clone());
                }
                return networkResponse;
              });
            if (event.request.url.match('/api/v1')) {
              return fetchPromise || response;
            }
            return response || fetchPromise;
          })
      )).catch(() => { })
  );
});


workbox.precache([]);
