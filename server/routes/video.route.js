const express = require('express');
const route = express.Router();

const { verifyToken } = require('../middleware/authen.middleware');
const videoController = require('../controllers/video.controller');

/**
 * @swagger
 * tags:
 *   - name: Video
 */

/**
 * @swagger
 * /videos/get-videos:
 *   get:
 *     tags: [Video]
 *     description: Retrieve all videos
 *     responses:
 *       200:
 *         description: Returns videos
 *       401:
 *         description: Unauthorized (Token required)
 *       404:
 *         description: No videos
 */
route.get('/get-videos', verifyToken, videoController.getAllVideos);




/**
 * @swagger
 * /videos/my-videos/{acc_id}:
 *   get:
 *     tags: [Video]
 *     parameters:
 *       - in: path
 *         name: acc_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Account ID
 *     responses:
 *       200:
 *         description: Returns videos of the specified account
 *       400:
 *         description: Missing account_id parameter
 *       404:
 *         description: No videos found for this account
 */
route.get('/my-videos/:acc_id', verifyToken, videoController.getMyVideos);


/**
 * @swagger
 * /videos/get-by-id/{video_id}:
 *   get:
 *     tags: [Video]
 *     parameters:
 *       - in: path
 *         name: video_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Returns video details by ID
 *       404:
 *         description: Post not found
 */
route.get('/get-by-id/:video_id', verifyToken, videoController.getVideoById);

/**
 * @swagger
 * /videos/create:
 *   video:
 *     tags: [Video]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               video_url:
 *                 type: string
 *               acc_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Video created successfully
 *       401:
 *         description: Unauthorized (Token required)
 *       500:
 *         description: Internal server error
 */
route.post('/create', verifyToken, videoController.createVideo);

/**
 * @swagger
 * /videos/update/{id}:
 *   put:
 *     tags: [Video]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Video ID to update
 *     responses:
 *       200:
 *         description: Video updated successfully
 *       404:
 *         description: Video not found
 *       500:
 *         description: Internal server error
 */
route.put('/update/:id', verifyToken, videoController.updateVideo);

/**
 * @swagger
 * /videos/delete/{id}:
 *   delete:
 *     tags: [Video]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Video ID to delete
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Video deleted successfully
 *       404:
 *         description: Video not found
 *       401:
 *         description: Unauthorized (Token required)
 */
route.delete('/delete/:id', verifyToken, videoController.deleteVideo);

// External
route.get('/get-statistical', videoController.getStatisticalVideo);

module.exports = route;
