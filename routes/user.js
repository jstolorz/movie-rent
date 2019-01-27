const auth = require('../middleware/auth');
const db = require('../repository/repoUser');
const express = require('express');
const Joi = require('joi');
const _ = require('lodash');
const router = express.Router();

router.use(express.json());


router.get('/me',auth, async (req, res) => {
    console.log(req.user);
    const user = await db.findById(req.user);
    console.log(user);
    res.send(user);
});

router.post('/', async (req, res) => {

    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let exist = await db.exists(req.body);

    if(exist) return res.status(400).send('User is already registered.');

    const result = await db.persist(req.body);


    res.header('x-auth-token', result.token).send(_.pick(result.user,['_id','name','email']));
});

function validate(user){
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    }

    return Joi.validate(user, schema);
}

module.exports = router;