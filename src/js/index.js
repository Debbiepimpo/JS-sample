// (A) INITIALIZE - DOUBLE CLICK TO EDIT CELL
window.addEventListener("DOMContentLoaded", () => {
    for (let cell of document.querySelectorAll(".editable td")) {
        cell.ondblclick = () => editable.edit(cell);
    }
});
var editable = {
    // (B) PROPERTIES
    selected: null, // current selected cell
    value: "", // current selected cell value

    // (C) "CONVERT" TO EDITABLE CELL
    edit: cell => {
        // (C1) REMOVE "DOUBLE CLICK TO EDIT"
        cell.ondblclick = "";

        // (C2) EDITABLE CONTENT
        cell.contentEditable = true;
        cell.focus();

        // (C3) "MARK" CURRENT SELECTED CELL
        cell.classList.add("edit");
        editable.selected = cell;
        editable.value = cell.innerHTML;

        // (C4) PRESS ENTER/ESC OR CLICK OUTSIDE TO END EDIT
        window.addEventListener("click", editable.close);
        cell.onkeydown = evt => {
            if (evt.key == "Enter" || evt.key == "Escape") {
                editable.close(evt.key == "Enter" ? true : false);
                return false;
            }
        };
    },
    // ...
};

// (D) END "EDIT MODE"
close: evt => {
    if (evt.target != editable.selected) {
        // (D1) CANCEL - RESTORE PREVIOUS VALUE
        if (evt === false) {
            editable.selected.innerHTML = editable.value;
        }

        // (D2) REMOVE "EDITABLE"
        window.getSelection().removeAllRanges();
        editable.selected.contentEditable = false;

        // (D3) RESTORE CLICK LISTENERS
        window.removeEventListener("click", editable.close);
        let cell = editable.selected;
        cell.ondblclick = () => editable.edit(cell);

        // (D4) "UNMARK" CURRENT SELECTED CELL
        editable.selected.classList.remove("edit");
        editable.selected = null;
        editable.value = "";

        // (D5) DO WHATEVER YOU NEED
        if (evt !== false) {
            console.log(editable.selected.innerHTML);
            // check value?
            // send value to server?
            // update calculations in table?
        }
    }
}


function agregarFila() {
    var tablaBody = document.getElementById("tablaBody");
    var fila = document.createElement("tr");

    var celda1 = document.createElement("td");
    celda1.innerHTML = "Nuevo dato 1";
    celda1.ondblclick = () => editable.edit(celda1);
    fila.appendChild(celda1);

    var celda2 = document.createElement("td");
    celda2.innerHTML = "Nuevo dato 2";
    celda2.ondblclick = () => editable.edit(celda2);
    fila.appendChild(celda2);

    tablaBody.appendChild(fila);

    // Guardar filas en localStorage
    var filasGuardadas = [];
    var filasTabla = tablaBody.getElementsByTagName("tr");

    for (var i = 0; i < filasTabla.length; i++) {
        var celdas = filasTabla[i].getElementsByTagName("td");
        var datosFila = [];

        for (var j = 0; j < celdas.length; j++) {
            datosFila.push(celdas[j].innerHTML);
        }

        filasGuardadas.push(datosFila);
    }

    localStorage.setItem("filas", JSON.stringify(filasGuardadas));
}

function exportarJSON() {
    var tablaBody = document.getElementById("tablaBody");
    var filasTabla = tablaBody.getElementsByTagName("tr");
    var datos = [];

    for (var i = 0; i < filasTabla.length; i++) {
        var celdas = filasTabla[i].getElementsByTagName("td");
        var datosFila = [];

        for (var j = 0; j < celdas.length; j++) {
            datosFila.push(celdas[j].innerHTML);
        }

        datos.push(datosFila);
    }

    var jsonString = JSON.stringify(datos);
    var link = document.createElement("a");
    link.href = "data:text/json;charset=utf-8," + encodeURIComponent(jsonString);
    link.download = "tabla.json";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function borrarUltimaFila() {
    var tablaBody = document.getElementById("tablaBody");
    var filas = tablaBody.getElementsByTagName("tr");

    if (filas.length > 1) { // Verificar si hay más de una fila (no se borra la primera)
        tablaBody.removeChild(filas[filas.length - 1]); // Eliminar la última fila

        // Guardar filas en localStorage
        var filasGuardadas = [];
        var filasTabla = tablaBody.getElementsByTagName("tr");

        for (var i = 0; i < filasTabla.length; i++) {
            var celdas = filasTabla[i].getElementsByTagName("td");
            var datosFila = [];

            for (var j = 0; j < celdas.length; j++) {
                datosFila.push(celdas[j].innerHTML);
            }

            filasGuardadas.push(datosFila);
        }

        localStorage.setItem("filas", JSON.stringify(filasGuardadas));
    }
}