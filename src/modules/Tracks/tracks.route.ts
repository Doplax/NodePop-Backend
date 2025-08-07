import express from "express";
const router = express.Router();
import {
  getItems,
  getItem,
  createItem,
  deleteItem,
  updateItem,
} from "@/modules/Tracks/tracks.controller";
//const { validateCreate } = require("../validators/users");

router.get("/", getItems);

router.get("/:id", getItem);

//TODO: Donde recibimos data
router.post("/", createItem);

router.patch("/:id", updateItem);

router.delete("/:id", deleteItem);

export default router;