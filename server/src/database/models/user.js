'use strict';
require('dotenv').config();
const { Model } = require('sequelize');
const { isAfter } = require('date-fns');
const { hash, genSalt } = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const salt = +process.env.SALT_ROUNDS;

    class User extends Model {
        static associate(models) {
            User.hasMany(models.Task, {
                foreignKey: 'userId',
                as: 'tasks',
            });
            User.belongsToMany(models.Role, {
                through: 'users_roles',
                foreignKey: 'userId',
                otherKey: 'roleId',
                timestamps: false,
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
            defaultScope: {
                attributes: { exclude: ['password'] },
            },
            scopes: {
                withPassword: {
                    attributes: {},
                },
            },
            hooks: {
                beforeCreate: async (user = {}, options = {}) => {
                    user.password = await hash(
                        user.password,
                        await genSalt(salt),
                    );
                    user.email = user.email.toLowerCase();
                    return user;
                },
                beforeUpdate: async (user = {}, options = {}) => {
                    if (user.password) {
                        user.password = await hash(
                            user.password,
                            await genSalt(salt),
                        );
                    }
                    return user;
                },
            },
            sequelize,
            modelName: 'User',
            tableName: 'users',
            underscored: true,
        },
    );
    return User;
};
