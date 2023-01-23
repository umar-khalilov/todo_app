const ApplicationException = require('./ApplicationException');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');

module.exports = class TokenException extends ApplicationException {
    constructor(message = 'Token error') {
        super(message, HttpStatusCodes.AUTHENTICATION_TIMEOUT);
    }
};
