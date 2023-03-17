const { UserService } = require('../users/UserService');
const { HashService } = require('../common/services/HashService');
const { JWTService } = require('../common/services/JWTService');
const {
    TokenException,
    UnauthorizedException,
    UserAlreadyExistException,
} = require('../common/exceptions');
const { omit } = require('../common/utils/helpers');

class AuthService {
    #userService;
    #hashService;
    #jwtService;

    constructor() {
        this.#userService = new UserService();
        this.#hashService = new HashService();
        this.#jwtService = new JWTService();
    }

    async #generateTokens(user = {}) {
        if (user.id && user.email && user.roles.length) {
            const payload = {
                sub: user.id,
                email: user.email,
                roles: user.roles.map(({ value }) => value),
            };

            return {
                accessToken: await this.#jwtService.generateAccessJWT(payload),
            };
        }
        throw new TokenException();
    }

    async #validateUser(email = '', password = '') {
        const user = await this.#userService.findUserByEmail(email);
        const isMatch = await this.#hashService.checkIsMatch(
            password,
            user?.password,
        );
        if (user && isMatch) {
            return user;
        }
        throw new UnauthorizedException();
    }

    async signUp(data = {}) {
        const candidate = await this.#userService.findUserByEmail(data.email);
        if (candidate) {
            throw new UserAlreadyExistException(candidate.email);
        }
        const createdUser = await this.#userService.createUser(data);
        const tokens = await this.#generateTokens(createdUser);
        const cuttedUser = omit(createdUser, 'roles');
        return { tokens, user: cuttedUser };
    }

    async signIn({ email, password }) {
        const signedUser = await this.#validateUser(email, password);
        const tokens = await this.#generateTokens(signedUser);
        const cuttedUser = omit(signedUser, 'roles', 'password');
        return { tokens, user: cuttedUser };
    }
}

module.exports = { AuthService };
