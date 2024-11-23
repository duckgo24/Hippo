

const express = require('express');
const route = express.Router();

const commentController = require('../controllers/comment.controller');
const { authenMeByToken } = require('../middleware/authen.middleware');

route.get('/get-all-comment' ,commentController.getAllComments);
route.post('/create-comment', authenMeByToken ,commentController.createComment);
route.delete('/delete-comment', authenMeByToken, commentController.deleteComment);
route.put('/:comment_id/update-comment', commentController.updateComment);

module.exports = route;