const db = require('../models/index');

class ChatController {
    async getAllChats(req, res, next) {
        
    }
    async createChat(req, res, next) {
        try {
            const { content, sender_id, receiver_id } = req.body;
            const chat = await db.Chat.create({
                content,
                sender_id,
                receiver_id
            });

            if(chat) {
                const resChat = db.Chat.findOne({
                    where: {
                        chat_id: chat.chat_id
                    },
                    include: [
                        {
                            model: db.Account,
                            as: 'sender',
                            attributes: ['id', 'avatar', 'tick']
                        },
                        {
                            model: db.Account,
                            as: 'receiver',
                            attributes: ['id', 'avatar', 'tick']
                        }
                    ]
                });
                return res.status(201).json(resChat);
            }

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    deleteChat(req, res, next) {
        try {
            const {chat_id, sender_id} = req.body;
            const chat = db.Chat.findOne({
                where: {
                    chat_id,
                    sender_id
                }
            });

            if(chat) {
               db.Chat.destroy({
                    where: {
                        chat_id
                    }
                });
                return res.status(200).json({ chat_id});
            }
            
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ChatController();