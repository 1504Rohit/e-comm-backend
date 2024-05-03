const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Products', 
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