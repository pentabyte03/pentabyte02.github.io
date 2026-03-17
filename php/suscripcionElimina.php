<?php

function suscripcionElimina(\PDO $bd, string $endpoint)
{
 $stmt =
  $bd->prepare("DELETE FROM SUSCRIPCION WHERE SUS_ENDPOINT = :SUS_ENDPOINT");
 $stmt->execute([":SUS_ENDPOINT" => $endpoint]);
}
