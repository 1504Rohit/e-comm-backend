
const express = require('express');
const register = require('../controller/auth/registeruser');
const sendOTP = require("../controller/auth/sendOtp");
const login = require('../controller/auth/loginUser');
const updateProfile = require('../controller/profile/updateProfile');
const authorizeToken = require('../middleware/authorization');
const getUser = require('../controller/profile/getUser');
const app = express.Router();

app.post('/signup',register.Register);
app.get("/sendOTP",sendOTP.sendOTP);
app.post("/login",login.loginUser);
app.post("/updateProfile",authorizeToken.authorizeToken,updateProfile.update);
app.get("/getUser",authorizeToken.authorizeToken,getUser.getUser);

module.exports = app;