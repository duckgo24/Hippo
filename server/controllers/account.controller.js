
const db = require('../models/index');
const jwtService = require('../services/jwt.service');

class AccountController {

    async getAllAccounts(req, res, next) {
        try {
            const accounts = await db.Account.findAll();
            res.json(accounts);
        } catch (error) {
            next(error);
        }
    };

    async getMe(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (token) {
                jwtService.verify(token, async (err, user) => {
                    if (err) {
                        return res.status(401).json({ error: 'Token is not valid' });
                    }
                    
                    if(user) {
                        const account = await db.Account.findOne({
                            where: {
                                id: user.id,
                                nickname: user.nickname,
                                role: user.role
                            }
                        });

                        if(account) {
                            res.status(200).json({
                                account, access_token: token
                            });
                        } else {
                            return res.status(404).json({ error: 'Account not found' });
                        }
                    }
                });

            }
        } catch (error) {
            console.log(error);
        }
    };

    async refreshToken(req, res, next) {
        try {
            const refresh_token = req.cookies.refresh_token;
            if (!refresh_token) {
                return res.status(401).json({ error: 'No refresh token provided' });
            }
            
            console.log(refresh_token);
            
        } catch (error) {
            return res.status(501).json({ error });
        }
    };
    

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
                const access_token = jwtService.sign({ id: account.id, nickname: account.nickname, role: account.role }, '10s');
                const refesh_token = jwtService.sign({ id: account.id, nickname: account.nickname, role: account.role }, '365d');

                res.cookie('refesh_token', refesh_token, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 14),
                    path: '/'
                });

                return res.status(200).json({ access_token, account: others });
            }
        }
        catch (error) {
            return res.status(501).json({ error });
        }
    };

    async update(req, res, next) {
        try {
            const { username, password, role } = req.body;

            const account = await db.Account.update({
                username,
                password,
                role
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