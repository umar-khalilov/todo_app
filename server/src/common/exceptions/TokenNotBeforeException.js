const { HttpStatusCodes } = require('../utils/httpStatusCodes');
const ApplicationException = require('./ApplicationException');

module.exports = class TokenNotBeforeException extends ApplicationException {
    constructor(date) {
        super(`jwt not active: ${date}`, HttpStatusCodes.BAD_REQUEST);
    }
};
