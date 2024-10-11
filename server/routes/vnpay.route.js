const express = require('express');
const authController = require('../controllers/auth.controller');
const vnpayService = require('../services/vnpay.service');
const route = express.Router();




route.post('/payment', vnpayService)

module.exports = route;