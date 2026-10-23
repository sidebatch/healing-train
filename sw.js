const CACHE = 'healing-train-v22';
const CORE = [
  './', './index.html', './train3d.html', './iso.html', './side-view.html',
  './assets/three.min.js', './assets/RGBELoader.js', './assets/GLTFLoader.js', './assets/sky_day.hdr', './assets/sky_sunset.hdr',
  './assets/models/pine-tree.glb', './assets/models/tree-leafy.glb', './assets/models/rock.glb', './assets/models/bush.glb', './assets/models/house.glb', './assets/models/house-2.glb',
  './assets/realroute/meta.json', './assets/realroute/samples.bin', './assets/realroute/grid.bin',
  './assets/pano_rockies.jpg', './assets/ground_meadow.jpg', './assets/ground_forest.jpg', './assets/prop_pine.png', './assets/prop_house.png', './assets/prop_house2.png', './assets/prop_house3.png', './assets/prop_house4.png', './assets/prop_house5.png', './assets/prop_house6.png', './assets/ground_field.jpg', './assets/pano_desert.jpg', './assets/ground_desert.jpg', './assets/prop_palm.png', './assets/pano_sunset.jpg', './assets/pano_snow.jpg', './assets/pano_alpine.jpg', './assets/ground_sunset.jpg', './assets/ground_snow.jpg', './assets/ground_alpine.jpg', './assets/prop_cactus.png', './assets/prop_pine_snow.png', './assets/prop_rock.png',
  './manifest.json',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE && !k.startsWith('sat-tiles')).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.hostname === 'server.arcgisonline.com') {
    // 위성 타일은 캐시 우선 (한 번 본 구간은 다시 받지 않음)
    e.respondWith(
      caches.open('sat-tiles-v1').then(c => c.match(e.request).then(hit => hit || fetch(e.request).then(r => {
        const copy = r.clone(); c.put(e.request, copy); return r;
      })))
    );
    return;
  }
  if (url.origin !== location.origin) return;
  if (url.pathname.endsWith('.mp3')) return; // 음악 파일은 브라우저 스트리밍에 맡김 (레인지 요청 충돌 방지)
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
