<?php
include '../../conexion.php';

$id = $_POST['id'];

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
e.Seccion,
p.Nombre, 
p.Apellidos,
p.FechaNacimiento,
p.Sexo,
m.Minimo,
m.Maximo
FROM exameneslaboratorios e 
left JOIN minimosmaximosexamenes m
on m.Examen = e.Examen
RIGHT JOIN pacientes p 
on e.IdPaciente = p.id 
WHERE e.IdPaciente = '$id'
ORDER BY e.Seccion ASC, e.Examen ASC, e.Fecha DESC;");

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
            $sexo = $row['Sexo'];
            $fechanacimiento = $row['FechaNacimiento'];
            $seccion = $row['Seccion'];
            $minimo = $row['Minimo'];
            $maximo = $row['Maximo'];

            $jsonArray[] = array(
                'ID' => $id,
                'Examen' => $examen,
                'Valor' => $valor,
                'IdPaciente' => $idpaciente,
                'Nombre' => $nombre,
                'Apellido' => $apellido,
                'Servicio' => $servicio,
                'Cama' => $cama,
                'Fecha' => $fecha,
                'Genero' => $sexo,
                'FechaNacimiento' => $fechanacimiento,
                'Seccion' => $seccion,
                'Minimo' => $minimo,
                'Maximo' => $maximo
            );

            $result = json_encode($jsonArray);
        }
    } else {
        $result = json_encode([]);
    }
} else {
    $result = die("Connection failed: " . mysqli_connect_error());
}
// }

echo $result;
mysqli_close($con);
