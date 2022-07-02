const ApplicationException = require('./ApplicationException');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');

class UserAlreadyExistException extends ApplicationException {
    constructor(message = 'User with this email already exist') {
        super(message, HttpStatusCodes.NOT_ACCEPTABLE);
    }
}

module.exports = UserAlreadyExistException;
