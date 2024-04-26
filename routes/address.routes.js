const express = require('express');
const addAddress = require('../controller/address/addAddress');
const getAddress = require('../controller/address/getAddress');
const authorizeToken = require('../middleware/authorization');
const route = express.Router();



route.post('/addAddress',authorizeToken.authorizeToken,addAddress.addAddress);
route.get('/getAddress',authorizeToken.authorizeToken,getAddress.getAddress);

module.exports = route;