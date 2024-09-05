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
            Video.belongsTo(models.Account, {
                foreignKey: 'acc_id',
                as: 'account',
            })
        }
    }
    Video.init({
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        num_likes: DataTypes.INTEGER,
        num_comments: DataTypes.INTEGER,
        acc_id: DataTypes.INTEGER
    }, {
        sequelize,
        tableName: 'videos',
        modelName: 'Video',
    });
    return Video;
};