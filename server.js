const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


let projectData = [];

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(cors());


app.use(express.static('public'));

const port = 3000;

app.get('/all', (req, res) => {
    res.send(projectData);
});

app.post('/addWeatherData', (req, res) => {
    const newEntry = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse,
    };
    projectData.push(newEntry);
    res.send(projectData);
});

const server = app.listen(port, () => {
    console.log(`Server running on localhost: ${port}`);
});

