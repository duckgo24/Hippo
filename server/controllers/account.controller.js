
const { Op } = require('sequelize');
const db = require('../models/index');
const jwtService = require('../services/jwt.service');
const sendmailService = require('../services/sendmail.service');

class AccountController {
    async getSuggestAccounts(req, res, next) {
        try {
            const accounts = await db.Account.findAll({
                attributes: { exclude: ['password'] }
            });
            let start = Math.floor(Math.random() * 8);
            let end = start + 15;

            if (end > accounts.length) {
                end = accounts.length;
            }


            const responAccount = accounts.slice(start, end);
            return res.json(responAccount);
        } catch (error) {
            next(error);
        }
    }


    async searchAccount(req, res, next) {
        try {
            const { q } = req.query;

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
            return res.status(501).json( error.message );
        }
    }




    async register(req, res, next) {
        const formData = req.body;

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

                const account = await db.Account.create(formData);
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
                    username,
                    password
                }
            });

            if (!account) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            if (account) {
                const { password, ...others } = account.dataValues;
                const access_token = jwtService.sign({ id: account.id, nickname: account.nickname, role: account.role }, '1h');
                const refesh_token = jwtService.sign({ id: account.id, nickname: account.nickname, role: account.role }, '365d');

                res.cookie('refresh_token', refesh_token, {
                    expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 14),
                    path: '/'
                });
                res.cookie('access_token', access_token, {
                    expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 10),
                    path: '/',
                });

                return res.status(200).json({ ...others });
            }
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
            const account = await db.Account.update({
                ...req.body
            }, {
                where: {
                    id: req.params.id
                }
            });

            if (account[0] === 1) {
                return res.status(200).json(account);
            } else {
                return res.status(404).json({ error: 'Account not found' });
            }


        } catch (error) {
            return res.status(501).json({ error: 'Error' });
        }
    }



}


module.exports = new AccountController();