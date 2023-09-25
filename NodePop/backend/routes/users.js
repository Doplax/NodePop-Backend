var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const usuarios = [
    {nombre: 'Smith' , edad:37},
    {nombre: 'Pedro' , edad:32}
  ]

  //res.send(usuarios);

  const filtroName = req.query.name;

  if (filtroName) {
    res.json(usuarios.filter(usuario => usuario.nombre === filtroName))
  } else {
    res.jaon(usuarios)
  }

  res.json(usuarios); // Hace lo mismo que arriba pero devolviendo un json

});

// POST /users/ (body)
router.post('/', (req, res, next) =>{
  console.log(req.body);
  res.send('recibido');
})

module.exports = router;
