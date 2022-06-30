const Router = require('express').Router({ mergeParams: true });
const {
    findAllTasks,
    findOne,
    updateOne,
    removeOne,
} = require('../tasks/TaskController.js');
const { taskUpdateSchema } = require('../utils/TaskValidationSchemas');
const { validateUpdateTaskData } = require('../middlewares/TaskValidation');
const { paginate } = require('../middlewares/paginate');

class TaskRouter {
    constructor() {
        Router.get('/', paginate, findAllTasks);
        Router.route('/:id')
            .get(findOne)
            .patch(validateUpdateTaskData(taskUpdateSchema), updateOne)
            .delete(removeOne);
    }
}

new TaskRouter();
module.exports = Router;
