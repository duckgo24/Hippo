const express = require('express');
const route = express.Router();
const { verifyToken } = require('../middleware/authen.middleware');
const accountController = require('../controllers/account.controller');

/**
 * @swagger
 * tags:
 *   - name: Account
 */

route.get('/get-accounts', verifyToken, accountController.getAccountWithPagination);


/**
 * @swagger
 * /accounts/suggest:
 *   get:
 *     tags: [Account]
 *     description: Get suggested accounts
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Account'
 */
route.get('/suggest', accountController.getSuggestAccounts);

/**
 * @swagger
 * /accounts/search:
 *   get:
 *     tags: [Account]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query
 *     description: Search for accounts by nickname
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Account'
 *       400:
 *         description: Invalid search query
 *       404:
 *         description: Account not found
 */
route.get('/search/:q', verifyToken, accountController.searchAccount);

/**
 * @swagger
 * /accounts/get/{nickname}:
 *   get:
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: nickname
 *         required: true
 *         schema:
 *           type: string
 *         description: Account nickname
 *     description: Get account by nickname
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       404:
 *         description: Account not found
 */
route.get('/get/:nickname', verifyToken, accountController.getAccountByNickname);

/**
 * @swagger
 * /accounts/get-by-id/{id}:
 *   get:
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Account nickname
 *     description: Get account by nickname
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       404:
 *         description: Account not found
 */
route.get('/get-by-id/:id', accountController.getAccountById);
/**
 * @swagger
 * /accounts/register:
 *   post:
 *     tags: [Account]
 *     description: Register a new account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       201:
 *         description: Account created
 *       409:
 *         description: Username is already taken
 */
route.post('/register', accountController.register);

/**
 * @swagger
 * /accounts/login:
 *   post:
 *     tags: [Account]
 *     description: Log in to an account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       401:
 *         description: Invalid username or password
 */
route.post('/login', accountController.login);


/**
 * @swagger
 * /accounts/update/{id}:
 *   put:
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Account ID
 *     description: Update account information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isOnline:
 *                 type: boolean
 *               lastOnline:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Account updated
 *       404:
 *         description: Account not found
 */
route.put('/update/:acc_id', verifyToken, accountController.update);

/**
 * @swagger
 * /accounts/delete-by-id/{acc_id}:
 *   delete:
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: acc_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Account ID to delete
 *     description: Delete an account by ID
 *     responses:
 *       200:
 *         description: Account successfully deleted
 *       404:
 *         description: Account not found
 */
route.delete('/delete-by-id/:acc_id', verifyToken, accountController.deletById);



// external
route.get('/get-statistical', verifyToken, accountController.getStatisticalAccount);
route.get('/get-online', verifyToken, accountController.getAccountOnline);


module.exports = route;
