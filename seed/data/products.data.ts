import { ProductData } from "../../src/models/Product.model";

const productsList: ProductData[] = [
  {
    name: "MacBook Pro",
    price: 1299,
    isForSale: true,
    photo: {
      data: null,
      contentType: "image/jpeg",
    },
    tags: ["Laptop", "Smartphone"],
  },
  {
    name: "Samsung Galaxy Tab",
    price: 799,
    isForSale: true,
    photo: {
      data: null,
      contentType: "image/png",
    },
    tags: ["Tablet"],
  },
  {
    name: "Dell Desktop PC",
    price: 599,
    isForSale: false,
    photo: {
      data: null,
      contentType: "image/jpeg",
    },
    tags: ["Desktop"],
  },
  {
    name: "iPhone 14",
    price: 999,
    isForSale: true,
    photo: {
      data: null,
      contentType: "image/jpeg",
    },
    tags: ["Smartphone"],
  },
  {
    name: "Microsoft Surface Laptop",
    price: 1149,
    isForSale: true,
    photo: {
      data: null,
      contentType: "image/png",
    },
    tags: ["Laptop", "Tablet"],
  },
];

export { productsList };
