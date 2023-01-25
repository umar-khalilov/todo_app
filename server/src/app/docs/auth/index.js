'use strict';
const { signUp } = require('./signUp');
const { signIn } = require('./signIn');

const auth = {
    '/auth': {
        ...signUp,
        ...signIn,
    },
};

module.exports = { auth };
