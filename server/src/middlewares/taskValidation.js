'use strict';

const validateCreateTaskData =
    schema =>
    async ({ body }, res, next) => {
        try {
            await schema.isValid(body);
            return next();
        } catch (err) {
            return res.status(400).send({
                name: err.name,
                message: err.message,
                status: err.status,
            });
        }
    };

const validateUpdateTaskData =
    schema =>
    async ({ body }, res, next) => {
        try {
            await schema.isValid(body);
            return next();
        } catch (err) {
            return res.status(400).send({
                name: err.name,
                message: err.message,
                status: err.status,
            });
        }
    };

module.exports = { validateCreateTaskData, validateUpdateTaskData };
