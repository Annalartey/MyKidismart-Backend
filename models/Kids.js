const mongoose = require('mongoose');

const kidsSchema =  new mongoose.Schema({
    id: {
        type:Number,
        required: true
    },

    firstname:{
        type: String,
        required: true
    },

    lastname:{
        type: String,
        required: true
    },

    dateofbirth:{
        type: Date,
        required: true
    },

    parentId: {
        type: Number,
        required: true
    }

})


module.exports = mongoose.model("Kids", kidsSchema);