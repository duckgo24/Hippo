const db = require('../models/index');
class RoomMessageController {

    async getAllMessages(req, res, next) {
        try {
            const { room_id } = req.query;
            const resMessages = await db.Room.findAll({
                attributes: ['room_id', 'priority'],
                include: [
                    {
                        model: db.RoomMessage,
                        as: 'room_messages',
                        attributes: ['content', 'image', 'video', 'seen', 'createdAt'],
                        where: {
                            room_id
                        },

                        include: [
                            {
                                model: db.Account,
                                as: 'message_sender',
                                attributes: ['id', 'avatar', 'tick']
                            },
                            {
                                model: db.Account,
                                as: 'message_receiver',
                                attributes: ['id', 'avatar', 'tick']
                            }
                        ]
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
            const message = await db.RoomMessage.create({
                ...req.body,
                sender_id
            });

            if (message) {
                const resMessage = db.RoomMessage.findOne({
                    where: {
                        id: message.id
                    },
                    include: [
                        {
                            model: db.Account,
                            as: 'message_sender',
                            attributes: ['id', 'avatar', 'tick']
                        },
                        {
                            model: db.Account,
                            as: 'message_receiver',
                            attributes: ['id', 'avatar', 'tick']
                        }
                    ]
                });
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

module.exports = new RoomMessageController();