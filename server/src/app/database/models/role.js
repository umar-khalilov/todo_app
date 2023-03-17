'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(models) {
            Role.belongsToMany(models.User, {
                through: 'users_roles',
                foreignKey: 'roleId',
                otherKey: 'userId',
                timestamps: false,
            });
        }
    }

    Role.init(
        {
            value: {
                type: DataTypes.ENUM('admin', 'manager', 'user'),
                allowNull: false,
                unique: true,
            },
        },
        {
            sequelize,
            modelName: 'Role',
            tableName: 'roles',
            underscored: true,
        },
    );
    return Role;
};
