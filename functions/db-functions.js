const { mongoose } = require('../models/mongoose');
const { User, Course } = require('../models/models');

var createCourse = async(name, authors) => {
    let course = new Course({
        name,
        authors
    });
    let res = await course.save();
    return res;
}

var addLesson = async(courseId, lesson) => {
    try {
        let course = await Course.findById(courseId);
        course.lessons.push(lesson);
        console.log(course);
        course.save();
        return course;
    } catch (error) {
        return error;
    }
}

var removeLesson = async(courseId, lessonId) => {
    try {
        let course = await Course.findById(courseId);
        let lesson = course.lessons.id(lessonId);
        lesson.remove();
        course.save();
        return course;
    } catch (error) {
        return error;
    }
}

module.exports = {
    createCourse,
    addLesson,
    removeLesson
}