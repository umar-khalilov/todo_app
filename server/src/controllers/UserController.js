const UserService = require('../services/UserService');

module.exports = class UserController {
    static async findAll({ pagination }, res, next) {
        try {
            const users = await UserService.findAllUsers(pagination);
            return res.status(200).send(users);
        } catch (error) {
            next(error);
        }
    }
};
