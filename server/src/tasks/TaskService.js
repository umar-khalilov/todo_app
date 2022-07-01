const { Task } = require('../database/models');
const BadRequestException = require('../errors/BadRequestException');
const TaskNotFoundException = require('../errors/TaskNotFoundException');
const { paginateResponse } = require('../utils/paginateResponse');

class TaskService {
    #taskRepository = Task;

    async createTask(data = {}) {
        const createdTask = await this.#taskRepository.create(data);
        if (!createdTask) {
            throw new BadRequestException();
        }
        return createdTask;
    }

    async findUserTasks(userInstance = {}, pagination = {}) {
        const { limit, offset, page } = pagination;
        const tasks = await userInstance.getTasks({
            limit,
            offset,
            order: [['updatedAt', 'DESC']],
        });
        return tasks.length
            ? paginateResponse([tasks.length, tasks], page, limit)
            : new TaskNotFoundException();
    }

    async findAllTasks({ limit, offset, page }) {
        const { count, rows } = await this.#taskRepository.findAndCountAll({
            order: [['updatedAt', 'DESC']],
            limit,
            offset,
        });
        if (count <= 0) {
            throw new TaskNotFoundException();
        }
        return paginateResponse([count, rows], page, limit);
    }

    async findTaskById(id = 0) {
        const foundTask = await this.#taskRepository.findByPk(id);
        if (!foundTask) {
            throw new TaskNotFoundException();
        }
        return foundTask;
    }

    async updateTaskById(id = 0, data = {}) {
        const [rows, [foundTask]] = await this.#taskRepository.update(data, {
            where: { id },
            returning: true,
        });
        if (rows === 0) {
            throw new TaskNotFoundException();
        }
        return foundTask;
    }

    async removeTaskById(id = 0) {
        const task = await this.#taskRepository.destroy({
            where: { id },
        });
        if (task === 0) {
            throw new TaskNotFoundException();
        }
        return `Task with id: ${id} was successfully removed`;
    }
}

module.exports = TaskService;
