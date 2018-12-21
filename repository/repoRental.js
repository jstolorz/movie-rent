const mongoose = require('mongoose');
const Movie = require('../repository/repoMovie');
const Customer = require('../repository/repoCustomer');

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB Rental'))
    .catch(err => console.error('Could not connected to MongoDB Rental...', err));


const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
           name: {
               type: String,
               required: true,
               minlength: 5,
               maxlength: 50
           },
            isGold:{
               type: Boolean,
                default: false
            },
            phone: {
               type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title:{
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}));

module.exports.getAll = async function getAll() {
  return await Rental.find()
      .sort('-dateOut');
};

module.exports.persist = async function createRental(rental) {
     const customer = Customer.findOne({_id: rental.customerId});
     const movie = Movie.findOne({_id: rental.movieId});
};
