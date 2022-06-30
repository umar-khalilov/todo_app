const AuthService = require('./AuthService.js');

module.exports = class AuthController {
    static async signUp({ body }, res, next) {
        try {
            const token = await AuthService.signUp(body);
            return res.status(201).send(token);
        } catch (error) {
            next(error);
        }
    }

    static async signIn({ body }, res, next) {
        try {
            const token = await AuthService.signIn(body);
            return res.status(200).send(token);
        } catch (error) {
            next(error);
        }
    }
};
