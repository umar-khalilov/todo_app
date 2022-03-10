const { User, Role, Task } = require('../database/models'),
    UserNotFoundError = require('../errors/UserNotFoundError'),
    { paginateResponse } = require('../utils/paginateResponse');

module.exports = class UserService {
    static #userRepository = User;
    static #roleRepository = Role;

    static async findUserByEmail(email = '') {
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
    }

    static async createUser(data = {}) {
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
    }

    static async findAllUsers({ limit, offset, page }) {
        let { count, rows } = await this.#userRepository.findAndCountAll({
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Role,
                    attributes: ['role'],
                },
                {
                    model: Task,
                    as: 'tasks',
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
            roles: item.Roles.map(item => item.role),
            tasks: item.tasks,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }));

        return paginateResponse([count, rows], page, limit);
    }

    static async findUserById(id) {
        const user = await this.#userRepository.findByPk(id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Role,
                    attributes: ['role'],
                },
                {
                    model: Task,
                    as: 'tasks',
                },
            ],
        });
        if (!user) {
            throw new UserNotFoundError();
        }
        return user;
    }
};
