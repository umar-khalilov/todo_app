const { User, Role } = require('../db/models');
const UserNotFoundError = require('../errors/UserNotFoundError');

module.exports = class UserService {
    static #userRepository = User;
    static #roleRepository = Role;

    static async findUserByEmail (email, next) {
        try {
            const user = await this.#userRepository.findOne({
                where: { email },
                include: [
                    {
                        model: Role,
                        attributes: ['role'],
                    },
                ],
            });

            return user
                ? {
                      id: user.id,
                      email: user.email,
                      password: user.password,
                      roles: user.Roles.map(elem => elem.role),
                  }
                : null;
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
                roles: [roleUser.role],
            };
        } catch (err) {
            next(err);
        }
    }
};
