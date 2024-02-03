import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const options = {
  swaggerDefinition: {
    info: {
      title: "NodeApp API",
      version: "0.1",
      description: "API de agentes",
    },
  },
  //apis: ['swagger.yml'], // Para cogerla del documnento
  apis: ["./routes/*.js"], // O la ruta donde tienes tus definiciones de API.
};

const expecificacion = swaggerJSDoc(options);

module.exports = [swaggerUI.serve, swaggerUI.setup(expecificacion)];
