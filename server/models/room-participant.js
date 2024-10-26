'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RoomParticipant extends Model {
        static associate(models) {
            RoomParticipant.belongsTo(models.Room, {
                foreignKey: 'room_id',
                as: 'room_participants',
            });
            RoomParticipant.belongsTo(models.Account, {
                foreignKey: 'user_id',
                as: 'room_participant', 
            });
        }
    }

    RoomParticipant.init({
        user_id: DataTypes.STRING,
        room_id: DataTypes.STRING,
    }, {
        sequelize,
        tableName: 'room_participants',
        modelName: 'RoomParticipant',
    });
    
    return RoomParticipant;
};
