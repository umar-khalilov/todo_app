'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        static associate(models) {
            Task.belongsTo(models.User, {
                foreignKey: 'userId',
                targetKey: 'id',
                onDelete: 'CASCADE',
                onUpdate: 'RESTRICT',
            });
        }
    }

    Task.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'user_id',
                validate: {
                    notNull: true,
                    notEmpty: true,
                },
                onDelete: 'CASCADE',
                onUpdate: 'RESTRICT',
            },
            title: {
                type: DataTypes.STRING(300),
                allowNull: false,
                validate: { notNull: true, notEmpty: true },
            },
            body: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notNull: true,
                    notEmpty: true,
                },
            },
            deadline: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notNull: true,
                    notEmpty: true,
                    isDate: true,
                },
            },
            isDone: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                field: 'is_done',
                defaultValue: false,
            },
            files: {
                type: DataTypes.ARRAY(DataTypes.STRING(600)),
                allowNull: true,
                validate: {
                    isArray: true,
                },
            },
        },
        {
            sequelize,
            modelName: 'Task',
            tableName: 'tasks',
            underscored: true,
        },
    );
    return Task;
};
