
const express = require('express');
const likeController = require('../controllers/like.controller');
const { verifyToken } = require('../middleware/authen.middleware');
const route = express.Router();
/**
 * @swagger
 * /like/post_id={post_id}/get-all-like:
 *   get:
 *     tags: [Like]
 *     parameters:
 *       - in: path
 *         name: post_id
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
 *                   user_id:
 *                     type: string
 *                   liked_at:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
route.get('/post_id=:post_id/get-all-like', verifyToken, likeController.getAllLikesByPostId);

/**
 * @swagger
 * /like/video_id={video_id}/get-all-like:
 *   get:
 *     tags: [Like]
 *     parameters:
 *       - in: path
 *         name: video_id
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
 *                   user_id:
 *                     type: string
 *                   liked_at:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
route.get('/video_id=:video_id/get-all-like', verifyToken, likeController.getAllLikesByVideoId);

/**
 * @swagger
 * /like:
 *   post:
 *     tags: [Like]
 *     responses:
 *       201:
 *         description: Like successful
 *       500:
 *         description: Internal server error
 */
route.post('/like', verifyToken, likeController.like);

/**
 * @swagger
 * /like/dislike:
 *   delete:
 *     tags: [Like]
 *     responses:
 *       200:
 *         description: Dislike successful
 *       500:
 *         description: Internal server error
 */
route.delete('/dislike', verifyToken, likeController.dislike);



module.exports = route;