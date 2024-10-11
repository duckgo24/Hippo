const express = require('express');
const authController = require('../controllers/auth.controller');
const route = express.Router();




route.get('/me', authController.me);
route.get('/refresh',authController.refreshToken);
<<<<<<< HEAD
=======


>>>>>>> 29fc6b1... update future Chat

module.exports = route;