
const mongoose = require('mongoose');

const OrderStatus = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    orderId:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"Order Placed successfully"
    },
    statusCode:{
        type:Number
    }
});

module.exports = mongoose.model("OrderStatus",OrderStatus);