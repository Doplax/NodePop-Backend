const amqplib = require('amqplib');

// conectar al broker de RabbitMQ
const canalPromise = amqplib.connect(process.env.RABBITMQ_BROKER_URL)
    .then(async connection => {
        return canal = await connection.createChannel();
    })

module.exports = canalPromise; 