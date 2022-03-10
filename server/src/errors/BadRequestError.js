const ApplicationError = require('./ApplicationError');

module.exports = class BadRequestError extends ApplicationError {
    constructor (message) {
        super(message || 'Bad request', 400);
    }
};
