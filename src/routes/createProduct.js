const express = require('express');
const router = express.Router();
const Product = require('../models/Product')


/* GET home page. */
router.get('/create-product', async function(req, res, next) {
  try {
    res.render('../views/createProduct.ejs');
  } catch (err) {
    next(err)
  }

})

module.exports = router;
