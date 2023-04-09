'use strict';
const { signIn } = require('./auth/signIn');
const { signOut } = require('./auth/signOut');
const { signUp } = require('./auth/signUp');

const paths = {
    paths: {
        '/auth/sign-up': signUp,
        '/auth/sign-in': signIn,
        '/auth/sign-out': signOut,
    },
};

module.exports = { paths };
