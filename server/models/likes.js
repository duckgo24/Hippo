'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Like extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Like.belongsTo(models.Post, {
                foreignKey: 'post_id',
                as: 'posts',
            })
            Like.belongsTo(models.Video, {
                foreignKey: 'video_id',
                as: 'videos',
            })
            Like.belongsTo(models.Account, {
                foreignKey: 'acc_id',
                as: 'accounts',
            })
        }
    }
    Like.init({
        acc_id: DataTypes.INTEGER,
        post_id: DataTypes.INTEGER,
        video_id: DataTypes.INTEGER,
    }, {
        sequelize,
        tableName: 'likes',
        modelName: 'Like',
    });
    return Like;
};