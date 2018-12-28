const express = require('express');
const db = require('../repository/repoRental');
const Joi = require('joi');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
    let rentals = await db.getAll();
    res.send(rentals);
});

router.post('/', async (req, res) =>{
    const rental = {
        customer: req.body.customer,
        movie: req.body.movie,
        dateOut: req.body.dateOut,
        dateReturned: req.body.dateReturned,
        rentalFee: req.body.rentalFee
    };

    let result = await db.persist(rental);
    res.send(result);
});

module.exports = router;