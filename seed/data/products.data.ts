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
    tags: ["work", "mobile"],
  },
  {
    name: "Samsung Galaxy Tab",
    price: 799,
    isForSale: true,
    photo: {
      data: null,
      contentType: "image/png",
    },
    tags: ["mobile"],
  },
  {
    name: "Dell Desktop PC",
    price: 599,
    isForSale: false,
    photo: {
      data: null,
      contentType: "image/jpeg",
    },
    tags: ["work"],
  },
  {
    name: "iPhone 14",
    price: 999,
    isForSale: true,
    photo: {
      data: null,
      contentType: "image/jpeg",
    },
    tags: ["mobile", "lifestyle"],
  },
  {
    name: "Microsoft Surface Laptop",
    price: 1149,
    isForSale: true,
    photo: {
      data: null,
      contentType: "image/png",
    },
    tags: ["work", "mobile"],
  },
];

export { productsList };
