const Attraction = require("../models/attractionModel");
const mongoose = require('mongoose');

// get all attractions
const getAttractions = async (req, res) => {

    // find and store all attractions in a variable sorted by date created
    const attractions = await Attraction.find({}).sort({ createdAt: -1 });

    // if successful, return all attractions
    res.status(200).json(attractions);
}

// get a single attraction
const getAttraction = async (req, res) => {
    const { id } = req.params;

    // if the attraction id is not valid return an error
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No Such Attraction' });
    }

    // store the attraction with the same valid id in a variable
    const attraction = await Attraction.findById(id);

    // if there is no attraction with that id return an error
    if (!attraction) {
        return res.status(404).json({ error: 'No Such Attraction' });
    }

    // if that attraction exists, return it
    res.status(200).json(attraction);
}

// create new attraction
const createAttraction = async (req, res) => {
    const { title, image, hours, description, type, address, venue, rating, likes, userName } = req.body;

    // preparing error messages based on what is missing
    let emptyFields = [];

    if (!title) {
        emptyFields.push('title');
    }
    if (!image) {
        emptyFields.push('image');
    }
    if (!hours) {
        emptyFields.push('hours');
    }
    if (!description) {
        emptyFields.push('description');
    }
    if (!type) {
        emptyFields.push('type');
    }
    if (!address) {
        emptyFields.push('address');
    }
    if (!venue) {
        emptyFields.push('venue');
    }
    if (!rating) {
        emptyFields.push('rating');
    }

    console.log(emptyFields);

    // if the emptyFields array is greater than zero, send an error back
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // if all fields are filled in, try creating the attraction with the supplied information
    try {
        const attraction = await Attraction.create({ title, image, hours, description, type, address, venue, rating, likes, userName });
        res.status(200).json({ attraction });
    } catch (error) {
        // catch any thrown errors and display their message
        res.status(400).json({ error: error.message });
    }
}

// delete an attraction
const deleteAttraction = async (req, res) => {
    const { id } = req.params;

    // if the attraction id is not valid return an error
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No Such Attraction' });
    }

    // find and delete attraction with same id as supplied if available
    const attraction = await Attraction.findOneAndDelete({ _id: id });

    // if there is no attraction with that id return an error
    if (!attraction) {
        return res.status(404).json({ error: 'No such Attraction' });
    }

    // if successful, return the deleted attraction
    res.status(200).json(attraction);
}

// update an attraction
const updateAttraction = async (req, res) => {
    const { id } = req.params;

    // if the attraction id is not valid return an error
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No Such Attraction' });
    }

    // find and update attraction with the supplied (updated) body
    const attraction = await Attraction.findOneAndUpdate({ _id: id }, {
        ...req.body
    });

    // if there is no attraction with that id return an error
    if (!attraction) {
        return res.status(404).json({ error: 'No such Attraction' });
    }

    // if successful, return the updated attraction
    res.status(200).json(attraction);
}

// export controller functions
module.exports = {
    createAttraction,
    getAttractions,
    getAttraction,
    deleteAttraction,
    updateAttraction
}