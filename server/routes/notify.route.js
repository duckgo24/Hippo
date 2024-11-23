
const express = require('express');

const { authenMeByToken } = require('../middleware/authen.middleware');
const notifyController = require('../controllers/notify.controller');
const route = express.Router();

route.get('/get-all-notify',  notifyController.getAllNotify);
route.post('/create-notify', notifyController.createNotify);
route.delete('/del-notify/:notify_id', notifyController.delNotify);

module.exports = route;