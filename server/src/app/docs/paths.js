'use strict';
const { auth } = require('./auth');

const paths = {
    paths: {
        ...auth,
    },
};

module.exports = { paths };
