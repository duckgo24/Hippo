'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Notify extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Notify.belongsTo(models.Account, {
                foreignKey: 'sender_id',
                as: 'notify_sender_account',
            });
            Notify.belongsTo(models.Account, {
                foreignKey: 'receiver_id',
                as: 'notify_receiver_account',
            });
        }
    }
    Notify.init({
        notify_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        type: DataTypes.STRING,
        isRead: DataTypes.BOOLEAN,
        link: DataTypes.STRING,
        sender_id: DataTypes.STRING,
        receiver_id: DataTypes.STRING,
    }, {
        sequelize,
        tableName: 'notify',
        modelName: 'Notify',
    });
    return Notify;
};