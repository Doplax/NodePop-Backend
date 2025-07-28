import { Schema } from "mongoose";

// Tipo para campos Swagger (muy simplificado)
interface SwaggerProperty {
  type: string;
  enum?: string[];
  minimum?: number;
  maximum?: number;
  default?: unknown;
}

interface SwaggerSchema {
  type: "object";
  required?: string[];
  properties: Record<string, SwaggerProperty>;
}

// Función principal
export function generateSwaggerSchema(mongooseSchema: Schema): SwaggerSchema {
  const swaggerSchema: SwaggerSchema = {
    type: "object",
    properties: {},
  };

  Object.entries(mongooseSchema.paths).forEach(([key, value]: [string, any]) => {
    if (key === "_id" || key === "__v") return;

    const fieldSchema: SwaggerProperty = {
      type: mapMongooseTypeToSwaggerType(value.instance),
    };

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
}

// Mapeo de tipos Mongoose a Swagger
function mapMongooseTypeToSwaggerType(type: string): string {
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
      return "string"; // MongoDB ObjectId
    default:
      return "string";
  }
}
