const columns = [
    "ID",
    "Examen",
    "Valor",
    // "IdPaciente",
    // "Nombre",
    // "Apellido",
    // "Servicio",
    // "Cama",
    "Fecha",
    // "Genero",
    // "FechaNacimiento"
];

function obtenerAreas() {
    $.ajax({
        data: {},
        url: "../../../php/pages/comparativa/obtenerAreas.php",
        type: "get",
        async: true,
        beforeSend: function () { },
        success: function (response) {
            let json_areas = JSON.parse(response);
            if (json_areas.length > 0) {
                $("#area").append(`<option value="-1">Elige un area</option>`);
                json_areas.forEach(area => {
                    $("#area").append(`<option value="${area.ID}">${area.Area}</option>`);
                });
            } else {
                console.log("no se encontraron areas a cargar.");
                console.log(response);
            }
        },
        error: function (error) {
            console.log(error);
        }
    }).always(function () { });
}

function obtenerExamenes() {
    $.ajax({
        data: {},
        url: "../../../php/pages/comparativa/obtenerExamenes.php",
        type: "get",
        async: true,
        beforeSend: function () { },
        success: function (response) {
            let json_examen = JSON.parse(response);
            if (json_examen.length > 0) {
                json_examen.forEach(examen => {
                    $("#lsExamenes").append(`<li class="list-group-item"><input class="form-check-input me-1" type="checkbox" value="${examen.Examen}">${examen.Examen}</li>`);
                });
            } else {
                console.log("no se encontraron examenes a cargar.");
                console.log(response);
            }
        },
        error: function (error) {
            console.log(error);
        }
    }).always(function () { });
}

function obtenerComparativas(_examenes) {
    const hoy = new Date();
    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    const _hoy = `${hoy.getFullYear()}-${(hoy.getMonth() + 1) < 9 ? "0" + (hoy.getMonth() + 1) : (hoy.getMonth() + 1)}-${hoy.getDate()}`;
    const _ayer = `${ayer.getFullYear()}-${(ayer.getMonth() + 1) < 9 ? "0" + (ayer.getMonth() + 1) : (ayer.getMonth() + 1)}-${ayer.getDate()}`;

    $.ajax({
        data: {
            examenes: _examenes,
            servicio: $("#servicio").val(),
            area: $("#area").val(),
            hoy: _hoy,
            ayer: _ayer
        },
        url: "../../../php/pages/comparativa/obtenerComparativa.php",
        type: "get",
        async: true,
        beforeSend: function () {
            loader(true);
        },
        success: function (response) {
            if (response != "null") {
                let json_examen = JSON.parse(response);
                crearTablasComparativas(json_examen);
            }
            // if (json_examen.length > 0) {
            //     json_examen.forEach(examen => {
            //         $("#lsExamenes").append(`<li class="list-group-item"><input class="form-check-input me-1" type="checkbox" value="${examen.Examen}">${examen.Examen}</li>`);
            //     });
            // } else {
            //     console.log("no se encontraron examenes a cargar.");
            //     console.log(response);
            // }
        },
        error: function (error) {
            console.log(error);
        }
    }).always(function () {
        loader(false);
    });
}

function examenesConfig() {
    let valueChecked = [];
    $(".form-check-input:checked").each(function () {
        valueChecked.push("'" + $(this).val() + "'");
    });
    const param = "(" + valueChecked.join() + ")";
    obtenerComparativas(param);
}

