import { Schema, model, Document } from "mongoose";

// Definir los tags permitidos
export type Tag = "Laptop" | "Tablet" | "Smartphone" | "Desktop";

// Definir la interfaz del documento
export interface IProduct extends Document {
  name: string;
  price: number;
  isForSale?: boolean;
  photo?: {
    data: Buffer;
    contentType: string;
  };
  tags?: Tag[];
}

// Esquema de Mongoose
const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: {
      type: String,
      required: [true, "The name field is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "The minimum price value is 0"],
      max: [99999, "The maximum price value is 99999"],
    },
    isForSale: {
      type: Boolean,
      default: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    tags: [
      {
        type: String,
        enum: ["Laptop", "Tablet", "Smartphone", "Desktop"],
      },
    ],
  },
  {
    versionKey: false,
    //timestamps: true,
  }
);

// Modelo
const Product = model<IProduct>("Product", ProductSchema); // ✅

export default Product;
