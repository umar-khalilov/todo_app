'use strict';
const { cleanEnv, num, port, str } = require('envalid');

module.exports.validateEnv = () =>
    cleanEnv(process.env, {
        PORT: port(),
        DB_DIALECT: str(),
        POSTGRES_HOSTNAME: str(),
        POSTGRES_USER: str(),
        POSTGRES_PASSWORD: str(),
        POSTGRES_DB_PORT: num(),
        POSTGRES_DB: str(),
        ACCESS_TOKEN_SECRET: str(),
        ACCESS_TOKEN_TIME: str(),
        SALT_ROUNDS: num(),
    });
