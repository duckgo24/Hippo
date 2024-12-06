const db = require('../models');
const roomController = require('./room.controller');

class FriendController {
    async getFriends(req, res) {
        try {
            const { acc_id, limit } = req.query;
            
            const friends = await db.Friend.findAll({
                where: {
                    acc_id
                },
                include: [
                    {
                        model: db.Account,
                        as: 'friend',
                        attributes: ['acc_id', 'nickname', 'full_name', 'avatar', 'tick'],
                    },
                ],
                limit: parseInt(limit) || 10,
                order: [['createdAt', 'DESC']]
            });
            return res.status(200).json(friends);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
 
    

    async addFriend(req, res) {
        try {
            const { acc_id, friend_id,status } = req.body;
            const checkFriend = await db.Friend.findOne({
                where: {
                    acc_id,
                    friend_id
                }
            });

            if (checkFriend) {
                return res.status(400).json({ error: 'Friend already exists' });
            } else {
                const friend_a = await db.Friend.create({ acc_id, friend_id, status });
                const friend_b = await db.Friend.create({ acc_id: friend_id, friend_id: acc_id, status });

                const res_friend = await db.Friend.findOne({
                    where: {
                        acc_id: friend_a?.acc_id,
                        friend_id: friend_a?.friend_id
                    },
                    include: [
                        {
                            model: db.Account,
                            as: 'friend',
                            attributes: ['acc_id', 'nickname', 'full_name', 'avatar', 'tick'],
                            where: {
                                acc_id: friend_a?.friend_id
                            }
                        }
                    ]
                });

                return res.status(201).json(res_friend);
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async checkFriend(req, res) {
        try {
            const { acc_id, friend_id } = req.query;
            const friend = await db.Friend.findOne({
                where: {
                    acc_id,
                    friend_id
                }
            });
            return res.status(200).json(friend);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async findFriend(req, res) {
        try {
            const { acc_id, friend_id } = req.params;
            const friends = await db.Friend.findAll({
                where: {
                    acc_id,
                    friend_id
                }
            });
            return res.status(200).json(friends);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async deleteFriend(req, res) {
        try {
            const { acc_id, friend_id } = req.query;
            const friend = await db.Friend.destroy({
                where: {
                    acc_id,
                    friend_id
                }
            });
            if(friend === 1) {
                await db.Friend.destroy({
                    where: {
                        acc_id: friend_id,
                        friend_id: acc_id
                    }
                })
                return res.status(200).json({
                    acc_id,
                    friend_id
                });
            } else {
                return res.status(401).json({
                    message: "Not friend"
                })
            }

            

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async updateStatusFriend(req, res) {
        try {
            const { acc_id, friend_id, status } = req.body;
            const checkFriend = await db.Friend.FindOne({
                where: {
                    acc_id,
                    friend_id
                }
            });

            if (checkFriend) {
                const updateFriend = await db.Friend.update({
                    status
                }, {
                    where: {
                        acc_id,
                        friend_id
                    }
                });
                return res.status(200).json(updateFriend);
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}


module.exports = new FriendController();
