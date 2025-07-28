import { Request } from "express";

interface ProductDoc {
  _doc: any;
  _id: string;
  photo?: {
    data: any;
  };
}

export const transformProduct = (product: ProductDoc, req: Request): any => {
  const { photo, ...rest } = product._doc; // Excludes `photo` property
  return {
    ...rest,
    imgSrc: photo?.data
      ? `${req.protocol}://${req.get("host")}/api/images/${product._id}`
      : null,
  };
};