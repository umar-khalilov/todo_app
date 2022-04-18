const Router = require('express').Router({ mergeParams: true });
const {
    findAll,
    findOne,
    updateOne,
    removeOne,
} = require('../controllers/UserController');
const { paginate } = require('../middlewares/paginate');

class UserRouter {
    constructor() {
        Router.get('/', paginate, findAll);
        Router.route('/:id').get(findOne).patch(updateOne).delete(removeOne);
    }
}

new UserRouter();
module.exports = Router;
