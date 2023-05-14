var _settings = {
    paises: [],
    labes: ['label1', 'label2', 'label3', 'label4', 'label5', 'label6'],
    templates: {
        acordeon: '<div class="accordion-item">' +
            '<h2 class="accordion-header" id="#IDACORDEONHEADING#">' +
            '<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="##IDCOLLAPSE#" aria-expanded="true" aria-controls="#IDCOLLAPSE#">' +
            '#TEXTOACORDEON#' +
            '</button>' +
            '</h2>' +
            '<div id="#IDCOLLAPSE#" class="accordion-collapse collapse" aria-labelledby="#IDACORDEONHEADING#" data-bs-parent="#accordionExample1">' +
            '<div class="accordion-body">' +
            '#VALORACORDEON#' +
            '</div>' +
            '</div>' +
            '</div>',
        graficas: '<div class="col">' +
            '<div class="card">' +
            '<div class="card-body">' +

            '<div class="input-group">' +
            '<div class="input-group-prepend">' +
            '<button class="input-group-text btn-edit-chart-title">' +
            '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>' +
            '<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>' +
            '</svg>' +
            '</button>' +

            '<button class="input-group-text btn-edit-chart-title-confirm edit-confirm" data-accion="1">' +
            '<svg class="bi bi-check-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
            '<path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>' +
            '<path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>' +
            '</svg>' +
            '</button>' +

            '<button class="input-group-text btn-edit-chart-title-cancel edit-confirm" data-accion="0">' +
            '<svg class="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
            '<path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>' +
            '<path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>' +
            '</svg>' +
            '</button>' +

            '</div>' +
            '<input type="text" class="form-control" readonly value="#titulo#">' +
            '<button type="button" class="btn btn-danger launch-modal delete-grafica ml-2" data-nombre="#nombre-grafica#" data-bs-toggle="modal" data-bs-target="#modalBorrarGrafica">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button>' +
            '</div>' +
            // '<h5 class="card-title">Card title</h5>' +
            '<p class="card-text">' +
            '<canvas id="grafica-#idgrafica#" class="card-text grafica"></canvas>' +
            '</p>' +
            '</div>' +
            '</div>' +
            '</div>',
        contenedorGrafica: '<div class="card m-1 border-0">' +
            '<div class="card-body">' +
            '<div class="input-group">' +
            '<div class="input-group-prepend">' +
            '<button class="input-group-text btn-edit-chart-title">' +
            '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>' +
            '<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>' +
            '</svg>' +
            '</button>' +

            '<button class="input-group-text btn-edit-chart-title-confirm edit-confirm" data-accion="1">' +
            '<svg class="bi bi-check-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
            '<path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>' +
            '<path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>' +
            '</svg>' +
            '</button>' +
            '<button class="input-group-text btn-edit-chart-title-cancel edit-confirm" data-accion="0">' +
            '<svg class="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
            '<path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>' +
            '<path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>' +
            '</svg>' +
            '</button>' +

            '</div>' +
            '<input type="text" class="form-control" readonly value="#titulo#">' +
            '<button type="button" class="btn btn-danger launch-modal delete-grafica ml-2" data-nombre="#nombre-grafica#" data-bs-toggle="modal" data-bs-target="#modalBorrarGrafica">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button>' +
            '</div>' +
            '<canvas id="grafica-#idgrafica#" class="card-text grafica"></canvas>' +

            '</div>' +
            '</div>',
        contenedorFlex: //'<div class="chart-container">'+
            '<canvas id="grafica-#idgrafica#" class="grafica"></canvas>' //+
        //'</div>'
    },
    graficasporlinea: 3
};

//-----------------------
var idGraficas = 0; //graficas creadas
var idChartDelete = [];
var idDelete = -1;
var tarjetaEliminar;
var tituloActual = "";
var consulta = []; //querys de cada grafica
var intervalo = -1; //id del intervalo
var graficas = []; //graficas creadas
var removeFirstsLabels = 1; //primeros n datos a eliminar de la grafica cuando se alcance el maximo
var cont = 0; //contador de iteraciones en graficas
var maxChart = 25; //graficas por pagina.
var refresh = 5000; //tiempo en que se actualizan las graficas(intervalo de tiempo).
var maxLabels = 10; //maximo de datos a mostrar en graficas
var tipoGrafica = 0; //tipo de grafica seleccionada
var minWith = 450; //tamano minimo de la grafica
//-----------------------


