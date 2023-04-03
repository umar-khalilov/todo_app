'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            'users_roles',
            {
                userId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    field: 'user_id',
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                roleId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    field: 'role_id',
                    references: {
                        model: 'roles',
                        key: 'id',
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
            },
            {
                timestamps: false,
            },
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users_roles');
    },
};
