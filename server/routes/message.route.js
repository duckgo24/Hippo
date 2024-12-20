const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authen.middleware');
const messageController = require('../controllers/message.controller');

/**
 * @swagger
 * tags:
 *   - name: Message
 */

/**
 * @swagger
 * /messages/{room_id}/get-messages:
 *   get:
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: room_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the room
 *     description: Get all messages in a specific room
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       500:
 *         description: Server error
 */
router.get('/:room_id/get-messages', verifyToken, messageController.getAllMessages);


/**
 * @swagger
 * /messages/{room_id}/get-messages-group:
 *   get:
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: room_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the room
 *     description: Get grouped messages in a specific room
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       500:
 *         description: Server error
 */
router.get('/get-messages-group', verifyToken, messageController.getAllMessageGroups);


/**
 * @swagger
 * /messages/create:
 *   post:
 *     tags: [Message]
 *     description: Create a new message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               acc_id:
 *                 type: string
 *                 description: Sender's account ID
 *               room_id:
 *                 type: string
 *                 description: Room ID
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *               video:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message created successfully
 *       500:
 *         description: Server error
 */
router.post('/create', verifyToken, messageController.createMessage);

/**
 * @swagger
 * /messages/{message_id}/update:
 *   put:
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: message_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the message
 *     description: Update a message by its ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *               video:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message updated successfully
 *       500:
 *         description: Server error
 */
router.put('/:message_id/update', verifyToken, messageController.updateMessage);


/**
 * @swagger
 * /messages/delete:
 *   delete:
 *     tags: [Message]
 *     description: Delete a message by its ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chat_id:
 *                 type: string
 *                 description: ID of the chat
 *               sender_id:
 *                 type: string
 *                 description: ID of the sender
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *       500:
 *         description: Server error
 */
router.delete('/delete', verifyToken, messageController.deleteMessage);

module.exports = router;