const ApplicationError = require('./ApplicationError');

module.exports = class IncorrectError extends ApplicationError {
    constructor(message) {
        super(message || 'Incorrect password', 406);
    }
};
