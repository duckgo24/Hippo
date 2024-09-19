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
                foreignKey: 'acc_id',
                as: 'notify_account',
            });
        }
    }
    Notify.init({
        title: DataTypes.STRING,
        context: DataTypes.STRING,
        type: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
        acc_id: DataTypes.INTEGER,
    }, {
        sequelize,
        tableName: 'notifies',
        modelName: 'Notify',
    });
    return Notify;
};