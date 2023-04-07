const { Task } = require('../app/database/models');
const { paginateResponse } = require('../common/utils/helpers');
const {
    BadRequestException,
    NotFoundException,
} = require('../common/exceptions');
const { LoggerService } = require('../common/services/LoggerService');

class TaskService {
    #taskRepository;
    #logger;

    constructor() {
        this.#logger = new LoggerService(TaskService.name);
        this.#taskRepository = Task;
        this.#logger.log('Initialized');
    }

    async createTask(userId = 0, taskData = {}) {
        const createdTask = await this.#taskRepository.create({
            userId,
            ...taskData,
        });
        if (!createdTask) {
            throw new BadRequestException();
        }
        return createdTask;
    }

    async findUserTasks(userId, pagination = {}) {
        const { limit, offset, page, sort } = pagination;
        const { count, rows } = await this.#taskRepository.findAndCountAll({
            where: {
                userId,
            },
            order: [['title', sort]],
            limit,
            offset,
        });
        if (count === 0) {
            throw new NotFoundException(
                `No tasks found for user with that userId: ${userId}`,
            );
        }
        return paginateResponse([count, rows], page, limit);
    }

    async findAllTasks({ limit, offset, page }) {
        const { count, rows } = await this.#taskRepository.findAndCountAll({
            order: [['updatedAt', 'DESC']],
            limit,
            offset,
        });
        if (count === 0) {
            throw new NotFoundException('No found tasks in database');
        }
        return paginateResponse([count, rows], page, limit);
    }

    async findTaskByIds(userId, taskId) {
        const foundTask = await this.#taskRepository.findAll({
            where: { userId, id: taskId },
        });
        if (!foundTask.length) {
            throw new NotFoundException(
                `Task with that taskId: ${taskId} not found`,
            );
        }
        return foundTask;
    }

    async updateTaskByIds(userId, taskId, data = {}) {
        const [rows, [foundTask]] = await this.#taskRepository.update(data, {
            where: { userId, id: taskId },
            returning: true,
        });
        if (rows === 0) {
            throw new NotFoundException(
                `Task with that taskId: ${taskId} not found`,
            );
        }
        return foundTask;
    }

    async removeTaskByIds(userId, taskId) {
        const task = await this.#taskRepository.destroy({
            where: { userId, id: taskId },
        });
        if (task === 0) {
            throw new NotFoundException(
                `Task with that taskId: ${taskId} not found`,
            );
        }
    }
}

module.exports = { TaskService };
