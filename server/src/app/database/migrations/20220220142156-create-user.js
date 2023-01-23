'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            surname: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            email: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING,
            },
            birthday: {
                allowNull: true,
                type: Sequelize.DATEONLY,
            },
            isMale: {
                field: 'is_male',
                allowNull: true,
                type: Sequelize.BOOLEAN,
            },
            password: {
                field: 'password_hash',
                allowNull: false,
                type: Sequelize.TEXT,
            },
            createdAt: {
                allowNull: false,
                field: 'created_at',
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                field: 'updated_at',
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    },
};
