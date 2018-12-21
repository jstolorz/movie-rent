const db = require('../repository/repoMovie');
const express = require('express');
const Joi = require('joi');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
    let movies = await db.getAll();
    res.send(movies);
});

router.post('/', async (req, res) => {
      const {error} = validation(req.body);

      if(error) return res.status(400).send(error.details[0].message);

      const movie = {
          title: req.body.title,
          numberInStock: req.body.numberInStock,
          dailyRentalRate: req.body.dailyRentalRate,
          genreId: req.body.genreId
      }

      let result = await db.persist(movie);
      res.send(result);
});

router.get('/:id', async (req, res) => {
    const movie = await db.findOne(req.params.id);

    if(!movie){
        res.status(404).send('The movie with given ID was not found.');
    }else{
        res.send(movie);
    }
});

router.put('/:id', async (req,res) => {
    const {error} = validation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const movie = await db.update(req.params.id, req.body);

    if(!movie){
        res.status(404).send('The movie with given ID was not found.');
    }else{
        res.send(movie);
    }
});

router.delete('/:id', async (req,res) => {
    const movie = await db.remove(req.params.id);

    if(!movie){
        res.status(404).send('The movie with given ID was not found.');
    }else{
        res.send(movie);
    }

});


function validation(movie){
    const schema = {
        title: Joi.string().min(2).max(255).required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required(),
        genreId: Joi.string().required()
    };

    return Joi.validate(movie, schema);
}



module.exports = router;

//
//
// async function show() {
//    let movies = await repoMovie.getAll();
//    console.log(movies);
// }
//
// show();