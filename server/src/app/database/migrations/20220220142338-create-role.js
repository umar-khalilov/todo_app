'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('roles', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            value: {
                type: Sequelize.ENUM('admin', 'manager', 'user'),
                allowNull: false,
                unique: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at',
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                field: 'updated_at',
                allowNull: false,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('roles');
    },
};
