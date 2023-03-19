'use strict';
const { signIn } = require('./auth/signIn');
const { signUp } = require('./auth/signUp');

const paths = {
    paths: {
        '/auth/sign-up': signUp,
        '/auth/sign-in': signIn,
    },
};

module.exports = { paths };
