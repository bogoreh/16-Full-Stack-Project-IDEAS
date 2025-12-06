const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Dog', 'Cat', 'Bird', 'Fish', 'Rabbit', 'Hamster', 'Other']
    },
    breed: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        min: 0
    },
    weight: {
        type: Number,
        min: 0
    },
    lastFed: {
        type: Date,
        default: Date.now
    },
    lastVetVisit: {
        type: Date
    },
    notes: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Pet', petSchema);