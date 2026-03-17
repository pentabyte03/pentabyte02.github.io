/**
 * @param {Document | HTMLElement | ShadowRoot} raizHtml
 * @param { any } objeto
 */
export function muestraObjeto(raizHtml, objeto) {
 for (const [nombre, definiciones] of Object.entries(objeto)) {
  if (Array.isArray(definiciones)) {
   muestraArray(raizHtml, nombre, definiciones)
  } else if (definiciones !== undefined && definiciones !== null) {
   muestraElemento(raizHtml, nombre, definiciones)
  }
 }
}

/**
 * @param { string } nombre
 */
export function selectorDeNombre(nombre) {
 return `[id="${nombre}"],[name="${nombre}"],[data-name="${nombre}"]`
}

/**
 * @param { Document | HTMLElement | ShadowRoot } raizHtml
 * @param { string } propiedad
 * @param {any[]} valores
 */
function muestraArray(raizHtml, propiedad, valores) {
 const conjunto = new Set(valores)
 const elementos = raizHtml.querySelectorAll(selectorDeNombre(propiedad))
 if (elementos.length === 1 && elementos[0] instanceof HTMLSelectElement) {
  muestraOptions(elementos[0], conjunto)
 } else {
  muestraInputs(elementos, conjunto)
 }

}

/**
 * @param {HTMLSelectElement} select
 * @param {Set<any>} conjunto
 */
function muestraOptions(select, conjunto) {
 for (let i = 0, options = select.options, len = options.length; i < len; i++) {
  const option = options[i]
  option.selected = conjunto.has(option.value)
 }
}

/**
 * @param {NodeListOf<Element>} elementos
 * @param {Set<any>} conjunto
 */
function muestraInputs(elementos, conjunto) {
 for (let i = 0, len = elementos.length; i < len; i++) {
  const elemento = elementos[i]
  if (elemento instanceof HTMLInputElement) {
   elemento.checked = conjunto.has(elemento.value)
  }
 }
}

const data_ = "data-"
const data_Length = data_.length

/**
 * @param {Document | HTMLElement | ShadowRoot} raizHtml
 * @param {string} nombre
 * @param {{ [s: string]: any; } } definiciones
 */
function muestraElemento(raizHtml, nombre, definiciones) {
 const elemento = raizHtml.querySelector(selectorDeNombre(nombre))
 if (elemento !== null) {
  for (const [propiedad, valor] of Object.entries(definiciones)) {
   if (propiedad in elemento) {
    elemento[propiedad] = valor
   } else if (
    propiedad.length > data_Length
    && propiedad.startsWith(data_)
    && elemento instanceof HTMLElement
   ) {
    elemento.dataset[propiedad.substring(data_Length)] = valor
   }
  }
 }
}