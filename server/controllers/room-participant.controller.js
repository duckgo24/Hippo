const db = require('../models');



class RoomParticipant 
{
    async addUserToRoom(req, res, next) {
        try {
            const { user, room_id } = req.body;

        
            const checkUserExist = await db.RoomParticipant.findOne({
                where: {
                    user_id: user?.acc_id,
                    room_id,
                },
            });

    
            if (checkUserExist) {
                return res.status(400).json({
                    success: false,
                    message: 'User already exists in this room',
                });
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
            const { user, room_id } = req.body;

            const room_participant = db.RoomParticipant.destroy({
                where: {
                    user_id: user?.acc_id,
                    room_id,
                },
            });

            if (room_participant) {
                return res.status(200).json(user);
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new RoomParticipant();