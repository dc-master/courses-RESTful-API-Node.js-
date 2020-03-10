const express = require('express');
const { mongoose } = require('./models/mongoose');
const { User, Course } = require('./models/models');
const { createCourse, addLesson, removeLesson } = require('./functions/db-functions');

const app = express();
app.use(express.json());

app.get('/api/courses/', async(req, res) => {
    const courses = await Course.find({ isPublish: true });
    res.send({ status: 'success', courses });
});

app.listen(3000, () => console.log('Listening on port 3000'));