const auth = require('../middleware/auth');
const express = require('express');
const db = require('../repository/repoRental');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const router = express.Router();

router.use(express.json());

function asyncMiddleware(handler) {

    return async (req, res, next) => {
        try {
            await handler(req, res);
        } catch (e) {
            next(e);
        }
    }
}

router.get('/', asyncMiddleware( async (req, res) => {
          rentals = await db.getAll();
          res.send(rentals);
}));

router.post('/',auth, async (req, res) =>{

    const {error} = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);

   let result = await db.persist(req.body);
   if(result === 'c400') {
       res.status(400).send('Invalid Customer');
   }

    if(result === 'm400') {
        res.status(400).send('Invalid Movie');
    }
    res.send(result);
});

function validateRental(rental){
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    };
    return Joi.validate(rental,schema);
}

module.exports = router;