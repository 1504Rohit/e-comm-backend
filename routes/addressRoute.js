const express = require('express');
const addAddress = require('../controller/address/addAddress');
const route = express.Router();

route.post('/addAddress',addAddress.addAddress);

module.exports = route;