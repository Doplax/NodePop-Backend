import { Request, Response } from "express";
import { matchedData } from "express-validator";
import handleHttpError from "@/utils/errorHandler";
import { ProductService } from "@/modules/wallapop/services/product.service"; 

const productService = new ProductService(); 

export const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productService.getAllProducts(req); 
    res.send(products);
  } catch (error) {
    handleHttpError(res, "ERROR_FETCHING_PRODUCTS", 404);
  }
};

export const getItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id, req); 
    if (!product) {
      handleHttpError(res, "ERROR_GET_ITEM: Product not Found", 404);
      return;
    }
    res.send(product);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

export const createItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = matchedData(req, { locations: ["body"] });
    console.log(body);
    const file = req.file;
    if (!file) {
      handleHttpError(res, "ERROR_CREATE_ITEMS: No images were uploaded", 400);
      return;
    }
    //@ts-ignore
    const data = await productService.createProduct(body, file); 
    res.send({ data });
  } catch (error: any) {
    handleHttpError(res, `ERROR_CREATE_ITEMS: ${error.message}`);
  }
};

export const updateItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const body = matchedData(req);
    const file = req.file;
    //@ts-ignore
    const data = await productService.updateProduct(id, body, file); 
    if (!data) {
      handleHttpError(res, "ERROR_UPDATE_ITEM: Product not Found", 404);
      return;
    }
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_ITEM");
  }
};

export const deleteItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await productService.deleteProduct(id); 
    if (!data) {
      handleHttpError(res, "PRODUCT_NOT_FOUND", 404);
      return;
    }
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};