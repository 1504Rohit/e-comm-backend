
const mongoose = require('mongoose');

const feedback = new mongoose.Schema({
    productId:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        required:false
    }
});

module.exports = mongoose.model("Feedbacks",feedback);