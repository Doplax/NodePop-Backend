const generateSwaggerSchema = (mongooseSchema) => {
  const swaggerSchema = {
    type: "object",
    properties: {},
  };

  Object.entries(mongooseSchema.paths).forEach(([key, value]) => {
    if (key === "_id") return; // Ignorar el campo _id
    if (key === "__v") return; // Ignorar el campo de versión

    const fieldSchema = {
      type: mapMongooseTypeToSwaggerType(value.instance),
    };

    // Añadir restricciones de validación
    if (value.options.required) {
      swaggerSchema.required = swaggerSchema.required || [];
      swaggerSchema.required.push(key);
    }
    if (value.options.enum) {
      fieldSchema.enum = value.options.enum;
    }
    if (value.options.min !== undefined) {
      fieldSchema.minimum = value.options.min;
    }
    if (value.options.max !== undefined) {
      fieldSchema.maximum = value.options.max;
    }
    if (value.options.default !== undefined) {
      fieldSchema.default = value.options.default;
    }

    swaggerSchema.properties[key] = fieldSchema;
  });

  return swaggerSchema;
};

const mapMongooseTypeToSwaggerType = (type) => {
  switch (type) {
    case "String":
      return "string";
    case "Number":
      return "number";
    case "Boolean":
      return "boolean";
    case "Array":
      return "array";
    case "ObjectId":
      return "string"; // Para IDs de MongoDB
    default:
      return "string";
  }
};

module.exports = { generateSwaggerSchema };
