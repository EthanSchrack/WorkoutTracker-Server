const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    meal: {
        type: String,
    },
    calories: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
    },
    updated_date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Food = mongoose.model('food', FoodSchema);