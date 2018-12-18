const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB Customer'))
    .catch(err => console.error('Could not connected to MongoDB Customer...', err));

const customerShema = mongoose.Schema({
    isGold:{
        type:Boolean,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String
    }
});

const Customer = mongoose.model('Customer', customerShema);

module.exports.persist = async function persist(customer){

    const cust = new Customer({
        isGold: customer.isGold,
        name: customer.name,
        phone: customer.phone
    });
    return result = await cust.save();
};

module.exports.getAll = async function getAll(){
    return cust = await Customer.find()
        .sort({name: 1})
        .select({isGold: 1, name: 1, phone: 1});
};



