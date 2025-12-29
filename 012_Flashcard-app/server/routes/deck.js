const express = require('express');
const jwt = require('jsonwebtoken');
const Deck = require('../models/Deck');

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

router.get('/', authMiddleware, async (req, res) => {
  try {
    const decks = await Deck.find({ userId: req.user.id });
    res.json(decks);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  const { name, description } = req.body;
  try {
    const deck = new Deck({ userId: req.user.id, name, description });
    await deck.save();
    res.json(deck);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { name, description } = req.body;
  try {
    const deck = await Deck.findById(req.params.id);
    if (!deck || deck.userId.toString() !== req.user.id) return res.status(404).json({ msg: 'Deck not found' });
    deck.name = name || deck.name;
    deck.description = description || deck.description;
    await deck.save();
    res.json(deck);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);
    if (!deck || deck.userId.toString() !== req.user.id) return res.status(404).json({ msg: 'Deck not found' });
    await deck.remove();
    res.json({ msg: 'Deck deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;