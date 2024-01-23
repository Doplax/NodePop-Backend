var express = require('express');
var router = express.Router();
const Product = require('../models/Product')


/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const products = await Product.find({})
    res.locals.products = products;
    res.render('index');

  } catch (err) {
    next(err)
  }

})

module.exports = router;
