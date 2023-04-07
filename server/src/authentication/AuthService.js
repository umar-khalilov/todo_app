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
    NotFoundException,
} = require('../common/exceptions');
const { LoggerService } = require('../common/services/LoggerService');

class AuthService {
    #userService;
    #hashService;
    #jwtService;
    #refreshTokenService;
    #mailService;
    #config;
    #logger;

    constructor() {
        this.#logger = new LoggerService(AuthService.name);
        this.#userService = new UserService();
        this.#hashService = new HashService();
        this.#jwtService = new JWTService();
        this.#refreshTokenService = new RefreshTokenService();
        this.#mailService = new MailService();
        this.#config = configuration;
        this.#logger.log('Initialized');
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
        const baseLink = `/api/auth/verification/${uuid}`;
        const verificationLink = this.#config.serverUrl
            ? `${this.#config.serverUrl}${baseLink}`
            : `http://localhost:${this.#config.serverPort}${baseLink}`;

        const createdUser = await this.#userService.createUser({
            ...data,
            verificationUuid: uuid,
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

    async verificateUser(verificationUuid = '') {
        const user = await this.#userService.findUserByVerificationUUID(
            verificationUuid,
        );
        user.isVerificated = true;
        user.verificationUuid = null;
        await user.save({ fields: ['isVerificated', 'verificationUuid'] });
        return 'User verificated successfully';
    }

    async refreshSession(refreshToken) {
        if (!refreshToken) {
            throw new UnauthorizedException('User is not authorizated');
        }
        const userData = await this.#jwtService.verifyRefreshJWT(refreshToken);
        const tokenFromDb = await this.#refreshTokenService.findToken(
            refreshToken,
        );

        if (!userData || !tokenFromDb) {
            throw new UnauthorizedException('User is not authorizated');
        }

        const userFromDb = await this.#userService.findUserByEmail(
            userData.email,
        );
        if (!userFromDb) {
            throw new NotFoundException(
                `User with that email: ${userData.email} not found`,
            );
        }

        const [access, refresh] = await this.#jwtService.generateTokens(
            userFromDb,
        );

        const hashedToken = await this.#hashService.hashValue(refresh);
        await tokenFromDb.update({
            value: hashedToken,
        });

        const user = new UserDto(userFromDb);
        return { tokens: { access, refresh }, user };
    }
}

module.exports = { AuthService };
