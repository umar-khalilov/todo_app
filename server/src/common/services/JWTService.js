const { sign, verify } = require('jsonwebtoken');
const { configuration } = require('../../configs');
const {
    TokenException,
    TokenExpiredException,
    TokenMalformedException,
} = require('../exceptions');

class JWTService {
    #accessJwtSecret;
    #refreshJwtSecret;
    #accessJwtOptions;
    #refreshJwtOptions;

    constructor() {
        this.#accessJwtSecret = configuration.accessJWTSecret;
        this.#refreshJwtSecret = configuration.refreshJWTSecret;
        this.#accessJwtOptions = {
            algorithm: 'HS384',
            expiresIn: configuration.accessJWTTime,
        };
        this.#refreshJwtOptions = {
            algorithm: 'HS384',
            expiresIn: configuration.refreshJWTTime,
        };
    }

    async generateAccessJWT(payload = {}) {
        return new Promise((resolve, reject) => {
            sign(
                payload,
                this.#accessJwtSecret,
                this.#accessJwtOptions,
                (err, token) => {
                    if (err) {
                        reject(new TokenException());
                    }
                    resolve(token);
                },
            );
        });
    }

    async generateRefreshJWT(payload = {}) {
        return new Promise((resolve, reject) => {
            sign(
                payload,
                this.#refreshJwtSecret,
                this.#refreshJwtOptions,
                (err, token) => {
                    if (err) {
                        reject(new TokenException());
                    }
                    resolve(token);
                },
            );
        });
    }

    async verifyAccessJWT(token = '') {
        return new Promise((resolve, reject) => {
            verify(
                token,
                this.#accessJwtSecret,
                this.#accessJwtOptions,
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