//funciones
// function initPage() {
//     $("#realCharts").show();
//     $("#temporalChart").hide();
//     $("#comparativaChart").hide();
//     $("#selectTipoGrafica").change();
// }

// function borrar() {
//     $.ajax({
//         data: {},
//         url: 'borrar.php',
//         type: 'post',
//         beforeSend: function () {
//         },
//         success: function (response) {
//             console.log(response);
//         }
//     });
// }

// function initInterval(tipo, intervalo) {
//     if (tipo == 1) {
//         intervalo.get = setInterval(() => {
//             getData();
//         }, intervalo);
//     } else if (tipo == 2) {
//         intervalo.create = setInterval(() => {
//             guardar();
//         }, intervalo);
//     }
// }

// function guardar() {
//     $.ajax({
//         data: {
//             pais: escape(_settings.paises[Math.round(Math.random() * (_settings.paises.length - 1) + 1)]),
//             cantidad: Math.round(Math.random() * (100 - 1) + 1)
//         },
//         url: 'insertar.php',
//         type: 'post',
//         beforeSend: function () {
//             console.log("Guardando...");
//         },
//         success: function (response) {
//             console.log(response, new Date());
//         }
//     });
// }

function getData() {
    $.ajax({
        data: {},
        url: 'obtener.php',
        type: 'post',
        beforeSend: function () {
            console.log("obteniendo...");
        },
        success: function (response) {
            if (response.startsWith("Connection")) {
                console.log("Error: " + response);
            } else if (response != "null") {
                var data = JSON.parse(response);
                console.log(data);
                chart(data);
            }
        }
    });
}

function crearSelect() {
    var opt = "<option>Elige</option>";
    for (var a = 0; a < _settings.paises.length; a++) {
        opt += "<option>" + _settings.paises[a] + "</option>";
    }
    $("#selectPaises").html(opt);
}



function newLabels() {
    var labels = [];
    for (var c = 0; c < maxLabels; c++) {
        labels.push("Label" + (c + 1));
    }
    return labels;
}

function newCantidad() {
    var cantidades = [];
    for (var c = 0; c < maxLabels; c++) {
        cantidades.push(Math.round(Math.random() * 99));
    }
    return cantidades;
}

function newPaises() {
    var paises = [];
    for (var c = 0; c < maxLabels; c++) {
        paises.push(_settings.paises[Math.round(Math.random() * _settings.paises.length + 1)]);
    }
    return paises;
}



// function cargarPaises() {
//     var selPais = "";
//     for (var a = 0; a < _settings.paises.length; a++) {
//         selPais += "<option vlaue ='" + _settings.paises[a] + "'>" + _settings.paises[a] + "</option>";
//     }
//     $("#Pais_Fuente").append(selPais);
//     $("#Pais_Destino").append(selPais);
// }

// function cargarProveedores() {
//     var selProv = "";
//     for (var a = 0; a < 100; a++) {
//         selProv += "<option vlaue ='proveedor-" + a + "'>Proveedor-" + a + "</option>";
//     }
//     $("#Proveedor_Fuente").append(selProv);
//     $("#Proveedor_Destino").append(selProv);
// }

// function cargarClientes() {
//     var selCliente = "";
//     for (var a = 0; a < _settings.paises.length; a++) {
//         selCliente += "<option vlaue ='cliente-" + a + "'>Cliente-" + a + "</option>";
//     }
//     $("#Cliente_Destino").append(selCliente);
//     $("#Cliente_Fuente").append(selCliente);
// }

function getAllValues(destino) {
    var arr = [];
    $(destino + " option").each(function () {
        arr.push($(this).val());
    });
    return arr;
}



function validaFiltro() {
    result = false;
    //fuente
    var pf = $("#Pais_Fuente").val();
    var prf = $("#Proveedor_Fuente").val();
    var cf = $("#Cliente_Fuente").val();
    //destino
    var pd = $("#Pais_Destino").val();
    var prd = $("#Proveedor_Destino").val();
    var cd = $("#Cliente_Destino").val();

    if (pf != 0 || prf != 0 || cf != 0) {
        result = true;
    }
    return result;
}

function eliminarPrimeros(charts) {
    for (var g = 0; g < charts.length; g++) {
        charts[g].grafica.data.labels.splice(0, removeFirstsLabels);
        for (var d = 0; d < charts[g].grafica.data.datasets.length; d++) {
            charts[g].grafica.data.datasets[d].data.splice(0, removeFirstsLabels);
            charts[g].grafica.update();
        }
    }
}

//actualiza graficas.
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        //dataset.data.push(data);
        dataset.data.push(Math.round(Math.random() * 99));
    });
    chart.update();
}

