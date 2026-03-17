/**
 * Si un elemento HTML tiene un mensaje de validación, lo
 * muestra en su elemento de ayuda; en caso contrario, muestra
 * un mensaje de ayuda. 
 * @param { {
 *   validity: { valid: boolean };
 *   validationMessage: string
 *  } } elementoHtml elemento que contiene datos de validación.
 * @param { HTMLElement } elementoDeAyuda elemento fonde
 * se muestran los elementos de validación para elementoHtml.
 * @param { string } mensajeDeAyuda mensaje de ayuda cuando el
 *  estado de elementoHtml es válido.
 */
export function muestraTextoDeAyuda(elementoHtml, elementoDeAyuda,
 mensajeDeAyuda) {
 if (elementoHtml.validity.valid) {
  elementoDeAyuda.textContent = mensajeDeAyuda
 } else {
  elementoDeAyuda.textContent = elementoHtml.validationMessage
 }
}