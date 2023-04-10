'use strict';
const { JWTService } = require('../services/JWTService');
const { UnauthorizedException } = require('../exceptions');

const verifyAccessToken = async ({ headers: { authorization } }, res, next) => {
    try {
        const [bearer, token] = authorization.split(' ');
        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException('User is not authorizated');
        }
        res.locals.accessTokenData = await new JWTService().verifyAccessJWT(
            token,
        );
        next();
    } catch (error) {
        next(error);
    }
};

const verifyRefreshToken = async ({ body: { refresh } }, res, next) => {
    try {
        if (!refresh) {
            throw new UnauthorizedException('User is not authorizated');
        }
        res.locals.refreshTokenData = await new JWTService().verifyRefreshJWT(
            refresh,
        );
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { verifyAccessToken, verifyRefreshToken };
