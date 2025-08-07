import User from "@/modules/Products/Models/User.model";
import { generateSwaggerSchema } from "@/utils/swaggerUtils";

const userSwaggerSchema = generateSwaggerSchema(User.schema);

const userSwaggerDocs = {
  components: {
    schemas: {
      User: userSwaggerSchema,
    },
  },
};

export {userSwaggerDocs};
