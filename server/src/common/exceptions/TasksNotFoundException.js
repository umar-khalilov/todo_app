const ApplicationException = require('./ApplicationException');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');
module.exports = class TasksNotFoundException extends ApplicationException {
    constructor(message = 'No found tasks in database') {
        super(message, HttpStatusCodes.NOT_FOUND);
    }
};
