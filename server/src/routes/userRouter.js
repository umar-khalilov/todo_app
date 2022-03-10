'use strict';
const userRouter = require('express').Router({ mergeParams: true }),
    UserController = require('../controllers/UserController'),
    { paginate } = require('../middlewares/paginate');

userRouter.get('/', paginate, UserController.findAll);
userRouter
    .route('/:id')
    .get(UserController.findOne)
    .patch(UserController.updateOne)
    .delete(UserController.removeOne);

module.exports = userRouter;
