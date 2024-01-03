const mongoose = require('mongoose');

// Creacion del esquema
const usuarioSchema = mongoose.Schema({
    email: String,
    password: String
});

// Creamos el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Exportación del modelo
module.exports = Usuario;
