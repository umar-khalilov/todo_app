const { Task } = require('../database/models');
const BadRequestError = require('../errors/BadRequestError');
const { paginateResponse } = require('../utils/paginateResponse');

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
            : 'Tasks not found';
    }
};
