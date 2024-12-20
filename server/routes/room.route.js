const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room.controller');
const { verifyToken } = require('../middleware/authen.middleware');

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
router.get('/get-rooms/:acc_id', verifyToken, roomController.getAllRooms);



/**
 * @swagger
 * /rooms/get-rooms-group:
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
router.get('/get-rooms-group/:acc_id', verifyToken, roomController.getRoomsGroup);



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
router.get('/find', verifyToken, roomController.getRoom);

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
router.post('/create', verifyToken, roomController.createRoom);

/**
 * @swagger
 * /rooms/create-group:
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
 *               group_name:
 *                 type: string
 *               group_avatar:
 *                 type: string
 *               group_members:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Group created successfully
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
router.post('/create-group', verifyToken, roomController.createRoomGroup);


/**
 * @swagger
 * /rooms/add-user:
 *   post:
 *     tags: [Room]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               room_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: User added to room successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 room_id:
 *                   type: string
 *                 user_id:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.post('/add-user', verifyToken, roomController.addUserToRoom);

/**
 * @swagger
 * /rooms/add-user-group:
 *   post:
 *     tags: [Room]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               room_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: User added to room successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 room_id:
 *                   type: string
 *                 user_id:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.put('/delete-user', verifyToken, roomController.deleteUserToRoom);



module.exports = router;
