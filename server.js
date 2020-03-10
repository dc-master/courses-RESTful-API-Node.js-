const express = require('express');
const { mongoose } = require('./models/mongoose');
const { User, Course } = require('./models/models');

const app = express();
app.use(express.json());

app.get('/api/courses/', (req, res) => {
    res.send({ status: 'success' });
});

app.listen(3000, () => console.log('Listening on port 3000'));