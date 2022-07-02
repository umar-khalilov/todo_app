'use strict';

const validateCreateTaskData =
    schema =>
        async ({ body }, res, next) => {
            try {
                await schema.validate(body);
                return next();
            } catch (err) {
                return res.status(400).send({
                    name: err.name,
                    message: err.message,
                });
            }
        };

const validateUpdateTaskData =
    schema =>
        async ({ body }, res, next) => {
            try {
                await schema.validate(body);
                return next();
            } catch (err) {
                return res.status(400).send({
                    name: err.name,
                    message: err.message,
                });
            }
        };

module.exports = { validateCreateTaskData, validateUpdateTaskData };
