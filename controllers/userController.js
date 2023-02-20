// requires
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// function to create a jwt
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
}

// login user
const loginUser = async (req, res) => {

    // gather password and email from POST request
    const {email, password} = req.body;
    try {

        // call static login function from userModel
        const user = await User.login(email, password);

        // create a token for the user
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch (error) {

        // catch and display any thrown errors
        res.status(400).json({ error: error.message });
    }
}

// signup user
const signupUser = async (req, res) => {
    // gather password and email from POST request
    const {email, password} = req.body;
    try {

        // call static signup function from userModel
        const user = await User.signup(email, password);

        // create a token for the user and send both the user and the token as a response
        const token = createToken(user._id);
        res.status(200).json({ email, token });

        // catch and display any thrown errors
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    loginUser,
    signupUser
}