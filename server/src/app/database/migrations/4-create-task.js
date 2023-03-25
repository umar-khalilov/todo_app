'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tasks', {
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
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'RESTRICT',
            },
            title: {
                type: Sequelize.STRING(300),
                allowNull: false,
            },
            body: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            deadline: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            isDone: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                field: 'is_done',
            },
            files: {
                type: Sequelize.ARRAY(Sequelize.STRING(600)),
                allowNull: true,
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
        await queryInterface.dropTable('tasks');
    },
};
