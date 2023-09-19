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

limon.saluda()

