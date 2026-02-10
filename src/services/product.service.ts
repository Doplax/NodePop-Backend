import Product, { IProduct } from "../models/Product.model";
import { transformProduct } from "../shared/utils/transformProduct";
import { Request } from "express";

export class ProductService {
  async findAll(req: Request) {
    const products = await Product.find();
    return products.map((p) => transformProduct(p));
  }

  async findByIdOrFail(id: string, req: Request) {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return transformProduct(product);
  }

  async create(data: any, file: Express.Multer.File) {
    const product = await Product.create({
      ...data,
      photo: { data: file.buffer, contentType: file.mimetype },
    });
    return product;
  }

  async update(id: string, data: any, file?: Express.Multer.File) {
    const update = file
      ? { ...data, photo: { data: file.buffer, contentType: file.mimetype } }
      : data;

    const product = await Product.findOneAndUpdate({ _id: id }, update, {
      new: true,
      runValidators: true,
    });

    if (!product) throw new Error("NOT_FOUND"); // <-- centralize

    return product;
  }

  async delete(id: string) {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) throw new Error("NOT_FOUND"); // <-- centralize
    return deleted;
  }
}

export default new ProductService();
