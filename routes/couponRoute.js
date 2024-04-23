const express = require('express');
const addCoupon = require('../controller/coupon/addCoupon');
const getCoupons = require('../controller/coupon/getCoupon'); 
const updateCoupon = require('../controller/coupon/updateCoupons');
const deleteCoupon =  require('../controller/coupon/deleteCoupon');
const applyCoupon = require('../controller/coupon/applyCoupon');
const route = express.Router();

route.post('/addCoupon', addCoupon.addCoupon);
route.get('/getCoupons', getCoupons.getCoupons);
route.post('/updateCoupon',updateCoupon.updateCoupon);
route.delete('/deleteCoupon',deleteCoupon.deleteCoupon);
route.get('/applyCoupon',applyCoupon.applyCoupon);

module.exports = route;