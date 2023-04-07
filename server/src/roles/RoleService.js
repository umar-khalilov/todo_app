const { Role } = require('../app/database/models');
const { LoggerService } = require('../common/services/LoggerService');
const { NotFoundException } = require('../common/exceptions');
const { RoleTypes } = require('./RoleTypes');

class RoleService {
    #roleRepository;
    #logger;

    constructor() {
        this.#logger = new LoggerService(RoleService.name);
        this.#roleRepository = Role;
        this.#logger.log('Initialized');
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

    async getRoleByValue(value = RoleTypes) {
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
