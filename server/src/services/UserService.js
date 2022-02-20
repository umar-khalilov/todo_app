const { User, Role } = require('../db/models');
const UserNotFoundError = require('../errors/UserNotFoundError');

module.exports = class UserService {
    static #userRepository = User;
    static #roleRepository = Role;

    static async findUserByEmail(email = '') {
        try {
            return await this.#userRepository.findOne({
                where: { email },
                include: [
                    {
                        model: Role,
                        attributes: ['role'],
                        as: 'roles',
                    },
                ],
            });
        } catch (err) {
            throw new UserNotFoundError('User with this email not found');
        }
    }

    static async createUser(data = {}, next) {
        try {
            const createdUser = await this.#userRepository.create(data);
            const createdRole = await this.#roleRepository.findOne({
                where: { role: data.role },
            });
            createdUser.addRole(createdRole);
            createdRole.addUser(createdUser);
            return await this.#userRepository.findByPk(createdUser.id, {
                include: [
                    {
                        model: Role,
                        attributes: ['role'],
                        as: 'roles',
                    },
                ],
            });
        } catch (err) {
            next(err);
        }
    }
};
