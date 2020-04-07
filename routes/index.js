const express = require('express');

const controller = require('../controllers/indexController')
const router = express.Router();

/* GET home page. */
router.get('/', controller.home);
/* router.get('/getBrands', controller.getBrands); */

module.exports = router;
