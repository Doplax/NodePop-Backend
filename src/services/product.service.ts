import { QueryFilter, SortOrder } from "mongoose";
import Product, {
  IProduct,
  PRODUCT_TAGS,
  ProductData,
  Tag,
} from "../models/Product.model";
import {
  ProductView,
  transformProduct,
} from "../shared/utils/transformProduct";

export interface ListQuery {
  search?: string;
  tag?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
  isForSale?: string | boolean;
  sort?: string;
  page?: string | number;
  limit?: string | number;
}

export interface PaginatedProducts {
  items: ProductView[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 20;

const toInt = (value: unknown, fallback: number): number => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
};

const toBool = (value: unknown): boolean | undefined => {
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
};

const parseSort = (sort?: string): Record<string, SortOrder> => {
  if (!sort) return { createdAt: -1 };
  const result: Record<string, SortOrder> = {};
  for (const part of sort.split(",")) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const dir: SortOrder = trimmed.startsWith("-") ? -1 : 1;
    const field = trimmed.replace(/^[-+]/, "");
    if (["name", "price", "createdAt", "updatedAt"].includes(field)) {
      result[field] = dir;
    }
  }
  return Object.keys(result).length > 0 ? result : { createdAt: -1 };
};

const buildFilter = (query: ListQuery): QueryFilter<IProduct> => {
  const filter: QueryFilter<IProduct> = {};

  if (query.search) {
    const escaped = query.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.name = { $regex: escaped, $options: "i" };
  }

  if (query.tag) {
    const tags = String(query.tag)
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter((t): t is Tag => (PRODUCT_TAGS as readonly string[]).includes(t));
    if (tags.length > 0) {
      filter.tags = { $in: tags };
    }
  }

  const min = query.minPrice !== undefined ? Number(query.minPrice) : undefined;
  const max = query.maxPrice !== undefined ? Number(query.maxPrice) : undefined;
  if (Number.isFinite(min) || Number.isFinite(max)) {
    filter.price = {};
    if (Number.isFinite(min)) (filter.price as any).$gte = min;
    if (Number.isFinite(max)) (filter.price as any).$lte = max;
  }

  const forSale = toBool(query.isForSale);
  if (forSale !== undefined) {
    filter.isForSale = forSale;
  }

  return filter;
};

export class ProductService {
  async findAll(query: ListQuery): Promise<PaginatedProducts> {
    const filter = buildFilter(query);
    const sort = parseSort(query.sort);
    const page = toInt(query.page, 1);
    const limit = Math.min(toInt(query.limit, DEFAULT_LIMIT), MAX_LIMIT);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Product.find(filter).sort(sort).skip(skip).limit(limit),
      Product.countDocuments(filter),
    ]);

    return {
      items: items.map(transformProduct),
      total,
      page,
      limit,
      pages: Math.max(1, Math.ceil(total / limit)),
    };
  }

  async findByIdOrFail(id: string): Promise<ProductView> {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("NOT_FOUND");
    }
    return transformProduct(product);
  }

  async create(
    data: ProductData,
    file: Express.Multer.File,
  ): Promise<ProductView> {
    const product = await Product.create({
      ...data,
      photo: { data: file.buffer, contentType: file.mimetype },
    });
    return transformProduct(product);
  }

  async update(
    id: string,
    data: Partial<ProductData>,
    file?: Express.Multer.File,
  ): Promise<ProductView> {
    const update = file
      ? { ...data, photo: { data: file.buffer, contentType: file.mimetype } }
      : data;

    const product = await Product.findOneAndUpdate({ _id: id }, update, {
      new: true,
      runValidators: true,
    });

    if (!product) throw new Error("NOT_FOUND");
    return transformProduct(product);
  }

  async delete(id: string): Promise<void> {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) throw new Error("NOT_FOUND");
  }
}

export default new ProductService();
