'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      comment_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      tag: {
        type: Sequelize.STRING
      },
      num_replies: {
        type: Sequelize.INTEGER
      },
      num_likes: {
        type: Sequelize.INTEGER
      },
      post_id: {
        type: Sequelize.STRING,
        references: {
          model: 'posts',
          key: 'post_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      video_id: {
        type: Sequelize.STRING,
        references: {
          model: 'videos',
          key: 'video_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      acc_id: {
        type: Sequelize.STRING,
        references: {
          model: 'accounts',
          key: 'acc_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  }
};