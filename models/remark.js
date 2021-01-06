const mongoose = require('mongoose');

const remarkSchema =  new mongoose.Schema({
    id: {
        type:Number,
        required: true
    },
    remark: {
        type: String,
        required: true,
        // minlength: 20,
        // maxlength: 80
    }
})


module.exports = mongoose.model("Remark", remarkSchema);