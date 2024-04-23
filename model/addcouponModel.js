

const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    discountType:{
        type:Number,   // 1 for % discount and 2 for Absloute value discount
        required:true
    },
    discountValue:{
        type:Number,
        required:true
    },
    minimumValue:{
        type:Number,
        required:true
    },
    startDate:{
        type: Date,
        default: Date.now ,
    },
    endDate:{
        type: Date,
        default: Date.now ,
    }

});

module.exports = mongoose.model('Coupon',couponSchema);

