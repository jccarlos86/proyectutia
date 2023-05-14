<?php
include '../conexion.php';

$id = $_POST['id'];

$delete = $con->query("DELETE FROM usuarios WHERE Id = $id");

if ($delete) {
    echo "true";
} else {
    echo "false";
}
mysqli_close($con);