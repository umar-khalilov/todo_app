const ApplicationException = require('./ApplicationException');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');

class UnauthorizedException extends ApplicationException {
    constructor(message = 'Wrong email or password') {
        super(message, HttpStatusCodes.FORBIDDEN);
    }
}

module.exports = UnauthorizedException;
