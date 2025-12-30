const express = require('express');
const router = express.Router();
const { getCurrentPrice } = require('../controllers/priceController');

router.get('/', getCurrentPrice);

module.exports = router;