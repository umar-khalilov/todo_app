const { Role } = require('../app/database/models');
const { NotFoundException } = require('../common/exceptions');

class RoleService {
    #roleRepository;

    constructor() {
        this.#roleRepository = Role;
    }

    async getAllRoles() {
        const roles = await this.#roleRepository.findAll({
            attributes: ['value'],
        });

        if (!roles.length) {
            throw new NotFoundException('No roles found in database');
        }
        return roles;
    }

    async getRoleByValue(value = '') {
        const foundRole = await this.#roleRepository.findOne({
            where: { value },
        });
        if (!foundRole) {
            throw new NotFoundException(
                `Role with that value: ${value} not found`,
            );
        }
        return foundRole;
    }
}

module.exports = { RoleService };
