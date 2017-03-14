// This is the service worker
var urls = ["/", "/assets/css/app.css"];


// Pre-caching assets in a Service Worker
self.addEventListener("install", function(event) {
  console.log("The SW is now installed");
  event.waitUntil(
    caches.open("PWACache")
      .then(function(cache) {
        return cache.addAll(urls);
      })
      .then(function() {
        return self.skipWaiting(); // Optional
      })
  );
});


// Serving from Cache First
self.addEventListener("fetch", function(event) {
  event.respondWith(caches.match(event.request) //do you have this request in the cache?
    .then(function(response) {
      if (response) {
        // The request is in the cache
        return response;
      } else {
        // We need to go to the network
        return fetch(event.request);
      }
    })
  )
});

// Serving from Cache and Update resources
// self.addEventListener("fetch", function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         // Even if the response is in the cache, we fetch it
//         // and update the cache for future usage
//         var fetchPromise = fetch(event.request).then(
//           function(networkResponse) {
//             caches.put(event.request, networkResponse.clone());
//             return networkResponse;
//           });
//           // We use the currently cached version if it's there
//           return response || fetchPromise;
//         })
//   );
// });