function updGraph() {
    var charts = [];
    for (var a = 0; a < graficas.length; a++) {
        graficas[a].labelsCount++;
        addData(graficas[a].grafica, "Label" + graficas[a].labelsCount.toString(), 0);
        if (graficas[a].labelsCount > maxLabels) {
            charts.push(graficas[a]);
        }
    }
    if (charts.length > 0) {
        eliminarPrimeros(charts);
    }
}

//esta funcion es solo para demo, eliminar al final
function iniciarIntervalo() {
    intervalo = setInterval(() => { updGraph() }, refresh);
}



//--------------------------------->triggers


$(".container-fluid").on("click", ".btn-edit-chart-title", function () {
    $(this).hide();
    $(this).next().show();
    //titulo actual
    tituloActual = $(this).parent().next().val();
    $(this).next().next().show();
    $(this).parent().next().removeAttr("readonly", false);
});

$(".container-fluid").on("click", ".edit-confirm", function () {
    var accion = $(this).data("accion");
    $(this).hide();
    if (accion == 0) {
        $(this).prev().hide();
        $(this).prev().prev().show();
        $(this).parent().next().next().data("nombre", tituloActual);
        $(this).parent().next().val(tituloActual);
        tituloActual = "";
    } else if (accion == 1) {
        $(this).next().hide();
        $(this).prev().show();
        //actualizar data-nombre, titulo nuevo
        var nuevonombre = $(this).parent().next().val();
        for (var g = 0; g < graficas.length; g++) {
            if (graficas[g].nombre == tituloActual) {
                graficas[g].nombre = nuevonombre;
                break;
            }
        }
        $(this).parent().next().next().data("nombre", nuevonombre);
    }
    $(this).parent().next().attr("readonly", true);
});

$("#selectTipoGrafica").change(function () {
    var tipo = parseInt($(this).val());
    $(".select-config").hide();
    switch (tipo) {
        case 0:
            $("#Pais_Fuente").show();
            $("#Cliente_Destino").show();
            $("#Troncal_Cliente_Destino").show();

            $("#Troncal_Proveedor_Destino").hide();
            $("#Proveedor_Fuente").hide();
            $("#Cliente_Fuente").hide();
            $("#Pais_Destino").hide();
            $("#Proveedor_Destino").hide();
            break;
        case 1:
            $("#Pais_Fuente").show();
            $("#Proveedor_Destino").show();
            $("#Troncal_Proveedor_Destino").show();

            $("#Troncal_Cliente_Destino").hide();
            $("#Proveedor_Fuente").hide();
            $("#Cliente_Fuente").hide();
            $("#Pais_Destino").hide();
            $("#Cliente_Destino").hide();
            break;
        case 2:
            $("#Cliente_Fuente").show();
            $("#Pais_Destino").show();

            $("#Proveedor_Fuente").hide();
            $("#Pais_Fuente").hide();
            $("#Proveedor_Destino").hide();
            $("#Cliente_Destino").hide();
            break;
        case 3:
            $("#Cliente_Fuente").show();
            $("#Proveedor_Destino").show();
            $("#Troncal_Proveedor_Destino").show();

            $("#Troncal_Cliente_Destino").hide();
            $("#Proveedor_Fuente").hide();
            $("#Pais_Fuente").hide();
            $("#Pais_Destino").hide();
            $("#Cliente_Destino").hide();
            break;
        case 4:
            $("#Proveedor_Fuente").show();
            $("#Pais_Destino").show();

            $("#Cliente_Fuente").hide();
            $("#Pais_Fuente").hide();
            $("#Proveedor_Destino").hide();
            $("#Cliente_Destino").hide();
            break;
        case 5:
            $("#Proveedor_Fuente").show();
            $("#Cliente_Destino").show();
            $("#Troncal_Cliente_Destino").show();

            $("#Troncal_Proveedor_Destino").hide();
            $("#Cliente_Fuente").hide();
            $("#Pais_Fuente").hide();
            $("#Proveedor_Destino").hide();
            $("#Pais_Destino").hide();
            break;
    }
});



$("#cancelarGrafica").click(function () {
    $(".select-config").val(0);
    $(".select-config").attr("disabled", false);
});



$("#btnIntervalo").click(function () {
    iniciarIntervalo();
});

$("#btnChart").click(function () {
    switch (tipoGrafica) {
        case 0:
            $("#selectFechas").hide();
            break;
        case 1:
            $("#selectFechas").show();
            $(".compare-date-finish").hide();
            break;
        case 2:
            $("#selectFechas").show();
            $(".compare-date-finish").show();
            break;
    }
});

