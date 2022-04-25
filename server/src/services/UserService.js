const { User, Role, Task } = require('../database/models');
const UserNotFoundError = require('../errors/UserNotFoundError');
const { paginateResponse } = require('../utils/paginateResponse');

module.exports = class UserService {
    static #userRepository = User;
    static #roleRepository = Role;

    static async findUserByEmail(email = '') {
        const user = await this.#userRepository.findOne({
            where: { email },
            include: [
                {
                    model: Role,
                    attributes: ['name'],
                    as: 'roles',
                },
            ],
        });

        return user
            ? {
                  id: user.id,
                  email: user.email,
                  password: user.password,
                  roles: user.roles.map(({ name }) => name),
              }
            : null;
    }

    static async createUser(data = {}) {
        const createdUser = await this.#userRepository.create(data);
        const roleUser = await this.#roleRepository.findOne({
            where: { name: 'user' },
        });
        await createdUser.addRole(roleUser);

        return {
            id: createdUser.id,
            email: createdUser.email,
            roles: [roleUser.name],
        };
    }

    static async findAllUsers({ limit, offset, page }) {
        let { count, rows } = await this.#userRepository.findAndCountAll({
            include: [
                {
                    model: Role,
                    attributes: ['name'],
                    through: { attributes: [] },
                    as: 'roles',
                },
            ],
            order: [['updatedAt', 'DESC']],
            limit,
            offset,
        });
        if (count <= 0) {
            throw new UserNotFoundError();
        }

        rows = rows.map(item => ({
            id: item.id,
            name: item.name,
            surname: item.surname,
            email: item.email,
            birthday: item.birthday,
            isMale: item.isMale,
            roles: item.roles.map(({ name }) => name),
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }));

        return paginateResponse([count, rows], page, limit);
    }

    static async findUserById(id) {
        const user = await this.#userRepository.findByPk(id, {
            include: [
                {
                    model: Role,
                    attributes: ['name'],
                    through: { attributes: [] },
                    as: 'roles',
                },
            ],
        });

        if (!user) {
            throw new UserNotFoundError();
        }

        return {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            birthday: user.birthday,
            isMale: user.isMale,
            roles: user.roles.map(({ name }) => name),
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }

    static async updateUserById(id, data = {}) {
        const foundUser = await this.#userRepository.findByPk(id);
        if (!foundUser) {
            throw new UserNotFoundError();
        }
        return await foundUser.update(data);
    }

    static async removeUserById(id) {
        const removedUser = await this.#userRepository.findByPk(id);
        if (!removedUser) {
            throw new UserNotFoundError();
        }

        const roles = await removedUser.getRoles();
        const tasks = await removedUser.getTasks();
        await removedUser.removeRoles(roles);
        await removedUser.removeTasks(tasks);
        await removedUser.destroy();
        return `User with id: ${id} was successfully removed`;
    }
};
