const express = require('express');
const route = express.Router();
const AccountController = require('../controllers/account.controller');
const { authenMeByToken } = require('../middleware/authen.middleware');
const accountController = require('../controllers/account.controller');




route.get('/suggest', AccountController.getSuggestAccounts);
route.get('/search', accountController.searchAccount)
route.post('/register', AccountController.register);
route.post('/login', AccountController.login);
route.post('/forget-password', AccountController.forgetPassword);
route.put('/update/:id', authenMeByToken, AccountController.update);


module.exports = route;