'use strict';

require('dotenv').config();

const readline = require('node:readline');
const connection = require('./lib/connectMongoose');

const { Agente, Usuario } = require('./models');


main().catch(err => console.log('Hubo un error', err));

async function main() {

  // espero a que se conecte a la base de datos
  await new Promise(resolve => connection.once('open', resolve))

  const borrar = await pregunta(
    'Estas seguro de que quieres borrar la base de datos y cargar datos iniciales?'
  )
  if (!borrar) {
    process.exit();
  }

  await initUsuarios();

  await initAgentes();

  connection.close();
}

async function initAgentes() {
  // borrar todos los documentos de la colección de agentes
  const deleted = await Agente.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} agentes.`);

  const [ adminUser, usuario1User ] = await Promise.all([
    Usuario.findOne({ email: 'admin@example.com'}),
    Usuario.findOne({ email: 'usuario1@example.com' })
  ])

  // crear agentes iniciales
  const inserted = await Agente.insertMany([
    { "name": "Smith", "age": 33, owner: adminUser._id },
    { "name": "Jones", "age": 23, owner: adminUser._id },
    { "name": "Brown", "age": 46, owner: usuario1User._id }
  ]);
  console.log(`Creados ${inserted.length} agentes.`);
}

async function initUsuarios() {
  // eliminar
  const deleted = await Usuario.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} usuarios.`);

  // crear
  const inserted = await Usuario.insertMany([
    { email: 'admin@example.com', password: await Usuario.hashPassword('1234')},
    { email: 'usuario1@example.com', password: await Usuario.hashPassword('1234')},
  ]);
  console.log(`Creados ${inserted.length} usuarios.`)
}

function pregunta(texto) {
  return new Promise((resolve, reject) => {
    // conectar readline con la consola
    const ifc = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    ifc.question(texto, respuesta => {
      ifc.close();
      resolve(respuesta.toLowerCase() === 'si');
    })
  });
}