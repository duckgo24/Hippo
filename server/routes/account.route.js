const express = require('express');
const route = express.Router();
const AccountController = require('../controllers/account.controller');
const { authenMeByToken  } = require('../middleware/authen.middleware');




route.get('/all', authenMeByToken , AccountController.getAllAccounts);
route.get('/me', AccountController.getMe);
route.get('/refresh', AccountController.refreshToken);
route.post('/register', AccountController.register);
route.post('/login', AccountController.login);
route.post('/forget-password', AccountController.forgetPassword);
route.put('/update/:id', authenMeByToken , AccountController.update);


module.exports = route;