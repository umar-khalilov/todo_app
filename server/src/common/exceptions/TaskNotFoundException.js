const ApplicationException = require('./ApplicationException');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');

module.exports = class TaskNotFoundException extends ApplicationException {
    constructor(id) {
        super(`Task with that id: ${id} not found`, HttpStatusCodes.NOT_FOUND);
    }
};
