const ApplicationException = require('./ApplicationException');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');

class IncorrectException extends ApplicationException {
    constructor(message = 'Incorrect password') {
        super(message, HttpStatusCodes.NOT_ACCEPTABLE);
    }
}

module.exports = IncorrectException;
