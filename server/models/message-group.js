'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class MessageGroup extends Model {
        static associate(models) {
            MessageGroup.belongsTo(models.Account, {
                foreignKey: 'sender_id',
                as: 'message_group_sender',
            });
            MessageGroup.belongsTo(models.Room, {
                foreignKey: 'room_id',
                as: 'messages_group',
            });
        }
    }

    MessageGroup.init({
        message_id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        sender_id: DataTypes.STRING,
        content: DataTypes.STRING,
        image: DataTypes.STRING,
        video: DataTypes.STRING,
        seen: DataTypes.BOOLEAN,
        mood: DataTypes.STRING,
        is_deleted: DataTypes.BOOLEAN,
        room_id: DataTypes.STRING,
        
    }, {
        sequelize,
        tableName: 'messages_group',
        modelName: 'MessageGroup',
    });

    return MessageGroup;
};
