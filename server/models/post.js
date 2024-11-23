'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Post.hasMany(models.Comment, {
                foreignKey: 'post_id',
                as: 'comments',
            })
            Post.hasMany(models.BlockPost, {
                foreignKey: 'post_id',
                as: 'block_posts',
            })
            Post.hasMany(models.Like, {
                foreignKey: 'post_id',
                as: 'likes',
            })
            Post.belongsTo(models.Account, {
                foreignKey: 'acc_id',
                as: 'accounts',
            })
        }
    }
    Post.init({
        post_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        title: DataTypes.STRING,
        image: DataTypes.STRING,
        num_likes: DataTypes.INTEGER,
        num_comments: DataTypes.INTEGER,
        acc_id: DataTypes.STRING,
        tag: DataTypes.STRING,
        location: DataTypes.STRING,
        privacy: DataTypes.BOOLEAN,
        isComment: DataTypes.BOOLEAN,
    }, {
        sequelize,
        tableName: 'posts',
        modelName: 'Post',
    });
    return Post;
};