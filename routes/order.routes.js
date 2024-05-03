const express = require('express');
const createOrder = require('../controller/Order/createOrder');
const getorder = require('../controller/Order/getAllOrder');
const getStatus = require('../controller/orderStatus/getOrderStatus');
const updateStatus = require('../controller/orderStatus/updateOrderStatus');
const checkAdd = require('../middleware/checkAddress');
const checkQuant = require('../middleware/checkQuantity');
const verifyPay = require('../middleware/verifyPayment');
const authorizeToken = require('../middleware/authorization');
const route = express.Router();

route.post("/createOrder",authorizeToken.authorizeToken,checkQuant.checkQuantity,checkAdd.checkAddress,verifyPay.verifyPayment,createOrder.CreateOrder);
route.get("/getAllOrders",authorizeToken.authorizeToken,getorder.getAllOrder);
route.post("/updateOrderStatus",authorizeToken.authorizeToken,updateStatus.OrderStatus);
route.get("/getOrderStatus",authorizeToken.authorizeToken,getStatus.getStatus);


module.exports = route;