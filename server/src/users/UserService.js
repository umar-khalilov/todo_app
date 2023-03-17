const { User, Role } = require('../app/database/models');
const { paginateResponse } = require('../common/utils/helpers');
const {
    UserNotFoundException,
    UsersNotFoundException,
} = require('../common/exceptions');

class UserService {
    #userRepository;
    #roleRepository;

    constructor() {
        this.#userRepository = User;
        this.#roleRepository = Role;
    }

    async createUser(data = {}) {
        const createdUser = await this.#userRepository.create(data);
        const roleUser = await this.#roleRepository.findOne({
            where: { name: 'user' },
        });
        await createdUser.addRole(roleUser);

        await createdUser.reload();
        console.log(createdUser);
        return {
            ...createdUser,
            roles: [roleUser],
        };
    }

    async findUserByEmail(email = '') {
        return this.#userRepository.scope('withPassword').findOne({
            where: { email },
            include: [
                {
                    model: this.#roleRepository,
                    attributes: ['name'],
                    as: 'roles',
                },
            ],
        });
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

    async findUserById(id = 0) {
        const user = await this.#userRepository.findByPk(id);
        if (!user) {
            throw new UserNotFoundException(id);
        }
        return user;
    }

    async updateUserById(id = 0, data = {}) {
        const [rows, [updatedUser]] = await this.#userRepository.update(data, {
            where: { id },
            returning: true,
            individualHooks: true,
        });
        if (rows === 0) {
            throw new UserNotFoundException(id);
        }
        return updatedUser;
    }

    async removeUserById(id = 0) {
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
}

module.exports = { UserService };
