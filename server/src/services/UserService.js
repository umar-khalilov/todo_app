const { User, Role } = require('../database/models');
const UserNotFoundError = require('../errors/UserNotFoundError');
const { paginateResponse } = require('../utils/paginateResponse');

module.exports = class UserService {
    static #userRepository = User;
    static #roleRepository = Role;

    static async findUserByEmail(email = '') {
        const user = await this.#userRepository.scope('withPassword').findOne({
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

        rows = rows.map(user => ({
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            birthday: user.birthday,
            isMale: user.isMale,
            roles: user.roles.map(({ name }) => name),
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
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
        const [rows, [updatedUser]] = await this.#userRepository.update(data, {
            where: { id },
            returning: true,
            individualHooks: true,
        });
        if (rows === 0) {
            throw new UserNotFoundError();
        }
        updatedUser.password = undefined;
        return updatedUser;
    }

    static async removeUserById(id) {
        const foundUser = await this.#userRepository.findByPk(id);
        if (!foundUser) {
            throw new UserNotFoundError();
        }

        const roles = await foundUser.getRoles();
        const tasks = await foundUser.getTasks();
        await foundUser.removeRoles(roles);
        await foundUser.removeTasks(tasks);
        await foundUser.destroy();
        return `User with id: ${id} was successfully removed`;
    }
};
