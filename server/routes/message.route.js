const express = require('express');
const router = express.Router();


const { verifyToken } = require('../middleware/authen.middleware');
const messageController = require('../controllers/message.controller');


router.get('/:room_id/get-messages', verifyToken, messageController.getAllMessages);
router.post('/create', verifyToken, messageController.createMessage);



module.exports = router;