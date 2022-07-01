'use strict';

module.exports.validateUserData =
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
