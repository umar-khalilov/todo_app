require('dotenv').config();
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const TokenException = require('../errors/TokenException');
const BadRequestException = require('../errors/BadRequestException');
const UserService = require('../users/UserService');
const UnauthorizedException = require('../errors/UnauthorizedException');
const UserAlreadyExistException = require('../errors/UserAlreadyExistException');

class AuthService {
    #userService = new UserService();

    async #generateToken(user = {}) {
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
        throw new TokenException();
    }

    #validateUser = async (email = '', password = '') => {
        if (!(email && password)) {
            throw new BadRequestException('Need email and password');
        }
        const user = await this.#userService.findUserByEmail(email);
        if (user && (await compare(password, user.password))) {
            return user;
        }
        throw new UnauthorizedException();
    };

    signIn = async (signInData = {}) => {
        const { email, password } = signInData;
        const signedUser = await this.#validateUser(email, password);
        return await this.#generateToken(signedUser);
    };

    signUp = async (signUpData = {}) => {
        const candidate = await this.#userService.findUserByEmail(
            signUpData.email,
        );
        if (candidate) {
            throw new UserAlreadyExistException();
        }

        const createdUser = await this.#userService.createUser(signUpData);
        return await this.#generateToken(createdUser);
    };
}

module.exports = AuthService;
