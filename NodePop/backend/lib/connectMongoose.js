// Recuerda, los modulos són singelton
const mongoose = require('mongoose');

mongoose.connection.on('error',err  => {
    console.log('Error de conexión',err);
})
mongoose.connection.once('open', () => {
    console.log('Conectado a MongoDB en', mongoose.connection.name);
});

mongoose.connect('mongodb://localhost') // No hace falta especificar el puerto? Se supone que si está en el x defecto no

module.exports = mongoose.connection;
