'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate (models) {
            Role.belongsToMany(models.User, {
                through: 'users_roles',
                foreignKey: 'roleId',
                as: 'users',
                timestamps: false,
            });
        }
    }

    Role.init(
        {
            role: {
                allowNull: false,
                unique: true,
                type: DataTypes.ENUM('admin', 'user'),
            },
        },
        {
            sequelize,
            modelName: 'Role',
            tableName: 'roles',
            underscored: true,
        }
    );
    return Role;
};
