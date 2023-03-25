const { Router } = require('express');
const { AuthService } = require('./AuthService');
const { SuccessResponse } = require('../common/utils/SuccessResponse');
const { validate } = require('../common/middlewares/validate');
const { asyncWrapper } = require('../common/utils/helpers');
const { signUpSchema, signInSchema } = require('./authSchemas');
const { HttpStatusCodes } = require('../common/utils/httpStatusCodes');
const { configuration } = require('../configs');

class AuthController {
    #authService;
    #router;
    #config;
    #path;

    constructor() {
        this.#authService = new AuthService();
        this.#router = new Router({ mergeParams: true, caseSensitive: true });
        this.#config = configuration;
        this.#path = '/auth';
        this.#initializeRoutes();
    }

    get router() {
        return this.#router;
    }

    #initializeRoutes() {
        this.router.post(
            `${this.#path}/sign-up`,
            validate(signUpSchema),
            this.#signUp,
        );
        this.router.post(
            `${this.#path}/sign-in`,
            validate(signInSchema),
            this.#signIn,
        );
        this.router.post(`${this.#path}/sign-out`, this.#signOut);
        this.router.post(
            `${this.#path}/refreshSession-session`,
            this.#refreshSession,
        );
        this.router.get(
            `${this.#path}/verification:link`,
            this.#verificateUser,
        );
    }

    #signUp = asyncWrapper(async ({ headers, body }) => {
        const userAgent = headers['user-agent'];
        const data = await this.#authService.signUp(userAgent, body);
        return new SuccessResponse({ data }, HttpStatusCodes.CREATED);
    });

    #signIn = asyncWrapper(async ({ headers, body }) => {
        const userAgent = headers['user-agent'];
        const data = await this.#authService.signIn(userAgent, body);
        return new SuccessResponse({ data }, HttpStatusCodes.OK);
    });

    #signOut = asyncWrapper(async () => {});

    #refreshSession = asyncWrapper(async () => {});

    #verificateUser = asyncWrapper(async ({ params: { link } }, res) => {
        await this.#authService.verificate(link);
        return res.redirect(this.#config.clientUrl);
    });
}

module.exports = { AuthController };
