<?php
include '../conexion.php';

//obtener el rol del usuario.
$params = $_POST['update'];
$id = $_POST['id'];
// $data = json_decode($params, true);
$result;

//si el usuario no es administrador, no permitir consultar esta informacion.
// if ($userRol > 1) {
//     $result = "Message->Lo sentimos, no cuentas con los permisos requeridos para realizar esta peticón";
// } else {
$upadte = $con->query("UPDATE usuarios SET $params WHERE Id = $id");

if ($upadte) {
    $result = "true";
} else {
    $result = die("Connection failed: " . mysqli_connect_error());
}
// }
// header('Content-type:text/html;charset=utf-8');
// echo "{$a["name"]} is a {$a["occupation"]}";
echo $result;
mysqli_close($con);
