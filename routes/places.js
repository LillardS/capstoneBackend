const { Router } = require('express');
const express = require('express');
const Attraction = require('../models/attractionModel')
const {
    createPlace,
    getPlace,
    getPlaces,
    deletePlace,
    updatePlace,
  
} = require('../controllers/attractionController');

const placesRouter = express.Router();

// GET all places to go
placesRouter.get('/', getPlaces);


// GET a single place to go
placesRouter.get('/:id', getPlace);

// POST a new place to visit
placesRouter.post('/', createPlace);

// DELETE a place
placesRouter.delete('/:id', deletePlace);

// UPDATE a new place
placesRouter.patch('/:id', updatePlace);

module.exports = placesRouter;