<?php
include '../../conexion.php';

$result;

//si el usuario no es administrador, no permitir consultar esta informacion.
// if ($userRol > 1) {
//     $result = "Message->Lo sentimos, no cuentas con los permisos requeridos para realizar esta peticón";
// } else {
$sel = $con->query(
    "SELECT 
    id,
    Nombre,
    Apellidos,
    Sexo,
    FechaNacimiento,
    Peso,
    Talla
    FROM pacientes"
);
if ($sel) {
    $row_cnt = $sel->num_rows;
    if ($row_cnt > 0) {
        while ($row = mysqli_fetch_assoc($sel)) {
            $id = $row['id'];
            $nombre = $row['Nombre'];
            $apellidos = $row['Apellidos'];
            $sexo = $row['Sexo'];
            $fecha = $row['FechaNacimiento'];
            $peso = $row['Peso'];
            $talla = $row['Talla'];

            $jsonArray[] = array(
                'ID' => $id,
                'Nombre' => $nombre,
                'Apellidos' => $apellidos,
                'Sexo' => $sexo,
                'Fecha' => $fecha,
                'Peso' => $peso,
                'Talla' => $talla
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
