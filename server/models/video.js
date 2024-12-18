'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Video extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Video.hasMany(models.Comment, {
                foreignKey: 'comment_id',
                as: 'comments',
            })
            Video.hasMany(models.BlockPost, {
                foreignKey: 'video_id',
                as: 'block-posts',
            })
            Video.belongsTo(models.Account, {
                foreignKey: 'acc_id',
                as: 'accounts',
            })
            Video.hasMany(models.Like, {
                foreignKey: 'video_id',
                as: 'likes',
            })
        }
    }
    Video.init({
        video_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        title: DataTypes.STRING,
        video: DataTypes.STRING,
        num_likes: DataTypes.INTEGER,
        num_comments: DataTypes.INTEGER,
        acc_id: DataTypes.STRING,
        tag: DataTypes.STRING,
        location: DataTypes.STRING,
        privacy: DataTypes.BOOLEAN,
        isComment: DataTypes.BOOLEAN,
    }, {
        sequelize,
        tableName: 'videos',
        modelName: 'Video',
    });
    return Video;
};