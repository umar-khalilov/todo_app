require('dotenv').config();
const {
    env: {
        POSTGRES_USER,
        POSTGRES_PASSWORD,
        POSTGRES_DB,
        POSTGRES_HOSTNAME,
        DB_DIALECT,
        POSTGRES_DB_PORT,
    },
} = process;

module.exports = {
    development: {
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
        host: POSTGRES_HOSTNAME,
        dialect: DB_DIALECT,
        port: POSTGRES_DB_PORT,
        migrationStorage: 'json',
        seederStorage: 'json',
    },
    test: {},
    production: {},
};
