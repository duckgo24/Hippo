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
            Room.hasMany(models.MessageGroup, {
                foreignKey: 'room_id',
                as: 'messages_group',
            });
        }
    }

    Room.init(
        {
            room_id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            priority: {
                type: DataTypes.INTEGER,
            },
            owner_id: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            tableName: 'rooms',
            modelName: 'Room',
        },
    );

    return Room;
};
