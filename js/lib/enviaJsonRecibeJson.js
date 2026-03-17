
/**
 * @param { string } url
 * @param { Object } body
 * @param { "GET" | "POST"| "PUT" | "PATCH" | "DELETE" | "TRACE" | "OPTIONS"
 *  | "CONNECT" | "HEAD" } metodoHttp
 */
export async function enviaJsonRecibeJson(url, body, metodoHttp = "POST") {
 return fetch(
  url,
  {
   method: metodoHttp,
   headers: {
    "Content-Type": "application/json",
    "Accept": "application/json, application/problem+json"
   },
   body: JSON.stringify(body)
  }
 )
}