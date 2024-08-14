
const express = require('express');
const likeController = require('../controllers/like.controller');
const { authenMeByToken } = require('../middleware/authen.middleware');
const route = express.Router();

route.get('/posts-liked', likeController.getAllLikesPost);
route.post('/like', likeController.like);
route.delete('/dislike', likeController.dislike);


module.exports = route;