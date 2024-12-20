const { where, Op } = require('sequelize');
const db = require('../models');
const uuid = require('uuid');

class RoomController {
    async getAllRooms(req, res, next) {
        try {
            const { acc_id } = req.params;

            const chatrooms = await db.Room.findAll({
                attributes: ['room_id', 'priority'],
                where: {
                    owner_id: null,
                },
                include: [
                    {
                        model: db.RoomParticipant,
                        as: 'room_participants',
                        where: {
                            user_id: acc_id,
                        },
                    },
                ],
            });

            const getUsersInRoom = async (room_id) => {
                const room = await db.RoomParticipant.findAll({
                    where: {
                        room_id,
                    },
                    include: {
                        model: db.Account,
                        as: 'room_participant',
                        attributes: ['acc_id', 'full_name', 'avatar', 'tick', 'nickname', 'isOnline', 'lastOnline'],
                    },
                });
                return room;
            };

            const getLastMessageInRoom = async (room_id) => {
                const message = await db.Message.findOne({
                    where: {
                        room_id,
                    },
                    order: [['createdAt', 'DESC']],
                });
                return message;
            };

            const resRoom = await Promise.all(
                chatrooms.map(async (room) => {
                    const _participants = await getUsersInRoom(room.room_id);
                    const lastMessage = await getLastMessageInRoom(room.room_id);
                    const sender = _participants.find((user) => user.dataValues.user_id == acc_id);
                    const receiver = _participants.find((user) => user.dataValues.user_id != acc_id);
                    return {
                        room_id: room.room_id,
                        priority: room.priority,

                        participants: {
                            sender: {
                                ...sender.dataValues.room_participant.dataValues,
                                is_receive_message: sender.is_receive_message,
                            },
                            receiver: {
                                ...receiver.dataValues.room_participant.dataValues,
                                is_receive_message: receiver.is_receive_message,
                            },
                        },
                        lastMessage,
                    };
                }),
            );

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
                            room_id,
                        },
                    },
                    {
                        model: db.Message,
                        as: 'room_messages',
                        where: {
                            room_id,
                        },
                    },
                ],
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async createRoom(req, res, next) {
        try {
            const { acc_id, friend_id } = req.body;
            const room = await db.Room.create({
                room_id: uuid.v4(),
                priority: 0,
            });

            if (room) {
                const room_participant_1 = await db.RoomParticipant.create({
                    room_id: room?.room_id,
                    user_id: acc_id,
                    is_receive_message: true,
                    is_exited: false,
                });
                const room_participant_2 = await db.RoomParticipant.create({
                    room_id: room?.room_id,
                    user_id: friend_id,
                    is_receive_message: true,
                    is_exited: false,
                });
                return res.status(201).json(room);
            }
        } catch (error) {
            return res.json({ error: error.message });
        }
    }

    async getRoomsGroup(req, res, next) {
        try {
            const { acc_id } = req.params;

            const chatrooms = await db.Room.findAll({
                where: {
                    owner_id: {
                        [Op.not]: null,
                    },
                },
                include: {
                    model: db.RoomParticipant,
                    as: "room_participants",
                    where: {
                        user_id: acc_id
                    }
                }
            });

            const getUsersInRoom = async (room_id) => {
                const room = await db.RoomParticipant.findAll({
                    where: {
                        room_id,
                    },
                    include: {
                        model: db.Account,
                        as: 'room_participant',
                        attributes: ['acc_id', 'full_name', 'avatar', 'tick', 'nickname', 'isOnline', 'lastOnline'],
                    },
                });
                return room;
            };

            const getLastMessageInRoom = async (room_id) => {
                const message = await db.Message.findOne({
                    where: {
                        room_id,
                    },
                    order: [['createdAt', 'DESC']],
                });
                return message;
            };

            const resRoom = await Promise.all(
                chatrooms.map(async (room) => {
                    const participants = await getUsersInRoom(room.room_id);
                    const lastMessage = await getLastMessageInRoom(room.room_id);
                    return {
                        ...room.dataValues,
                        participants: (participants || []).map((user) => ({
                            ...user.dataValues.room_participant.dataValues,
                            is_receive_message: user.is_receive_message,
                            is_exited: user.is_exited,
                            day_exited: user.day_exited,
                        })),
                        lastMessage,
                    };
                }),
            );

            return res.status(200).json(resRoom);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async createRoomGroup(req, res, next) {
        try {
            const { users, owner_id, name } = req.body;

            const room = await db.Room.create({
                room_id: uuid.v4(),
                name,
                owner_id,
                priority: 0,
            });

            if (room) {
                const room_participants = await Promise.all(
                    users.map(async (user) => {
                        return await db.RoomParticipant.create({
                            room_id: room?.room_id,
                            user_id: user?.acc_id,
                            is_receive_message: true,
                            is_exited: false,
                        });
                    }),
                );

                return res.status(200).json(room);
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async addUserToRoom(req, res, next) {
        try {
            const { user, room_id } = req.body;

            const checkUserExist = await db.RoomParticipant.findOne({
                where: {
                    user_id: user?.acc_id,
                    room_id,
                },
            });

            console.log(checkUserExist);
            

            if (!checkUserExist?.dataValues.is_exited) {
                return res.status(400).json({
                    success: false,
                    message: 'User already exists in this room',
                });
            }

            if (checkUserExist && checkUserExist.dataValues.is_exited) {
                const participantUpdate = db.RoomParticipant.update(
                    {
                        is_exited: false,
                        day_exited: null,
                    },
                    {
                        where: {
                            user_id: user?.acc_id,
                            room_id,
                        },
                    },
                );
                if (participantUpdate) {
                    return res.status(200).json({
                        user_id: user?.acc_id,
                        is_exited: false,
                        is_receive_message: true,
                    });
                }
            }

            const room_participant = await db.RoomParticipant.create({
                room_id,
                user_id: user?.acc_id,
                is_receive_message: true,
                is_exited: false,
            });

            if (room_participant) {
                return res.status(200).json(room_participant);
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }

    deleteUserToRoom(req, res, next) {
        try {
            const { user_id, room_id } = req.body;
            const room_participant = db.RoomParticipant.update(
                {
                    is_exited: true,
                    is_receive_message: false,
                    day_exited: Date.now(),
                },
                {
                    where: {
                        user_id,
                        room_id,
                    },
                },
            );

            if (room_participant) {
                return res.status(200).json({
                    user_id,
                    is_exited: true,
                    is_receive_message: false,
                });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getRoomGroupOwner(req, res, next) {
        try {
            const { acc_id } = req.params;

            const rooms = await db.Room.findAll({
                where: {
                    owner_id: acc_id,
                },
            });

            if (room) {
                return res.status(200).json(rooms);
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
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
                                [Op.substring]: q,
                            },
                        },
                    },
                ],
            });

            if (room) {
                return res.status(200).json(room);
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new RoomController();
