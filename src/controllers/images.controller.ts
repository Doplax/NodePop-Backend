import { Request, Response } from "express";
import Product from "../models/Product.model";
import handleHttpError from "../shared/utils/errorHandler";

export const getImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product || !product.photo) {
      res.status(404).send({ message: "Image not found" });
      return;
    }

    const { data, contentType } = product.photo;
    console.log("contentType", contentType);
    res.set("Content-Type", contentType);
    if (data) {
      res.send(Buffer.from(data));
    }
  } catch (error) {
    handleHttpError(res, "ERROR_FETCHING_IMAGE", 404);
  }
};
