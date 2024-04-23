

const express = require('express');
const cart = require('../controller/cart/addToCart');
const getItems = require('../controller/cart/getCartItem');
const route = express.Router();

route.post("/addToCart",cart.addTocart);
route.get('/getCart:userId',getItems.getCartItem);

module.exports = route;