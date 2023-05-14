var Laboratorios;
var Keys;
var ExamenesPaciente = [];
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

function calculateAge(birthday) {
    var birthday_arr = birthday.split("/");
    var birthday_date = new Date(birthday_arr[2], birthday_arr[1] - 1, birthday_arr[0]);
    var ageDifMs = Date.now() - birthday_date.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function setPxValues() {
    const genero = Laboratorios[0].Genero.toUpperCase() === "M" ? "M | MASCULINO" : "F | FEMENINO";
    const diapx = new Date(Laboratorios[0].FechaNacimiento).getUTCDate();
    const mespx = new Date(Laboratorios[0].FechaNacimiento).getUTCMonth() + 1;
    const aniopx = new Date(Laboratorios[0].FechaNacimiento).getUTCFullYear();
    const fechapx = `${diapx}/${mespx}/${aniopx}`;

    const edad = calculateAge(fechapx);

    $("#apellidopx").val(Laboratorios[0].Apellido.toUpperCase());
    $("#nombrepx").val(Laboratorios[0].Nombre.toUpperCase());
    $("#generopx").val(genero);
    $("#nacimientopx").val(fechapx);
    $("#edadpx").val(edad);
    $("#serviciopx").val(Laboratorios[0].Servicio.toUpperCase());
    $("#camapx").val(Laboratorios[0].Cama);
}

function obtenerLaboratoriosPorUsuario(id) {
    $.ajax({
        data: {
            id: id
        },
        url: "../../../php/pages/laboratorios/obtenerLaboratoriosPorPaciente.php",
        type: "post",
        async: true,
        beforeSend: function () {
            // loader(true);
        },
        success: function (response) {
            let json_laboratorios = JSON.parse(response);
            Laboratorios = json_laboratorios;
            if (Laboratorios.length > 0) {
                Keys = Object.keys(json_laboratorios[0]);
                crearTablaLaboratorio(json_laboratorios);
                optionsExamenesPaciente();
                setPxValues();
            } else {
                $("#tblLaboratoriosUsuario tbody").html("No hay datos por mostrar...");
            }
        },
        error: function (error) {
            console.log(error);
        }
    }).always(function () {
        // loader(false);
    });
}

function crearTablaLaboratorio(laboratorios) {

    let headers = "";
    let celdas = "";
    let examenes = [];
    const total = laboratorios.length;

    if (total > 0) {
        headers += "<tr>";
        // Keys.forEach(key => {
        //     headers += `<th class="sortable">${key}</th>`;
        // });
        columns.forEach(col => {
            headers += `<th class="sortable">${col}</th>`;
        });
        headers += "</tr>";
        let seccion = laboratorios[0].Seccion;
        let contador = 0;
        laboratorios.forEach((laboratorio, index) => {
            contador++;
            examenes.push(laboratorio.Examen);
            const dia = new Date(laboratorio.Fecha).getUTCDate();
            const mes = new Date(laboratorio.Fecha).getUTCMonth() + 1;
            const anio = new Date(laboratorio.Fecha).getUTCFullYear();
            const fecha = `${dia}/${mes}/${anio}`;
            let classWarning = "";

            if (laboratorio.Maximo !== null) {
                if (laboratorio.Valor > laboratorio.Maximo) {
                    classWarning = "bg-warning";
                }
                if (laboratorio.Valor < laboratorio.Minimo) {
                    classWarning = "bg-danger text-white";
                }
            }

            celdas += `<tr class ="${classWarning}" data-paciente-id="${laboratorio.ID}">`;
            celdas += `<td class="text-nowrap align-middle">${laboratorio.ID}</td>`;
            celdas += `<td class="text-nowrap align-middle">${laboratorio.Examen}</td>`;
            celdas += `<td class="text-nowrap align-middle">${laboratorio.Valor}</td>`;
            // celdas += `<td class="text-nowrap align-middle">${laboratorio.IdPaciente}</td>`;
            // celdas += `<td class="text-nowrap align-middle">${laboratorio.Nombre}</td>`;
            // celdas += `<td class="text-nowrap align-middle">${laboratorio.Apellido}</td>`;
            // celdas += `<td class="text-nowrap align-middle">${laboratorio.Servicio.toUpperCase()}</td>`;
            // celdas += `<td class="text-nowrap align-middle">${laboratorio.Cama}</td>`;
            celdas += `<td class="text-nowrap align-middle">${fecha}</td>`;
            // celdas += `<td class="text-nowrap align-middle">${genero}</td>`;
            // celdas += `<td class="text-nowrap align-middle">${fechapx}</td>`;
            // celdas += btnActions;
            celdas += "</tr>";

            if (laboratorio.Seccion !== seccion || index === total - 1) {
                //crear acorden e insertar tabla
                seccion = laboratorio.Seccion;
                const head = '<thead>' + headers + '</thead>';
                const body = '<tbody>' + celdas + '</tbody>';
                const tabla = `<table class="table table-bordered" id="tbl_${laboratorio.Seccion.replace(/ /g, "")}">${head}${body}</table>`;
                const idseccion = seccion.replace(/ /g, "");
                $("#accordionExample1").append(_settings.templates.acordeon
                    .replace('#VALORACORDEON#', tabla)
                    .replace(/#IDCOLLAPSE#/g, idseccion)
                    .replace('#TEXTOACORDEON#', seccion + " (" + contador + ")")
                    .replace('#IDACORDEONHEADING#', 'head_' + idseccion)
                );
                celdas = "";
                contador = 0;
            }

        });
    } else {
        celdas += "<tr>";
        celdas += `<td class="text-nowrap align-middle">No hay datos por mostrar</td>`;
        celdas += "</tr>";
    }
    // $("#tblLaboratoriosUsuario thead").html(headers);
    // $("#tblLaboratoriosUsuario tbody").html(celdas);
    $("#dataCounter").html(`Mostrando ${total} laboratorios`);
    ExamenesPaciente = [... new Set(examenes)];
    // optionsExamenesPaciente();
}

$(document).ready(function () {
    loader(true);
    let cookie = obtenerCookie("user");
    let _cookie = JSON.parse(cookie);
    if (_cookie[0].Rol > 0) {
        const userData = JSON.parse(cookie);
        let Menu = crearMenu(userData[0].Menu);
        $("#navMenuUsuario > ul").html(Menu);
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if (urlParams.has('id')) {
            const _id = urlParams.get('id');
            obtenerLaboratoriosPorUsuario(_id);
        } else {
            // window.location.href = "../index.html";
        }
    } else {
        window.location.href = "../index.html";
    }

    loader(false);
});

$("#formBuscador").submit(function (ev) {
    ev.preventDefault();
    let results = [];
    let valor = $("#buscador").val().toUpperCase();
    Laboratorios.forEach(_laboratorio => {
        let isAdded = false;
        columns.forEach(_key => {
            if (!isAdded) {
                let _valor = _laboratorio[_key].toString().toUpperCase();
                if (_valor.includes(valor)) {
                    results.push(_laboratorio);
                    isAdded = true;
                    return;
                }
            }
        });
    });
    $("#accordionExample1 .accordion-item").remove();
    crearTablaLaboratorio(results);
});
//detectar cuando se le da click en la "X" para limpiar el texto a buscar jQuery no detecta el evento search.
document.getElementById("buscador").addEventListener("search", function (event) {
    if ($("#buscador").val() == "") {
        $("#accordionExample1 .accordion-item").remove();
        crearTablaLaboratorio(Laboratorios);
    }
});