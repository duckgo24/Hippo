'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reply_comment', {
      reply_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      reply_user: {
        type: Sequelize.STRING,
      },
      comment_id: {
        type: Sequelize.STRING,
        references: {
          model: 'comments',
          key: 'comment_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      acc_id: {
        type: Sequelize.STRING,
        references: {
          model: 'accounts',
          key: 'id'
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
    await queryInterface.dropTable('reply_comment');
  }
}; 