import User from "@/modules/Wallapop/Models/User.model";
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
