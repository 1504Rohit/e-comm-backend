
const express = require('express');
const createOrder = require('../controller/Order/createOrder');
const getorder = require('../controller/Order/getAllOrder');
const route = express.Router();

route.post("/createOrder",createOrder.CreateOrder);
route.get("/getAllOrders",getorder.getAllOrder);

module.exports = route;