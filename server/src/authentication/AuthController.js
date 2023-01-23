const { Router } = require('express');
const AuthService = require('./AuthService');
const SuccessResponse = require('../common/utils/SuccessResponse');
const { validate } = require('../common/middlewares/validate');
const { asyncWrapper } = require('../common/utils/asyncWrapper');
const { HttpStatusCodes } = require('../common/utils/httpStatusCodes');
const { signUpDtoSchema, signInDtoSchema } = require('./authDtoSchemas');

module.exports = class AuthController {
    #authService;
    #router;
    #path;

    constructor() {
        this.#authService = new AuthService();
        this.#router = new Router({ mergeParams: true, caseSensitive: true });
        this.#path = '/auth';
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.post(
            `${this.#path}/sign-up`,
            validate(signUpDtoSchema),
            this.#signUp,
        );
        this.router.post(
            `${this.#path}/sign-in`,
            validate(signInDtoSchema),
            this.#signIn,
        );
    }

    get router() {
        return this.#router;
    }

    #signUp = asyncWrapper(async ({ body }) => {
        const token = await this.#authService.signUp(body);
        return new SuccessResponse({ data: token }, HttpStatusCodes.CREATED);
    });

    #signIn = asyncWrapper(async ({ body }) => {
        const token = await this.#authService.signIn(body);
        return new SuccessResponse({ data: token }, HttpStatusCodes.OK);
    });
};
