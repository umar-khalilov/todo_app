'use strict';
const { join } = require('node:path');
const { config } = require('dotenv');

const result = config({
    path: join(__dirname, '..', '..', `.development.env`),
});

if (result.error) {
    throw result.error;
}

const {
    parsed: {
        NODE_ENV,
        SERVER_PORT,
        DEBUG_PORT,
        DEPLOY_HOST,
        DB_PORT,
        DB_DIALECT,
        DB_HOST,
        DB_USER,
        DB_NAME,
        DB_PASSWORD,
        REDIS_PORT,
        REDIS_HOST,
        REDIS_USERNAME,
        REDIS_PASSWORD,
        CACHE_TTL,
        ACCESS_TOKEN_SECRET,
        ACCESS_TOKEN_TIME,
    },
} = result;

const configuration = Object.freeze({
    nodeEnv: NODE_ENV,
    serverPort: parseInt(SERVER_PORT, 10),
    dbPort: parseInt(DB_PORT, 10),
    debugPort: parseInt(DEBUG_PORT, 10),
    deployHost: DEPLOY_HOST,
    dbHost: DB_HOST,
    dbDialect: DB_DIALECT,
    dbName: DB_NAME,
    dbUser: DB_USER,
    dbPassword: DB_PASSWORD,
    redisPort: parseInt(REDIS_PORT, 10),
    redisHost: REDIS_HOST,
    redisUsername: REDIS_USERNAME,
    redisPassword: REDIS_PASSWORD,
    cacheTTL: parseInt(CACHE_TTL, 10),
    accessTokenSecret: ACCESS_TOKEN_SECRET,
    accessTokenTime: ACCESS_TOKEN_TIME,
});

module.exports = { configuration };
