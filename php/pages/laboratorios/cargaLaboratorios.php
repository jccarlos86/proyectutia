<?php
include '../../conexion.php';

$inserts = $_POST['datos'];

$create = $con->query("INSERT INTO exameneslaboratorios (Examen, Valor, IdPaciente, Servicio, Cama, Fecha, Seccion) VALUES $inserts");

if ($create) {
    echo "true";
} else {
    echo "false";
}
mysqli_close($con);
