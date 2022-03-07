require('dotenv').config();
const { compare, hash, genSalt } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const UserService = require('./UserService');
const UnauthorizedError = require('../errors/UnauthorizedError');
const UserAlreadyExistError = require('../errors/UserAlreadyExist');

module.exports = class AuthService {
    static async #generateToken (user = {}) {
        const {
            env: { REFRESH_TOKEN_SECRET, REFRESH_TOKEN_TIME },
        } = process;

        const { id, email, roles } = user;
        const payload = {
            id,
            email,
            roles,
        };
        return {
            token: await sign(payload, REFRESH_TOKEN_SECRET, {
                algorithm: 'HS384',
                expiresIn: REFRESH_TOKEN_TIME,
            }),
        };
    }

    static async #validateUser (signInData = {}) {
        try {
            const { email, password } = signInData;
            const user = await UserService.findUserByEmail(email);
            const comparePassword = await compare(password, user.password);
            if (user && comparePassword) {
                return user;
            }
        } catch (err) {
            throw new UnauthorizedError();
        }
    }

    static async signIn (signInData = {}, next) {
        try {
            const signedUser = await this.#validateUser(signInData);
            return await this.#generateToken(signedUser);
        } catch (err) {
            next(err);
        }
    }

    static async signUp (signUpData, next) {
        const { email, password } = signUpData;
        const candidate = await UserService.findUserByEmail(email, next);
        if (candidate) {
            next(new UserAlreadyExistError());
        }

        const { SALT_ROUNDS } = process.env;
        const salt = await genSalt(+SALT_ROUNDS);
        const passwordHash = await hash(password, salt);
        const createdUser = await UserService.createUser(
            {
                ...signUpData,
                password: passwordHash,
            },
            next
        );

        return await this.#generateToken(createdUser);
    }
};