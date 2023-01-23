const ApplicationException = require('./ApplicationException');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');

module.exports = class IncorrectPasswordException extends ApplicationException {
    constructor(message = 'Incorrect password') {
        super(message, HttpStatusCodes.NOT_ACCEPTABLE);
    }
};
