import { IProduct } from "../../models/Product.model";

const trimTrailingSlash = (s: string): string => s.replace(/\/+$/, "");

const resolvePublicBaseUrl = (): string => {
  const explicit = process.env.PUBLIC_BASE_URL;
  if (explicit) return trimTrailingSlash(explicit);
  const port = process.env.PORT || "3000";
  return `http://localhost:${port}`;
};

export interface ProductView {
  _id: string;
  name: string;
  price: number;
  isForSale: boolean;
  sale: boolean;
  tags: string[];
  imgSrc: string | null;
  photo: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export const transformProduct = (product: IProduct): ProductView => {
  const obj = product.toObject();
  const hasPhoto = Boolean(obj.photo && obj.photo.data);
  const imageUrl = hasPhoto
    ? `${resolvePublicBaseUrl()}/api/images/${product._id}`
    : null;

  return {
    _id: product._id.toString(),
    name: obj.name,
    price: obj.price,
    isForSale: obj.isForSale ?? true,
    sale: obj.isForSale ?? true,
    tags: obj.tags ?? [],
    imgSrc: imageUrl,
    photo: imageUrl,
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
  };
};
