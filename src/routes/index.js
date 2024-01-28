const express = require("express");
const router = express.Router();
const fs = require("fs");
const PATH_ROUTES = __dirname;

const Product = require("../models/Product");

const removeFileExtension = (fileName) => {
  return fileName.split(".").shift();
};

fs.readdirSync(PATH_ROUTES).forEach((file) => {
  const name = removeFileExtension(file);
  if (name === "index") {
    // Carga Index
    /* GET home page. */
    router.get("/", async function (req, res, next) {
      try {
        const products = await Product.find({});
        res.locals.products = products;
        res.render("index");
      } catch (err) {
        next(err);
      }
    });
  } else {
    // Carga el resto de rutas
    console.log(`cargando indice de la ruta: /${name} - /${file}`);
    router.use(`/${name}`, require(`./${file}`));
  }
});

module.exports = router;
