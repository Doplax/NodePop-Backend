const express = require("express");
const router = express.Router();
const fs = require("fs");
const PATH_ROUTES = __dirname;

const removeFileExtension = (fileName) => {
  return fileName.split(".").shift();
};

fs.readdirSync(PATH_ROUTES).forEach((file) => {
  const name = removeFileExtension(file);
  if (name !== "index") {
    console.log(`cargando indice de la ruta: /${name} - /${file}`);
    router.use(`/${name}`, require(`./${file}`));
  }
});

module.exports = router;
