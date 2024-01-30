const express = require("express");
const Product = require("../models/Product");

const getAllProducts = async (req, res, next) => {
  const { file } = req;
  console.log({ file });
  try {
    const { nombre, minPrice, maxPrice, sort } = req.query;

    // Create filter object
    const filter = {};

    if (nombre) {
      filter.nombre = new RegExp(nombre, "i"); // Case-insensitive search
    }

    if (minPrice !== undefined) {
      filter.precio = filter.precio || {};
      filter.precio.$gte = minPrice; // Greater than or equal to
    }

    if (maxPrice !== undefined) {
      filter.precio = filter.precio || {};
      filter.precio.$lte = maxPrice; // Less than or equal to
    }

    // Options for sorting
    const sortOptions = {};
    if (sort === "asc") {
      sortOptions.precio = 1; // ascending
    } else if (sort === "desc") {
      sortOptions.precio = -1; // descending
    }

    // Find products with the filter
    const products = await Product.find(filter).sort(sortOptions);

    res.json(products);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// CREATE: Añadir un nuevo producto
const createProduct = async (req, res, next) => {
  const file = req.file;
  //let image = file.filename ;
  //if (req.file) {
  //  image = "";
  //}
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
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Producto no encontrado");
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// UPDATE: Actualizar un producto por ID
const updateProduct = async (req, res, next) => {
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
const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).send("Producto no encontrado");
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts, // tu función original para obtener todos los productos
  getProductById,
  updateProduct,
  deleteProduct,
};
