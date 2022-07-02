'use strict';

const validateSignUpData =
    schema =>
        async ({ body }, res, next) => {
            try {
                await schema.validate(body);
                return next();
            } catch (error) {
                return res.status(400).send({
                    name: error.name,
                    message: error.message,
                    status: error.status,
                });
            }
        };

const validateSignInData =
    schema =>
        async ({ body }, res, next) => {
            try {
                await schema.validate(body);
                return next();
            } catch (error) {
                return res.status(400).send({
                    name: error.name,
                    message: error.message,
                });
            }
        };

module.exports = { validateSignUpData, validateSignInData };
