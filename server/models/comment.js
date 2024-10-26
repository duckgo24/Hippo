'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            Comment.hasMany(models.ReplyComment, {
                foreignKey: 'comment_id',
                as: 'reply-comments',
            });
            Comment.belongsTo(models.Post, {
                foreignKey: 'post_id',
                as: 'posts',
            });
            Comment.belongsTo(models.Video, {
                foreignKey: 'video_id',
                as: 'videos',
            });
            Comment.belongsTo(models.Account, {
                foreignKey: 'acc_id',
                as: 'accounts',
            });
        }
    }

    Comment.init({
        comment_id: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content: DataTypes.STRING,
        num_replies: DataTypes.INTEGER,
        num_likes: DataTypes.INTEGER,
        post_id: DataTypes.INTEGER,
        video_id: DataTypes.INTEGER,
        acc_id: DataTypes.STRING,
        tag: DataTypes.STRING,
    }, {
        sequelize,
        tableName: 'comments',
        modelName: 'Comment',
    });
    
    return Comment;
};
