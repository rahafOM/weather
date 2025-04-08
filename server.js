// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('weather-app'));

// Setup Server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});

// GET route to return projectData
app.get('/all', (req, res) => {
    res.send(projectData);
});

// POST route to add data to projectData
app.post('/add', (req, res) => {
    projectData = {
        temp: req.body.temp,
        feel: req.body.feel,
        date: req.body.date
    };
    res.send(projectData);
});
