const ApplicationException = require('./ApplicationException');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');

module.exports = class TokenMalformedException extends ApplicationException {
    constructor() {
        super('jwt malformed', HttpStatusCodes.BAD_REQUEST);
    }
};
