'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('rooms', {
            room_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            name: {
                type: Sequelize.STRING,
            },
            priority: {
                type: Sequelize.INTEGER,
            },
            owner_id: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('rooms');
    },
};
