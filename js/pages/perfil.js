
$(document).ready(function () {
    loader(true);
    if (isTest()) {
        $("#loggedUser").html("Bienvenido usuario prueba");
    } else {
        let cookie = obtenerCookie("user");
        let isValid = cookie !== "" ? true : false;
        if (isValid) {
            let userData = JSON.parse(cookie);
            $("#loggedUserName").html(userData[0].Nombre);
            $("#loggedUser").html(userData[0].Usuario);
            $("#loggedUserProfession").html(userData[0].Puesto);
            let Menu = crearMenu(userData[0].Menu);
            $("#navMenuUsuario > ul").html(Menu);
            $("#btnLogOut").click(function (e) {
                e.preventDefault();
                eliminarCookie("user");
                window.location.href = "../index.html";
            });
        } else {
            window.location.href = "../index.html";
        }
    }
    loader(false);
});