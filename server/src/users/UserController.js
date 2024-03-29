const { Router } = require('express');
const { UserService } = require('./UserService');
const { TaskController } = require('../tasks/TaskController');
const { LoggerService } = require('../common/services/LoggerService');
const { SuccessResponse } = require('../common/utils/SuccessResponse');
const { paginate } = require('../common/middlewares/paginate');
const { validate } = require('../common/middlewares/validate');
const { parseIntPipe } = require('../common/middlewares/parseIntPipe');
const { asyncWrapper } = require('../common/utils/helpers');
const { updateUserSchema } = require('./userSchema');
const { HttpStatusCodes } = require('../common/utils/httpStatusCodes');

class UserController {
    #userService;
    #taskController;
    #router;
    #path;
    #logger;

    constructor() {
        this.#logger = new LoggerService(UserController.name);
        this.#userService = new UserService();
        this.#taskController = new TaskController();
        this.#router = new Router({ mergeParams: true, caseSensitive: true });
        this.#path = '/users';
        this.#initializeRoutes();
        this.#logger.log('Initialized');
    }

    get router() {
        return this.#router;
    }

    #initializeRoutes() {
        this.router.get(this.#path, paginate, this.#findAll);
        this.router
            .route(`${this.#path}/:id`)
            .get(parseIntPipe('id'), this.#findOne)
            .patch(
                parseIntPipe('id'),
                validate(updateUserSchema),
                this.#updateOne,
            )
            .delete(parseIntPipe('id'), this.#removeOne);
        this.router.use(
            `${this.#path}/:userId/tasks`,
            this.#taskController.router,
        );
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
}

module.exports = { UserController };
