const mongoose = require('mongoose')

const Schema = mongoose.Schema

// First argument defines structure
// Other properties
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
},
{
    timestamps: true,
}
)

// Schema: Definition of structure
// Model: Interact with a collection

module.exports = mongoose.model('Workout', workoutSchema)
