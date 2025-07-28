import mongoose, { Document, Schema } from "mongoose";
//const { Requester } = require("cote");

export interface IProduct extends Document {
  name: string;
  price: number;
  isForSale: boolean;
  photo: {
    data: Buffer;
    contentType: string;
  };
  tags: string[];
}

const ProductSchema: Schema = new mongoose.Schema(
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

//const requester = new Requester({
//  name: "thumbnail-microservice-requester",
//});

//ProductSchema.methods.createThumbnail = async function () {
//  const event = {
//    type: "create-thumbnail",
//    fileName: this.photo,
//    test: "testeando requester",
//  };
//  return new Promise((resolve) => {
//    requester.send(event, resolve);
//  });
//};

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;