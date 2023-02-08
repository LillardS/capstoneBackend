const express = require('express');
const Attraction = require('../models/attractionModel');
const {
    createActivity,
    getActivity,
    getActivities,
    deleteActivity,
    updateActivity
} = require('../controllers/attractionController');

const activitiesRouter = express.Router();

// GET all activities to go
activitiesRouter.get('/', getActivities);

// GET a single activity to go
activitiesRouter.get('/:id', getActivity);

// POST a new activity to try
activitiesRouter.post('/', createActivity);

// DELETE an activity
activitiesRouter.delete('/:id', deleteActivity);

// UPDATE an activity
activitiesRouter.patch('/:id', updateActivity);

module.exports = activitiesRouter;