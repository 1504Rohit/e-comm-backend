
const express = require('express');
const db = require('./database/db');
const route = require('./routes/authRoute');
const product = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');
const CouponRoute = require('./routes/couponRoute');
const OrderRoute = require('./routes/orderRoute');
const Address = require ('./routes/addressRoute');
const feedback = require('./routes/feedbackRoute');
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