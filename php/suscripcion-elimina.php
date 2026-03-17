<?php

require_once __DIR__ . "/lib/manejaErrores.php";
require_once __DIR__ . "/lib/devuelveNoContent.php";
require_once  __DIR__ . "/Bd.php";
require_once  __DIR__ . "/recibeSuscripcion.php";
require_once  __DIR__ . "/suscripcionElimina.php";

$modelo = recibeSuscripcion();
suscripcionElimina(Bd::pdo(), $modelo["SUS_ENDPOINT"]);
devuelveNoContent();
