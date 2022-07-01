const ApplicationException = require('./ApplicationException');

class TaskNotFoundException extends ApplicationException {
    constructor(message = 'Task not found') {
        super(message, 404);
    }
}

module.exports = TaskNotFoundException;
