function crearCookie(nombre, valor) {
    var d = new Date();
    d.setDate(d.getDate() + 1);
    var caduca = "expires=" + d.toUTCString();
    document.cookie = encodeURI(nombre) + "=" + valor + ";" + caduca + ";path=/";
}

function obtenerCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function validarCookie(nombre) {
    return getCookie(nombre) != "" ? true : false;
}

function eliminarCookie(nombre) {
    crearCookie(nombre, "", -1);
}

function loader(mostrar) {
    switch (mostrar) {
        case true:
            $("body").append(_loader);
            break;
        case false:
            setTimeout(() => {
                $("#Loader").fadeOut(500, function () {
                    $("#Loader").remove();
                });
            }, 300);
            break;
        default: break;
    }
}

function isTest() {
    let _url = window.location.href;
    return _url.startsWith("http") ? false : true;
}

function crearMenu(menu) {
    let menuList = "";
    menu.forEach(_menu => {
        let target = _menu.Target == 1 ? "_blank" : "";
        if (_menu.Submenu == "null") {
            menuList += `<li class="nav-item"><a class="nav-link active" aria-current="page" target="${target}" href="${_menu.Url}">${_menu.Titulo}</a></li>`;
        } else {
            let submenu = crearSubmenu(_menu.Submenu);
            menuList += submenu;
        }
    });
    return menuList;
    // $("#navMenuUsuario > ul").html(menuList);
}

function crearSubmenu(submenu) {

    let _btnDrop = `<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">${submenu[0].Padre}</a>`;
    let submenuList = `<li class="nav-item dropdown">${_btnDrop}<ul class="dropdown-menu">`;
    submenu.forEach(_sub => {
        let target = _sub.Target == 1 ? "_blank" : "";
        if (_sub.Submenu == "null") {
            submenuList += `<li><a class="dropdown-item" target="${target}" href="${_sub.Url}">${_sub.Titulo}</a></li>`;
        } else {
            let _submenu = crearSubmenu(_sub.Submenu);
            submenuList += `${_submenu}`;
        }
    });
    return `${submenuList}</ul></li>`;
}

const _loader = '<div class="loadding-page" id="Loader"><div class="cssload-box-loading"></div></div>';

/**
 * 1.seleccionar el paciente, click en el boton laboratorios
 * 2.pantalla de laboratorios
 *  2.1-pestaña laboratorios, aqui se muestran todos los laboratorios del paciente
 *  2.2-pestaña garficas, aqui se pueden crear determindas graficas, las que requeira el usuario.
 *  
 */