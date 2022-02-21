const AuthService = require('../services/AuthService');

module.exports = class AuthController {
    static async signUp({ body }, res, next) {
        const createdUser = await AuthService.signUp(body, next);
        res.status(201).send(createdUser);
    }

    static async signIn({ body }, res, next) {
        const signedUser = await AuthService.signIn(body, next);
        res.status(200).send(signedUser);
    }
};
