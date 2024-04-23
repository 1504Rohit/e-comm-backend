const express = require('express');
const addAddress = require('../controller/address/addAddress');
const getAddress = require('../controller/address/getAddress');
const route = express.Router();

route.post('/addAddress',addAddress.addAddress);
route.get('/getAddress',getAddress.getAddress);

module.exports = route;