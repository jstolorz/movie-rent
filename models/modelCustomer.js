const mongoose = require('mongoose');

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

module.exports = Customer;
