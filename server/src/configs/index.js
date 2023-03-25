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
        SERVER_URL,
        CLIENT_URL,
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
        JWT_ACCESS_TOKEN_SECRET,
        JWT_ACCESS_TOKEN_EXPIRATION_TIME,
        JWT_REFRESH_TOKEN_SECRET,
        JWT_REFRESH_TOKEN_EXPIRATION_TIME,
        MAX_DEVICES_AMOUNT,
        SMTP_HOST,
        SMTP_PORT,
        SMTP_USERNAME,
        SMTP_PASSWORD,
    },
} = result;

const configuration = Object.freeze({
    nodeEnv: NODE_ENV,
    serverPort: parseInt(SERVER_PORT, 10),
    dbPort: parseInt(DB_PORT, 10),
    debugPort: parseInt(DEBUG_PORT, 10),
    serverUrl: SERVER_URL,
    clientUrl: CLIENT_URL,
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
    accessJWTSecret: JWT_ACCESS_TOKEN_SECRET,
    accessJWTTime: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    refreshJWTSecret: JWT_REFRESH_TOKEN_SECRET,
    refreshJWTTime: JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    maxDevicesAmount: parseInt(MAX_DEVICES_AMOUNT, 10),
    smtpHost: SMTP_HOST,
    smtpPort: parseInt(SMTP_PORT, 10),
    smtpUsername: SMTP_USERNAME,
    smtpPassword: SMTP_PASSWORD,
});

module.exports = { configuration };
