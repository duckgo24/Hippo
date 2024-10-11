'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RoomMessage extends Model {
        static associate(models) {
            RoomMessage.belongsTo(models.Account, {
                foreignKey: 'sender_id',
                as: 'message_sender',
            });
            RoomMessage.belongsTo(models.Account, {
                foreignKey: 'receiver_id',
                as: 'message_receiver',
            });
            RoomMessage.belongsTo(models.Room, {
                foreignKey: 'room_id',
                as: 'room_messages',
            });
        }
    }

    RoomMessage.init({
        sender_id: DataTypes.INTEGER,
        receiver_id: DataTypes.INTEGER,
        content: DataTypes.STRING,
        image: DataTypes.STRING,
        video: DataTypes.STRING,
        seen: DataTypes.BOOLEAN,
        room_id: DataTypes.STRING,
    }, {
        sequelize,
        tableName: 'room-messages',
        modelName: 'RoomMessage',
    });
    
    return RoomMessage;
};
