'use strict';
const { config } = require('dotenv');

config({ path: __dirname + `/../../.env.${process.env.NODE_ENV}` });

const {
    env: {
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
        SALT_ROUNDS,
    },
} = process;

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
    saltRounds: parseInt(SALT_ROUNDS, 10),
});

module.exports = { configuration };
