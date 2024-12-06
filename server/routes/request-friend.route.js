const express = require('express');
const router = express.Router();
const RequestFriendController = require('../controllers/request-friend.controller');
const { verifyToken } = require('../middleware/authen.middleware');

/**
 * @swagger
 * /request-friend/all:
 *   get:
 *     tags: [Request Friend]
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
 *                   request_id:
 *                     type: string
 *                   sender_id:
 *                     type: string
 *                   receiver_id:
 *                     type: string
 *                   status:
 *                     type: string
 *                   created_at:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get('/all', verifyToken, RequestFriendController.getAllRequest);

/**
 * @swagger
 * /request-friend/find-with-sender:
 *   get:
 *     tags: [Request Friend]
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
 *                   request_id:
 *                     type: string
 *                   sender_id:
 *                     type: string
 *                   receiver_id:
 *                     type: string
 *                   status:
 *                     type: string
 *                   created_at:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get('/find-with-sender', verifyToken, RequestFriendController.findRequestWithRoleSender);

/**
 * @swagger
 * /request-friend/find-with-receiver:
 *   get:
 *     tags: [Request Friend]
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
 *                   request_id:
 *                     type: string
 *                   sender_id:
 *                     type: string
 *                   receiver_id:
 *                     type: string
 *                   status:
 *                     type: string
 *                   created_at:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get('/find-with-receiver', verifyToken, RequestFriendController.findRequestWithRoleReceiver);

/**
 * @swagger
 * /request-friend/create:
 *   post:
 *     tags: [Request Friend]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sender_id:
 *                 type: string
 *               receiver_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created a new friend request successfully
 *       500:
 *         description: Internal server error
 */
router.post('/create', verifyToken, RequestFriendController.createRequest);

/**
 * @swagger
 * /request-friend/delete:
 *   delete:
 *     tags: [Request Friend]
 *     responses:
 *       200:
 *         description: Successfully deleted the friend request
 *       500:
 *         description: Internal server error
 */
router.delete('/delete', verifyToken, RequestFriendController.deleteRequest);

module.exports = router;