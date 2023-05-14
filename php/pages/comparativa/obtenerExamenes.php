<?php
include '../../conexion.php';

$result;

//si el usuario no es administrador, no permitir consultar esta informacion.
// if ($userRol > 1) {
//     $result = "Message->Lo sentimos, no cuentas con los permisos requeridos para realizar esta peticón";
// } else {
$sel = $con->query("SELECT distinct(Examen) FROM exameneslaboratorios ORDER BY Examen");
if ($sel) {
    $row_cnt = $sel->num_rows;
    if ($row_cnt > 0) {
        while ($row = mysqli_fetch_assoc($sel)) {
            $examen = $row['Examen'];

            $jsonArray[] = array(
                'Examen' => $examen,
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
