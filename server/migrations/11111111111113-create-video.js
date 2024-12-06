'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('videos', {
      video_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      video: {
        type: Sequelize.STRING
      },
      num_likes: {
        type: Sequelize.INTEGER
      },
      num_comments: {
        type: Sequelize.INTEGER
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
      location: {
        type: Sequelize.STRING
      },
      privacy: {
        type: Sequelize.BOOLEAN
      },
      isComment: {
        type: Sequelize.BOOLEAN
      },
      tag: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('videos');
  }
};