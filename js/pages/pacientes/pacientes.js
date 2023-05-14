// const btnActions = `<td class="text-center align-middle"><div class="btn-group align-top"><button class="btn btn-sm btn-info badge btn-laboratorios-usuario" type="button">Laboratorios</button><button class="btn btn-sm btn-primary badge btn-editar" type="button" data-bs-toggle="modal" data-bs-target="#user-form-modal">Editar</button><button class="btn btn-sm btn-danger badge btn-eliminar" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">Eliminar</button></div></td>`;
const btnActions = `<td class="text-center align-middle"><div class="btn-group align-top"><button class="btn btn-sm btn-info badge btn-laboratorios-usuario" type="button">Laboratorios</button><button class="btn btn-sm btn-primary badge btn-editar" type="button" data-bs-toggle="modal" data-bs-target="#user-form-modal">Editar</button></div></td>`;

var Pacientes;
var Keys;

// function quitarAcentos(texto) {
//     return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
// }

function crearTablaPacientes(pacientes) {
    $("#tblPacientes tbody");
    let headers = "";
    let celdas = "";
    if (pacientes.length > 0) {
        headers += "<tr>";
        Keys.forEach(key => {
            headers += `<th class="sortable">${key}</th>`;
        });
        headers += "<th>Acciones</th></tr>";

        pacientes.forEach(paciente => {
            celdas += `<tr data-paciente-id="${paciente.ID}">`;
            celdas += `<td class="text-nowrap align-middle">${paciente.ID}</td>`;
            celdas += `<td class="text-nowrap align-middle">${decodeURI(paciente.Nombre)}</td>`;
            celdas += `<td class="text-nowrap align-middle">${decodeURI(paciente.Apellidos)}</td>`;
            celdas += `<td class="text-nowrap align-middle">${paciente.Sexo}</td>`;
            celdas += `<td class="text-nowrap align-middle">${new Date(paciente.Fecha).toLocaleDateString()}</td>`;
            celdas += `<td class="text-nowrap align-middle">${paciente.Peso}</td>`;
            celdas += `<td class="text-nowrap align-middle">${paciente.Talla}</td>`;
            celdas += btnActions;
            celdas += "</tr>";
        });
    } else {
        celdas += "<tr>";
        celdas += `<td class="text-nowrap align-middle">No hay datos por mostrar</td>`;
        celdas += "</tr>";
    }
    $("#tblPacientes thead").html(headers);
    $("#tblPacientes tbody").html(celdas);
    $("#dataCounter").html(`Mostrando ${pacientes.length} pacientes`);
}

function obtenerPacientes() {
    $.ajax({
        data: {},
        url: "../../../php/pages/pacientes/obtenerPacientes.php",
        type: "post",
        async: true,
        beforeSend: function () {
            // loader(true);
        },
        success: function (response) {
            let json_pacientes = JSON.parse(response);
            Pacientes = json_pacientes;
            Keys = Object.keys(json_pacientes[0]);
            crearTablaPacientes(json_pacientes);
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
    let cookie = obtenerCookie("user");
    let isValid = cookie !== "" ? true : false;
    if (isValid) {
        let userData = JSON.parse(cookie);
        let Menu = crearMenu(userData[0].Menu);
        $("#navMenuUsuario > ul").html(Menu);
        obtenerPacientes();
        loader(false);
    } else {
        window.location.href = "index.html";
    }

});

$("#formPacientes").submit(function (ev) {
    ev.preventDefault();
    const _nombre = $("#nombreUsuario").val();
    const _apellido = $("#apellidoUsuario").val();
    const _fecha = $("#fechaNacimiento").val();
    const _sexo = $("#dropSexo").val();
    const _peso = $("#pesoUsuario").val();
    const _talla = $("#tallaUsuario").val();

    $.ajax({
        data: {
            nombre: encodeURI(_nombre.trim()),
            apellido: encodeURI(_apellido.trim()),
            sexo: _sexo,
            fecha: _fecha,
            talla: _talla,
            peso: _peso
        },
        url: "../../../php/pages/pacientes/crearPaciente.php",
        type: "post",
        async: true,
        beforeSend: function () {
            loader(true);
            console.log("enviando...");
        },
        success: function (response) {
            let mensaje = "";
            switch (response) {
                case "true":
                    $("#user-form-modal").modal("hide");
                    mensaje = "Paciente creado exitosamente.";
                    obtenerPacientes();
                    break;
                case "false":
                    mensaje = "Ya existe un paciente registrado con esos datos.";
                    break;
                default:
                    mensaje = "Error: " + response;
                    break;
            }
            alert(mensaje);
        },
        error: function (error) {
            console.log(error);
            alert(error);
        }
    }).always(function () {
        loader(false);
    });
});

$("body").on("click", ".btn-eliminar", function () {
    let _tr = $(this).closest("tr");
    let _id = $(_tr).data("pacienteId");
    let data_paciente = Pacientes.filter(paciente => paciente.ID == _id);
    $("#EliminarPaciente").html(data_paciente[0].Nombre.toUpperCase() + " " + data_paciente[0].Apellidos.toUpperCase());
    $("#EliminarPaciente").attr('data-id-paciente', _id);
});

$("body").on("click", ".btn-laboratorios-usuario", function () {
    let _tr = $(this).closest("tr");
    let _id = $(_tr).data("pacienteId");
    window.location.href = "../laboratorios/laboratoriosPorUsuario.html?id=" + _id;
});

$("#confirmEliminarPaciente").click(function () {
    $.ajax({
        data: {
            id: $("#EliminarPaciente").data("idPaciente")
        },
        url: "../../../php/pages/pacientes/eliminarPaciente.php",
        type: "post",
        async: true,
        beforeSend: function () {
            loader(true);
        },
        success: function (response) {
            if (response == "true") {
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                alert("el paciente no pudo ser eliminado");
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
    Pacientes.forEach(_paciente => {
        let isAdded = false;
        Keys.forEach(_key => {
            if (!isAdded) {
                let _valor = _paciente[_key].toString().toUpperCase();
                if (_valor.includes(valor)) {
                    results.push(_paciente);
                    isAdded = true;
                    return;
                }
            }
        });
    });
    crearTablaPacientes(results);
});
//detectar cuando se le da click en la "X" para limpiar el texto a buscar jQuery no detecta el evento search.
document.getElementById("buscador").addEventListener("search", function (event) {
    if ($("#buscador").val() == "") {
        crearTablaPacientes(Pacientes);
    }
});