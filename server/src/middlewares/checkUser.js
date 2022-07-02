'use strict';
const { User } = require('../database/models');
const UserNotFoundException = require('../errors/UserNotFoundException');

module.exports.checkUser = async (req, res, next) => {
    try {
        const {
            params: { id },
        } = req;
        const userInstance = await User.findByPk(+id);
        if (!userInstance) {
            throw new UserNotFoundException();
        }
        req.userInstance = userInstance;
        next();
    } catch (err) {
        next(err);
    }
};
