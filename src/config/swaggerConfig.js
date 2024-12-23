const path = require("node:path");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Autogenerada por Swagger para la API",
    },
  },
  apis: [path.join(__dirname, "../docs/**/*.js")], // Ruta a los archivos de Swagger
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;
