const ApplicationError = require('./ApplicationError');

module.exports = class RightsError extends ApplicationError {
    constructor(message) {
        super(message || 'Not enough rights', 403);
    }
};
