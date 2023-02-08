// requires
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const placesRoutes = require('./routes/places');
const activitesRoutes = require('./routes/activities');
const pagesRoutes = require('./routes/pages');

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/Places', placesRoutes);
app.use('/Activities', activitesRoutes);
app.use('/', pagesRoutes);

// connect to db
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to database listening on port 4000');
        });
    })
    .catch((error) => {
        console.log(error);
    });
