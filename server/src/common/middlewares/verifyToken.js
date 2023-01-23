'use strict';
const { verify } = require('jsonwebtoken');
const { RightsException } = require('../exceptions');
const { configuration } = require('../../configs');

const verifyToken = async (req, res, next) => {
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
        req.user = verify(token, configuration.accessTokenSecret);
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { verifyToken };
