const AuthService = require('../services/AuthService');

module.exports = class AuthController {
    static #authService = AuthService;

    static async signUp({ body }, res, next) {
        const createdUser = await this.#authService.signUp(body, next);
        res.status(201).send(createdUser);
    }

    static async signIn({ body }, res, next) {
        const signedUser = await this.#authService.signIn(body, next);
        res.status(200).send(signedUser);
    }
};
