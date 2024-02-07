// prepare caching
const cacheName = "todoAppCache-1"; // name cache version to check if cache update works
const precachedResources = [
  "index.html",
  "js/main.js",
  "js/form.js",
  "manifest.json",
  "icons/bin.svg",
  "icons/manifest-icon-192.maskable.png",
  "icons/manifest-icon-512.maskable.png",
  "fonts/open-sans-v40-latin-regular.woff2",
  "fonts/poppins-v20-latin-300.woff2",
  "fonts/poppins-v20-latin-500.woff2",
  "fonts/poppins-v20-latin-regular.woff2",
  //  resources to be precached
];

async function precache() {
  const cache = await caches.open(cacheName);
  return cache.addAll(precachedResources);
}

// Install service worker
self.addEventListener("install", (event) => {
  console.log("Service worker installed");
  // Precache - service worker only is installed if caching does not fail
  // So if the service worker is installed, caching has succeeded
  event.waitUntil(precache());
});

// When updating, delete old resources
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== cacheName) {
            // Delete outdated cache
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Dynamic caching - cache resources as they are requested
// fetch event is triggered when network request is made
self.addEventListener("fetch", (event) => {
  event.respondWith(
    // checks for requested resource in cache
    caches.match(event.request).then((cachedResponse) => {
      // if in cache, request is returned || if not, resource is fetchd from the network
      return cachedResponse || fetch(event.request);
    })
  );
});
