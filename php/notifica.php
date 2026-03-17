<?php

require_once __DIR__ . "/lib/manejaErrores.php";
require_once __DIR__ . "/../vendor/autoload.php";
require_once  __DIR__ . "/lib/devuelveJson.php";
require_once  __DIR__ . "/Bd.php";
require_once __DIR__ . "/Suscripcion.php";
require_once __DIR__ . "/suscripcionElimina.php";

use Minishlink\WebPush\WebPush;

const AUTH = [
 "VAPID" => [
  "subject" => "https://notipush.rf.gd/",
  "publicKey" => "BMBlr6YznhYMX3NgcWIDRxZXs0sh7tCv7_YCsWcww0ZCv9WGg-tRCXfMEHTiBPCksSqeve1twlbmVAZFv7GSuj0",
  "privateKey" => "vplfkITvu0cwHqzK9Kj-DYStbCH_9AhGx9LqMyaeI6w"
 ]
];

$webPush = new WebPush(AUTH);
$mensaje = "Hola! 👋";

// Envia el mensaje a todas las suscripciones.

$bd = Bd::pdo();
$stmt = $bd->query("SELECT * FROM SUSCRIPCION");
$suscripciones =
 $stmt->fetchAll(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, Suscripcion::class);

foreach ($suscripciones as $suscripcion) {
 $webPush->queueNotification($suscripcion, $mensaje);
}
$reportes = $webPush->flush();

// Genera el reporte de envio a cada suscripcion.
$reporteDeEnvios = "";
foreach ($reportes as $reporte) {
 $endpoint = $reporte->getRequest()->getUri();
 $htmlEndpoint = htmlentities($endpoint);
 if ($reporte->isSuccess()) {
  // Reporte de éxito.
  $reporteDeEnvios .= "<dt>$htmlEndpoint</dt><dd>Éxito</dd>";
 } else {
  if ($reporte->isSubscriptionExpired()) {
   suscripcionElimina($bd, $endpoint);
  }
  // Reporte de fallo.
  $explicacion = htmlentities($reporte->getReason());
  $reporteDeEnvios .= "<dt>$endpoint</dt><dd>Fallo: $explicacion</dd>";
 }
}

devuelveJson(["reporte" => ["innerHTML" => $reporteDeEnvios]]);
