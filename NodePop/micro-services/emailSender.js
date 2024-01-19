'use strict';

require('dotenv').config();

const amqplib = require('amqplib');
const nodemailer = require('nodemailer');

const QUEUE = 'email-sender';

main().catch(err => console.log('Hubo un error', err));

/**
 * Función para simular una espera.
 * @param {number} ms - Milisegundos a esperar.
 * @returns {Promise} - Una promesa que se resuelve después del tiempo especificado.
 */
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Función principal que conecta con RabbitMQ y consume mensajes de la cola.
 */
async function main() {
  // conectar al broker de RabbitMQ
  const connection = await amqplib.connect(process.env.RABBITMQ_BROKER_URL);
  const transport = await createTransport();

  // crear un canal
  const canal = await connection.createChannel();

  // asegurar que existe la cola para recibir mensajes
  await canal.assertQueue(QUEUE, {
    durable: true,
  });

  canal.prefetch(1);

  canal.consume(QUEUE, async mensaje => {
    const payload = JSON.parse(mensaje.content.toString());

    const result = await transport.sendMail({
      from: process.env.EMAIL_SERVICE_FROM,
      to: payload.to,
      subject: payload.asunto,
      html: payload.cuerpo
    });
    console.log(`URL de previsualización: ${nodemailer.getTestMessageUrl(result)}`);

    canal.ack(mensaje);
  });

}

/**
 * Crea un transporte de nodemailer para enviar correos electrónicos.
 * @returns {nodemailer.Transporter} - Un transporte de nodemailer.
 */
async function createTransport() {
  // entorno desarrollo
  const testAccount = await nodemailer.createTestAccount();

  const developmetTransport = {
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
        user: testAccount.user,
        pass: testAccount.pass
    }
  }

  return nodemailer.createTransport(developmetTransport);
}
