'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.hasMany(models.Room, {
        foreignKey: 'acc_id',
        as:'rooms',
      });
    }
  }
  Account.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    listFriend: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};