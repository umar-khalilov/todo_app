'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'roles',
            [
                { role: 'admin', created_at: new Date(), updated_at: new Date() },
                {
                    role: 'user',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('roles', null, {});
    },
};
