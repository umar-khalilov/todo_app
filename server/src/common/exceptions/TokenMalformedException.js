const ApplicationException = require('./ApplicationException');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');

module.exports = class TokenMalformedException extends ApplicationException {
    constructor(message = 'jwt malformed') {
        super(message, HttpStatusCodes.FORBIDDEN);
    }
};
