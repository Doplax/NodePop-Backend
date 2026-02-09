import { Request, Response, NextFunction } from "express";
import Product from "../models/Product.model";
import handleHttpError from "../shared/utils/errorHandler";

const verifyProductExists = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      handleHttpError(res, "PRODUCT_NOT_FOUND", 404);
      return;
    }
    next();
  } catch (error: any) {
    handleHttpError(res, `ERROR VERIFYING PRODUCT: ${error.message}`, 500);
  }
};

export default verifyProductExists;
