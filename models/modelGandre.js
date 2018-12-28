const mongoose = require('mongoose');

const genresSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            min: 5,
            max: 255
        }
    }
);

const Genre = mongoose.model('Genre', genresSchema);

module.exports.Genre = Genre;
module.exports.genreSchema = genresSchema;

