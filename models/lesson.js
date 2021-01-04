const mongoose = require('mongoose');

const lessonSchema =  new mongoose.Schema({
    lesson: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("Lesson", lessonSchema);