const Attraction = require("../models/attractionModel");
const mongoose = require('mongoose');

// get all attractions
const getAttractions = async (req, res) => {
    const attractions = await Attraction.find({}).sort({ createdAt: -1});

    res.status(200).json(attractions);
}

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

// get a single attraction
const getAttraction = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Such Attraction'});
    }

    const attraction = await Attraction.findById(id);
    
    if(!attraction) {
        return res.status(404).json({error: 'No Such Attraction'});
    }

    res.status(200).json(place);
}

// create new attraction
const createAttraction = async (req, res) => {
    const { title, image, hours, description, type, address, venue, rating, likes, userName } = req.body;

    // preparing error messages based on what is missing
    let emptyFields = [];

    if(!title){
        emptyFields.push('title');
    }
    if(!image){
        emptyFields.push('image');
    }
    if(!hours){
        emptyFields.push('hours');
    }
    if(!description){
        emptyFields.push('description');
    }
    if(!type){
        emptyFields.push('type');
    }
    if(!address){
        emptyFields.push('address');
    }
    if(!venue){
        emptyFields.push('venue');
    }
    if(!rating){
        emptyFields.push('rating');
    }

    // if the emptyFields array is greater than zero, send an error back saying which fields are needed\
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields })
    }

    try {
        const attraction = await Attraction.create({ title, image, hours, description, type, address, venue, rating, likes, userName });
        res.status(200).json({attraction});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// delete an attraction
const deleteAttraction = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Such Attraction'});
    }

    const attraction = await Attraction.findOneAndDelete({_id: id});

    if (!attraction) {
        return res.status(404).json({error: 'No such Attraction'});
    }

    res.status(200).json(attraction);
}

// update an attraction
const updateAttraction = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Such Attraction'});
    }

    const attraction = await Attraction.findOneAndUpdate({ _id: id }, {
        ...req.body
    });

    console.log(attraction.likes);

    if (!attraction) {
        return res.status(404).json({error: 'No such Attraction'});
    }

    res.status(200).json(attraction);
}


module.exports = {
    createAttraction,
    getAttractions,
    getPlaces,
    getActivities,
    getAttraction,
    deleteAttraction,
    updateAttraction
}