const express = require('express');
const authController = require('../controllers/auth.controller');
const route = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 */

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns authenticated user information
 *       401:
 *         description: Invalid or missing token
 *       404:
 *         description: Account not found
 */
route.get('/me', authController.me);

/**
 * @swagger
 * /auth/refresh:
 *   get:
 *     tags: [Auth]
 *     security:
 *       - refreshAuth: []
 *     responses:
 *       200:
 *         description: Returns new access token
 *       401:
 *         description: Invalid or missing refresh token
 */
route.get('/refresh', authController.refreshToken);

module.exports = route;
