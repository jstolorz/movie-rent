const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true})
 .then(() => console.log('Connected to MongoDB Genres'))
 .catch(err => console.error('Could not connected to MongoDB Genres...', err));

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
module.exports.genresSchema = genresSchema;

module.exports.persist = async function persist(genres){

    const gn = new Genre({
        name: genres.name
    });
    return result = await gn.save();
};

module.exports.getAll = async function getAll(){
    return gn = await Genre.find()
                            .sort({name: 1})
                            .select({name: 1});

};

module.exports.findOne = async function findOne(id){
      return genre = await Genre.findOne({ _id: id});
};

module.exports.update = async function update(id,genres) {
    return genre = await Genre.findOneAndUpdate({_id: id}, {name: genres.name}, {new: true});

};

module.exports.remove = async function remove(id) {
    return genre = await Genre.findOneAndDelete({_id: id});
};


