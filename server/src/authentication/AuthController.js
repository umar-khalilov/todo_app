const { Router } = require('express');
const AuthService = require('./AuthService');
const {
    signUpSchema,
    signInSchema,
} = require('../utils/authValidationSchemas');
const {
    validateSignUpData,
    validateSignInData,
} = require('../middlewares/authValidation');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');

class AuthController {
    #path = '/auth';
    #router = Router({ mergeParams: true, caseSensitive: true });
    #authService = new AuthService();

    constructor() {
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.post(
            `${this.#path}/sign-up`,
            validateSignUpData(signUpSchema),
            this.#signUp,
        );
        this.router.post(
            `${this.#path}/sign-in`,
            validateSignInData(signInSchema),
            this.#signIn,
        );
    }

    get router() {
        return this.#router;
    }

    #signUp = async ({ body }, res, next) => {
        try {
            const token = await this.#authService.signUp(body);
            return res.status(HttpStatusCodes.CREATED).send(token);
        } catch (error) {
            next(error);
        }
    };

    #signIn = async ({ body }, res, next) => {
        try {
            const token = await this.#authService.signIn(body);
            return res.status(HttpStatusCodes.OK).send(token);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = AuthController;
