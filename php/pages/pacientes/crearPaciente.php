<?php
include '../../conexion.php';

$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$sexo = $_POST['sexo'];
$fecha = $_POST['fecha'];
$peso = $_POST['peso'];
$talla = $_POST['talla'];

$result;

//validar si ya existe el paciente
$select = $con->query(
    "SELECT * FROM pacientes
    WHERE 
        Nombre = '$nombre' AND
        Apellidos = '$apellido' AND
        Sexo = '$sexo' AND
        FechaNacimiento = '$fecha'"
);

if ($select) {
    $row_cnt = $select->num_rows;
    if ($row_cnt > 0) {
        $result = "false";
    } else {
        $create = $con->query(
            "INSERT INTO pacientes 
            (Nombre, Apellidos, Sexo, FechaNacimiento, Peso, Talla)
            VALUES ('$nombre', '$apellido', '$sexo', '$fecha', '$peso', '$talla')"
        );

        if ($create) {
            $result = "true";
        } else {
            $result = "Error: ocurrió un error al intentar crear el nuevo paciente.";
        }
    }
} else {
    $result = "Error: Error al tratar consultar los pacientes.";
}
echo $result;
mysqli_close($con);
