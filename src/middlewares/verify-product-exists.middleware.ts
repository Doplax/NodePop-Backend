import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import Product from "../models/Product.model";
import handleHttpError from "../shared/utils/errorHandler";

const verifyProductExists = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) {
    handleHttpError(res, "INVALID_PRODUCT_ID", 400);
    return;
  }
  try {
    const exists = await Product.exists({ _id: id });
    if (!exists) {
      handleHttpError(res, "PRODUCT_NOT_FOUND", 404);
      return;
    }
    next();
  } catch (error) {
    console.error(error);
    handleHttpError(res, "ERROR_VERIFYING_PRODUCT", 500);
  }
};

export default verifyProductExists;
