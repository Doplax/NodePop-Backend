'use strict';

const EventEmitter = require('events');

const emisor = new EventEmitter();

emisor.on('Llamada de teléfono', function(quienLlama){
    if (quienLlama == 'padre') {
        return;
    }

    console.log('Ring Ring')
})

emisor.once('Llamada de teléfono', function(){
    console.log('brr brr');
}) // Escucha una sola vez

emisor.emit('Llamada de teléfono' , 'padre'); // se le pueden pasar N argumentos

function Persona(nombre){
    //...
}

const pepe = new Persona()