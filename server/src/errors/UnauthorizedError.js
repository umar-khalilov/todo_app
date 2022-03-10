const ApplicationError = require('./ApplicationError');

module.exports = class UnauthorizedError extends ApplicationError {
    constructor (message) {
        super(message || 'Wrong email or password', 403);
    }
};
