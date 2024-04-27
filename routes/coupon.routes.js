const express = require('express');
const addCoupon = require('../controller/coupon/addCoupon');
const getCoupons = require('../controller/coupon/getCoupon'); 
const updateCoupon = require('../controller/coupon/updateCoupons');
const deleteCoupon =  require('../controller/coupon/deleteCoupon');
const applyCoupon = require('../controller/coupon/applyCoupon');
const authorizeToken = require('../middleware/authorization');
const route = express.Router();

route.post('/addCoupon',authorizeToken.authorizeToken, addCoupon.addCoupon);
route.get('/getCoupons',authorizeToken.authorizeToken, getCoupons.getCoupons);
route.post('/updateCoupon',authorizeToken.authorizeToken,updateCoupon.updateCoupon);
route.delete('/deleteCoupon',authorizeToken.authorizeToken,deleteCoupon.deleteCoupon);
route.get('/applyCoupon',authorizeToken.authorizeToken,applyCoupon.applyCoupon);

module.exports = route;