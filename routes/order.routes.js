
const express = require('express');
const createOrder = require('../controller/Order/createOrder');
const getorder = require('../controller/Order/getAllOrder');
const getStatus = require('../controller/orderStatus/getOrderStatus');
const updateStatus = require('../controller/orderStatus/updateOrderStatus');
const route = express.Router();

route.post("/createOrder",createOrder.CreateOrder);
route.get("/getAllOrders",getorder.getAllOrder);
route.post("/updateOrderStatus",updateStatus.OrderStatus);
route.get("/getOrderStatus",getStatus.getStatus);


module.exports = route;