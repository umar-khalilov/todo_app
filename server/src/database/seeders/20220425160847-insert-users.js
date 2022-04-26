'use strict';
const { Role } = require('../models');

module.exports = {
    async up(queryInterface, Sequelize) {
        const generateUser = key => ({
            name: `Name=${key}`,
            surname: `Surname=${key}`,
            email: `test${key}@gmail.com`,
            birthday: new Date(1993, 1, key),
            is_male: Math.random() > 0.5,
            password_hash: 'Test1234!',
            created_at: new Date(),
            updated_at: new Date(),
        });

        const generateUsers = (amount = 50) => {
            return new Array(amount > 500 ? 500 : amount)
                .fill(null)
                .map((_, index) => generateUser(index));
        };

        await queryInterface.bulkInsert('users', generateUsers(100), {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {});
    },
};
