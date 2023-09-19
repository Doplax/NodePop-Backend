'use strict'

function creaSumador(){
    // Este contexto es accesible SIEMPRE
    // por la función que estamos devlviendo
    return function(otroNumero){
        return numero + otroNumero + nombre;
    }
}

const sumaSiete = creaSumador(7)

console.log(object);
