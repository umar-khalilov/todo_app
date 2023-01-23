const ApplicationException = require('./ApplicationException');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');

module.exports = class UnauthorizedException extends ApplicationException {
    constructor(message = 'Wrong email or password') {
        super(message, HttpStatusCodes.FORBIDDEN);
    }
};
