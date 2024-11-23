const { UUIDV4 } = require('sequelize');
const db = require('../models/index');
const jwtService = require('../services/jwt.service');


class AuthController {
    async me(req, res, next) {
        try {
            const token = req.headers?.authorization?.split(' ')[1];
            if (token) {
                jwtService.verify(token, async (err, user) => {
                    if (err) {
                        return res.status(401).json({ error: 'Token is not valid' });
                    }
                    if (user) {
                        const account = await db.Account.findOne({
                            where: {
                                id: user?.id,
                            }
                        });

                        if (account) {
                            const { password, ...orthers } = account.dataValues;
                            return res.status(201).json({
                                ...orthers
                            });
                        } else {
                            return res.status(404).json({ error: 'Account not found' });
                        }
                    }
                });

            }
        } catch (error) {
            return res.status(501).json({ error: error.message });
        }
    };




    async refreshToken(req, res, next) {
        try {
            const refresh_token = req.headers.refresh_cookie;
            if (!refresh_token) {
                return res.status(401).json({ error: 'No refresh token provided' });
            }
            jwtService.verify(refresh_token, async (err, user) => {
                if (err) {
                    return res.status(401).json({ error: 'Invalid refresh token' });
                }

                if (user) {
                    const new_access_token = jwtService.sign({ id: user.id, nickname: user.nickname, role: user.role }, '1d');
                    const new_refresh_token = jwtService.sign({ id: user.id, nickname: user.nickname, role: user.role }, '365d');

                    res.cookie('refresh_token', new_refresh_token, {
                        expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 14),
                        path: '/'
                    });
                    res.cookie('access_token', new_access_token, {
                        expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 14),
                        path: '/',
                    });

                    return res.status(200).json({ access_token: new_access_token });
                }
            });
        } catch (error) {
            return res.status(501).json({ error });
        }
    };
}

module.exports = new AuthController();