'use strict';
require('dotenv').config();
const { verify } = require('jsonwebtoken');
const RightsException = require('../errors/RightsException');

module.exports.verifyToken = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token =
            req.headers.authorization.split(' ')[1] ||
            req.headers['x-access-token'];
        if (!token) {
            throw new RightsException();
        }

        const {
            env: { REFRESH_TOKEN_SECRET },
        } = process;

        req.user = verify(token, REFRESH_TOKEN_SECRET);
        next();
    } catch (error) {
        next(error);
    }
};
