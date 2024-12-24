const UserModel = require("../models/User");
const { generateSwaggerSchema } = require("../utils/swaggerUtils");

// Generar el esquema Swagger dinámicamente desde el modelo Mongoose
const UserSwaggerSchema = generateSwaggerSchema(UserModel.schema);

const userSwaggerDocs = {
  components: {
    schemas: {
      User: UserSwaggerSchema, // Esquema del producto
    },
  },
};

module.exports = userSwaggerDocs;
