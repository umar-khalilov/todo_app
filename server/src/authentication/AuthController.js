import { Router } from 'express';
import { AuthService } from './AuthService.js';
import { AuthValidation } from '../middlewares/AuthValidation.js';
import { AuthValidationSchemas } from '../utils/AuthValidationSchemas.js';

export class AuthController {
    #path = '/auth';
    #router = Router({ mergeParams: true });
    #authService = new AuthService();
    #authValidation = new AuthValidation();
    #authSchema = new AuthValidationSchemas();

    constructor() {
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.#router.post(
            `${this.#path}/sign-up`,
            this.#authValidation.validateSignUpData(
                this.#authSchema.signUpSchema,
            ),
            this.#signUp,
        );
        this.#router.post(
            `${this.#path}/sign-in`,
            this.#authValidation.validateSignInData(
                this.#authValidation.validateSignInData,
            ),
            this.#signIn,
        );
    }

    #signUp = async ({ body }, res, next) => {
        try {
            const token = await this.#authService.signUp(body);
            return res.status(201).send(token);
        } catch (error) {
            next(error);
        }
    };

    #signIn = async ({ body }, res, next) => {
        try {
            const token = await this.#authService.signIn(body);
            return res.status(200).send(token);
        } catch (error) {
            next(error);
        }
    };
}
