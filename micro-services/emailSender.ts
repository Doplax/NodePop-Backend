import "dotenv/config";
import amqplib from "amqplib";
import nodemailer, { Transporter } from "nodemailer";

const QUEUE = "email-sender";

main().catch((err) => console.log("Hubo un error", err));

async function main() {
  const connection = await amqplib.connect(
    process.env.RABBITMQ_BROKER_URL as string,
  );
  const transport = await createTransport();

  const canal = await connection.createChannel();

  await canal.assertQueue(QUEUE, {
    durable: true,
  });

  canal.prefetch(1);

  canal.consume(QUEUE, async (mensaje) => {
    if (!mensaje) {
      return;
    }

    const payload = JSON.parse(mensaje.content.toString()) as {
      to: string;
      asunto: string;
      cuerpo: string;
    };

    const result = await transport.sendMail({
      from: process.env.EMAIL_SERVICE_FROM,
      to: payload.to,
      subject: payload.asunto,
      html: payload.cuerpo,
    });
    console.log(
      `URL de previsualización: ${nodemailer.getTestMessageUrl(result)}`,
    );

    canal.ack(mensaje);
  });
}

async function createTransport(): Promise<Transporter> {
  const testAccount = await nodemailer.createTestAccount();

  const developmetTransport = {
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  };

  return nodemailer.createTransport(developmetTransport);
}
