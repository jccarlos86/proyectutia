const btnActions = `<td class="text-center align-middle"><div class="btn-group align-top"><button class="btn btn-sm btn-primary badge btn-editar" type="button" data-bs-toggle="modal" data-bs-target="#user-form-modal">Editar</button><button class="btn btn-sm btn-danger badge btn-eliminar" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">Eliminar</button></div></td>`;
var Laboratorios;
var Keys;

$(document).ready(function () {
    loader(true);
    let cookie = obtenerCookie("user");
    let isValid = true;//cookie !== "" ? true : false;
    if (isValid) {

        function crearTablaLaboratorio(laboratorios) {
            $("#tblLaboratorios tbody");
            let headers = "";
            let celdas = "";
            if (laboratorios.length > 0) {
                headers += "<tr>";
                Keys.forEach(key => {
                    headers += `<th class="sortable">${key}</th>`;
                });
                // headers += "<th>Acciones</th></tr>";

                laboratorios.forEach(laboratorio => {
                    const dia = new Date(laboratorio.Fecha).getUTCDate();
                    const mes = new Date(laboratorio.Fecha).getUTCMonth() + 1;
                    const anio = new Date(laboratorio.Fecha).getUTCFullYear();
                    const fecha = `${dia}/${mes}/${anio}`;
                    celdas += `<tr data-paciente-id="${laboratorio.ID}">`;
                    celdas += `<td class="text-nowrap align-middle">${laboratorio.ID}</td>`;
                    celdas += `<td class="text-nowrap align-middle">${laboratorio.Examen}</td>`;
                    celdas += `<td class="text-nowrap align-middle">${laboratorio.Valor}</td>`;
                    celdas += `<td class="text-nowrap align-middle">${laboratorio.IdPaciente}</td>`;
                    celdas += `<td class="text-nowrap align-middle">${laboratorio.Paciente}</td>`;
                    celdas += `<td class="text-nowrap align-middle">${laboratorio.Servicio.toUpperCase()}</td>`;
                    celdas += `<td class="text-nowrap align-middle">${laboratorio.Cama}</td>`;
                    celdas += `<td class="text-nowrap align-middle">${fecha}</td>`;
                    // celdas += btnActions;
                    celdas += "</tr>";
                });
            } else {
                celdas += "<tr>";
                celdas += `<td class="text-nowrap align-middle">No hay datos por mostrar</td>`;
                celdas += "</tr>";
            }
            $("#tblLaboratorios thead").html(headers);
            $("#tblLaboratorios tbody").html(celdas);
            $("#dataCounter").html(`Mostrando ${laboratorios.length} laboratorios`);
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
                    let options = '<option value="">Selecciona un paciente</option>';
                    if (json_pacientes.length > 0) {
                        json_pacientes.forEach(paciente => {
                            options += `<option value="${paciente.ID}">${paciente.Nombre} ${paciente.Apellidos}</option>`;
                        });
                    }
                    $("#paciente").append(options);
                },
                error: function (error) {
                    console.log(error);
                }
            }).always(function () {
                // loader(false);
            });
        }

        function obtenerLaboratorios() {
            $.ajax({
                data: {},
                url: "../../../php/pages/laboratorios/obtenerLaboratorios.php",
                type: "post",
                async: true,
                beforeSend: function () {
                    // loader(true);
                },
                success: function (response) {
                    let json_laboratorios = JSON.parse(response);
                    Laboratorios = json_laboratorios;
                    Keys = Object.keys(json_laboratorios[0]);
                    crearTablaLaboratorio(json_laboratorios);
                },
                error: function (error) {
                    console.log(error);
                }
            }).always(function () {
                // loader(false);
            });
        }

        function cargaDatos(inserts) {
            $.ajax({
                data: {
                    datos: inserts
                },
                url: "../../../php/pages/laboratorios/cargaLaboratorios.php",
                type: "post",
                async: true,
                beforeSend: function () {
                    console.log("enviando...");
                },
                success: function (response) {
                    if (response == "true") {
                        alert("carga de datos completada correctamente");
                    } else {
                        alert("Error al intentar cargar los datos");
                        console.log(response);
                    }
                },
                error: function (error) {
                    console.log(error);
                    // alert(error);
                }
            }).always(function () {
                loader(false);
            });
        }

        //let userData = JSON.parse(cookie);
       // let Menu = crearMenu(userData[0].Menu);
      //  $("#navMenuUsuario > ul").html(Menu);
      //  obtenerPacientes();
      //  obtenerLaboratorios();
        loader(false);

        // Primero supervise los cambios del cuadro de entrada, seleccione un nuevo archivo que activará el evento de cambio
        $("#formCargaLaboratorios").submit(function (ev) {
            ev.preventDefault();
            //ejecutar loader
            loader(true);
            // Obtener el archivo seleccionado
            var file = document.querySelector("#file").files[0];
            if (file === undefined) {
                alert("No se ha seleccionado un archivo, por favor carga un documento.");
            } else {
                var type = file.name.split('.');
                if (type[type.length - 1] !== 'xlsx' && type[type.length - 1] !== 'xls') {
                    alert('Seleccione solo el archivo de Excel para importar');
                } else {
                    const reader = new FileReader();
                    reader.readAsBinaryString(file);
                    reader.onload = (e) => {
                        const data = e.target.result;
                        const zzexcel = window.XLS.read(data, {
                            type: 'binary'
                        });
                        const result = [];
                        for (let i = 0; i < zzexcel.SheetNames.length; i++) {
                            const newData = window.XLS.utils.sheet_to_json(zzexcel.Sheets[zzexcel.SheetNames[i]]);
                            result.push(...newData);
                        }
                        const datos = result.filter(data => data.examen !== "");
                        if (datos.length > 0) {
                            let inserts = "";
                            let paciente = parseInt($("#paciente option:selected").val());
                            let servicio = $("#servicio").val();
                            let cama = parseInt($("#cama").val());
                            let fecha = $("#fechaLaboratorio").val();
                            datos.forEach(dato => {
                                inserts += `('${dato.examen}', '${dato.valor === '' ? 0 : dato.valor}', '${paciente}', '${servicio}', '${cama}', '${fecha}', '${dato.seccion}'),`;
                            });
                            cargaDatos(inserts.slice(0, -1));
                        } else {
                            loader(false);
                            alert("No se encontraron regristros por cargar");
                        }
                        console.log('result', datos);
                    }
                }
            }
        });

        $("#formBuscador").submit(function (ev) {
            ev.preventDefault();
            let results = [];
            let valor = $("#buscador").val().toUpperCase();
            Laboratorios.forEach(_laboratorio => {
                let isAdded = false;
                Keys.forEach(_key => {
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
            crearTablaLaboratorio(results);
        });
        //detectar cuando se le da click en la "X" para limpiar el texto a buscar jQuery no detecta el evento search.
        document.getElementById("buscador").addEventListener("search", function (event) {
            if ($("#buscador").val() == "") {
                crearTablaLaboratorio(Laboratorios);
            }
        });
    } else {
        window.location.href = "index.html";
    }

})