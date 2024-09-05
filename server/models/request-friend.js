'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RequestFriend extends Model {
        static associate(models) {
            RequestFriend.belongsTo(models.Account, {
                foreignKey: 'sender_id',
                as: 'request_friend_sender',
            });
            RequestFriend.belongsTo(models.Account, {
                foreignKey: 'receiver_id',
                as: 'request_friend_receiver',
            });
        }
    }

    RequestFriend.init({
        sender_id: DataTypes.INTEGER,
        receiver_id: DataTypes.INTEGER,
        status: DataTypes.INTEGER,
    }, {
        sequelize,
        tableName: 'request_friends',
        modelName: 'RequestFriend',
    });
    
    return RequestFriend;
};
