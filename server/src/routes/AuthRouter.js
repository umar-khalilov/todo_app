const Router = require('express').Router({ mergeParams: true });
const { signIn, signUp } = require('../controllers/AuthController');
const {
    validateSignInData,
    validateSignUpData,
} = require('../middlewares/AuthValidation');
const { signInSchema, signUpSchema } = require('../utils/ValidationSchemas');

class AuthRouter {
    constructor() {
        Router.post('/sign-up', validateSignUpData(signUpSchema), signUp);
        Router.post('/sign-in', validateSignInData(signInSchema), signIn);
    }
}

new AuthRouter();
module.exports = Router;