//establecer valores de variables de configuracion.
$("#tipoGrafica").change(function () {
    tipoGrafica = parseInt($(this).val());
    //tipoGrafica = tipo;
    switch (tipoGrafica) {
        case 0:
            $("#realCharts").show();
            $("#temporalChart").hide();
            $("#comparativaChart").hide();
            maxLabels = parseInt($("#realMaxLabels").val());
            refresh = parseInt($("#realChartInterval").val());
            break;
        case 1:
            $("#temporalChart").show();
            $("#realCharts").hide();
            $("#comparativaChart").hide();
            maxLabels = parseInt($("#temporalMaxLabels").val());
            refresh = parseInt($("#temporalChartInterval").val());
            break;
        case 2:
            $("#comparativaChart").show();
            $("#realCharts").hide();
            $("#temporalChart").hide();
            maxLabels = parseInt($("#comparativaMaxLabels").val());
            break;
    }
});

$("#realChartInterval,#temporalChartInterval").change(function () {
    if (intervalo > 0) {
        clearInterval(intervalo);
    }
    refresh = parseInt($(this).val());
    iniciarIntervalo();
});

$("#realMaxLabels").change(function () {
    maxLabels = parseInt($(this).val());
});
//

//jccj...................
// function queryGraficas() {
//     /*
//      * fuente: quien conecta
//      * destino: a donde conecta
//      */

//     //fuente
//     var pf = $("#Pais_Fuente").val();
//     var prf = $("#Proveedor_Fuente").val();
//     var cf = $("#Cliente_Fuente").val();
//     //destino
//     var pd = $("#Pais_Destino").val();
//     var prd = $("#Proveedor_Destino").val();
//     var cd = $("#Cliente_Destino").val();
//     //fechas
//     var fi = $("#fechaInicio").val();
//     var ff = $("#fechaFin").val();

//     var tit = $("#tituloGrafica").val();
//     var fuente;
//     var destino;
//     var tipo;
//     var valido = true;
//     switch (true) {
//         case pf != 0 && prd != 0:
//             //pais-proveedor.
//             fuente = pf;
//             destino = prd == 1 ? getAllValues("#Proveedor_Destino") : prd;
//             tipo = "pais-proveedor";
//             break;
//         case pf != 0 && cd != 0:
//             //pais-cliente
//             fuente = pf;
//             destino = cd == 1 ? getAllValues("#Cliente_Destino") : cd;
//             tipo = "pais-cliente";
//             break;
//         case prf != 0 && pd != 0:
//             //proveedor-pais
//             fuente = prf;
//             destino = pd == 1 ? getAllValues("#Pais_Destino") : pd;
//             tipo = "proveedor-pais";
//             break;
//         case prf != 0 && cd != 0:
//             //proveedor-cliente
//             fuente = prf;
//             destino = cd == 1 ? getAllValues("#Cliente_Destino") : cd;
//             tipo = "proveedor-cliente";
//             break;
//         case cf != 0 && pd != 0:
//             //cliente-pais
//             fuente = cf;
//             destino = pd == 1 ? getAllValues("#Pais_Destino") : pd;
//             tipo = "cliente-pais";
//             break;
//         case cf != 0 && prd != 0:
//             //cliente-proveedor.
//             fuente = cf;
//             destino = prd == 1 ? getAllValues("#Proveedor_Destino") : prd;
//             tipo = "cliente-proveedor";
//             break;
//         default:
//             //no existe esta combinacion
//             valido = false;
//             tipo = undefined;
//             alert("ha habido un error al elegir el tipo de grafico.");
//             break;
//     }

//     if (valido) {
//         var query = {
//             titulo: tit.length > 0 ? tit : idGraficas.toString(),
//             fuente: fuente,
//             destino: destino,
//             tipo: tipo,
//             fechaInicio: fi,
//             fechaFin: ff
//         };
//         chart(query);
//     }

// }

function newRgbaColor() {
    let color = [];
    for (let c = 0; c < 3; c++) {
        color.push(Math.round(Math.random() * (255 - 1)));
    }
    color.push(0.2);
    return {
        color: 'rgba(' + color.join() + ')',
        border: 'rgb(' + color.join().replace(',0.2', '') + ')'
    }

}

function newColor() {
    var hexa = "0123456789ABCDEF";
    var color = "#";
    for (var c = 0; c < 6; c++) {
        color += hexa[Math.round(Math.random() * (hexa.length - 1))];
    }
    return color;
}

