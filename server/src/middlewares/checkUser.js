import User from '../database/models';
import { UserNotFoundException } from '../errors/UserNotFoundException.js';

export const checkUser = async (req, res, next) => {
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
