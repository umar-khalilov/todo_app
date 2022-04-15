require('dotenv').config();
const { verify } = require('jsonwebtoken');
const RightsError = require('../errors/RightsError');

module.exports.verifyToken = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token =
            req.headers.authorization.split(' ')[1] ||
            req.headers['x-access-token'];
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
