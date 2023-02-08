const Attraction = require("../models/attractionModel");
const mongoose = require('mongoose');

// get all places
const getPlaces = async (req, res) => {
    const places = await Attraction.find({type: "place"}).sort({createdAt: -1});

    res.status(200).json(places);
}

// get all activities
const getActivities = async (req, res) => {
    const activities = await Attraction.find({type: "activity"}).sort({createdAt: -1});

    res.status(200).json(activities);
}

// get a single place
const getPlace = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Such Attraction'});
    }

    const place = await Attraction.findById(id);
    
    if(!place) {
        return res.status(404).json({error: 'No Such Attraction'});
    }

    res.status(200).json(place);
}

// get a single activity
const getActivity = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Such Attraction'});
    }

    const activity = await Attraction.findById(id);
    
    if(!activity) {
        return res.status(404).json({error: 'No such Attraction'});
    }

    res.status(200).json(activity);
}

// create new place
const createPlace = async (req, res) => {
    const { title, image, hours, description, type, address, venue, rating, likes } = req.body;
    try {
        const attraction = await Attraction.create({ title, image, hours, description, type, address, venue, rating, likes });
        res.status(200).json({attraction});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// create new activity
const createActivity = async (req, res) => {
    const { title, image, hours, description, type, address, venue, rating, likes } = req.body;
    try {
        const attraction = await Attraction.create({ title, image, hours, description, type, address, venue, rating, likes });
        res.status(200).json({attraction});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// delete a place
const deletePlace = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Such Attraction'});
    }

    const place = await Attraction.findOneAndDelete({_id: id});

    if (!place) {
        return res.status(404).json({error: 'No such Attraction'});
    }

    res.status(200).json(place);
}

// delete an activity
const deleteActivity = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Such Attraction'});
    }

    const activity = await Attraction.findOneAndDelete({_id: id});

    if (!activity) {
        return res.status(404).json({error: 'No such Attraction'});
    }

    res.status(200).json(activity);
}

// update a place
const updatePlace = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Such Attraction'});
    }

    const place = await Attraction.findOneAndUpdate({ _id: id }, {
        ...req.body
    });

    if (!place) {
        return res.status(404).json({error: 'No such Attraction'});
    }

    res.status(200).json(place);
}

// update an activity
const updateActivity = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Such Attraction'});
    }

    const activity = await Attraction.findOneAndUpdate({ _id: id }, {
        ...req.body
    });

    if (!activity) {
        return res.status(404).json({error: 'No such Attraction'});
    }

    res.status(200).json(activity);
}

module.exports = {
    createPlace,
    createActivity,
    getPlaces,
    getActivities,
    getPlace,
    getActivity,
    deletePlace,
    deleteActivity,
    updatePlace,
    updateActivity
}