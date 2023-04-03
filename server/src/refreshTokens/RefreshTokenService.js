const { Op } = require('sequelize');
const { RefreshToken } = require('../app/database/models');
const { HashService } = require('../common/services/HashService');
const { JWTService } = require('../common/services/JWTService');
const { UnauthorizedException } = require('../common/exceptions');
const { configuration } = require('../configs');

class RefreshTokenService {
    #tokenRepository;
    #jwtService;
    #hashService;
    #maxAmountDevices;

    constructor() {
        this.#tokenRepository = RefreshToken;
        this.#jwtService = new JWTService();
        this.#hashService = new HashService();
        this.#maxAmountDevices = configuration.maxDevicesAmount;
    }

    async saveToken(payload = {}) {
        const { userId, value } = payload;
        await this.#regulateAmountRefreshTokens(userId);
        const { exp } = await this.#jwtService.getTokenPayload(value);
        const hashedToken = await this.#hashService.hashValue(value);
        return this.#tokenRepository.create({
            ...payload,
            value: hashedToken,
            expiresIn: exp,
        });
    }

    async findToken(token = '') {
        const hashedToken = await this.#hashService.hashValue(token);
        const tokenInstance = await this.#tokenRepository.findOne({
            where: { value: hashedToken },
        });
        if (hashedToken === tokenInstance?.value) {
            return tokenInstance;
        }
    }

    async #regulateAmountRefreshTokens(userId = 0) {
        const tokens = await this.#tokenRepository.findAll({
            where: { userId },
            order: [['createdAt', 'ASC']],
        });
        if (tokens.length >= this.#maxAmountDevices) {
            const mapOldestTokens = tokens.reduce(
                (acc = [], currentToken, index) => {
                    ++index;
                    if (index < this.#maxAmountDevices) {
                        acc.push(currentToken.id);
                    }
                    return acc;
                },
                [],
            );
            await this.removeTokens(mapOldestTokens);
        }
    }

    async removeExpiredTokens() {
        const currentSecond = parseInt(String(Date.now() / 1000), 10);
        await this.#tokenRepository.destroy({
            where: {
                expiresIn: { [Op.lt]: currentSecond },
            },
        });
    }

    async removeTokens(ids = [0]) {
        await this.#tokenRepository.destroy({
            where: {
                id: ids,
            },
        });
    }

    async removeToken(token = '') {
        const hashedToken = await this.#hashService.hashValue(token);
        const tokenInstance = await this.#tokenRepository.findOne({
            where: { value: hashedToken },
        });
        if (hashedToken === tokenInstance?.value) {
            await tokenInstance.destroy();
        } else {
            throw new UnauthorizedException('User is not authorizated');
        }
    }
}

module.exports = { RefreshTokenService };
