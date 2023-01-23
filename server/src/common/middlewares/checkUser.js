'use strict';
const UserService = require('../../users/UserService');

const checkUser = async (req, res, next) => {
    try {
        const {
            params: { userId },
        } = req;
        await new UserService().findUserById(userId);
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = { checkUser };
