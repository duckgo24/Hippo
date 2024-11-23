
const { Op, where } = require('sequelize');
const db = require('../models/index');
const uuid = require('uuid');

class NotifyController {

    async getAllNotify(req, res, next) {
        try {
            const { acc_id } = req.query;
            const notifies = await db.Notify.findAll({
                where: {
                    receiver_id: acc_id,
                },
                include: [
                    {
                        model: db.Account,
                        as: 'notify_sender_account',
                        attributes: ['id', 'nickname', 'avatar', 'tick']
                    }
                ],
                order: [
                    ['createdAt', 'DESC']
                ]
            });

            if (notifies.length > 0) {
                return res.json(notifies);
            }
            return res.status(404).json([]);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async createNotify(req, res, next) {
        try {
            const notify = db.Notify.create({
                ...req.body,
                notify_id: uuid.v4(),
            });

            return res.status(200).json(notify);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async delNotify(req, res, next) {
        const { notify_id } = req.params;
        
        try {
            const findNotify = db.Notify.findOne({
                where: {
                    notify_id
                },
            })

            if (!findNotify) {
                return res.status(404).json({ error: 'Notify not found' });
            }

            await db.Notify.destroy({
                where: {
                    notify_id
                }
            });
            
            return res.status(200).json({
                notify_id
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });

        }
    }
}

module.exports = new NotifyController();