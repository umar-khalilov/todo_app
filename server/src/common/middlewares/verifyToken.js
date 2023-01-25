'use strict';
const { TokenService } = require('../utils/TokenService');
const { RightsException } = require('../exceptions');

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
        req.user = new TokenService().verifyAccessToken(token);
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { verifyToken };
