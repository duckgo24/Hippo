
const express = require('express');
const blockPostController = require('../controllers/block-post.controller');
const { authenMeByToken } = require('../middleware/authen.middleware');
const route = express.Router();

route.post('/block/:id', authenMeByToken, blockPostController.block);



module.exports = route;