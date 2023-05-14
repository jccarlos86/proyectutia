<?php
include '../conexion.php';

function obtenerMenuPorUsuario($rol)
{
    if ($rol == 1) {
        $selMenus = $GLOBALS['con']->query("SELECT * FROM menu WHERE Estatus = 1 AND Padre = '' ORDER BY Orden ASC");
    } else {
        $selMenus =  $GLOBALS['con']->query("SELECT * FROM menu WHERE IdRol like '%$rol%' AND Estatus = 1 AND Padre = '' ORDER BY Orden ASC");
    }

    if ($selMenus) {
        $menu_count = $selMenus->num_rows;
        if ($menu_count > 0) {
            while ($_menu = mysqli_fetch_assoc($selMenus)) {
                $titulo = $_menu['Titulo'];
                $url = $_menu['Url'];
                $target = $_menu['AbrirPestana'];
                $padre = $_menu['Padre'];

                //validar si tiene hijos.
                $_Submenu = obtenerMenusHijos($rol, $titulo);

                $menuArray[] = array(
                    'Titulo' => $titulo,
                    'Url' => $url,
                    'Target' => $target,
                    'Padre' => $padre,
                    'Submenu' => $_Submenu
                );
            }
            $menu = $menuArray;
        } else {
            $menu = "null";
        }
    } else {
        $menu = die("Connection failed: " . mysqli_connect_error());
    }
    return $menu;
}

function obtenerMenusHijos($rolUsuario, $menuPadre)
{
    if ($rolUsuario == 1) {
        $selSubMenus = $GLOBALS['con']->query("SELECT * FROM menu WHERE Estatus = 1 AND Padre = '$menuPadre' ORDER BY Orden ASC");
    } else {
        $selSubMenus =  $GLOBALS['con']->query("SELECT * FROM menu WHERE IdRol like '%$rolUsuario%' AND Estatus = 1 AND Padre = '$menuPadre' ORDER BY Orden ASC");
    }

    if ($selSubMenus) {
        $row_cnt = $selSubMenus->num_rows;
        if ($row_cnt > 0) {
            while ($_menu = mysqli_fetch_assoc($selSubMenus)) {
                $titulo = $_menu['Titulo'];
                $url = $_menu['Url'];
                $target = $_menu['AbrirPestana'];
                $padre = $_menu['Padre'];

                //validar si tiene hijos.
                $_sub = obtenerMenusHijos($rolUsuario, $titulo);

                $menuArray[] = array(
                    'Titulo' => $titulo,
                    'Url' => $url,
                    'Target' => $target,
                    'Padre' => $padre,
                    'Submenu' => $_sub
                );
            }
            $result = $menuArray;
        } else {
            $result = "null";
        }
    } else {
        $result = die("Connection failed: " . mysqli_connect_error());
    }
    return $result;
}
