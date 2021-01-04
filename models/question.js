const mongoose = require('mongoose');

const questionSchema =  new mongoose.Schema({
    id: {
        type:Number,
        required: true
    },
    subject: {
        type: String,
        required: true,
        // minlength: 20,
        // maxlength: 80
    },
    topic: {
        type: String,
        required: true
    },

    question: {
        type: String,
        required: true
    },

    answer: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("Question", questionSchema);