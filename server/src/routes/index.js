const Router = require('express').Router({ mergeParams: true });
const AuthRouter = require('./AuthRouter');
const UserRouter = require('./UserRouter');

class MainRouter {
    constructor() {
        Router.use('/auth', AuthRouter);
        Router.use('/users', UserRouter);
    }
}

new MainRouter();
module.exports = Router;
