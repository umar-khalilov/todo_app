require('dotenv').config();
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const UserService = require('./UserService');
const UnauthorizedError = require('../errors/UnauthorizedError');
const UserAlreadyExistError = require('../errors/UserAlreadyExist');
const TokenError = require('../errors/TokenError');
const BadRequestError = require('../errors/BadRequestError');

module.exports = class AuthService {
    static async #generateToken(user = {}) {
        if (user.id && user.email && user.roles) {
            const payload = {
                id: user.id,
                email: user.email,
                roles: user.roles,
            };

            const {
                env: { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_TIME },
            } = process;

            return {
                token: sign(payload, ACCESS_TOKEN_SECRET, {
                    algorithm: 'HS384',
                    expiresIn: ACCESS_TOKEN_TIME,
                }),
            };
        }
        throw new TokenError();
    }

    static async #validateUser({ email, password }) {
        if (!(email && password)) {
            throw new BadRequestError('Need email and password');
        }
        const user = await UserService.findUserByEmail(email);
        if (user && (await compare(password, user.password))) {
            return user;
        }
        throw new UnauthorizedError();
    }

    static async signIn(signInData = {}) {
        const signedUser = await this.#validateUser(signInData);
        return await this.#generateToken(signedUser);
    }

    static async signUp(signUpData = {}) {
        const candidate = await UserService.findUserByEmail(signUpData.email);
        if (candidate) {
            throw new UserAlreadyExistError();
        }

        const createdUser = await UserService.createUser(signUpData);
        return await this.#generateToken(createdUser);
    }
};
