const mongoose = require('mongoose');

const DeckSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model('Deck', DeckSchema);