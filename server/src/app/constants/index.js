'use strict';

const NODE_ENV = Object.freeze({
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
});

const SequelizeErrors = Object.freeze({
    SequelizeUniqueConstraintError: 'SequelizeUniqueConstraintError',
    SequelizeForeignKeyConstraintError: 'SequelizeForeignKeyConstraintError',
});

module.exports = { NODE_ENV, SequelizeErrors };
