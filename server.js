const express = require('express');
const { mongoose } = require('./models/mongoose');
const { Author, Course } = require('./models/models');
const { createCourse, addLesson, removeLesson } = require('./functions/db-functions');

const app = express();
app.use(express.json());

app.get('/api/courses/', async(req, res) => {
    try {
        const courses = await Course.find({ isPublish: true });
        res.send({ status: 'success', courses });
    } catch (error) {
        res.send({ status: 'error', error });
    }
});

app.get('/api/course/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const course = await Course.findById(id).populate('author firstName');
        res.send({ status: 'success', course })
    } catch (error) {
        res.send({ status: 'error', error });
    }
});

app.post('/api/new/course', async(req, res) => {
    try {
        let name = req.body.courseName;
        let author = req.body.author;
        let course = await createCourse(name, [new Author(author)]);
        res.send({ status: 'success', course });
    } catch (error) {
        res.send({ status: 'error', error });
    }
});

app.post('/api/new/lesson', async(req, res) => {
    try {
        let courseId = req.body.courseId;
        let lessonObj = {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category
        }
        let course = await addLesson(courseId, lessonObj);
        res.send({ status: 'success', course });
    } catch (error) {
        res.send({ status: 'error', error });
    }
});

app.delete('/api/delete/lesson', async(req, res) => {
    try {
        let courseId = req.body.courseId;
        let lessonId = req.body.lessonId;
        let course = await removeLesson(courseId, lessonId);
        res.send({ status: 'success', course });
    } catch (error) {
        res.send({ status: 'error', error });
    }
});

app.listen(3000, () => console.log('Listening on port 3000'));