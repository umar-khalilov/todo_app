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
                    as: 'roles',
                },
            ],
        });

        return user
            ? {
                  id: user.id,
                  email: user.email,
                  password: user.password,
                  roles: user.roles.map(elem => elem.role),
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
            include: [
                {
                    model: Task,
                    as: 'tasks',
                },
                {
                    model: Role,
                    attributes: ['role'],
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
            tasks: item.tasks,
            roles: item.roles.map(item => item.role),
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }));

        return paginateResponse([count, rows], page, limit);
    }

    static async findUserById(id) {
        let user = await this.#userRepository.findByPk(id, {
            include: [
                {
                    model: Task,
                    as: 'tasks',
                },
                {
                    model: Role,
                    attributes: ['role'],
                    through: { attributes: [] },
                    as: 'roles',
                },
            ],
        });

        if (!user) {
            throw new UserNotFoundError();
        }

        user = {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            birthday: user.birthday,
            isMale: user.isMale,
            tasks: user.tasks,
            roles: user.roles.map(item => item.role),
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        return user;
    }

    static async updateUserById(id, data = {}) {
        const foundUser = await this.#userRepository.findByPk(id);
        if (!foundUser) {
            throw new UserNotFoundError();
        }
        return await foundUser.update(data);
    }

    static async removeUserById(id) {
        const removedUser = await this.#userRepository.destroy({
            where: { id },
            force: true,
        });
        if (removedUser === 0) {
            throw new UserNotFoundError();
        }

        return 'This user successfully removed';
    }
};
