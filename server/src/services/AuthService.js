require('dotenv').config();
const { compare, hash, genSalt } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserService = require('./UserService');
const UnauthorizedError = require('../errors/UnauthorizedError');
const UserAlreadyExistError = require('../errors/UserAlreadyExist');

module.exports = class AuthService {
    static #userService = UserService;

    static async #generateToken(user = {}) {
        const {
            env: { REFRESH_TOKEN_SECRET, REFRESH_TOKEN_TIME },
        } = process;

        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        return {
            token: await jwt.sign(
                payload,
                REFRESH_TOKEN_SECRET,
                {
                    algorithm: 'RS256',
                    expiresIn: REFRESH_TOKEN_TIME,
                },
                (err, token) => {
                    if (err) {
                        throw new Error(err);
                    }
                    return token;
                }
            ),
        };
    }

    static async #validateUser(signInData = {}) {
        try {
            const { email, password } = signInData;
            const user = await this.#userService.findUserByEmail(email);
            const comparePassword = await compare(password, user.password);
            if (user && comparePassword) {
                return user;
            }
        } catch (err) {
            throw new UnauthorizedError();
        }
    }

    static async signIn(signInData, next) {
        try {
            const signedUser = await this.#validateUser(signInData);
            return await this.#generateToken(signedUser);
        } catch (err) {
            next(err);
        }
    }

    static async signUp(signUpData, next) {
        const { email, password } = signUpData;
        const candidate = await this.#userService.findUserByEmail(email);
        if (candidate) {
            throw new UserAlreadyExistError();
        }

        const { SALT_ROUNDS } = process.env;
        const salt = await genSalt(+SALT_ROUNDS);
        const passwordHash = await hash(password, salt);
        const createdUser = await this.#userService.createUser(
            {
                ...signUpData,
                password: passwordHash,
            },
            next
        );
        return await this.#generateToken(createdUser);
    }
};
