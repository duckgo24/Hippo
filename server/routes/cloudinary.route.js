const express = require('express');
const route = express.Router();

const cloudinarService = require('../services/cloudinary.service');

/**
 * @swagger
 * tags:
 *   - name: Upload
 */

/**
 * @swagger
 * /upload/video:
 *   post:
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               video:
 *                 type: string
 *                 format: binary
 *                 description: The video file to upload
 *     responses:
 *       200:
 *         description: Video uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 url:
 *                   type: string
 *                   description: The URL of the uploaded video
 *       401:
 *         description: Invalid or missing token
 *       500:
 *         description: Error while uploading video
 */
route.post('/video', cloudinarService('video').single('video'), (req, res) => {
    try {
        return res.json({
            message: 'Upload thành công!',
            url: req.file.path,
        });
    } catch (error) {
        return res.status(500).json({ error: 'Có lỗi khi upload video!' });
    }
});

/**
 * @swagger
 * /upload/image:
 *   post:
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 url:
 *                   type: string
 *                   description: The URL of the uploaded image
 *       401:
 *         description: Invalid or missing token
 *       500:
 *         description: Error while uploading image
 */
route.post('/image', cloudinarService('image').single('image'), (req, res) => {
    try {   
        return res.json({
            message: 'Upload thành công!',
            url: req.file.path,
        });
    } catch (error) {
        return res.status(500).json({ error: 'Có lỗi khi upload ảnh!' });
    }
});

module.exports = route;
