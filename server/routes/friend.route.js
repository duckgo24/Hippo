const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friend.controller');
const { authenMeByToken } = require('../middleware/authen.middleware');


router.get('/get-all-friend', authenMeByToken, friendController.getFriends);
router.get('/check-friend', friendController.checkFriend);
router.get('/find-friend', friendController.findFriend);
router.post('/add-friend', friendController.addFriend);
router.delete('/delete-friend', friendController.deleteFriend);
router.put('/update-status-friend', authenMeByToken, friendController.updateStatusFriend);


module.exports = router;