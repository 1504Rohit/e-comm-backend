

const express = require('express');
const cart = require('../controller/cart/addToCart');
const getItems = require('../controller/cart/getCartItem');
const authorizeToken = require('../middleware/authorization');
const route = express.Router();

route.post("/addToCart",authorizeToken.authorizeToken,cart.addTocart);
route.get('/getCart:userId',authorizeToken.authorizeToken,getItems.getCartItem);

module.exports = route;