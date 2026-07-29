import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { Types } from "mongoose";
import handleHttpError from "../shared/utils/errorHandler";
import productService, { ListQuery } from "../services/product.service";
import { ProductData } from "../models/Product.model";

const isValidObjectId = (id: string): boolean => Types.ObjectId.isValid(id);

export const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await productService.findAll(req.query as ListQuery);
    res.send(result);
  } catch (error) {
    console.error(error);
    handleHttpError(res, "ERROR_FETCHING_PRODUCTS", 500);
  }
};

export const getItem = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  if (!isValidObjectId(req.params.id)) {
    handleHttpError(res, "INVALID_PRODUCT_ID", 400);
    return;
  }
  try {
    const product = await productService.findByIdOrFail(req.params.id);
    res.send(product);
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      handleHttpError(res, "PRODUCT_NOT_FOUND", 404);
      return;
    }
    console.error(error);
    handleHttpError(res, "ERROR_GET_ITEM", 500);
  }
};

export const createItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!req.file) {
    handleHttpError(res, "NO_IMAGE_UPLOADED", 400);
    return;
  }
  try {
    const body = matchedData(req, { locations: ["body"] }) as ProductData;
    const product = await productService.create(body, req.file);
    res.status(201).send({ data: product });
  } catch (error) {
    console.error(error);
    handleHttpError(res, "ERROR_CREATE_PRODUCT", 500);
  }
};

export const updateItem = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  if (!isValidObjectId(req.params.id)) {
    handleHttpError(res, "INVALID_PRODUCT_ID", 400);
    return;
  }
  try {
    const body = matchedData(req, {
      locations: ["body"],
    }) as Partial<ProductData>;
    const updated = await productService.update(req.params.id, body, req.file);
    res.send({ data: updated });
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      handleHttpError(res, "PRODUCT_NOT_FOUND", 404);
      return;
    }
    console.error(error);
    handleHttpError(res, "ERROR_UPDATE_PRODUCT", 500);
  }
};

export const deleteItem = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  if (!isValidObjectId(req.params.id)) {
    handleHttpError(res, "INVALID_PRODUCT_ID", 400);
    return;
  }
  try {
    await productService.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      handleHttpError(res, "PRODUCT_NOT_FOUND", 404);
      return;
    }
    console.error(error);
    handleHttpError(res, "ERROR_DELETE_PRODUCT", 500);
  }
};
