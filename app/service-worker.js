// ================= SERVICE WORKER — AUTO UPDATE =================

const CACHE_VERSION = "Veo-3 • v5.2"; // ⬅️ GANTI SETIAP ADA UPDATE BESAR
const CACHE_NAME = `cache-${CACHE_VERSION}`;

const ASSETS = [
  "./",
  "./index.html",
  "./main.js",
  "./manifest.json",
   // ===== DICTIONARY FILES =====
   "./dictionary/index.js",
   "./dictionary/location.js",
   "./dictionary/nature.js",
   "./dictionary/skyWeather.js",
   "./dictionary/childAction.js",
   "./dictionary/educationAction.js",
   "./dictionary/objectEducation.js",
   "./dictionary/expressionMood.js",
   "./dictionary/compositionCamera.js"
];

// INSTALL: cache file baru
self.addEventListener("install", event => {
  self.skipWaiting(); // ⬅️ langsung aktif
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// FETCH: network first, fallback cache
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // simpan versi terbaru ke cache
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // jika offline, pakai cache
        return caches.match(event.request);
      })
  );
});