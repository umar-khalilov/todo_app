const { User } = require('../database/models');
const UserNotFoundError = require('../errors/UserNotFoundError');

module.exports.checkUser = async (req, res, next) => {
    try {
        const {
            params: { id },
        } = req;
        const userInstance = await User.findByPk(+id);
        if (!userInstance) {
            throw new UserNotFoundError();
        }
        req.userInstance = userInstance;
        next();
    } catch (err) {
        next(err);
    }
};
