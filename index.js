const express = require('express');
const genres = require('./routes/genres');
const customer = require('./routes/customer');
const home = require('./routes/home');

const app = express();

app.set('view engine','pug');
app.set('views','./views');

let port = process.env.PORT;

app.use('/',home);
app.use('/vidly/genres',genres);
app.use('/vidly/customer',customer);


app.listen(process.env.PORT || 3000, () => console.log('Listening on port 3000...'));


