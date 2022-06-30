require('dotenv').config();
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const UserService = require('../users/UserService.js');
const UnauthorizedError = require('../errors/UnauthorizedException.js');
const UserAlreadyExistError = require('../errors/UserAlreadyExistException.js');
const TokenError = require('../errors/TokenException.js');
const BadRequestError = require('../errors/BadRequestException.js');

module.exports = class AuthService {
    static async #generateToken(user = {}) {
        if (user.id && user.email && user.roles[0]) {
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

    static async #validateUser(email = '', password = '') {
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
        const { email, password } = signInData;
        const signedUser = await this.#validateUser(email, password);
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