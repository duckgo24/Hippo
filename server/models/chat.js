'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Chat extends Model {
        static associate(models) {
            Chat.belongsTo(models.Account, {
                foreignKey: 'sender_id',
                as: 'sender',
            });
            Chat.belongsTo(models.Account, {
                foreignKey: 'receiver_id',
                as: 'receiver',
            });
        }
    }

    Chat.init({
        chat_id: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        sender_id: DataTypes.INTEGER,
        receiver_id: DataTypes.INTEGER,
        content: DataTypes.STRING,
    }, {
        sequelize,
        tableName: 'chats',
        modelName: 'Chat',
    });
    
    return Chat;
};
