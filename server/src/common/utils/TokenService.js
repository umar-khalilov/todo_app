const { sign, verify } = require('jsonwebtoken');
const { configuration } = require('../../configs');
const {
    TokenException,
    TokenExpiredException,
    TokenMalformedException,
} = require('../exceptions');

class TokenService {
    #accessTokenSecret;
    #accessTokenOptions;

    constructor() {
        this.#accessTokenSecret = configuration.accessTokenSecret;
        this.#accessTokenOptions = {
            algorithm: 'HS384',
            expiresIn: configuration.accessTokenTime,
        };
    }

    async generateAccessToken(payload = {}) {
        let accessToken;
        sign(
            payload,
            this.#accessTokenSecret,
            this.#accessTokenOptions,
            (err, token) => {
                if (err) {
                    throw new TokenException();
                }
                accessToken = token;
            },
        );
        return accessToken;
    }

    async verifyAccessToken(token) {
        let decodedData;
        verify(
            token,
            this.#accessTokenSecret,
            this.#accessTokenOptions,
            (err, decoded) => {
                if (err.name === 'TokenExpiredError') {
                    throw new TokenExpiredException(err.expiredAt);
                }
                if (err.name === 'JsonWebTokenError') {
                    throw new TokenMalformedException();
                }
                decodedData = decoded;
            },
        );
        return decodedData;
    }
}

module.exports = { TokenService };
