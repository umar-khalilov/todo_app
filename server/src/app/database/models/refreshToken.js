'use strict';
const { Model } = require('sequelize');
const { HashService } = require('../../../common/services/HashService');

module.exports = (sequelize, DataTypes) => {
    const hashService = new HashService();
    class RefreshToken extends Model {
        static associate(models) {
            RefreshToken.belongsTo(models.User, {
                foreignKey: 'userId',
                targetKey: 'id',
                onDelete: 'CASCADE',
                onUpdate: 'RESTRICT',
            });
        }
    }
    RefreshToken.init(
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
            value: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notNull: true,
                    notEmpty: true,
                },
            },
            userAgent: {
                type: DataTypes.STRING(500),
                allowNull: false,
                field: 'user_agent',
                validate: {
                    notNull: true,
                    notEmpty: true,
                },
            },
            expiresIn: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'expires_in',
                validate: {
                    notNull: true,
                    notEmpty: true,
                    isInt: true,
                },
            },
        },
        {
            hooks: {
                beforeCreate: async (data = {}, _options = {}) => {
                    data.value = await hashService.hashValue(data.value);
                    return data;
                },
                beforeUpdate: async (data = {}, _options = {}) => {
                    if (data.value) {
                        data.value = await hashService.hashPassword(data.value);
                    }
                    return data;
                },
            },
            sequelize,
            modelName: 'RefreshToken',
            tableName: 'refresh_tokens',
            underscored: true,
        },
    );
    return RefreshToken;
};
