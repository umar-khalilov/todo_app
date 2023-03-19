const { Router } = require('express');
const { RoleService } = require('./RoleService');
const { SuccessResponse } = require('../common/utils/SuccessResponse');
const { asyncWrapper } = require('../common/utils/helpers');

class RoleController {
    #roleService;
    #router;
    #path;

    constructor() {
        this.#roleService = new RoleService();
        this.#router = new Router({ mergeParams: true, caseSensitive: true });
        this.#path = '/roles';
        this.#initializeRoutes();
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
