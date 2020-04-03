const express = require('express');

const controller = require('../controllers/indexController')
const router = express.Router();

/* GET home page. */
router.get('/', controller.home);

module.exports = router;
