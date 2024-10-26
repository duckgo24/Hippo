const express = require('express');
const route = express.Router();

const { authenMeByToken } = require('../middleware/authen.middleware');
const videoController = require('../controllers/video.controller');

route.get('/get-videos', videoController.getAllVideos);
route.post('/create', authenMeByToken ,videoController.createVideo);
route.put('/update/:id', videoController.updateVideo);
route.delete('/delete/:id', authenMeByToken, videoController.deleteVideo);


module.exports = route;

