const express = require('express');
const router = express.Router();


const { authenMeByToken } = require('../middleware/authen.middleware');
const roomMessageController = require('../controllers/room-message.controller');


router.get('/get-messages', authenMeByToken, roomMessageController.getAllMessages);
router.post('/create', authenMeByToken, roomMessageController.createMessage);



module.exports = router;