const express = require('express');
const route = express.Router();
const AccountController = require('../controllers/account.controller');
const { authenMeByToken  } = require('../middleware/authen.middleware');
const sendmailService = require('../services/sendmail.service');



route.get('/all', authenMeByToken , AccountController.getAllAccounts);
route.get('/me', AccountController.getMe);
route.post('/register', AccountController.register);
route.post('/login', AccountController.login);
route.post('/send-mail', sendmailService);
route.put('/update/:id', authenMeByToken , AccountController.update);


module.exports = route;