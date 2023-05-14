<?php
include '../../conexion.php';

$examenes = $_GET['examenes'];
$servicio = $_GET['servicio'];
$area = $_GET['area'];
$hoy = $_GET['hoy'];
$ayer = $_GET['ayer'];

$result;

/**
 * SELECT * FROM `pacientes` where IdArea = 25;
 * SELECT * FROM `exameneslaboratorios` where IdPaciente in (6,7,8,9);
 * SELECT * FROM `exameneslaboratorios` where Examen IN ('BILIRRUBINA DIRECTA', 'BILIRRUBINA TOTAL') AND Servicio = 'utia';
 */

//si el usuario no es administrador, no permitir consultar esta informacion.
// if ($userRol > 1) {
//     $result = "Message->Lo sentimos, no cuentas con los permisos requeridos para realizar esta peticón";
// } else {
$sel = $con->query(
    "SELECT 
    e.Examen,
    e.Valor,
    e.Fecha,
    e.Cama,
    p.Nombre,
    P.Apellidos,
    P.Sexo
    FROM pacientes p 
    INNER JOIN exameneslaboratorios e 
    ON e.IdPaciente = p.id 
    WHERE p.IdArea = $area 
    AND e.Examen IN $examenes
    AND e.Servicio = '$servicio'
    AND e.Fecha >= '$ayer'
    AND e.Fecha <= '$hoy'
    ORDER BY e.Cama ASC, e.Examen ASC, e.Fecha ASC"
);
if ($sel) {
    $row_cnt = $sel->num_rows;
    if ($row_cnt > 0) {
        while ($row = mysqli_fetch_assoc($sel)) {
            $examen = $row['Examen'];
            $valor = $row['Valor'];
            $fecha = $row['Fecha'];
            $cama = $row['Cama'];
            $nombre = $row['Nombre'];
            $apellido = $row['Apellidos'];
            $sexo = $row['Sexo'];

            $jsonArray[] = array(
                'Examen' => $examen,
                'Valor' => $valor,
                'Fecha' => $fecha,
                'Cama' => $cama,
                'Nombre' => $nombre,
                'Apellidos' => $apellido,
                'Sexo' => $sexo
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
