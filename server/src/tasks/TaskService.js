const { Task } = require('../app/database/models');
const { paginateResponse } = require('../common/utils/paginateResponse');
const {
    BadRequestException,
    TaskNotFoundException,
    TasksNotFoundException,
    UserTasksNotFoundException,
} = require('../common/exceptions');

module.exports = class TaskService {
    #taskRepository;

    constructor() {
        this.#taskRepository = Task;
    }

    async createTask(userId, taskData = {}) {
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
            throw new UserTasksNotFoundException(userId);
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
            throw new TasksNotFoundException();
        }
        return paginateResponse([count, rows], page, limit);
    }

    async findTaskByIds(userId, taskId) {
        const foundTask = await this.#taskRepository.findAll({
            where: { userId, id: taskId },
        });
        if (!foundTask.length) {
            throw new TaskNotFoundException(taskId);
        }
        return foundTask;
    }

    async updateTaskByIds(userId, taskId, data = {}) {
        const [rows, [foundTask]] = await this.#taskRepository.update(data, {
            where: { userId, id: taskId },
            returning: true,
        });
        if (rows === 0) {
            throw new TaskNotFoundException();
        }
        return foundTask;
    }

    async removeTaskByIds(userId, taskId) {
        const task = await this.#taskRepository.destroy({
            where: { userId, id: taskId },
        });
        if (task === 0) {
            throw new TaskNotFoundException(taskId);
        }
        return `Task with taskId: ${taskId} was successfully removed`;
    }
};
