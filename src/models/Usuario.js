const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailTransportConfigure = require("../lib/emailTransportConfigure");
const nodemailer = require("nodemailer");
const canalPromise = require("../lib/rabbitMQLib");

// Creacion del esquema
const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

// método estático que hace una hash de una password
// Tenemos que definir esta funcion antes de crear el modelo
usuarioSchema.statics.hashPassword = function (passwordEnClaro) {
  return bcrypt.hash(passwordEnClaro, 7); // 7 el numero de vueltas de hash, devuelve una promesa
};

// Método de instancia que comprueba la password de un usuario
usuarioSchema.methods.comparePassword = function (passwordEnClaro) {
  return bcrypt.compare(passwordEnClaro, this.password);
};

/** Envía un correo electrónico al usuario.
 *
 * Este método configura un transporte de correo electrónico y luego lo utiliza para
 * enviar un correo electrónico al usuario con el asunto y cuerpo especificados.
 *
 * @param {string} asunto - El asunto del correo electrónico.
 * @param {string} cuerpo - El cuerpo del correo electrónico en formato HTML.
 * @returns {Promise<Object>} Un objeto Promise que resuelve al resultado del envío de correo electrónico.
 */
usuarioSchema.methods.sendEmail = async function (asunto, cuerpo) {
  // Crear un Transport
  const transport = await emailTransportConfigure();

  // enviar email
  const result = await transport.sendMail({
    from: process.env.EMAIL_SERVICE_FROM,
    to: this.email,
    subject: asunto,
    html: cuerpo,
  });

  console.log(
    `URL de previsualización: ${nodemailer.getTestMessageUrl(result)}`,
  );
  return result;
};

// Método para pedir a otro servicio que envie un email (RabbitMQ)
usuarioSchema.methods.sendEmailRabbitMQ = async function (asunto, cuerpo) {
  // Cargar modulo de rabbitMQLib y enviamos un mensaje
  const canal = await canalPromise;

  // Aseuramos que existe el exchange
  const exchange = "email-request";
  await canal.assertExchange(exchange, "direct", {
    durable: true, // the exchange will survive broker restarts
  });

  const mensaje = {
    asunto,
    cuerpo,
  };

  canal.publish(exchange, "*", Buffer.from(JSON.stringify(mensaje)), {
    persistent: true, // the message will survive broker restarts
  });
};

// Creamos el modelo
const Usuario = mongoose.model("Usuario", usuarioSchema);

// Exportación del modelo
module.exports = Usuario;
