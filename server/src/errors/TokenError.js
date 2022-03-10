const ApplicationError = require('./ApplicationError');

module.exports = class TokenError extends ApplicationError {
    constructor (message) {
        super(message || 'Token error', 419);
    }
};
