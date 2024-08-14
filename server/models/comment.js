'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Comment.belongsTo(models.Post, {
                foreignKey: 'post_id',
                as: 'posts',
            })
            Comment.belongsTo(models.Video, {
                foreignKey: 'video_id',
                as: 'videos',
            })
            Comment.belongsTo(models.Account, {
                foreignKey: 'acc_id',
                as: 'accounts',
            })
        }
    }
    Comment.init({
        content: DataTypes.STRING,
        num_likes: DataTypes.INTEGER,
        post_id: DataTypes.INTEGER,
        video_id: DataTypes.INTEGER,
        acc_id: DataTypes.INTEGER,
        tag: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};