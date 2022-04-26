const Router = require('express').Router({ mergeParams: true });
const AuthRouter = require('./AuthRouter');
const UserRouter = require('./UserRouter');
const TaskRouter = require('./TaskRouter');

class MainRouter {
    constructor() {
        Router.use('/auth', AuthRouter);
        Router.use('/users', UserRouter);
        Router.use('/tasks', TaskRouter);
    }
}

new MainRouter();
module.exports = Router;
