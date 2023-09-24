var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.texto = 'Hola';
  res.render('index', { title: 'Node' });
});

//router.get('/facturas', (req, res, next) => {
//  res.send('lista de facturas')
//})

module.exports = router;