function crearTablasComparativas(laboratorios) {
    let headers = "";
    let celdas = "";
    const total = laboratorios.length;
    if (laboratorios.length > 0) {
        headers += "<tr>";
        const Keys = Object.keys(laboratorios[0]);
        const columns = ["Examen", "Valor", "Fecha", "Examen", "Valor", "Fecha"];
        columns.forEach(key => {
            headers += `<th class="sortable">${key}</th>`;
        });
        headers += "</tr>";
        let cama = laboratorios[0].Cama;
        let contador = 1;
        let tr = "";

        const diaHoy = new Date().getUTCDate();
        const mesHoy = new Date().getUTCMonth() + 1;
        const anioHoy = new Date().getUTCFullYear();
        const fechaHoy = `${diaHoy}/${mesHoy}/${anioHoy}`;
        laboratorios.forEach((laboratorio, index) => {
            const dia = new Date(laboratorio.Fecha).getUTCDate();
            const mes = new Date(laboratorio.Fecha).getUTCMonth() + 1;
            const anio = new Date(laboratorio.Fecha).getUTCFullYear();
            const fecha = `${dia}/${mes}/${anio}`;

            celdas += `<td class="text-nowrap align-middle">${laboratorio.Examen}</td>`;
            celdas += `<td class="text-nowrap align-middle">${laboratorio.Valor}</td>`;
            celdas += `<td class="text-nowrap align-middle">${fecha}</td>`;

            if (contador === 2) {
                contador = 1;
                tr += `<tr data-index="${index}">${celdas}</tr>`;
                celdas = "";
            } else {
                contador++;
                if (fecha == fechaHoy) {
                    tr += `<tr data-index="${index}"><td class="text-nowrap align-middle">&nbsp;</td><td class="text-nowrap align-middle">&nbsp;</td><td class="text-nowrap align-middle">&nbsp;</td>${celdas}</tr>`;
                    celdas = "";
                    contador = 1;
                }
            }

            if (laboratorio.Cama !== cama || index === total - 1) {
                //crear acorden e insertar tabla
                cama = laboratorio.Cama;
                const head = '<thead>' + headers + '</thead>';
                const body = '<tbody>' + tr + '</tbody>';
                const tabla = `<h5>${laboratorio.Nombre.toUpperCase()} ${laboratorio.Apellidos.toUpperCase()} - Cama: ${laboratorio.Cama}</h5><table class="table table-bordered">${head}${body}</table>`;
                $("#tblDatos").append(tabla);
                celdas = "";
                tr = "";
                celdas += `<td class="text-nowrap align-middle">${laboratorio.Examen}</td>`;
                celdas += `<td class="text-nowrap align-middle">${laboratorio.Valor}</td>`;
                celdas += `<td class="text-nowrap align-middle">${fecha}</td>`;
            }
        });
    } else {
        celdas += "<tr>";
        celdas += `<td class="text-nowrap align-middle">No hay datos por mostrar</td>`;
        celdas += "</tr>";
    }

    // $("#tblLaboratorios thead").html(headers);
    // $("#tblLaboratorios tbody").html(celdas);
    // $("#dataCounter").html(`Mostrando ${laboratorios.length} laboratorios`);
}

$(document).ready(function () {
    loader(true);
    let cookie = obtenerCookie("user");
    let _cookie = JSON.parse(cookie);
    if (_cookie[0].Rol > 0) {
        const userData = JSON.parse(cookie);
        let Menu = crearMenu(userData[0].Menu);
        $("#navMenuUsuario > ul").html(Menu);
        obtenerAreas();
        obtenerExamenes();
        const hoy = new Date();
        const mes = hoy.getUTCMonth() + 1;
        const fechaHoy = `${hoy.getUTCFullYear()}-${mes < 10 ? "0" + mes : mes}-${hoy.getUTCDate()}`;
        $("#fecha").val(fechaHoy);
    } else {
        window.location.href = "../index.html";
    }
    loader(false);
});

$(document).on("change", "#area", function () {
    const idarea = $("#area").val();
    if (idarea > 0) {
        //obtener laboratorios segun el area seleccioanda
        examenesConfig();
    }
    // setTimeout(() => {
    //     loader(false);
    // }, 1500);
});

$("#formConfigLabs").submit(function (ev) {
    ev.preventDefault();
    examenesConfig();
    // let valueChecked = [];
    // $(".form-check-input:checked").each(function () {
    //     valueChecked.push("'" + $(this).val() + "'");
    // });
    // const param = "(" + valueChecked.join() + ")";
    // obtenerComparativas(param);
});