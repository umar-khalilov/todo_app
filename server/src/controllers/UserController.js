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

    static async findOne({ params: { id } }, res, next) {
        try {
            const user = await UserService.findUserById(Number(id));
            return res.status(200).send({ data: user });
        } catch (error) {
            next(error);
        }
    }

    static async updateOne({ params: { id }, body }, res, next) {
        try {
            const updatedUser = await UserService.updateUserById(
                Number(id),
                body,
            );
            return res.status(202).send({ data: updatedUser });
        } catch (error) {
            next(error);
        }
    }

    static async removeOne({ params: { id } }, res, next) {
        try {
            const removedUser = await UserService.removeUserById(Number(id));
            return res.status(204).send({ data: removedUser });
        } catch (error) {
            next(error);
        }
    }
};
