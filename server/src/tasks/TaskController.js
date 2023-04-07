const { Router } = require('express');
const { TaskService } = require('./TaskService');
const { LoggerService } = require('../common/services/LoggerService');
const { SuccessResponse } = require('../common/utils/SuccessResponse');
const { paginate } = require('../common/middlewares/paginate');
const { validate } = require('../common/middlewares/validate');
const { parseIntPipe } = require('../common/middlewares/parseIntPipe');
const { checkUser } = require('../common/middlewares/checkUser');
const { asyncWrapper } = require('../common/utils/helpers');
const { HttpStatusCodes } = require('../common/utils/httpStatusCodes');
const { updateTaskSchema, createTaskSchema } = require('./taskSchemas');

class TaskController {
    #taskService;
    #router;
    #logger;

    constructor() {
        this.#logger = new LoggerService(TaskController.name);
        this.#taskService = new TaskService();
        this.#router = new Router({ mergeParams: true, caseSensitive: true });
        this.#initializeRoutes();
        this.#logger.log('Initialized');
    }

    get router() {
        return this.#router;
    }

    #initializeRoutes() {
        this.router
            .route('/')
            .post(
                parseIntPipe('userId'),
                validate(createTaskSchema),
                checkUser,
                this.#createOne,
            )
            .get(
                parseIntPipe('userId'),
                paginate,
                checkUser,
                this.#findUserTasks,
            );
        this.router
            .route('/:taskId')
            .get(parseIntPipe('userId', 'taskId'), checkUser, this.#findOne)
            .patch(
                parseIntPipe('userId', 'taskId'),
                validate(updateTaskSchema),
                checkUser,
                this.#updateOne,
            )
            .delete(
                parseIntPipe('userId', 'taskId'),
                checkUser,
                this.#removeOne,
            );
    }

    #createOne = asyncWrapper(
        async ({ params: { userId }, body: taskData }) => {
            const task = await this.#taskService.createTask(userId, taskData);
            return new SuccessResponse({ data: task }, HttpStatusCodes.CREATED);
        },
    );

    #findUserTasks = asyncWrapper(
        async ({ params: { userId }, pagination }) => {
            const tasks = await this.#taskService.findUserTasks(
                userId,
                pagination,
            );
            return new SuccessResponse(tasks);
        },
    );

    #findAllTasks = asyncWrapper(async ({ pagination }) => {
        const tasks = await this.#taskService.findAllTasks(pagination);
        return new SuccessResponse(tasks);
    });

    #findOne = asyncWrapper(async ({ params: { userId, taskId } }) => {
        const foundTask = await this.#taskService.findTaskByIds(userId, taskId);
        return new SuccessResponse({ data: foundTask });
    });

    #updateOne = asyncWrapper(async ({ params: { userId, taskId }, body }) => {
        const updatedTask = await this.#taskService.updateTaskByIds(
            userId,
            taskId,
            body,
        );
        return new SuccessResponse(
            { data: updatedTask },
            HttpStatusCodes.ACCEPTED,
        );
    });

    #removeOne = asyncWrapper(async ({ params: { userId, taskId } }) => {
        await this.#taskService.removeTaskByIds(userId, taskId);
        return new SuccessResponse(null, HttpStatusCodes.NO_CONTENT);
    });
}

module.exports = { TaskController };
