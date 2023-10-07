const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');

// GET para listar productos
router.get('/', async (req, res, next) => {
    try {
        const filterByName = req.query.name;
        const filterByCategory = req.query.category;
        const skip = req.query.skip;
        const limit = req.query.limit;
        const sort = req.query.sort;
        const fields = req.query.fields;

        const filter = {};

        if (filterByName) filter.name = filterByName;
        if (filterByCategory) filter.category = filterByCategory;

        const products = await Product.lista(filter, skip, limit, sort, fields);
        res.json({ results: products });
    } catch (err) {
        next(err);
    }
});

// GET para obtener un producto específico
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        res.json({ result: product });
    } catch (error) {
        next(error);
    }
});

// PUT para actualizar un producto
router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
        res.json({ result: updatedProduct });
    } catch (error) {
        next(error);
    }
});

// POST para crear un producto
router.post('/', async (req, res, next) => {
    try {
        const productData = req.body;
        const product = new Product(productData);
        const savedProduct = await product.save();
        res.json({ result: savedProduct });
    } catch (error) {
        next(error);
    }
});

// DELETE para eliminar un producto
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await Product.deleteOne({ _id: id });
        res.json(); // 200 OK
    } catch (error) {
        next(error);
    }
});

module.exports = router;
