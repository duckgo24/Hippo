
const { Op } = require('sequelize');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const db = require('../models/index');
const jwtService = require('../services/jwt.service');
const sendmailService = require('../services/sendmail.service');

class AccountController {

    async getAccountWithPagination(req, res, next) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const parsedPage = Math.max(1, parseInt(page, 10));
            const parsedLimit = Math.max(1, parseInt(limit, 10));
            const offset = (parsedPage - 1) * parsedLimit;

            const { count: total_record, rows: data } = await db.Account.findAndCountAll({
                where: {
                    acc_id: {
                        [Op.not]: "system"
                    }
                },
                offset,
                limit: parsedLimit,
                order: [['createdAt', 'DESC']]
            });

            return res.json({
                data,
                total_record,
                page: parsedPage,
                limit: parsedLimit,
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }



    async getSuggestAccounts(req, res, next) {
        try {
            const accounts = await db.Account.findAll({
                attributes: { exclude: ['password'] },
                where: {
                    acc_id: {
                        [Op.not]: "system",
                    }
                }
            });
            return res.json(accounts);
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }

    async getAccountOnline(req, res, next) {
        try {
            const accounts = await db.Account.findAll({
                where: {
                    isOnline: true
                }
            });
            return res.json({
                total: accounts.length,
                accounts
            });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }


    async searchAccount(req, res, next) {
        try {
            const { q } = req.params;
            if (!q || !q.trim()) {
                return res.status(400).json({ success: false, error: 'Search query is required' });
            }
            const resultAccounts = await db.Account.findAll({
                where: {
                    nickname: {
                        [Op.substring]: q,
                    },
                },
            });

            if (resultAccounts.length === 0) {
                return res.status(404).json({ success: false, error: 'Account not found' });
            }
            return res.status(200).json(resultAccounts);

        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }

    async getAccountByNickname(req, res, next) {
        try {
            const { nickname } = req.params;

            const account = await db.Account.findOne({
                where: {
                    nickname
                }
            });
            if (!account) {
                return res.status(404).json({ success: false, error: 'Account not found' });
            }

            return res.status(200).json(account);
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }

    async getAccountById(req, res, next) {
        try {
            const { id } = req.params;

            const account = await db.Account.findOne({
                where: {
                    acc_id: id
                }
            });
            if (!account) {
                return res.status(404).json({ success: false, error: 'Account not found' });
            }

            return res.status(200).json(account);
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
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
                    return res.status(409).json({ success: false, error: 'Username is already exist' });
                }
                let rd = Math.floor(Math.random() * 1000000);

                const account = await db.Account.create({
                    ...formData,
                    role: 'user',
                    nickname: `user_${rd}`,
                    full_name: `Người dùng ${rd}`,
                    bio: "",
                    tick: false,
                    isBan: false,
                    isOnline: false,
                    lastOnline: Date.now(),
                    acc_id: uuid.v4(),
                });
                return res.status(201).json(account);
            }
        } catch (error) {
            return res.status(500).json({ error });
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

            if (!account) {
                return res.status(400).json({ success: false, error: 'Invalid username or password' });
            }

            const isMatchPassword = await bcrypt.compare(password, account.password);

            if (!isMatchPassword) {
                return res.status(400).json({ success: false, error: 'Invalid username or password' });
            }

            const { password: _pass_word, username: _username, ...others } = account.dataValues;
            const access_token = jwtService.sign({ acc_id: account.acc_id }, '1h');
            const refresh_token = jwtService.sign({ acc_id: account.acc_id }, '365d');

            return res.status(200).json({ account: others, access_token, refresh_token });

        }
        catch (error) {
            return res.status(500).json({ success: false, error: error.message });
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
            return res.status(500).json({ error });
        }
    }



    async update(req, res, next) {

        try {
            const checkAccount = await db.Account.findOne({
                where: {
                    acc_id: req.params.acc_id
                }
            });

            if (!checkAccount) {
                return res.status(404).json({ success: false, error: 'Account not found' });
            }

            if (checkAccount) {
                const account = await db.Account.update({
                    ...req.body
                }, {
                    where: {
                        acc_id: req.params.acc_id
                    }
                });


                if (account[0] === 1) {
                    return res.status(200).json({
                        account: {
                            ...checkAccount.dataValues,
                            ...req.body
                        }
                    });
                } else {
                    return res.status(404).json({ success: false, error: 'Account not found' });
                }
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }


    async deletById(req, res, next) {
        try {
            const checkAccount = await db.Account.findOne({
                where: {
                    acc_id: req.params.acc_id
                }
            });

            if (!checkAccount) {
                return res.status(404).json({ success: false, error: 'Account not found' });
            }

            if (checkAccount) {
                const account = await db.Account.destroy({
                    where: {
                        acc_id: req.params.acc_id
                    }
                });

                if (account === 1) {
                    return res.status(200).json({ success: true, account: checkAccount });
                } else {
                    return res.status(404).json({ success: false, error: 'Account not found' });
                }
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }


    async getStatisticalAccount(req, res, next) {
        try {
            const { start_day, end_day } = req.query;
    
            const startDate = new Date(start_day + "T00:00:00.000Z");
            const endDate = new Date(end_day + "T23:59:59.999Z");
            const numDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    
            const previousStartDate = new Date(startDate);
            previousStartDate.setDate(previousStartDate.getDate() - numDays);
    
            const previousEndDate = new Date(startDate);
            previousEndDate.setDate(previousEndDate.getDate() - 1);
    
            const currentCount = await db.Account.count({
                where: {
                    createdAt: {
                        [Op.between]: [startDate, endDate]
                    },
                    acc_id: { [Op.not]: "system" }
                }
            });
    
            const previousCount = await db.Account.count({
                where: {
                    createdAt: {
                        [Op.between]: [previousStartDate, previousEndDate]
                    },
                    acc_id: { [Op.not]: "system" }
                }
            });
    
            const rate = previousCount > 0
                ? ((currentCount - previousCount) / previousCount) * 100
                : currentCount * 100;
    
            return res.json({
                total: currentCount,
                rate: Math.round(rate * 100) / 100,
            });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }
    

}


module.exports = new AccountController();