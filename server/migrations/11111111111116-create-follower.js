'use strict';
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('followers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      follower_user_id: {
        type: Sequelize.STRING,
        references: {
          model: 'accounts',
          key: 'acc_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      following_user_id: {
        type: Sequelize.STRING,
        references: {
          model: 'accounts',
          key: 'acc_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('followers');
  }
};