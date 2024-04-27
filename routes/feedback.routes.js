
const express = require('express');
const feedback = require('../controller/customer feedback/createFeedback');
const getFeedback = require('../controller/customer feedback/getFeedback');
const authorizeToken = require('../middleware/authorization');
const route = express.Router();

route.post('/createFeedback',authorizeToken.authorizeToken,feedback.feedback);
route.get('/getFeedback',getFeedback.getFeedback);

module.exports = route;

