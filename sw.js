/* Service worker minimal.
   Stratégie : réseau d'abord, cache en secours.
   C'est le choix qui compte quand la mise en production est un git push :
   un nouvel épisode poussé est visible au rechargement suivant, sans purge
   de cache à faire faire au joueur. Le cache ne sert qu'au hors connexion. */
const CACHE = "rattrapage-v1";
const SOCLE = ["./", "./index.html", "./manifest.json", "./data/index.json"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SOCLE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(noms => Promise.all(noms.filter(n => n !== CACHE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  if (new URL(req.url).origin !== self.location.origin) return; // Google Fonts : cache navigateur

  e.respondWith(
    fetch(req)
      .then(res => {
        const copie = res.clone();
        caches.open(CACHE).then(c => c.put(req, copie)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then(r => r || caches.match("./index.html")))
  );
});
