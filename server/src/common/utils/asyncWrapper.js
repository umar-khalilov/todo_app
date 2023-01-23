'use strict';

const asyncWrapper = handler => (req, res, next) =>
    Promise.resolve(handler(req, res, next))
        .then(response => res.status(response.status).send(response.data))
        .catch(err => next(err));

module.exports = { asyncWrapper };
