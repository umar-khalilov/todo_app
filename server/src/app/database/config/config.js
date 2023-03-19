'use strict';
const { configuration } = require('../../../configs');

module.exports = {
    development: {
        username: configuration.dbUser,
        password: configuration.dbPassword,
        database: configuration.dbName,
        host: configuration.dbHost,
        dialect: configuration.dbDialect,
        migrationStorage: 'json',
        seederStorage: 'json',
        logging: false,
    },
    test: {},
    production: {},
};
