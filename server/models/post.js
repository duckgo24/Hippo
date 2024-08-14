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
                as: 'posts',
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
        title: DataTypes.STRING,
        image: DataTypes.STRING,
        num_likes: DataTypes.INTEGER,
        num_comments: DataTypes.INTEGER,
        acc_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};