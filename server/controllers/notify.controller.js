
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
                        attributes: ['acc_id', 'full_name', 'nickname', 'avatar', 'tick']
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
            const notify = await db.Notify.create({
                ...req.body,
                notify_id: uuid.v4(),
            });

            if (notify) {
                const res_notify = await db.Notify.findOne({
                    where: {
                        notify_id: notify.notify_id
                    },
                });
                return res.status(201).json(res_notify);
            }
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
    async delNotifyByMultiData(req, res, next) {
        const { sender_id, receiver_id, title, content } = req.body;
        try {
            const findNotify = await db.Notify.findOne({
                where: {
                    sender_id,
                    receiver_id,
                    title,
                    content
                },
            })

            if (!findNotify) {
                return res.status(404).json({
                    success: false,
                    message: 'Notify not found'
                });
            }

            await db.Notify.destroy({
                where: {
                    sender_id,
                    receiver_id,
                    title,
                    content
                }
            });

            return res.status(200).json({
                notify_id: findNotify.dataValues.notify_id
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        };
    }
}

module.exports = new NotifyController();