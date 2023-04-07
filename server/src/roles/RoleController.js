const { Router } = require('express');
const { RoleService } = require('./RoleService');
const { SuccessResponse } = require('../common/utils/SuccessResponse');
const { asyncWrapper } = require('../common/utils/helpers');
const { LoggerService } = require('../common/services/LoggerService');

class RoleController {
    #roleService;
    #router;
    #path;
    #logger;

    constructor() {
        this.#logger = new LoggerService(RoleController.name);
        this.#roleService = new RoleService();
        this.#router = new Router({ mergeParams: true, caseSensitive: true });
        this.#path = '/roles';
        this.#initializeRoutes();
        this.#logger.log('Initialized');
    }

    get router() {
        return this.#router;
    }

    #initializeRoutes() {
        this.router.get(this.#path, this.#findAll);
    }

    #findAll = asyncWrapper(async () => {
        const roles = await this.#roleService.getAllRoles();
        return new SuccessResponse(roles);
    });
}

module.exports = { RoleController };
