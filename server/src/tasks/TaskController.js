const { Router } = require('express');
const TaskService = require('./TaskService');
const { paginate } = require('../middlewares/paginate');
const { validateUpdateTaskData } = require('../middlewares/taskValidation');
const { taskUpdateSchema } = require('../utils/taskValidationSchemas');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');

class TaskController {
    #path = '/tasks';
    #router = Router({ mergeParams: true });
    #taskService = new TaskService();

    constructor() {
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.get(this.#path, paginate, this.#findAllTasks);
        this.router
            .route(`${this.#path}/:id`)
            .get(this.#findOne)
            .patch(validateUpdateTaskData(taskUpdateSchema), this.#updateOne)
            .delete(this.#removeOne);
    }

    get router() {
        return this.#router;
    }

    #createOne = async ({ params: { id }, body }, res, next) => {
        try {
            const task = await this.#taskService.createTask({
                ...body,
                userId: +id,
            });
            return res.status(HttpStatusCodes.CREATED).send({ data: task });
        } catch (err) {
            next(err);
        }
    };

    #findUserTasks = async ({ userInstance, pagination }, res, next) => {
        try {
            const tasks = await this.#taskService.findUserTasks(
                userInstance,
                pagination,
            );
            return res.status(HttpStatusCodes.OK).send(tasks);
        } catch (err) {
            next(err);
        }
    };

    #findAllTasks = async ({ pagination }, res, next) => {
        try {
            const tasks = await this.#taskService.findAllTasks(pagination);
            return res.status(HttpStatusCodes.OK).send(tasks);
        } catch (err) {
            next(err);
        }
    };

    #findOne = async ({ params: { id } }, res, next) => {
        try {
            const foundTask = await this.#taskService.findTaskById(Number(id));
            return res.status(HttpStatusCodes.OK).send({ data: foundTask });
        } catch (err) {
            next(err);
        }
    };

    #updateOne = async ({ params: { id }, body }, res, next) => {
        try {
            const updatedTask = await this.#taskService.updateTaskById(
                Number(id),
                body,
            );
            return res
                .status(HttpStatusCodes.ACCEPTED)
                .send({ data: updatedTask });
        } catch (err) {
            next(err);
        }
    };

    #removeOne = async ({ params: { id } }, res, next) => {
        try {
            await this.#taskService.removeTaskById(id);
            return res.status(HttpStatusCodes.NO_CONTENT).end();
        } catch (err) {
            next(err);
        }
    };
}

module.exports = TaskController;
