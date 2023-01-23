const { User, Role } = require('../app/database/models');
const { paginateResponse } = require('../common/utils/paginateResponse');
const {
    UserNotFoundException,
    UsersNotFoundException,
} = require('../common/exceptions');

module.exports = class UserService {
    #userRepository;
    #roleRepository;

    constructor() {
        this.#userRepository = User;
        this.#roleRepository = Role;
    }

    async findUserByEmail(email) {
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
            : null;
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

    async findAllUsers({ limit, offset, page, sort }) {
        const { count, rows } = await this.#userRepository.findAndCountAll({
            order: [['name', sort]],
            limit,
            offset,
            distinct: true,
        });
        if (count === 0) {
            throw new UsersNotFoundException();
        }
        return paginateResponse([count, rows], page, limit);
    }

    async findUserById(id) {
        const user = await this.#userRepository.findByPk(id);
        if (!user) {
            throw new UserNotFoundException(id);
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
            throw new UserNotFoundException(id);
        }
        // updatedUser.password = undefined;
        return updatedUser;
    }

    async removeUserById(id) {
        const foundUser = await this.#userRepository.findByPk(id);
        if (!foundUser) {
            throw new UserNotFoundException(id);
        }

        const roles = await foundUser.getRoles();
        const tasks = await foundUser.getTasks();
        await foundUser.removeRoles(roles);
        await foundUser.removeTasks(tasks);
        await foundUser.destroy();
    }
};
