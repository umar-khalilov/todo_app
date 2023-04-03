'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('refresh_tokens', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                field: 'user_id',
                referencies: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'RESTRICT',
            },
            value: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            userAgent: {
                type: Sequelize.STRING(500),
                allowNull: false,
                field: 'user_agent',
            },
            expiresIn: {
                type: Sequelize.INTEGER,
                allowNull: false,
                field: 'expires_in',
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                field: 'created_at',
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                field: 'updated_at',
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('refresh_tokens');
    },
};
