import { Router } from 'express';
import { UserService } from './UserService.js';
import { TaskService } from '../tasks/TaskService.js';
import { UserValidation } from '../middlewares/UserValidation.js';
import { TaskValidation } from '../middlewares/TaskValidation.js';
import { UserValidationSchemas } from '../utils/UserValidationSchemas.js';
import { TaskValidationSchemas } from '../utils/TaskValidationSchemas.js';
import { paginate } from '../middlewares/paginate.js';
import { checkUser } from '../middlewares/checkUser.js';

export class UserController {
    #path = '/users';
    #router = Router({ mergeParams: true });
    #userService = new UserService();
    #taskService = new TaskService();
    #userValidation = new UserValidation();
    #userSchema = new UserValidationSchemas();
    #taskValidation = new TaskValidation();
    #taskSchema = new TaskValidationSchemas();

    constructor() {
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.#router.get(this.#path, paginate, this.#findAll);
        this.#router
            .route(`${this.#path}/:id`)
            .get(this.#findOne)
            .patch(
                this.#userValidation.validateUserData(
                    this.#userSchema.userUpdateSchema,
                ),
                this.#updateOne,
            )
            .delete(this.#removeOne);
        this.#router
            .route(`${this.#path}/:id/tasks`)
            .post(
                checkUser,
                this.#taskValidation.validateCreateTaskData(
                    this.#taskSchema.taskCreateSchema,
                ),
            )
            .get(checkUser, paginate, this.#taskService.findUserTasks);
    }

    #findAll = async ({ pagination }, res, next) => {
        try {
            const users = await this.#userService.findAllUsers(pagination);
            return res.status(200).send(users);
        } catch (error) {
            next(error);
        }
    };

    #findOne = async ({ params: { id } }, res, next) => {
        try {
            const user = await this.#userService.findUserById(Number(id));
            return res.status(200).send({ data: user });
        } catch (error) {
            next(error);
        }
    };

    #updateOne = async ({ params: { id }, body }, res, next) => {
        try {
            const updatedUser = await this.#userService.updateUserById(
                Number(id),
                body,
            );
            return res.status(202).send({ data: updatedUser });
        } catch (error) {
            next(error);
        }
    };

    #removeOne = async ({ params: { id } }, res, next) => {
        try {
            const removedUser = await this.#userService.removeUserById(
                Number(id),
            );
            return res.status(204).send({ data: removedUser });
        } catch (error) {
            next(error);
        }
    };
}
