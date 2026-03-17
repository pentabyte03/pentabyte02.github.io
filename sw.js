/* Este archivo debe estar colocado en la carpeta raíz del sitio. */

const VERSION = "2.0";
const CACHE = "pwamd";

// 🔥 TU DOMINIO
const URL_SERVIDOR = "https://pentabyte02-github-io-1.onrender.com";

const ARCHIVOS = [
  "ayuda.html",
  "favicon.ico",
  "index.html",
  "select.html",
  "site.webmanifest",

  /* CSS */
  "css/baseline.css",
  "css/colors.css",
  "css/elevation.css",
  "css/estilos.css",
  "css/material-symbols-outlined.css",
  "css/md-filled-button.css",
  "css/md-filled-text-field.css",
  "css/md-headline.css",
  "css/md-list.css",
  "css/md-menu.css",
  "css/md-outline-button.css",
  "css/md-tab.css",
  "css/motion.css",
  "css/palette.css",
  "css/roboto.css",
  "css/shape.css",
  "css/state.css",
  "css/transicion_pestanas.css",
  "css/typography.css",
  "css/theme/dark.css",
  "css/theme/light.css",

  /* ERRORES */
  "errors/authtokenincorrecto.html",
  "errors/contentencodingincorrecta.html",
  "errors/datosnojson.html",
  "errors/endpointincorrecto.html",
  "errors/errorinterno.html",
  "errors/publickeyincorrecta.html",
  "errors/resultadonojson.html",

  /* FONTS */
  "fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].codepoints",
  "fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].ttf",
  "fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].woff2",
  "fonts/roboto-v32-latin-regular.woff2",

  /* IMÁGENES */
  "img/icono2048.png",
  "img/maskable_icon.png",
  "img/maskable_icon_x128.png",
  "img/maskable_icon_x192.png",
  "img/maskable_icon_x384.png",
  "img/maskable_icon_x48.png",
  "img/maskable_icon_x512.png",
  "img/maskable_icon_x72.png",
  "img/maskable_icon_x96.png",
  "img/screenshot_horizontal.png",
  "img/screenshot_vertical.png",

  /* JS */
  "js/nav-tab-fixed.js",
  "js/lib/abreElementoHtml.js",
  "js/lib/activaNotificacionesPush.js",
  "js/lib/calculaDtoParaSuscripcion.js",
  "js/lib/cancelaSuscripcionPush.js",
  "js/lib/cierraElementoHtmo.js",
  "js/lib/consume.js",
  "js/lib/descargaVista.js",
  "js/lib/enviaJsonRecibeJson.js",
  "js/lib/ES_APPLE.js",
  "js/lib/getAttribute.js",
  "js/lib/getSuscripcionPush.js",
  "js/lib/manejaErrores.js",
  "js/lib/muestraError.js",
  "js/lib/muestraObjeto.js",
  "js/lib/muestraTextoDeAyuda.js",
  "js/lib/ProblemDetailsError.js",
  "js/lib/querySelector.js",
  "js/lib/recibeJson.js",
  "js/lib/registraServiceWorker.js",
  "js/lib/resaltaSiEstasEn.js",
  "js/lib/suscribeAPush.js",
  "js/lib/urlBase64ToUint8Array.js",

  /* CUSTOM COMPONENTS */
  "js/lib/custom/md-app-bar.js",
  "js/lib/custom/md-options-menu.js",
  "js/lib/custom/md-select-menu.js",

  /* POLYFILL */
  "ungap/custom-elements.js",

  "/",
];

// ==============================
// 🧠 SERVICE WORKER BASE
// ==============================

if (self instanceof ServiceWorkerGlobalScope) {
  self.addEventListener("install", (evt) => {
    console.log("SW instalando...");
    evt.waitUntil(llenaElCache());
  });

  self.addEventListener("fetch", (evt) => {
    if (evt.request.method === "GET") {
      evt.respondWith(buscaEnCache(evt));
    }
  });

  self.addEventListener("activate", () => {
    console.log("SW activo 🔥");
  });
}

// ==============================
// 💾 CACHE
// ==============================

async function llenaElCache() {
  const keys = await caches.keys();
  for (const key of keys) {
    await caches.delete(key);
  }

  const cache = await caches.open(CACHE);
  await cache.addAll(ARCHIVOS);

  console.log("Cache listo:", VERSION);
}

async function buscaEnCache(evt) {
  const cache = await caches.open(CACHE);
  const response = await cache.match(evt.request, { ignoreSearch: true });

  return response || fetch(evt.request);
}

// ==============================
// 🔔 PUSH NOTIFICATIONS
// ==============================

self.addEventListener("push", (event) => {
  console.log("🔥 Push recibido");

  let data = {
    title: "Notificación",
    body: "Nuevo mensaje 👀",
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "img/icono2048.png",
      badge: "img/icono2048.png",
      vibrate: [100, 50, 100],
      data: {
        url: URL_SERVIDOR,
      },
    }),
  );
});

// ==============================
// 🖱 CLICK EN NOTIFICACIÓN
// ==============================

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientes) => {
      for (const cliente of clientes) {
        if (cliente.url.includes(URL_SERVIDOR)) {
          return cliente.focus();
        }
      }
      return self.clients.openWindow("/");
    }),
  );
});
