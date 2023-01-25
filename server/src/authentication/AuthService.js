const UserService = require('../users/UserService');
const { HashService } = require('../common/utils/HashService');
const { TokenService } = require('../common/utils/TokenService');
const {
    BadRequestException,
    TokenException,
    UnauthorizedException,
    UserAlreadyExistException,
} = require('../common/exceptions');

module.exports = class AuthService {
    #userService;
    #hashService;
    #tokenService;

    constructor() {
        this.#userService = new UserService();
        this.#hashService = new HashService();
        this.#tokenService = new TokenService();
    }

    async #generateToken(user = {}) {
        if (user.id && user.email && user.roles.length) {
            const payload = {
                id: user.id,
                email: user.email,
                roles: user.roles,
            };

            return {
                accessToken: await this.#tokenService.generateAccessToken(
                    payload,
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

    async signIn({ email, password }) {
        const signedUser = await this.#validateUser(email, password);
        return this.#generateToken(signedUser);
    }

    async signUp(data = {}) {
        const candidate = await this.#userService.findUserByEmail(data.email);
        if (candidate) {
            throw new UserAlreadyExistException(candidate.email);
        }
        const createdUser = await this.#userService.createUser(data);
        return this.#generateToken(createdUser);
    }
};
