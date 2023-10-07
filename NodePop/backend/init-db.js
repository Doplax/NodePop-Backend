// Para resetear la base de datos de la aplicación
"use strict";

const readline = require("node:readline"); // 'node:' Se usa para especificar que es nativa de node

const connection = require("./lib/connectMongoose");
const Agente = require("./models/Agente");
const { resolve } = require("node:path");

main().catch((err) => console.error(err));

async function main() {
    // Espero a que se conecte a la base de datos
    await new Promise(resolve => connection.once('open', resolve)); // Con esto se evita que aparezca este mensaje pegado al de func pregunta()

    const borrar = await pregunta(
        "Estas seguro de que quieres borrar la base de datos y cargar datos iniciales?"
    );
    if (!borrar) {
        process.exit();
    }

    // Inicializar la colección de agentes
    await initAgentes();

    await connection.close();
}

async function initAgentes() {
  // Borrar todos los documentos de la colección de agentes
  const deleted = await Agente.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} agentes.`);

  //Crear agentes iniciales
  const inserted = await Agente.insertMany([
    { name: "John", age: 28 },
    { name: "Jane", age: 45 },
    { name: "Emily", age: 22 },
    { name: "Michael", age: 35 },
    { name: "Sarah", age: 40 },
    { name: "David", age: 29 },
    { name: "Lucy", age: 31 },
    { name: "Daniel", age: 24 },
    { name: "Sophia", age: 55 },
    { name: "Jack", age: 18 },
  ]);
  console.log(`Creados ${inserted.length} agentes.`);
}

function pregunta(texto) {
  return new Promise(function (resolve, reject) {
    // Conectart readline con la consola
    const ifc = readline.createInterface({ // ifc = Interface es un palabra reservada, por eso usamos esta
      input: process.stdin,
      output: process.stdout,
    });
    ifc.question(texto, (respuesta) => {
        ifc.close();
        if (respuesta.toLocaleLowerCase() === 'si') {
            resolve(true);
        } else {
            resolve(false);
        }
    });
  });
}
