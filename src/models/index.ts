import Product from "./Product";
import User from "./User";

const models: { Product: typeof Product; User: typeof User } = {
  Product,
  User,
};

export { Product, User };
export default models;
