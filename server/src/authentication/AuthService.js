const { generateUUID } = require('metautil');
const { UserService } = require('../users/UserService');
const { HashService } = require('../common/services/HashService');
const { JWTService } = require('../common/services/JWTService');
const { MailService } = require('../common/services/MailService');
const { UserDto } = require('../users/UserDto');
const { RefreshTokenService } = require('../refreshTokens/RefreshTokenService');
const { configuration } = require('../configs');
const {
    UnauthorizedException,
    UserAlreadyExistException,
} = require('../common/exceptions');

class AuthService {
    #userService;
    #hashService;
    #jwtService;
    #refreshTokenService;
    #mailService;
    #config;

    constructor() {
        this.#userService = new UserService();
        this.#hashService = new HashService();
        this.#jwtService = new JWTService();
        this.#refreshTokenService = new RefreshTokenService();
        this.#mailService = new MailService();
        this.#config = configuration;
    }

    async #validateUser(email = '', password = '') {
        const user = await this.#userService.findUserByEmail(email);

        if (
            user &&
            (await this.#hashService.checkIsMatch(password, user?.password))
        ) {
            return user;
        }
        throw new UnauthorizedException();
    }

    async signUp(userAgent = '', data = {}) {
        const candidate = await this.#userService.findUserByEmail(data.email);
        if (candidate) {
            throw new UserAlreadyExistException(candidate.email);
        }

        const uuid = generateUUID();
        const baseLink = `/api/auth/verfication?uuid=${uuid}`;
        const verificationLink = this.#config.serverUrl
            ? `${this.#config.serverUrl}${baseLink}`
            : `http://localhost:${this.#config.serverPort}${baseLink}`;

        const createdUser = await this.#userService.createUser({
            ...data,
            verificationLink,
        });

        await this.#mailService.sendVerificationMail(
            createdUser.email,
            verificationLink,
        );
        const [access, refresh] = await this.#jwtService.generateTokens(
            createdUser,
        );
        const user = new UserDto(createdUser);
        await this.#refreshTokenService.saveToken({
            userId: user.id,
            value: refresh,
            userAgent,
        });
        return { tokens: { access, refresh }, user };
    }

    async signIn(userAgent = '', { email, password }) {
        const signedUser = await this.#validateUser(email, password);
        const [access, refresh] = await this.#jwtService.generateTokens(
            signedUser,
        );
        const user = new UserDto(signedUser);
        await this.#refreshTokenService.saveToken({
            userId: user.id,
            value: refresh,
            userAgent,
        });
        return { tokens: { access, refresh }, user };
    }

    async verificate(verificationLink = '') {
        const user = await this.#userService.findUserByVerificationLink(
            verificationLink,
        );
        user.isVerificated = true;
        await user.save({ fields: ['isVerificated'] });
        return 'User verificated successfully';
    }
}

module.exports = { AuthService };
