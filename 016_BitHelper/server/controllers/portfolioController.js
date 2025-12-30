const Transaction = require('../models/Transaction');

exports.addTransaction = async (req, res) => {
  const { type, amount, price } = req.body;

  try {
    const transaction = new Transaction({
      user: req.user.id,
      type,
      amount,
      price,
    });

    await transaction.save();
    res.json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};