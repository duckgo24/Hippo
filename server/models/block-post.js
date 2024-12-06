'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BlockPost extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            BlockPost.belongsTo(models.Post, {
                foreignKey: 'post_id',
                as: 'posts',
            })
            
            BlockPost.belongsTo(models.Video, {
                foreignKey: 'video_id',
                as: 'videos',
            })
            BlockPost.belongsTo(models.Account, {
                foreignKey: 'acc_id',
                as: 'accounts',
            })
        }
    }
    BlockPost.init({
        block_post_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        acc_id: DataTypes.STRING,
        post_id: DataTypes.STRING,
        video_id: DataTypes.STRING,
    }, {
        sequelize,
        tableName: 'block_posts',
        modelName: 'BlockPost',
    });
    return BlockPost;
};