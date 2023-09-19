'use strict';

function escibeTras2Segundos(texto, callback){
    setTimeout(function(){
        console.log(texto);
        callback()
    },2000);
}



//for (let i = 0; i <=5 ; i++){
//     escibeTras2Segundos('texto1', function(){
//        escibeTras2Segundos('texto2', function(){
//            console.log('fin');
//        })
//    })
    
//}

function serie(n, fn){
    if(n == 0){
        callback();
        return;
    };

    n = n - 1;
    fn('texto' + n, function(){
        serie(n,fn,callback)
    })
}

serie([1,2,3,'cuatro',5], escibeTras2Segundos, function(){
    console.log();
})


//escibeTras2Segundos('texto' + i, function(){
//    console.log('fin');
//})