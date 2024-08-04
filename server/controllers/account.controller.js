
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
            if(token) {
                jwtService.verify(token, (err, user) => {
                    if(err) {
                        return res.status(401).json({ error: 'Token is not valid' });
                    }
                    
                    return res.status(200).json(user);
                    
                });
    
            }
        } catch (error) {
            console.log(error);
        }
    };

    async register(req, res, next) {
        try {
            const { username, password, role } = req.body;
            const account = await db.Account.create({
                username,
                password,
                role
            })
            return res.status(201).json(account);
        } catch (error) {
            return res.status(501).json({ error: 'Error' });
        }
    };

    async login(req, res, next) {
        try {
            const { username, password} = req.body;

            const account = await db.Account.findOne({
                where: {
                    username,
                    password,
                }
            });

            if (account) {
                const { password, ...others } = account.dataValues;
                const access_token = jwtService.sign({  id: account.id , username, role: account.role});
                return res.status(200).json({ access_token, account: others });
            }
        }
        catch (error) {
            return res.status(501).json({ error: 'Error' });
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