const mongoose = require('mongoose');

// Creacion del esquema
const usuarioSchema = mongoose.Schema({
    email: { type: String, unique: true},
    password: String
});

// Creamos el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Exportación del modelo
module.exports = Usuario;
