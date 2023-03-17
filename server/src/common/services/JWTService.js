const { sign, verify } = require('jsonwebtoken');
const { configuration } = require('../../configs');
const {
    TokenException,
    TokenExpiredException,
    TokenMalformedException,
} = require('../exceptions');

class JWTService {
    #accessTokenSecret;
    #accessTokenOptions;

    constructor() {
        this.#accessTokenSecret = configuration.accessTokenSecret;
        this.#accessTokenOptions = {
            algorithm: 'HS384',
            expiresIn: configuration.accessTokenTime,
        };
    }

    async generateAccessJWT(payload = {}) {
        return new Promise((resolve, reject) => {
            sign(
                payload,
                this.#accessTokenSecret,
                this.#accessTokenOptions,
                (err, token) => {
                    if (err) {
                        reject(new TokenException());
                    }
                    resolve(token);
                },
            );
        });
    }

    async verifyAccessJWT(token) {
        return new Promise((resolve, reject) => {
            verify(
                token,
                this.#accessTokenSecret,
                this.#accessTokenOptions,
                (err, decodedData) => {
                    if (err.name === 'TokenExpiredError') {
                        reject(new TokenExpiredException(err.expiredAt));
                    }
                    if (err.name === 'JsonWebTokenError') {
                        reject(new TokenMalformedException());
                    }
                    resolve(decodedData);
                },
            );
        });
    }
}

module.exports = { JWTService };
