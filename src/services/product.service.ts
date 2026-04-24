import Product, { IProduct, ProductData } from "../models/Product.model";
import { transformProduct } from "../shared/utils/transformProduct";
import { Request } from "express";

export class ProductService {
  async findAll(req: Request): Promise<any[]> {
    const products = await Product.find();
    return products.map((p) => transformProduct(p));
  }

  async findByIdOrFail(id: string, req: Request): Promise<any> {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("NOT_FOUND");
    }
    return transformProduct(product);
  }

  async create(data: ProductData, file: Express.Multer.File): Promise<IProduct> {
    const product = await Product.create({
      ...data,
      photo: { data: file.buffer, contentType: file.mimetype },
    });
    return product;
  }

  async update(id: string, data: Partial<ProductData>, file?: Express.Multer.File): Promise<any> {
    const update = file
      ? { ...data, photo: { data: file.buffer, contentType: file.mimetype } }
      : data;

    const product = await Product.findOneAndUpdate({ _id: id }, update, {
      new: true,
      runValidators: true,
    });

    if (!product) throw new Error("NOT_FOUND");

    return product;
  }

  async delete(id: string): Promise<any> {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) throw new Error("NOT_FOUND");
    return deleted;
  }
}

export default new ProductService();
