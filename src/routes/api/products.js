const { Router } = require("express");
const router = Router();
const productValidationRules = require("../../validators/productValidator.js");
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../../controllers/productController.js");
const uploadMiddleware = require("../../middlewares/uploadMiddleware.js");
const verifyProductExists = require("../../middlewares/verifyProductExists");

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retorna todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Una lista de productos
 */
router.get("/", getItems);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del producto
 *     responses:
 *       200:
 *         description: Retorna el producto con el ID especificado
 *       404:
 *         description: Producto no encontrado
 */
router.get("/:id", getItem);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 */
router.post("/", uploadMiddleware.uploadSingle, productValidationRules, createItem);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualiza un producto existente
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       404:
 *         description: Producto no encontrado
 */
router.put("/:id", verifyProductExists, uploadMiddleware.uploadSingle, productValidationRules, updateItem);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Elimina un producto existente
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 */
router.delete("/:id", deleteItem);

module.exports = router;
