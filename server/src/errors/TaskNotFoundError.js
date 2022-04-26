const ApplicationError = require('./ApplicationError');

module.exports = class TaskNotFoundError extends ApplicationError {
    constructor(message) {
        super(message || 'Task not found', 404);
    }
};
