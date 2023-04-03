'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
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
            sequelize,
            modelName: 'RefreshToken',
            tableName: 'refresh_tokens',
            underscored: true,
        },
    );
    return RefreshToken;
};
