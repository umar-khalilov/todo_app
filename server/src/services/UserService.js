const { User, Role } = require('../db/models');
const UserNotFoundError = require('../errors/UserNotFoundError');

module.exports = class UserService {
    static #userRepository = User;
    static #roleRepository = Role;

    static async findUserByEmail (emailUser, next) {
        try {
            const foundUser = await this.#userRepository.findOne({
                where: { email: emailUser },
                include: [
                    {
                        model: Role,
                        attributes: ['role'],
                    },
                ],
            });
            const response = {
                id: foundUser.id,
                email: foundUser.email,
                roles: foundUser.Roles.map(item => item.role),
            };
            console.log(response);
            return response;
        } catch (err) {
            next(err);
        }
    }

    static async createUser (data = {}, next) {
        try {
            const createdUser = await this.#userRepository.create(data);
            const roleUser = await this.#roleRepository.findOne({
                where: { role: 'user' },
            });
            createdUser.addRole(roleUser);

            return {
                id: createdUser.id,
                email: createdUser.email,
                role: roleUser.role,
            };
        } catch (err) {
            next(err);
        }
    }
};
