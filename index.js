const error = require('./middleware/errors');
const config = require('config');
const express = require('express');
const genres = require('./routes/genres');
const customer = require('./routes/customer');
const movies = require('./routes/movies');
const rentals = require('./routes/rental');
const home = require('./routes/home');
const users = require('./routes/user');
const auth = require('./routes/auth');

if(!config.get('jwtPrivateKey')){
    console.log('FATAL ERROR: jwrPrivateKey is not defined.');
    process.exit(1);
}

const app = express();

app.set('view engine','pug');
app.set('views','./views');

let port = process.env.PORT;

app.use(express.json());
app.use('/',home);
app.use('/vidly/genres',genres);
app.use('/vidly/customer',customer);
app.use('/vidly/movies',movies);
app.use('/vidly/rentals',rentals);
app.use('/vidly/users',users);
app.use('/vidly/auth',auth);

app.use(error);


app.listen(process.env.PORT || 3000, () => console.log('Listening on port 3000...'));


