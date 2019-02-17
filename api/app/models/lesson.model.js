const mongoose = require('mongoose');

const LessonSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Lesson', LessonSchema);