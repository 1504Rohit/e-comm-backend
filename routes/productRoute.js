const express = require('express');
const addProduct = require('../controller/product/addProducts');
const getProducts = require('../controller/product/getProducts');
const route = express.Router();



route.post(
    '/addProduct',
    addProduct.upload.fields([{name: 'productImage',maxCount: 1}, {name: 'images', maxCount: 5}]),
    addProduct.addProduct
  );

route.get('/getProducts',getProducts.getProducts);

module.exports = route;