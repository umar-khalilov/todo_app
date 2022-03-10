const ApplicationError = require('./ApplicationError');

module.exports = class UserAlreadyExistError extends ApplicationError {
    constructor (message) {
        super(message || 'User with this email already exist', 406);
    }
};
