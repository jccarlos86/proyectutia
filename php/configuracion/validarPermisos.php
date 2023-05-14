<?php
include '../conexion.php';
$usuario = $_POST['usuario'];

function EsAdministrador($usuario)
{
    $sel = $GLOBALS['con']->query("SELECT * FROM usuarios WHERE IdRol = 1 AND Usuario = '$usuario' LIMIT 1");
    if ($sel) {
        $row_cnt = $sel->num_rows;
        if ($row_cnt > 0) {
            $result = "true";
        } else {
            $result = "false";
        }
    } else {
        $result = die("Connection failed: " . mysqli_connect_error());
    }

    return $result;
    mysqli_close($GLOBALS['con']);
}
