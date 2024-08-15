'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ReplyComment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            ReplyComment.belongsTo(models.Comment, {
                foreignKey: 'comment_id',
                as: 'posts',
            })
            ReplyComment.belongsTo(models.Account, {
                foreignKey: 'acc_id',
                as: 'accounts',
            })
        }
    }
    ReplyComment.init({
        content: DataTypes.STRING,
        acc_id: DataTypes.INTEGER,
        comment_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'ReplyComment',
    });
    return ReplyComment;
};