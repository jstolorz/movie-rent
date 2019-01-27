const mongoose = require('mongoose');
const model = require('../models/modelGandre');

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true})
 .then(() => console.log('Connected to MongoDB Genres'))
 .catch(err => console.error('Could not connected to MongoDB Genres...', err));



module.exports.persist = async function persist(genres){

    const gn = new model.Genre({
        name: genres.name
    });
    return result = await gn.save();
};

module.exports.getAll = async function getAll(){

    const gn = await model.Genre.find()
          .sort({name: 1})
          .select({name: 1});

    return gn;

};

module.exports.findOne = async function findOne(id){
      return genre = await model.Genre.findOne({ _id: id});
};

module.exports.update = async function update(id,genres) {
    return genre = await model.Genre.findOneAndUpdate({_id: id}, {name: genres.name}, {new: true});

};

module.exports.remove = async function remove(id) {
    return genre = await model.Genre.findOneAndDelete({_id: id});
};


