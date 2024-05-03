

const express = require('express');
const cart = require('../controller/cart/addToCart');
const getItems = require('../controller/cart/getCartItem');
const decreaseQuant = require('../controller/cart/decreaseQuan');
const del = require('../controller/cart/deleteCart');
const authorizeToken = require('../middleware/authorization');
const route = express.Router();

route.post("/addToCart",authorizeToken.authorizeToken,cart.addTocart);
route.post("/decreaseQuant",authorizeToken.authorizeToken,decreaseQuant.decreaseQuantity);
route.get('/getCart/:userId',authorizeToken.authorizeToken,getItems.getCartItem);
route.delete('/deleteItem/:id',authorizeToken.authorizeToken,del.deleteCart);

module.exports = route;