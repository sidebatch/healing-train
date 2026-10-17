const CACHE = 'healing-train-v2';
const CORE = [
  './', './index.html', './train3d.html', './iso.html', './side-view.html',
  './assets/three.min.js', './assets/RGBELoader.js', './assets/sky_day.hdr', './assets/sky_sunset.hdr', './manifest.json',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  const isDoc = e.request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname.endsWith('/');
  if (isDoc) {
    // 문서는 네트워크 우선: 업데이트가 바로 보이고, 오프라인이면 캐시로
    e.respondWith(
      fetch(e.request)
        .then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
        .catch(() => caches.match(e.request, { ignoreSearch: true }))
    );
  } else {
    // 정적 파일은 캐시 우선
    e.respondWith(
      caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).then(r => {
        const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r;
      }))
    );
  }
});
