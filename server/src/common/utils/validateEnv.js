'use strict';
const { cleanEnv, num, port, str } = require('envalid');
const { NODE_ENV } = require('../../app/constants');

const validateEnv = async () => {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: [NODE_ENV.DEVELOPMENT, NODE_ENV.PRODUCTION],
        }),
        SERVER_PORT: port(),
        DEBUG_PORT: port(),
        DEPLOY_HOST: str(),
        DB_PORT: port(),
        DB_DIALECT: str(),
        DB_HOST: str(),
        DB_USER: str(),
        DB_NAME: str(),
        DB_PASSWORD: str(),
        REDIS_PORT: port(),
        REDIS_HOST: str(),
        REDIS_USERNAME: str(),
        REDIS_PASSWORD: str(),
        CACHE_TTL: num(),
        JWT_ACCESS_TOKEN_SECRET: str(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: str(),
        JWT_REFRESH_TOKEN_SECRET: str(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: str(),
    });
};

module.exports = { validateEnv };
