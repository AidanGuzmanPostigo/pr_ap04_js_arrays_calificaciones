"use strict";

/*
  ==========================================================
  Gestor de calificaciones - Arrays
  Archivo: app.js (A COMPLETAR)
  ==========================================================
*/

/* ==========================================================
   1) ESTADO (array principal)
   ========================================================== */

/**
 * Array principal donde se almacenan todas las notas introducidas.
 * @type {number[]}
 */
let notas = []; // TODO: este array será el que uses en toda la práctica


/* ==========================================================
   2) REFERENCIAS AL DOM
   ========================================================== */

/**
 * Referencia al input numérico donde se introduce la nota.
 * @type {HTMLInputElement}
 */
const nota = document.querySelector("#notaInput");

/**
 * Botón para añadir una nota.
 * @type {HTMLButtonElement}
 */
const agregar = document.querySelector("#btnAgregar");

/**
 * Botón para ordenar de menor a mayor.
 * @type {HTMLButtonElement}
 */
const ordMayorMenor = document.querySelector("#btnOrdenDesc");

/**
 * Botón para ordenar de mayor a menor.
 * @type {HTMLButtonElement}
 */
const ordMenorMayor = document.querySelector("#btnOrdenAsc");

/**
 * Botón para limpiar todas las notas.
 * @type {HTMLButtonElement}
 */
const limpiar = document.querySelector("#btnLimpiar");

/**
 * Lista (ul) donde se mostrarán las notas.
 * @type {HTMLUListElement}
 */
const listaNotas = document.querySelector("#listaNotas");

/**
 * Párrafo donde se mostrará el resumen.
 * @type {HTMLParagraphElement}
 */
const resumen = document.querySelector("#txtResumen");

/**
 * Párrafo donde se mostrarán mensajes de error.
 * @type {HTMLParagraphElement}
 */
const error = document.querySelector("#mensaje");

/* ==========================================================
   3) INICIALIZACIÓN (eventos)
   ========================================================== */

/**
 * Función principal de inicio: registra eventos y pinta el estado inicial.
 * @returns {void}
 */
function init() {
  nota.addEventListener("keydown", (event) => {
    if(event.key == "Enter"){
        agregarNota();
    }
  });
  agregar.addEventListener("click", () => {
    agregarNota();
  });
  ordMayorMenor.addEventListener("click",() =>{
    ordenarDesc();
  });
  ordMenorMayor.addEventListener("click",() =>{
    ordenarAsc();
  });
  limpiar.addEventListener("click",() =>{
    limpiarTodo();
  });
}

init();


/* ==========================================================
   4) FUNCIONALIDADES PRINCIPALES
   ========================================================== */

/**
 * Lee el valor del input, lo valida y si es correcto lo añade al array.
 * Después debe actualizar la interfaz.
 * @returns {void}
 */
function agregarNota() {
    nota.value.trim();
    if (nota.value == "" || isNaN(nota.value)){
        mostrarMensaje("El valor introducido debe de ser un número comprendido entre 0 y 10.")
    }else if (Number(nota.value) >= 0 && Number(nota.value)<=10){
        notas.push(Number(nota.value));
    } else {
        mostrarMensaje("El valor introducido debe de ser un número comprendido entre 0 y 10.")
    }
    nota.value = "";
    render();
    nota.focus();
}

/**
 * Ordena el array de notas de menor a mayor y actualiza la interfaz.
 * @returns {void}
 */
function ordenarAsc() {
    notas.sort((a,b) => a-b);
    render();
}

/**
 * Ordena el array de notas de mayor a menor y actualiza la interfaz.
 * @returns {void}
 */
function ordenarDesc() {
  notas.sort((a,b) => b-a);
  render();
}

/**
 * Elimina todas las notas, reinicia la interfaz y deja el estado vacío.
 * @returns {void}
 */
function limpiarTodo() {
    notas = [];
    render();
}


/* ==========================================================
   5) PINTADO DE LA INTERFAZ (render)
   ========================================================== */

/**
 * Actualiza completamente la interfaz:
 * - lista de notas
 * - resumen
 * @returns {void}
 */
function render() {
  pintarLista();
  pintarResumen();
}

/**
 * Pinta el contenido del array en la lista <ul>.
 * @returns {void}
 */
function pintarLista() {
    listaNotas.innerHTML = "";
    for(let i = 0; i<notas.length;i++){
        const singleNote = document.createElement("li");
        singleNote.textContent = notas[i];
        listaNotas.appendChild(singleNote);
    }
}

/**
 * Pinta el resumen en txtResumen:
 * - total
 * - media
 * - máximo
 * - mínimo
 * - aprobados
 * - suspensos
 * @returns {void}
 */
function pintarResumen() {
    if (notas.length == 0){
        resumen.innerHTML = "Aún no hay notas.";
    } else {
        resumen.innerHTML = `Media: ${calcularMedia(notas)}<br>Máximo: ${calcularMax(notas)}<br>Mínimo: ${calcularMin(notas)}<br>Número de aprobados: ${contarAprobados(notas)}<br>Número de suspensos: ${notas.length-contarAprobados(notas)}`;
    }
}


/* ==========================================================
   6) CÁLCULOS (funciones auxiliares con arrays)
   ========================================================== */

/**
 * Calcula la media de un array numérico.
 * @param {number[]} array Array de números.
 * @returns {number} Media de los valores.
 */
function calcularMedia(array) {
    let media = 0;
    for (let i = 0; i<array.length;i++){
        media+=array[i];
    }
    return media/array.length;
}

/**
 * Devuelve el valor máximo del array.
 * @param {number[]} array Array de números.
 * @returns {number} Valor máximo.
 */
function calcularMax(array) {
    let maximo = array[0];
    for (let i = 0; i < array.length;i++){
        if (array[i]>maximo){
            maximo = array[i];
        }
    }
    return maximo;
}

/**
 * Devuelve el valor mínimo del array.
 * @param {number[]} array Array de números.
 * @returns {number} Valor mínimo.
 */
function calcularMin(array) {
    let minimo = array[0];
    for (let i = 0; i < array.length;i++){
        if (array[i]<minimo){
            minimo = array[i];
        }
    }
    return minimo;
}

/**
 * Cuenta cuántas notas están aprobadas (>= 5).
 * @param {number[]} array Array de números.
 * @returns {number} Número de aprobados.
 */
function contarAprobados(array) {
    let contador = 0;
    for(let i = 0;i<array.length;i++){
        if (array[i] >= 5){
            contador++;
        }
    }
    return contador;
}


/* ==========================================================
   7) MENSAJES DE ERROR (sin alert)
   ========================================================== */

/**
 * Muestra un mensaje temporal en la web.
 * Debe desaparecer automáticamente después de unos segundos.
 * @param {string} texto Mensaje a mostrar.
 * @returns {void}
 */
function mostrarMensaje(texto) {
    const timeError = 2000;
    error.innerHTML+=`${texto}<br>`
    setTimeout(function(){
        limpiarMensaje();
    },timeError);
}

/**
 * Borra el mensaje actual de error.
 * @returns {void}
 */
function limpiarMensaje() {
    error.textContent = "";
}