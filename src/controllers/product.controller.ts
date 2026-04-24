import { Request, Response } from "express";
import handleHttpError from "../shared/utils/errorHandler";
import productService from "../services/product.service";
import { ProductData } from "../models/Product.model";

const { matchedData } = require("express-validator");

export const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productService.findAll(req);
    res.send(products);
  } catch (error: unknown) {
    handleHttpError(res, "ERROR_FETCHING_PRODUCTS", 500);
  }
};

export const getItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productService.findByIdOrFail(req.params.id, req);
    res.send(product);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      handleHttpError(res, "PRODUCT_NOT_FOUND", 404);
      return;
    }
    handleHttpError(res, "ERROR_GET_ITEM", 500);
  }
};

export const createItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const body: ProductData = matchedData(req, { locations: ["body"] });
    if (!req.file) {
      handleHttpError(res, "NO_IMAGE_UPLOADED", 400);
      return;
    }
    const product = await productService.create(body, req.file);
    res.status(201).send({ data: product });
  } catch (error: unknown) {
    handleHttpError(res, "ERROR_CREATE_PRODUCT", 500);
  }
};

export const updateItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const body: Partial<ProductData> = matchedData(req);
    const updated = await productService.update(req.params.id, body, req.file);
    res.send({ data: updated });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      handleHttpError(res, "PRODUCT_NOT_FOUND", 404);
      return;
    }
    handleHttpError(res, "ERROR_UPDATE_PRODUCT", 500);
  }
};

export const deleteItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await productService.delete(req.params.id);
    res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      handleHttpError(res, "PRODUCT_NOT_FOUND", 404);
      return;
    }
    handleHttpError(res, "ERROR_DELETE_PRODUCT", 500);
  }
};
