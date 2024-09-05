'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const accounts = [];

    for (let i = 1; i <= 20; i++) {
      accounts.push({
        username: `user${i}`,
        password: Math.floor(Math.random() * 100),
        role: 'user',
        nickname: `nickname${i}`,
        avatar: `avatar${i}.png`,
        full_name: 'Người dùng Hippo ' + i,
        bio: `This is bio of user${i}`,
        tick: Math.floor(Math.random() * 5) >= 4 ? true : false,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    return queryInterface.bulkInsert('accounts', accounts, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('accounts', null, {});
  }
};
