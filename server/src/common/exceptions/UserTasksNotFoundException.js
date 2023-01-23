const ApplicationException = require('./ApplicationException');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');
module.exports = class UserTasksNotFoundException extends ApplicationException {
    constructor(userId) {
        super(
            `No found tasks for the user with that userId: ${userId}`,
            HttpStatusCodes.NOT_FOUND,
        );
    }
};
