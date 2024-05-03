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
        type:String
    },

    images:[
        String
    ],

    category:{
        type: String,
        enum: ['clothes' , 'electronics' , 'furniture' , 'kitchen' , 'HomeApplience'],
        required: true
    },

    productType:{
        type: String,
        required: true
    },

    forGender:{
        type: String,
        enum: ['men','women','children','everyone'],
        required: true
    },

    quantity:{
        type:Number,
        required:true
    },

    soldQuantity:{
        type:Number,
        required:true
    }

});


const product = mongoose.model("Products",productSchema);

module.exports = {product,productSchema};