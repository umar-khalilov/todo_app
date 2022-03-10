const ApplicationError = require('./ApplicationError');

module.exports = class ServerError extends ApplicationError {
    constructor (message) {
        super(message || 'Server error', 500);
    }
};
