'use strict';
const ValidationSchemas = require('../utils/ValidationSchemas');
const BadRequestError = require('../errors/BadRequestError');

module.exports.validateSignInData = async ({ body }, res, next) => {
    const validationResult = ValidationSchemas.signUpSchema().isValid(
        body,
    );
    console.log(validationResult);
    if (validationResult) {
        next();
    }
    return next(new BadRequestError('Invalid data for login'));
};

module.exports.validateSignUpData = async ({ body }, res, next) => {
    const validationResult = await ValidationSchemas.signUpSchema().isValid(
        body,
    );
    if (validationResult) {
        next();
    }
    return next(new BadRequestError('Invalid data for registration'));
};
