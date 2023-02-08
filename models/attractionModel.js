const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attractionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    hours: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    likes: {
        type: Number
    }
}, { timestamps: true });

module.exports = mongoose.model('Attraction', attractionSchema);