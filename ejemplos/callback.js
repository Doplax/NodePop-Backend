'use strict';

function suma(a,b,callback){
    // hacer algo que tarda mucho
    let resSuma = a + b;
    callback(resSuma)
}


const resultado = suma(2,4, function(resultado){
    console.log(resultado);
})

