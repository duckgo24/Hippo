
const express = require('express');
const blockPostController = require('../controllers/block-post.controller');
const { verifyToken  } = require('../middleware/authen.middleware');
const route = express.Router();

route.post('/block/:id', verifyToken , blockPostController.block);



module.exports = route;