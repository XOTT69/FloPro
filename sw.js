const CACHE_NAME='FloPro-v1';
const urlsToCache=['/','index.html','manifest.json','index.html'];

self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache=>{
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch',e=>{
  e.respondWith(
    caches.match(e.request).then(response=>{
      if(response)return response;
      return fetch(e.request).then(networkResponse=>{
        if(!networkResponse||networkResponse.status!==200||networkResponse.type!=='basic')return networkResponse;
        let responseToCache=networkResponse.clone();
        caches.open(CACHE_NAME).then(cache=>{
          cache.put(e.request,responseToCache);
        });
        return networkResponse;
      });
    })
  );
});
