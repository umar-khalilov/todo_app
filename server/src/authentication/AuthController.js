const { Router } = require('express');
const { AuthService } = require('./AuthService');
const { SuccessResponse } = require('../common/utils/SuccessResponse');
const { RefreshTokenService } = require('../refreshTokens/RefreshTokenService');
const { signUpSchema, signInSchema } = require('./authSchemas');
const { HttpStatusCodes } = require('../common/utils/httpStatusCodes');
const { configuration } = require('../configs');
const { validate } = require('../common/middlewares/validate');
const { asyncWrapper } = require('../common/utils/helpers');
const {
    verifyAccessToken,
    verifyRefreshToken,
} = require('../common/middlewares/verifyTokens');
const { LoggerService } = require('../common/services/LoggerService');

class AuthController {
    #authService;
    #refreshTokenService;
    #router;
    #path;
    #logger;

    constructor() {
        this.#logger = new LoggerService(AuthController.name);
        this.#authService = new AuthService();
        this.#refreshTokenService = new RefreshTokenService();
        this.#router = new Router({ mergeParams: true, caseSensitive: true });
        this.#path = '/auth';
        this.#initializeRoutes();
        this.#logger.log('Initialized');
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
        this.router.post(
            `${this.#path}/sign-out`,
            verifyAccessToken,
            verifyRefreshToken,
            this.#signOut,
        );
        this.router.post(`${this.#path}/refresh-session`, this.#refreshSession);
        this.router.get(`${this.#path}/verification/:uuid`, this.#verificate);
    }

    #signUp = asyncWrapper(async ({ headers, body }) => {
        const userAgent = headers['user-agent'];
        const data = await this.#authService.signUp(userAgent, body);
        return new SuccessResponse({ data }, HttpStatusCodes.CREATED);
    });

    #signIn = asyncWrapper(async ({ headers, body }) => {
        const userAgent = headers['user-agent'];
        const data = await this.#authService.signIn(userAgent, body);
        return new SuccessResponse({ data });
    });

    #verificate = async ({ params: { uuid } }, res, next) => {
        try {
            await this.#authService.verificateUser(uuid);
            return res.redirect(301, configuration.clientUrl);
        } catch (error) {
            next(error);
        }
    };

    #refreshSession = asyncWrapper(async ({ body }) => {
        const data = await this.#authService.refreshSession(body?.refresh);
        return new SuccessResponse({ data });
    });

    #signOut = asyncWrapper(async req => {
        req.res.setHeader('Authorization', null);
        await this.#refreshTokenService.removeToken(req.body?.refresh);
        return new SuccessResponse({ data: 'You are successfully signed out' });
    });
}

module.exports = { AuthController };
