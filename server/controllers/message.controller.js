const db = require('../models/index');
const uuid = require('uuid');

class messageController {

    async getAllMessages(req, res, next) {
        try {
            const { room_id } = req.params;
            const resMessages = await db.Message.findAll({
                attributes: ['content', 'image', 'video', 'seen', 'createdAt'],
                where: {
                    room_id
                },
                include: [
                    {
                        model: db.Account,
                        as: 'message_sender',
                        attributes: ['acc_id', 'full_name', 'nickname', 'avatar', 'tick']
                    },
                    {
                        model: db.Account,
                        as: 'message_receiver',
                        attributes: ['acc_id', 'full_name', 'nickname', 'avatar', 'tick']
                    }
                ],
                order: [['createdAt', 'ASC']]
            })
            if (resMessages) {
                return res.status(200).json(resMessages);
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async createMessage(req, res, next) {
        const { acc_id: sender_id } = req.body;
        try {
            const message = await db.Message.create({
                ...req.body,
                is_deleted: false,
                message_id: uuid.v4(),
                sender_id
            });

            if (message) {
                const resMessage = await db.Message.findOne({
                    attributes: ['content', 'image', 'video', 'seen', 'createdAt'],
                    where: {
                        message_id: message.message_id
                    },
                    include: [
                        {
                            model: db.Account,
                            as: 'message_sender',
                            attributes: ['acc_id', 'full_name', 'nickname', 'avatar', 'tick']
                        },
                        {
                            model: db.Account,
                            as: 'message_receiver',
                            attributes: ['acc_id', 'full_name', 'nickname', 'avatar', 'tick']
                        }
                    ],
                    order: [['createdAt', 'ASC']]
                })
                return res.status(201).json(resMessage);
            }

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    deleteMessage(req, res, next) {
        try {
            const { chat_id, sender_id } = req.body;
            const chat = db.Chat.findOne({
                where: {
                    chat_id,
                    sender_id
                }
            });

            if (chat) {
                db.Chat.destroy({
                    where: {
                        chat_id
                    }
                });
                return res.status(200).json({ chat_id });
            }

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new messageController();