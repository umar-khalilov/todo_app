const Router = require('express').Router({ mergeParams: true });
const {
    findAll,
    findOne,
    updateOne,
    removeOne,
} = require('../controllers/UserController');
const { createOne, findUserTasks } = require('../controllers/TaskController');
const { taskCreateSchema } = require('../utils/TaskValidationSchemas');
const { userUpdateSchema } = require('../utils/UserValidationSchemas');
const { paginate } = require('../middlewares/paginate');
const { checkUser } = require('../middlewares/checkUser');
const { validateCreateTaskData } = require('../middlewares/TaskValidation');
const { validateUserData } = require('../middlewares/UserValidation');

class UserRouter {
    constructor() {
        Router.get('/', paginate, findAll);
        Router.route('/:id')
            .get(findOne)
            .patch(validateUserData(userUpdateSchema), updateOne)
            .delete(removeOne);
        Router.route('/:id/tasks')
            .post(
                checkUser,
                validateCreateTaskData(taskCreateSchema),
                createOne,
            )
            .get(checkUser, paginate, findUserTasks);
    }
}

new UserRouter();
module.exports = Router;
