const swaggerJsdoc = require("swagger-jsdoc");
const path = require("node:path");

// Importar documentación modular
const { productSwaggerDocs, userSwaggerDocs } = require("../docs");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NodePop API",
      version: "1.0.0",
      description: "Documentación generada automáticamente",
    },
    components: {
      schemas: {
        ...productSwaggerDocs.components.schemas,
        ...userSwaggerDocs.components.schemas,
      },
    }
    //
    //paths: {
    //  ...productDocs.paths, // Rutas de productos
    //  ...authDocs.paths, // Rutas de autenticación
    //},
  },
  apis: [path.join(__dirname, "../routes/**/*.js")], // adds aditional comments
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;
