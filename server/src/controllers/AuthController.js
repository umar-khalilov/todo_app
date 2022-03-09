const AuthService = require('../services/AuthService');

module.exports = class AuthController {
    static async signUp ({ body }, res, next) {
        const token = await AuthService.signUp(body, next);
        res.status(201).send(token);
    }

    static async signIn ({ body }, res, next) {
        const token = await AuthService.signIn(body, next);
        res.status(200).send(token);
    }
};
