const ApplicationException = require('./ApplicationException');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');

module.exports = class RightsException extends ApplicationException {
    constructor(message = 'Not enough rights') {
        super(message, HttpStatusCodes.FORBIDDEN);
    }
};
