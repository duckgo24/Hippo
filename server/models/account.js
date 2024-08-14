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
      Account.hasMany(models.Post, {
        foreignKey: 'acc_id',  
        as: 'posts',
      });
      Account.hasMany(models.Video, {
        foreignKey: 'acc_id',  
        as: 'videos',
      });
      Account.hasMany(models.Comment, {
        foreignKey: 'acc_id',  
        as: 'comments',
      });
      Account.hasMany(models.Like, {
        foreignKey: 'acc_id',  
        as: 'likes',
      });
    }

  }
  Account.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    nickname: DataTypes.STRING,
    full_name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    bio: DataTypes.STRING,
    tick: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};