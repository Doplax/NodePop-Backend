"use strict";

const readline = require("node:readline");
const fs = require("fs").promises; // Asegúrate de añadir esto para leer el archivo JSON
const path = require("node:path");

const connection = require("../lib/connectMongoose");
const Producto = require("../models/Product"); // Cambiado de Agente a Producto

main().catch((err) => console.error(err));

async function main() {
    await new Promise(resolve => connection.once('open', resolve));

    const borrar = await pregunta(
        "Estas seguro de que quieres borrar la base de datos y cargar datos iniciales?"
    );
    if (!borrar) {
        process.exit();
    }

    await initProductos(); // Cambiado de initAgentes a initProductos

    await connection.close();
}

async function initProductos() {
  const deleted = await Producto.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} productos.`);

  // Lee los datos iniciales desde product-list.json
  const jsonData = await fs.readFile(path.join(__dirname, "product-list.json"), "utf-8");
  const productos = JSON.parse(jsonData);

  const inserted = await Producto.insertMany(productos);
  console.log(`Creados ${inserted.length} productos.`);
}

function pregunta(texto) {
  return new Promise(function (resolve) {
    const ifc = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    ifc.question(texto, (respuesta) => {
        ifc.close();
        resolve(respuesta.toLocaleLowerCase() === 'si');
    });
  });
}
