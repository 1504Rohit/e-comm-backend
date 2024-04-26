
const express = require('express');
const db = require('./database/db');
const route = require('./routes/auth.routes');
const product = require('./routes/product.routes');
const cartRoute = require('./routes/cart.routes');
const CouponRoute = require('./routes/coupon.routes');
const OrderRoute = require('./routes/order.routes');
const Address = require ('./routes/address.routes');
const feedback = require('./routes/feedback.routes');
const app = express();

app.use(express.json());

app.use('/api',route);
app.use('/api',product);
app.use('/api',cartRoute);
app.use('/api',CouponRoute);
app.use('/api',OrderRoute);
app.use('/api',Address);
app.use('/api',feedback);

app.use('/uploads',express.static(__dirname+"/uploads"));

app.listen(3500,()=>{
    console.log("App is running on port no 3500");
});