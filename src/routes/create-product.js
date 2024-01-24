const express = require('express');
const router = express.Router();
const Product = require('../models/Product')


/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    console.log('create product');
    res.render('createProduct');
  } catch (err) {
    next(err)
  }

})

module.exports = router;
