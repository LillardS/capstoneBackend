const express = require('express');
const Attraction = require('../models/attractionModel');
const { 
    getAttractions,
    createAttraction,
    getAttraction,
    deleteAttraction,
    updateAttraction } = require('../controllers/attractionController');

const pagesRouter = express.Router();

// GET all attractions to go
pagesRouter.get('/', getAttractions);

// GET a single activity to go
pagesRouter.get('/:id', getAttraction);

// POST a new activity to try
pagesRouter.post('/', createAttraction);

// DELETE an activity
pagesRouter.delete('/:id', deleteAttraction);

// UPDATE an activity
pagesRouter.patch('/:id', updateAttraction);

// GET the about page
pagesRouter.get('/About', (req, res) => {
    res.json({mssg: 'GET the about page'});
});

// GET the contact page
pagesRouter.get('/Contacts', (req, res) => {
    res.json({mssg: 'GET the contact page'});
});

module.exports = pagesRouter;