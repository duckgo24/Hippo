'use strict';
const bcrypt = require('bcrypt');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('accounts', [
            {
                acc_id: 'system',
                username: `admin`,
                password: bcrypt.hashSync('1', 10),
                role: 'admin',
                nickname: `admin`,
                avatar: 'https://i.ibb.co/HxWg7wD/logo.png',
                full_name: 'admin',
                bio: `admin`,
                tick: true,
                isBan: false,
                isOnline: true,
                lastOnline: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('accounts', null, {});
    },
};
