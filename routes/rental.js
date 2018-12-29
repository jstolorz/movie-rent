const express = require('express');
const db = require('../repository/repoRental');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
    let rentals = await db.getAll();
    res.send(rentals);
});

router.post('/', async (req, res) =>{

    const {error} = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);

   let result = await db.persist(req.body);
   if(result.equal('c400')) {
       res.status(400).send('Invalid Customer');
   }

    if(result.equal('m400')) {
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