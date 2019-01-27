const mongoose = require('mongoose');
const model = require('../models/modelGandre');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: String,
    genre: {
        type: model.genreSchema,
        required: true
    },
    numberInStock: Number,
    dailyRentalRate: Number
}));

module.exports.Movie = Movie;