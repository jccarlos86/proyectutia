$(document).ready(function () {

    $("#loginForm").submit(function (ev) {
        ev.preventDefault();
        loader(true);
        let user = $("#user").val();
        let password = $("#password").val();

        if (isTest()) {
            setTimeout(() => {
                window.location.href = "/pages/perfil.html";
            }, 5000);
        } else {
            $.ajax({
                data: {
                    usuario: user,
                    password: password
                },
                url: "../php/login/login.php",
                type: "post",
                async: true,
                beforeSend: function () {
                    console.log("enviando...");
                },
                success: function (response) {
                    if (response == "null" || response.startsWith("Connection")) {
                        alert("usuario y contraseña no son correctos");
                    } else {
                        crearCookie("user", response);
                        window.location.href = "../pages/perfil.html";
                    }
                },
                error: function (error) {
                    console.log(error);
                    alert(error);
                }
            }).always(function () {
                loader(false);
                console.log("always");
            });
        }



    });

});