
const db = require('../models/')


class RequestFriendController {
    async getAllRequest(req, res) {
        try {
            const { acc_id } = req.query;
            const requests = await db.RequestFriend.findAll({
                where: {
                    sender_id: acc_id,
                }
            });
            return res.status(200).json(requests);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }


    async createRequest(req, res) {
        try {
            const { sender_id, receiver_id } = req.body;

            const checkRequest = await db.RequestFriend.findOne({
                where: {
                    sender_id,
                    receiver_id,
                },
            });


            if (checkRequest) {
                return res.status(400).json({ message: 'Request already exists' });
            }

            const request = await db.RequestFriend.create({
                sender_id,
                receiver_id,
                status: 'pending',
            });
            return res.status(201).json({
                success: true,
                ...request.dataValues
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async findRequestWithRoleSender(req, res) {
        try {
            const { sender_id, receiver_id } = req.query;
            const request = await db.RequestFriend.findOne({
                where: {
                    sender_id,
                    receiver_id
                },
            });

            if (!request) {
                return res.status(404).json({
                    success: false,
                    message: 'Request not found'
                });
            }
            return res.status(200).json({
                success: true,
                ...request.dataValues
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async findRequestWithRoleReceiver(req, res) {
        try {
            const { sender_id, receiver_id } = req.query;
            const request = await db.RequestFriend.findOne({
                where: {
                    sender_id,
                    receiver_id
                },
            });

            if (!request) {
                return res.status(404).json({
                    success: false,
                    message: 'Request not found'
                });
            }
            return res.status(200).json({
                success: true,
                ...request.dataValues
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async deleteRequest(req, res) {
        try {
            const { sender_id, receiver_id } = req.query;
            const request = await db.RequestFriend.destroy({
                where: {
                    sender_id,
                    receiver_id
                },
            });

            if (request === 1) {
                await db.RequestFriend.destroy({
                    where: {
                        sender_id: receiver_id,
                        receiver_id: sender_id
                    },
                })
                return res.status(200).json({
                    sender_id,
                    receiver_id
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'Request not found'
                });
            }

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new RequestFriendController();