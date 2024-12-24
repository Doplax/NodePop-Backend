/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: El nombre del producto
 *           example: "Camiseta"
 *         price:
 *           type: number
 *           description: El precio del producto
 *           minimum: 0
 *           maximum: 99999
 *           example: 19.99
 *         isForSale:
 *           type: boolean
 *           description: Indica si el producto está a la venta
 *           example: true
 *         photo:
 *           type: string
 *           format: binary
 *           description: Imagen del producto
 *           example: "http://example.com/photo.jpg"
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *             enum: ["Laptop", "Tablet", "Smartphone", "Desktop"]
 *           description: Etiquetas asociadas al producto
 *           example: ["Laptop", "Tablet"]
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retorna todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Una lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 */

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
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       404:
 *         description: Producto no encontrado
 */

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

module.exports = {};
