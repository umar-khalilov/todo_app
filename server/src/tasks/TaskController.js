const { Router } = require('express');
const TaskService = require('./TaskService');
const SuccessResponse = require('../common/utils/SuccessResponse');
const { paginate } = require('../common/middlewares/paginate');
const { validate } = require('../common/middlewares/validate');
const { parseIntPipe } = require('../common/middlewares/parseIntPipe');
const { asyncWrapper } = require('../common/utils/asyncWrapper');
const { updateTaskDtoSchema } = require('./taskDtoSchemas');
const { HttpStatusCodes } = require('../common/utils/httpStatusCodes');

module.exports = class TaskController {
    #taskService;
    #router;
    #path;

    constructor() {
        this.#taskService = new TaskService();
        this.#router = new Router({ mergeParams: true, caseSensitive: true });
        this.#path = '/tasks';
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.get(this.#path, paginate, this.#findAllTasks);
        this.router
            .route(`${this.#path}/:taskId`)
            .get(parseIntPipe('taskId'), this.#findOne)
            .patch(
                parseIntPipe('taskId'),
                validate(updateTaskDtoSchema),
                this.#updateOne,
            )
            .delete(parseIntPipe('taskId'), this.#removeOne);
    }

    get router() {
        return this.#router;
    }

    #createOne = asyncWrapper(async ({ params: { userId }, body }) => {
        const task = await this.#taskService.createTask({
            ...body,
            userId,
        });
        return new SuccessResponse({ data: task }, HttpStatusCodes.CREATED);
    });

    #findUserTasks = asyncWrapper(async ({ userInstance, pagination }) => {
        const tasks = await this.#taskService.findUserTasks(
            userInstance,
            pagination,
        );
        return new SuccessResponse(tasks);
    });

    #findAllTasks = asyncWrapper(async ({ pagination }) => {
        const tasks = await this.#taskService.findAllTasks(pagination);
        return new SuccessResponse(tasks);
    });

    #findOne = asyncWrapper(async ({ params: { id } }) => {
        const foundTask = await this.#taskService.findTaskById(id);
        return new SuccessResponse({ data: foundTask });
    });

    #updateOne = asyncWrapper(async ({ params: { id }, body }) => {
        const updatedTask = await this.#taskService.updateTaskById(id, body);
        return new SuccessResponse(
            { data: updatedTask },
            HttpStatusCodes.ACCEPTED,
        );
    });

    #removeOne = asyncWrapper(async ({ params: { id } }) => {
        const response = await this.#taskService.removeTaskById(id);
        return new SuccessResponse(response, HttpStatusCodes.NO_CONTENT);
    });
};
