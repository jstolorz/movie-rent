const mongoose = require('mongoose');
const {User} = require('../models/modelUser');
const _ = require('lodash');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true})
                .then(() => console.log('Connected to MongoDB User...'))
                .catch((err) => console.log('Could not connect to MongoDB User...', err));

exports.persist = async function createUser(user) {

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const nuser = new User(_.pick(user, ['name', 'email', 'password']));
    await nuser.save();

    return {
        token: nuser.generateAuthToken(),
        user: nuser
    }
};

exports.findById = async function(user){
    return await User.findById(user).select('-password');
};

exports.exists = async function exists(user) {
   let new_user = await User.findOne({email: user.email});
   if(new_user){
       return true;
   } else {
       return false;
   }
};


