const express = require('express');
const router = express.Router();
const RequestFriendController = require('../controllers/request-friend.controller');
const { authenMeByToken } = require('../middleware/authen.middleware');

router.get('/all', authenMeByToken, RequestFriendController.getAllRequest);
router.get('/find-with-sender', RequestFriendController.findRequestWithRoleSender);
router.get('/find-with-receiver', RequestFriendController.findRequestWithRoleReceiver)
router.post('/create', authenMeByToken, RequestFriendController.createRequest);
router.delete('/delete', RequestFriendController.deleteRequest);
router.delete('/refuse', RequestFriendController.refuseRequest);

module.exports = router;