const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Creacion del esquema
const usuarioSchema = mongoose.Schema({
    email: { type: String, unique: true},
    password: String
});

// método estático que hace una hash de una password
// Tenemos que definir esta funcion antes de crear el modelo
usuarioSchema.statics.hashPassword = function (passwordEnClaro) {
    return bcrypt.hash(passwordEnClaro, 7) // 7 el numero de vueltas de hash, devuelve una promesa
}

// Método de instancia que comprueba la password de un usuario
usuarioSchema.methods.comparePassword = function (passwordEnClaro) {
    return bcrypt.compare(passwordEnClaro,this.password)
}


// Creamos el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Exportación del modelo
module.exports = Usuario;
