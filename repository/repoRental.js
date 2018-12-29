const mongoose = require('mongoose');
const {Movie} = require('../models/modelMovie');
const {Customer} = require('../models/modelCustomer');
const {Rental} = require('../models/modelRental');
const Fawn =  require('fawn');


Fawn.init(mongoose);


mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB Rental'))
    .catch(err => console.error('Could not connected to MongoDB Rental...', err));



module.exports.getAll = async function getAll() {
  return await Rental.find()
      .sort('-dateOut');
};

module.exports.persist = async function createRental(rental) {
   const customer = await Customer.findById(rental.customerId);
   if(!customer) return 'c400';

   const movie = await Movie.findById(rental.movieId);
   if(!movie) return 'm400';

   if(movie.numberInStock === 0) return 'in400';

   let rent = new Rental({
       customer: {
           _id: customer._id,
           name: customer.name,
           phone: customer.phone
       },
       movie: {
           _id: movie._id,
           title: movie.title,
           dailyRentalRate: movie.dailyRentalRate
       }
   });

   try {

       new Fawn.Task()
           .save('rentals', rent)
           .update('movies', {_id: movie._id}, {
               $inc: {numberInStock: -1}
           })
           .run();

       return rent;

   }catch (e) {
       return 't500';
   }

};

module.exports.findOne = async function findOne(id){

};

