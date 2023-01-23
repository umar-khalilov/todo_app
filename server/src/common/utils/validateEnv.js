'use strict';
const { cleanEnv, num, port, str } = require('envalid');
const { NODE_ENV } = require('../../app/constants');

const validateEnv = async () => {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: [NODE_ENV.DEVELOPMENT, NODE_ENV.PRODUCTION],
        }),
        SERVER_PORT: (port().devDefault = 4000),
        DEBUG_PORT: (port().devDefault = 9229),
        DEPLOY_HOST: str(),
        DB_PORT: (port().default = 5432),
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
        ACCESS_TOKEN_SECRET: str(),
        ACCESS_TOKEN_TIME: str(),
        SALT_ROUNDS: num(),
    });
};

module.exports = { validateEnv };
