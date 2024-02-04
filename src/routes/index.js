const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Inicio" }); // Asume que tienes un archivo `index.ejs` dentro del directorio `views`
});

module.exports = router;
