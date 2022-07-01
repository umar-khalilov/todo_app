const { Router } = require('express');
const UserService = require('./UserService');
const TaskService = require('../tasks/TaskService');
const { paginate } = require('../middlewares/paginate');
const { checkUser } = require('../middlewares/checkUser');
const { validateUserData } = require('../middlewares/validateUserData');
const { validateCreateTaskData } = require('../middlewares/taskValidation');
const { userUpdateSchema } = require('../utils/userValidationSchemas');
const { taskCreateSchema } = require('../utils/taskValidationSchemas');

class UserController {
    #path = '/users';
    #router = Router({ mergeParams: true });
    #userService = new UserService();
    #taskService = new TaskService();

    constructor() {
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.get(this.#path, paginate, this.#findAll);
        this.router
            .route(`${this.#path}/:id`)
            .get(this.#findOne)
            .patch(validateUserData(userUpdateSchema), this.#updateOne)
            .delete(this.#removeOne);
        this.router
            .route(`${this.#path}/:id/tasks`)
            .post(checkUser, validateCreateTaskData(taskCreateSchema))
            .get(checkUser, paginate, this.#taskService.findUserTasks);
    }

    get router() {
        return this.#router;
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

module.exports = UserController;
