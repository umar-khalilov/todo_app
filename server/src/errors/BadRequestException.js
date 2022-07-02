const ApplicationException = require('./ApplicationException');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');

class BadRequestException extends ApplicationException {
    constructor(message = 'Bad request') {
        super(message, HttpStatusCodes.BAD_REQUEST);
    }
}

module.exports = BadRequestException;
