'use strict';
const { HashService } = require('../../../common/services/HashService');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const hashService = new HashService();

        const roles = await queryInterface.rawSelect(
            'roles',
            { plain: false },
            [],
        );

        const users = await queryInterface.bulkInsert(
            'users',
            [
                {
                    name: 'Thomas',
                    surname: 'Hanks',
                    email: 'tom@hanks.com',
                    avatar: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Tom_Hanks_TIFF_2019.jpg',
                    birthday: '1956/07/09',
                    is_male: true,
                    is_verificated: true,
                    verification_uuid: null,
                    password_hash: await hashService.hashPassword(
                        'hanks!00TheBest',
                    ),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: 'Jason',
                    surname: 'Statham',
                    email: 'jason@statham.com',
                    avatar: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Jason_Statham_2018.jpg',
                    birthday: '1967/07/26',
                    is_male: true,
                    is_verificated: true,
                    verification_uuid: null,
                    password_hash: await hashService.hashPassword(
                        'statham!00TheBest',
                    ),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            { returning: true },
        );

        for await (const user of users) {
            if (user.id === 1) {
                await queryInterface.sequelize.query(
                    `INSERT INTO "users_roles" (user_id, role_id) VALUES (${
                        user.id
                    }, ${roles.at(0).id})`,
                    { type: Sequelize.QueryTypes.INSERT },
                );
                await queryInterface.sequelize.query(
                    `INSERT INTO "users_roles" (user_id, role_id) VALUES (${
                        user.id
                    }, ${roles.at(2).id})`,
                    { type: Sequelize.QueryTypes.INSERT },
                );
            } else {
                await queryInterface.sequelize.query(
                    `INSERT INTO "users_roles" (user_id, role_id) VALUES (${
                        user.id
                    }, ${roles.at(1).id})`,
                    { type: Sequelize.QueryTypes.INSERT },
                );
                await queryInterface.sequelize.query(
                    `INSERT INTO "users_roles" (user_id, role_id) VALUES (${
                        user.id
                    }, ${roles.at(2).id})`,
                    { type: Sequelize.QueryTypes.INSERT },
                );
            }
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {});
    },
};
