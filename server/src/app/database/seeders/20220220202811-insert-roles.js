'use strict';
const { RoleTypes } = require('../../../roles/RoleTypes');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'roles',
            [
                {
                    value: RoleTypes.ADMIN,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    value: RoleTypes.MANAGER,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    value: RoleTypes.USER,
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
