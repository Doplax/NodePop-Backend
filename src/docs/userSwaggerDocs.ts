import User from "@/models/User";
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
