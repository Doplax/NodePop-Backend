import Product from "@/modules/Wallapop/Models/Product.model";
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
