const express = require('express');
const jwt = require('jsonwebtoken');
const Card = require('../models/Card');
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

router.get('/:deckId', authMiddleware, async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.deckId);
    if (!deck || deck.userId.toString() !== req.user.id) return res.status(404).json({ msg: 'Deck not found' });
    const cards = await Card.find({ deckId: req.params.deckId });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/:deckId', authMiddleware, async (req, res) => {
  const { front, back } = req.body;
  try {
    const deck = await Deck.findById(req.params.deckId);
    if (!deck || deck.userId.toString() !== req.user.id) return res.status(404).json({ msg: 'Deck not found' });
    const card = new Card({ deckId: req.params.deckId, front, back });
    await card.save();
    res.json(card);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { front, back, known } = req.body;
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ msg: 'Card not found' });
    const deck = await Deck.findById(card.deckId);
    if (deck.userId.toString() !== req.user.id) return res.status(403).json({ msg: 'Unauthorized' });
    card.front = front || card.front;
    card.back = back || card.back;
    card.known = known !== undefined ? known : card.known;
    await card.save();
    res.json(card);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ msg: 'Card not found' });
    const deck = await Deck.findById(card.deckId);
    if (deck.userId.toString() !== req.user.id) return res.status(403).json({ msg: 'Unauthorized' });
    await card.remove();
    res.json({ msg: 'Card deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;