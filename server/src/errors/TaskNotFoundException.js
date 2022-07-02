const ApplicationException = require('./ApplicationException');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');

class TaskNotFoundException extends ApplicationException {
    constructor(message = 'Task not found') {
        super(message, HttpStatusCodes.NOT_FOUND);
    }
}

module.exports = TaskNotFoundException;
