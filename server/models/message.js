'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Message extends Model {
        static associate(models) {
            Message.belongsTo(models.Account, {
                foreignKey: 'sender_id',
                as: 'message_sender',
            });
            Message.belongsTo(models.Account, {
                foreignKey: 'receiver_id',
                as: 'message_receiver',
            });
            Message.belongsTo(models.Room, {
                foreignKey: 'room_id',
                as: 'messages',
            });
        }
    }

    Message.init({
        message_id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        sender_id: DataTypes.STRING,
        receiver_id: DataTypes.STRING,
        content: DataTypes.STRING,
        image: DataTypes.STRING,
        video: DataTypes.STRING,
        seen: DataTypes.BOOLEAN,
        mood: DataTypes.STRING,
        is_deleted: DataTypes.BOOLEAN,
        room_id: DataTypes.STRING,
        
    }, {
        sequelize,
        tableName: 'messages',
        modelName: 'Message',
    });

    return Message;
};
