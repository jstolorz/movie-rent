const mongoose = require('mongoose');
const { Genre, genresSchema } = require('./repoGandre');

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB Movie'))
    .catch(err => console.error('Could not connected to MongoDB Movie...', err));

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: String,
    genre: {
        type: genresSchema,
        required: true
    },
    numberInStock: Number,
    dailyRentalRate: Number
}));

exports.persist = async function createMovie(title, numberInStock, dailyRentalRate, genreId) {
    const genre = await Genre.findOne({_id: genreId});

    const movie = new Movie({
        title,
        genre: {
          _id: genre._id,
          name: genre.name
        },
        numberInStock,
        dailyRentalRate
    });

    return result = await movie.save();
    //console.log(result);

};

module.exports.getAll = async function getAll(){
   return await Movie.find()
       .sort({title: 1})
       .select({title: 1, genre: 1, numberInStock: 1, dailyRentalRate: 1 });
};

module.exports.findOne = async function findOne(id) {
    return await Movie.findOne({_id: id});
};

module.exports.update = async function update(id, Movie) {
   return await Movie.findOneAndUpdate(
       {
           _id : id
       },
       {
           title: Movie.title,
           genre: Movie.genre,
           numberInStock: Movie.numberInStock,
           dailyRentalRate: Movie.dailyRentalRate
       },
       {
         new: true
       });
};

module.exports.remove = async function remove(id) {
    return await Movie.findOneAndDelete({_id: id});
};

//createMovie('Jednym Strzałem',0,0,'5c191597680fde69aa7f68df');

