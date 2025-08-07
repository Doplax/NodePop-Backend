import { Request } from "express";
import Product, { IProduct } from "@/modules/wallapop/models/Product.model"; // <-- removed IProductDocument
import { transformProduct } from "@/utils/transformProduct";

type ProductBody = {
  name: string; // <-- e.g., "TV"
  price: number; // <-- e.g., 200
  isForSale?: boolean; // <-- e.g., true
  tags?: string[]; // <-- e.g., ["Laptop"]
  [key: string]: unknown;
};

type ProductFile = {
  buffer: Buffer; // <-- e.g., <Buffer ...>
  mimetype: string; // <-- e.g., "image/png"
};

export class ProductService {
  async getAllProducts(req: Request): Promise<ReturnType<typeof transformProduct>[]> {
    const products: IProduct[] = await Product.find({}); // <-- use IProduct
    // products: [IProduct, IProduct, ...]
    return products.map((product) => transformProduct(product, req));
    // transformProduct(product, req): e.g., TransformedProduct
  }

  async getProductById(id: string, req: Request): Promise<ReturnType<typeof transformProduct> | null> {
    const product: IProduct | null = await Product.findById(id); // <-- use IProduct
    // product: IProduct | null
    if (!product) return null;
    return transformProduct(product, req);
  }

  async createProduct(body: ProductBody, file: ProductFile): Promise<IProduct> {
    // body: { name: "TV", price: 200 }
    // file: { buffer: <Buffer>, mimetype: "image/png" }
    return Product.create({
      ...body,
      photo: { data: file.buffer, contentType: file.mimetype }
    });
  }

  async updateProduct(
    id: string,
    body: ProductBody,
    file?: ProductFile
  ): Promise<IProduct | null> { // <-- use IProduct
    // id: "abc123"
    // body: { name: "TV", price: 250 }
    // file: { buffer: <Buffer>, mimetype: "image/png" } | undefined
    const update = file
      ? { ...body, photo: { data: file.buffer, contentType: file.mimetype } }
      : body;
    return Product.findOneAndUpdate({ _id: id }, update, {
      new: true,
      runValidators: true,
    });
  }

  async deleteProduct(id: string): Promise<IProduct | null> { // <-- use IProduct
    // id: "abc123"
    return Product.findByIdAndDelete(id);
  }
}