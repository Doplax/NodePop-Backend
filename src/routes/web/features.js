const express = require("express");
const router = express.Router();
const FeaturesController = require("../../controller/FeaturesController");

const featuresController = new FeaturesController();

router.get("/", featuresController.index);

module.exports = router;
