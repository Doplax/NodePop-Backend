'use strict';
console.log('================================================');
// crear una funcion para usarla como constructor de objetos
function Fruta(nombre){
    this.nombre = nombre;
    this.saluda = function() {
        console.log('Hola soy', this.nombre);
    }
}

const limon = new Fruta('Limon');

console.log(limon)

// limon.saluda()

setTimeout(limon.saluda, 2000);

// JS busca el punto a la izquierda de los parentesis de ejecucion,
// y lo que haya a la izquierda de  ese punto, lo usa como this.




