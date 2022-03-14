'use strict';
const authRouter = require('express').Router({ mergeParams: true });
const AuthController = require('../controllers/AuthController');
const {
    validateSignInData,
    validateSignUpData,
} = require('../middlewares/authValidation');

authRouter.post('/sign-up', validateSignUpData, AuthController.signUp);
authRouter.post('/sign-in', validateSignInData, AuthController.signIn);

module.exports = authRouter;
