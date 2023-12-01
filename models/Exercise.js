const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    workout: {
        type:String,
    },
    calories: {
        type:Number,
        required: true,
    },
    updated_Date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Exercise = mongoose.model('exercise', ExerciseSchema);