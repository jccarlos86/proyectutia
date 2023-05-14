<?php
include '../conexion.php';

$nombre = $_POST['nombre'];
$usuario = $_POST['usuario'];
$pass = $_POST['contrasena'];
$puesto = $_POST['puesto'];
$idrol = $_POST['idrol'];

$pass_encode = base64_encode($pass);

$create = $con->query("INSERT INTO usuarios 
                (Nombre, Usuario, Contrasena, Puesto, IdRol)
                VALUES 
                ('$nombre', '$usuario', '$pass_encode', '$puesto', $idrol)");

if ($create) {
    echo "true";
} else {
    echo "false";
}
mysqli_close($con);
