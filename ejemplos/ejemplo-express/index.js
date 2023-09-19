'use strict';

// cargar la libreria de express
const express = require('express');

// Crear la acplicacion
const app = express();

//Añadir una ruta
app.get('/', (request, response, next) => {
    response.send('Hola')

})

//Arrancamos el servidor
app.listen(8000, () => {
    console.log('Servidor HTTP arrancado en http:/127.0.0.1:8000')
})