const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const logger = require('../middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const express = require('express');
const db = require('../db/repoGandre');

const router = express.Router();


router.use(express.json());
router.use(express.urlencoded({ extended: true}));
router.use(express.static('public'));
router.use(helmet());


if(router.get('env') === 'development'){
    router.use(morgan('tiny'));
}

router.use(logger);

router.get('/', async (req, res) => {
    let gns = await db.getAll();
    console.log(gns);
    res.send(gns);
});

router.get('/:id',async (req, res) => {
    console.log('body ', req.body);
    const genre = await db.findOne(req.params.id);

    if(!genre){
        res.status(404).send('The genre with given ID was not found.');
    }else{
        res.send(genre);
    }

});

router.post('/', async (req,res) => {
    const {error} = validationGeneres(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: req.body.id,
        name: req.body.name
    };

    let result = await db.persist(genre);

    res.send(result);

});

router.put('/:id',async (req, res) => {

    const genre = await db.update(req.params.id, req.body);

    if(!genre){
        res.status(404).send('The genre with given ID was not found.');
    }else{

        // const {error} = validationGeneres(req.body);
        //
        // if(error) return res.status(400).send(error.details[0].message);

        genre.name = req.body.name;
        res.send(genre);
    }

});

router.delete('/:id',async (req, res) => {
    const genre = await db.remove(req.params.id);

    if(!genre){
        res.status(404).send('The genre with given ID was not found.');
    }else{

        res.send(genre);
    }

});

function validationGeneres(genere){
    const schema = {
        id: Joi.string().required(),
        name: Joi.string().required()
    };
    return Joi.validate(genere, schema);
}



module.exports = router;