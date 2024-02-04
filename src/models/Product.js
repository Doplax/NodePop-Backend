const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
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
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
