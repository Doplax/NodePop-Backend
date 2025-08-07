import swaggerJSDoc from "swagger-jsdoc";
import path from "node:path";

import { productSwaggerDocs, userSwaggerDocs } from "@/modules/swagger/docs/index";

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
  apis: [path.join(__dirname, "../routes/**/*.{js,ts}")], // adds aditional comments
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
