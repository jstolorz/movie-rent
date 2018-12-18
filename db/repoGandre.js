const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true})
 .then(() => console.log('Connected to MongoDB Genres'))
 .catch(err => console.error('Could not connected to MongoDB Genres...', err));

const genresSchema = new mongoose.Schema(
    {
        id: Number,
        name: String
    }
);

const Genre = mongoose.model('Genre', genresSchema);

module.exports.persist = async function persist(genres){
    console.log(genres);
    const gn = new Genre({
        id: genres.id,
        name: genres.name
    });
    return result = await gn.save();
};

module.exports.getAll = async function getAll(){
    return gn = await Genre.find()
                            .sort({id: 1})
                            .select({id: 1, name: 1});

};

module.exports.findOne = async function findOne(id){
      return genre = await Genre.findOne({ id: id});
};

module.exports.update = async function update(id,genres) {
   console.log('id: ',id);
   return genre = await Genre.findOneAndUpdate({id: id}, {name: genres.name}, {new: true});

};

module.exports.remove = async function remove(id) {
    return genre = await Genre.findOneAndDelete(id);
};







