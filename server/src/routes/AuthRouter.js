const Router = require('express').Router({ mergeParams: true });
const { signUp, signIn } = require('../authentication/AuthController.js');
const {
    validateSignInData,
    validateSignUpData,
} = require('../middlewares/AuthValidation');
const {
    signInSchema,
    signUpSchema,
} = require('../utils/AuthValidationSchemas');

class AuthRouter {
    constructor() {
        Router.post('/sign-up', validateSignUpData(signUpSchema), signUp);
        Router.post('/sign-in', validateSignInData(signInSchema), signIn);
    }
}

new AuthRouter();
module.exports = Router;
