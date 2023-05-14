<?php
include '../../conexion.php';

$result;

//si el usuario no es administrador, no permitir consultar esta informacion.
// if ($userRol > 1) {
//     $result = "Message->Lo sentimos, no cuentas con los permisos requeridos para realizar esta peticón";
// } else {
$sel = $con->query("SELECT Id,Area FROM areasmedicas ORDER BY Area");
if ($sel) {
    $row_cnt = $sel->num_rows;
    if ($row_cnt > 0) {
        while ($row = mysqli_fetch_assoc($sel)) {
            $id = $row['Id'];
            $area = $row['Area'];

            $jsonArray[] = array(
                'ID' => $id,
                'Area' => $area,
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
