'use strict';
const { HttpStatusCodes } = require('../utils/httpStatusCodes');

const validate =
    schema =>
    async ({ body }, res, next) => {
        try {
            await schema.validate(body);
            return next();
        } catch (error) {
            return res.status(HttpStatusCodes.BAD_REQUEST).send({
                name: error.name,
                message: error.message,
                status: error.status,
            });
        }
    };

module.exports = { validate };
