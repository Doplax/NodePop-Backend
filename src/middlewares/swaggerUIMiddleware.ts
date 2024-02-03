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
  apis: ["./routes/*.js"], // Ajusta la ruta según la estructura de tu proyecto
};

const specification = swaggerJSDoc(options);

const swaggerMiddleware = [swaggerUI.serve, swaggerUI.setup(specification)];

export { swaggerMiddleware };
