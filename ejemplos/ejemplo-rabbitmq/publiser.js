'use strict'

const amqplib = require('amqplib')
const EXCHANGE = 'task-request'

// Usamos catch ya que al ser asincrono quremos capturar el error en el caso de que lo haya
main().catch(err => console.log('Hubo un error',err))

async function main(){
    // Conectar al broker de RabbitMQ
    const connection = await amqplib.connect('amqps://wcmodulk:diCQTAAKVIs8_-Rhp4ZU5zbAka9iOYsg@rat.rmq2.cloudamqp.com/wcmodulk') // La url la sacamos de CloudAMQP/Instancias/AMQP details/URL

    // Crear un canal
    const canal =  await connection.createChannel();

    // Asegurar que existe un exchange
    await canal.assertExchange(EXCHANGE, 'direct', {
        durable: true, // If rue, the exhange will survive broker restarts
    });


    while (true) {
        // Publicar mensajes
        const mensaje = {
            tarea: 'enviar un email'
        };

        canal.publish(EXCHANGE, '*', Buffer.from(JSON.stringify(mensaje)), {
            persistent: true, // the message will survive broker restarts
        })

        console.log('enviado mensaje', mensaje);
        await sleep(1000);
    }
}