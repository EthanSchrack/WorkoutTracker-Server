const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
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

module.exports = Workout = mongoose.model('workout', WorkoutSchema);