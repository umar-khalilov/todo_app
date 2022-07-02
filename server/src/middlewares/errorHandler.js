'use strict';
const ApplicationException = require('../errors/ApplicationException');

module.exports.errorHandler = async (err, req, res, next) => {
    console.error('\x1b[31m', `ERROR caught:->>>>> ${err.stack}`, '\x1b[0m');
    if (err instanceof ApplicationException) {
        return res
            .status(err.status)
            .send({ name: err.name, message: err.message, status: err.status });
    } else {
        return res.status(500).send('Server Error');
    }
};
