const express = require('express');
const route = express.Router();

const PostController = require('../controllers/post.controller');
const { authenMeByToken } = require('../middleware/authen.middleware');

route.get('/get-posts', PostController.getAllPosts);
route.get('/:id', PostController.findPost);
route.get('/search/:q', PostController.searchPost);
route.post('/create', authenMeByToken ,PostController.createPost);
route.put('/update/:id',PostController.updatePost);
route.delete('/delete/:id', authenMeByToken,PostController.deletePost);

module.exports = route;

