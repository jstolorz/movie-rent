const db = require('../repository/repoMovie');
const express = require('express');
const Joi = require('joi');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
    let movies = await db.getAll();
    res.send(movies);
});

module.exports = router;

//
//
// async function show() {
//    let movies = await repoMovie.getAll();
//    console.log(movies);
// }
//
// show();