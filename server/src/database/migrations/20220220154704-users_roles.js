'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            'users_roles',
            {
                userId: {
                    allowNull: false,
                    field: 'user_id',
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade',
                },
                roleId: {
                    allowNull: false,
                    field: 'role_id',
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'roles',
                        key: 'id',
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade',
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
