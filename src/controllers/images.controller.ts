import { Request, Response } from "express";
import { Types } from "mongoose";
import Product from "../models/Product.model";
import handleHttpError from "../shared/utils/errorHandler";

export const getImage = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) {
    handleHttpError(res, "INVALID_PRODUCT_ID", 400);
    return;
  }
  try {
    const product = await Product.findById(id).select("photo updatedAt");
    if (!product || !product.photo?.data) {
      handleHttpError(res, "IMAGE_NOT_FOUND", 404);
      return;
    }

    const { data, contentType } = product.photo;
    res.set("Content-Type", contentType || "application/octet-stream");
    res.set("Cache-Control", "public, max-age=86400");
    if (product.updatedAt) {
      res.set("Last-Modified", product.updatedAt.toUTCString());
    }
    res.send(Buffer.from(data));
  } catch (error) {
    console.error(error);
    handleHttpError(res, "ERROR_FETCHING_IMAGE", 500);
  }
};
