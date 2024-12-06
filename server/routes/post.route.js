const express = require('express');
const route = express.Router();
const PostController = require('../controllers/post.controller');
const { verifyToken  } = require('../middleware/authen.middleware');

/**
 * @swagger
 * tags:
 *   - name: Post
 */

/**
 * @swagger
 * /posts/get-posts:
 *   get:
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Returns all posts
 *       404:
 *         description: No posts found
 */
route.get('/get-posts', verifyToken, PostController.getAllPosts);

/**
 * @swagger
 * /posts/my-posts/{acc_id}:
 *   get:
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: acc_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Account ID
 *     responses:
 *       200:
 *         description: Returns posts of the specified account
 *       400:
 *         description: Missing account_id parameter
 *       404:
 *         description: No posts found for this account
 */
route.get('/my-posts/:acc_id', verifyToken, PostController.getMyPosts);

/**
 * @swagger
 * /posts/get-by-id/{post_id}:
 *   get:
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Returns post details by ID
 *       404:
 *         description: Post not found
 */
route.get('/get-by-id/:post_id', verifyToken, PostController.getPostById);

/**
 * @swagger
 * /posts/search/{q}:
 *   get:
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query to match post title
 *     responses:
 *       200:
 *         description: Returns search results
 *       404:
 *         description: No posts found matching the query
 */
route.get('/search/:q', verifyToken, PostController.searchPost);

/**
 * @swagger
 * /posts/create:
 *   post:
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Post created successfully
 *       401:
 *         description: Unauthorized (Token required)
 */
route.post('/create', verifyToken , PostController.createPost);

/**
 * @swagger
 * /posts/update/{id}:
 *   put:
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID to update
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       404:
 *         description: Post not found
 */
route.put('/update/:post_id', verifyToken, PostController.updatePost);

/**
 * @swagger
 * /posts/delete/{id}:
 *   delete:
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID to delete
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 *       401:
 *         description: Unauthorized (Token required)
 */
route.delete('/delete/:post_id', verifyToken , PostController.deletePost);

//External
route.get('/get-statistical', PostController.getStatisticalPost);

module.exports = route;
