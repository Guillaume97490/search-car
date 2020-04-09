const express = require('express');

const controller = require('../controllers/indexController')
const router = express.Router();

/* GET home page. */
router.get('/', controller.home);
router.get('/:brand/models', controller.getModels); 
router.get('/:brand/:model/trims', controller.getTrims); 

module.exports = router;
