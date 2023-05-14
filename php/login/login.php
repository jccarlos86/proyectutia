<?php
include '../conexion.php';
include '../menuPorUsuario.php';

$usuario = $_POST['usuario'];
$password = $_POST['password'];

$passwordEncode = base64_encode($password);

$result;

$sel = $con->query("SELECT * FROM usuarios WHERE Contrasena = '$passwordEncode' AND Usuario = '$usuario' LIMIT 1");

if ($sel) {
    $row_cnt = $sel->num_rows;
    if ($row_cnt > 0) {
        while ($row = mysqli_fetch_assoc($sel)) {
            $nombre = $row['Nombre'];
            $puesto = $row['Puesto'];
            $rol = $row['IdRol'];
            $usuario = $row['Usuario'];

            $jsonArray[] = array(
                'Nombre' => $nombre,
                'Puesto' => $puesto,
                'Usuario' => $usuario,
                'Rol' => $rol,
                'Menu' => obtenerMenuPorUsuario($rol)
            );
            session_start();
            $_SESSION['user_rol'] = $rol;
            $result = json_encode($jsonArray);
        }
    } else {
        $result = "null";
    }
} else {
    $result = die("Connection failed: " . mysqli_connect_error());
}

echo $result;
mysqli_close($con);
