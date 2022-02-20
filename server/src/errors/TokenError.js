const ApplicationError = require('./ApplicationError');

module.exports = class TokenError extends ApplicationError {
    constructor(err) {
        super(err.message || 'Token error', 419);
    }
};
