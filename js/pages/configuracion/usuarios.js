const btnActions = `<td class="text-center align-middle"><div class="btn-group align-top"><button class="btn btn-sm btn-primary badge btn-editar" type="button" data-bs-toggle="modal" data-bs-target="#user-form-modal">Editar</button><button class="btn btn-sm btn-danger badge btn-eliminar" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">Eliminar</button></div></td>`;
var Users;
var Keys;
var EditUser = false;
var DataUser;

function actualizarUsuario() {
    let _data = "";
    $("#nombreUsuario").val() !== '' ? _data += "Nombre='" + encodeURI($("#nombreUsuario").val()) + "'," : '';
    $("#userName").val() !== '' ? _data += "Usuario='" + $("#userName").val() + "'," : '';
    $("#passUsuario").val() !== '' ? _data += "Contrasena='" + btoa($("#passUsuario").val()) + "'," : '';
    $("#puestoUsuario").val() !== '' ? _data += "Puesto='" + encodeURI($("#puestoUsuario").val()) + "'," : '';
    $("#dropRolusuario").val() !== '' ? _data += "IdRol='" + $("#dropRolusuario").val() + "'" : '';

    if (_data.endsWith(",")) {
        _data.slice(0, -1);
    }

    $.ajax({
        data: {
            update: _data,
            id: DataUser[0].ID
        },
        url: "../../../php/configuracion/actualizarUsuario.php",
        type: "post",
        async: true,
        beforeSend: function () {
            loader(true);
        },
        success: function (response) {
            console.log(response);
            window.location.reload();
        },
        error: function (error) {
            console.log(error);
            alert("ha ocurrido un problema al intentar actualizar usuario.");
        }
    }).always(function () {
        loader(false);
    });
}

function obtenerUsuarios() {
    $.ajax({
        data: {},
        url: "../../../php/configuracion/obtenerUsuarios.php",
        type: "post",
        async: true,
        beforeSend: function () {
            // loader(true);
        },
        success: function (response) {
            let json_usuarios = JSON.parse(response);
            Users = json_usuarios;
            Keys = Object.keys(json_usuarios[0]);
            crearTablaUsuarios(json_usuarios);
        },
        error: function (error) {
            console.log(error);
        }
    }).always(function () {
        // loader(false);
    });
}

function crearTablaUsuarios(usuarios) {
    $("#tblUsuarios tbody");
    let celdas = "";
    if (usuarios.length > 0) {
        usuarios.forEach(usuario => {
            celdas += `<tr data-user-id="${usuario.ID}">`;
            celdas += `<td class="text-nowrap align-middle">${decodeURI(usuario.Nombre)}</td>`;
            celdas += `<td class="text-nowrap align-middle">${usuario.Usuario}</td>`;
            celdas += `<td class="text-nowrap align-middle">${decodeURI(usuario.Puesto)}</td>`;
            celdas += `<td class="text-nowrap align-middle">${usuario.Rol}</td>`;
            celdas += btnActions;
            celdas += "</tr>";
        });
    } else {
        celdas += "<tr>";
        celdas += `<td class="text-nowrap align-middle">No hay datos por mostrar</td>`;
        celdas += "</tr>";
    }
    $("#tblUsuarios tbody").html(celdas);
    $("#dataCounter").html(`Mostrando ${usuarios.length} usuarios`);
}

function obtenerRoles() {
    $.ajax({
        data: {},
        url: "../../../php/configuracion/obtenerRoles.php",
        type: "post",
        async: true,
        beforeSend: function () {
            // loader(true);
        },
        success: function (response) {
            let json_roles = JSON.parse(response);
            let options = "";
            json_roles.forEach(rol => {
                options += `<option value="${rol.ID}">${rol.Titulo}</option>`;
            });
            $("#dropRolusuario").html(options);
        },
        error: function (error) {
            console.log(error);
        }
    }).always(function () {
        // loader(false);
    });
}

