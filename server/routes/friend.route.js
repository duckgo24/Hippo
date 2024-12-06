const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friend.controller');
const { verifyToken  } = require('../middleware/authen.middleware');

/**
 * @swagger
 * tags:
 *   - name: Friend
 */

/**
 * @swagger
 * /friends/get-all-friend:
 *   get:
 *     tags: [Friend]
 *     parameters:
 *       - in: query
 *         name: acc_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Account ID of the user
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *         description: Number of friends to fetch
 *     responses:
 *       200:
 *         description: Returns a list of friends
 *       500:
 *         description: Internal server error
 */
router.get('/get-all-friend', verifyToken,friendController.getFriends);

/**
 * @swagger
 * /friends/add-friend:
 *   post:
 *     tags: [Friend]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               acc_id:
 *                 type: string
 *               friend_id:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Friend added successfully
 *       400:
 *         description: Friend already exists
 *       500:
 *         description: Internal server error
 */
router.post('/add-friend', verifyToken,friendController.addFriend);

/**
 * @swagger
 * /friends/check-friend:
 *   get:
 *     tags: [Friend]
 *     parameters:
 *       - in: query
 *         name: acc_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Account ID of the user
 *       - in: query
 *         name: friend_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Friend ID
 *     responses:
 *       200:
 *         description: Returns friendship status
 *       500:
 *         description: Internal server error
 */
router.get('/check-friend', verifyToken ,friendController.checkFriend);

/**
 * @swagger
 * /friends/find-friend/{acc_id}/{friend_id}:
 *   get:
 *     tags: [Friend]
 *     parameters:
 *       - in: path
 *         name: acc_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Account ID of the user
 *       - in: path
 *         name: friend_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Friend ID
 *     responses:
 *       200:
 *         description: Returns friendship data
 *       500:
 *         description: Internal server error
 */
router.get('/find-friend/:acc_id/:friend_id', verifyToken, friendController.findFriend);

/**
 * @swagger
 * /friends/delete-friend:
 *   delete:
 *     tags: [Friend]
 *     parameters:
 *       - in: query
 *         name: acc_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Account ID of the user
 *       - in: query
 *         name: friend_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Friend ID
 *     responses:
 *       200:
 *         description: Friend deleted successfully
 *       401:
 *         description: Not friends
 *       500:
 *         description: Internal server error
 */
router.delete('/delete-friend', verifyToken, friendController.deleteFriend);

/**
 * @swagger
 * /friends/update-status-friend:
 *   put:
 *     tags: [Friend]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               acc_id:
 *                 type: string
 *               friend_id:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       500:
 *         description: Internal server error
 */
router.put('/update-status-friend', verifyToken , friendController.updateStatusFriend);

module.exports = router;
