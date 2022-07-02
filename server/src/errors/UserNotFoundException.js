const ApplicationException = require('./ApplicationException');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');

class UserNotFoundException extends ApplicationException {
    constructor(message = 'User not found') {
        super(message, HttpStatusCodes.NOT_FOUND);
    }
}

module.exports = UserNotFoundException;