$(document).ready(function () {
    loader(true);
    let isValid = false;
    let cookie = obtenerCookie("user");
    let _cookie = JSON.parse(cookie);
    if (_cookie[0].Rol == 1) isValid = true;
    if (isValid) {
        let userData = JSON.parse(cookie);
        let Menu = crearMenu(userData[0].Menu);
        $("#navMenuUsuario > ul").html(Menu);
        obtenerUsuarios();
        obtenerRoles();
        loader(false);
    } else {
        window.location.href = "../pages/perfil.html";
    }
    /**
     * TRIGGERS
     */
    $("#formUsuario").submit(function (event) {
        event.preventDefault();
        if (EditUser) {
            actualizarUsuario();
        } else {
            $.ajax({
                data: {
                    nombre: encodeURI($("#nombreUsuario").val()),
                    usuario: $("#userName").val(),
                    contrasena: $("#passUsuario").val(),
                    puesto: encodeURI($("#puestoUsuario").val()),
                    idrol: $("#dropRolusuario").val(),
                },
                url: "../../../php/configuracion/crearUsuario.php",
                type: "post",
                async: true,
                beforeSend: function () {
                    loader(true);
                },
                success: function (response) {
                    if (response == "true") {
                        // alert("Usuario creado correctamente");
                        setTimeout(() => {
                            window.location.reload();
                        }, 500);
                    } else {
                        alert("el usuario no pudo ser creado");
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            }).always(function () {
                loader(false);
            });
        }

    });

    $("#btnAgregarUsuario").click(function () {
        $(".modal-title").html("Nuevo Usuario");
        $("#passUsuario").prop("required", true);
        $("#formUsuario")[0].reset();
    });

    $("body").on("click", ".btn-editar", function () {
        EditUser = true;
        let _tr = $(this).closest("tr");
        let _id = $(_tr).data("userId");
        let data_usuario = Users.filter(user => user.ID == _id);
        DataUser = data_usuario;
        $(".modal-title").html("Editar usuario");
        $("#passUsuario").prop("required", false);
        $("#nombreUsuario").val(decodeURI(data_usuario[0].Nombre));
        $("#userName").val(data_usuario[0].Usuario);
        $("#puestoUsuario").val(decodeURI(data_usuario[0].Puesto));
        $("#dropRolusuario").val(data_usuario[0].IdRol);
    });

    $("body").on("click", ".btn-eliminar", function () {
        let _tr = $(this).closest("tr");
        let _id = $(_tr).data("userId");
        let data_usuario = Users.filter(user => user.ID == _id);
        $("#EliminarUsuario").html(decodeURI(data_usuario[0].Usuario));
        $("#EliminarUsuario").attr('data-id-usuario', _id);
    });

    $("#confirmEliminarUsuario").click(function () {
        $.ajax({
            data: {
                id: $("#EliminarUsuario").data("idUsuario")
            },
            url: "../../../php/configuracion/eliminarUsuario.php",
            type: "post",
            async: true,
            beforeSend: function () {
                loader(true);
            },
            success: function (response) {
                if (response == "true") {
                    // alert("Usuario creado correctamente");
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                } else {
                    alert("el usuario no pudo ser eliminado");
                }
            },
            error: function (error) {
                console.log(error);
            }
        }).always(function () {
            loader(false);
        });
    });

    $("#formBuscador").submit(function (ev) {
        ev.preventDefault();
        let results = [];
        let valor = $("#buscador").val().toUpperCase();
        Users.forEach(_usuario => {
            let isAdded = false;
            Keys.forEach(_key => {
                if (!isAdded) {
                    let _valor = _usuario[_key].toString().toUpperCase();
                    if (_valor.includes(valor)) {
                        results.push(_usuario);
                        isAdded = true;
                        return;
                    }
                }
            });
        });
        crearTablaUsuarios(results);
    });

    //detectar cuando se le da click en la "X" para limpiar el texto a buscar jQuery no detecta el evento search.
    document.getElementById("buscador").addEventListener("search", function (event) {
        if ($("#buscador").val() == "") {
            crearTablaUsuarios(Users);
        }
    });
    /**
     * END TRIGGERS
     */
});

