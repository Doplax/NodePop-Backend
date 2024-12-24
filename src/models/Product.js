const mongoose = require("mongoose");
//const { Requester } = require("cote");

const ProductSchema = new mongoose.Schema(
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
      type: String,
      // required: [true, "You must upload a photo"],
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

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
