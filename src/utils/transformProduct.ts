import { Request } from "express";

interface ProductDoc {
  _doc?: any;
  _id: string;
  photo?: {
    data: any;
  };
  toObject?: () => any;
}

export const transformProduct = (product: ProductDoc, req: Request): any => {
  const productData = product._doc || product.toObject?.() || product;
  const { photo, ...rest } = productData;
  return {
    ...rest,
    imgSrc: photo?.data
      ? `${req.protocol}://${req.get("host")}/api/images/${product._id}`
      : null,
  };
};