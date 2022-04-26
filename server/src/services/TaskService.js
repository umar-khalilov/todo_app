const { Task } = require('../database/models');
const BadRequestError = require('../errors/BadRequestError');
const { paginateResponse } = require('../utils/paginateResponse');
const TaskNotFoundError = require('../errors/TaskNotFoundError');

module.exports = class TaskService {
    static #taskRepository = Task;

    static async createTask(data = {}) {
        const createdTask = await this.#taskRepository.create(data);
        if (!createdTask) {
            throw new BadRequestError();
        }
        return createdTask;
    }

    static async findUserTasks(userInstance = {}, pagination = {}) {
        const { limit, offset, page } = pagination;
        const tasks = await userInstance.getTasks({
            limit,
            offset,
            order: [['updatedAt', 'DESC']],
        });
        return tasks.length
            ? paginateResponse([tasks.length, tasks], page, limit)
            : new TaskNotFoundError();
    }

    static async findAllTasks({ limit, offset, page }) {
        const { count, rows } = await this.#taskRepository.findAndCountAll({
            order: [['updatedAt', 'DESC']],
            limit,
            offset,
        });
        if (count <= 0) {
            throw new TaskNotFoundError();
        }
        return paginateResponse([count, rows], page, limit);
    }

    static async findTaskById(id = 0) {
        const foundTask = await this.#taskRepository.findByPk(id);
        if (!foundTask) {
            throw new TaskNotFoundError();
        }
        return foundTask;
    }

    static async updateTaskById(id = 0, data = {}) {
        const [rows, [foundTask]] = await this.#taskRepository.update(data, {
            where: { id },
            returning: true,
        });
        if (rows === 0) {
            throw new TaskNotFoundError();
        }
        return foundTask;
    }

    static async removeTaskById(id = 0) {
        const task = await this.#taskRepository.destroy({
            where: { id },
        });
        if (task === 0) {
            throw new TaskNotFoundError();
        }
        return `Task with id: ${id} was successfully removed`;
    }
};
