const express = require('express');
const { getPlaces } = require('../controllers/attractionController');

const pagesRouter = express.Router();

// GET the home page
pagesRouter.get('/', (req, res) => {
    res.json({mssg: 'GET the home page'});
});

// GET the about page
pagesRouter.get('/About', (req, res) => {
    res.json({mssg: 'GET the about page'});
});

// GET the contact page
pagesRouter.get('/Contacts', (req, res) => {
    res.json({mssg: 'GET the contact page'});
});

module.exports = pagesRouter;