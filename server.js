// requires
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const pagesRoutes = require('./routes/pages');
const userRoutes = require('./routes/user');

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// allows the backend and frontend to connect
app.get('/', (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
});

// logs where the request is being made to and what type of request
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/Places', pagesRoutes);
app.use('/Activities', pagesRoutes);
app.use('/Home', pagesRoutes);
app.use('/user', userRoutes);



// connect to db
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to database listening on port 4000');
        });
    })
    // catch and log any errors
    .catch((error) => {
        console.log(error);
    });
