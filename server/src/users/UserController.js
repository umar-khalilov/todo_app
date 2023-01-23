const { Router } = require('express');
const UserService = require('./UserService');
const TaskService = require('../tasks/TaskService');
const SuccessResponse = require('../common/utils/SuccessResponse');
const { paginate } = require('../common/middlewares/paginate');
const { checkUser } = require('../common/middlewares/checkUser');
const { validate } = require('../common/middlewares/validate');
const { parseIntPipe } = require('../common/middlewares/parseIntPipe');
const { asyncWrapper } = require('../common/utils/asyncWrapper');
const { updateUserDtoSchema } = require('./userDtoSchemas');
const { createTaskDtoSchema } = require('../tasks/taskDtoSchemas');
const { HttpStatusCodes } = require('../common/utils/httpStatusCodes');

module.exports = class UserController {
    #userService;
    #taskService;
    #router;
    #path;

    constructor() {
        this.#userService = new UserService();
        this.#taskService = new TaskService();
        this.#router = new Router({ mergeParams: true, caseSensitive: true });
        this.#path = '/users';
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.get(this.#path, paginate, this.#findAll);
        this.router
            .route(`${this.#path}/:id`)
            .get(parseIntPipe, this.#findOne)
            .patch(parseIntPipe, validate(updateUserDtoSchema), this.#updateOne)
            .delete(parseIntPipe, this.#removeOne);
        this.router
            .route(`${this.#path}/:id/tasks`)
            .post(
                checkUser,
                validate(createTaskDtoSchema),
                this.#taskService.createTask,
            )
            .get(checkUser, paginate, this.#taskService.findUserTasks);
    }

    get router() {
        return this.#router;
    }

    #findAll = asyncWrapper(async ({ pagination }) => {
        const users = await this.#userService.findAllUsers(pagination);
        return new SuccessResponse(users);
    });

    #findOne = asyncWrapper(async ({ params: { id } }) => {
        const user = await this.#userService.findUserById(id);
        return new SuccessResponse({ data: user });
    });

    #updateOne = asyncWrapper(async ({ params: { id }, body }) => {
        const updatedUser = await this.#userService.updateUserById(id, body);
        return new SuccessResponse(
            { data: updatedUser },
            HttpStatusCodes.ACCEPTED,
        );
    });

    #removeOne = asyncWrapper(async ({ params: { id } }) => {
        await this.#userService.removeUserById(id);
        return new SuccessResponse(null, HttpStatusCodes.NO_CONTENT);
    });
};
