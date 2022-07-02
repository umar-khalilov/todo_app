const ApplicationException = require('./ApplicationException');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');

class TokenException extends ApplicationException {
    constructor(message = 'Token error') {
        super(message, HttpStatusCodes.AUTHENTICATION_TIMEOUT);
    }
}

module.exports = TokenException;
