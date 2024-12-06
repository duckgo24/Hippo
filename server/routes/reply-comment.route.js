const express = require('express');
const route = express.Router();

const replyCommentController = require('../controllers/reply-comment.controller');
const { verifyToken  } = require('../middleware/authen.middleware');

/**
 * @swagger
 * /reply-comment/{comment_id}/get-replies-comment:
 *   get:
 *     tags: [Reply Comment]
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   reply_comment_id:
 *                     type: string
 *                   content:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                   user_id:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
route.get('/:comment_id/get-replies-comment', verifyToken, replyCommentController.getReplyCommentsByCommentId);

/**
 * @swagger
 * /reply-comment/create-reply-comment:
 *   post:
 *     tags: [Reply Comment]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment_id:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created a new reply comment successfully
 *       500:
 *         description: Internal server error
 */
route.post('/create-reply-comment', verifyToken, replyCommentController.createReplyComment);

/**
 * @swagger
 * /reply-comment/delele-reply-comment/{reply_comment_id}:
 *   delete:
 *     tags: [Reply Comment]
 *     parameters:
 *       - in: path
 *         name: reply_comment_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the reply comment
 *       500:
 *         description: Internal server error
 */
route.delete('/delele-reply-comment/:reply_comment_id', verifyToken, replyCommentController.deleteReplyComment);


module.exports = route;