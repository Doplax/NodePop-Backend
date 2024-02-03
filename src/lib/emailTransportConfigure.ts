import nodemailer, { Transporter } from "nodemailer";

export default async function createMailTransport(): Promise<Transporter> {
  // Entorno desarrollo
  const testAccount = await nodemailer.createTestAccount();

  const developmentTransport = {
    host: testAccount.smtp.host, // smtp.ethereal.email
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  };

  // Entorno de Producción
  const productionTransport = {
    service: process.env.EMAIL_SERVICE_NAME,
    auth: {
      user: process.env.EMAIL_SERVICE_USER,
      pass: process.env.EMAIL_SERVICE_PASS,
    },
  };
  console.log("process.env.NODE_ENV", process.env.NODE_ENV);

  // Se selecciona dependiendo del entorno en el que me encuentre
  const activeTransport =
    process.env.NODE_ENV === "development"
      ? developmentTransport
      : productionTransport;

  const transport = nodemailer.createTransport(activeTransport);

  return transport;
}
