'use strict';

export default {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tasks', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                allowNull: false,
                field: 'user_id',
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                    as: 'userId',
                },
                onDelete: 'cascade',
                onUpdate: 'restrict',
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING(300),
            },
            body: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            deadline: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            isDone: {
                allowNull: false,
                field: 'is_done',
                type: Sequelize.BOOLEAN,
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
        await queryInterface.dropTable('tasks');
    },
};
