'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
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
            name: {
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
        },
    );
    return Role;
};
