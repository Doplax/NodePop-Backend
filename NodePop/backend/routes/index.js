var express = require('express');
var router = express.Router();
const Product = require('../models/Product')


/* GET home page. */
router.get('/', async function(req, res, next) {

  try {
    const products = await Product.find({})
    res.locals.products = products;
    res.render('index');

  } catch (err) {
    next(err)
  }


  //res.render('index') // Sin esto no cargará la página
});



router.get('/parametro_en_ruta/:numero', (req, res, next) => {
  const numero = req.params.numero;

  res.sendStatus('he recibido el número: ' + numero);
})


// GET / parametro_opcional/66
router.get('/parametro_opcional:numero?', (req, res, next) => {
  const numero = req.params.numero;

  res.sendStatus('(opcional e recibido el numero: ' + numero);
})// el ? indica que puede venir o no


//GET //http://localhost:3000/producto/zapatos/talla/42/color/rojo
router.get('/producto/:nombre/talla/:talla/color/:color',(req, res, next) => {
  console.log(req.params);
  //const nombre = req.params.nombre;
  //const talla = req.params.talla;
  //const color = req.params.color;

  const { nombre, talla, color } = req.params // Asi nos ahorramos las 3 lineas de arriba

  res.send(`Me pediste ${nombre} talla ${talla} color ${color}`);

}); 


module.exports = router;
