const mongoose = require('mongoose');
const {productSchema} = require('../model/addproduct');

const addressSchema = new mongoose.Schema({
    userId:{
       type:String,
       required:true
    },
    address1:{
        type:String,
        required:true
    },
    address2:{
        type:String,
        required:false
    },
    landMark:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    },
    pinCode:{
        type:Number,
        required:true
    }
});



const orderSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    address:{
        addressSchema
    },
    products:[
        productSchema
    ],
    transactionId:{
        type:String,
        required:false
    },
    totalPrice:{
        type:Number,
        required:true
    }
});


const Order = mongoose.model("Orders",orderSchema);
const Address = mongoose.model("Address",addressSchema);

module.exports = {Order,addressSchema,Address};