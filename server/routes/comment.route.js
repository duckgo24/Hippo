const express = require('express');
const route = express.Router();
const commentController = require('../controllers/comment.controller');
const { verifyToken  } = require('../middleware/authen.middleware');

/**
 * @swagger
 * tags:
 *   - name: Comment
 */

/**
 * @swagger
 * /comments/get-all-comment:
 *   get:
 *     tags: [Comment]
 *     parameters:
 *       - in: query
 *         name: post_id
 *         required: false
 *         schema:
 *           type: string
 *         description: Post ID to filter comments by post
 *       - in: query
 *         name: video_id
 *         required: false
 *         schema:
 *           type: string
 *         description: Video ID to filter comments by video
 *     responses:
 *       200:
 *         description: Returns all comments, or filtered by post_id or video_id
 *       404:
 *         description: No comments found
 */
route.get('/get-all-comment', verifyToken,commentController.getAllComments);

/**
 * @swagger
 * /comments/create-comment:
 *   post:
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       401:
 *         description: Unauthorized (Token required)
 */
route.post('/create-comment', verifyToken , commentController.createComment);

/**
 * @swagger
 * /comments/delete-comment:
 *   delete:
 *     tags: [Comment]
 *     parameters:
 *       - in: query
 *         name: comment_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID to delete
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       401:
 *         description: Unauthorized (Token required)
 */
route.delete('/delete-comment/:comment_id', verifyToken , commentController.deleteComment);

/**
 * @swagger
 * /comments/{comment_id}/update-comment:
 *   put:
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID to update
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       404:
 *         description: Comment not found
 */
route.put('/update-comment/:comment_id', verifyToken, commentController.updateComment);

module.exports = route;
