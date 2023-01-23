'use strict';

const NODE_ENV = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
};

const SequelizeErrors = {
    SequelizeUniqueConstraintError: 'SequelizeUniqueConstraintError',
    SequelizeForeignKeyConstraintError: 'SequelizeForeignKeyConstraintError',
};

module.exports = { NODE_ENV, SequelizeErrors };
