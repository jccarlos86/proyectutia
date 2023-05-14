<?php
include '../conexion.php';

$result;

$sel = $con->query("SELECT * FROM rolesdeusuario");
if ($sel) {
    $row_cnt = $sel->num_rows;
    if ($row_cnt > 0) {
        while ($row = mysqli_fetch_assoc($sel)) {
            $id = $row['id'];
            $titulo = $row['Titulo'];
            $descripcion = $row['Descripcion'];

            $jsonArray[] = array(
                'ID' => $id,
                'Titulo' => $titulo,
                'Descripcion' => $descripcion
            );

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
