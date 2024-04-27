const express = require('express');
const addProduct = require('../controller/product/addProducts');
const getProducts = require('../controller/product/getProducts');
const FileUpload = require('../middleware/fileUpload');
const authorizeToken = require('../middleware/authorization');
const route = express.Router();



route.post(
    '/addProduct',
    FileUpload.upload.fields([{name: 'productImage',maxCount: 1}, {name: 'images', maxCount: 5}]),authorizeToken.authorizeToken,
    addProduct.addProduct
  );

route.get('/getProducts',getProducts.getProducts);

module.exports = route;