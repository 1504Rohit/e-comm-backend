
const mongoose = require('mongoose');

const favModel = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products', 
        required: true
      }
});

module.exports = mongoose.model('Favorite',favModel);