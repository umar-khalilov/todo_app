'use strict';
const { User } = require('../../app/database/models');
const { UserNotFoundException } = require('../exceptions');

const checkUser = async (req, res, next) => {
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

module.exports = { checkUser };
