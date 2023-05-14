<?php
include '../../conexion.php';

$id = $_POST['id'];

$delete = $con->query("DELETE FROM pacientes WHERE id = $id");

if ($delete) {
    echo "true";
} else {
    echo "false";
}
mysqli_close($con);
