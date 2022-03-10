'use strict';
const userRouter = require('express').Router({ mergeParams: true }),
    UserController = require('../controllers/UserController'),
    { paginate } = require('../middlewares/paginate');

userRouter.get('/', paginate, UserController.findAll);

module.exports = userRouter;
