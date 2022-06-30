'use strict';
import 'dotenv/config';
import { verify } from 'jsonwebtoken';
import { RightsException } from '../errors/RightsException.js';

export const verifyToken = async (req, res, next) => {
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
