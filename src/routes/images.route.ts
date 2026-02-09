import { Router } from "express";
import { getImage } from "../controllers/images.controller";
const router = Router();

/**
 * @swagger
 * /api/images/{id}:
 *   get:
 *     summary: Obtiene una imagen por su ID
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la imagen a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retorna la imagen solicitada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la imagen.
 *                 url:
 *                   type: string
 *                   description: URL de la imagen.
 *                 name:
 *                   type: string
 *                   description: Nombre de la imagen.
 *       404:
 *         description: Imagen no encontrada.
 */
router.get("/:id", getImage);

export default router;
