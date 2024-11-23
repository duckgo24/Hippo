
const { Op } = require('sequelize');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const db = require('../models/index');
const jwtService = require('../services/jwt.service');
const sendmailService = require('../services/sendmail.service');

class AccountController {
    async getSuggestAccounts(req, res, next) {
        try {
            const accounts = await db.Account.findAll({
                attributes: { exclude: ['password'] },
                where: {
                    id: {
                        [Op.not]: "system",
                    }
                }
            });
            // let start = Math.floor(Math.random() * 8);
            // let end = start + 15;

            // if (end > accounts.length) {
            //     end = accounts.length;
            // }


            // const responAccount = accounts.slice(start, end);
            // return res.json(responAccount);
            return res.json(accounts);
        } catch (error) {
            next(error);
        }
    }


    async searchAccount(req, res, next) {
        try {
            const { q } = req.query;
            if (!q || !q.trim()) {
                return res.status(400).json({ error: 'Search query is required' });
            }


            const resultAccounts = await db.Account.findAll({
                where: {
                    nickname: {
                        [Op.substring]: q,
                    },
                },
            });

            if (resultAccounts.count === 0) {
                return res.status(404).json({ error: 'Account not found' });
            }
            return res.status(200).json(resultAccounts);

        } catch (error) {
            return res.status(501).json(error.message);
        }
    }




    async register(req, res, next) {
        const formData = req.body;
        const { password } = formData;

        const hashPassword = await bcrypt.hash(password, 10);
        formData.password = hashPassword;

        try {
            if (formData) {

                const checkExitAccount = await db.Account.findOne({
                    where: {
                        username: formData.username
                    }
                });

                if (checkExitAccount) {
                    return res.status(409).json({ error: 'Username is already taken' });
                }

                const account = await db.Account.create({
                    ...formData,
                    id: uuid.v4(),
                });
                return res.status(201).json(account);
            }
        } catch (error) {
            return res.status(501).json({ error });
        }
    };

    async login(req, res, next) {
        try {

            const { username, password } = req.body;

            const account = await db.Account.findOne({
                where: {
                    username
                }
            });

            const isMatchPassword = await bcrypt.compare(password, account.password);

            if (!isMatchPassword) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            if (!account) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }


            const { _password, ...others } = account.dataValues;
            const access_token = jwtService.sign({ id: account.id }, '1h');
            const refresh_token = jwtService.sign({ id: account.id }, '365d');

            res.cookie('refresh_token', refresh_token, {
                expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 14),
                path: '/'
            });
            res.cookie('access_token', access_token, {
                expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 10),
                path: '/',
            });

            return res.status(200).json({ ...others });

        }
        catch (error) {
            return res.status(501).json({ error });
        }
    };

    async forgetPassword(req, res, next) {
        const { username } = req.body;
        try {
            const account = await db.Account.findOne({
                where: {
                    username
                }
            });

            if (!account) {
                res.status(404).json({ error });
            }

            if (account) {
                const newPassword = Math.floor(Math.random() * 10000000);
                await db.Account.update({
                    password: newPassword
                }, {
                    where: {
                        username
                    }
                });

                const emailContent = `
                    <div style="font-family: Arial, sans-serif; padding: 20px;">
                        <h2 style="color: #333;">Password Reset Request</h2>
                        <p>Hello <strong>${username}</strong>,</p>
                        <p>Your password has been reset successfully. Here is your new password:</p>
                        <div style="margin: 20px 0; padding: 10px; background-color: #f0f0f0; border: 1px solid #ccc; text-align: center;">
                            <strong style="font-size: 18px;">${newPassword}</strong>
                        </div>
                        <p>Please use this new password to log in to your account. We recommend that you change your password immediately after logging in.</p>
                        <p>Thank you,</p>
                        <p>The Support Team</p>
                    </div>
                `;

                sendmailService(username, 'Your New Password :' + newPassword,);
                return res.status(200).json({ message: 'Password sent to your email' });
            }
        } catch (error) {
            return res.status(501).json({ error });
        }
    }



    async update(req, res, next) {
        try {
            const checkAccount = await db.Account.findOne({
                where: {
                    id: req.params.id
                }
            });

            if (!checkAccount) {
                return res.status(404).json({ error: 'Account not found' });
            }

            if (checkAccount) {
                const account = await db.Account.update({
                    ...req.body
                }, {
                    where: {
                        id: req.params.id
                    }
                });

                if (account[0] === 1) {
                    return res.status(200).json({
                        ...checkAccount.dataValues,
                        isOnline: req.body.isOnline,
                        lastOnline: req.body.lastOnline
                    });
                } else {
                    return res.status(404).json({ error: 'Account not found' });
                }
            }





        } catch (error) {
            return res.status(501).json({ error: error.message });
        }
    }



}


module.exports = new AccountController();