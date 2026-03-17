/**
 * @param {string[]} paginas
 */
export function resaltaSiEstasEn(paginas) {

 const pathname = location.pathname

 for (const pagina of paginas) {

  if (pathname === pagina) {
   queueMicrotask(() => {
    const tab = document.querySelector(".active")
    if (tab !== null && tab.closest(".scrollable") !== null) {
     tab.scrollIntoView({ inline: "center", block: "end" })
    }
   })
   return `class="active"`
  }

 }

 return ""

}