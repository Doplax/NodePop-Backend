'use strict';

// Cargar la libreria http
const http = require('http');
const Chance = require('chance');

const chance = new Chance();


// Defininir un servidor
const servidor = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`<p>Wake up ${chance.city()}</p>`)
})

// Arrancamos el servidor

servidor.listen(4444,'127.0.0.1');

console.log('Servidor arrancado en ...');

