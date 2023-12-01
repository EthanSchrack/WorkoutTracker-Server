const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    title: {
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
    updated_date: {
        type: Date,
        default: Date.now,
    },
});