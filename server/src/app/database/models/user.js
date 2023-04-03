'use strict';
const { Model } = require('sequelize');
const { isAfter } = require('date-fns');
const { HashService } = require('../../../common/services/HashService');

module.exports = (sequelize, DataTypes) => {
    const hashService = new HashService();

    class User extends Model {
        static associate(models) {
            User.hasMany(models.Task, {
                foreignKey: 'userId',
                as: 'tasks',
            });
            User.hasMany(models.RefreshToken, {
                foreignKey: 'userId',
                as: 'tokens',
            });
            User.belongsToMany(models.Role, {
                through: 'users_roles',
                foreignKey: 'userId',
                otherKey: 'roleId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                as: 'roles',
                timestamps: false,
            });
        }
    }

    User.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: true,
                    notEmpty: true,
                    isAlpha: true,
                },
            },
            surname: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: true,
                    notEmpty: true,
                    isAlpha: true,
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notNull: true,
                    notEmpty: true,
                    isEmail: true,
                },
            },
            avatar: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            birthday: {
                type: DataTypes.DATEONLY,
                allowNull: true,
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
                type: DataTypes.BOOLEAN,
                allowNull: true,
                field: 'is_male',
            },
            isVerificated: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                field: 'is_verificated',
            },
            verificationUuid: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'verification_uuid',
            },
            password: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'password_hash',
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
                beforeCreate: async (user = {}, _options = {}) => {
                    user.password = await hashService.hashPassword(
                        user.password,
                    );
                    user.email = user.email.toLowerCase();
                    return user;
                },
                beforeUpdate: async (user = {}, _options = {}) => {
                    if (user.password) {
                        user.password = await hashService.hashPassword(
                            user.password,
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
