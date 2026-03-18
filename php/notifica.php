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
  "subject" => "https://pentabyte02-github-io-1.onrender.com",
  "publicKey" => "BGYcbx7KbK-vLvCGYTnl_kzmHZMMbs6wqf6HYF_Y4TEJyuQAu_27Yn2tBySI6xM8dlVWc4tXByZj7OGrcSTPZe0",
  "privateKey" => "CtDPC1aZXh8Au8j2QVqvH8OqC6Aj5hSNfJCovfOP764"
 ]
];

$webPush = new WebPush(AUTH);

$datos = json_decode(file_get_contents("php://input"), true);
$texto = $datos["mensaje"] ?? "Mensaje vacío";

$mensaje = json_encode([
    "title" => "Pentabyte 💬",
    "body" => $texto
]);

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
