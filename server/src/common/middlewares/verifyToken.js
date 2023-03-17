'use strict';
const { JWTService } = require('../services/JWTService');
const { RightsException } = require('../exceptions');

const verifyToken = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const [bearer, token] = req.headers.authorization.split(' ');
        if (bearer !== 'Bearer' || !token) {
            throw new RightsException('User is not authorizated');
        }
        req.locals.user = await new JWTService().verifyAccessJWT(token);
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { verifyToken };
