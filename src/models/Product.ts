import mongoose, { FilterQuery, SortOrder } from "mongoose";

interface ProductDoc extends mongoose.Document {
  nombre: string;
  venta: boolean;
  precio: number;
  foto?: string;
  tags: string[];
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  lista(
    filtro: FilterQuery<ProductDoc>,
    skip: number,
    limit: number,
    sort: Record<string, SortOrder> | string,
    fields: string | Record<string, 1 | 0>,
  ): Promise<ProductDoc[]>;
}

const productsSchema = new mongoose.Schema<ProductDoc>({
  nombre: { type: String, index: true },
  venta: Boolean,
  precio: Number,
  foto: String,
  tags: [String],
});

productsSchema.statics.lista = function (
  filtro: FilterQuery<ProductDoc>,
  skip: number,
  limit: number,
  sort: Record<string, SortOrder> | string,
  fields: string | Record<string, 1 | 0>,
) {
  const query = Product.find(filtro);
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);
  return query.exec();
};

const Product = mongoose.model<ProductDoc, ProductModel>(
  "Product",
  productsSchema,
);

export default Product;
