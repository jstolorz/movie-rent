const express = require('express');
const db = require('../db/repoCustomer');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
    let customer = await db.getAll();
    res.send(customer);
});

router.post('/', async (req,res) => {

    const customer = {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    };

    let result = await db.persist(customer);

    res.send(result);

});


module.exports = router;