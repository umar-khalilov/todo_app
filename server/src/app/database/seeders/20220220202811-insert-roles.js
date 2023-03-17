'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'roles',
            [
                {
                    value: 'admin',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    value: 'manager',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    value: 'user',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {},
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('roles', null, {});
    },
};
