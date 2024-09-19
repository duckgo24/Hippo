const { where, Op } = require('sequelize');
const db = require('../models')

class RoomController {
    async getAllRooms(req, res, next) {
        try {
            const { acc_id } = req.query;

            const chatrooms = await db.Room.findAll({
                attributes: ['room_id', 'priority'],
                include: [
                    {
                        model: db.RoomParticipant,
                        as: 'room_participants',
                        where: {
                            user_id: acc_id
                        },
                    },
                ]
            });


            const getUsersInRoom = async (room_id) => {
                const room = await db.RoomParticipant.findAll({
                    where: {
                        room_id,
                    },
                    include: {
                        model: db.Account,
                        as: 'room_participant',
                        attributes: ['id', 'full_name', 'avatar', 'tick','nickname']
                    }
                });
                return room;
            }

            const resRoom = await Promise.all(chatrooms.map(async (room) => {
                const _participants = await getUsersInRoom(room.room_id);
                const sender = _participants.find((user) => (user.dataValues.user_id == acc_id));
                const receiver = _participants.find((user) => (user.dataValues.user_id != acc_id));
                return {
                    room_id: room.room_id,
                    priority: room.priority,
                    participants: {
                        sender: sender.dataValues.room_participant,
                        receiver: receiver.dataValues.room_participant
                    }
                };
            }));

            return res.status(200).json(resRoom);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }



    async getRoom(req, res, next) {
        try {
            const { room_id } = req.query;
            const room = await db.Room.findOne({
                include: [
                    {
                        model: db.RoomParticipant,
                        as: 'room_participants',
                        where: {
                            room_id
                        }
                    },
                    {
                        model: db.RoomMessage,
                        as: 'room_messages',
                        where: {
                            room_id
                        }
                    }
                ]
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async createRoom(req, res, next) {
        try {
            const { room_id, acc_id, friend_id } = req.body;
            const room = await db.Room.create({
                room_id,
                priority: 0
            });

            if (room) {
                const room_participant_1 = await db.RoomParticipant.create({
                    room_id: room?.room_id,
                    user_id: acc_id
                });
                const room_participant_2 = await db.RoomParticipant.create({
                    room_id: room?.room_id,
                    user_id: friend_id
                });
                return res.status(201).json(room);
            }
        } catch (error) {
            return res.json({ error: error.message });
        }
    }


    async FindRoomParticipant(req, res, next) {
        try {
            const { q } = req.params;

            const room = await db.RoomParticipant.findAll({
                include: [
                    {
                        model: db.Account,
                        as: 'room_participant',
                        where: {
                            full_name: {
                                [Op.substring]: q
                            }
                        }
                    }
                ]
            })

            if (room) {
                return res.status(200).json(room);
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });

        }
    }


}

module.exports = new RoomController();