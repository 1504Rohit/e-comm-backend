const express = require('express');
const favList =  require('../controller/favlist/addfav');
const getFav = require('../controller/favlist/getFav');
const authorizeToken = require('../middleware/authorization');
const route = express.Router();

route.post('/addFav',authorizeToken.authorizeToken,favList.addFav);
route.get('/gatFav',authorizeToken.authorizeToken,getFav.getFav);

module.exports = route;