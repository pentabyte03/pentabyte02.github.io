/* Este archivo debe estar colocado en la carpeta raíz del sitio.
 *
 * Cualquier cambio en el contenido de este archivo hace que el service
 * worker se reinstale. */

/**
 * Cambia el número de la versión cuando cambia el contenido de los
 * archivos.
 *
 * El número a la izquierda del punto (.), en este caso <q>1</q>, se
 * conoce como número mayor y se cambia cuando se realizan
 * modificaciones grandes o importantes.
 *
 * El número a la derecha del punto (.), en este caso <q>00</q>, se
 * conoce como número menor y se cambia cuando se realizan
 * modificaciones menores.
 */
const VERSION = "1.01";

/**
 * Nombre de la carpeta de caché.
 */
const CACHE = "pwamd";

/**
 * Archivos requeridos para que la aplicación funcione fuera de
 * línea.
 */
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

// Verifica si el código corre dentro de un service worker.
if (self instanceof ServiceWorkerGlobalScope) {
  // Evento al empezar a instalar el servide worker,
  self.addEventListener("install", (/** @type {ExtendableEvent} */ evt) => {
    console.log("El service worker se está instalando.");
    evt.waitUntil(llenaElCache());
  });

  // Evento al solicitar información a la red.
  self.addEventListener("fetch", (/** @type {FetchEvent} */ evt) => {
    if (evt.request.method === "GET") {
      evt.respondWith(buscaLaRespuestaEnElCache(evt));
    }
  });

  // Evento cuando el service worker se vuelve activo.
  self.addEventListener("activate", () =>
    console.log("El service worker está activo."),
  );
}

async function llenaElCache() {
  console.log("Intentando cargar caché:", CACHE);
  // Borra todos los cachés.
  const keys = await caches.keys();
  for (const key of keys) {
    await caches.delete(key);
  }
  // Abre el caché de este service worker.
  const cache = await caches.open(CACHE);
  // Carga el listado de ARCHIVOS.
  await cache.addAll(ARCHIVOS);
  console.log("Cache cargado:", CACHE);
  console.log("Versión:", VERSION);
}

/** @param {FetchEvent} evt */
async function buscaLaRespuestaEnElCache(evt) {
  // Abre el caché.
  const cache = await caches.open(CACHE);
  const request = evt.request;
  /* Busca la respuesta a la solicitud en el contenido del caché, sin
   * tomar en cuenta la parte después del símbolo "?" en la URL. */
  const response = await cache.match(request, { ignoreSearch: true });
  if (response === undefined) {
    /* Si no la encuentra, empieza a descargar de la red y devuelve
     * la promesa. */
    return fetch(request);
  } else {
    // Si la encuentra, devuelve la respuesta encontrada en el caché.
    return response;
  }
}
