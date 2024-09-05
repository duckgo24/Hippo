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
                as: 'comments',
            })
            ReplyComment.belongsTo(models.Account, {
                foreignKey: 'acc_id',
                as: 'accounts',
            })
        }
    }
    ReplyComment.init({
        content: DataTypes.STRING,
        reply_user: DataTypes.STRING,
        acc_id: DataTypes.INTEGER,
        comment_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Comment',
                key: 'comment_id'
            }
        },
    }, {
        sequelize,
        tableName: 'reply_comment',
        modelName: 'ReplyComment'

    });

    return ReplyComment;
}; 