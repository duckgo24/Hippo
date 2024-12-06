const express = require('express');
const route = express.Router();
const { verifyToken } = require('../middleware/authen.middleware');
const statisticalController = require('../controllers/statistical.controller');

/**
 * @swagger
 * /statistical/get-number-account:
 *   get:
 *     tags: [Statistical]
 *     parameters:
 *       - in: query
 *         name: start_day
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: end_day
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 day:
 *                   type: string
 *                 num_account:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */
route.get('/get-number-account', verifyToken, statisticalController.getAccountByTime);

/**
 * @swagger
 * /statistical/get-number-post:
 *   get:
 *     tags: [Statistical]
 *     parameters:
 *       - in: query
 *         name: start_day
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: end_day
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 day:
 *                   type: string
 *                 num_post:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */
route.get('/get-number-post', statisticalController.getPostByTime);

/**
 * @swagger
 * /statistical/get-number-video:
 *   get:
 *     tags: [Statistical]
 *     parameters:
 *       - in: query
 *         name: start_day
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: end_day
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 day:
 *                   type: string
 *                 num_video:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */
route.get('/get-number-video', statisticalController.getVideoByTime);


module.exports = route;