const Router = require('express').Router({ mergeParams: true });
const {
    findAllTasks,
    findOne,
    updateOne,
    removeOne,
} = require('../controllers/TaskController');
const { paginate } = require('../middlewares/paginate');

class TaskRouter {
    constructor() {
        Router.get('/', paginate, findAllTasks);
        Router.route('/:id').get(findOne).patch(updateOne).delete(removeOne);
    }
}

new TaskRouter();
module.exports = Router;
