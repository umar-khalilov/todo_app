const { sign } = require('jsonwebtoken');
const UserService = require('../users/UserService');
const HashService = require('../common/utils/HashService');
const { configuration } = require('../configs');
const {
    BadRequestException,
    TokenException,
    UnauthorizedException,
    UserAlreadyExistException,
} = require('../common/exceptions');

module.exports = class AuthService {
    #userService;
    #hashService;

    constructor() {
        this.#userService = new UserService();
        this.#hashService = new HashService();
    }

    async #generateToken(user = {}) {
        if (user.id && user.email && user.roles.length) {
            const payload = {
                id: user.id,
                email: user.email,
                roles: user.roles,
            };

            return {
                accessToken: await sign(
                    payload,
                    configuration.accessTokenSecret,
                    {
                        algorithm: 'HS384',
                        expiresIn: configuration.accessTokenTime,
                    },
                ),
            };
        }
        throw new TokenException();
    }

    async #validateUser(email, password) {
        if (!(email && password)) {
            throw new BadRequestException('Need email and password');
        }
        const user = await this.#userService.findUserByEmail(email);
        const isMatch = await this.#hashService.checkIsMatch(
            password,
            user.password,
        );
        if (user && isMatch) {
            return user;
        }
        throw new UnauthorizedException();
    }

    async signIn(signInData = {}) {
        const { email, password } = signInData;
        const signedUser = await this.#validateUser(email, password);
        return this.#generateToken(signedUser);
    }

    async signUp(signUpData = {}) {
        const candidate = await this.#userService.findUserByEmail(
            signUpData.email,
        );
        if (candidate) {
            throw new UserAlreadyExistException(candidate.email);
        }

        const createdUser = await this.#userService.createUser(signUpData);
        return this.#generateToken(createdUser);
    }
};
