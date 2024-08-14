const express = require('express');
const route = express.Router();

const PostController = require('../controllers/post.controller');


route.get('/get-posts', PostController.getAllPosts);
route.get('/:id', PostController.findPost);
route.get('/search/:q', PostController.searchPost);
route.post('/create', PostController.createPost);
route.put('/update/:id', PostController.updatePost);
route.delete('/delete/:id', PostController.deletePost);

module.exports = route;

