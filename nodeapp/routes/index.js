var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.texto = 'Hola';

  const ahora = new Date();
  res.locals.esPar = (ahora.getSeconds() % 2) === 0 ;
  res.locals.segundoActual = ahora.getSeconds();

  res.locals.usuarios = [
    {nombre: 'Smith' , edad:37},
    {nombre: 'Pedro' , edad:32}

  ]

  res.render('index') // Sin esto no cargará la página
});

//router.get('/facturas', (req, res, next) => {
//  res.send('lista de facturas')
//})

module.exports = router;
