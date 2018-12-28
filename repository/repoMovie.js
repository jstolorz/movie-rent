const mongoose = require('mongoose');
const gandre = require('../models/modelGandre');
const Movie = require('../models/modelMovie');

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB Movie'))
    .catch(err => console.error('Could not connected to MongoDB Movie...', err));

exports.persist = async function createMovie(movie) {

    console.log(movie);

    const genre = await gandre.Genre.findOne({_id: movie.genreId});

    const mov = new Movie({
        title: movie.title,
        genre: {
          _id: genre._id,
          name: genre.name
        },
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate
    });

    return result = await mov.save();
    //console.log(result);
};

module.exports.getAll = async function getAll(){
   return await gandre.Movie.find()
       .sort({title: 1})
       .select({title: 1, genre: 1, numberInStock: 1, dailyRentalRate: 1 });
};

module.exports.findOne = async function findOne(id) {
    return await Movie.findOne({_id: id});
};

module.exports.update = async function update(id, movie) {
   return await Movie.findOneAndUpdate(
       {
           _id : id
       },
       {
           title: movie.title,
           genre: movie.genre,
           numberInStock: movie.numberInStock,
           dailyRentalRate: movie.dailyRentalRate
       },
       {
         new: true
       });
};



module.exports.remove = async function remove(id) {
    return await Movie.findOneAndDelete({_id: id});
};

//createMovie('Jednym Strzałem',0,0,'5c191597680fde69aa7f68df');

