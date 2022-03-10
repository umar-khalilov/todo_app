const ApplicationError = require('./ApplicationError');

module.exports = class UserNotFoundError extends ApplicationError {
    constructor (message) {
        super(message || 'User not found', 404);
    }
};
