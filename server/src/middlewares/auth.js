'use strict';
require('dotenv').config();
const { verify } = require('jsonwebtoken'),
    RightsError = require('../errors/RighstError');

module.exports.verifyToken = async (req, res, next) => {
    try {
        if (req.method === 'OPTIONS') {
            next();
        }

        const token =
            req.body.token || req.query.token || req.headers['x-access-token'];
        if (!token) {
            throw new RightsError();
        }

        const {
            env: { REFRESH_TOKEN_SECRET },
        } = process;

        const decoded = verify(token, REFRESH_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};
