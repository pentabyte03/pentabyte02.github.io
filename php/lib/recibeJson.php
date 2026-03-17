<?php

require_once __DIR__ . "/BAD_REQUEST.php";

function recibeJson()
{
 $json = json_decode(file_get_contents("php://input"));

 if ($json === null) {

  http_response_code(BAD_REQUEST);
  header("Content-Type: application/problem+json; charset=utf-8");

  echo '{' .
   "status: " . BAD_REQUEST .
   '"title": "Los datos recibidos no están en formato JSON."' .
   '"type": "/errors/datosnojson.html"' .
   '}';

  exit();
 }

 return $json;
}
