'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            surname: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            avatar: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            birthday: {
                type: Sequelize.DATEONLY,
                allowNull: true,
            },
            isMale: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                field: 'is_male',
            },
            isVerificated: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                field: 'is_verificated',
            },
            verificationLink: {
                type: Sequelize.TEXT,
                allowNull: true,
                field: 'verification_link',
            },
            password: {
                type: Sequelize.TEXT,
                allowNull: false,
                field: 'password_hash',
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
        await queryInterface.dropTable('users');
    },
};
