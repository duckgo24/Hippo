'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      avatar: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      num_posts: {
        type: Sequelize.INTEGER
      },
      num_followers: {
        type: Sequelize.INTEGER
      },
      num_following: {
        type: Sequelize.INTEGER
      },
      bio:{
        type: Sequelize.STRING
      },
      list_friend:{
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
    await queryInterface.dropTable('Accounts');
  }
};