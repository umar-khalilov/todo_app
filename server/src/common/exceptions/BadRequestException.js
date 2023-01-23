const ApplicationException = require('./ApplicationException');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');

module.exports = class BadRequestException extends ApplicationException {
    constructor(message = 'Bad request') {
        super(message, HttpStatusCodes.BAD_REQUEST);
    }
};
