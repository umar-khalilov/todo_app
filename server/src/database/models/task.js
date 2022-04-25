const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        static associate(models) {
            Task.belongsTo(models.User, {
                foreignKey: 'id',
                as: 'user',
            });
        }
    }

    Task.init(
        {
            title: {
                allowNull: false,
                type: DataTypes.STRING(300),
                validate: { notNull: true, notEmpty: true, isAlphanumeric: true },
            },
            body: {
                allowNull: false,
                type: DataTypes.TEXT,
                validate: {
                    notNull: true,
                    notEmpty: true,
                    isAlphanumeric: true,
                },
            },
            deadline: {
                allowNull: false,
                type: DataTypes.DATE,
                validate: {
                    notNull: true,
                    notEmpty: true,
                    isDate: true,
                },
            },
            isDone: {
                allowNull: false,
                field: 'is_done',
                defaultValue: false,
                type: DataTypes.BOOLEAN,
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