function newDatasets(filtro) {
    // var datasets = [];

    let colors = []; //newColor();
    let borderColors = [];
    let valores = [];
    const label = filtro[0].Examen;
    filtro.forEach(val => {
        const getcolor = newRgbaColor();
        valores.push(parseFloat(val.Valor));
        colors.push(getcolor.color);
        borderColors.push(getcolor.border);
    });

    return [{
        label: label,
        data: valores,
        fill: true,
        backgroundColor: colors,
        borderColor: borderColors
    }];

    // for (var c = 0; c < filtro.length; c++) {
    //     var color = newColor();
    //     datasets.push({
    //         label: filtro[c].Examen,
    //         data: parseFloat(filtro[c].Valor),
    //         fill: false,
    //         backgroundColor: color,
    //         borderColor: color
    //     });
    // }
    // return datasets;
}

function queryGraficas() {
    const _examen = $("#estudio").val();
    const desde = new Date($("#fechaDesde").val());
    const hasta = new Date($("#fechaHasta").val());
    const filtro = Laboratorios.filter(lab => lab.Examen === _examen && new Date(lab.Fecha) >= desde && new Date(lab.Fecha) <= hasta);
    let fechas = [];
    filtro.forEach(_filtro => {
        fechas.push(_filtro.Fecha);
    });
    const query = {
        titulo: $("#tituloGrafica").val().trim(),
        filtro: filtro,
        labels: fechas,
        //quitar duplicados
        // labels: [... new Set(fechas)],
        grafica: $("#tipoGrafica").val()
    }

    chart(query);
}

//grafica.
function chart(consulta) {
    $("#cardGraficas").append(_settings.templates.graficas
        .replace("#idgrafica#", idGraficas.toString())
        .replace("#titulo#", consulta.titulo)
        .replace("#nombre-grafica#", consulta.titulo)
    );

    // $("#cardGraficas").append(_settings.templates.contenedorGrafica
    //     .replace("#idgrafica#", idGraficas.toString())
    //     .replace("#titulo#", consulta.titulo)
    //     .replace("#nombre-grafica#", consulta.titulo)
    // );

    var ctx = document.getElementById("grafica-" + idGraficas.toString()).getContext("2d");
    var myChart = new Chart(ctx, {
        type: consulta.grafica,
        lineWidth: 1,
        borderWidth: 1,
        data: {
            labels: consulta.labels,
            datasets: newDatasets(consulta.filtro)
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    graficas.push({
        nombre: consulta.titulo,
        grafica: myChart,
        query: consulta,
        labelsCount: maxLabels
    });
    idGraficas++;
    $(".edit-confirm").hide();
    // if (tipoGrafica != 2 && intervalo < 0) {
    //     iniciarIntervalo();
    // }
}

function optionsExamenesPaciente() {
    let estudios = "";
    ExamenesPaciente.sort().forEach(lab => {
        estudios += "<option value ='" + lab + "'>" + lab + "</option>";
    })
    $("#estudio").append(estudios);
}

$(document).ready(function () {
    $("#tipoGrafica").closest(".row").hide();
    // initPage();
    // cargarPaises();
    // cargarProveedores();
    // cargarClientes();
    //crearSelect();
    //getData();
});

$("#formGrafica").submit(function (event) {
    event.preventDefault();
    //chart();
    //crear query para graficas
    queryGraficas();
    //limpiar opciones de graficas
    $(".select-config").val(0);
    $("#titulo_Grafica").val("");
    $(".select-config").attr("disabled", false);
    $("#modalGrafica").modal("hide");
});

$("#cardGraficas").on("click", ".delete-grafica", function () {
    idChartDelete.push($(this).data("nombre"));
    tarjetaEliminar = $(this).closest(".card");
    $("#nombreGrafica").html($(this).data("nombre"));
});

$("#eliminarGrafica").click(function () {
    for (var g = 0; g < graficas.length; g++) {
        if (graficas[g].nombre == $("#nombreGrafica").html()) {
            graficas.splice(g, 1);
            break;
        }
    }
    $(tarjetaEliminar).parent().remove();
    $("#modalBorrarGrafica").modal("hide");
});

$("#graficasporlinea").change(function () {
    const newClass = $(this).val();
    $("#cardGraficas").removeClass("row-cols-md-" + _settings.graficasporlinea);
    $("#cardGraficas").addClass("row-cols-md-" + newClass);
    _settings.graficasporlinea = newClass;
});