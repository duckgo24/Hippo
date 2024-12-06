const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room.controller');

/**
 * @swagger
 * tags:
 *   - name: Room
 */

/**
 * @swagger
 * /rooms/get-rooms:
 *   get:
 *     tags: [Room]
 *     parameters:
 *       - in: query
 *         name: acc_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The account ID to filter rooms for
 *     responses:
 *       200:
 *         description: A list of rooms with participants and last message
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   room_id:
 *                     type: string
 *                   priority:
 *                     type: integer
 *                   participants:
 *                     type: object
 *                     properties:
 *                       sender:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           full_name:
 *                             type: string
 *                           avatar:
 *                             type: string
 *                           tick:
 *                             type: boolean
 *                           nickname:
 *                             type: string
 *                       receiver:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           full_name:
 *                             type: string
 *                           avatar:
 *                             type: string
 *                           tick:
 *                             type: boolean
 *                           nickname:
 *                             type: string
 *                   lastMessage:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         content:
 *                           type: string
 *                         image:
 *                           type: string
 *                         video:
 *                           type: string
 *                         seen:
 *                           type: boolean
 *                         createdAt:
 *                           type: string
 *                         sender_id:
 *                           type: string
 *       500:
 *         description: Internal server error
 */
router.get('/get-rooms/:acc_id', roomController.getAllRooms);

/**
 * @swagger
 * /rooms/find:
 *   get:
 *     tags: [Room]
 *     parameters:
 *       - in: query
 *         name: room_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The room ID to retrieve the room details
 *     responses:
 *       200:
 *         description: Room details including participants and messages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 room_id:
 *                   type: string
 *                 room_messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       content:
 *                         type: string
 *                       image:
 *                         type: string
 *                       video:
 *                         type: string
 *                       seen:
 *                         type: boolean
 *                       sender_id:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *       500:
 *         description: Internal server error
 */
router.get('/find', roomController.getRoom);

/**
 * @swagger
 * /rooms/create:
 *   post:
 *     tags: [Room]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room_id:
 *                 type: string
 *               acc_id:
 *                 type: string
 *               friend_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Room created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 room_id:
 *                   type: string
 *                 priority:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */
router.post('/create', roomController.createRoom);

module.exports = router;
