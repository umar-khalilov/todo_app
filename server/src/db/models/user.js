'use strict';
const { Model } = require('sequelize');
const { isAfter } = require('date-fns');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Task, {
                foreignKey: 'userId',
                as: 'tasks',
            });
            User.belongsToMany(models.Role, {
                through: 'users_roles',
                foreignKey: 'userId',
                as: 'roles',
            });
        }
    }

    User.init(
        {
            name: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    notNull: true,
                    notEmpty: true,
                    isAlpha: true,
                },
            },
            surname: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    notNull: true,
                    notEmpty: true,
                    isAlpha: true,
                },
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    notNull: true,
                    notEmpty: true,
                    isEmail: true,
                },
            },
            birthday: {
                allowNull: true,
                type: DataTypes.DATEONLY,
                validate: {
                    isDate: true,
                    isCorrectDate(value) {
                        if (isAfter(new Date(value), new Date())) {
                            throw new Error('Enter a valid date');
                        }
                    },
                },
            },
            isMale: {
                allowNull: true,
                field: 'is_male',
                type: DataTypes.BOOLEAN,
            },
            password: {
                allowNull: false,
                field: 'password_hash',
                type: DataTypes.TEXT,
            },
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            underscored: true,
        }
    );
    return User;
};
