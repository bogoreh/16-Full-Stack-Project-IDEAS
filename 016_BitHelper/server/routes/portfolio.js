const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addTransaction, getTransactions } = require('../controllers/portfolioController');

router.post('/transaction', auth, addTransaction);
router.get('/transactions', auth, getTransactions);

module.exports = router;