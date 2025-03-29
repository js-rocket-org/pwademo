const CACHE_VERSION = 8;
const APP_NAME = "template_pwa";
const CACHE_NAME = `${APP_NAME}-${CACHE_VERSION}`;
const CACHE_FILES = [
  //##START
  "/pwademo",
  "/pwademo/",
  "/pwademo/assets/AppButton.js",
  "/pwademo/assets/common.js",
  "/pwademo/assets/Header.js",
  "/pwademo/assets/index.js",
  "/pwademo/assets/index2.js",
  "/pwademo/assets/index3.js",
  "/pwademo/assets/index4.js",
  "/pwademo/assets/index5.js",
  "/pwademo/assets/index6.js",
  "/pwademo/assets/logo.svg",
  "/pwademo/assets/mainapp.css",
  "/pwademo/assets/mainapp.js",
  "/pwademo/assets/qrscan.worker-6vcR5_eL.js",
  "/pwademo/assets/qrscan_worker.js",
  "/pwademo/assets/web.worker-CxuvhsjC.js",
  "/pwademo/assets/web_worker.js",
  "/pwademo/assets/zbar.wasm",
  "/pwademo/ca.crt",
  "/pwademo/index.html",
  "/pwademo/logo192.png",
  "/pwademo/logo32.png",
  "/pwademo/logo512.png",
  "/pwademo/manifest.json",
  "/pwademo/offline.html",
  "/pwademo/robots.txt",
  "/pwademo/sw_worker.js"
  //##END
];
const installHandler = (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(
      (cache) => Promise.all([
        cache.addAll(CACHE_FILES.map((file) => new Request(file, { cache: "no-cache" })))
      ])
    ).catch((err) => console.error("install error", err))
  );
};
const activateHandler = (e) => {
  e.waitUntil(
    caches.keys().then(
      (names) => Promise.all(
        names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      )
    )
  );
};
const fetchHandler = (e) => {
  const { request } = e;
  e.respondWith(
    (async () => {
      try {
        const response = await caches.match(request, { ignoreVary: true, ignoreSearch: true });
        if (response) {
          return response.redirected ? cleanRedirect(response) : response;
        }
        const fetchResponse = await fetch(e.request);
        if (fetchResponse) {
          return fetchResponse;
        }
      } catch (_err) {
        return await caches.match("/offline.html");
      }
    })()
  );
};
self.addEventListener("install", installHandler);
self.addEventListener("activate", activateHandler);
self.addEventListener("fetch", fetchHandler);
