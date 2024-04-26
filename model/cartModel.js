const mongoose = require('mongoose');
const {productSchema} = require('../model/addproduct');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: productSchema,
    ref: 'Product', 
    required: true
  },
  quantity: {
    type: Number,
    default: 1 
  },
  createdAt: {
    type: Date,
    default: Date.now 
  }
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;