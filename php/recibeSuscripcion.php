<?php

require_once __DIR__ . "/lib/BAD_REQUEST.php";
require_once __DIR__ . "/lib/recibeJson.php";
require_once __DIR__ . "/lib/ProblemDetailsException.php";

function recibeSuscripcion()
{

 $objeto = recibeJson();

 if (
  !isset($objeto->authToken)
  || !is_string($objeto->authToken)
  || $objeto->authToken === ""
 )
  throw new ProblemDetailsException([
   "status" => BAD_REQUEST,
   "title" => "El authToken debe ser texto que no esté en blanco.",
   "type" => "/errors/authtokenincorrecto.html",
  ]);

 if (
  !isset($objeto->contentEncoding)
  || !is_string($objeto->contentEncoding)
  || $objeto->contentEncoding === ""
 )
  throw new ProblemDetailsException([
   "status" => BAD_REQUEST,
   "title" => "La contentEncoding debe ser texto que no esté en blanco.",
   "type" => "/errors/contentencodingincorrecta.html",
  ]);

 if (
  !isset($objeto->endpoint)
  || !is_string($objeto->endpoint)
  || $objeto->endpoint === ""
 )
  throw new ProblemDetailsException([
   "status" => BAD_REQUEST,
   "title" => "El endpoint debe ser texto que no esté en blanco.",
   "type" => "/errors/endpointincorrecto.html",
  ]);

 if (
  !isset($objeto->publicKey)
  || !is_string($objeto->publicKey)
  || $objeto->publicKey === ""
 )
  throw new ProblemDetailsException([
   "status" => BAD_REQUEST,
   "title" => "La publicKey debe ser texto que no esté en blanco.",
   "type" => "/errors/publickeyincorrecta.html",
  ]);

 return [
  "SUS_AUT_TOK" => $objeto->authToken,
  "SUS_CONT_ENCOD" => $objeto->contentEncoding,
  "SUS_ENDPOINT" => $objeto->endpoint,
  "SUS_PUB_KEY" => $objeto->publicKey,
 ];
}
