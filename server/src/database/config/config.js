'use strict';
import 'dotenv/config';

const {
    env: {
        POSTGRES_USER,
        POSTGRES_PASSWORD,
        POSTGRES_DB,
        POSTGRES_HOSTNAME,
        DB_DIALECT,
    },
} = process;

export default {
    development: {
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
        host: POSTGRES_HOSTNAME,
        dialect: DB_DIALECT,
        migrationStorage: 'json',
        seederStorage: 'json',
    },
    test: {},
    production: {},
};
