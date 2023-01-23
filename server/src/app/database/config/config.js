'use strict';
const { configs } = require('../../../configs');

module.exports = {
    development: {
        username: configs.dbUser,
        password: configs.dbPassword,
        database: configs.dbName,
        host: configs.dbHost,
        dialect: configs.dbDialect,
        migrationStorage: 'json',
        seederStorage: 'json',
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
        },
        logging: false,
    },
    test: {},
    production: {},
};
