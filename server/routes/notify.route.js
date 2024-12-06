const express = require('express');
const { verifyToken } = require('../middleware/authen.middleware');
const notifyController = require('../controllers/notify.controller');
const route = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Notify
 */

/**
 * @swagger
 * /notify/get-all-notify:
 *   get:
 *     tags: [Notify]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: acc_id
 *         in: query
 *         description: Account ID to fetch notifications for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a list of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notify'
 *       401:
 *         description: Invalid or missing token
 *       404:
 *         description: No notifications found for the provided account ID
 */
route.get('/get-all-notify', verifyToken, notifyController.getAllNotify);

/**
 * @swagger
 * /notify/create-notify:
 *   post:
 *     tags: [Notify]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Create a new notification
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNotify'
 *     responses:
 *       200:
 *         description: Notification created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notify'
 *       401:
 *         description: Invalid or missing token
 *       400:
 *         description: Invalid input data
 */
route.post('/create-notify', verifyToken, notifyController.createNotify);

/**
 * @swagger
 * /notify/del-notify/{notify_id}:
 *   delete:
 *     tags: [Notify]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: notify_id
 *         in: path
 *         description: The ID of the notification to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notify_id:
 *                   type: string
 *                   description: ID of the deleted notification
 *       401:
 *         description: Invalid or missing token
 *       404:
 *         description: Notification not found
 */
route.delete('/del-notify/:notify_id', verifyToken, notifyController.delNotify);

/**
 * @swagger
 * /notify/del-notify-2:
 *   delete:
 *     tags: [Notify]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sender_id:
 *                   type: string
 *                 receiver_id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *       401:
 *         description: Invalid or missing token
 *       404:
 *         description: Notification not found
 */
route.delete('/del-notify-2', verifyToken, notifyController.delNotifyByMultiData);


module.exports = route;
