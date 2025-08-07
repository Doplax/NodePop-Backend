import { Request, Response, NextFunction } from "express";
import { validateSync } from "class-validator";
import { plainToClass } from "class-transformer";
import ProductMongooseModel, { Product } from "@/modules/wallapop/models/Product.model"; 
import handleHttpError from "@/utils/errorHandler";


export const validateProduct = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const productData = plainToClass(Product, req.body); 
    const error = validateSync(productData);
    
    if (error.length > 0) {
      handleHttpError(res, `VALIDATION_ERROR ${error}`, 403,); 
      return;
    }
    
    req.body = productData;  
    next();
  } catch (error: any) {
    handleHttpError(res, `VALIDATION_FAILED: ${error.message}`, 403);
  }
};

export const verifyProductExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params; 
  try {
    const product = await ProductMongooseModel.findById(id); 
    
    if (!product) {
      handleHttpError(res, "PRODUCT_NOT_FOUND", 404);
      return;
    }
    next();
  } catch (error: any) {
    handleHttpError(res, `ERROR_VERIFYING_PRODUCT: ${error.message}`, 500);
  }
};

export default { validateProduct, verifyProductExists }; 