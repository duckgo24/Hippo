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
    nickname:DataTypes.STRING,
    avatar: DataTypes.STRING,
    status: DataTypes.STRING,
    num_posts: DataTypes.INTEGER,
    num_followers: DataTypes.INTEGER,
    num_following: DataTypes.INTEGER,
    bio: DataTypes.STRING,
    list_friend: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};