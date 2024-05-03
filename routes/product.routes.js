const express = require('express');
const addProduct = require('../controller/product/addProducts');
const getProducts = require('../controller/product/getProducts');
const updateProduct = require('../controller/product/updateProduct');
const deleteProduct = require('../controller/product/deleteProducts');
const FileUpload = require('../middleware/fileUpload');
const authorizeToken = require('../middleware/authorization');
const route = express.Router();

route.post(
    '/addProduct',
    FileUpload.upload.fields([{name: 'productImage',maxCount: 1}, {name: 'images', maxCount: 5}]),authorizeToken.authorizeToken,
    addProduct.addProduct
  );
  route.post(
    '/updateProduct/:id',
    FileUpload.upload.fields([{name: 'productImage',maxCount: 1}, {name: 'images', maxCount: 5}]),authorizeToken.authorizeToken,
    updateProduct.updateProduct
  );
route.get('/getProducts',getProducts.getProducts);
route.delete('/deleteProduct/:id',authorizeToken.authorizeToken,deleteProduct.deleteProducts);

module.exports = route;