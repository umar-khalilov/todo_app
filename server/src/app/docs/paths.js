'use strict';
const { refreshSession } = require('./auth/refreshSession');
const { signIn } = require('./auth/signIn');
const { signOut } = require('./auth/signOut');
const { signUp } = require('./auth/signUp');
const { verificate } = require('./auth/verificate');

const paths = {
    paths: {
        '/auth/sign-up': signUp,
        '/auth/sign-in': signIn,
        '/auth/sign-out': signOut,
        '/auth/refresh-session': refreshSession,
        '/auth/verification/{uuid}': verificate,
    },
};

module.exports = { paths };
