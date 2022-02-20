const authRouter = require('express').Router({ mergeParams: true });
const AuthController = require('../controllers/AuthController');

authRouter.post('/sign-up', AuthController.signUp);
authRouter.post('/sign-in', AuthController.signIn);

module.exports = authRouter;
