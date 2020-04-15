const express = require('express');

const controller = require('../controllers/searchController')
const router = express.Router();

/* GET home page. */
router.post('/', controller.add);
router.get('/', controller.list);

module.exports = router;