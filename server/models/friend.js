'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Friend extends Model {
        static associate(models) {
            Friend.belongsTo(models.Account, {
                foreignKey: 'acc_id',
                as: 'accounts',
            })
            Friend.belongsTo(models.Account, {
                foreignKey: 'friend_id',
                as: 'friend',
            })
        }
    }

    Friend.init({
        acc_id: DataTypes.INTEGER,
        friend_id: DataTypes.INTEGER,
        status: DataTypes.STRING,
    }, {
        sequelize,
        tableName: 'friends',
        modelName: 'Friend',
    });
    
    return Friend;
};
