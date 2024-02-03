const session = require("express-session");
const MongoStore = require("connect-mongo");

module.exports = session({
  // Define el nombre de la cookie de sesión.
  name: "nodeapp-session",
  // Establece una clave secreta para firmar las cookies de sesión.
  secret: "as98987asd98ashiujkasas768tasdgyy",
  // Indica si se deben guardar sesiones no inicializadas.
  saveUninitialized: true,
  // Indica si se debe volver a guardar la sesión incluso si no se ha modificado.
  resave: false,
  // Configura las opciones de la cookie de sesión, en este caso, su tiempo de vida.
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 2, // 2 días en milisegundos.
  },
  // Utiliza MongoStore como almacén de sesiones y se conecta a una base de datos MongoDB
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
});
