
const express = require('express');
const feedback = require('../controller/customer feedback/createFeedback');
const getFeedback = require('../controller/customer feedback/getFeedback');
const route = express.Router();

route.post('/createFeedback',feedback.feedback);
route.get('/getFeedback',getFeedback.getFeedback);

module.exports = route;

