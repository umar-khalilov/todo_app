'use strict';
const UserService = require('../../users/UserService');

const checkUser = async ({ params: { userId } }, res, next) => {
    try {
        await new UserService().findUserById(userId);
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = { checkUser };
