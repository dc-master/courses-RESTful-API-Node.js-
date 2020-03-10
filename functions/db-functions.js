const { mongoose } = require('./models/mongoose');
const { User, Course } = require('./models/models');

var createCourse = async(name, authors) => {
    const course = new Course({
        name,
        authors
    });
    const res = await course.save();
    console.log(res);
}

var addLesson = async(courseId, lesson) => {
    const course = await Course.findById(courseId);
    course.lesson.push(lesson);
    course.save();
}

var removeLesson = async(courseId, lessonId) => {
    const course = await Course.findById(courseId);
    const lesson = course.lesson.id(lessonId);
    lesson.remove();
    course.save();
}

module.exports = {
    createCourse,
    addLesson,
    removeLesson
}