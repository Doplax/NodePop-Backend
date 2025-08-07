import { Request } from "express";
import { DocumentType } from "@typegoose/typegoose";
import ProductModel, { Product } from "@/modules/wallapop/models/Product.model"; // <-- Updated import

export class ProductService {
  private transformProduct(product: DocumentType<Product>, req: Request) {
    const productData = product.toObject();
    
    const { photo, ...rest } = productData;
    
    return {
      ...rest,
      imgSrc: photo?.data
        ? `${req.protocol}://${req.get("host")}/api/images/${product._id}` 
        : null,
    };
  }

  async getAllProducts(req: Request) {
    const products = await ProductModel.find({}); 
    
    return products.map((product) => this.transformProduct(product, req));
  }

  async getProductById(id: string, req: Request) {
    const product = await ProductModel.findById(id);
    
    if (!product) return null;
    return this.transformProduct(product, req);
  }

  async createProduct(
    productData: Partial<Product>, 
    file?: { buffer: Buffer, mimetype: string }
  ) {  
    
    const data = file 
      ? { ...productData, photo: { data: file.buffer, contentType: file.mimetype } }
      : productData;
      
    return ProductModel.create(data);
  }

  async updateProduct(
    id: string,
    productData: Partial<Product>,
    file?: { buffer: Buffer, mimetype: string }
  ) {  
    
    const update = file
      ? { ...productData, photo: { data: file.buffer, contentType: file.mimetype } }
      : productData;
      
    return ProductModel.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });
  }

  async deleteProduct(id: string) {
    return ProductModel.findByIdAndDelete(id);
  }
}