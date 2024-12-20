'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('messages_group', {
      message_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.STRING
      },
      video: {
        type: Sequelize.STRING
      },
      sender_id: {
        type: Sequelize.STRING,
        references: {
          model: 'accounts',
          key: 'acc_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      seen: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      mood: {
        type: Sequelize.STRING
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      room_id: {
        type: Sequelize.STRING,
        references: {
          model: 'rooms',
          key: 'room_id'
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
    await queryInterface.dropTable('messages_group');
  }
}; 