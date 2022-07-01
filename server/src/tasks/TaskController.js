import { Router } from 'express';
import { TaskService } from './TaskService.js';
import { paginate } from '../middlewares/paginate.js';
import { TaskValidation } from '../middlewares/TaskValidation.js';
import { TaskValidationSchemas } from '../utils/TaskValidationSchemas.js';

export class TaskController {
    #path = '/tasks';
    #router = Router({ mergeParams: true });
    #taskService = new TaskService();
    #taskValidation = new TaskValidation();
    #taskSchema = new TaskValidationSchemas();

    constructor() {
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.#router.get(this.#path, paginate, this.#taskService.findAllTasks);
        this.#router
            .route(`${this.#path}/:id`)
            .get(this.#findOne)
            .patch(
                this.#taskValidation.validateUpdateTaskData(
                    this.#taskSchema.taskUpdateSchema,
                ),
                this.#updateOne,
            )
            .delete(this.#removeOne);
    }

    #createOne = async ({ params: { id }, body }, res, next) => {
        try {
            const task = await this.#taskService.createTask({
                ...body,
                userId: +id,
            });
            return res.status(201).send({ data: task });
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
            return res.status(200).send(tasks);
        } catch (err) {
            next(err);
        }
    };

    #findAllTasks = async ({ pagination }, res, next) => {
        try {
            const tasks = await this.#taskService.findAllTasks(pagination);
            return res.status(200).send(tasks);
        } catch (err) {
            next(err);
        }
    };

    #findOne = async ({ params: { id } }, res, next) => {
        try {
            const foundTask = await this.#taskService.findTaskById(Number(id));
            return res.status(200).send({ data: foundTask });
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
            return res.status(202).send({ data: updatedTask });
        } catch (err) {
            next(err);
        }
    };

    #removeOne = async ({ params: { id } }, res, next) => {
        try {
            const result = await this.#taskService.removeTaskById(id);
            return res.status(204).send({ data: result });
        } catch (err) {
            next(err);
        }
    };
}
