const Product = require("../models/Product");
const { generateSwaggerSchema } = require("../utils/swaggerUtils");

// Generar el esquema Swagger dinámicamente desde el modelo Mongoose
const productSwaggerSchema = generateSwaggerSchema(Product.schema);

const productSwaggerDocs = {
  components: {
    schemas: {
      Product: productSwaggerSchema, // Esquema del producto
    },
  },
  //!En el caso de que quisieramos definir las rutas aqui en vez del fichero api/auth
  //paths: {
  //  "/api/products": {
  //    post: {
  //      summary: "Crea un nuevo producto",
  //      tags: ["Products"],
  //      requestBody: {
  //        required: true,
  //        content: {
  //          "application/json": {
  //            schema: {
  //              $ref: "#/components/schemas/Product", // Referencia al esquema Product
  //            },
  //          },
  //        },
  //      },
  //      responses: {
  //        201: {
  //          description: "Producto creado exitosamente",
  //        },
  //      },
  //    },
  //  },
  //},
};

module.exports = productSwaggerDocs;
