// Para resetear la base de datos de la aplicación
'use strict';


const connection = require('./lib/connectMongoose')
const Agente = require('./models/Agente')

main().catch(err => console.error(err));

async function main() {
    // Inicializar la colección de agentes

    await initAgentes();

    await connection.close();
}


async function initAgentes() {
    // Borrar todos los documentos de la colección de agentes
    const deleted = await Agente.deleteMany();
    console.log(`Eliminados ${deleted.deletesCount} agentes.`);

    //Crear agentes iniciales 
    const inserted = await Agente.insertMany([
        { name: 'John', age: 28 },
        { name: 'Jane', age: 45 },
        { name: 'Emily', age: 22 },
        { name: 'Michael', age: 35 },
        { name: 'Sarah', age: 40 },
        { name: 'David', age: 29 },
        { name: 'Lucy', age: 31 },
        { name: 'Daniel', age: 24 },
        { name: 'Sophia', age: 55 },
        { name: 'Jack', age: 18 }
    ])
    console.log(`Creados ${inserted.length} agentes.`)
}



