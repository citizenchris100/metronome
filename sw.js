// Bump this version string whenever index.html or an asset changes,
// so installed clients pick up the new files.
const CACHE = "metro-v2";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache-first: the app is fully static, so serve from cache and fall back to the
// network (then to the cached shell) only when something is not yet cached.
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((resp) => {
          if (resp && resp.status === 200 && resp.type === "basic") {
            const copy = resp.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
          return resp;
        })
        .catch(() => {
          // Offline + uncached (e.g. a deep-link "./?tempo=120"): serve the cached
          // shell regardless of query string; the app re-reads location.search itself.
          if (req.mode === "navigate") {
            return caches.match("./index.html", { ignoreSearch: true })
              .then((c) => c || caches.match("./", { ignoreSearch: true }));
          }
        });
    })
  );
});
