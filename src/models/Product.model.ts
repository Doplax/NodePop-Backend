import { Schema, model, Document, Types } from "mongoose";

export const PRODUCT_TAGS = [
  "lifestyle",
  "mobile",
  "motor",
  "work",
] as const;
export type Tag = (typeof PRODUCT_TAGS)[number];

export interface ProductData {
  name: string;
  price: number;
  isForSale?: boolean;
  photo?: {
    data: Buffer | null;
    contentType: string;
  };
  tags?: Tag[];
}

export interface IProduct extends ProductData, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: {
      type: String,
      required: [true, "The name field is required"],
      trim: true,
      maxlength: 120,
      index: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "The minimum price value is 0"],
      max: [99999, "The maximum price value is 99999"],
      index: true,
    },
    isForSale: {
      type: Boolean,
      default: true,
      index: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    tags: {
      type: [
        {
          type: String,
          enum: PRODUCT_TAGS,
        },
      ],
      index: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Product = model<IProduct>("Product", ProductSchema);

export default Product;
