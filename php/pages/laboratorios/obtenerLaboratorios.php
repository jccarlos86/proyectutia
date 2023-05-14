<?php
include '../../conexion.php';

$result;

//si el usuario no es administrador, no permitir consultar esta informacion.
// if ($userRol > 1) {
//     $result = "Message->Lo sentimos, no cuentas con los permisos requeridos para realizar esta peticón";
// } else {
$sel = $con->query("SELECT 
        e.id, 
        e.Examen, 
        e.Valor, 
        e.IdPaciente, 
        e.Servicio, 
        e.Cama, 
        e.Fecha, 
        p.Nombre, 
        p.Apellidos 
    FROM exameneslaboratorios e 
    INNER JOIN pacientes p 
        on e.IdPaciente = p.id 
        ORDER BY e.Fecha DESC;");
if ($sel) {
    $row_cnt = $sel->num_rows;
    if ($row_cnt > 0) {
        while ($row = mysqli_fetch_assoc($sel)) {
            $id = $row['id'];
            $examen = $row['Examen'];
            $valor = $row['Valor'];
            $idpaciente = $row['IdPaciente'];
            $servicio = $row['Servicio'];
            $cama = $row['Cama'];
            $fecha = $row['Fecha'];
            $nombre = $row['Nombre'];
            $apellido = $row['Apellidos'];

            $jsonArray[] = array(
                'ID' => $id,
                'Examen' => $examen,
                'Valor' => $valor,
                'IdPaciente' => $idpaciente,
                'Paciente' => $nombre . ' ' . $apellido,
                'Servicio' => $servicio,
                'Cama' => $cama,
                'Fecha' => $fecha
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
