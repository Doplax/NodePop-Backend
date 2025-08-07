import Product from "@/modules/Products/Models/Product.model";
import { generateSwaggerSchema } from "@/utils/swaggerUtils";

const productSwaggerSchema = generateSwaggerSchema(Product.schema);

const productSwaggerDocs = {
  components: {
    schemas: {
      Product: productSwaggerSchema,
    },
  },
};

export {productSwaggerDocs};
