<?php
include '../conexion.php';

//obtener el rol del usuario.
// $userRol = $_POST['rol'];
$result;

//si el usuario no es administrador, no permitir consultar esta informacion.
// if ($userRol > 1) {
//     $result = "Message->Lo sentimos, no cuentas con los permisos requeridos para realizar esta peticón";
// } else {
$sel = $con->query("SELECT u.Id, u.IdRol, u.Nombre, u.Usuario, u.Puesto, r.Descripcion FROM usuarios u INNER JOIN rolesdeusuario r WHERE u.IdRol = r.id");
if ($sel) {
    $row_cnt = $sel->num_rows;
    if ($row_cnt > 0) {
        while ($row = mysqli_fetch_assoc($sel)) {
            $id = $row['Id'];
            $nombre = $row['Nombre'];
            $puesto = $row['Puesto'];
            $descripcionRol = $row['Descripcion'];
            $usuario = $row['Usuario'];
            $idrol = $row['IdRol'];

            $jsonArray[] = array(
                'ID' => $id,
                'Nombre' => $nombre,
                'Puesto' => $puesto,
                'Usuario' => $usuario,
                'Rol' => $descripcionRol,
                'IdRol' => $idrol
            );

            $result = json_encode($jsonArray);
        }
    } else {
        $result = "null";
    }
} else {
    $result = die("Connection failed: " . mysqli_connect_error());
}
// }

echo $result;
mysqli_close($con);
