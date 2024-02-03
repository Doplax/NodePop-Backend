import amqp, { Channel, Connection } from "amqplib";

// Conectar al broker de RabbitMQ
const canalPromise: Promise<Channel> = amqp
  .connect(process.env.RABBITMQ_BROKER_URL)
  .then(async (connection: Connection) => {
    return await connection.createChannel();
  });

export default canalPromise;
