import { Request } from "express";
import { DocumentType } from "@typegoose/typegoose";
import { ProductModel } from "@/modules/wallapop/models/Product.model"; // <-- Import your Typegoose model

// No more custom interface needed with Typegoose
export const transformProduct = (product: DocumentType<ProductModel>, req: Request): any => {
  // Typegoose models have toObject method built-in
  const productData = product.toObject();  // Example: { _id: "123", name: "Phone", photo: { data: <Buffer...> } }
  
  const { photo, ...rest } = productData;  // Example: photo = { data: <Buffer...> }, rest = { _id: "123", name: "Phone" }
  
  return {
    ...rest,  // Example: { _id: "123", name: "Phone" }
    imgSrc: photo?.data
      ? `${req.protocol}://${req.get("host")}/api/images/${product._id}`  // Example: "http://localhost:3000/api/images/123"
      : null,
  };  // Final result: { _id: "123", name: "Phone", imgSrc: "http://localhost:3000/api/images/123" }
};