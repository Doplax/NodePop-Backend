import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { file } = req;
  console.log({ file });
  try {
    const { nombre, minPrice, maxPrice, sort } = req.query;

    // Create filter object
    const filter: any = {};

    if (nombre) {
      filter.nombre = new RegExp(nombre, "i"); // Búsqueda sin distinción de mayúsculas
    }

    if (minPrice !== undefined) {
      filter.precio = filter.precio || {};
      filter.precio.$gte = minPrice; // Mayor o igual que
    }

    if (maxPrice !== undefined) {
      filter.precio = filter.precio || {};
      filter.precio.$lte = maxPrice; // Menor o igual que
    }

    // Opciones de ordenamiento
    const sortOptions: any = {};
    if (sort === "asc") {
      sortOptions.precio = 1; // ascendente
    } else if (sort === "desc") {
      sortOptions.precio = -1; // descendente
    }

    // Encontrar productos con el filtro
    const products = await Product.find(filter).sort(sortOptions);

    res.json(products);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// CREATE: Añadir un nuevo producto
const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const file: any = req.file;
  const image = file ? file.filename : "";
  console.log({ file });
  const newProduct = new Product({ ...req.body, foto: image });
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

// READ: Obtener un producto por ID
const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Producto no encontrado");
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// UPDATE: Actualizar un producto por ID
const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedProduct) return res.status(404).send("Producto no encontrado");
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// DELETE: Eliminar un producto por ID
const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).send("Producto no encontrado");
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    next(error);
  }
};

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
