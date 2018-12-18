const express = require('express');
const db = require('../db/repoCustomer');
const Joi = require('joi');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
    let customer = await db.getAll();
    res.send(customer);
});

router.post('/', async (req, res) => {

    const {error} = validationCustomer(req.body);

    if (error) return res.status(400).send(error.details[0].message);


    const customer = {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    };

    let result = await db.persist(customer);

    res.send(result);

});

router.get('/:id', async (req, res) => {

    const customer = await db.findOne(req.params.id);

    if (!customer) {
        res.status(404).send('The genre with given ID was not found.');
    } else {
        res.send(customer);
    }
});

router.put('/:id', async (req, res) => {

    const {error} = validationCustomer(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const customer = await db.update(req.params.id, req.body);

    if (!customer) {
        res.status(404).send('The genre with given ID was not found.');
    } else {
        res.send(customer);
    }

});

router.delete('/:id', async (req, res) => {
    const customer = await db.remove(req.params.id);

    if (!customer) {
        res.status(404).send('The genre with given ID was not found.');
    } else {

        res.send(customer);
    }

});

function validationCustomer(customer) {
    const schema = {
        isGold: Joi.boolean().required(),
        name: Joi.string().required(),
        phone: Joi.string().min(9).required()
    };
    return Joi.validate(customer, schema);
}

module.exports = router;