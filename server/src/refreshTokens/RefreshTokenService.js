const { Op } = require('sequelize');
const { RefreshToken } = require('../app/database/models');
const { JWTService } = require('../common/services/JWTService');
const { configuration } = require('../configs');

class RefreshTokenService {
    #tokenRepository;
    #jwtService;
    #maxAmountDevices;

    constructor() {
        this.#tokenRepository = RefreshToken;
        this.#jwtService = new JWTService();
        this.#maxAmountDevices = configuration.maxDevicesAmount;
    }

    async saveToken(payload = {}) {
        const { userId, value } = payload;
        await this.#regulateAmountRefreshTokens(userId);
        const { exp } = this.#jwtService.getTokenPayload(value);
        return this.#tokenRepository.create({ ...payload, expiredIn: exp });
    }

    async #regulateAmountRefreshTokens(userId = 0) {
        const tokens = await this.#tokenRepository.findAll({
            where: { userId },
            order: [['createdAt', 'ASC']],
        });
        if (tokens.length >= this.#maxAmountDevices) {
            const mapOldestTokens = tokens.map((token, index) => {
                ++index;
                if (index < this.#maxAmountDevices) return token.id;
            });
            await this.#removeTokens(mapOldestTokens);
        }
    }

    async removeExpiredTokens() {
        const currentSecond = parseInt(String(Date.now() / 1000), 10);
        return this.#tokenRepository.destroy({
            where: {
                expiredIn: { [Op.lt]: currentSecond },
            },
        });
    }

    async #removeTokens(...ids) {
        await this.#tokenRepository.destroy({
            where: {
                id: [...ids],
            },
        });
    }
}

module.exports = { RefreshTokenService };
