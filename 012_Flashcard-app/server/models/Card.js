const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  deckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Deck', required: true },
  front: { type: String, required: true },
  back: { type: String, required: true },
  known: { type: Boolean, default: false }, // For simple review tracking
});

module.exports = mongoose.model('Card', CardSchema);