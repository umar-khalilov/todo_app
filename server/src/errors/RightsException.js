const ApplicationException = require('./ApplicationException');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');

class RightsException extends ApplicationException {
    constructor(message = 'Not enough rights') {
        super(message, HttpStatusCodes.FORBIDDEN);
    }
}

module.exports = RightsException;
