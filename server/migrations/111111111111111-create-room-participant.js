'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('room_participants', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                type: Sequelize.STRING,
                references: {
                    model: 'accounts',
                    key: 'acc_id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            room_id: {
                type: Sequelize.STRING,
                references: {
                    model: 'rooms',
                    key: 'room_id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            is_exited: {
                type: Sequelize.BOOLEAN,
            },
            is_receive_message: {
                type: Sequelize.BOOLEAN,
            },
            day_exited: {
                type: Sequelize.DATE,
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
        await queryInterface.dropTable('room_participants');
    },
};
