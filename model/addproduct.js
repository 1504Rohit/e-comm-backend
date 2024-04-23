
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    price:{
        type:String,
        required:true
    },
    productImage:{
        type:String,
     
    },
    images:[
        String
    ]

});


const product = mongoose.model("Products",productSchema);

module.exports = {product,productSchema};