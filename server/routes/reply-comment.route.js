const express = require('express');
const route = express.Router();

const replyCommentController = require('../controllers/reply-comment.controller');
const { authenMeByToken } = require('../middleware/authen.middleware');

route.get('/:comment_id/get-replies-comment', replyCommentController.getReplyCommentsByCommentId);
route.post('/create-reply-comment', replyCommentController.createReplyComment);
route.delete('/delele-reply-comment', authenMeByToken, replyCommentController.deleteReplyComment);

module.exports = route;