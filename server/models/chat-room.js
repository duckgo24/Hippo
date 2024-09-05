'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ChatRoom extends Model {
        static associate(models) {
            ChatRoom.hasMany(models.Chat, {
                foreignKey: 'chatroom_id',
                as: 'chatroom',
            });
        }
    }

    ChatRoom.init({
        chatroom_id: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    }, {
        sequelize,
        tableName: 'chatrooms',
        modelName: 'ChatRoom',
    });
    
    return ChatRoom;
};
