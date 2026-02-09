import { IProduct } from "../../models/Product.model";

export const transformProduct = (product: IProduct): any => {
  const obj = product.toObject();
  
  if (obj.photo && obj.photo.data) {
    obj.photo = `/images/${product._id}`;
  }
  
  return obj;
};
