const { User, Role } = require('../database/models');
const UserNotFoundException = require('../errors/UserNotFoundException');
const { paginateResponse } = require('../utils/paginateResponse');

class UserService {
    #userRepository = User;
    #roleRepository = Role;

    async findUserByEmail(email = '') {
        const user = await this.#userRepository.scope('withPassword').findOne({
            where: { email },
            include: [
                {
                    model: this.#roleRepository,
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
            : undefined;
    }

    async createUser(data = {}) {
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

    async findAllUsers({ limit, offset, page }) {
        const { count, rows } = await this.#userRepository.findAndCountAll({
            order: [['updatedAt', 'DESC']],
            limit,
            offset,
        });
        if (count <= 0) {
            throw new UserNotFoundException();
        }
        return paginateResponse([count, rows], page, limit);
    }

    async findUserById(id) {
        const user = await this.#userRepository.findByPk(id);
        if (!user) {
            throw new UserNotFoundException();
        }
        return user;
    }

    async updateUserById(id, data = {}) {
        const [rows, [updatedUser]] = await this.#userRepository.update(data, {
            where: { id },
            returning: true,
            individualHooks: true,
        });
        if (rows === 0) {
            throw new UserNotFoundException();
        }
        updatedUser.password = undefined;
        return updatedUser;
    }

    async removeUserById(id = 0) {
        const foundUser = await this.#userRepository.findByPk(id);
        if (!foundUser) {
            throw new UserNotFoundException();
        }

        const roles = await foundUser.getRoles();
        const tasks = await foundUser.getTasks();
        await foundUser.removeRoles(roles);
        await foundUser.removeTasks(tasks);
        await foundUser.destroy();
    }
}

module.exports = UserService;
