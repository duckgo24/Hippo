'use strict';
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      nickname: {
        type: Sequelize.STRING
      },
      full_name: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      bio:{
        type: Sequelize.STRING
      },
      tick: {
        type: Sequelize.BOOLEAN
      },
      isOnline: {
        type: Sequelize.BOOLEAN
      },
      lastOnline:  {
        allowNull: false,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('accounts');
  }
};