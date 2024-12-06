'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Room extends Model {
        static associate(models) {
            Room.hasMany(models.RoomParticipant, {
                foreignKey: 'room_id',
                as: 'room_participants',
            });
            Room.hasMany(models.Message, {
                foreignKey: 'room_id',
                as: 'messages',
            });
        }
    }

   Room.init({
        room_id: { 
            type: DataTypes.STRING,
            primaryKey: true
        },
        priority: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'rooms',
        modelName: 'Room',
    });
    
    return Room;
};
