const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room.controller');

router.get('/get-rooms', roomController.getAllRooms);
router.get('/find', roomController.getRoom);
router.post('/create', roomController.createRoom);

module.exports = router;