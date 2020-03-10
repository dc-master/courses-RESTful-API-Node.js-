const mongoose = require('mongoose');

let AuthorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number
})

let CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'وارد کردن نام دوره اجباری است.'],
        minlength: 4
    },
    authors: [AuthorSchema],
    lessons: [{
        title: String,
        content: String,
        category: String
    }],
    isPublish: {
        type: Boolean,
        default: true
    }
});

let Author = mongoose.model('Author', AuthorSchema);
let Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Author,
    Course,
}