const express = require('express');
const router = express.Router();
const LangController = require('./../controller/LangController')

const langController = new LangController();


router.get('/change-locale', langController.changeLocale)


module.exports = router;
