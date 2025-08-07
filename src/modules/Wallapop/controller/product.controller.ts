import { Request, Response } from "express";
import Product from "@/modules/Wallapop/Models/Product.model";
import { matchedData } from "express-validator";
import handleHttpError from "@/utils/errorHandler";
import { transformProduct } from "@/utils/transformProduct";

export const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find({});
    const transformedProducts = products.map((product) => transformProduct(product, req));
    res.send(transformedProducts);
  } catch (error) {
    handleHttpError(res, "ERROR_FETCHING_PRODUCTS", 404);
  }
};

export const getItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      handleHttpError(res, "ERROR_GET_ITEM: Product not Found", 404);
      return;
    }

    // Transformar un único producto
    const transformedProduct = transformProduct(product, req);
    res.send(transformedProduct);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

export const createItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = matchedData(req, { locations: ["body"] });
    const file = req.file;
    if (!file) {
      handleHttpError(
        res,
        "ERROR_CREATE_ITEMS: No images were uploaded",
        400
      );
      return;
    }
    console.log(body);
    const data = await Product.create({
      ...body,
      photo: {
        data: file.buffer,
        contentType: file.mimetype,
      }
    });
    //await data.createThumbnail();

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

    const currentProduct = await Product.findById(id);
    if (!currentProduct) {
      handleHttpError(res, "ERROR_UPDATE_ITEM: Product not Found", 404);
      return;
    }

    if (file) {
      //await deleteOldPhotoAndThumbnail(currentProduct.photo);
    }

    const update = file ? { ...body, photo: { data: file.buffer, contentType: file.mimetype } } : body;
    const data = await Product.findOneAndUpdate({ _id: id }, update, {
      new: true,
      runValidators: true,
    });

    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_ITEM");
  }
};

export const deleteItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await Product.findByIdAndDelete(id);

    if (!data) {
      handleHttpError(res, "PRODUCT_NOT_FOUND", 404);
      return;
    }

    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};